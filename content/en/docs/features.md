---
title: Features
weight: 1
bookIcon: star
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Features

TorrPlay offers a comprehensive set of features for torrent streaming, local storage management, media server compatibility, and observability.

## HTTP Streaming

Stream video and other files directly from a torrent without downloading the entire torrent first. The streaming endpoint is available at:

```
/api/v1/stream/{hash}?path={url_encoded_path}
```

Streaming endpoints are not protected by authentication when using Basic Auth, allowing easy integration with media players like VLC, IINA, or Kodi.

## DLNA / UPnP Media Server

TorrPlay includes a built-in DLNA media server. This allows Smart TVs (LG webOS, Samsung Tizen, Sony Bravia), PlayStation/Xbox consoles, and media devices on your local Wi-Fi/Ethernet network to automatically discover TorrPlay and stream active torrents.

See the full **[DLNA / UPnP Streaming Guide](/docs/dlna)** for configuration details.

## Storage Backends

TorrPlay offers two distinct storage backends for managing torrent data:

{{< tabs "storage-backend" >}}
{{% tab "Memory Storage" %}}
Torrent pieces are downloaded and cached in RAM up to a configurable limit (`max_memory`). When the limit is reached, a Least Recently Used (LRU) eviction policy discards the oldest pieces.

**Pros:**

- High performance
- Reduced disk I/O
- Ideal for streaming

**Cons:**

- Volatile (data lost on restart)
- Limited by available RAM

{{% /tab %}}
{{% tab "File Storage" %}}
Torrent pieces are saved directly to the filesystem for persistent storage that survives application restarts. Set `file_storage_path` to configure the storage location.

**Pros:**

- Persistent across restarts
- Not limited by RAM

**Cons:**

- Slower than memory storage
- Increased disk I/O

{{% /tab %}}
{{< /tabs >}}

> [!NOTE]
> **Note for Windows Users:** TorrPlay does not automatically delete torrent files from the filesystem on Windows when you delete a torrent or switch its storage backend. Manual cleanup may be required.

## Prometheus Metrics & Observability

TorrPlay exports real-time metrics in Prometheus format via `/metrics` and `/api/system/metrics`. Custom metrics track active background downloads (`torrplay_downloading_torrents`), current stream sessions (`torrplay_streaming_torrents`), HTTP request counts, durations, and Go runtime stats.

See the **[Metrics & Monitoring Guide](/docs/metrics)** for Prometheus scrape configurations.

## Metadata Fetching

TorrPlay can update your torrent library by fetching metadata (posters, titles, categories) from external sources like TVDB.

### CLI Options

| Flag                    | Description                        | Default           |
| ----------------------- | ---------------------------------- | ----------------- |
| `--backup <path>`       | Input backup file                  | `torrplay.backup` |
| `--output <path>`       | Output file path                   | `torrplay.backup` |
| `--category`            | Enable category updates            | Disabled          |
| `--poster`              | Enable poster updates              | Disabled          |
| `--title`               | Enable title updates               | Disabled          |
| `--language <lang>`     | Language code (e.g., `eng`, `spa`) | —                 |
| `--provider <provider>` | Metadata provider (`tvdb`)         | —                 |
| `--api-key <key>`       | API key for the provider           | —                 |

### Example

```sh
./torrplay --backup torrplay.backup --poster --title --provider tvdb --api-key YOUR_API_KEY
```

## TorrServer Compatibility

TorrPlay includes compatibility endpoints for clients that use the TorrServer API. This allows you to use TorrPlay as a drop-in replacement for TorrServer in existing setups.

## qBittorrent Compatibility

TorrPlay emulates the qBittorrent API for seamless integration with automation tools like Prowlarr, Sonarr, and Radarr:

```sh
curl -X POST http://localhost:8090/api/v2/torrents/add \
  -F "urls=magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny" \
  -F "category=Movies"
```

## Mobile & Desktop Applications

The core logic is structured as a Go library (`pkg/torrplay`) that can be compiled for mobile apps using `gomobile` and Capacitor. A desktop application built with Tauri is also available.
