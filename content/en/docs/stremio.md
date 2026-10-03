---
title: "Stremio Integration"
weight: 5
sidebar:
  icon: film
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay provides native support for the [Stremio Addon Protocol v3](https://github.com/Stremio/stremio-addon-sdk), allowing you to install TorrPlay as a custom addon directly into the Stremio media center application on desktop, Android TV, and mobile devices.

When installed, TorrPlay exposes your active torrent library as browsable movie and series catalogs in Stremio and streams video files directly using high-performance HTTP streaming.

## Features

- **Native Protocol v3 Compatibility:** Implements standard Stremio manifest, catalog, metadata, and stream handlers.
- **Smart Media Classification:** Automatically identifies and groups torrent contents into **Movies** and **Series**.
- **Episode & Season Parsing:** Extracts season and episode indices from filenames (e.g., `S01E02`, `1x05`, `ep 03`) to display structured series navigation in Stremio.
- **Library Catalog Search:** Search and filter your TorrPlay library directly within the Stremio interface.
- **Authentication & Security:** Accepts a dedicated Stremio token in the URL path (`/stremio/{token}/manifest.json`) or the `token` query parameter, so private instances remain protected.
- **Direct Stream Dispatch:** Formats streaming URLs as `/stremio/play/{hash}/{fileIdx}/{filename}`, allowing external players (ExoPlayer, VLC) to accurately infer MIME types and display proper filenames.

## Installation & Setup

### 1. Enable Stremio in Settings

Stremio support is disabled by default. Enable or disable it using either method:

- **Web UI:** Navigate to **Settings** → toggle **Enable Stremio**.
- **API:** Send a `PATCH /api/v1/settings` request with `{"enable_stremio": true}`.

### 2. Install Addon in Stremio

#### One-Click Install

In the TorrPlay Web UI, open the **Settings** dialog and click the **Install Stremio Addon** button, or click a custom link formatted with the `stremio://` protocol:

```text
stremio://<torrplay-host>:<port>/stremio/manifest.json
```

#### Manual URL Installation

1. Copy the TorrPlay Stremio manifest URL:
   ```text
   http://<torrplay-host>:<port>/stremio/manifest.json
   ```
2. Open Stremio.
3. Navigate to the **Community Addons** section.
4. Paste the manifest URL into the addon search bar and click **Install**.

## Authentication with Stremio

If authentication is enabled, Stremio URLs must include the dedicated Stremio token. Read it from the `stremio_token` field of `GET /api/v1/settings`:

```sh
curl -s -u your-username:your-password http://localhost:8090/api/v1/settings | jq -r .stremio_token
```

With Bearer authentication, replace `-u` with `-H "Authorization: Bearer your-jwt-token"`. The example uses [jq](https://jqlang.org/) to extract the field; you can also read it from the full JSON response.

The token stays the same until you change any authentication setting, which revokes it. Playback tokens and administrative access tokens are not accepted on Stremio routes.

TorrPlay supports two authenticated URL formats:

### Path-Prefixed Token (Recommended)

```text
http://<torrplay-host>:<port>/stremio/<your-stremio-token>/manifest.json
```

### Query Parameter Token

```text
http://<torrplay-host>:<port>/stremio/manifest.json?token=<your-stremio-token>
```

When you click **Install Stremio Addon** in the TorrPlay Web UI while logged in, the generated link automatically includes the Stremio token. Stream links returned to Stremio carry the token in their path as well.

## Stremio Endpoints Reference

All Stremio routes are served under `/stremio`:

| Endpoint                                    | Method | Description                                                               |
| ------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/stremio/manifest.json`                    | `GET`  | Addon manifest declaring capabilities, resources, and catalog types       |
| `/stremio/{token}/manifest.json`            | `GET`  | Addon manifest with token authentication in URL path                      |
| `/stremio/catalog/{type}/{id}.json`         | `GET`  | List movies or series in your library with optional search and pagination |
| `/stremio/meta/{type}/{id}.json`            | `GET`  | Metadata and episode list for a specific movie or series                  |
| `/stremio/stream/{type}/{id}.json`          | `GET`  | Stream playback links for a movie or episode                              |
| `/stremio/play/{hash}/{fileIdx}/{filename}` | `GET`  | Direct media stream handler with Range request support                    |
