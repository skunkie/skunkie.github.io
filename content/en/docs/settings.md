---
title: Settings Reference
weight: 7
bookIcon: settings
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Settings Reference

All TorrPlay settings are managed through a single endpoint:

```
PATCH /api/v1/settings
```

The request body is a JSON object. Only the fields you include are updated — omitted fields retain their current values.

## Top-Level Settings

| Field                  | Type             | Default             | Constraints                                    | Description                                                                                            |
| ---------------------- | ---------------- | ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `enable_dlna`          | boolean          | `false`             | —                                              | Enable the built-in DLNA media server                                                                  |
| `enable_downloader`    | boolean          | `false`             | —                                              | Enable background downloading for file-storage torrents                                                |
| `file_storage_path`    | string           | `""`                | —                                              | Filesystem path for file-based piece storage                                                           |
| `friendly_name`        | string           | `"TorrPlay"`        | 3–15 characters                                | DLNA server name broadcast on the local network                                                        |
| `http_server_port`     | integer          | `8090`              | 1–65535                                        | TCP port the HTTP server listens on                                                                    |
| `log_format`           | string (enum)    | `"text"`            | `"text"` \| `"json"`                           | Log output format — use `"json"` for structured logging with external aggregators                      |
| `log_level`            | string (enum)    | `"INFO"`            | `"DEBUG"` \| `"INFO"` \| `"WARN"` \| `"ERROR"` | Minimum log severity level — set to `"DEBUG"` for verbose diagnostics                                  |
| `log_store_size`       | integer          | `100`               | 0–1000                                         | Number of recent log entries kept in the in-memory ring buffer, retrievable via `GET /api/system/logs` |
| `max_memory`           | integer (bytes)  | `67108864` (64 MiB) | 33554432–2147483648 (32 MiB – 2 GiB)           | Maximum RAM allocated for torrent piece caching                                                        |
| `readahead_percentage` | integer (%)      | `90`                | 50–100                                         | Percentage of `max_memory` reserved for read-ahead buffering ahead of the current stream position      |
| `torrent_trackers`     | array of strings | `[]`                | —                                              | Custom tracker list (see [Tracker Format](#tracker-format))                                            |
| `auth`                 | object           | —                   | —                                              | Authentication configuration — see [Authentication](/docs/authentication)                              |
| `torrent_client`       | object           | —                   | —                                              | Torrent client settings — see [Torrent Client Settings](#torrent-client-settings)                      |

> [!TIP]
> **`auth`** controls who can access the API. Set `enabled`, `type` (`basic` or `bearer`), `username`, and `password`.
>
> **`torrent_client`** controls the underlying BitTorrent engine behavior. Options include rate limits, connection limits, protocol flags, and DHT/PEX settings.

## Background Downloader

When `enable_downloader` is `true`, TorrPlay automatically downloads torrents that use file storage in the background. Background downloads are automatically **paused** whenever any streaming session becomes active to avoid bandwidth contention, and **resume** when all streaming sessions end. The downloader polls for eligible torrents every 60 seconds.

## Tracker Format

The `torrent_trackers` field is an array of strings. Each element represents one tracker **tier**. To include multiple trackers in the same tier, separate their URLs with a comma within a single string.

**Example:**

```json
[
  "udp://explodie.org:6969",
  "udp://tracker.opentrackr.org:1337,udp://tracker.leechers-paradise.org:6969"
]
```

In this example the first tier contains one tracker and the second tier contains two trackers.

## Torrent Client Settings

The `torrent_client` object controls the behaviour of the underlying BitTorrent engine.

| Field                           | Type              | Default | Constraints | Description                                                            |
| ------------------------------- | ----------------- | ------- | ----------- | ---------------------------------------------------------------------- |
| `disable_dht`                   | boolean           | `false` | —           | Disable DHT peer discovery                                             |
| `disable_ipv6`                  | boolean           | `true`  | —           | Disable IPv6 connections                                               |
| `disable_pex`                   | boolean           | `false` | —           | Disable Peer Exchange (PEX)                                            |
| `disable_tcp`                   | boolean           | `false` | —           | Disable TCP connections                                                |
| `disable_utp`                   | boolean           | `false` | —           | Disable μTP (Micro Transport Protocol)                                 |
| `download_rate_limit`           | integer (bytes/s) | `0`     | ≥ 0         | Global download rate limit; `0` means unlimited                        |
| `upload_rate_limit`             | integer (bytes/s) | `0`     | ≥ 0         | Global upload rate limit; `0` means unlimited                          |
| `established_conns_per_torrent` | integer           | `50`    | ≥ 10        | Maximum number of established connections per torrent                  |
| `torrent_peers_high_water`      | integer           | `500`   | ≥ 60        | Peer pool high-water mark per torrent                                  |
| `prefer_header_obfuscation`     | boolean           | `false` | —           | Request BitTorrent protocol header obfuscation on outgoing connections |
| `seed`                          | boolean           | `false` | —           | Continue seeding after a torrent is fully downloaded                   |

## Example: Updating Multiple Settings

The following request configures memory limits, enables background downloading, switches logging to JSON format, and tunes the torrent client in a single call:

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{
    "max_memory": 134217728,
    "readahead_percentage": 80,
    "enable_downloader": true,
    "log_level": "DEBUG",
    "log_format": "json",
    "log_store_size": 500,
    "torrent_trackers": [
      "udp://explodie.org:6969",
      "udp://tracker.opentrackr.org:1337,udp://tracker.leechers-paradise.org:6969"
    ],
    "torrent_client": {
      "download_rate_limit": 10485760,
      "upload_rate_limit": 2097152,
      "disable_ipv6": true,
      "established_conns_per_torrent": 80,
      "seed": true
    }
  }'
```

A `204 No Content` response is returned on success.
