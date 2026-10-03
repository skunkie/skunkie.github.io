---
title: Features
weight: 1
sidebar:
  icon: star
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay offers a comprehensive set of features for high-performance torrent streaming, memory-managed piece storage, media center integration, and observability.

## HTTP Streaming

Stream video and other files directly from a torrent without downloading the entire torrent first. The streaming endpoint is available at:

```text
/api/v1/stream/{hash}?path={url_encoded_path}
```

When authentication is enabled, pass a scoped playback delegation token via the `token` query parameter:

```text
/api/v1/stream/{hash}?path={url_encoded_path}&token={playback_token}
```

See the [Authentication Guide](/docs/authentication/) for generating and managing playback tokens.

## Preloading & Buffer Management

Playback readers and preloads run in one shared streaming engine. The engine coordinates their piece priorities, read-ahead budget, and memory-eviction protection so active playback takes priority without discarding useful preload data:

- **Adaptive Read-Ahead:** TorrPlay derives a shared read-ahead budget from `max_memory` (see [Streaming Memory Budget](/docs/settings/#streaming-memory-budget)). Active memory-storage readers divide the available budget dynamically.
- **Progressive Read-Ahead:** For a new reader—or one that has just sought—TorrPlay sets the window to the smaller of its allocated share and a ramp limit. The limit is at least 1 MiB, rounds up to a whole number of torrent pieces, and grows toward the reader's allocated share as playback continues. This avoids downloading far past a container header before the player seeks to the media data.
- **Playback Priority:** Pieces immediately ahead of playback receive higher priority than preload pieces. A released reader lingers for up to 30 seconds so consecutive HTTP range requests can reuse the data already being fetched.
- **Resume-Aware Preloading:** A preload caches the file's head and tail and can also cache a window around `playback_position_seconds` after resolving the container seek index.
- **Bounded Scheduling:** Each torrent has at most one preload, and no more than two preloads download concurrently. Additional work waits in the `queued` state.
- **Preload API (`PUT /api/v1/torrents/{hash}/preload`):** Starts or replaces the preload for a torrent file and optional resume position.
- **Buffer Progress (`GET /api/v1/torrents/{hash}/preload`):** Reports target and completed bytes, progress, peer counts, download rate, and the `idle`, `queued`, `preloading`, `ready`, `failed`, or `evicted` state.
- **Visual Preload UI:** The TorrPlay Web UI displays an animated buffering badge on torrent cards while pieces are being prefetched.
- **Eviction Protection:** Active playback windows and memory-storage preloads are protected from normal LRU eviction. Under severe memory pressure, protected pieces become last-resort eviction candidates.
- **Short-Lived Ready Cache:** An unread ready preload remains cached for 10 seconds. Once playback has used it, TorrPlay releases it after the file's last active or lingering reader closes.

## Web Client & Video Engine

The built-in web player provides a full-featured viewing experience directly in the browser:

- **Multi-Audio Track Selection:** Automatically probes media containers for all available audio streams. Formats not natively decoded by browsers (such as AC-3, E-AC-3, and DTS) are decoded in-browser using WASM and synchronized via the Web Audio API.
- **Embedded & External Subtitles:** Extracts subtitle tracks on-the-fly from Matroska (`.mkv`) and WebM containers using bounded byte-range reads without scanning the entire file, with support for loading external subtitle files.
- **Playlist Navigation:** Jump between episodes or sequential files directly within the video player controls.
- **In-App Update Checker:** Automatically notifies you when a new release of TorrPlay is published on GitHub, with an in-app changelog and download dialog.

## Stremio Integration

TorrPlay natively implements the **Stremio Addon Protocol v3**, enabling seamless browsing and streaming directly inside Stremio apps on desktop, Android TV, and mobile devices with automatic movie/series classification.

See the full **[Stremio Integration Guide](/docs/stremio/)** for setup instructions.

## Model Context Protocol (MCP)

TorrPlay includes a built-in MCP server (`torrplay mcp`) allowing AI assistants (such as Claude Desktop, Cursor, and IDE coding agents) to inspect torrents, monitor memory usage, and generate playback stream URLs.

See the **[MCP Guide](/docs/mcp/)** for configuration and prompt templates.

## DLNA / UPnP Media Server

TorrPlay includes a built-in DLNA media server with automatic category classification, pagination, and GENA eventing. This allows Smart TVs (LG webOS, Samsung Tizen, Sony Bravia), game consoles, and media devices on your local Wi-Fi or Ethernet network to discover TorrPlay and stream active torrents.

See the full **[DLNA / UPnP Streaming Guide](/docs/dlna/)** for configuration details.

## Storage Backends

TorrPlay offers two distinct storage backends for managing torrent data:

{{< tabs >}}
{{< tab name="Memory Storage" >}}
Torrent pieces are downloaded and cached in RAM up to a configurable limit (`max_memory`). When the limit is reached, a Least Recently Used (LRU) policy first evicts unprotected pieces, then file-boundary pieces, and finally active playback or preload ranges if reclaiming memory is otherwise impossible.

**Pros:**

- Ultra-fast performance
- Zero persistent disk I/O
- Ideal for streaming

**Cons:**

- Volatile (data lost on restart)
- Limited by available RAM

{{< /tab >}}
{{< tab name="File Storage" >}}
Torrent pieces are saved directly to the filesystem for persistent storage that survives application restarts. Set `file_storage_path` to configure the storage location.

**Pros:**

- Persistent across restarts
- Not limited by RAM size
- Eligible for background downloading

**Cons:**

- Dependent on disk write speeds
- Uses local storage space

{{< /tab >}}
{{< /tabs >}}

> [!NOTE]
> **Note for Windows Users:** TorrPlay does not automatically delete torrent files from the filesystem on Windows when you delete a torrent or switch its storage backend. Manual cleanup may be required.

## Background Downloader

When enabled (`enable_downloader: true`), TorrPlay automatically downloads file-storage torrents in the background. Background downloads automatically **pause** when any user starts a stream to prevent network congestion, and **resume** when streaming sessions conclude.

## Prometheus Metrics & Observability

TorrPlay exports Prometheus metrics at `/metrics` and a compact JSON activity summary at `/api/system/metrics`. Custom metrics track background downloads (`torrplay_downloading_torrents`), torrents with open playback sessions (`torrplay_streaming_torrents`), live stream requests (`torrplay_stream_requests_in_flight`), request latency histograms, and Go runtime stats.

See the **[Metrics & Monitoring Guide](/docs/metrics/)** for details.

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

## TorrServer & qBittorrent Compatibility

- **TorrServer:** Drop-in compatibility endpoints (`/torrents`, `/stream`, `/play`, `/cache`, `/viewed`) for third-party clients (Kodi, VLC, TorrServe mobile apps).
- **qBittorrent:** Emulates `/api/v2/torrents/add` for seamless integration with automation tools like Prowlarr, Sonarr, and Radarr.

## Mobile & Desktop Applications

The core logic is structured as a Go library (`pkg/torrplay`) that can be compiled for mobile apps using `gomobile` and Capacitor. Native desktop applications built with Tauri are also available for Windows, macOS, and Linux.
