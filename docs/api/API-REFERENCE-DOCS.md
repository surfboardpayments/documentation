# API Reference Documentation — Internal Guide

This document explains how the API reference documentation system works within `/docs`, including data formats, processing scripts, output artifacts, and how the frontend consumes them.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SOURCE DATA                                  │
│  docs/api/*.json          (25 API domain files + index.json)        │
│  docs/webhooks/*.json     (webhook event files)                     │
│  docs/sidebar/sidebar.json (navigation structure)                   │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     PROCESSING SCRIPTS                              │
│  convert-api-to-markdown.js   → AI-powered JSON → Markdown         │
│  generate-api-index.js        → Master endpoint index              │
│  generate-api-search-index.mjs→ Lunr.js search index               │
│  convert-json.js              → Legacy cURL → structured JSON      │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      OUTPUT ARTIFACTS                               │
│  docs/api-md/*.md             (150+ endpoint markdown files)        │
│  docs/api-md/api-index.json   (master index)                       │
│  docs/dist/api-search.index.json  (serialized Lunr index)          │
│  docs/dist/api-search.docs.json   (search result metadata)         │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   FRONTEND CONSUMPTION                              │
│  Firebase Hosting (docs target) serves all files statically         │
│  docs/index.html    → SPA catch-all router (appends extensions)     │
│  sidebar.json       → Angular Developer Portal navigation           │
│  docs-index.json    → Resource catalog for discovery                │
│  dist/*.json        → Client-side Lunr.js search                   │
└─────────────────────────────────────────────────────────────────────┘
```

**Two Firebase hosting targets exist:**

- **`docs`** — Carbon (current API version). This is the primary target.
- **`docs-lithium`** — Lithium (older API version). Same structure but fewer APIs, no `api-md/` or search index artifacts.

---

## 2. Source Data — API JSON Files

### Location

```
docs/api/
├── index.json              # Catalog of all API domain files
├── adjustments.json        # One file per API domain
├── billing.json
├── merchants.json
├── orders.json
├── payments.json
├── ... (25 domain files total)
└── api-overview.md         # General API essentials (auth, pagination, errors)
```

### JSON Schema

Each API domain file (e.g. `adjustments.json`) follows this structure:

```json
{
    "title": "Adjustments API",
    "description": "Adjustments API takes care of handling additional amounts...",
    "endpoints": [
        {
            "fragment": "Fetch Adjustments",
            "method": "GET",
            "link": "API_URL/adjustments/:id"
        }
    ],
    "apis": [
        {
            "heading": "Fetch Adjustments",
            "type": "note",
            "pagination": true,
            "note": "HTML note about the endpoint",
            "description": "Fetch all adjustments created under a merchant or store.",
            "query": "Description of query parameter usage",
            "method": "GET",
            "path": "/adjustments/:id",
            "reqParams": [...],
            "resParams": [...],
            "examples": {
                "request": {
                    "headers": [...],
                    "body": "JSON string (for POST/PUT/PATCH)"
                },
                "response": [
                    { "code": 200, "response": "JSON string" },
                    { "code": 400, "response": "JSON string" },
                    { "code": 401, "response": "JSON string" }
                ]
            }
        }
    ]
}
```

**Key fields:**

| Field                | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `title`              | Display name for the API domain                                          |
| `description`        | Summary of the API domain                                                |
| `endpoints[]`        | Quick-reference list with `fragment` (name), `method`, and `link`        |
| `apis[]`             | Full endpoint definitions (the main content)                             |
| `apis[].heading`     | Endpoint name (used as anchor/slug)                                      |
| `apis[].method`      | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`)                    |
| `apis[].path`        | URL path pattern (e.g. `/adjustments/:id`)                               |
| `apis[].reqParams[]` | Request parameters: `{ name, type, mandatory, description }`             |
| `apis[].resParams[]` | Response parameters: `{ name, type, description, resParams[] }` (nested) |
| `apis[].examples`    | Request headers/body and response examples with HTTP status codes        |
| `apis[].pagination`  | Boolean — whether the endpoint supports page-based pagination            |
| `apis[].note`        | HTML-formatted note displayed in the UI                                  |
| `apis[].important`   | Important notice text                                                    |

### index.json

`docs/api/index.json` is a simple catalog listing all API domain files:

```json
{
    "title": "API Reference",
    "description": "Complete API reference for Surfboard Payments",
    "items": [
        {
            "title": "Adjustments API",
            "description": "API for managing payment adjustments",
            "path": "/api/adjustments.json",
            "type": "api"
        }
    ]
}
```

### api-overview.md

`docs/api/api-overview.md` documents the foundational API concepts shared across all endpoints:

- **Authentication** — Required headers: `API-KEY`, `API-SECRET`, `MERCHANT-ID`, `Content-Type`
- **Response envelope** — Standard `{ status, data, message }` structure
- **Error handling** — HTTP status codes mapped to API status values
- **Pagination** — Page-based with `X-PAGE-NUMBER` header, max 100 items/page, `x-total-items` response header
- **Go-live requirements** — Certification process for production credentials

---

## 3. Processing Scripts

All scripts live in `scripts/` and are registered as npm commands in `package.json`.

### convert-api-to-markdown.js

**Purpose:** Converts each API endpoint from JSON to a standalone Markdown file using Google Gemini AI.

|              |                                           |
| ------------ | ----------------------------------------- |
| **Input**    | `docs/api/*.json` (excludes `index.json`) |
| **Output**   | `docs/api-md/{domain}-{endpoint-slug}.md` |
| **Command**  | `npm run convert:api`                     |
| **Requires** | `GOOGLE_AI_API_KEY` environment variable  |

**How it works:**

1. Reads each API JSON file and iterates over `apis[]` entries
2. For each endpoint, sends the JSON data to Gemini with a structured prompt requesting specific Markdown sections (Overview, Prerequisites, Request, Response, Errors, Notes)
3. Writes the AI-generated Markdown to `docs/api-md/`
4. Tracks file hashes in `.conversion-metadata.json` to skip unchanged endpoints on re-runs
5. Rate-limited: 10 requests/minute, 3-second delay between requests, 3 retries on failure

**Output naming convention:** `{source-file}-{endpoint-name}.md`

- Example: `adjustments.json` → `adjustments-fetch-adjustments.md`
- Example: `billing.json` → `billing-create-billing-plans.md`, `billing-fetch-billing-plans.md`, etc.

### generate-api-index.js

**Purpose:** Generates a master index JSON mapping all API domains to their endpoints and corresponding Markdown files.

|             |                              |
| ----------- | ---------------------------- |
| **Input**   | `docs/api/*.json`            |
| **Output**  | `docs/api-md/api-index.json` |
| **Command** | `npm run generate:api-index` |

**Output structure:**

```json
{
    "title": "Surfboard Payments API Reference",
    "lastUpdated": "2026-01-20T12:30:00.000Z",
    "apis": [
        {
            "title": "Adjustments API",
            "description": "...",
            "sourceFile": "api/adjustments.json",
            "endpoints": [
                {
                    "title": "Fetch Adjustments",
                    "method": "GET",
                    "path": "/adjustments/:id",
                    "description": "...",
                    "mdFile": "api-md/adjustments-fetch-adjustments.md",
                    "hasPagination": true
                }
            ]
        }
    ]
}
```

### generate-api-search-index.mjs

**Purpose:** Builds a client-side Lunr.js search index covering both API endpoints and webhook events.

|             |                                                                      |
| ----------- | -------------------------------------------------------------------- |
| **Input**   | `docs/api/*.json` + `docs/webhooks/*.json`                           |
| **Output**  | `docs/dist/api-search.index.json` + `docs/dist/api-search.docs.json` |
| **Command** | `npm run build:api-search`                                           |

**How it works:**

1. Reads all API and webhook JSON files
2. For each endpoint, builds a searchable document with: `id`, `type`, `apiTitle`, `description`, `method`, `endpoint`, `tags` (deduplicated tokens from titles, descriptions, parameter names, path segments)
3. Builds a Lunr.js index with field boosts: `apiTitle` (10x), `description` (5x), `fileTitle` (3x), `endpoint` (3x), `method` (2x)
4. Writes the serialized index and the metadata docs array to `docs/dist/`

### convert-json.js (legacy utility)

**Purpose:** One-off utility to convert old-format API examples (raw cURL strings) into the current structured JSON format (headers array + body + response codes).

|             |                                               |
| ----------- | --------------------------------------------- |
| **Input**   | Single API JSON file (passed as CLI argument) |
| **Output**  | Same file (in-place modification)             |
| **Command** | `node convert-json.js <file-path>`            |

This was used during the migration from the old documentation format and is generally not needed for day-to-day work.

### convert:all (composite command)

**Purpose:** Runs the full conversion pipeline in sequence.

|             |                       |
| ----------- | --------------------- |
| **Command** | `npm run convert:all` |

**Executes:**

1. `npm run convert:api` — JSON → Markdown conversion
2. `npm run generate:api-index` — Rebuild API index
3. `npm run convert:webhooks` — Webhook JSON → Markdown
4. `npm run generate:webhooks-index` — Rebuild webhooks index

> **Note:** `build:api-search` is NOT included in `convert:all` — run it separately.

---

## 4. Output Artifacts

| Artifact                | Path                                    | Description                                                                         |
| ----------------------- | --------------------------------------- | ----------------------------------------------------------------------------------- |
| Endpoint Markdown files | `docs/api-md/*.md`                      | 150+ individual files, one per API endpoint. AI-generated with structured sections. |
| API index               | `docs/api-md/api-index.json`            | Master index mapping domains → endpoints → markdown file paths.                     |
| Search index            | `docs/dist/api-search.index.json`       | Serialized Lunr.js index for browser-side full-text search.                         |
| Search docs             | `docs/dist/api-search.docs.json`        | Metadata array for resolving search result IDs to human-readable info.              |
| Conversion metadata     | `docs/api-md/.conversion-metadata.json` | Hash tracking for incremental re-generation (not served to frontend).               |

---

## 5. Frontend Consumption

### Firebase Hosting

Configured in `firebase.json` with the `docs` hosting target:

- **Public directory:** `docs/`
- **Custom headers:**
    - `*.json` → `Content-Type: application/json`, `Cache-Control: no-cache`
    - `*.md` → `Content-Type: text/markdown`, `Cache-Control: public, max-age=3600`
    - Images → `Cache-Control: public, max-age=31536000`
    - All files → `Access-Control-Allow-Origin: *`
- **Catch-all rewrite:** All unmatched routes → `/index.html`
- **Clean URLs:** Enabled (no `.html` extensions needed)

### docs/index.html — SPA Router

The `index.html` file acts as a lightweight client-side router. When a request hits the catch-all rewrite, it:

1. Reads `window.location.pathname`
2. Maps path prefixes to file extensions:
    - `/api/` → `.json`
    - `/docs/` → `.md`
    - `/guides/` → `.md`
    - `/webhooks/` → `.json`
    - `/changelogs/` → `.json`
    - `/sidebar/` → `.json`
    - `/images/` → `.png`
3. If the URL doesn't already end with the correct extension, redirects to `path + extension`

This means a request to `/api/orders` gets redirected to `/api/orders.json`, which Firebase then serves directly as the JSON file.

### sidebar.json — Navigation Structure

`docs/sidebar/sidebar.json` drives the sidebar navigation in the Angular Developer Portal. It contains a **manually maintained** list of API sections and endpoints that maps directly to the files in `docs/api/`.

```json
{
    "/api": {
        "title": "API Reference",
        "sections": [
            {
                "heading": "Orders",
                "route": "/api/orders",
                "links": [
                    {
                        "label": "Create Order",
                        "route": "/api/orders",
                        "method": "POST"
                    }
                ]
            }
        ]
    }
}
```

The Angular app fetches `sidebar.json`, renders the navigation tree, and uses the `route` values to fetch the corresponding JSON files from `docs/api/`.

> **⚠️ Important: sidebar.json ↔ docs/api/ must be kept in sync manually.**
>
> The sidebar is **not auto-generated** from the API JSON files. Each `sections[]` entry in the sidebar corresponds to a file in `docs/api/` (e.g. `"route": "/api/orders"` → `docs/api/orders.json`), and each `links[]` entry corresponds to an endpoint inside that file's `apis[]` array.
>
> This means:
>
> - **Adding a new API domain file** (e.g. `docs/api/loyalty.json`) requires manually adding a new section to `sidebar.json` under the `/api` key.
> - **Adding a new endpoint** to an existing API file (e.g. a new entry in `orders.json → apis[]`) requires manually adding a corresponding `links[]` entry in the matching sidebar section.
> - **Removing an endpoint or API domain** from `docs/api/` requires removing the corresponding entry from `sidebar.json` as well, otherwise the sidebar will link to a non-existent resource.
> - **Renaming an endpoint heading** in the API JSON does not automatically update the sidebar `label` — both must be changed.

### docs-index.json — Resource Catalog

`docs/docs-index.json` is a rich metadata catalog of all documentation resources. Each entry includes:

- `id`, `type` (`api`, `guide`, `doc`, `webhook`)
- `path` (to the source file)
- `title`, `description`
- `topics[]` (tags for categorization)
- `related[]` (cross-references to other resources)
- `importance` (1–5 score for ranking)
- `endpoints[]` (for API types)
- `lastUpdated`

This is used by the frontend for resource discovery, recommendations, and filtering.

### Client-Side Search

The Angular Developer Portal implements search by:

1. Downloading `docs/dist/api-search.index.json` and `docs/dist/api-search.docs.json`
2. Loading the Lunr index with `lunr.Index.load(JSON.parse(...))`
3. Searching against the index and resolving result IDs using the docs array
4. Results include: `apiTitle`, `description`, `method`, `endpoint`, `path`, `fragment` (for anchor linking)

---

## 6. Carbon vs Lithium

|                     | Carbon (`docs/`)                                                         | Lithium (`docs-lithium/`)                                      |
| ------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Status**          | Current API version                                                      | Older/legacy API version                                       |
| **Firebase target** | `docs`                                                                   | `docs-lithium`                                                 |
| **API files**       | `docs/api/` (25 domains + extras like `ai.json`, `admin-functions.json`) | `docs-lithium/api/` (20 domains, includes `transactions.json`) |
| **Markdown output** | `docs/api-md/` (150+ files)                                              | Not generated                                                  |
| **Search index**    | `docs/dist/`                                                             | Not generated                                                  |
| **Guides**          | `docs/guides/`, `docs/carbon/`                                           | `docs-lithium/guides/`                                         |
| **SPA router**      | `docs/index.html` (identical logic)                                      | `docs-lithium/index.html` (identical logic)                    |
| **Sidebar**         | `docs/sidebar/sidebar.json`                                              | `docs-lithium/sidebar/sidebar.json`                            |

Both targets share the same Firebase config pattern (headers, rewrites, redirects) and the same `index.html` SPA routing logic.

---

## 7. Adding or Updating API Documentation

### Editing API Examples (Request Body, Headers, Responses)

Each endpoint's `examples` block in the API JSON file controls what the frontend displays as sample request/response. The structure has two parts: `request` and `response`.

**Request examples:**

```json
"examples": {
    "request": {
        "headers": [
            { "name": "Content-Type", "value": "application/json" },
            { "name": "API-KEY", "value": "YOUR_API_KEY" },
            { "name": "API-SECRET", "value": "YOUR_API_SECRET" },
            { "name": "MERCHANT-ID", "value": "YOUR_MERCHANT_ID" }
        ],
        "body": "{\"orderId\":\"838ca7fc6d7de9770b\",\"paymentMethod\":\"CARD\"}"
    }
}
```

- **`headers[]`** — Array of `{ name, value }` objects. These are the standard auth headers. Modify only if the endpoint requires different headers (e.g. omitting `MERCHANT-ID`).
- **`body`** — A **stringified JSON** value (not a raw object). This is only present for `POST`, `PUT`, and `PATCH` endpoints. `GET` and `DELETE` endpoints typically have no body.

> **⚠️ The body must be a valid JSON string escaped inside a JSON string.** Use `\"` for inner quotes. For example:
>
> ```
> "body": "{\"orderId\":\"abc123\",\"amount\":1000}"
> ```
>
> If you need to format it for readability while editing, you can use `JSON.stringify(yourObject)` in a Node REPL to produce the correct escaped string.

**Response examples:**

```json
"response": [
    {
        "code": 201,
        "response": "{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"paymentId\": \"p_abc123\"\n\t},\n\t\"message\": \"Payment initiated\"\n}"
    },
    {
        "code": 400,
        "response": "{\n\t\"status\": \"ERROR\",\n\t\"message\": \"Invalid order ID\"\n}"
    },
    {
        "code": 401,
        "response": "{\n\t\"status\": \"ERROR\",\n\t\"message\": \"Authentication failed\"\n}"
    }
]
```

- **`response[]`** — Array of `{ code, response }` objects, one per HTTP status code.
- **`code`** — The HTTP status code (e.g. `200`, `201`, `400`, `401`, `404`).
- **`response`** — A **stringified JSON** value. Use `\n` and `\t` for formatting (newlines and tabs) so the frontend can display it with proper indentation.

> **ℹ️ How code examples are rendered on the frontend:**
>
> The Angular Developer Portal does **not** display the raw `body` string as-is. Instead, a script on the frontend generates the full code examples (e.g. cURL snippets, language-specific samples) by combining the `headers[]` and `body` from the JSON. The `body` value from the API JSON is injected into these generated examples.
>
> This means:
>
> - **To change the request body** shown in examples → edit `examples.request.body` in the API JSON file (this repo).
> - **To change anything else** in the rendered code examples (e.g. the cURL structure, language templates, formatting around the body) → those changes must be made **on the Angular frontend**, not in this documentation repo.

**To edit an existing example:**

1. Open the API JSON file in `docs/api/` (e.g. `payments.json`)
2. Find the endpoint in the `apis[]` array by its `heading`
3. Modify the `examples.request.body` or `examples.response[].response` strings
4. Ensure the stringified JSON is valid — test with `JSON.parse()` if unsure
5. Run `npm run convert:all` to regenerate the Markdown files (the AI conversion will pick up the changed example)

**To add a new error response:**

Add a new object to the `examples.response[]` array:

```json
{ "code": 409, "response": "{\n\t\"status\": \"ERROR\",\n\t\"message\": \"Payment already exists for this order\"\n}" }
```

### Adding a new endpoint to an existing API domain

1. Edit the relevant JSON file in `docs/api/` (e.g. `payments.json`)
2. Add a new entry to the `apis[]` array following the schema above
3. Optionally add a quick-reference entry to `endpoints[]`

### Adding a new API domain

1. Create a new JSON file in `docs/api/` (e.g. `loyalty.json`)
2. Follow the schema: `title`, `description`, `endpoints[]`, `apis[]`
3. Add an entry to `docs/api/index.json`

### Regenerating all artifacts

```bash
# Set API key (needed for AI-powered conversion)
export GOOGLE_AI_API_KEY=your_key_here

# Run full conversion pipeline (JSON → Markdown + indexes)
npm run convert:all

# Rebuild search index (not included in convert:all)
npm run build:api-search

```

### Testing locally

```bash
npm run emulate
# Opens Firebase emulator at http://localhost:4000
```

### Key things to know

- **Incremental conversion:** `convert-api-to-markdown.js` tracks MD5 hashes of endpoint data in `.conversion-metadata.json`. Unchanged endpoints are skipped on re-runs.
- **Rate limits:** The Gemini AI conversion is rate-limited (10 req/min, 3s delay). A full run of ~150 endpoints takes ~25 minutes.
- **The `convert:all` command does NOT rebuild the search index.** Always run `npm run build:api-search` separately after conversion.
- **Sidebar must be updated manually.** Adding a new API domain requires a corresponding entry in `docs/sidebar/sidebar.json` for it to appear in the Developer Portal navigation.
- **`docs-index.json` must be updated manually.** Add a new resource entry with appropriate `topics`, `related`, and `importance` values.
