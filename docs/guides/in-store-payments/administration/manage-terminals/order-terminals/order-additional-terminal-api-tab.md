---
title: "Order Additional Terminal Using API"
description: "Guide to ordering additional payment terminals using the API."
category: "Terminals"
path: "/guides/in-store-payments/administration//manage-terminals/order-terminals/order-additional-terminal-api-tab.md"
---

To order additional terminals using

1. **`POST`** a request to the [**Create Shipment API**](/api/logistics#Create-Shipment) with the required parameter
    - **`lineItems`**: Displays the ordered terminals with surfboard **`productId`** and **`quantity`.**
2. You will receive an **`orderId`** in the response. Save it and use it to track the status of shipped order.

> You can use the above steps in **Create Shipment API** to order additional terminals for your merchants.
> 

Here’s an example request and response for ordering terminals

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '      \n{\n\t\"shippingAddress\": {\n\t\t\"name\": \"John Doe\",\n\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\"addressLine2\": \"Building C\",\n\t\t\"addressLine3\": \"Building C\",\n\t\t\"city\": \"Stockholm\",\n\t\t\"countryCode\": \"SE\",\n\t\t\"postalCode\": \"123 45\",\n\t\t\"phone\": {\n\t\t\t\"code\": 46,\n\t\t\t\"number\": \"771890089\"\n\t\t},\n\t\t\"email\": \"developer@test.se\",\n\t\t\"deliveryInstruction\": \"XXX\"\n\t},\n\t\"lineItems\": [\n\t\t{\n\t\t\t\"productId\": \"12345\",\n\t\t\t\"quantity\": 1\n\t\t}\n\t]\n} ' \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  YOUR_API_URL/partners/:partnerId/merchants/:merchantId/shipment"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"orderId\": \"81376ad8ebedf80310\"\n\t},\n\t\"message\": \"Order for shipping terminal successfully created\"\n}" languages=["cURL"] /%}