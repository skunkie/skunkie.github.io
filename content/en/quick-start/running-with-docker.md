---
title: Running with Docker
weight: 2
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

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

Create the data directory before starting the container. TorrPlay runs inside the container as user ID `1000`, so that user must be able to write to the directory. If Docker creates a missing directory itself, it is owned by `root` and TorrPlay cannot write to it:

```sh
mkdir -p data
sudo chown 1000:1000 data
```

These ownership steps apply to Docker on Linux. Skip `chown` if your own user ID is already `1000` (check with `id -u`). Docker Desktop on macOS and Windows handles bind-mount permissions itself, so `mkdir` is enough there.

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

Create the `data` directory with the same ownership as described above, then run the stack:

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

---

## DLNA in Docker

DLNA discovery relies on SSDP multicast, which does not pass through Docker's default bridge network. To make TorrPlay visible to TVs and media players, run the container with host networking. Port mappings are not used in this mode:

```sh
docker run -d \
  --name torrplay \
  --network host \
  -v $(pwd)/data:/app/data \
  --restart unless-stopped \
  ghcr.io/torrplay/torrplay:latest \
  --data-dir /app/data
```

With Docker Compose, replace the `ports` section with `network_mode: host`.

Host networking is available on Linux hosts. If your Docker environment does not support it, run TorrPlay outside a container to use DLNA.
