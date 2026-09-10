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
  {{< card link="features" title="Возможности и хранение данных" icon="star" subtitle="Движок HTTP-потоковой передачи, кэширование в памяти по алгоритму LRU, постоянное файловое хранение и обновление метаданных через TVDB." >}}
  {{< card link="installation" title="Пакеты установки и приложения для настольных ОС" icon="cube" subtitle="Установка через MSI и NSIS для Windows, пакеты DEB/RPM/AppImage для Linux, DMG со встроенным компонентом Go для macOS и APK для Android." >}}
  {{< card link="api" title="Справочник API" icon="code" subtitle="Конечные точки REST API, ссылки для потоковой передачи, эмуляция qBittorrent для Sonarr/Radarr и совместимость с TorrServer." >}}
  {{< card link="authentication" title="Аутентификация" icon="lock-closed" subtitle="Базовая аутентификация, JWT Bearer-токен, cookie-файлы сессии браузера с атрибутом HttpOnly и восстановление доступа при утрате учётных данных." >}}
  {{< card link="dlna" title="Потоковая передача по DLNA / UPnP" icon="desktop-computer" subtitle="Обнаружение устройств в сети по протоколу SSDP и потоковая передача на смарт-телевизоры, PlayStation, Xbox и другие медиаплееры." >}}
  {{< card link="metrics" title="Метрики Prometheus" icon="chart-bar" subtitle="Мониторинг в реальном времени через конечную точку /metrics, счётчики активных потоков, гистограммы задержки запросов и настройка сбора метрик Prometheus." >}}
  {{< card link="settings" title="Справочник параметров и настроек приложения" icon="cog" subtitle="Схема /api/v1/settings с параметрами хранилища, журналирования, аутентификации и торрент-клиента." >}}
  {{< card link="backup" title="Резервное копирование и восстановление" icon="archive" subtitle="Экспорт библиотек торрентов, восстановление резервных копий между экземплярами приложения и обновление метаданных резервных копий через командную строку." >}}
  {{< card link="playlist" title="Плейлисты и журналы" icon="play" subtitle="Формирование плейлистов M3U для медиаплееров (VLC/Infuse) и просмотр последних записей из буфера журнала в оперативной памяти." >}}
{{< /cards >}}
