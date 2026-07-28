---
title: Backup & Restore
weight: 8
bookIcon: archive
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Backup & Restore

TorrPlay provides backup and restore endpoints for exporting and importing your entire torrent library — including metadata, categories, poster images, and torrent info hashes — across instances or before upgrades.

---

## Downloading a Backup

```sh
GET /api/v1/torrents/backup
```

Returns a JSON file containing all torrent metadata (hashes, magnet links, names, categories, posters, and settings). Save it to disk:

```sh
curl -o torrplay.backup http://localhost:8090/api/v1/torrents/backup
```

---

## Restoring from a Backup

```sh
POST /api/v1/torrents/restore
```

Upload the backup file using `multipart/form-data`:

```sh
curl -X POST http://localhost:8090/api/v1/torrents/restore \
  -F "file=@torrplay.backup"
```

TorrPlay will re-add all torrents from the backup with their original metadata.

---

## Updating a Backup with Metadata

Before restoring, you can update the backup file by fetching fresh metadata (poster images, titles, categories) from external providers using the `metadata` CLI subcommand.

### Available Flags

| Flag                | Description                                     | Default           |
| ------------------- | ----------------------------------------------- | ----------------- |
| `--backup <path>`   | Input backup file                               | `torrplay.backup` |
| `--output <path>`   | Output file path                                | `<input>.updated` |
| `--category`        | Update categories (Movies / Series)             | Disabled          |
| `--poster`          | Fetch and update poster images                  | Disabled          |
| `--title`           | Update titles from provider                     | Disabled          |
| `--language <lang>` | 3-letter language code (`eng`, `spa`, `rus`, …) | —                 |
| `--provider <name>` | Metadata provider (currently `tvdb` only)       | —                 |
| `--api-key <key>`   | API key for the chosen provider                 | —                 |

> **Note:** `--api-key` is required when `--poster` or `--title` is used.

### Example

Fetch posters and titles from TheTVDB in English:

```sh
./torrplay metadata \
  --backup torrplay.backup \
  --poster --title \
  --language eng \
  --provider tvdb \
  --api-key YOUR_TVDB_API_KEY
```

This produces `torrplay.backup.updated`. Specify `--output` to choose a custom output path.

---

## Full Migration Workflow

```mermaid
graph LR
    Inst1["Source TorrPlay Instance"] -->|1. GET /api/v1/torrents/backup| File["torrplay.backup"]
    File -->|2. Add Metadata: ./torrplay metadata| Updated["torrplay.backup.updated"]
    Updated -->|3. POST /api/v1/torrents/restore| Inst2["Target TorrPlay Instance"]
```

```sh
# 1. Download backup from the source instance
curl -o torrplay.backup http://source-host:8090/api/v1/torrents/backup

# 2. (Optional) Update with metadata
./torrplay metadata --backup torrplay.backup --poster --title --provider tvdb --api-key KEY

# 3. Restore to the target instance
curl -X POST http://target-host:8090/api/v1/torrents/restore \
  -F "file=@torrplay.backup.updated"
```
