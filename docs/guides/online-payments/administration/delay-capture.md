---
title: "Delay Capture"
description: "Guide to delaying payment capture after authorization in Surfboard Payments online solutions."
category: "Online Payment Guides"
path: "/guides/online-payments/post-payments/delay-capture.md"
---

# Delay capture

Surfboard’s online solution enables you to capture payments at a later time. This feature is useful for scenarios where you need to authorize a payment but delay the actual capture of funds.

### Enabling Delay Capture

When creating an order, set the **`delayCapture`** parameter to `true` in your [create order API](/api/orders#Create-Order) request. This setting allows you to authorize the payment initially and capture it later as needed.

Here's an example

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl  -d ' \\\n{\n\t\"terminal$id\": \"813bee989f08500405\",\n\t\"type\": \"purchase\",\n\t\"referenceId\": \"orderabc\",\n\t\"orderLines\": [\n\t\t{\n\t\t\t\"id\": \"1234\",\n\t\t\t\"name\": \"Bucket hat\",\n\t\t\t\"quantity\": 1,\n\t\t\t\"itemAmount\": {\n\t\t\t\t\"regular\": 2000,\n\t\t\t\t\"total\": 2000,\n\t\t\t\t\"currency\": \"SEK\",\n\t\t\t\t\"tax\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"amount\": 200,\n\t\t\t\t\t\t\"percentage\": 10,\n\t\t\t\t\t\t\"type\": \"vat\"\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\"controlFunctions\": {\n\t\t\t\t\t\"online\": {\n\t\t\t\t\t\t\"delayCapture\": true\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t]\n}"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"orderId\": \"8288f03bde50680c0b\"\n\t},\n\t\"message\": \"Order created successfully\"\n}" /%}

{% callout type="note" label="Note" %}
Delay capture is also automatically set to true when you set the auth mode to pre-auth in the create order request.
{% /callout %}

### Capturing the Payment

Once you are ready to capture the payment, make a POST request to the Capture Payment API. This API triggers the capture of the authorized funds. Using the following request and response you can capture the payment and delay the payment

**Note**: `Amount` parameter is valid only with PRE-AUTH and sets the final authorization amount.

{% requestresponse method="POST" requests=[{language: "cURL", code: ""curl -d '{\n\t\"amount\": 200\n}' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments/:paymentId/capture""}] response="{\n\t\"status\":\"SUCCESS\",\n\t\"message\":\"Payment captured successfully\"\n}" languages=["cURL"] /%}

### Webhook Notifications

You will receive webhook notifications at two intervals post-authorization:

1. **3 days after authorization**
2. **7 days after authorization**

These notifications will help you keep track of the status of delayed captures.

### Additional Costs

Please note that using delayed captures might incur additional costs. To know more contact integrations@surfboard.se

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' },{ title: 'Webhooks', url: '/guides/online-payments/integrations/webhooks' }]" /%}
