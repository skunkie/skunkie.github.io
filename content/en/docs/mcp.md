---
title: "Model Context Protocol (MCP)"
weight: 6
sidebar:
  icon: chip
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay includes a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server, allowing AI assistants (such as Claude Desktop, Cursor, and IDE coding agents) to interact with your running TorrPlay instance.

Through the MCP server, AI assistants can query your torrent library, inspect streaming status and piece caching, add or manage torrents, and generate stream URLs directly from natural language prompts.

## Architecture

The MCP server runs as a separate CLI subcommand:

```sh
torrplay mcp [flags]
```

- **Client-Application Decoupling:** The MCP server communicates with the main TorrPlay application over HTTP/REST. It does not open the database directly, avoiding lock contention and port conflicts with the running server.
- **Transports:**
  - `stdio` (default): Standard input/output transport, designed for local desktop clients such as Claude Desktop.
  - `sse`: Server-Sent Events transport over HTTP, binding strictly to a local loopback address for network-based AI clients.

## CLI Options & Environment Variables

| Flag         | Env Variable     | Default                 | Description                                                        |
| ------------ | ---------------- | ----------------------- | ------------------------------------------------------------------ |
| `-url`       | `TORRPLAY_URL`   | `http://127.0.0.1:8090` | Base URL of the running TorrPlay application                       |
| `-token`     | `TORRPLAY_TOKEN` | —                       | Scoped access token or JWT (required if authentication is enabled) |
| `-transport` | —                | `stdio`                 | Transport protocol: `stdio` or `sse`                               |
| `-addr`      | —                | `127.0.0.1:8091`        | Loopback address and port to listen on when using `sse` transport  |

## Available Capabilities

### Tools

- `list_torrents`: List all active and stored torrents with status, progress, and file lists.
- `get_torrent`: Retrieve detailed metadata, piece cache state, and file structure for a specific torrent.
- `add_torrent`: Add a torrent using a magnet URI or info hash.
- `delete_torrent`: Remove a torrent and release its cached pieces from memory.
- `update_torrent`: Modify metadata such as titles, categories, and poster URLs.
- `get_stream_url`: Generate direct HTTP stream URLs with valid scoped playback tokens for specified video files.

### Resources

- `torrplay://torrents`: Real-time list of all torrents in the active library.
- `torrplay://torrents/{hash}`: Detailed state of an individual torrent.
- `torrplay://metrics/memory`: Current RAM piece cache utilization and LRU eviction status.

### Prompts

- `identify-video-files`: Analyzes multi-file torrents to locate the main feature video and relevant audio/subtitle tracks.
- `diagnose-stream-buffer`: Evaluates reader positions, prefetch buffers, and download rates to diagnose playback stutter.

## Setup with Claude Desktop

To configure TorrPlay MCP with [Claude Desktop](https://claude.ai/download), add the following entry to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "torrplay": {
      "command": "/usr/local/bin/torrplay",
      "args": ["mcp"],
      "env": {
        "TORRPLAY_URL": "http://127.0.0.1:8090",
        "TORRPLAY_TOKEN": "your-auth-token-if-enabled"
      }
    }
  }
}
```

Replace `/usr/local/bin/torrplay` with the absolute path to your TorrPlay binary. Once added, restart Claude Desktop. The TorrPlay tools will become available in the chat interface.

## Running SSE Transport

For agents or applications that connect over SSE:

```sh
torrplay mcp -transport sse -addr 127.0.0.1:8091 -url http://127.0.0.1:8090
```

> [!IMPORTANT]
> For security, the SSE transport binds exclusively to loopback addresses (`127.0.0.1`). If you need to access the MCP server across a local network, route connections through an authenticated reverse proxy or TLS tunnel.
