---
title: Документация
weight: 3
toc: false
sidebar:
  icon: book-open
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

Добро пожаловать в документацию TorrPlay. Ниже вы найдёте разделы, посвящённые установке, API потоковой передачи, аутентификации, интеграции с медиасерверами и мониторингу.

{{< cards >}}
{{< card link="/ru/docs/features/" title="Возможности и хранение данных" icon="star" subtitle="HTTP-стриминг, кэширование в памяти по LRU, предзагрузка буфера и загрузка метаданных из TVDB." >}}
{{< card link="/ru/docs/installation/" title="Пакеты установки и десктопные приложения" icon="cube" subtitle="Инсталляторы MSI и NSIS для Windows, пакеты DEB/RPM/AppImage для Linux, DMG для macOS и APK для Android." >}}
{{< card link="/ru/docs/api/" title="Справочник API" icon="code" subtitle="Эндпоинты REST API, управление предзагрузкой, ссылки на потоки, эмуляция qBittorrent и совместимость с TorrServer." >}}
{{< card link="/ru/docs/authentication/" title="Аутентификация" icon="lock-closed" subtitle="Базовая аутентификация, JWT Bearer-токен, делегированные токены воспроизведения и восстановление доступа." >}}
{{< card link="/ru/docs/stremio/" title="Интеграция со Stremio" icon="film" subtitle="Встроенная поддержка Stremio Addon Protocol v3 с каталогами фильмов/сериалов и защищённым стримингом." >}}
{{< card link="/ru/docs/mcp/" title="Model Context Protocol (MCP)" icon="chip" subtitle="Интеграция с ИИ-ассистентами через протоколы stdio и SSE для Claude Desktop и сред разработки." >}}
{{< card link="/ru/docs/dlna/" title="Потоковая передача по DLNA / UPnP" icon="desktop-computer" subtitle="Обнаружение по SSDP, навигация по категориям, оповещения GENA и потоковая передача на смарт-ТВ и плееры." >}}
{{< card link="/ru/docs/metrics/" title="Метрики Prometheus" icon="chart-bar" subtitle="Мониторинг в реальном времени через /metrics, счётчики активных потоков, задержки запросов и настройка сбора метрик." >}}
{{< card link="/ru/docs/settings/" title="Справочник параметров и настроек приложения" icon="cog" subtitle="Схема /api/v1/settings: память и диск, логирование, аутентификация, CORS и тонкая настройка торрент-клиента." >}}
{{< card link="/ru/docs/backup/" title="Резервное копирование и восстановление" icon="archive" subtitle="Экспорт библиотеки раздач, перенос данных между серверами и обновление метаданных через CLI." >}}
{{< card link="/ru/docs/playlist/" title="Плейлисты" icon="play" subtitle="Генерация авторизованных плейлистов M3U для внешних плееров." >}}
{{< card link="/ru/docs/logs/" title="Журналы" icon="document-text" subtitle="Поиск и фильтрация логов в кольцевом буфере, объём хранения, уровень детализации и вывод в JSON." >}}
{{< /cards >}}
