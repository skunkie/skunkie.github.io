---
title: Installers & Desktop Apps
weight: 2
bookIcon: download
---

<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Installers & Desktop Client Apps

TorrPlay provides pre-packaged installers, desktop applications, mobile packages, and standalone binaries for all major operating systems. For containerized deployments, see the [Running with Docker](/quick-start/running-with-docker/) guide.

---

## Desktop Apps

The TorrPlay Desktop Client (built with **Tauri** and **Next.js**) provides a native desktop interface for Windows, macOS, and Linux.

### macOS Client App

On macOS, the desktop client app (`.dmg` / `.app`) uses a **Tauri Sidecar** architecture:

- **Self-Contained Bundle:** The Go backend engine binary (`torrplay`) is embedded directly inside the macOS application bundle (`TorrPlay.app/Contents/MacOS/`).
- **Automatic Process Management:** When you launch the macOS application, Tauri automatically spawns the embedded Go backend sidecar process in the background with environment flags (`TORRPLAY_RUNNING_AS_SERVICE=true`).
- **Clean Lifecycle & Teardown:** Tauri registers process monitors and C-level exit handlers (`atexit`) to cleanly terminate the Go backend sidecar whenever the desktop app is closed or quit.

---

## Operating System Installers & Packages

### Windows

| Package Type              | File Extension | Installation Method                                                                                                             |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **WiX Windows Installer** | `.msi`         | Double-click to launch the setup wizard. It automatically configures firewall rules and registers the application as a service. |
| **NSIS Desktop Setup**    | `.exe`         | Standard desktop installer for the Tauri GUI app.                                                                               |
| **Standalone Binary**     | `.exe`         | Portable command-line executable. Run directly from CMD/PowerShell: `.\torrplay-windows-amd64.exe --data-dir=C:\data`           |

### Linux

| Package Type               | File Extension | Installation Method                                                         |
| -------------------------- | -------------- | --------------------------------------------------------------------------- |
| **Debian / Ubuntu**        | `.deb`         | `sudo dpkg -i torrplay_*.deb` or `sudo apt install ./torrplay_*.deb`        |
| **RHEL / Fedora / CentOS** | `.rpm`         | `sudo rpm -i torrplay_*.rpm` or `sudo dnf install ./torrplay_*.rpm`         |
| **Universal Desktop**      | `.AppImage`    | `chmod +x TorrPlay-*.AppImage && ./TorrPlay-*.AppImage`                     |
| **Standalone Binary**      | —              | `chmod +x torrplay-linux-amd64 && ./torrplay-linux-amd64 --data-dir=./data` |

### macOS

| Package Type            | File Extension | Installation Method                                                              |
| ----------------------- | -------------- | -------------------------------------------------------------------------------- |
| **macOS App & Sidecar** | `.dmg`         | Open the `.dmg` disk image and drag **TorrPlay** to your `/Applications` folder. |
| **Standalone Binary**   | —              | `chmod +x torrplay-darwin-arm64 && ./torrplay-darwin-arm64`                      |

> [!NOTE]
> macOS Gatekeeper may block the unsigned app. To unblock, run `xattr -c /Applications/TorrPlay.app` in Terminal, then right-click → **Open**.

### Android

| Package Type         | File Extension | Details                                                                                                                                                           |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Android APK**      | `.apk`         | Pre-built packages available for `arm64-v8a`, `armeabi-v7a`, `x86_64`, `x86`, and `universal` architectures. Download and open on your Android device to install. |
| **Gomobile Library** | `.aar`         | Android archive library containing the core `pkg/torrplay` logic for developers embedding TorrPlay in custom mobile applications.                                 |

### Docker Containers

For Docker and Docker Compose instructions, see the [Running with Docker](/quick-start/running-with-docker/) guide.
