---
title: "Cancel a Payment"
description: "Guide for cancelling a online payments."
category: "Online Payment Guides"
path: "/guides/online-payments/post-payments/manage-your-payments/cancel-payment.md"
---

# Cancel a payments

You can cancel a payment for an order if necessary, but only before the payment transfer is completed. Once the payment has been completed, you cannot cancel it directly, instead you will need to void the payment.

## Overview of the flow

```mermaid
 flowchart TD
    A[Create the order via API] --> B[Initiate payment for the order]
    B --> C[Cancel the payment when processing]
    C --> D{Cancel Payment Status API}
    D --> E[Payment Cancelled]
```

## Pre-requisites

**`paymentId`** from the [**Initiate a Payment API**](/api/payments#Initiate-a-Payment) .

## To cancel payments

1. Make a request to the **Cancel a Payment API** endpoint using the **`paymentId`** obtained from the **Initiate a Payment API** call.
2. The response will contain a **`paymentStatus`** field, which indicates the status of the payment whether it can be cancelled or not, the possible values are,
    - **PAYMENT_COMPLETED:** Payment is completed and cannot be cancelled.
    - **PAYMENT_FAILED:** Failed payments cannot be cancelled.
    - **PAYMENT_CANCELLED:** The payment has been canceled successfully.

Here's an example

{% requestresponse method="DELETE" requests=[{language: "cURL", code: "curl -X DELETE \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments/:paymentId"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"paymentStatus\": \"PAYMENT_CANCELLED\"\n\t},\n\t\"message\": \"Payment cancelled successfully.\"\n}" languages=["cURL"] /%}

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Payment methods', url: '/docs/payment-methods' },{ title: 'Transactions', url: '/docs/transactions' }]" /%}
