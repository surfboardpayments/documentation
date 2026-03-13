# @surfboardpayments/surf-mcp

MCP server for the Surfboard Payments API. Gives your AI assistant direct access to our complete API docs, webhook events, and integration guides.

## Setup

Add this to `.mcp.json` in your project root:
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

## Tools

| Tool | Description |
|------|-------------|
| `search_api_docs` | Search API endpoints by keyword |
| `search_webhook_docs` | Search webhook events by keyword |
| `search_guides` | Search all guides — payment methods, SDKs, checkout flows, lifecycle, onboarding |
| `read_doc` | Read the full content of any doc file |
| `list_api_sections` | List all API sections with endpoint counts |

## Custom Docs Path
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

## Links
- [Developer Portal](https://developers.surfboardpayments.com)
- [GitHub](https://github.com/surfboardpayments/documentation)
