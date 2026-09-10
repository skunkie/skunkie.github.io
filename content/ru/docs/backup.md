---
title: Резервное копирование и восстановление
weight: 8
sidebar:
  icon: archive
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay позволяет выгружать и восстанавливать всю библиотеку торрентов: метаданные, категории, постеры и хэши. Это удобно для переноса раздач между серверами или создания резервной копии перед обновлением.

---

## Создание резервной копии

```sh
GET /api/v1/torrents/backup
```

Возвращает файл JSON с метаданными всех раздач (хэши, magnet-ссылки, названия, категории, постеры и настройки). Чтобы скачать резервную копию:

```sh
curl -o torrplay.backup http://localhost:8090/api/v1/torrents/backup
```

---

## Восстановление из резервной копии

```sh
POST /api/v1/torrents/restore
```

Отправьте файл резервной копии в формате `multipart/form-data`:

```sh
curl -X POST http://localhost:8090/api/v1/torrents/restore \
  -F "file=@torrplay.backup"
```

TorrPlay заново добавит все раздачи из бэкапа с их сохранёнными метаданными.

---

## Обновление метаданных в резервной копии

Перед восстановлением в файл бэкапа можно загрузить свежие метаданные (постеры, точные названия, категории) из TheTVDB с помощью команды `metadata`:

### Доступные параметры

| Флаг                    | Описание                                                   | По умолчанию                   |
| ----------------------- | ---------------------------------------------------------- | ------------------------------ |
| `--backup <path>`       | Входной файл резервной копии                               | `torrplay.backup`              |
| `--output <path>`       | Путь к выходному файлу                                     | `<имя_входного_файла>.updated` |
| `--category`            | Обновление категорий (Movies / Series)                     | Отключено                      |
| `--poster`              | Загрузка постеров                                          | Отключено                      |
| `--title`               | Обновление названий из внешнего сервиса                    | Отключено                      |
| `--language <lang>`     | Код языка (например, `eng`, `spa`, `rus`)                  | —                              |
| `--provider <provider>` | Провайдер метаданных (сейчас поддерживается только `tvdb`) | —                              |
| `--api-key <key>`       | API-ключ выбранного сервиса                                | —                              |

> **Примечание:** флаги `--poster` и `--title` требуют указания `--api-key`.

### Пример использования

Загрузка постеров и названий из TheTVDB на русском языке:

```sh
./torrplay metadata \
  --backup torrplay.backup \
  --poster --title \
  --language rus \
  --provider tvdb \
  --api-key YOUR_TVDB_API_KEY
```

Команда создаст файл `torrplay.backup.updated`. Другой путь можно задать через флаг `--output`.

---

## Полный процесс переноса библиотеки

```mermaid
graph LR
    Inst1["Исходный сервер TorrPlay"] -->|1. GET /api/v1/torrents/backup| File["torrplay.backup"]
    File -->|2. Добавление метаданных: ./torrplay metadata| Updated["torrplay.backup.updated"]
    Updated -->|3. POST /api/v1/torrents/restore| Inst2["Целевой сервер TorrPlay"]
```

```sh
# 1. Скачивание резервной копии с исходного сервера
curl -o torrplay.backup http://source-host:8090/api/v1/torrents/backup

# 2. (Необязательно) Обновление метаданных
./torrplay metadata --backup torrplay.backup --poster --title --provider tvdb --api-key YOUR_TVDB_API_KEY

# 3. Восстановление на новом сервере
curl -X POST http://target-host:8090/api/v1/torrents/restore \
  -F "file=@torrplay.backup.updated"
```
