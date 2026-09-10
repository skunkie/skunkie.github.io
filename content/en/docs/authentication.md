---
title: Authentication
weight: 3
sidebar:
  icon: lock-closed
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay secures its API and streaming endpoints using two authentication methods, configurable via the `/api/v1/settings` endpoint.

By default, authentication is **disabled**.

## Authentication Types

### Basic Authentication (`basic`)

Requires username and password with every API request via the standard HTTP `Authorization: Basic ...` header.

### Bearer Token Authentication (`bearer`)

Token-based authentication using JSON Web Tokens (JWT). API requests pass the JWT in the `Authorization: Bearer <token>` header.

## Enabling Authentication

{{< tabs >}}
{{< tab name="Basic Auth" >}}

Username and password are required for all API operations.

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

JWT tokens are used for authentication across all endpoints.

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

When enabling `bearer` auth, a JWT secret is automatically generated and securely stored.

{{< /tab >}}
{{< /tabs >}}

## Obtaining a Token (Bearer Auth)

The `/oauth/token` endpoint is available when `bearer` auth is enabled:

```sh
curl -X POST http://localhost:8090/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=your-username&password=your-password"
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Scoped Playback Tokens

When authentication is enabled (either Basic or Bearer), streaming endpoints (`/api/v1/stream/*`), playlist generation (`/api/v1/playlist`), and Stremio streams require authentication.

To support external media players (such as VLC, Infuse, Kodi, or Smart TVs) without exposing full administrative credentials or passing admin tokens in URL query strings, TorrPlay provides **scoped playback delegation tokens**:

### Creating a Playback Token

**Endpoint:** `POST /api/v1/tokens`

```sh
curl -X POST http://localhost:8090/api/v1/tokens \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"scope": "playback"}'
```

_(For Basic Auth, supply `-u your-username:your-password` instead of the Bearer header)._

Response:

```json
{
  "token": "tp_play_9f8a3c2e1b...",
  "scope": "playback",
  "expires_at": "2026-09-11T16:00:00Z"
}
```

### Using Playback Tokens in Media URLs

Pass the token as a `token` query parameter in streaming and playlist URLs:

```text
http://localhost:8090/api/v1/stream/{hash}?path=video.mp4&token=tp_play_9f8a3c2e1b...
http://localhost:8090/api/v1/playlist?token=tp_play_9f8a3c2e1b...
```

> [!IMPORTANT]
> **Least Privilege:** Query parameter authentication is strictly restricted to playback-scoped tokens on media routes. Administrative tokens will be rejected if passed as query parameters to prevent token leakage in proxy logs, browser histories, or server access logs.

## Making Authenticated API Requests

### With a Bearer Token

Include the JWT token in the `Authorization` header:

```sh
curl -H "Authorization: Bearer your-jwt-token" http://localhost:8090/api/v1/torrents
```

### With Basic Auth

Use the `-u` flag with curl:

```sh
curl -u your-username:your-password http://localhost:8090/api/v1/torrents
```

## Recovery: Disabling Authentication

If you forget your credentials, you can temporarily bypass authentication by restarting TorrPlay with the `TORRPLAY_DISABLE_AUTH` environment variable:

```sh
TORRPLAY_DISABLE_AUTH=true ./torrplay --data-dir=./data
```

This allows full API access without credentials. Update your credentials or disable authentication via `PATCH /api/v1/settings`, then remove the environment variable and restart normally.
