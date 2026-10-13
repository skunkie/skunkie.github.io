---
name: russian-technical-translation
description: Guidelines and principles for translating and writing natural, idiomatic Russian technical documentation for software and developer tools. Use this skill whenever writing, translating, or reviewing Russian documentation (content/ru/) to avoid mechanical translation, English grammatical calques, and awkward passive phrasing.
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Russian Technical Translation Skill

This skill provides principles, terminology, and editorial guidelines for writing and translating documentation into natural, technically fluent Russian.

## Core Objective

Documentation in Russian must read as if it were originally authored by an experienced Russian-speaking systems engineer or technical writer. It must **never** feel like a mechanical, word-for-word translation (calque) from English.

---

## 1. Major Anti-Patterns of Mechanical Translation

### A. Overuse of Passive Voice & Copula Verbs ("является", "быть")

- **Mechanical:** `TorrPlay является приложением для потоковой передачи торрентов.`
- **Natural:** `TorrPlay — приложение для потоковой передачи торрентов.`
- **Mechanical:** `Этот токен может быть использован внешними плеерами.`
- **Natural:** `Этот токен используют внешние плееры.` / `Токен подходит для внешних плееров.`

### B. Long Chains of Genitive Case (Нанизывание родительного падежа)

- **Mechanical:** `Процесс генерации токена аутентификации пользователя для получения доступа к потоку...`
- **Natural:** `Создание токена доступа к потоку...`

### C. Bureaucratic & Wordy Calques (Канцелярит и буквализм)

| Mechanical Translation    | Natural Russian                                             | Context / Rationale                                                                                               |
| :------------------------ | :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| в целях обеспечения       | чтобы / для                                                 | Simplify bureaucratic fluff                                                                                       |
| при осуществлении запуска | при запуске                                                 | Avoid split verbs with "осуществление"                                                                            |
| данный / соответствующий  | этот / нужный / omit                                        | Avoid unnecessary demonstratives                                                                                  |
| в экземпляре включена     | в TorrPlay включена                                         | "Экземпляр" is often a clunky calque for "instance"                                                               |
| позволяет вам выполнять   | позволяет выполнять / вы можете                             | Avoid literal "allows you to"                                                                                     |
| предоставляет возможность | умеет / поддерживает / позволяет                            | Avoid pompous phrases                                                                                             |
| под капотом               | внутри / на уровне соответствующей подсистемы               | "Under the hood" calque; name the component when it matters                                                       |
| бесшовный / бесшовно      | плавно / без разрывов / напрямую                            | Overused corporate buzzword                                                                                       |
| обогащение / обогатить    | добавление / загрузка / обновление                          | Avoid "обогащение" and its derivatives (calque of "enrich/enrichment")                                            |
| медиа-маршруты            | эндпоинты стриминга / запросы к видеопотокам или плейлистам | Literal calque of "media routes"; specify actual endpoints or operations                                          |
| прямо из / прямо в        | из / в / внутри / omit                                      | Unnecessary emphatic particle calqued from "directly from / right in"; avoid unless critical to distinguish paths |
| конечная точка            | эндпоинт / маршрут API                                      | Literal calque of "endpoint"; use standard developer terminology                                                  |
| бандл приложения          | пакет приложения                                            | Calque of macOS "application bundle"                                                                              |
| построен на базе          | написан на / разработан на                                  | Wordy calque of "built on top of"                                                                                 |
| уровень severity          | уровень важности                                            | Mixed-language calque for log severity level                                                                      |
| нативная поддержка        | встроенная поддержка                                        | Calque of "native support" when referring to browser/platform built-in features                                   |
| ридеры (потоков)          | потоки чтения / воспроизведения                             | Literal calque of stream "readers" (io.Reader)                                                                    |

### D. Clunky Prepositional Phrases

- **Mechanical:** `В случае если вы забыли пароль...`
- **Natural:** `Если вы забыли пароль...`
- **Mechanical:** `При нажатии на кнопку в веб-интерфейсе авторизованного пользователя сгенерированная ссылка содержит...`
- **Natural:** `Если нажать кнопку в веб-интерфейсе после входа, ссылка сразу содержит...`

### E. Pronouns & Lowercase «вы»

- **Never capitalize «Вы» / «Ваш» mid-sentence.** The courtesy capital belongs to personal letters and marketing copy, not technical documentation. Write `вы`, `вас`, `вам`, `ваш`, capitalizing them only at the start of a sentence.
- **Omit pronouns that add nothing:**
  - **Mechanical:** `Укажите ваше имя пользователя и ваш пароль.`
  - **Natural:** `Укажите имя пользователя и пароль.`

### F. Colloquial Developer Slang (Разговорный жаргон)

Documentation must maintain a professional and polished technical tone. Avoid spoken/chat developer slang:

- **Colloquial:** `бинарник` → **Professional:** `исполняемый файл` / `бинарный файл`
- **Colloquial:** `либа` → **Professional:** `библиотека`
- **Colloquial:** `тулза` → **Professional:** `утилита` / `инструмент`
- **Colloquial:** `конфа` → **Professional:** `конфигурация` / `настройки`
- **Colloquial:** `репа` → **Professional:** `репозиторий`
- **Colloquial:** `деплоить` → **Professional:** `развёртывать`
- **Colloquial:** `фича` → **Professional:** `возможность` / `функция`

---

## 2. Technical Terminology Standards

Use established Russian IT terminology while preserving English technical terms where standard:

| Concept / English Term    | Standard Russian                             | Notes / Avoid                                                         |
| :------------------------ | :------------------------------------------- | :-------------------------------------------------------------------- |
| **Authentication**        | Аутентификация                               | Not "авторизация" (keep authentication vs authorization distinct)     |
| **Authorization**         | Авторизация                                  | Granting permissions / access control                                 |
| **Playback Token**        | Токен воспроизведения / делегированный токен | Natural and concise                                                   |
| **Streaming**             | Потоковая передача / стриминг                | Both are acceptable; avoid archaic "вещание" unless broadcast context |
| **Memory Storage**        | Хранилище в оперативной памяти (RAM)         | Clear distinction from disk storage                                   |
| **File Storage**          | Файловое хранилище                           | Persistent disk storage                                               |
| **Background Downloader** | Фоновый загрузчик                            | Natural Russian noun phrase                                           |
| **Drop-in replacement**   | Полная замена / прямая совместимость         | Translate function, not idiom                                         |
| **Endpoint**              | Эндпоинт / маршрут API                       | Avoid literal calque "конечная точка"                                 |
| **Least privilege**       | Принцип наименьших привилегий                | Standard security terminology                                         |
| **Hash**                  | Хеш                                          | Dictionary spelling is `хеш`, not `хэш`                               |

### Name the Component Behind “Engine”

Do not translate **engine** with the generic `движок`. Name the component by its architectural role instead. Depending on context, use `подсистема потокового воспроизведения`, `BitTorrent-клиент`, `HTTP-сервер`, `Go-бэкенд`, or another precise term. Check the source architecture rather than choosing one replacement mechanically.

### Animacy of Borrowed Technical Nouns

Borrowed nouns that name software (`плеер`, `клиент`, `сервер`) are inanimate: the accusative matches the nominative.

- **Natural:** `выберите плеер`, `подключать внешние плееры`.
- **Avoid:** `выберите плеера`, `подключать внешних плееров`. The animate form is for a person, such as a client in the sense of a customer.
- Genitive forms are unaffected: `для внешних плееров`, `установка сервера`.

---

## 3. Typography & Units

- **Letter «ё»:** Always write «ё» where it belongs, including short participles (`включён`, `сохранён`) and words like `её`, `ещё`, `объём`, `учётный`. Watch the pairs it distinguishes, such as `все` / `всё`.
- **Units:** Put a space between a number and its unit: `30 с`, `64 MiB`. Keep binary size units in their IEC form (`KiB`, `MiB`, `GiB`) so they match the English pages and the setting values.
- **Quotation marks:** Use angle quotes («ёлочки») in prose: `«Фильмы», «Сериалы» и пользовательские категории`. For quotes inside quotes, use „лапки“. Straight quotes (`"..."`) are reserved for syntax: code, front matter, shortcode parameters, and diagram labels.
- **Dashes & hyphens:** Use an em-dash (`—`) with spaces for definitions, contrasts, and asides: `TorrPlay — приложение для потоковой передачи торрентов`. Use a hyphen without spaces in compound words: `веб-интерфейс`, `magnet-ссылка`.

---

## 4. Accuracy Before Wording

A faithful translation of a wrong English sentence is still wrong. Settle what a sentence means before deciding how it reads.

- **Describe what the code does.** When a page describes behavior, defaults, or limits, check them against the TorrPlay source ([torrplay/torrplay](https://github.com/torrplay/torrplay)) before writing or translating.
- **Cover everything a setting controls.** A setting's description names every area it affects, not only the most visible one.
- **Fix the English source first.** When the English page uses vague jargon or states something inaccurate, correct the English page and then translate the corrected text, keeping both languages in the same change.
- **Claims need code.** Every feature claim must point to code that implements it. Remove an unsupported claim from both languages rather than translating it.

---

## 5. Code, Command & Placeholder Rules

Always uphold Rule 5 from `AGENTS.md`:

- **Code, commands, flags, parameters, and snippets are NEVER translated into Russian.**
- All shell commands (`curl`, `docker`, CLI flags), JSON keys, and placeholder tokens (`your-username`, `your-password`, `your-jwt-token`, `YOUR_API_KEY`) remain in English across all Russian pages.
- Explanatory comments inside shell snippets may be in Russian, provided they are concise and natural.
- In reference tables, schema type names stay in English, including their qualifiers: `boolean`, `string (enum)`, `array of strings`. Only a unit in brackets is translated: `integer (байт)`, `integer (байт/с)`.

---

## 6. Self-Review Checklist

When translating or editing a Russian document:

1. **Read Aloud Test:** Read the sentences aloud. Do they flow naturally in Russian syntax, or do they feel like English sentences with Russian words substituted in?
2. **Eliminate Wordiness:** Cut words like `является`, `данный`, `осуществление`, `в целях`.
3. **Tone:** Keep the tone professional, direct, concise, and helpful (second-person plural imperative: `откройте`, `укажите`, `проверьте`).
4. **Pronouns:** Are `вы`, `вам`, `ваш` lowercase except at the start of a sentence, and are pronouns that add nothing removed?
5. **Typography:** Is «ё» written everywhere it belongs, are units separated by a space, prose quotes in «ёлочки», and em-dashes (`—`) spaced correctly?
6. **Terminology & Grammar:** Is each concept named by one term throughout (`хеш`), and do borrowed software nouns take the inanimate accusative (`выберите плеер`)?
7. **Accuracy:** Does each statement match what TorrPlay actually does, and does every feature claim have code behind it?
8. **Code Isolation:** Are all commands, JSON keys, endpoints, and placeholders untouched in English?
