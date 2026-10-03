<!--
SPDX-FileCopyrightText: 2026 TorrPlay

SPDX-License-Identifier: MIT
-->

# Contributing

Thank you for your interest in contributing to TorrPlay documentation!

## Reporting Issues

Please use the provided issue templates:

- [Bug Report](https://github.com/torrplay/torrplay.github.io/issues/new?template=bug_report.yml)
- [Feature Request](https://github.com/torrplay/torrplay.github.io/issues/new?template=feature_request.yml)

Blank issues are disabled.

## Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Submit a pull request

### Documentation Changes

- Content lives in `content/en/` (English) and `content/ru/` (Russian)
- Update both languages in the same pull request; every page must exist at the same path in both directories
- Use Markdown with Hugo front matter
- Keep SPDX headers after the front matter closing `---`
- Follow the existing file structure and naming conventions
- See [AGENTS.md](AGENTS.md) for the full style, translation, and commit guidelines

### Before Submitting

Format the Markdown, check that both languages have the same files, check license information, and make sure the site builds. The checks need Node.js (for `npx`) and [reuse](https://reuse.software/). The symmetry check uses process substitution, so run these commands in bash or zsh:

```bash
npx prettier --write "**/*.md"
diff <(cd content/en && find . -type f | sort) <(cd content/ru && find . -type f | sort)
reuse lint
hugo --minify --gc
```

### Building Locally

```sh
git clone --recursive https://github.com/torrplay/torrplay.github.io.git
cd torrplay.github.io
hugo server
```

Requires Hugo extended v0.166.0+.

## License

The documentation is MIT licensed. By contributing, you agree that your contribution is provided under the same license. Every file carries an SPDX copyright and license header or is covered by `REUSE.toml`. `reuse lint` fails when one does not, so a new file needs its header.

## Code of Conduct

By participating, you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).
