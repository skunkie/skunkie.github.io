---
title: Справочник API
weight: 2
sidebar:
  icon: code
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay предоставляет полнофункциональный RESTful API для программного управления. Полная спецификация OpenAPI доступна по адресу [`api/api.yaml`](https://github.com/torrplay/torrplay/blob/main/api/api.yaml).

Кроме того, ознакомиться с документацией API можно в **[Scalar](/openapi/)**.

## Базовый URL

Все эндпоинты API задаются относительно:

```
http://localhost:8090
```

## Эндпоинты

### Аутентификация

| Метод  | Эндпоинт         | Описание                                                      |
| ------ | ---------------- | ------------------------------------------------------------- |
| `POST` | `/oauth/token`   | Получение JWT-токена администратора (Bearer auth)             |
| `POST` | `/api/v1/tokens` | Создание делегированного токена воспроизведения (scope: play) |

### Основной API

| Метод    | Эндпоинт                          | Описание                                                 |
| -------- | --------------------------------- | -------------------------------------------------------- |
| `GET`    | `/api/v1/torrents`                | Получение списка всех торрентов                          |
| `POST`   | `/api/v1/torrents`                | Добавление нового торрента                               |
| `GET`    | `/api/v1/torrents/{hash}`         | Получение метаданных торрента                            |
| `PATCH`  | `/api/v1/torrents/{hash}`         | Обновление метаданных торрента                           |
| `DELETE` | `/api/v1/torrents/{hash}`         | Удаление торрента                                        |
| `PUT`    | `/api/v1/torrents/{hash}/preload` | Запуск или обновление предзагрузки торрента              |
| `GET`    | `/api/v1/torrents/{hash}/preload` | Получение статуса и прогресса буфера предзагрузки        |
| `DELETE` | `/api/v1/torrents/{hash}/preload` | Отмена активной предзагрузки                             |
| `GET`    | `/api/v1/torrents/backup`         | Создание резервной копии торрентов и постеров            |
| `POST`   | `/api/v1/torrents/restore`        | Восстановление торрентов и постеров из резервной копии   |
| `GET`    | `/api/v1/stream/{hash}`           | Потоковая передача файла торрента                        |
| `HEAD`   | `/api/v1/stream/{hash}`           | HEAD-запрос для файла, доступного для потоковой передачи |
| `GET`    | `/api/v1/playlist`                | Генерация M3U-плейлиста для потоковой передачи           |
| `GET`    | `/api/v1/settings`                | Получение настроек приложения                            |
| `PATCH`  | `/api/v1/settings`                | Обновление настроек приложения                           |

### Протокол Stremio Addon

| Метод | Эндпоинт                                    | Описание                                                     |
| ----- | ------------------------------------------- | ------------------------------------------------------------ |
| `GET` | `/stremio/manifest.json`                    | Манифест аддона Stremio                                      |
| `GET` | `/stremio/{token}/manifest.json`            | Манифест аддона с авторизацией по токену в URL               |
| `GET` | `/stremio/catalog/{type}/{id}.json`         | Просмотр каталога фильмов или сериалов                       |
| `GET` | `/stremio/meta/{type}/{id}.json`            | Получение метаданных и списка серий                          |
| `GET` | `/stremio/stream/{type}/{id}.json`          | Получение ссылок на потоковое воспроизведение                |
| `GET` | `/stremio/play/{hash}/{fileIdx}/{filename}` | Обработчик прямого воспроизведения с поддержкой Range-header |

### Статистика

| Метод | Эндпоинт                     | Описание                                        |
| ----- | ---------------------------- | ----------------------------------------------- |
| `GET` | `/api/stats/memory`          | Получение общей статистики использования памяти |
| `GET` | `/api/stats/torrents/{hash}` | Получение статистики по торренту                |

### Система

| Метод | Эндпоинт              | Описание                             |
| ----- | --------------------- | ------------------------------------ |
| `GET` | `/api/system/health`  | Проверка работоспособности           |
| `GET` | `/api/system/info`    | Получение информации о приложении    |
| `GET` | `/api/system/logs`    | Получение журналов работы приложения |
| `GET` | `/api/system/metrics` | Получение системных метрик           |
| `GET` | `/metrics`            | Экспорт метрик Prometheus            |

### Совместимость с qBittorrent

| Метод  | Эндпоинт               | Описание                                              |
| ------ | ---------------------- | ----------------------------------------------------- |
| `POST` | `/api/v2/torrents/add` | Добавление нового торрента (совместимо с qBittorrent) |

### Совместимость с TorrServer

| Метод  | Эндпоинт               | Описание                                                 |
| ------ | ---------------------- | -------------------------------------------------------- |
| `POST` | `/cache`               | Получение статистики кэша                                |
| `GET`  | `/echo`                | Проверка состояния сервера                               |
| `GET`  | `/play/{hash}/{index}` | Потоковая передача содержимого торрента                  |
| `POST` | `/settings`            | Обновление настроек                                      |
| `GET`  | `/stream/{filename}`   | Потоковая передача или предварительная загрузка торрента |
| `POST` | `/torrents`            | Управление торрентами                                    |
| `POST` | `/torrent/upload`      | Добавление нового торрента                               |
| `POST` | `/viewed`              | Управление тегами просмотра торрентов                    |

## Потоковая передача

Для потоковой передачи файлов из торрента укажите хеш и URL-кодированный путь к файлу:

```text
http://localhost:8090/api/v1/stream/{hash}?path={url_encoded_path}
```

Если включена аутентификация, добавьте токен воспроизведения:

```text
http://localhost:8090/api/v1/stream/{hash}?path={url_encoded_path}&token={playback_token}
```

Пример запроса:

```text
http://localhost:8090/api/v1/stream/dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c?path=Big.Buck.Bunny.1080p.mp4
```

## Аутентификация

При включённой аутентификации учётные данные необходимо указывать в составе каждого запроса. Подробности в разделе [Аутентификация](/docs/authentication).

### Базовая аутентификация

Имя пользователя и пароль указываются в составе каждого запроса:

```sh
curl -u your-username:your-password http://localhost:8090/api/v1/torrents
```

### Токен Bearer

JWT-токен указывается в заголовке `Authorization`. При этом защищены все эндпоинты.

```sh
curl -H "Authorization: Bearer your-jwt-token" http://localhost:8090/api/v1/torrents
```

### Получение токена

```sh
curl -X POST http://localhost:8090/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=your-username&password=your-password"
```

## Пример: добавление торрента

```sh
curl -X POST http://localhost:8090/api/v1/torrents \
  -H "Content-Type: application/json" \
  -d '{
    "magnet": "magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny"
  }'
```
