# Order Payment Initiated

## Overview
This event is triggered when a payment is initiated for an order.

## Prerequisites
- A configured webhook endpoint that can receive POST requests.
- Webhook endpoint must be accessible over HTTPS.
- Authentication is not specifically detailed in the source data but may be required based on your system configuration. Check your system's webhook settings for authentication requirements.
- Ensure the 'Order Events' webhook is enabled in your system's configuration.

## Event Details

### Event Type
```
order.paymentinitiated
```

### When This Event is Triggered
This webhook event is triggered the moment a payment process is initiated for a specific order within the system. The status of the order is set to `PAYMENT_INITIATED`.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing information about the payment initiation event. It includes the event type, metadata about the event itself, and data related to the order and payment.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event. Will always be `order.paymentinitiated` for this event. |
| metadata | object | Includes information about the webhook event. |
| data | object | The payload containing information about the order and payment. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| terminalId | string | Identifier of the terminal that triggered this event. |
| originalCreated | number | Timestamp of the very first time the event was published (Unix timestamp in milliseconds). |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| orderId | string | Unique identifier for the order for which the payment has been initiated. |
| merchantId | string | Unique identifier of the merchant. |
| paymentStatus | string | Provides the status of the payment. Value will be `PAYMENT_INITIATED`. |
| orderStatus | string | Provides the status of the order. Value will be `PAYMENT_INITIATED`. |
| paymentMethod | string | Specifies the chosen method for payment. Supported payment methods are `CARD`, `SWISH`, and `AMEX`. |
| paymentId | string | Unique identifier for the payment that has been initiated. |
| adjustments | array | List of adjustments applied to the order. |
| referenceId | string | External referenceId passed during order creation. |
| metadata | object | Metadata passed with the order creation.  Optional field. |

##### Adjustments (Array of Objects)
| Parameter | Type | Description |
|-----------|------|-------------|
| adjustmentType | string | Category or reason for the adjustment (e.g., "Discounts"). |
| amount | string | Amount of the adjustment in minor currency units. |

### Complete Payload Example
```json
{
  "eventType": "order.paymentinitiated",
  "metadata": {
    "eventId": "81a2189d4b107816ff",
    "created": 1695795898049,
    "retryAttempt": 0,
    "terminalId": "830acac336f6d80b04",
    "originalCreated": 1745821536443,
    "webhookEventId": "81a2189e455ed00bff"
  },
  "data": {
    "orderId": "81a2189aece7d00f0b",
    "merchantId": "8248db4c5c8dd0130e",
    "paymentStatus": "PAYMENT_INITIATED",
    "orderStatus": "PAYMENT_INITIATED",
    "adjustments": [
      {
        "adjustmentType": "Discounts",
        "amount": "10"
      }
    ],
    "paymentMethod": "CARD",
    "paymentId": "81a2189ccb10783206"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 2xx HTTP status code (e.g., 200 OK) to acknowledge receipt of the webhook.
- The response body is not required, but a simple "OK" or success message is recommended for debugging purposes.
- The webhook must respond within a reasonable timeout period (e.g., 10 seconds) to avoid being marked as failed.
- If the request fails and the webhook endpoint does not respond with a `200 OK` then Surfboard will retry posting messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to handle potential duplicate webhook events. Use the `eventId` in the metadata to identify and discard duplicates.
- Log all incoming webhook requests and responses for auditing and debugging purposes.
- Implement robust error handling to gracefully handle unexpected data or system failures.
- Validate the integrity of the webhook payload (e.g., using a shared secret or digital signature, if supported by the platform).  (Not specifically defined in the source data, but a general best practice).

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhooks/order-payment-initiated', (req, res) => {
  const event = req.body;

  console.log('Received Order Payment Initiated webhook:', event);

  // Implement idempotency check using event.metadata.eventId
  // (Example: Check if eventId exists in your database)

  // Process the event data
  const orderId = event.data.orderId;
  const paymentId = event.data.paymentId;
  const paymentStatus = event.data.paymentStatus;

  console.log(`Order ID: ${orderId}, Payment ID: ${paymentId}, Payment Status: ${paymentStatus}`);

  // Update your system with the payment initiation information

  // Send a success response
  res.status(200).send('OK');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Ensure your system is prepared to handle the `PAYMENT_INITIATED` status and update accordingly.
- The `referenceId` can be helpful for correlating this event with external systems.
- The `metadata` field in `data` is optional and can contain custom information related to the order.
---
