## Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.
- **`merchantId`** obtained via [**Create Merchant API**](https://developers.surfboardpayments.com/api/merchants#Create-Merchant).

To do so,

1. Send a `PUT` request to the **Update Store API**, providing the `storeId` and the updated details in the request body

{% requestresponse method="PUT" requests=[{language: "JSON", code: ""curl -X PUT \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  'YOUR_API_URL//partners/:partnerId/merchants/:merchantId/stores/:storeId'"}] languages=["JSON"] /%}