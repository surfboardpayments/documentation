Tracking the order status is crucial for ensuring smooth payment processing and addressing any errors or issues that could impact the payment completion.

### Prerequisites

- **`orderId`** of the created order.

### To fetch order status

1. To check the order status, include the **`orderId`** in the Fetch Order Status API request. The response will provide the **`orderStatus`** along with any associated payment IDs.

> There will be array of payment IDs present in the response if the status is PAYMENT_COMPLETED.

Here is an example call,

{% requestresponse method="GET" requests=[{language: "cURL", code: "\ncurl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/orders/:orderId/status"}] response="\n{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"orderStatus\": \"PAYMENT_COMPLETED\",\n\t\t\"paymentIds\": [\n\t\t\t\"834b70c6ca0f200a06\",\n\t\t\t\"834b70cf4a0f200e06\"\n\t\t],\n\t\t\"transactionDetails\": [\n\t\t\t{\n\t\t\t\t\"transactionId\": \"834b70c6ca0f201419\",\n\t\t\t\t\"terminalId\": \"834abd984476700304\",\n\t\t\t\t\"rrn\": \"518412000070\",\n\t\t\t\t\"amount\": \"110\",\n\t\t\t\t\"currency\": \"752\",\n\t\t\t\t\"method\": \"CARD\",\n\t\t\t\t\"truncatedPan\": \"0010\",\n\t\t\t\t\"posEntryMode\": \"07\",\n\t\t\t\t\"aid\": \"a0000000031010\",\n\t\t\t\t\"customerResponseCode\": \"00\",\n\t\t\t\t\"cvmMethod\": \"1f\",\n\t\t\t\t\"authMode\": \"ISSUER\",\n\t\t\t\t\"cardBrand\": \"VISA\",\n\t\t\t\t\"terminalVerificationResult\": \"0000000000\",\n\t\t\t\t\"cvmMethodDescription\": \"No CVM\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"transactionId\": \"834b70cf4a0f201919\",\n\t\t\t\t\"terminalId\": \"834abd984476700304\",\n\t\t\t\t\"rrn\": \"518412000071\",\n\t\t\t\t\"amount\": \"100\",\n\t\t\t\t\"currency\": \"752\",\n\t\t\t\t\"method\": \"CARD\",\n\t\t\t\t\"truncatedPan\": \"0010\",\n\t\t\t\t\"posEntryMode\": \"07\",\n\t\t\t\t\"aid\": \"a0000000031010\",\n\t\t\t\t\"customerResponseCode\": \"00\",\n\t\t\t\t\"cvmMethod\": \"1f\",\n\t\t\t\t\"authMode\": \"ISSUER\",\n\t\t\t\t\"cardBrand\": \"VISA\",\n\t\t\t\t\"terminalVerificationResult\": \"0000000000\",\n\t\t\t\t\"cvmMethodDescription\": \"No CVM\"\n\t\t\t}\n\t\t]\n\t},\n\t\"message\": \"Order status fetched successfully\"\n}" languages=["cURL"] /%}

{% callout type="note" label="Note" %}
You can also know the status of order by integrating [**webhooks**](/guides/in-store-payments/integrations/webhooks) which allows you to get real-time updates on payment events directly, eliminating the need for frequent system requests to the Surfboard systems and providing immediate order status notifications.
{% /callout %}