---
title: Метрики Prometheus и мониторинг
weight: 5
sidebar:
  icon: chart-bar
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay отдаёт метрики в формате Prometheus в реальном времени, поэтому сервис легко интегрируется с Prometheus, Grafana и агентами OpenTelemetry.

## Эндпоинты

- `/metrics` — эндпоинт для сбора метрик Prometheus
- `/api/system/metrics` — REST API для системных метрик

## Доступные метрики

### Метрики приложения и торрентов

| Название метрики                | Тип   | Описание                                        |
| ------------------------------- | ----- | ----------------------------------------------- |
| `torrplay_downloading_torrents` | Gauge | Количество торрентов, скачиваемых сейчас в фоне |
| `torrplay_streaming_torrents`   | Gauge | Количество активных сессий воспроизведения      |

### HTTP-трафик и задержка

| Название метрики                | Тип       | Метки                    | Описание                                         |
| ------------------------------- | --------- | ------------------------ | ------------------------------------------------ |
| `http_requests_total`           | Counter   | `code`, `method`, `path` | Общее количество обработанных HTTP-запросов      |
| `http_request_duration_seconds` | Histogram | `code`, `method`, `path` | Гистограмма продолжительности обработки запросов |
| `http_request_size_bytes`       | Summary   | `code`, `method`, `path` | Статистика размера входящих запросов в байтах    |
| `http_response_size_bytes`      | Summary   | `code`, `method`, `path` | Статистика размера ответов в байтах              |

### Коллекторы среды выполнения Go и системных показателей

TorrPlay также регистрирует стандартные коллекторы среды исполнения Go (`go_*`) и процессов (`process_*`): использование оперативной памяти, размер кучи, паузы сборщика мусора, открытые файловые дескрипторы и загрузку CPU.

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

Общее количество активных потоков:

```promql
sum(torrplay_streaming_torrents)
```

Определение 95-го процентиля задержки HTTP-запросов:

```promql
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```
