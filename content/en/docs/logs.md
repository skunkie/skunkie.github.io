---
title: Logs
weight: 12
sidebar:
  icon: document-text
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay keeps the most recent log entries in an in-memory circular ring buffer, providing a quick way to inspect recent application events without requiring filesystem access. This approach is particularly useful for containerized deployments or when direct access to log files may be restricted.

## Getting Logs

**Endpoint:** `GET /api/system/logs`

**Returns:** JSON array of recent log entries, newest first

| Parameter | Type   | Required | Description                                               |
| --------- | ------ | -------- | --------------------------------------------------------- |
| `q`       | string | No       | Case-insensitive search in messages and structured fields |
| `level`   | string | No       | Exact level: `DEBUG`, `INFO`, `WARN`, or `ERROR`          |

When authentication is enabled, this endpoint requires the same credentials as other protected API requests. See [Authentication](/docs/authentication/).

## Retention & Configuration

| Setting          | Default | Maximum | Description                                                                                |
| ---------------- | ------- | ------- | ------------------------------------------------------------------------------------------ |
| `log_store_size` | `100`   | `1000`  | Number of log entries retained in the ring buffer; set to `0` to disable in-memory storage |
| `log_level`      | `INFO`  | —       | Minimum log level to capture (`DEBUG`, `INFO`, `WARN`, `ERROR`)                            |
| `log_format`     | `text`  | —       | Output format for stdout: `text` or `json` for structured logging                          |

## Log Entry Fields

Each entry in the returned JSON array contains the following fields:

| Field     | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| `time`    | string | ISO 8601 timestamp of the event                      |
| `level`   | string | Log level: `DEBUG`, `INFO`, `WARN`, or `ERROR`       |
| `message` | string | Human-readable log message                           |
| `data`    | object | Optional structured key-value data; omitted if empty |

## Example Response

```json
[
  {
    "time": "2026-01-01T12:00:01Z",
    "level": "DEBUG",
    "message": "streaming is active, pausing background downloader"
  },
  {
    "time": "2026-01-01T12:00:00Z",
    "level": "INFO",
    "message": "stopping background downloader"
  }
]
```

Filter the retained entries without reading log files from disk. With Bearer authentication, replace `-u` with `-H "Authorization: Bearer your-jwt-token"`; with authentication disabled, omit it:

```sh
curl -u your-username:your-password "http://localhost:8090/api/system/logs?level=ERROR&q=storage"
```

## Adjusting Verbosity & Retention

Set `log_level` to `DEBUG` to capture verbose diagnostic output:

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{"log_level": "DEBUG", "log_store_size": 500}'
```

Enable structured JSON logging to stdout (useful when aggregating logs with external tooling such as Loki or Fluentd):

```sh
curl -X PATCH http://localhost:8090/api/v1/settings \
  -H "Content-Type: application/json" \
  -d '{"log_format": "json"}'
```
