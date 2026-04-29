# Order Payment Processed

## Overview
This event is triggered when a payment is processed for an order.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- The endpoint URL must be accessible by the webhook service.
- Authentication/verification may be required depending on the webhook configuration (e.g., API key, signature verification).
- Order creation must be implemented.

## Event Details

### Event Type
```
order.paymentprocessed
```

### When This Event is Triggered
This event is triggered immediately after a payment has been successfully processed for an order. The order status and payment status are both updated to `PAYMENT_PROCESSED`.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing metadata about the event and data related to the order and payment. The top-level structure includes `eventType`, `metadata`, and `data` fields.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event. |
| metadata | object | Includes information about the webhook event. |
| data | object | The payload in the webhook event that contains the core information related to the payment processed event. |

#### Metadata

| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created. |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| terminalId | string | Identifier of the terminal that triggered this event. |
| originalCreated | number | Timestamp of the very first time the event was published |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data

| Parameter | Type | Description |
|-----------|------|-------------|
| orderId | string | Unique identifier for the order for which the payment has been processed. |
| merchantId | string | Unique identifier of the merchant. |
| paymentStatus | string | Provides the status of the payment. For this event, the status is 'PAYMENT_PROCESSED'. |
| orderStatus | string | Provides the status of the order. For this event, the status is 'PAYMENT_PROCESSED'. |
| paymentMethod | string | Specifies the chosen method for payment. Supported payment methods are ‘CARD’, ‘SWISH’, and ‘AMEX’. |
| adjustments | array | List of adjustments applied to the order. |
| paymentId | string | Unique identifier for the payment that has been processed. |
| referenceId | string | External referenceId passed during order creation. |
| metadata | object | Metadata passed with the order creation. |

##### Adjustments (Array Elements)

| Parameter | Type | Description |
|-----------|------|-------------|
| adjustmentType | string | Category or reason for the adjustment. |
| amount | string | Amount of the adjustment in minor currency units. |

### Complete Payload Example
```json
{
  "eventType": "order.paymentprocessed",
  "metadata": {
    "eventId": "81a211564b107819ff",
    "created": 1695792172665,
    "retryAttempt": 0,
    "terminalId": "830acac336f6d80b04",
    "originalCreated": 1745821536443,
    "webhookEventId": "81a21156c55ed00bff"
  },
  "data": {
    "orderId": "81a211506ce7d00e0b",
    "merchantId": "8248db4c5c8dd0130e",
    "paymentStatus": "PAYMENT_PROCESSED",
    "orderStatus": "PAYMENT_PROCESSED",
    "adjustments": [
      {
        "adjustmentType": "Discounts",
        "amount": "10"
      }
    ],
    "paymentMethod": "CARD",
    "paymentId": "81a211504b10783706",
    "truncatedPan": "007"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a `200 OK` HTTP status code to acknowledge receipt of the webhook.
- A timeout of 10 seconds is recommended.
- The system will attempt to send the webhook three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to handle duplicate webhook events (e.g., by using the `eventId` from the metadata). Store the processed `eventId` in your database, and check against this before processing an incoming event.
- Implement robust error handling to catch and log any exceptions during webhook processing.
- Verify the `terminalId` in the `metadata` to ensure the event originates from a trusted source.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhook/order-payment-processed', (req, res) => {
  const eventData = req.body;

  // Extract event details
  const eventType = eventData.eventType;
  const eventId = eventData.metadata.eventId;
  const orderId = eventData.data.orderId;
  const paymentId = eventData.data.paymentId;
  const paymentStatus = eventData.data.paymentStatus;

  // Log the event (replace with your own processing logic)
  console.log(`Received webhook event: ${eventType} for order ${orderId} with payment ${paymentId} (Status: ${paymentStatus}, Event ID: ${eventId})`);

  // Acknowledge receipt with a 200 OK
  res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {
  console.log(`Webhook listener app listening on port ${port}`);
});
```

## Notes
- The `retryAttempt` field in the `metadata` indicates the number of times the webhook has been retried.
- Ensure your system can handle potential delays in receiving webhooks due to retry attempts.
- Implement logging and monitoring to track the success and failure rates of your webhook processing.
- The `truncatedPan` field might be returned. Its purpose is to show last digits of credit card used in payment. However, the field might not be present in all cases.
---
