---
title: "Update Stores Using API"
description: "Guide to update stores through API."
category: "In-Store Payment Guides"
path: "/guides/in-store-payments/administration/manage-stores/update-stores-api-tab.md"
---

1. Send a request with `storeId` (obtained from the [**Create Store API**](/api/stores#Create-Store)) to the [**Update store API**](/api/stores#Update-Store), include the parameters you wish to update, such as
    - **`storeName`** : Store’s name
    - **`phoneNumber`**: Store’s phone number
    - **`address`** : Store’s address
    - **`city`** : Name of the city where the store is located.
    - **`zipCode`** : ZIP code of the store
    - **`country`** : Two-letter ISO country code of the merchant, in uppercase. For e.g. 'SE', 'DK'.
2. A successful update will return a confirmation message. 

Here’s a example request and response to update the store

{% requestresponse method="PUT" requests=[{language: "cURL", code: "curl -X PUT -d \\\n\t '{\n          \"storeName\": \"Trial Store\",\n          \"email\": \"TS@gmail.com\"\n \t  }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/partners/:partnerId/merchants/:merchantId/stores/:storeId"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\":{\n\t  \"merchantUrlDomainVerificationKey\": \"499470649f03b53fa1175659d4389743974710260b7f410313487e6062b3d559\",\n\t  \"paymentPageUrlDomainVerificationKey\": \"2179beab4f5e8c3960615205f042939a2ccc6c51a6e5923c9c068b3d9a645590\"\n\t},\n\t\"message\": \"Store data updated successfully\"\n}" languages=["cURL"] /%}