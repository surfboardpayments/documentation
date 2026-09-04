# Surfboard Payments Documentation

Complete API documentation for the [Surfboard Payments](https://surfboardpayments.com) platform.

## Quick Start: MCP Server
```json
{
  "mcpServers": {
    "surfboard-docs": {
      "command": "npx",
      "args": ["@surfboardpayments/surf-mcp"]
    }
  }
}
```

Add to `.mcp.json` in your project root. See [`mcp-server/README.md`](mcp-server/README.md) for details.

## What's in this repo

| Directory | Contents |
|-----------|----------|
| `docs/api-md/` | 237 API endpoint docs across 29 sections |
| `docs/webhooks-md/` | 24 webhook event docs |
| `docs/guides/` | Integration guides |
| `docs/web-guides/` | 46 web guides synced from [surfboardpayments.com/developers/guides](https://www.surfboardpayments.com/developers/guides) |
| `scripts/` | `sync-from-local.sh` (sync from the internal docs repo + refresh web guides), `sync-web-guides.mjs` |
| `mcp-server/` | MCP server ([npm](https://www.npmjs.com/package/@surfboardpayments/surf-mcp)) |

## Updating

```bash
scripts/sync-from-local.sh /path/to/internal/documentation   # rsync docs/ + refresh web guides
cd mcp-server && npm run build                               # bundles docs/ into data/
# bump mcp-server/package.json + CHANGELOG.md, commit, push, then: npm publish
```

## Links
- [Developer Portal](https://developers.surfboardpayments.com)
- [MCP Server on npm](https://www.npmjs.com/package/@surfboardpayments/surf-mcp)
