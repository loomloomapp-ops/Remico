# REMICO — B2B Leadgen Landing

One-page leadgen для українського бренду побутової хімії REMICO. Залучає B2B-партнерів: дистриб'юторів, мережі магазинів, гіпермаркети, оптовиків, дилерів, інтернет- і роздрібні магазини.

**Стек:** Next.js 14 (App Router, **static export**) · React 18 · TypeScript · Tailwind CSS 3.4 · Manrope.

**Деплой:** статичний HTML на shared-хостинг (Hostinger «Сайт PHP/HTML») + один `submit.php` для прийому заявок і відправки у Telegram.

---

## Локальна розробка

```bash
npm install
npm run dev
# http://localhost:3000
```

⚠️ У dev-режимі форми постять на `/submit.php`, якого локально нема — відправка покаже помилку. Це нормально. Для перевірки відправки використовуй деплой або підняти PHP поряд (див. нижче).

## Production build

```bash
npm run build
# результат: ./out — папка зі статичним сайтом для shared-хостингу
```

Папка `out/` додана в `.gitignore` — не комітимо.

---

## Деплой на Hostinger (Сайт PHP/HTML)

### Що завантажити в `public_html/`

1. **Весь вміст `out/`** після `npm run build`. У корінь `public_html/`:
   - `index.html`, інші `*/index.html`
   - `_next/` (CSS, JS, статика)
   - `brand/` (зображення продукції)
2. **`php/submit.php`** → переклади в `public_html/submit.php`
3. **`php/submit.config.php`** (створи на сервері, в репо його немає) → `public_html/submit.config.php`

Кінцева структура `public_html/`:
```
public_html/
├── index.html
├── _next/
│   └── …
├── brand/
│   └── …
├── submit.php
└── submit.config.php   ← секрети
```

### Створити `submit.config.php` на хостингу

Скопіюй вміст `php/submit.config.example.php` і встав реальні значення:

```php
<?php
return [
    'telegram_bot_token' => '123456789:AA...',   // від @BotFather
    'telegram_chat_id'   => '-1001234567890',     // або id особистого чату
];
```

Як отримати дані:
1. У Telegram: написати `@BotFather` → `/newbot` → отримати **token**.
2. Додати бота у потрібний чат/групу.
3. `chat_id`:
   - особистий чат — `@userinfobot`
   - група — `@RawDataBot` (поле `chat.id`, у груп зазвичай від'ємне число)

### Перевірка після deploy

```bash
curl -X POST https://twoy-domen.ua/submit.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+380671234567","activity_type":"Магазин","privacy":true,"source":"curl"}'
# очікувано: {"ok":true}
```

Якщо повертає `{"ok":false,"error":"Сервер не сконфігуровано"}` → перевір `submit.config.php` (наявність файлу і коректні значення).

### Безпека

- `submit.config.php` лежить серед PHP-файлів. Apache виконує PHP, тому при прямому запиті `https://domain/submit.config.php` віддається порожня відповідь — секрети не видно. Для додаткової паранойі можна `chmod 600`.
- Токен **ніколи** не потрапляє у JS-бандл і не видний у DevTools.
- На формі є honeypot (приховане поле `website`). Якщо бот його заповнить — заявка тихо ігнорується (фронт бачить success, у Telegram нічого не йде).

---

## GitHub workflow

Можеш одразу пушити в репо:

```bash
git init
git add .
git commit -m "init: REMICO landing"
git branch -M main
git remote add origin git@github.com:<you>/remico-landing.git
git push -u origin main
```

`out/`, `node_modules/`, `submit.config.php` — у `.gitignore`. У git попадають тільки джерела + `php/submit.php` + `php/submit.config.example.php`.

Розгортання на новій машині:
```bash
git clone …
cd remico-landing
npm install
npm run build   # генерує out/
# далі — заливаєш out/ + submit.php + свій submit.config.php на хостинг
```

---

## Структура проєкту

```
app/
  layout.tsx              — корінь, шрифт Manrope, метадані, OG
  page.tsx                — збірка секцій
  globals.css             — Tailwind layer + кастомні класи (btn-*, field-*)
components/
  Header.tsx              — sticky, hide-on-scroll, mobile drawer
  Hero.tsx                — H1 + микроаргументи + форма
  ProductBand.tsx         — full-bleed band з family.png
  About.tsx               — текст + 3 категорійні плитки
  MidForm.tsx             — зелений банер + біла картка-форма
  Benefits.tsx            — 5 переваг великими номерами + CTA
  Certificates.tsx        — сітка карток-документів + CTA
  FinalForm.tsx           — секція "Стати партнером" + контакти
  Footer.tsx              — лого, навігація, контакти, документи
  LeadForm.tsx            — універсальна форма (variants: card/inverse/bare)
  PopupForm.tsx           — модальна форма (Esc / backdrop / ×)
  PopupContext.tsx        — провайдер відкриття попапу
  OpenPopupButton.tsx     — кнопка-тригер попапу для serverside-секцій
  StickyMobileCTA.tsx     — нижня sticky-кнопка (mobile only)
  FloatingWidget.tsx      — floating FAB (desktop only)
  Logo.tsx                — логотип
lib/
  types.ts                — LeadPayload, ACTIVITY_TYPES
  validation.ts           — validateLead()
php/
  submit.php              — серверний endpoint, відправка у Telegram
  submit.config.example.php — шаблон конфігу (без секретів)
public/brand/             — продуктові зображення (логотип, фото, баннери)
public/docs/              — *СЮДИ покласти реальні PDF сертифікати*
                            (шляхи прописані в components/Certificates.tsx)
```

---

## Як замінити заглушки реальними даними

| Що                            | Файл                                              |
| ----------------------------- | ------------------------------------------------- |
| Телефон у header / футер / FinalForm | `components/Header.tsx`, `Footer.tsx`, `FinalForm.tsx` (константи `PHONE_DISPLAY`/`PHONE_HREF`) |
| Email                         | `components/Footer.tsx`, `FinalForm.tsx`          |
| Соцмережі                     | `components/Header.tsx` (drawer), `Footer.tsx`    |
| Сертифікати (PDF)             | покласти у `public/docs/`, оновити `DOCS` у `components/Certificates.tsx` |
| Адреса / Google Maps          | блок у `components/Footer.tsx` (зараз decorative placeholder) |
| Політика конфіденційності     | створити сторінку або замінити anchor `#privacy` у `LeadForm.tsx` і `Footer.tsx` |
| OG-зображення                 | оновити `images` у `app/layout.tsx`               |
| Канонічний домен              | `metadataBase` у `app/layout.tsx`                 |
| Telegram токен/chat_id        | `submit.config.php` на сервері                     |

---

## Конверсійні точки

1. **Hero** — форма у першому екрані (id: `hero-form`).
2. **MidForm** після "Про компанію" — біла картка на зеленому банері.
3. **FinalForm** перед футером (id: `partner`).
4. **Popup** — той самий `LeadForm` у модалці, тригериться з:
   - CTA `Стати партнером` у header (desktop + mobile drawer);
   - CTA `Обговорити співпрацю` після Benefits;
   - CTA `Запросити документи та умови` після Certificates;
   - **Sticky mobile bar** знизу (показ після 480px скролу);
   - **Floating FAB** справа знизу (desktop, показ після 700px скролу).

Усі форми йдуть на той самий `/submit.php`, передаючи `source` для аналітики в Telegram-повідомленні.

---

## Бренд-токени

CSS-токени винесено в `tailwind.config.ts → theme.colors`:

```
brand.green       #1F8F3D   — primary CTA, чистота, retail
brand.green-deep  #176E2F   — hover/active
brand.green-soft  #E8F4EB   — soft surface
brand.red         #E11D17   — акції, головний бренд-акцент (лого)
brand.purple      #6B4DE0   — додатковий акцент (бейджі, hover)
ink               #0F1410   — основний текст, темний футер
paper             #FAFAF6   — основний фон
```

Шрифт — Manrope (cyrillic+latin) через `next/font/google`. На static export Next.js вшиває шрифти у `_next/static/media/` — без CDN-залежності в продакшені.

---

## Що НЕ зроблено (свідомо)

- **Реальні PDF сертифікатів** — карточки готові, шляхи зарезервовані у `public/docs/`. Покласти реальні файли.
- **Реальна адреса/мапа** — у футері decorative placeholder, оскільки адреса не передавалась.
- **Сторінки `/privacy` і `/terms`** — посилання-anchors. Створити або винести у документи.
- **Аналітика (GA4/Meta Pixel)** — не підключено. Місце — `app/layout.tsx`.
- **Rate-limit `/submit.php`** — є honeypot. За потреби можна додати простий file-based rate limit за IP усередині `submit.php`.
