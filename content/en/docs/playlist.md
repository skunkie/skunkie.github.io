---
title: Playlists & Logs
weight: 9
bookIcon: list
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Playlists & Logs

## Playlist API

**Endpoint:** `GET /api/v1/playlist`

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `name`    | string | No       | Filter results by media name |

**Returns:** An M3U playlist file (`Content-Type: application/x-mpegURL`)

The playlist endpoint generates an M3U playlist containing stream URLs for all torrents currently managed by TorrPlay, optionally filtered by name. This lets you open your entire TorrPlay library in any M3U-compatible media player with a single URL.

### Response Format

```
#EXTM3U
#EXTINF:-1,Sintel
http://localhost:8090/api/v1/stream/08ada5a7a6183aae1e09d831df6748d566095a10?path=Sintel.mp4
```

Each `#EXTINF` entry is followed by the corresponding stream URL for that torrent file.

### Usage Examples

Open all torrents in VLC or any M3U-compatible player:

```sh
vlc "http://localhost:8090/api/v1/playlist"
```

Filter the playlist by name:

```
GET /api/v1/playlist?name=Sintel
```

Download the playlist to a file:

```sh
curl -o torrplay.m3u http://localhost:8090/api/v1/playlist
```

### Authentication & Media Player Compatibility

| Auth Mode | Stream Endpoint Access | Notes                                                                                       |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| None      | Unauthenticated        | No credentials required                                                                     |
| Basic     | Unauthenticated        | Stream URLs work in all players without credentials                                         |
| Bearer    | Session cookie         | Streaming is protected; browser players use the `HttpOnly` session cookie obtained at login |

When using **Bearer** authentication, streaming endpoints are accessible via the session cookie set during login. When using **Basic** authentication, stream endpoints are intentionally unauthenticated, ensuring compatibility with all media players.

---

## In-Memory Log Viewer

**Endpoint:** `GET /api/system/logs`

**Returns:** JSON array of recent log entries

TorrPlay keeps the most recent log entries in an in-memory circular ring buffer, providing a quick way to inspect recent application events without requiring filesystem access. This approach is particularly useful for containerized deployments or when direct access to log files may be restricted.

### Retention & Configuration

| Setting          | Default | Maximum | Description                                                                                |
| ---------------- | ------- | ------- | ------------------------------------------------------------------------------------------ |
| `log_store_size` | `100`   | `1000`  | Number of log entries retained in the ring buffer; set to `0` to disable in-memory storage |
| `log_level`      | `INFO`  | —       | Minimum log level to capture (`DEBUG`, `INFO`, `WARN`, `ERROR`)                            |
| `log_format`     | —       | —       | Set to `json` for structured logging to stdout                                             |

### Log Entry Fields

Each entry in the returned JSON array contains the following fields:

| Field   | Type   | Description                                          |
| ------- | ------ | ---------------------------------------------------- |
| `time`  | string | ISO 8601 timestamp of the event                      |
| `level` | string | Log level: `DEBUG`, `INFO`, `WARN`, or `ERROR`       |
| `msg`   | string | Human-readable log message                           |
| `data`  | object | Optional structured key-value data; omitted if empty |

### Example Response

```json
[
  {
    "time": "2026-01-01T12:00:00Z",
    "level": "INFO",
    "msg": "stopping background downloader"
  },
  {
    "time": "2026-01-01T12:00:01Z",
    "level": "DEBUG",
    "msg": "streaming is active, pausing background downloader"
  }
]
```

### Adjusting Verbosity & Retention

Set `log_level` to `DEBUG` to capture verbose diagnostic output:

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{"log_level": "DEBUG", "log_store_size": 500}'
```

Enable structured JSON logging to stdout (useful when aggregating logs with external tooling such as Loki or Fluentd):

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{"log_format": "json"}'
```
