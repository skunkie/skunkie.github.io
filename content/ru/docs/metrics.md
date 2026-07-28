---
title: Метрики Prometheus и мониторинг
weight: 5
bookIcon: activity
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Метрики и мониторинг

TorrPlay предоставляет метрики приложения в реальном времени в стандартном формате Prometheus, что позволяет использовать его с Prometheus, Grafana и коллекторами OpenTelemetry.

## Конечные точки

- `/metrics` — конечная точка для сбора метрик Prometheus
- `/api/system/metrics` — конечная точка REST API для получения системных метрик

## Доступные метрики

### Метрики приложения и торрентов

| Название метрики                | Тип   | Описание                                                           |
| ------------------------------- | ----- | ------------------------------------------------------------------ |
| `torrplay_downloading_torrents` | Gauge | Количество торрентов, загружаемых в данный момент в фоновом режиме |
| `torrplay_streaming_torrents`   | Gauge | Количество одновременных активных сессий потоковой передачи        |

### HTTP-трафик и задержка

| Название метрики                | Тип       | Метки                    | Описание                                         |
| ------------------------------- | --------- | ------------------------ | ------------------------------------------------ |
| `http_requests_total`           | Counter   | `code`, `method`, `path` | Общее количество обработанных HTTP-запросов      |
| `http_request_duration_seconds` | Histogram | `code`, `method`, `path` | Гистограмма продолжительности обработки запросов |
| `http_request_size_bytes`       | Summary   | `code`, `method`, `path` | Статистика размера входящих запросов в байтах    |
| `http_response_size_bytes`      | Summary   | `code`, `method`, `path` | Статистика размера ответов в байтах              |

### Коллекторы среды выполнения Go и системных показателей

TorrPlay также регистрирует стандартные коллекторы среды выполнения Go (`go_*`) и коллекторы статистики процессов (`process_*`), предоставляющие сведения об использовании оперативной памяти, размере кучи, паузах на сборку мусора, количестве открытых файловых дескрипторов и загрузке процессора.

## Настройка сбора метрик Prometheus

Для сбора метрик TorrPlay добавьте следующую цель в файл `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: "torrplay"
    scrape_interval: 15s
    static_configs:
      - targets: ["localhost:8090"]
```

## Пример запроса

Подсчёт количества активных потоков по всем экземплярам приложения:

```promql
sum(torrplay_streaming_torrents)
```

Определение 95-го процентиля задержки HTTP-запросов:

```promql
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```
