---
title: "Overview"
weight: -10
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay is a torrent streaming application featuring memory-managed piece storage. It lets you stream torrent content directly over HTTP without downloading the entire torrent first.

## Key Features

- **HTTP Streaming & Preload** — Stream video directly from torrents with intelligent piece preloading
- **Memory-Managed Storage** — Intelligently caches torrent pieces in RAM with LRU eviction
- **Two Storage Backends** — In-memory (default) or file-based persistent storage
- **Background Downloader** — Automatically download file-storage torrents in the background
- **Stremio Addon Protocol** — Native v3 addon integration with movie/series catalogs and episode navigation
- **Model Context Protocol (MCP)** — Built-in AI assistant integration via stdio and SSE transports
- **Web UI & Advanced Video Player** — Multi-audio track switching (AC-3, E-AC-3, DTS via WASM) and embedded subtitle extraction
- **Desktop & Mobile Apps** — Native apps via Tauri (Windows, macOS, Linux) and Capacitor (Android)
- **DLNA / UPnP Media Server** — Category browsing and streaming to Smart TVs and media players on your local network
- **RESTful API** — Comprehensive API with OpenAPI specification
- **Prometheus Metrics** — Real-time observability via `/metrics`
- **TorrServer & qBittorrent Compatibility** — Works with Kodi, TorrServe, Prowlarr, Sonarr, and Radarr
- **Authentication & Playback Tokens** — Scoped playback delegation tokens, Basic Auth, and JWT Bearer support
- **Backup & Restore** — Export and import your torrent library across instances

## Get Started

- [**Download**](/download/) — Get the latest release for your platform
- [**Quick Start**](/quick-start/) — Get up and running quickly
- [**Documentation**](/docs/) — Full API reference, settings, DLNA, authentication, and more

## Demo

Try the [demo page](https://torrplay.vercel.app/demo) — a live preview of TorrPlay's web client. This is a demo instance for testing the UI only and does not include the full application.
