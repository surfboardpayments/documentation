Fetch Individual Merchant Details provides specific information about a merchant associated with the partner using [**Fetch Merchant Details API**](https://developers.surfboardpayments.com/api/merchants#Fetch-Merchant-Details). Partners can also retrieve the merchant details using Partner Portal.

**Prerequisites**

- API credentials, **`partnerId`** and **`merchantId`**

**To fetch individual merchant details,**

{% requestresponse method="POST" requests=[{language: "JSON", code: "curl -X GET \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  'YOUR_API_URL//partners/:partnerId/merchants/:merchantId'"}] languages=["JSON"] /%}