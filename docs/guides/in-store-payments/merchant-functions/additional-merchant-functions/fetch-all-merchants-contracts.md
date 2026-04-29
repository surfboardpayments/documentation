This feature allows you to retrieve the complete list of contracts established between a partner and its merchants. It provides visibility into the agreements in place, ensuring you can reference and manage contract details as needed.

**Prerequisites**

- API credentials and **`merchantId`** .

**To fetch details of merchants contracts**,

{% requestresponse method="POST" requests=[{language: "JSON", code: "curl -X GET \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n  'YOUR_API_URL//merchants/:merchantId/contracts'"}] languages=["JSON"] /%}