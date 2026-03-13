You can use the [**Fetch Transactions by ID API**](https://developers.surfboardpayments.com/api/transactions#Fetch-Transactions) to retrieve a list of all transactions associated with an order ID, transaction ID, or payment ID. This is useful in cases where a single order was paid through multiple [**partial payments**](https://developers.surfboardpayments.com/docs/partial-payments).

### Prerequisites

- API credentials.
- **`paymentId`** , **`transactionId`** or **`orderId`** of the transaction you want to fetch details for.

### To fetch transactions by ID

1. Make a request to the [**Fetch Transactions by ID**](https://developers.surfboardpayments.com/api/transactions#Fetch-Transactions) endpoint using any of the IDs (specified in requirements) to retrieve the transaction details you need.

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "curl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/transactions/{{id}}/list"}] /%}