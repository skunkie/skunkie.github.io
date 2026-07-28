---
title: DLNA / UPnP
weight: 4
bookIcon: tv
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# DLNA / UPnP Streaming

TorrPlay includes a built-in DLNA / UPnP ContentDirectory service, allowing you to discover and stream torrent media directly to Smart TVs, game consoles, media players, and set-top boxes on your local network.

## Supported Clients

The DLNA server is compatible with standard UPnP / DLNA media players, including:

- **Smart TVs:** LG webOS, Samsung Tizen, Sony Bravia, Android TV
- **Media Players:** VLC Media Player, Kodi, Infuse
- **Consoles:** Sony PlayStation, Microsoft Xbox

## Configuration

DLNA settings can be managed via the settings API (`/api/v1/settings`) or through the Web UI.

### Parameters

| Setting         | Type    | Default    | Description                                |
| --------------- | ------- | ---------- | ------------------------------------------ |
| `enable_dlna`   | boolean | `true`     | Enables or disables the DLNA / UPnP server |
| `friendly_name` | string  | `TorrPlay` | Name broadcasted on the local network      |

### Enabling DLNA via API

To enable DLNA and set a custom server name:

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{
    "enable_dlna": true,
    "friendly_name": "Living Room TorrPlay"
  }'
```

You can also enable DLNA through the Web UI by navigating to Settings → DLNA.

## How It Works

```mermaid
sequenceDiagram
    autonumber
    participant TV as Smart TV / Media Player
    participant DLNA as TorrPlay DLNA Server
    participant Engine as TorrPlay HTTP Stream Engine

    DLNA->>TV: SSDP Discovery Broadcast (UPnP ContentDirectory)
    TV->>DLNA: Browse ContentDirectory Tree
    DLNA-->>TV: Active Torrents List & Stream Links
    TV->>Engine: GET /api/v1/stream/{hash}?path=...
    Engine-->>TV: Chunked HTTP Video Stream Data
```

1. When `enable_dlna` is enabled, TorrPlay announces itself on your local subnet using SSDP (Simple Service Discovery Protocol).
2. Devices on your network will show **TorrPlay** in their network media source menu.
3. Browsing the TorrPlay DLNA source presents your active torrent library formatted as video streams.
4. When a video file is selected on your TV or media player, TorrPlay streams the piece data directly over HTTP.
