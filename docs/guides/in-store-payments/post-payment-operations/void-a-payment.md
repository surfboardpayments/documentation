Voiding a payment will stop the payment process before any money is moved from the customer’s account to the merchant’s account. This helps avoid issues with incorrect transactions soon after the payment is initiated.

{% callout type="important" label="Important" %}
Voiding a payment is possible only before 23:00 UTC and cannot be done when the payment is not completed.
{% /callout %}

### Requirements

- API credentials.
- **`paymentId`** obtained from the [**Initiate a Payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment) for the transaction you want to void.

### To void a payment

1. To void a payment, you need to include the **`paymentId`** of the transaction into your request to the [**Void a payment API**](https://developers.surfboardpayments.com/api/payments#Void-a-Payment), then you can effectively cancel the payment.

Here's an example

{% requestresponse method="PUT" requests=[{language: "cURL", code: "\ncurl -X PUT \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments/:paymentId/void"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"voidStatus\": \"VOID_INITIATED\"\n\t},\n\t\"message\": \"payment void status successfully retrieved from external API\"\n}" languages=["cURL"] /%}