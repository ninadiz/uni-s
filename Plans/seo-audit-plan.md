# План устранения замечаний SEO-аудита

Дата аудита: 2026-08-15
Область: `site/` (Vite + React + react-router-dom, SSG-пререндеринг)

> Перед стартом уточнить: на какой домен реально уезжает эта сборка. Сейчас unis-tech.ru — другой (WordPress) сайт про поставки HILTI. Если этот репозиторий должен заменить его — часть пунктов (robots.txt, sitemap, canonical) должна ссылаться на итоговый домен.

## Критично

- [ ] **robots.txt** — добавить `site/public/robots.txt` с базовыми директивами (`User-agent: *`, `Allow: /`, `Disallow: /ui-kit`, `Sitemap: https://<домен>/sitemap.xml`).
- [ ] **sitemap.xml** — сгенерировать статический sitemap для реальных публичных маршрутов (`/`, `/services`, `/objects`, `/prices`) во время сборки (например, дописать генерацию в `scripts/prerender.mjs` или отдельный скрипт `scripts/sitemap.mjs`).
- [ ] **Canonical + Open Graph + Twitter Card** — расширить `src/pageMeta.ts` полями `canonical`, `ogImage` и т.д.; прокинуть их в `PageMeta.tsx` (клиент) и `entry-server.tsx` / `prerender.mjs` (SSR/пререндер), аналогично тому, как сейчас подставляются `title`/`description`.
- [ ] **JSON-LD LocalBusiness/Organization** — добавить структурированные данные (название, адрес, телефон, ИНН, соцсети) на главную страницу через компонент типа `<StructuredData>`, рендерящий `<script type="application/ld+json">`.
- [ ] **Наполнить `/services` контентом** — [site/src/pages/Services.tsx](../site/src/pages/Services.tsx) сейчас содержит только `<h1>`. Перенести/расширить список услуг из секции на главной ([Home.tsx:52-84](../site/src/pages/Home.tsx)) в полноценный текст с описанием каждой услуги.
- [ ] **Наполнить `/prices` контентом** — [site/src/pages/Prices.tsx](../site/src/pages/Prices.tsx) аналогично: таблица/список цен на алмазную резку, бурение, демонтаж, аренду оборудования.
- [ ] **Fallback-заголовок в index.html** — [site/index.html:7-8](../site/index.html) заменить пустые `title`/`description` на осмысленные значения по умолчанию (совпадающие с `defaultMeta` из `pageMeta.ts`), чтобы не-пререндеренные/будущие маршруты не отдавали пустоту.
- [ ] **404-страница и корректный статус** — добавить catch-all маршрут в `AppRoutes.tsx` (`<Route path="*" element={<NotFound />} />`) и настроить `.htaccess`/сервер так, чтобы несуществующие пути возвращали HTTP 404, а не 200 с пустым/дефолтным контентом.

## Средний приоритет

- [ ] **Закрыть `/ui-kit` от индексации** — добавить `noindex` (мета-тег `robots` для этого маршрута через `pageMeta.ts`/`PageMeta.tsx`/`entry-server.tsx`) и добавить `Disallow: /ui-kit` в robots.txt.
- [ ] **Удалить ссылки на displaay.net** — [site/src/components/Header.tsx:113-133](../site/src/components/Header.tsx) содержит скрытый блок ссылок (Profile/Studio/Team/Clients/Services/Join/Newsletter) на сторонний сайт-шаблон. Удалить полностью, если это остатки шаблона.
- [ ] **Отдельные страницы для объектов портфолио** — добавить динамический маршрут `/objects/:slug` (react-router), рендерящий данные из `src/lib/objects.ts` / `info.json` каждого объекта; на `/objects` карточки должны вести на эти страницы. Добавить их в sitemap.
- [ ] **Исправить иерархию заголовков** — в [ObjectCarouselCard.tsx:52](../site/src/components/ObjectCarouselCard.tsx) заменить `<h4>` на `<h3>` (или пересмотреть структуру секций так, чтобы не было пропуска уровней h1→h2→h3).
- [ ] **Реальные страницы вместо `href="#"`** — создать страницы «Политика конфиденциальности» и «Согласие на обработку персональных данных», обновить ссылки в [Footer.tsx:68,72](../site/src/components/Footer.tsx).

## Низкий приоритет

- [ ] Пересмотреть длину title: сократить заголовок главной ([pageMeta.ts:7](../site/src/pageMeta.ts)) примерно до 60 символов; добавить ключевые слова/локацию в короткие заголовки `/services` и `/prices`.
- [ ] Добавить `rel="noopener noreferrer"` явно на все внешние ссылки ([Header.tsx:102,105](../site/src/components/Header.tsx), [Footer.tsx:43-46](../site/src/components/Footer.tsx)).
- [ ] Удалить неиспользуемый `src/assets/hero.png`.

## Уже в порядке (не трогать)

- SSR-пререндеринг (`entry-server.tsx` + `scripts/prerender.mjs`) — реальный HTML для краулеров.
- 100% `<img>` с содержательными `alt`, `loading="lazy"`, `srcSet`/`sizes`.
- Внутренняя навигация на `<Link>`, один `<h1>` на страницу, `lang="ru"` везде, NAP-данные в футере.
