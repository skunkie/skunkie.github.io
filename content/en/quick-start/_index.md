---
title: Quick Start
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


Welcome to TorrPlay! Choose your preferred deployment or installation path below.

{{< cards >}}
  {{< card link="/download" title="Download" icon="arrow-down" subtitle="Get the latest TorrPlay release for your platform — Windows, macOS, Linux, and Android." >}}
  {{< card link="running-with-docker" title="Running with Docker" icon="server" subtitle="Deploy containerized TorrPlay using Docker CLI or Docker Compose, with ready-to-use configuration examples." >}}
  {{< card link="building-from-source" title="Building from Source" icon="code" subtitle="Compile the Go streaming engine and Next.js web client manually from source code." >}}
{{< /cards >}}

## Next Steps

Once your instance is running on **http://localhost:8090**:

- [Explore the Core Features](/docs/features)
- [Manage Torrents via REST API](/docs/api)
- [Configure Basic or JWT Auth](/docs/authentication)
- [Stream over DLNA to Smart TVs](/docs/dlna)
- [Connect Prometheus Observability](/docs/metrics)
