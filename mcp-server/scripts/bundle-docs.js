import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");
const dataDir = join(__dirname, "../data");
// Wipe the destination first — otherwise docs deleted upstream linger in data/
// across rebuilds and ship in the published tarball.
function copyDir(src, dest) {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const s = join(src, entry.name), d = join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else writeFileSync(d, readFileSync(s));
  }
}
console.log("Bundling docs into data/ ...");
copyDir(join(repoRoot, "docs/api-md"), join(dataDir, "api-md"));
copyDir(join(repoRoot, "docs/webhooks-md"), join(dataDir, "webhooks-md"));
copyDir(join(repoRoot, "docs/guides"), join(dataDir, "guides"));
copyDir(join(repoRoot, "docs/web-guides"), join(dataDir, "web-guides"));
writeFileSync(join(dataDir, "llms.txt"), readFileSync(join(repoRoot, "docs/llms.txt")));
console.log("Done.");
