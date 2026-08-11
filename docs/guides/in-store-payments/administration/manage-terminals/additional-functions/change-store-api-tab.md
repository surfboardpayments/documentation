---
title: "Manage Change Stores of Terminals using API"
description: "Guide to managing and configuring change store of terminals using API."
category: "Terminals"
path: "/guides/in-store-payments/administration/manage-terminals/additional-functions/change-store-api-tab.md"
---

1. Send a **`POST`** request to the [**Change Store API**](/api/terminals#Change-Store) with the required parameters **`terminalId`** (**terminal from Store A**) and **`storeId`** (**Store B**, where the terminal will be registered) to reassign the terminal under the same merchant.
2. You will receive a response with success message confirming that the terminal's store has been changed under the same merchant.

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n\t        \"terminal$id\":\"814aae4268e6700704\",\n\t        \"storeId\":\"81d64e7174dcb00b0f\"\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/terminals/change"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"message\": \"Store successfully changed for the terminal\"\n}" /%}

{% callout type="note" label="Note" %}
In cases where multiple merchants are sharing the same store location or the same checkout area, you can use the [**Multi-Merchant Terminal**](/guides/in-store-payments/administration/setup-multi-merchant-terminals) feature. This feature allows several merchants to process payments on a single terminal.
{% /callout %}