---
title: Аутентификация
weight: 3
sidebar:
  icon: lock-closed
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay защищает API и стриминг с помощью двух методов аутентификации, которые настраиваются через `/api/v1/settings`.

По умолчанию аутентификация **отключена**.

## Типы аутентификации

### Базовая аутентификация (`basic`)

Требует передачи логина и пароля в каждом запросе через стандартный HTTP-заголовок `Authorization: Basic ...`.

### Аутентификация по Bearer-токену (`bearer`)

Работает на основе JWT (JSON Web Tokens). Токен передаётся в заголовке `Authorization: Bearer <token>`.

## Включение аутентификации

{{< tabs >}}
{{< tab name="Basic Auth" >}}

Имя пользователя и пароль требуются для всех операций API.

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "enabled": true,
      "type": "basic",
      "username": "your-username",
      "password": "your-password"
    }
  }'
```

{{< /tab >}}
{{< tab name="Bearer Token Auth" >}}

JWT-токены используются для доступа ко всем эндпоинтам приложения.

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "enabled": true,
      "type": "bearer",
      "username": "your-username",
      "password": "your-password"
    }
  }'
```

При включении режима `bearer` секретный ключ JWT генерируется и сохраняется автоматически.

{{< /tab >}}
{{< /tabs >}}

## Получение токена (Bearer Auth)

Эндпоинт `/oauth/token` доступен только при включённом режиме `bearer`:

```sh
curl -X POST http://localhost:8090/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=your-username&password=your-password"
```

Пример ответа:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Делегированные токены воспроизведения (Playback Tokens)

Если в TorrPlay включена аутентификация (Basic или Bearer), стриминг (`/api/v1/stream/*`), генерация плейлистов (`/api/v1/playlist`) и потоки Stremio также защищаются.

Чтобы подключать внешние плееры (VLC, Infuse, Kodi, Smart TV) без передачи пароля администратора или постоянных JWT-токенов в строке URL, TorrPlay поддерживает **делегированные токены воспроизведения**:

### Создание токена воспроизведения

**Эндпоинт:** `POST /api/v1/tokens`

```sh
curl -X POST http://localhost:8090/api/v1/tokens \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"scope": "playback"}'
```

_(При использовании Basic Auth укажите `-u your-username:your-password` вместо заголовка Bearer)._

Пример ответа:

```json
{
  "token": "tp_play_9f8a3c2e1b...",
  "scope": "playback",
  "expires_at": "2026-09-11T16:00:00Z"
}
```

### Использование токенов воспроизведения в ссылках

Передайте полученный токен в параметре запроса `token`:

```text
http://localhost:8090/api/v1/stream/{hash}?path=video.mp4&token=tp_play_9f8a3c2e1b...
http://localhost:8090/api/v1/playlist?token=tp_play_9f8a3c2e1b...
```

> [!IMPORTANT]
> **Принцип наименьших привилегий:** передача токена в строке запроса (`?token=...`) работает только для токенов с ролью `playback` и исключительно при запросах к видеопотокам или плейлистам. Передать административный токен через параметр URL нельзя — сервер отклонит такой запрос, чтобы исключить утечку ключей через журнал прокси или историю браузера.

## Выполнение авторизованных запросов к API

### С токеном Bearer

Передавайте JWT-токен в заголовке `Authorization`:

```sh
curl -H "Authorization: Bearer your-jwt-token" http://localhost:8090/api/v1/torrents
```

### С Basic Auth

Используйте флаг `-u` в curl:

```sh
curl -u your-username:your-password http://localhost:8090/api/v1/torrents
```

## Восстановление доступа

Если вы забыли учётные данные, аутентификацию можно временно отключить, перезапустив TorrPlay с переменной окружения `TORRPLAY_DISABLE_AUTH`:

```sh
TORRPLAY_DISABLE_AUTH=true ./torrplay --data-dir=./data
```

Это откроет полный доступ к API без запроса логина и пароля. Обновите настройки через `PATCH /api/v1/settings`, затем удалите переменную окружения и перезапустите TorrPlay в обычном режиме.
