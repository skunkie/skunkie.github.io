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
| под капотом               | внутри / на уровне движка                                   | "Under the hood" calque                                                                                           |
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

### E. Colloquial Developer Slang (Разговорный жаргон)

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

---

## 3. Code, Command & Placeholder Rules

Always uphold Rule 5 from `AGENTS.md`:

- **Code, commands, flags, parameters, and snippets are NEVER translated into Russian.**
- All shell commands (`curl`, `docker`, CLI flags), JSON keys, and placeholder tokens (`your-username`, `your-password`, `your-jwt-token`, `YOUR_API_KEY`) remain in English across all Russian pages.
- Explanatory comments inside shell snippets may be in Russian, provided they are concise and natural.

---

## 4. Self-Review Checklist

When translating or editing a Russian document:

1. **Read Aloud Test:** Read the sentences aloud. Do they flow naturally in Russian syntax, or do they feel like English sentences with Russian words substituted in?
2. **Eliminate Wordiness:** Cut words like `является`, `данный`, `осуществление`, `в целях`.
3. **Tone:** Keep the tone professional, direct, concise, and helpful (second-person plural imperative: `откройте`, `укажите`, `проверьте`).
4. **Punctuation:** Use em-dash (`—`) with surrounding spaces for definitions and contrasts.
