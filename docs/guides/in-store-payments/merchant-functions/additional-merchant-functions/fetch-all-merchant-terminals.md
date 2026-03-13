Partners who need to fetch the details of merchant terminals can use the [**Fetch All Merchant Terminals API**](https://developers.surfboardpayments.com/api/merchants#Fetch-All-Merchant-Terminals) .

**Prerequisites**

API credentials.

**To fetch the details of the merchants terminals**,

{% requestresponse method="POST" requests=[{language: "JSON", code: "curl -X GET \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  'YOUR_API_URL//partners/:partnerId/merchants/:merchantId/terminals'"}] languages=["JSON"] /%}