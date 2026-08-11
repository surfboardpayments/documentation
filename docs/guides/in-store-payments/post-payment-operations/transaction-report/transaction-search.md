This method enables a free-text search on transaction data, allowing you to find specific transactions based on a keyword using [**Transaction Search API**](https://developers.surfboardpayments.com/api/transactions#Transaction-Search)

### Prerequisites

- API credentials.
- You must include the mandatory query param as a string in the request.

### To Fetch Transactions by Search

1. Make a **`POST`** request to the Transaction Search API with the search query you're looking for.

Here’s an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "curl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/transactions/search?query=8208822"}] /%}