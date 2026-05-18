<?php
/**
 * REMICO submit endpoint — credentials.
 *
 * 1) Copy this file as submit.config.php and place next to submit.php on the server.
 * 2) Paste real values from @BotFather (token) and @userinfobot or @RawDataBot (chat_id).
 * 3) submit.config.php is git-ignored. Never commit real credentials.
 *
 * Direct HTTP access is harmless: Apache executes PHP files, so the response is empty.
 * For extra paranoia you can also set chmod 600 on the deployed file.
 */

return [
    'telegram_bot_token' => 'PASTE_TOKEN_FROM_BOTFATHER',
    'telegram_chat_id'   => 'PASTE_CHAT_ID',
];
