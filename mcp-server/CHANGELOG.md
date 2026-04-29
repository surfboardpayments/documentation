# Changelog

All notable changes to `@surfboardpayments/surf-mcp` are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [1.2.1] — 2026-04-29

### Fixed
- Ship `CHANGELOG.md` in the published tarball so release notes are visible on the npm page (was missing from `files` in 1.2.0).

### Changed
- Expanded README with install instructions for Claude Code, Claude Desktop, Cursor, Windsurf, example queries, bundled-content overview, troubleshooting, and a versioning note pointing to the changelog.

## [1.2.0] — 2026-04-29

### Added
- ECR V2 (Electronic Cash Register) API documentation (from upstream `32d57210`)

### Changed
- Synced upstream API doc updates from GitLab `master`:
  - `bd5cfcd5` fix(docs): updated payment methods to boolean
  - `3f17d5f1` fix(docs): fixed payment methods response

### Fixed
- Build script now uses `npx tsc` so `npm run build` works without a global TypeScript install

## [1.1.0] — Initial public release

- MCP server exposing Surfboard Payments API documentation as searchable tools
- Bundled API reference, webhooks, integration guides, and web guides
- GitHub sync workflow (`scripts/sync-github.sh`)
