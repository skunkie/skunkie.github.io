---
title: "Overview"
weight: -10
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Overview

TorrPlay is a torrent streaming application featuring memory-managed piece storage. It lets you stream torrent content directly over HTTP without downloading the entire torrent first.

## Key Features

- **HTTP Streaming** — Stream video and other files directly from a torrent
- **Memory-Managed Storage** — Intelligently caches torrent pieces in RAM with LRU eviction
- **Two Storage Backends** — In-memory (default) or file-based persistent storage
- **Background Downloader** — Automatically download file-storage torrents in the background
- **Web UI** — Simple interface for managing torrents
- **Desktop & Mobile Apps** — Native apps via Tauri (Windows, macOS, Linux) and Capacitor (Android)
- **DLNA / UPnP Media Server** — Stream to Smart TVs and media players on your local network
- **RESTful API** — Comprehensive API with OpenAPI spec
- **Prometheus Metrics** — Real-time observability via `/metrics`
- **TorrServer Compatibility** — Compatible with TorrServer API clients
- **qBittorrent Compatibility** — Works with Prowlarr, Sonarr, and Radarr
- **Authentication** — Basic Auth and JWT Bearer Token support
- **Backup & Restore** — Export and import your torrent library across instances

## Get Started

- [**Download**](/download/) — Get the latest release for your platform
- [**Quick Start**](/quick-start/) — Get up and running quickly
- [**Documentation**](/docs/) — Full API reference, settings, DLNA, authentication, and more

## Demo

Try the [demo page](https://torrplay.vercel.app/demo) — a live preview of TorrPlay's web client. This is a demo instance for testing the UI only and does not include the full application.
