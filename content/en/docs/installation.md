---
title: Installers & Desktop Apps
weight: 2
sidebar:
  icon: download
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

TorrPlay provides pre-packaged installers, desktop applications, mobile packages, and standalone binaries for all major operating systems. For containerized deployments, see the [Running with Docker](/quick-start/running-with-docker/) guide.

---

## Desktop Apps

The TorrPlay Desktop Client (built with **Tauri** and **Next.js**) provides a native desktop interface for Windows, macOS, and Linux.

The deployment model differs by platform:

- **Windows and Linux:** the Tauri desktop app is a frontend client. Install or run the TorrPlay backend separately; the client connects to `http://localhost:8090` by default, and you can change the API URL in its settings.
- **macOS:** the Tauri app includes and manages the Go backend as a sidecar, so it is self-contained.
- **Android:** the app embeds the Go engine through the Gomobile library and runs it in an Android foreground service.

Standalone binaries, service installers, Docker images, and Linux server packages run the Go backend, which serves both the API and its embedded web interface.

### macOS Client App

On macOS, the desktop client app (`.dmg` / `.app`) uses a **Tauri Sidecar** architecture:

- **Self-Contained Bundle:** The Go backend engine binary (`torrplay`) is embedded directly inside the macOS application bundle (`TorrPlay.app/Contents/MacOS/`).
- **Automatic Process Management:** When you launch the macOS application, Tauri automatically spawns the embedded Go backend sidecar process in the background with the `TORRPLAY_RUNNING_AS_SERVICE=true` environment variable.
- **Clean Lifecycle & Teardown:** Tauri registers process monitors and C-level exit handlers (`atexit`) to cleanly terminate the Go backend sidecar whenever the desktop app is closed or quit.

---

## Operating System Installers & Packages

### Windows

| Package Type                  | File Name                                              | Installation Method                                                                                                   |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Backend service installer** | `TorrPlay-<version>-<arch>.msi`                        | The TorrPlay WiX installer configures firewall rules and registers the Go backend as a Windows service.               |
| **Tauri desktop client**      | `TorrPlay.Client_*.msi`, `TorrPlay.Client_*-setup.exe` | Installs the frontend client. A separately running TorrPlay backend is required.                                      |
| **Standalone Binary**         | `torrplay-windows-<arch>.exe`                          | Portable command-line executable. Run directly from CMD/PowerShell: `.\torrplay-windows-amd64.exe --data-dir=C:\data` |

### Linux

| Package Type                       | File Name                                                                   | Installation Method                                                         |
| ---------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Debian / Ubuntu backend**        | `torrplay_<version>_linux_<arch>.deb`                                       | `sudo dpkg -i torrplay_*.deb` or `sudo apt install ./torrplay_*.deb`        |
| **RHEL / Fedora / CentOS backend** | `torrplay_<version>_linux_<arch>.rpm`                                       | `sudo rpm -i torrplay_*.rpm` or `sudo dnf install ./torrplay_*.rpm`         |
| **Tauri desktop client**           | `torrplay-client*.deb`, `torrplay-client*.rpm`, `torrplay-client*.AppImage` | Frontend client packages; run a TorrPlay backend separately.                |
| **Standalone Binary**              | `torrplay-linux-<arch>`                                                     | `chmod +x torrplay-linux-amd64 && ./torrplay-linux-amd64 --data-dir=./data` |

### macOS

| Package Type            | File Name                        | Installation Method                                                              |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| **macOS App & Sidecar** | `TorrPlay_<version>_aarch64.dmg` | Open the `.dmg` disk image and drag **TorrPlay** to your `/Applications` folder. |
| **Standalone Binary**   | `torrplay-darwin-<arch>`         | `chmod +x torrplay-darwin-arm64 && ./torrplay-darwin-arm64`                      |

> [!NOTE]
> macOS Gatekeeper may block the unsigned app. To unblock, run `xattr -c /Applications/TorrPlay.app` in Terminal, then right-click → **Open**.

> [!TIP]
> **macOS web view limitation:** WKWebView in Tauri blocks HTTP traffic due to App Transport Security. To play video, select a player (VLC, IINA, etc.) in Tauri settings: External Player → Player Name. The player must be installed on your system.

### Android

| Package Type         | File Name                    | Details                                                                                                                                                                  |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Android APK**      | `torrplay-android-<abi>.apk` | Self-contained app with the Go engine running in an Android foreground service. Packages are available for `arm64-v8a`, `armeabi-v7a`, `x86_64`, `x86`, and `universal`. |
| **Gomobile Library** | `torrplay.aar`               | Android archive library containing the core `pkg/torrplay` logic for developers embedding TorrPlay in custom mobile applications.                                        |

### Docker Containers

For Docker and Docker Compose instructions, see the [Running with Docker](/quick-start/running-with-docker/) guide.
