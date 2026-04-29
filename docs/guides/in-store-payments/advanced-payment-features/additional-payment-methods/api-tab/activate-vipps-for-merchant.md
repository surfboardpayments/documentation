To activate VIPPS as a payment method for the merchant.

Here is an example call,

{% requestresponse method="GET" requests=[{language: "cURL", code: "\ncurl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL//merchants/:merchantId/payment-methods/vipps"}] /%}