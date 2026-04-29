#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { z } from "zod";

function resolveDocsRoot(): string {
  if (process.env.SURFBOARD_DOCS_PATH) return resolve(process.env.SURFBOARD_DOCS_PATH);
  const bundled = resolve(join(import.meta.dirname, "../data"));
  if (existsSync(bundled)) return bundled;
  return resolve(join(import.meta.dirname, "../../docs"));
}
const DOCS_ROOT = resolveDocsRoot();

interface ApiEndpoint { title: string; method: string; path: string; description: string; mdFile: string; }
interface ApiSection { title: string; description: string; sourceFile: string; endpoints: ApiEndpoint[]; }
interface ApiIndex { title: string; description: string; apis: ApiSection[]; }
interface WebhookEvent { title: string; description: string; mdFile: string; }
interface WebhookSection { title: string; description: string; sourceFile: string; events: WebhookEvent[]; }
interface WebhooksIndex { title: string; description: string; webhooks: WebhookSection[]; }
interface WebGuide { title: string; slug: string; description: string; category: string; tags: string[]; mdFile: string; }
interface WebGuidesIndex { title: string; description: string; totalGuides: number; categories: string[]; guides: WebGuide[]; }

function loadJson<T>(p: string): T { return JSON.parse(readFileSync(p, "utf-8")) as T; }
const apiIndex = loadJson<ApiIndex>(join(DOCS_ROOT, "api-md/api-index.json"));
const webhooksIndex = loadJson<WebhooksIndex>(join(DOCS_ROOT, "webhooks-md/webhooks-index.json"));
const webGuidesPath = join(DOCS_ROOT, "web-guides/web-guides-index.json");
const webGuidesIndex = existsSync(webGuidesPath) ? loadJson<WebGuidesIndex>(webGuidesPath) : null;

function searchEndpoints(query: string) {
  const q = query.toLowerCase();
  const results: Array<ApiEndpoint & { section: string }> = [];
  for (const s of apiIndex.apis) for (const ep of s.endpoints)
    if ([ep.title, ep.description, ep.path, ep.method, s.title].some(f => f.toLowerCase().includes(q)))
      results.push({ ...ep, section: s.title });
  return results;
}
function searchWebhooks(query: string) {
  const q = query.toLowerCase();
  const results: Array<WebhookEvent & { section: string }> = [];
  for (const s of webhooksIndex.webhooks) for (const ev of s.events)
    if ([ev.title, ev.description, s.title].some(f => f.toLowerCase().includes(q)))
      results.push({ ...ev, section: s.title });
  return results;
}
function collectGuideFiles(dir: string, prefix = ""): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...collectGuideFiles(join(dir, entry.name), rel));
    else if (entry.name.endsWith(".md") || entry.name.endsWith(".json")) files.push(rel);
  }
  return files;
}
function searchWebGuides(query: string): WebGuide[] {
  if (!webGuidesIndex) return [];
  const q = query.toLowerCase();
  return webGuidesIndex.guides.filter(g =>
    [g.title, g.description, g.category, ...g.tags].some(f => f.toLowerCase().includes(q))
  );
}

function readDoc(filePath: string): string {
  const full = resolve(join(DOCS_ROOT, filePath));
  if (!full.startsWith(DOCS_ROOT)) return "Error: path outside docs root";
  if (!existsSync(full)) return `Error: file not found — ${filePath}`;
  return readFileSync(full, "utf-8");
}

const server = new McpServer({ name: "surfboard-docs", version: "1.1.0" });

server.tool("search_api_docs", "Search Surfboard Payments API endpoints by keyword",
  { query: z.string().describe("Keyword to search") }, async ({ query }) => {
    const r = searchEndpoints(query);
    if (!r.length) return { content: [{ type: "text", text: `No API endpoints found for "${query}"` }] };
    return { content: [{ type: "text", text: r.map(e => `[${e.section}] ${e.method} ${e.path}\n  ${e.title}: ${e.description}\n  File: ${e.mdFile}`).join("\n\n") }] };
  });
server.tool("search_webhook_docs", "Search Surfboard Payments webhook events by keyword",
  { query: z.string().describe("Keyword to search") }, async ({ query }) => {
    const r = searchWebhooks(query);
    if (!r.length) return { content: [{ type: "text", text: `No webhook events found for "${query}"` }] };
    return { content: [{ type: "text", text: r.map(e => `[${e.section}] ${e.title}\n  ${e.description}\n  File: ${e.mdFile}`).join("\n\n") }] };
  });
server.tool("search_guides", "Search Surfboard Payments integration and developer guides — covers payment methods, SDKs (iOS SoftPOS, Android SoftPOS), terminal integrations, payment lifecycle, checkout flows, onboarding, receipts, tips, gift cards, settlements, and more",
  { query: z.string().optional().describe("Keyword to search, e.g. 'payment methods', 'softpos', 'receipts', 'swish', 'onboarding'") }, async ({ query }) => {
    const parts: string[] = [];

    // Search file-based guides
    const files = collectGuideFiles(join(DOCS_ROOT, "guides"));
    const filteredFiles = query ? files.filter(f => f.toLowerCase().includes(query.toLowerCase())) : files;
    if (filteredFiles.length) {
      parts.push("## Integration Guides\n" + filteredFiles.map(f => `guides/${f}`).join("\n"));
    }

    // Search web guides (indexed with title, description, tags)
    const webResults = query ? searchWebGuides(query) : (webGuidesIndex?.guides ?? []);
    if (webResults.length) {
      parts.push("## Developer Guides\n" + webResults.map(g =>
        `[${g.category}] ${g.title}\n  ${g.description}\n  Tags: ${g.tags.join(", ")}\n  File: ${g.mdFile}`
      ).join("\n\n"));
    }

    if (!parts.length) return { content: [{ type: "text", text: `No guides found for "${query ?? ""}"` }] };
    return { content: [{ type: "text", text: parts.join("\n\n") }] };
  });
server.tool("read_doc", "Read the full content of a Surfboard Payments documentation file",
  { path: z.string().describe("Relative path, e.g. api-md/orders-create-order.md") }, async ({ path }) => {
    return { content: [{ type: "text", text: readDoc(path) }] };
  });
server.tool("list_api_sections", "List all Surfboard Payments API sections with endpoint counts",
  {}, async () => {
    return { content: [{ type: "text", text: apiIndex.apis.map(s => `${s.title} (${s.endpoints.length} endpoints)\n  ${s.description}`).join("\n\n") }] };
  });
server.resource("llms-txt", "surfboard://llms.txt", async (uri) => {
  const p = join(DOCS_ROOT, "llms.txt");
  const content = existsSync(p) ? readFileSync(p, "utf-8") : "llms.txt not found";
  return { contents: [{ uri: uri.href, text: content, mimeType: "text/plain" }] };
});

async function main() { await server.connect(new StdioServerTransport()); }
main().catch(err => { console.error("Fatal:", err); process.exit(1); });
