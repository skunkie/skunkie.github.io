---
title: API Reference
weight: 2
sidebar:
  icon: code
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay provides a comprehensive RESTful API for programmatic control. The full OpenAPI specification is available at [`api/api.yaml`](https://github.com/torrplay/torrplay/blob/main/api/api.yaml).

You can also interact with the API documentation using **[Scalar](/openapi/)**.

## Base URL

All API endpoints are relative to:

```
http://localhost:8090
```

## Endpoints

### Authentication

| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| `POST` | `/oauth/token`   | Obtain a JWT admin token (Bearer auth) |
| `POST` | `/api/v1/tokens` | Create a scoped playback token         |

### Core API

| Method   | Endpoint                          | Description                                |
| -------- | --------------------------------- | ------------------------------------------ |
| `GET`    | `/api/v1/torrents`                | List all torrents                          |
| `POST`   | `/api/v1/torrents`                | Add a new torrent                          |
| `POST`   | `/api/v1/torrent-resolutions`     | Resolve a remote torrent without saving it |
| `GET`    | `/api/v1/torrents/{hash}`         | Get torrent metadata                       |
| `PATCH`  | `/api/v1/torrents/{hash}`         | Update torrent metadata                    |
| `DELETE` | `/api/v1/torrents/{hash}`         | Delete a torrent                           |
| `PUT`    | `/api/v1/torrents/{hash}/preload` | Start or update torrent preloading         |
| `GET`    | `/api/v1/torrents/{hash}/preload` | Get torrent preload status and buffer      |
| `DELETE` | `/api/v1/torrents/{hash}/preload` | Cancel torrent preload                     |
| `GET`    | `/api/v1/torrents/backup`         | Backup torrents and posters                |
| `POST`   | `/api/v1/torrents/restore`        | Restore torrents and posters               |
| `GET`    | `/api/v1/stream/{hash}`           | Stream a torrent file                      |
| `HEAD`   | `/api/v1/stream/{hash}`           | HEAD request for a streamable file         |
| `GET`    | `/api/v1/playlist`                | Generate an M3U playlist for streaming     |
| `GET`    | `/api/v1/settings`                | Get application settings                   |
| `PATCH`  | `/api/v1/settings`                | Update application settings                |

### Stremio Addon Protocol

| Method | Endpoint                                    | Description                                    |
| ------ | ------------------------------------------- | ---------------------------------------------- |
| `GET`  | `/stremio/manifest.json`                    | Addon manifest descriptor                      |
| `GET`  | `/stremio/{token}/manifest.json`            | Authenticated addon manifest descriptor        |
| `GET`  | `/stremio/catalog/{type}/{id}.json`         | Browse movies or series catalog                |
| `GET`  | `/stremio/meta/{type}/{id}.json`            | Retrieve item details and season/episode lists |
| `GET`  | `/stremio/stream/{type}/{id}.json`          | Fetch stream playback links                    |
| `GET`  | `/stremio/play/{hash}/{fileIdx}/{filename}` | Direct media stream handler                    |

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

```text
http://localhost:8090/api/v1/stream/{hash}?path={url_encoded_path}
```

If authentication is enabled, append a scoped playback token:

```text
http://localhost:8090/api/v1/stream/{hash}?path={url_encoded_path}&token={playback_token}
```

Example:

```text
http://localhost:8090/api/v1/stream/dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c?path=Big.Buck.Bunny.1080p.mp4
```

The `GET` and `HEAD` stream endpoints also accept an optional URL-encoded `magnet` query parameter. It provides trackers for finding peers when the torrent has not been saved in TorrPlay.

## Preloading

Start or replace the preload for a torrent using a file index or path. If both are omitted, TorrPlay selects file index `0`:

```sh
curl -X PUT http://localhost:8090/api/v1/torrents/{hash}/preload \
  -H "Content-Type: application/json" \
  -d '{
    "file_index": 0,
    "playback_position_seconds": 900
  }'
```

`playback_position_seconds` asks the streaming engine to cache a window around a saved playback position in addition to the file's head and tail. The request also accepts `file_path` and an optional `magnet` URI.

The response reports `target_bytes`, `completed_bytes`, `progress`, `download_rate`, `active_peers`, `total_peers`, and one of these states:

| Status       | Meaning                                                              |
| ------------ | -------------------------------------------------------------------- |
| `idle`       | No preload is registered for the torrent                             |
| `queued`     | Waiting for a preload slot or enough memory                          |
| `preloading` | Downloading the requested file ranges                                |
| `ready`      | All planned ranges are cached                                        |
| `failed`     | The preload could not reserve memory or stopped receiving data       |
| `evicted`    | Its reservation was reclaimed for another preload or a smaller limit |

An unread `ready` preload remains cached for 10 seconds. After playback uses it, TorrPlay releases it when the file's last active or lingering reader closes. A terminal `failed` or `evicted` status is also retained for 10 seconds.

## Resolving a Remote Torrent

`POST /api/v1/torrent-resolutions` downloads a `.torrent` file from an HTTP or HTTPS URL and resolves its metadata without saving a database record. If the torrent is already in the library, the endpoint returns its stored metadata unchanged:

```sh
curl -X POST http://localhost:8090/api/v1/torrent-resolutions \
  -H "Content-Type: application/json" \
  -d '{"url":"https://indexer.example/download/example.torrent"}'
```

Use `POST /api/v1/torrents` when the torrent should remain in the library.

## Authentication

When authentication is enabled, include credentials with each protected request. The token endpoint and health check are public. See [Authentication](/docs/authentication) for details.

### Basic Auth

Send username and password with each protected request:

```sh
curl -u your-username:your-password http://localhost:8090/api/v1/torrents
```

### Bearer Token

Include the JWT token in the `Authorization` header for protected endpoints.

```sh
curl -H "Authorization: Bearer your-jwt-token" http://localhost:8090/api/v1/torrents
```

### Obtaining a Token

```sh
curl -X POST http://localhost:8090/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&username=your-username&password=your-password"
```

## Example: Adding a Torrent

```sh
curl -X POST http://localhost:8090/api/v1/torrents \
  -H "Content-Type: application/json" \
  -d '{
    "magnet": "magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny"
  }'
```
