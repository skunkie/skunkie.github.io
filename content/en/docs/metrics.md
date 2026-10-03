---
title: Prometheus Metrics & Monitoring
weight: 8
sidebar:
  icon: chart-bar
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay exports real-time application metrics in standard Prometheus format, enabling seamlessly integrated observability with Prometheus, Grafana, and OpenTelemetry collector setups.

## Endpoints

- `/metrics` — Prometheus metrics scraping endpoint
- `/api/system/metrics` — JSON activity summary containing `active_torrents`, `download_speed`, and `upload_speed`

The metric families below are exposed only by `/metrics`.

## Exported Metrics

### Application & Torrent Activity

| Metric Name                     | Type  | Labels   | Description                                                      |
| ------------------------------- | ----- | -------- | ---------------------------------------------------------------- |
| `torrplay_downloading_torrents` | Gauge | —        | Torrents currently being downloaded in the background            |
| `torrplay_loaded_torrents`      | Gauge | `reason` | Loaded torrents by `reason`: `background` or `on_demand`         |
| `torrplay_streaming_torrents`   | Gauge | —        | Torrents with an open playback session, counted once per torrent |

### Streaming

| Metric Name                             | Type      | Labels    | Description                                           |
| --------------------------------------- | --------- | --------- | ----------------------------------------------------- |
| `torrplay_stream_read_duration_seconds` | Histogram | `storage` | Stream read latency, including waits for torrent data |
| `torrplay_stream_requests_in_flight`    | Gauge     | —         | Streaming HTTP requests currently being served        |

### HTTP Traffic & Latency

| Metric Name                     | Type      | Labels                   | Description                                |
| ------------------------------- | --------- | ------------------------ | ------------------------------------------ |
| `http_request_duration_seconds` | Histogram | `code`, `method`, `path` | Request processing duration histogram      |
| `http_request_size_bytes`       | Summary   | `code`, `method`, `path` | Summary of request payload sizes in bytes  |
| `http_requests_total`           | Counter   | `code`, `method`, `path` | Total count of processed HTTP requests     |
| `http_response_size_bytes`      | Summary   | `code`, `method`, `path` | Summary of response payload sizes in bytes |

### BitTorrent Client

| Metric Name                            | Type    | Labels      | Description                                             |
| -------------------------------------- | ------- | ----------- | ------------------------------------------------------- |
| `torrplay_torrent_banned_peers`        | Gauge   | —           | Peer addresses banned for sending bad data              |
| `torrplay_torrent_data_bytes_total`    | Counter | `direction` | Useful piece bytes downloaded or uploaded               |
| `torrplay_torrent_peers`               | Gauge   | `state`     | Connected peers, connecting peers, or pending addresses |
| `torrplay_torrent_pieces_hashed_total` | Counter | `result`    | Pieces whose hash check was `good` or `bad`             |

### Memory Storage

| Metric Name                                       | Type    | Labels       | Description                                                    |
| ------------------------------------------------- | ------- | ------------ | -------------------------------------------------------------- |
| `torrplay_storage_completion_misses_total`        | Counter | —            | Pieces gone when the torrent client marked them complete       |
| `torrplay_storage_evicted_incomplete_bytes_total` | Counter | —            | Downloaded bytes lost when incomplete pieces were evicted      |
| `torrplay_storage_evicted_pieces_total`           | Counter | `state`      | Complete or incomplete pieces evicted from memory              |
| `torrplay_storage_memory_limit_bytes`             | Gauge   | —            | Configured memory-storage limit                                |
| `torrplay_storage_memory_used_bytes`              | Gauge   | —            | Memory currently reserved for piece data                       |
| `torrplay_storage_protected_evictions_total`      | Counter | `protection` | Last-resort evictions of boundary or active-range pieces       |
| `torrplay_storage_read_failures_total`            | Counter | `reason`     | Reads that failed because piece data was evicted or incomplete |
| `torrplay_storage_refused_hashes_total`           | Counter | —            | Hash checks refused because eviction removed part of a piece   |

### Go Runtime & System Collectors

TorrPlay also registers standard Go runtime collectors (`go_*`) and process stats collectors (`process_*`), providing insights into RAM allocation, heap size, garbage collection pauses, open file descriptors, and CPU usage.

## Prometheus Scrape Configuration

When authentication is disabled, add the following target to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: "torrplay"
    scrape_interval: 15s
    static_configs:
      - targets: ["localhost:8090"]
```

When TorrPlay uses Basic authentication, add credentials to the scrape job:

```yaml
scrape_configs:
  - job_name: "torrplay"
    scrape_interval: 15s
    basic_auth:
      username: "your-username"
      password_file: "/etc/prometheus/torrplay-password"
    static_configs:
      - targets: ["localhost:8090"]
```

When TorrPlay uses Bearer authentication, store an administrative access token in a file and reference it from the scrape job:

```yaml
scrape_configs:
  - job_name: "torrplay"
    scrape_interval: 15s
    authorization:
      type: Bearer
      credentials_file: "/etc/prometheus/torrplay-token"
    static_configs:
      - targets: ["localhost:8090"]
```

Obtain the administrative token from `/oauth/token`. Playback tokens cannot access `/metrics`.

{{< callout type="warning" >}}
Access tokens expire after 24 hours, so the token file must be refreshed at least daily, for example by a scheduled job that requests a new token from `/oauth/token`. Prometheus rereads `credentials_file` on every scrape, so no reload is needed. For unattended scraping, Basic authentication is simpler because its credentials do not expire.
{{< /callout >}}

## Example Query

Count torrents with an open playback session across all instances:

```promql
sum(torrplay_streaming_torrents)
```

Count streaming HTTP requests currently in flight:

```promql
sum(torrplay_stream_requests_in_flight)
```

Track 95th percentile HTTP request latency:

```promql
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```
