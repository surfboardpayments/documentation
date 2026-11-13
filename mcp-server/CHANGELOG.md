# Changelog

All notable changes to `@surfboardpayments/surf-mcp` are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [1.3.2] — 2026-11-13

### Changed
- The package is now released under the **MIT License**. It was previously marked `UNLICENSED`, which left no stated terms for using it. A `LICENSE` file ships in the tarball and the `license` field in `package.json` is `MIT`. No code or documentation changes.

## [1.3.1] — 2026-09-04

### Added
- **14 new web guides** synced from surfboardpayments.com: Service Providers & Split Payouts, Device Registration, CheckoutX SoftPOS, ESC/POS Printing, Create Order Error Codes, Online Payment Link, Customer Identification, Tokens, Terminal Logistics, Transactions & Reports, AI Merchandising, POS Templates, API Conventions, B2B Invoices. The bundle grows from 32 to **46 web guides**.
- **5 new webhook events** from upstream GitLab `master` (through `0d6a94a2`): `stores.online-store-onboarded`, `stores.store-activated`, `terminals.hardware-terminal-registered`, `terminals.online-terminal-registered`, `terminals.softpos-terminal-registered`. The bundle now carries **24 webhook events**.
- `scripts/sync-from-local.sh` and `scripts/sync-web-guides.mjs` at the repo root, so the whole upstream + web-guide sync is one command.

### Changed
- **20 existing web guides updated** to their current published versions, including the rewritten Merchant Onboarding guide (registry prefill, MCC classification, people and signing) and updates to account management, create-an-order, payment lifecycle, receipts, recurring payments, refunds, settlements, store management, terminal device management, webhooks, and others.
- Web guide markdown files now start with the same header the site serves at `/api/ai/guides/<slug>.md` (title, description, source URL, category, tags) so `read_doc` output is self-describing.

## [1.3.0] — 2026-08-11

### Added
- Synced 43 commits of upstream API documentation from GitLab `master` (through `21cb02d3`). The bundle grows from 157 endpoints across 25 sections to **237 endpoints across 29 sections**.
- New API sections: **Electronic Cash Register (ECR) V2** (12 endpoints), **Partners** (10), **RFID** (6), **Webhooks API** (5), **Transactions** (3), **Bin Ranges** (2).
- Expanded existing sections: Terminals 21→33, Product Catalog 16→25, Merchants 12→19, Stores 8→12, Payments 5→10, Logistics 7→10, Orders 9→10, Receipts 5→8, Service Providers 5→8, Payment Methods 4→7, Branding 12→13.

### Removed
- **NFC Reading** (5 endpoints), superseded upstream by the RFID API (`4b63f099`). Its documents are no longer bundled or readable via `read_doc`.

### Fixed
- `scripts/bundle-docs.js` now clears each destination directory before copying. Previously it only copied over the top, so documents deleted upstream lingered in `data/` indefinitely and shipped in the tarball — 1.2.1 carried 10 such orphans (5 `nfc-reading-*`, 4 `orders-new-*`, and `receipts-add-receipt-information`). They were unreachable through search but `read_doc` would still serve them, meaning a client could be handed superseded documentation.
- The server now reports its version from `package.json` instead of a hardcoded string. It had advertised `1.1.0` over MCP `initialize` throughout 1.2.0 and 1.2.1.

### Note on 1.2.0
The 1.2.0 entry below claims it added ECR V2 documentation from upstream `32d57210`. That is incorrect: `32d57210` only touched the Markdoc sources under `docs/api/`, not `docs/api-md/`, which is what gets bundled — so no ECR content ever reached the package. ECR V2 is genuinely bundled for the first time in this release, from upstream `4f572b82`.

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
