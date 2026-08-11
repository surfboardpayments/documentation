## Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.
- **`merchantId`** obtained via [**Create Merchant API**](https://developers.surfboardpayments.com/api/merchants#Create-Merchant).

To do so,

Create a `GET` request to the Fetch Stores API

{% requestresponse method="POST" requests=[{language: "JSON", code: "curl -X GET \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  'YOUR_API_URL//partners/:partnerId/merchants/:merchantId/stores'"}] languages=["JSON"] /%}