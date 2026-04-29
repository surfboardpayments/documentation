Fetching Payment Information by ID retrieves transaction details using a unique identifier. It helps resolve issues, verify records, and generate receipts that can be printed directly from the API response.

{% callout type="note" label="Note" %}
The key difference is that the **Check Payment Status API** gives you a payment's current state, while the **Get Payment by ID API** provides a detailed report and can even return a printable receipt in text/HTML format
{% /callout %}

### Requirements

- API credentials.
- **`paymentId`** from the [**Initiate a Payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment) .

### To fetch payment information

1. Use the `paymentId` with the [Get Payment by ID API](https://developers.surfboardpayments.com/api/payments#Get-Payment-by-ID) to retrieve the `paymentStatus` and other detailed payment information.

Here's an example
{% requestresponse method="GET" requests=[{language: "cURL", code: "\ncurl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments/:paymentId"}] /%}