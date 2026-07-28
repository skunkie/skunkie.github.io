<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Contributing

Thank you for your interest in contributing to TorrPlay documentation!

## Reporting Issues

Please use the provided issue templates:

- [Bug Report](https://github.com/torrplay/torrplay.github.io/issues/new?template=bug_report.yml)
- [Feature Request](https://github.com/torrplay.github.io/issues/new?template=feature_request.yml)

Blank issues are disabled.

## Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Submit a pull request

### Documentation Changes

- Content lives in `content/en/` (English) and `content/ru/` (Russian)
- Use Markdown with Hugo front matter
- Keep SPDX headers after the front matter closing `---`
- Follow the existing file structure and naming conventions

### Building Locally

```sh
git clone --recursive https://github.com/torrplay/torrplay.github.io.git
cd torrplay.github.io
hugo server
```

Requires Hugo extended v0.164.0+.

## Code of Conduct

By participating, you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).
