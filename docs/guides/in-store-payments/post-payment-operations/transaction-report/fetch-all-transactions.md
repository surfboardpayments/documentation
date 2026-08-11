Using the Fetch All Transactions API, you can retrieve a complete list of transactions processed by a specific merchant.

### To fetch information about all transactions

1. Make a **`GET`** request to [**Fetch All Transactions API**](https://developers.surfboardpayments.com/api/transactions#Fetch-All-Transactions) endpoint to view the transactions you need to check.

> You can filter results by specific date range using the startDate and endDate parameters. If no query parameters are specified, transactions will be returned from latest to oldest.

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "curl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/transactions"}] /%}