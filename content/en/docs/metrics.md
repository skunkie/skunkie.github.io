---
title: Prometheus Metrics & Monitoring
weight: 5
bookIcon: activity
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Metrics & Monitoring

TorrPlay exports real-time application metrics in standard Prometheus format, enabling seamlessly integrated observability with Prometheus, Grafana, and OpenTelemetry collector setups.

## Endpoints

- `/metrics` — Prometheus metrics scraping endpoint
- `/api/system/metrics` — REST API endpoint for system metrics

## Exported Metrics

### Application & Torrent Gauges

| Metric Name                     | Type  | Description                                                     |
| ------------------------------- | ----- | --------------------------------------------------------------- |
| `torrplay_downloading_torrents` | Gauge | Number of torrents currently being downloaded in the background |
| `torrplay_streaming_torrents`   | Gauge | Number of active concurrent stream sessions                     |

### HTTP Traffic & Latency

| Metric Name                     | Type      | Labels                   | Description                                |
| ------------------------------- | --------- | ------------------------ | ------------------------------------------ |
| `http_requests_total`           | Counter   | `code`, `method`, `path` | Total count of processed HTTP requests     |
| `http_request_duration_seconds` | Histogram | `code`, `method`, `path` | Request processing duration histogram      |
| `http_request_size_bytes`       | Summary   | `code`, `method`, `path` | Summary of request payload sizes in bytes  |
| `http_response_size_bytes`      | Summary   | `code`, `method`, `path` | Summary of response payload sizes in bytes |

### Go Runtime & System Collectors

TorrPlay also registers standard Go runtime collectors (`go_*`) and process stats collectors (`process_*`), providing insights into RAM allocation, heap size, garbage collection pauses, open file descriptors, and CPU usage.

## Prometheus Scrape Configuration

To collect metrics from TorrPlay, add the following target to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: "torrplay"
    scrape_interval: 15s
    static_configs:
      - targets: ["localhost:8090"]
```

## Example Query

Count active streams across all instances:

```promql
sum(torrplay_streaming_torrents)
```

Track 95th percentile HTTP request latency:

```promql
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```
