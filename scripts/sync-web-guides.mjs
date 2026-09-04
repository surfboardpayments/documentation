#!/usr/bin/env node
// Pulls the published web guides from surfboardpayments.com into docs/web-guides/.
// Source: https://www.surfboardpayments.com/api/ai/guides.json (one entry per guide, with content).
// Each guide is written as <slug>.md in the same shape the site serves at
// /api/ai/guides/<slug>.md (title, description, source, category, tags, then the body),
// and docs/web-guides/web-guides-index.json is regenerated for the MCP server.
//
// Usage: node scripts/sync-web-guides.mjs
import { mkdirSync, rmSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const SITE = "https://www.surfboardpayments.com";
const SOURCE = `${SITE}/api/ai/guides.json`;
const outDir = join(dirname(fileURLToPath(import.meta.url)), "../docs/web-guides");

const res = await fetch(SOURCE);
if (!res.ok) throw new Error(`${SOURCE} -> HTTP ${res.status}`);
const data = await res.json();
if (!Array.isArray(data.guides) || data.guides.length === 0) throw new Error("guides.json has no guides");

const before = new Set(readdirSync(outDir, { withFileTypes: true }).filter(e => e.name.endsWith(".md")).map(e => e.name.slice(0, -3)));
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const guides = [];
for (const g of data.guides) {
  const header = [
    `# ${g.title}`,
    "",
    g.description,
    "",
    `Source: ${SITE}${g.url}`,
    `Category: ${g.category}`,
    `Tags: ${(g.tags ?? []).join(", ")}`,
    "",
    "---",
  ].join("\n");
  writeFileSync(join(outDir, `${g.slug}.md`), `${header}\n${g.content.trim()}\n`);
  guides.push({ title: g.title, slug: g.slug, description: g.description, category: g.category, tags: g.tags ?? [], mdFile: `web-guides/${g.slug}.md` });
}

const index = {
  title: "Surfboard Payments Web Guides",
  description: "Developer guides from surfboardpayments.com covering payment methods, SDKs, terminal integrations, onboarding, and payment lifecycle",
  source: SOURCE,
  totalGuides: guides.length,
  lastUpdated: data.lastUpdated ?? new Date().toISOString().slice(0, 10),
  categories: data.categories ?? [...new Set(guides.map(g => g.category))],
  guides,
};
writeFileSync(join(outDir, "web-guides-index.json"), JSON.stringify(index, null, 2) + "\n");

const after = new Set(guides.map(g => g.slug));
const added = [...after].filter(s => !before.has(s));
const removed = [...before].filter(s => !after.has(s));
console.log(`web-guides: ${guides.length} guides (lastUpdated ${index.lastUpdated})`);
if (added.length) console.log(`  added:   ${added.join(", ")}`);
if (removed.length) console.log(`  removed: ${removed.join(", ")}`);
