---
title: Authentication
weight: 3
bookIcon: lock
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Authentication

TorrPlay secures its API endpoints using two authentication methods, configurable via the `/api/v1/settings` endpoint.

By default, authentication is **disabled**.

## Authentication Types

### Basic Authentication (`basic`)

Requires username and password with every API request. Applies to all endpoints **except** streaming endpoints (`/api/v1/stream/*`), allowing media players to access streams without authentication.

### Bearer Token Authentication (`bearer`)

Token-based authentication using JSON Web Tokens (JWT). All endpoints are protected, including streaming (handled via session cookie).

## Enabling Authentication

TorrPlay supports two authentication types. Choose the one that fits your use case:

{{< tabs "auth-type" >}}
{{< tab "Basic Auth" >}}

Username and password are sent with every request using HTTP Basic Auth. Stream endpoints remain unauthenticated for media player compatibility.

{{< /tab >}}
{{< tab "Bearer Token Auth" >}}

JWT tokens are used for authentication. All endpoints including streaming are protected. A secure `HttpOnly` session cookie is also set for browser-based access.

{{< /tab >}}
{{< /tabs >}}

### Enable Basic Auth

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "enabled": true,
      "type": "basic",
      "username": "admin",
      "password": "your-password"
    }
  }'
```

### Enable Bearer Token Auth

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "enabled": true,
      "type": "bearer",
      "username": "admin",
      "password": "your-password"
    }
  }'
```

When enabling `bearer` auth, a JWT secret is automatically generated and stored.

## Obtaining a Token (Bearer Auth)

The `/oauth/token` endpoint is **only available** when `bearer` auth is enabled:

```sh
curl -X POST http://localhost:8090/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=admin&password=your-password"
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

A secure, `HttpOnly` session cookie is also set in the browser.

## Making Authenticated Requests

### With a Bearer Token

Include the JWT token in the `Authorization` header of each request:

```sh
curl -H "Authorization: Bearer your-jwt-token" http://localhost:8090/api/v1/torrents
```

### With Basic Auth

Use the `-u` flag with curl to send username and password:

```sh
curl -u admin:your-password http://localhost:8090/api/v1/torrents
```

### Cookie Authentication (Bearer)

When using bearer auth in a browser, the session cookie obtained from `/oauth/token` is automatically included in requests to streaming endpoints. The cookie is marked `HttpOnly` to prevent XSS access.

## Recovery: Disabling Authentication

If you forget your credentials, temporarily disable authentication:

```sh
TORRPLAY_DISABLE_AUTH=true ./torrplay --data-dir=./data
```

This allows API access without credentials. Reset your settings via the API, then remove the environment variable and restart.
