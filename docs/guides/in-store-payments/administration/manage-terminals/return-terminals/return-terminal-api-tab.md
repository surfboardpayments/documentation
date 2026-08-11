---
title: "Returning Malfunction/Defective Terminal Using API"
description: "Guide to returning payment terminals using the API."
category: "Terminals"
path: "/guides/in-store-payments/administration//manage-terminals/return-terminals/return-terminal-api-tab.md"
---

Terminals can be returned using [**Create Return Request API**](api/logistics#Create-Return-Request). To do so,

1. Send a **`POST`** request with required parameters
    - **`terminalId`** : Id of the return terminal (this id received after terminal get registered)
    - **`name`**: Merchant’s name.
    - **`email`**: Merchant's email address.
    - **`phoneNumber`**: Merchant’s contact number.
    - **`address`**: The location from which the package should be picked up.
    - **`deliveryInstruction`**: Any specific instructions for the package pickup.
    - **`comment`**: Additional remarks or information related to the return.
    - **`reasonForReturn`**: The reason for returning the terminal (e.g., defective, malfunctioning, etc.).
2. You will receive a **`returnId`** confirming the request has been created.

Here’s request and response for returning terminals.

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '      \n{\n    \"email\": \"an@surfboard.se\",\n    \"phoneNumber\": {\n\t\t\t\"code\": 91,\n\t\t\t\"number\":\"00000000\"\n\t\t},\n\t  \"terminalId\":\"816a0ff6bc0fb00404\",\n\t\t\"name\": \"John Doe\",\n\t\t\"address\": {\n\t\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\t\"addressLine2\": \"Building C\",\n\t\t\t\"addressLine3\": null,\n\t\t\t\"city\": \"Stockholm\",\n\t\t\t\"countryCode\": \"SE\",\n\t\t\t\"postalCode\": \"123 45\"\n\t\t},\n    \"deliveryInstruction\": \"Go left after the elevator\",\n    \"comment\": \"Stopped\",\n    \"reasonForReturn\": \"NOT_USING_SERVICE\"\n} ' \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  YOUR_API_URL/partners/:partnerId/merchants/:merchantId/logistics/return"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"returnId\": 19\n\t},\n\t\"message\": \"Return request created successfully\"\n}" languages=["cURL"] /%}