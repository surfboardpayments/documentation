Payment status is important for tracking whether a payment is processed, completed, or canceled. You can retrieve this information using the [**Check Payment Status API**](https://developers.surfboardpayments.com/api/payments#Check-Payment-Status).

### Prerequisites

- API credentials.
- **`paymentId`** returned from the [**Initiate a Payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment).

### To check payment status

1. Use the `paymentId` with the [Check Payment Status API](https://developers.surfboardpayments.com/api/payments#Check-Payment-Status) to get the `paymentstatus` field showing the current state of the payment.

{% callout type="note" label="Note" %}
 For real-time updates without needing to constantly check the API, you can integrate webhooks. This allows us to send you a notification as soon as the payment status changes.
{% /callout %}

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "curl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments/:paymentId/status"}] /%}