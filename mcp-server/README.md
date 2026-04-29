# @surfboardpayments/surf-mcp

MCP server for the [Surfboard Payments](https://surfboardpayments.com) API. Gives your AI assistant direct, searchable access to the complete API reference, webhook event catalog, integration guides, and web guides — so it can answer questions and write integration code without you having to paste docs into the chat.

## What you can ask your AI

Once installed, your assistant has tools to look up payments docs on demand. Examples:

- *"How do I create a recurring payment with Surfboard?"*
- *"Show me the request body for the create-order endpoint."*
- *"Which webhook fires when a payment is captured? What's the payload?"*
- *"Walk me through onboarding a new merchant via the API."*
- *"What's the difference between client-auth-tokens and the server-to-server API?"*

The model uses `search_api_docs`, `search_webhook_docs`, `search_guides`, and `read_doc` to find and read the relevant docs, then answers grounded in the actual specification.

## Install

### Claude Code / Claude Desktop

Add to `.mcp.json` in your project root (Claude Code) or to the MCP config in Claude Desktop:

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

### Cursor

Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per-project):

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

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

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

### Any other MCP-compatible client

The server is a standard stdio MCP server. Point your client at:

```
npx @surfboardpayments/surf-mcp
```

After installing, restart your AI client so it picks up the new server.

## Tools

| Tool | Description |
|------|-------------|
| `search_api_docs` | Search API endpoints by keyword |
| `search_webhook_docs` | Search webhook events by keyword |
| `search_guides` | Search all guides — payment methods, SDKs, checkout flows, lifecycle, onboarding |
| `read_doc` | Read the full content of any doc file |
| `list_api_sections` | List all API sections with endpoint counts |

## What's bundled

| Content | Coverage |
|---------|----------|
| API endpoints | 130+ endpoints across orders, payments, terminals, merchants, stores, webhooks, branding, billing, gift cards, product catalog, NFC, AI tools |
| Webhook events | 20+ events covering merchant lifecycle, order status, payment status, terminal events |
| Integration guides | In-store payments, online payments, SDK setup (Android/iOS), checkout flows, terminal handling, post-payment ops |
| Web guides | 30+ task-oriented walkthroughs (recurring payments, partial captures, refunds, gift cards, onboarding, etc.) |

The bundle is a snapshot of the latest published documentation at the version you install. Updating to a newer package version pulls in newer docs.

## Custom docs path

If you want to point the server at a local checkout of the docs repo (e.g., to test changes before they're published), set `SURFBOARD_DOCS_PATH`:

```json
{
  "mcpServers": {
    "surfboard-docs": {
      "command": "npx",
      "args": ["@surfboardpayments/surf-mcp"],
      "env": { "SURFBOARD_DOCS_PATH": "/path/to/your/docs" }
    }
  }
}
```

## Versioning

Follows [SemVer](https://semver.org/). See [CHANGELOG.md](./CHANGELOG.md) for what changed in each release. Doc-only updates from upstream are patch releases; new MCP tools or doc categories are minor; breaking tool-API changes are major.

## Troubleshooting

- **Tools don't appear in the AI client.** Restart the client after editing the MCP config. Verify the JSON parses (no trailing commas).
- **`npx` is slow on first run.** It downloads the package the first time; subsequent runs are cached.
- **The docs feel out of date.** Bump the package: `npm i -g @surfboardpayments/surf-mcp@latest`, or just re-run `npx` (it pulls latest by default).
- **Want to file an issue?** Open one at the [GitHub repo](https://github.com/surfboardpayments/documentation/issues).

## Links

- [Developer Portal](https://developers.surfboardpayments.com)
- [GitHub repo](https://github.com/surfboardpayments/documentation)
- [Surfboard Payments](https://surfboardpayments.com)
