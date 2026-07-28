---
title: API Reference
weight: 2
bookIcon: code
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# API Reference

TorrPlay provides a comprehensive RESTful API for programmatic control. The full OpenAPI specification is available at [`api/api.yaml`](https://github.com/torrplay/torrplay/blob/main/api/api.yaml).

You can also interact with the API documentation using the **[Redoc](/openapi/)**.

## Base URL

All API endpoints are relative to:

```
http://localhost:8090
```

## Endpoints

### Authentication

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| `POST` | `/oauth/token` | Obtain a JWT token |

### Core API

| Method   | Endpoint                   | Description                        |
| -------- | -------------------------- | ---------------------------------- |
| `GET`    | `/api/v1/torrents`         | List all torrents                  |
| `POST`   | `/api/v1/torrents`         | Add a new torrent                  |
| `GET`    | `/api/v1/torrents/{hash}`  | Get torrent metadata               |
| `PATCH`  | `/api/v1/torrents/{hash}`  | Update torrent metadata            |
| `DELETE` | `/api/v1/torrents/{hash}`  | Delete a torrent                   |
| `GET`    | `/api/v1/torrents/backup`  | Backup torrents and posters        |
| `POST`   | `/api/v1/torrents/restore` | Restore torrents and posters       |
| `GET`    | `/api/v1/stream/{hash}`    | Stream a torrent file              |
| `HEAD`   | `/api/v1/stream/{hash}`    | HEAD request for a streamable file |
| `GET`    | `/api/v1/playlist`         | Generate a playlist for streaming  |
| `GET`    | `/api/v1/settings`         | Get application settings           |
| `PATCH`  | `/api/v1/settings`         | Update application settings        |

### Statistics

| Method | Endpoint                     | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| `GET`  | `/api/stats/memory`          | Get global memory statistics |
| `GET`  | `/api/stats/torrents/{hash}` | Get torrent statistics       |

### System

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| `GET`  | `/api/system/health`  | Health check                       |
| `GET`  | `/api/system/info`    | Get application information        |
| `GET`  | `/api/system/logs`    | Get recent application logs        |
| `GET`  | `/api/system/metrics` | Get system metrics                 |
| `GET`  | `/metrics`            | Prometheus metrics export endpoint |

### qBittorrent Compatibility

| Method | Endpoint               | Description                                |
| ------ | ---------------------- | ------------------------------------------ |
| `POST` | `/api/v2/torrents/add` | Add a new torrent (qBittorrent compatible) |

### TorrServer Compatibility

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| `POST` | `/cache`               | Get cache statistics      |
| `GET`  | `/echo`                | Server status check       |
| `GET`  | `/play/{hash}/{index}` | Stream torrent content    |
| `POST` | `/settings`            | Update settings           |
| `GET`  | `/stream/{filename}`   | Stream or preload torrent |
| `POST` | `/torrents`            | Manage torrents           |
| `POST` | `/torrent/upload`      | Add a new torrent         |
| `POST` | `/viewed`              | Manage torrent view tags  |

## Streaming

Stream files from a torrent using the hash and URL-encoded file path:

```
http://localhost:8090/api/v1/stream/{hash}?path={url_encoded_path}
```

Example:

```
http://localhost:8090/api/v1/stream/dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c?path=Big.Buck.Bunny.1080p.mp4
```

## Authentication

When authentication is enabled, include credentials with each request. See [Authentication](/docs/authentication) for details.

### Basic Auth

Send username and password with each request. Stream endpoints remain unauthenticated.

```sh
curl -u admin:password http://localhost:8090/api/v1/torrents
```

### Bearer Token

Include the JWT token in the `Authorization` header. All endpoints are protected.

```sh
curl -H "Authorization: Bearer your-jwt-token" http://localhost:8090/api/v1/torrents
```

### Obtaining a Token

```sh
curl -X POST http://localhost:8090/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=admin&password=your-password"
```

## Example: Adding a Torrent

```sh
curl -X POST http://localhost:8090/api/v1/torrents \
  -H "Content-Type: application/json" \
  -d '{
    "magnet": "magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny"
  }'
```
