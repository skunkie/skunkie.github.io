---
title: Запуск в Docker
weight: 2
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

Здесь описано, как развернуть TorrPlay в контейнерах с помощью Docker и Docker Compose.

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

Перед запуском контейнера создайте каталог для данных. Внутри контейнера TorrPlay работает от пользователя с ID `1000`, поэтому у него должны быть права на запись в этот каталог. Если отсутствующий каталог создаст сам Docker, владельцем станет `root`, и TorrPlay не сможет туда писать:

```sh
mkdir -p data
sudo chown 1000:1000 data
```

Настройка владельца нужна для Docker на Linux. Если ваш собственный ID пользователя уже `1000` (проверить можно командой `id -u`), `chown` выполнять не нужно. Docker Desktop на macOS и Windows сам управляет правами на смонтированные каталоги, поэтому там достаточно `mkdir`.

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

## Запуск с помощью Docker Compose

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

Создайте каталог `data` с теми же правами, что описаны выше, и запустите приложение:

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

---

## DLNA в Docker

Обнаружение DLNA-сервера работает через SSDP-мультикаст, который не проходит через стандартную bridge-сеть Docker. Чтобы телевизоры и медиаплееры увидели TorrPlay, запустите контейнер в режиме host-сети. Проброс портов в этом режиме не используется:

```sh
docker run -d \
  --name torrplay \
  --network host \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  ghcr.io/torrplay/torrplay:latest \
  --data-dir /app/data
```

В Docker Compose замените раздел `ports` на `network_mode: host`.

Режим host-сети доступен на Linux. Если ваша среда Docker его не поддерживает, для работы DLNA запускайте TorrPlay без контейнера.
