---
title: Playlists
weight: 11
sidebar:
  icon: menu-alt-2
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

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

When authentication is enabled on your TorrPlay instance, supply a scoped playback token to fetch the playlist:

```sh
vlc "http://localhost:8090/api/v1/playlist?token=your-playback-token"
```

When you request `/api/v1/playlist?token=...`, TorrPlay automatically embeds the token into each individual stream URL in the resulting M3U output. Media players can seamlessly access all video files without requiring manual login or credential prompts. See the [Authentication Guide](/docs/authentication/) for generating playback tokens.
