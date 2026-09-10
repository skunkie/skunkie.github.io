<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# AGENTS.md

This file provides instructions and guidelines for AI agents working in this repository.

## Repository Overview

This repository hosts the official documentation website for [TorrPlay](https://github.com/torrplay/torrplay), built with [Hugo](https://gohugo.io/) (extended edition) and the [Hextra](https://imfing.github.io/hextra/) theme.

## Documentation Language Guidelines

When writing, updating, or maintaining documentation in this repository, follow these rules:

### Supported Languages

- **English (`en`)**: Primary / default content language (`defaultContentLanguage: "en"`).
  - Directory: `content/en/`
- **Russian (`ru`)**: Secondary / localized content language.
  - Directory: `content/ru/`

### Language Instructions for Documentation

1. **Bilingual Parity**:
   - Every documentation page must exist in **both** English (`content/en/`) and Russian (`content/ru/`).
   - The directory and file hierarchy must remain symmetrical between `content/en/` and `content/ru/`.
   - When adding a new documentation page, create both English and Russian versions.
   - When editing or updating existing documentation, apply corresponding updates to both language versions to prevent drift.

2. **File & URL Naming**:
   - Keep identical file paths and filenames across languages (e.g., `content/en/docs/features.md` and `content/ru/docs/features.md`).
   - File names and URL slugs must remain in English even for Russian pages to keep routing consistent.

3. **Writing Style & Quality**:
   - **English**: Use clear, concise, and technically accurate modern American English.
   - **Russian**: Use natural, technically accurate Russian terminology. Avoid literal machine-translation phrasing.
   - Ensure consistency in terminology across all pages (e.g., streaming terms, TorrPlay settings, UI labels).
   - Translate front matter `title` and section headings into the target language.

4. **UI & Template Strings**:
   - Shared UI strings belong in `i18n/en.yaml` and `i18n/ru.yaml`.
   - When introducing new UI labels or template strings, add entries to both localization files.

## Content Formatting & Conventions

- **Hugo Front Matter**:
  - Each Markdown file must start with YAML front matter enclosed by `---`.
  - Include metadata such as `title`, `weight`, and layout configuration where appropriate.
- **SPDX License Headers**:
  - Every file must include appropriate SPDX license headers:
    - **Markdown (`.md`)**: HTML comment immediately following the closing `---` of the front matter:
      ```markdown
      ---
      title: "Page Title"
      ---

      <!--
      SPDX-FileCopyrightText: 2026 TorrPlay

      SPDX-License-Identifier: MIT
      -->
      ```
    - **HTML Templates (`.html`)**: Hugo comment at the top of the template:
      ```html
      {{/*
      SPDX-FileCopyrightText: 2026 TorrPlay

      SPDX-License-Identifier: MIT
      */}}
      ```
    - **YAML Files (`.yaml`, `.yml`)**: Hash comment at the top:
      ```yaml
      # SPDX-FileCopyrightText: 2026 TorrPlay
      #
      # SPDX-License-Identifier: MIT
      ```
- **Links**:
  - Use relative root-based paths (e.g., `[Quick Start](/quick-start/)`, `[Documentation](/docs/)`).
- **Shortcodes & Visual Components**:
  - Hextra shortcodes (`{{< cards >}}`, `{{< card >}}`, `{{< tabs >}}`, `{{< tab >}}`, `{{< callout >}}`) are used throughout the site.
  - When adding a new page to a section (e.g., `/docs/` or `/quick-start/`), update the corresponding `_index.md` card grid in both `content/en/` and `content/ru/` with localized titles, subtitles, and matching icons.

## Architecture & Special Layouts

- **API Reference (`/openapi`)**:
  - Managed via [`layouts/openapi/single.html`](layouts/openapi/single.html) using [Scalar](https://github.com/scalar/scalar).
  - Automatically fetches the OpenAPI specification from `torrplay/torrplay` (`main/api/api.yaml`). Changes to the spec belong in the main TorrPlay repository, not here.
- **Download Page (`/download`)**:
  - Rendered using [`layouts/download/single.html`](layouts/download/single.html).
  - Dynamically fetches release artifacts and metadata from GitHub Releases.
- **Custom Overrides & Layout Standards**:
  - Layout overrides (such as sidebar modifications) live in [`layouts/_partials/`](layouts/_partials/). Keep overrides minimal and documented to simplify future theme upgrades.
  - **Client-Side Sanitization**: Any external or dynamic markup rendered in templates (such as markdown release notes fetched from GitHub) must be sanitized with DOMPurify before inserting into the DOM.
  - **Hextra Styling**: Use Hextra's scoped utility classes (`hx:...`) to prevent styling conflicts and ensure consistent dark/light mode and responsive behavior.

## Development Workflow & Commands

### Setup & Submodules

- Initialize or restore submodules:
  ```sh
  git submodule update --init --recursive
  ```
- Upgrade the Hextra theme to latest:
  ```sh
  git submodule update --remote themes/hextra
  ```

### Common Commands

- **Local Development Server**:
  ```sh
  hugo server
  ```
- **Build Site**:
  ```sh
  hugo --minify --gc
  ```

Prerequisite: Hugo extended v0.166.0+.

## Commit Messages & History Hygiene

- **Conventional Commits**: Use `type(scope): concise imperative summary`.
  - Common types: `docs`, `feat`, `fix`, `refactor`.
  - Scopes: Use language codes (`en`, `ru`) for language-specific documentation changes (e.g., `docs(ru): ...`), or components/layouts (e.g., `feat(download): ...`, `fix(sidebar): ...`). Omit the scope for cross-cutting changes, as in `docs: ...`.
- **Subject Formatting**: Keep the subject concise, lowercase after the colon, and without a trailing period.
- **Atomic Commits**: Treat one cohesive change and its supporting translations or layout updates as one commit.
  - When modifying or adding documentation, keep bilingual parity within the same atomic commit (`content/en/` and `content/ru/` updated together) to prevent drift.
  - Split changes only when they are independently meaningful and leave the repository correct at each boundary.
- **Zero-Drift & Structural Symmetry**:
  - Before committing, verify file tree symmetry between languages so no orphan pages exist:
    ```sh
    diff <(cd content/en && find . -type f | sort) <(cd content/ru && find . -type f | sort)
    ```
- **Body Requirements**: For a non-trivial commit, add a body after a blank line and use `-` bullets. Write each bullet as a complete sentence ending with a period.
- **Content Focus**: Use body bullets to describe observable behavior, user-visible changes, structural updates, or important details. Do not narrate file-by-file edits.
- **Timestamp Symmetry**: When rebasing, amending, or squashing commits, ensure `GIT_COMMITTER_DATE` matches `GIT_AUTHOR_DATE`.
- **Atomic Buildability**: Ensure every commit compiles and verifies cleanly: run Hugo build (`hugo --minify --gc`) to ensure there are no template errors, broken links, or build failures.

Example:

```text
docs: add macOS WKWebView HTTP limitation hint for desktop app

- Document WebKit security restrictions on plain HTTP streams in macOS.
- Recommend using HTTPS or loopback addresses for streaming playback.
- Synchronize advice across English and Russian documentation pages.
```

