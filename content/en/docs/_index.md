---
title: Documentation
weight: 3
toc: false
sidebar:
  icon: book-open
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

Welcome to the TorrPlay documentation. Explore the topics below to learn about installation, streaming APIs, authentication, media server integrations, and monitoring.

{{< cards >}}
{{< card link="features" title="Features & Storage" icon="star" subtitle="HTTP streaming engine, in-memory LRU caching, preloading buffer, and TVDB metadata updates." >}}
{{< card link="installation" title="Installers & Desktop Apps" icon="cube" subtitle="Windows MSI & NSIS setup, Linux DEB/RPM/AppImage, macOS DMG with embedded Go sidecar, and Android APKs." >}}
{{< card link="api" title="API Reference" icon="code" subtitle="REST API endpoints, preload controls, stream URLs, and qBittorrent / TorrServer compatibility." >}}
{{< card link="authentication" title="Authentication" icon="lock-closed" subtitle="Basic Authentication, JWT Bearer Token, scoped playback tokens, and emergency credential recovery." >}}
{{< card link="stremio" title="Stremio Integration" icon="film" subtitle="Native Stremio Addon Protocol v3 with automatic movie/series catalogs and token-secured streaming." >}}
{{< card link="mcp" title="Model Context Protocol (MCP)" icon="chip" subtitle="Built-in AI agent integration via stdio and SSE transports for Claude Desktop and coding assistants." >}}
{{< card link="dlna" title="DLNA / UPnP Streaming" icon="desktop-computer" subtitle="Network SSDP discovery, category browsing, GENA eventing, and streaming to Smart TVs and media players." >}}
{{< card link="metrics" title="Prometheus Metrics" icon="chart-bar" subtitle="Real-time observability via /metrics, active stream gauges, request latency histograms, and Prometheus scrape config." >}}
{{< card link="settings" title="Settings Reference" icon="cog" subtitle="Schema for /api/v1/settings, covering storage, logging, authentication, CORS, and torrent client tuning." >}}
{{< card link="backup" title="Backup & Restore" icon="archive" subtitle="Exporting torrent libraries, restoring backups across instances, and updating backup metadata via CLI." >}}
{{< card link="playlist" title="Playlists & Logs" icon="play" subtitle="Generating token-authenticated M3U playlists for media players and inspecting in-memory log buffer entries." >}}
{{< /cards >}}
