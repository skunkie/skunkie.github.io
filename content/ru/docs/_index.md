---
title: Документация
weight: 3
bookIcon: book
bookToC: false
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Документация TorrPlay

Добро пожаловать в документацию TorrPlay. Ниже вы найдёте разделы, посвящённые установке, API потоковой передачи, аутентификации, интеграции с медиасерверами и мониторингу.

<div class="docs-card-grid">

  <a href="/ru/docs/features" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">⭐</div>
      <h3 class="docs-card-title">Возможности и хранение данных</h3>
    </div>
    <p class="docs-card-desc">Движок HTTP-потоковой передачи, кэширование в памяти по алгоритму LRU, постоянное файловое хранение и обновление метаданных через TVDB.</p>
  </a>

  <a href="/ru/docs/installation" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">📦</div>
      <h3 class="docs-card-title">Пакеты установки и приложения для настольных ОС</h3>
    </div>
    <p class="docs-card-desc">Установка через MSI и NSIS для Windows, пакеты DEB/RPM/AppImage для Linux, DMG со встроенным компонентом Go для macOS и APK для Android.</p>
  </a>

  <a href="/ru/docs/api" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">💻</div>
      <h3 class="docs-card-title">Справочник API</h3>
    </div>
    <p class="docs-card-desc">Конечные точки REST API, ссылки для потоковой передачи, эмуляция qBittorrent для Sonarr/Radarr и совместимость с TorrServer.</p>
  </a>

  <a href="/ru/docs/authentication" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">🔒</div>
      <h3 class="docs-card-title">Аутентификация</h3>
    </div>
    <p class="docs-card-desc">Базовая аутентификация, JWT Bearer-токен, cookie-файлы сессии браузера с атрибутом HttpOnly и восстановление доступа при утрате учётных данных.</p>
  </a>

  <a href="/ru/docs/dlna" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">📺</div>
      <h3 class="docs-card-title">Потоковая передача по DLNA / UPnP</h3>
    </div>
    <p class="docs-card-desc">Обнаружение устройств в сети по протоколу SSDP и потоковая передача на смарт-телевизоры, PlayStation, Xbox и другие медиаплееры.</p>
  </a>

  <a href="/ru/docs/metrics" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">📈</div>
      <h3 class="docs-card-title">Метрики Prometheus</h3>
    </div>
    <p class="docs-card-desc">Мониторинг в реальном времени через конечную точку /metrics, счётчики активных потоков, гистограммы задержки запросов и настройка сбора метрик Prometheus.</p>
  </a>

  <a href="/ru/docs/settings" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">⚙️</div>
      <h3 class="docs-card-title">Справочник настроек</h3>
    </div>
    <p class="docs-card-desc">Полная схема конечной точки /api/v1/settings.</p>
  </a>

  <a href="/ru/docs/backup" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">💾</div>
      <h3 class="docs-card-title">Резервное копирование и восстановление</h3>
    </div>
    <p class="docs-card-desc">Экспорт библиотек торрентов, восстановление резервных копий между экземплярами приложения и обновление метаданных резервных копий через командную строку.</p>
  </a>

  <a href="/ru/docs/playlist" class="docs-card">
    <div class="docs-card-header">
      <div class="docs-card-icon">🎵</div>
      <h3 class="docs-card-title">Плейлисты и журналы</h3>
    </div>
    <p class="docs-card-desc">Формирование плейлистов M3U для медиаплееров (VLC/Infuse) и просмотр последних записей из буфера журнала в оперативной памяти.</p>
  </a>

</div>
