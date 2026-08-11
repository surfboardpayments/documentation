# Surfboard Payments Documentation

## Overview
This repo contains the complete API documentation for the Surfboard Payments platform — a certified, API-centric payments platform for software companies.

## Repo Structure
- `docs/api-md/` — Individual markdown files for each API endpoint
- `docs/api-md/api-index.json` — Full index of all API endpoints grouped by category
- `docs/webhooks-md/` — Individual markdown files for each webhook event
- `docs/webhooks-md/webhooks-index.json` — Full index of all webhook events grouped by category
- `docs/guides/` — Integration guides (in-store payments, online payments)
- `docs/llms.txt` — LLM-friendly overview of all documentation
- `mcp-server/` — MCP server npm package (`@surfboardpayments/surf-mcp`)

## API Authentication
All API requests require `API-KEY` and `API-SECRET` headers. Client-side tokens use Bearer authorization.

## Environments
- **Demo**: `https://api-demo.surfboardpayments.com`
- **Live**: `https://api.surfboardpayments.com`

## MCP Server
The `mcp-server/` directory contains a Node.js MCP server published as `@surfboardpayments/surf-mcp` on npm.
