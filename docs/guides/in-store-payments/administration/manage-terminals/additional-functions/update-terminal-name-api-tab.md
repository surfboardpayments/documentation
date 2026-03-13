---
title: "Manage Update Terminal Name using API"
description: "Guide to managing and configuring update terminal name using API."
category: "Terminals"
path: "/guides/in-store-payments/administration/manage-terminals/additional-functions/update-terminal-name-api-tab.md"
---

1. Send a **`PUT`** request with the required parameter **`terminalId`** to [**Update terminal name API**](/api/terminals#Update-Terminal-Name).
2. You will receive a response with a confirmation message that terminal name has been updated.

{% requestresponse method="PUT" requests=[{language: "cURL", code: "curl -X PUT -d '{\n          \"terminalName\": \"New Terminal\"\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/terminals/:terminalId"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"message\": \"Terminal name updated successfully\"\n}" /%}
