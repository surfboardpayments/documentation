You can cancel a payment for an order if necessary, but only before the payment transfer is completed. Once the payment has been completed, you cannot cancel it directly, instead you will need to void the payment.

### Requirements

- API credentials.
- **`paymentId`** from the [**Initiate a Payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment).

### To cancel payments

1. Make a `Delete` request to the [**Cancel a Payment API**](https://developers.surfboardpayments.com/api/payments#Cancel-a-Payment) endpoint using the **`paymentId`** obtained from the [**Initiate a Payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment).

Here's an example

{% requestresponse method="DELETE" requests=[{language: "cURL", code: "curl -X DELETE \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments/:paymentId"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"paymentStatus\": \"PAYMENT_CANCELLED\"\n\t},\n\t\"message\": \"Payment cancelled successfully.\"\n}" languages=["cURL"] /%}