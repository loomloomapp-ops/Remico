<?php
declare(strict_types=1);

/**
 * REMICO lead-form endpoint.
 *
 * Receives JSON from the static frontend (Next.js export) and forwards the
 * lead to Telegram via Bot API. Secrets live in submit.config.php — that file
 * is NOT in git, you create it on the server.
 *
 * Deploy: place this file in public_html/ next to index.html (i.e. site root).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// --- Method guard ---------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Load secrets ---------------------------------------------------------
$configPath = __DIR__ . '/submit.config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Сервер не сконфігуровано'], JSON_UNESCAPED_UNICODE);
    error_log('[remico] submit.config.php missing at ' . $configPath);
    exit;
}
$config = require $configPath;
$token  = (string)($config['telegram_bot_token'] ?? '');
$chatId = (string)($config['telegram_chat_id']   ?? '');
if ($token === '' || $chatId === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Сервер не сконфігуровано'], JSON_UNESCAPED_UNICODE);
    error_log('[remico] telegram credentials missing in submit.config.php');
    exit;
}

// --- Parse JSON body ------------------------------------------------------
$raw  = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Невалідний запит'], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Honeypot — silently accept (no signal back to bots) ------------------
if (!empty($data['website'])) {
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Validation (mirrors lib/validation.ts) -------------------------------
$name     = trim((string)($data['name']          ?? ''));
$phone    = trim((string)($data['phone']         ?? ''));
$activity = trim((string)($data['activity_type'] ?? ''));
$comment  = trim((string)($data['comment']       ?? ''));
$privacy  = (bool)($data['privacy'] ?? false);
$source   = trim((string)($data['source']        ?? 'website'));

$allowed = [
    'Магазин',
    'Інтернет-магазин',
    'Оптовик',
    'Дилер',
    'Мережа магазинів',
    "Дистриб'ютор",
];

$phoneDigits = preg_replace('/\D+/u', '', $phone) ?? '';

if (mb_strlen($name) < 2) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => "Вкажіть ім'я"], JSON_UNESCAPED_UNICODE);
    exit;
}
if (mb_strlen($phoneDigits) < 9) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Некоректний номер'], JSON_UNESCAPED_UNICODE);
    exit;
}
if (!in_array($activity, $allowed, true)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Оберіть тип діяльності'], JSON_UNESCAPED_UNICODE);
    exit;
}
if (!$privacy) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Підтвердіть згоду з політикою конфіденційності'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Hard caps to keep Telegram message sane
if (mb_strlen($name)    > 120)  $name    = mb_substr($name, 0, 120);
if (mb_strlen($phone)   > 40)   $phone   = mb_substr($phone, 0, 40);
if (mb_strlen($comment) > 2000) $comment = mb_substr($comment, 0, 2000);
if (mb_strlen($source)  > 60)   $source  = mb_substr($source, 0, 60);

// --- Compose Telegram message --------------------------------------------
$escape = static function (string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
};

$lines = [
    '<b>Нова заявка REMICO</b>',
    '',
    "<b>Ім'я:</b> "         . $escape($name),
    '<b>Телефон:</b> '      . $escape($phone),
    '<b>Тип діяльності:</b> ' . $escape($activity),
];
if ($comment !== '') {
    $lines[] = '<b>Коментар:</b> ' . $escape($comment);
}
$lines[] = '<b>Джерело:</b> ' . $escape($source);
$lines[] = '<b>IP:</b> '      . $escape($_SERVER['REMOTE_ADDR'] ?? '');
$lines[] = '<b>Час:</b> '     . $escape(date('c'));

$text = implode("\n", $lines);

// --- Send to Telegram -----------------------------------------------------
$sendResult = sendToTelegram($token, $chatId, $text);
if ($sendResult !== true) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Не вдалося надіслати заявку. Спробуйте пізніше.'], JSON_UNESCAPED_UNICODE);
    error_log('[remico] telegram error: ' . $sendResult);
    exit;
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);

// --- Helpers --------------------------------------------------------------

/**
 * @return true|string  true on success, error message string on failure.
 */
function sendToTelegram(string $token, string $chatId, string $text)
{
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $payload = json_encode([
        'chat_id'                  => $chatId,
        'text'                     => $text,
        'parse_mode'               => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        $resp = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err  = curl_error($ch);
        curl_close($ch);
        if ($resp === false) {
            return 'cURL error: ' . $err;
        }
        if ($code !== 200) {
            return "HTTP {$code}: " . substr((string)$resp, 0, 400);
        }
        return true;
    }

    // Fallback if cURL isn't available on the shared host
    $ctx = stream_context_create([
        'http' => [
            'method'        => 'POST',
            'header'        => "Content-Type: application/json\r\n",
            'content'       => $payload,
            'timeout'       => 10,
            'ignore_errors' => true,
        ],
    ]);
    $resp = @file_get_contents($url, false, $ctx);
    if ($resp === false) {
        return 'file_get_contents failed';
    }
    return true;
}
