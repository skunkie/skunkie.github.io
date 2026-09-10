---
title: Быстрый старт
weight: 2
type: docs
toc: false
cascade:
  type: docs
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->


Добро пожаловать в TorrPlay! Выберите подходящий способ развёртывания или установки.

{{< cards >}}
  {{< card link="/ru/download" title="Скачать" icon="arrow-down" subtitle="Получите актуальную сборку TorrPlay для вашей платформы — Windows, macOS, Linux и Android." >}}
  {{< card link="running-with-docker" title="Запуск в Docker" icon="server" subtitle="Разверните TorrPlay в контейнере с помощью Docker CLI или Docker Compose и готовых примеров конфигурации." >}}
  {{< card link="building-from-source" title="Сборка из исходного кода" icon="code" subtitle="Инструкции по самостоятельной компиляции бэкенда на Go и веб-интерфейса Next.js из исходного кода." >}}
{{< /cards >}}

## Дальнейшие шаги

После запуска приложения по адресу **http://localhost:8090**:

- [Ознакомьтесь с основными возможностями](/docs/features)
- [Управляйте торрентами через REST API](/docs/api)
- [Настройте базовую или JWT-аутентификацию](/docs/authentication)
- [Настройте потоковую передачу на смарт-телевизоры через DLNA](/docs/dlna)
- [Подключите мониторинг через Prometheus](/docs/metrics)
