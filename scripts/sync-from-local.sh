#!/usr/bin/env bash
# Syncs this GitHub repo from a local checkout of the internal GitLab documentation repo,
# then refreshes the web guides from surfboardpayments.com.
#
# Usage: scripts/sync-from-local.sh [/path/to/gitlab/documentation]
# Default source: ../documentation relative to this repo (or $SURFBOARD_DOCS_SRC).
#
# After running: review `git status`, bump mcp-server/package.json + CHANGELOG.md,
# `cd mcp-server && npm run build`, commit, push, and `npm publish` from mcp-server/.
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
src="${1:-${SURFBOARD_DOCS_SRC:-$here/../documentation}}"
[ -d "$src/docs/api-md" ] || { echo "No docs/api-md under $src — pass the GitLab documentation checkout as the first argument." >&2; exit 1; }

echo "Syncing docs/ from $src ..."
rsync -rc --delete \
  --exclude='.DS_Store' \
  --exclude='.conversion-metadata.json' \
  --exclude='web-guides/' \
  --exclude='*.docx' \
  --exclude='*.postman_collection.json' \
  --out-format='  %o %n' \
  "$src/docs/" "$here/docs/" | grep -v '/$' || true

upstream="$(git -C "$src" rev-parse --short HEAD 2>/dev/null || echo unknown)"
echo "Upstream GitLab commit: $upstream"

echo "Syncing web guides from surfboardpayments.com ..."
node "$here/scripts/sync-web-guides.mjs"

echo
echo "API endpoints: $(node -e "const i=require('$here/docs/api-md/api-index.json');console.log(i.apis.reduce((n,a)=>n+a.endpoints.length,0)+' endpoints across '+i.apis.length+' sections')")"
echo "Webhook events: $(ls "$here"/docs/webhooks-md/*.md | wc -l | tr -d ' ')"
echo "Web guides:     $(ls "$here"/docs/web-guides/*.md | wc -l | tr -d ' ')"
echo
echo "Done. Next: bump mcp-server version + CHANGELOG, npm run build, commit, push, npm publish."
