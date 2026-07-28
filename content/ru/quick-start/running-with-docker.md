---
title: Запуск с Docker
weight: 2
bookIcon: server
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Запуск с Docker

Данное руководство описывает запуск TorrPlay с Docker и Docker Compose.

---

## Предварительные требования

- Установленный Docker ([инструкция по установке](https://docs.docker.com/get-docker/))
- Docker Compose v2 (входит в состав Docker Desktop либо [устанавливается отдельно](https://docs.docker.com/compose/install/))

---

## Загрузка и запуск через Docker CLI

Загрузите актуальный мультиплатформенный образ (`linux/amd64`, `linux/arm64`):

```sh
docker pull ghcr.io/torrplay/torrplay:latest
```

Запустите контейнер в фоновом режиме:

```sh
docker run -d \
  --name torrplay \
  -p 8090:8090 \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  ghcr.io/torrplay/torrplay:latest \
  --data-dir /app/data
```

Веб-интерфейс доступен по адресу **http://localhost:8090**.

---

## Запуск с Docker Compose

Файл `docker-compose.yml` есть в корневой директории проекта:

```yaml
services:
  torrplay:
    image: ghcr.io/torrplay/torrplay:latest
    container_name: torrplay
    ports:
      - "8090:8090"
    volumes:
      - ./data:/app/data
    command: ["--data-dir", "/app/data"]
    restart: unless-stopped
```

Запустите приложение:

```sh
docker compose up -d
```

### Управление контейнером

```sh
# Просмотр журналов в реальном времени
docker compose logs -f

# Остановка службы
docker compose down

# Перезапуск службы
docker compose restart

# Обновление до актуального образа контейнера
docker compose pull && docker compose up -d
```
