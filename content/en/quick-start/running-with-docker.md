---
title: Running with Docker
weight: 2
bookIcon: server
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Running with Docker

This guide covers running TorrPlay using Docker and Docker Compose.

---

## Prerequisites

- Docker installed ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose v2 (included with Docker Desktop, or [install separately](https://docs.docker.com/compose/install/))

---

## Pull and Run with Docker CLI

Pull the latest multi-architecture image (`linux/amd64`, `linux/arm64`):

```sh
docker pull ghcr.io/torrplay/torrplay:latest
```

Run the container in detached mode:

```sh
docker run -d \
  --name torrplay \
  -p 8090:8090 \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  ghcr.io/torrplay/torrplay:latest \
  --data-dir /app/data
```

Access the web UI at **http://localhost:8090**.

---

## Run with Docker Compose

A `docker-compose.yml` file is provided in the project root:

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

Run the stack:

```sh
docker compose up -d
```

### Container Management

```sh
# View real-time logs
docker compose logs -f

# Stop the service
docker compose down

# Restart the service
docker compose restart

# Update to the latest container image
docker compose pull && docker compose up -d
```
