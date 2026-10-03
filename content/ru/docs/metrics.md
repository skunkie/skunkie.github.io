---
title: Метрики Prometheus и мониторинг
weight: 8
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
- `/api/system/metrics` — краткая сводка в JSON с полями `active_torrents`, `download_speed` и `upload_speed`

Перечисленные ниже метрики доступны только через `/metrics`.

## Доступные метрики

### Активность приложения и торрентов

| Название метрики                | Тип   | Метки    | Описание                                                                     |
| ------------------------------- | ----- | -------- | ---------------------------------------------------------------------------- |
| `torrplay_downloading_torrents` | Gauge | —        | Количество торрентов, скачиваемых сейчас в фоне                              |
| `torrplay_loaded_torrents`      | Gauge | `reason` | Загруженные торренты с меткой `reason`: `background` или `on_demand`         |
| `torrplay_streaming_torrents`   | Gauge | —        | Количество торрентов с открытым сеансом просмотра; каждый считается один раз |

### Потоковое воспроизведение

| Название метрики                        | Тип       | Метки     | Описание                                                           |
| --------------------------------------- | --------- | --------- | ------------------------------------------------------------------ |
| `torrplay_stream_read_duration_seconds` | Histogram | `storage` | Задержка чтения потока, включая ожидание данных торрента           |
| `torrplay_stream_requests_in_flight`    | Gauge     | —         | Количество обрабатываемых HTTP-запросов потокового воспроизведения |

### HTTP-трафик и задержка

| Название метрики                | Тип       | Метки                    | Описание                                         |
| ------------------------------- | --------- | ------------------------ | ------------------------------------------------ |
| `http_request_duration_seconds` | Histogram | `code`, `method`, `path` | Гистограмма продолжительности обработки запросов |
| `http_request_size_bytes`       | Summary   | `code`, `method`, `path` | Статистика размера входящих запросов в байтах    |
| `http_requests_total`           | Counter   | `code`, `method`, `path` | Общее количество обработанных HTTP-запросов      |
| `http_response_size_bytes`      | Summary   | `code`, `method`, `path` | Статистика размера ответов в байтах              |

### BitTorrent-клиент

| Название метрики                       | Тип     | Метки       | Описание                                                               |
| -------------------------------------- | ------- | ----------- | ---------------------------------------------------------------------- |
| `torrplay_torrent_banned_peers`        | Gauge   | —           | Адреса пиров, заблокированных за передачу повреждённых данных          |
| `torrplay_torrent_data_bytes_total`    | Counter | `direction` | Полезные байты частей, полученные или отправленные BitTorrent-клиентом |
| `torrplay_torrent_peers`               | Gauge   | `state`     | Подключённые пиры, устанавливаемые соединения и ожидающие адреса       |
| `torrplay_torrent_pieces_hashed_total` | Counter | `result`    | Части с успешной (`good`) или неуспешной (`bad`) проверкой хэша        |

### Хранилище в оперативной памяти

| Название метрики                                  | Тип     | Метки        | Описание                                                        |
| ------------------------------------------------- | ------- | ------------ | --------------------------------------------------------------- |
| `torrplay_storage_completion_misses_total`        | Counter | —            | Части, вытесненные до отметки о завершении в торрент-клиенте    |
| `torrplay_storage_evicted_incomplete_bytes_total` | Counter | —            | Загруженные байты, потерянные при вытеснении неполных частей    |
| `torrplay_storage_evicted_pieces_total`           | Counter | `state`      | Полные и неполные части, вытесненные из памяти                  |
| `torrplay_storage_memory_limit_bytes`             | Gauge   | —            | Лимит хранилища в оперативной памяти                            |
| `torrplay_storage_memory_used_bytes`              | Gauge   | —            | Память, зарезервированная сейчас под данные частей              |
| `torrplay_storage_protected_evictions_total`      | Counter | `protection` | Вытеснение границ файлов и активных диапазонов в крайнем случае |
| `torrplay_storage_read_failures_total`            | Counter | `reason`     | Ошибки чтения вытесненных или не полностью загруженных частей   |
| `torrplay_storage_refused_hashes_total`           | Counter | —            | Отменённые проверки хэша после вытеснения части данных          |

### Коллекторы среды выполнения Go и системных показателей

TorrPlay также регистрирует стандартные коллекторы среды исполнения Go (`go_*`) и процессов (`process_*`): использование оперативной памяти, размер кучи, паузы сборщика мусора, открытые файловые дескрипторы и загрузку CPU.

## Настройка сбора метрик Prometheus

Если аутентификация в TorrPlay отключена, добавьте следующую цель в `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: "torrplay"
    scrape_interval: 15s
    static_configs:
      - targets: ["localhost:8090"]
```

Для Basic-аутентификации добавьте в настройки задачи учётные данные:

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

Для Bearer-аутентификации сохраните административный токен доступа в файле и укажите его в настройках задачи:

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

Получите административный токен через `/oauth/token`. Токен воспроизведения не даёт доступа к `/metrics`.

{{< callout type="warning" >}}
Токен доступа действует 24 часа, поэтому файл с ним нужно обновлять хотя бы раз в сутки — например, плановым заданием, которое запрашивает новый токен через `/oauth/token`. Prometheus перечитывает `credentials_file` при каждом опросе, так что перезапускать его не придётся. Для автоматического сбора метрик проще Basic-аутентификация: её учётные данные не истекают.
{{< /callout >}}

## Пример запроса

Количество торрентов с открытым сеансом просмотра на всех серверах:

```promql
sum(torrplay_streaming_torrents)
```

Количество обрабатываемых HTTP-запросов потокового воспроизведения:

```promql
sum(torrplay_stream_requests_in_flight)
```

Определение 95-го процентиля задержки HTTP-запросов:

```promql
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```
