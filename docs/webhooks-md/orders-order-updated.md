# Order Updated

## Overview
This event is triggered when an order is updated.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Webhook endpoint URL must be provided to the system.
- Ensure your server can handle incoming HTTPS requests.
- Authentication/Verification: Consult your system's documentation for specifics on verifying the authenticity of webhooks. This might involve API keys, HMAC signatures, or other methods.

## Event Details

### Event Type
```
order.updated
```

### When This Event is Triggered
This event is triggered whenever any attribute of an existing order is updated. This includes changes to adjustments, status, metadata, or any other order-related data.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing information about the order update. It consists of the `eventType`, `metadata` about the event itself, and the `data` containing information about the updated order.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event. |
| metadata | object | Includes information about the webhook event like the unique event ID, the date and time the event was created (timestamp), the number of retry attempts made to send the event, and the specific webhook event ID denoting the type of event. |
| data | object | The payload in the webhook event that contains the core information or updates being delivered. This is the useful data that recipients can act on. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created. |
| retryAttempt | number | Number of retry attempts made for the webhook event. Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts. |
| terminalId | string | Identifier of the terminal that triggered this event. |
| originalCreated | number | Timestamp of the very first time the event was published |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| orderId | string | Unique identifier for the order created. |
| merchantId | string | Unique identifier of the merchant. |
| adjustments | array | List of adjustments applied to the order. |
| referenceId | string | External referenceId passed during order creation. |
| metadata | object | Metadata passed with the order creation. This field is optional. |

##### Adjustments (Array of Objects)
| Parameter | Type | Description |
|-----------|------|-------------|
| adjustmentType | string | Category or reason for the adjustment. |
| amount | string | Amount of the adjustment in minor currency units. |

### Complete Payload Example
```json
{
	"eventType": "order.updated",
	"metadata": {
		"eventId": "81a214e74b107801ff",
		"created": 1695793998732,
		"retryAttempt": 0,
		"terminalId": "830acac336f6d80b04",
		"originalCreated": 1745821536443,
		"webhookEventId": "81a214e7455ed01cff"
	},
	"data": {
		"orderId": "81a214e2ece7d00b0b",
		"merchantId": "8248db4c5c8dd0130e",
		"adjustments": [
			{
				"adjustmentType": "Discounts",
				"amount": "10"
			}
		]
	}
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 200 OK HTTP status code to acknowledge receipt of the webhook.
- Any other status code will be interpreted as a failure, and the system will retry the webhook according to its retry policy.
- Timeout: Your endpoint should respond within a reasonable timeframe (e.g., 5 seconds).  Longer response times may lead to timeouts and retries.
- Retry Logic: If your endpoint fails to process the webhook (e.g., due to a temporary database outage), it should return a non-200 status code. The system will retry the webhook delivery up to three times:  5 minutes after the first failure, and 10 minutes after the second failure.

### Best Practices
- **Idempotency:** Ensure your webhook handler is idempotent.  This means that processing the same webhook multiple times has the same effect as processing it once. Use the `eventId` in the `metadata` to track which webhooks you have already processed.
- **Error Handling:** Implement robust error handling in your webhook handler. Log errors, and consider using a dead-letter queue to handle webhooks that consistently fail to process.
- **Asynchronous Processing:** For complex processing logic, consider using a queue to process webhooks asynchronously. This will prevent your webhook endpoint from timing out.
- **Security:** Validate the authenticity of the webhook by verifying the signature or API key.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

app.post('/webhook', (req, res) => {
  const webhookPayload = req.body;

  // Verify the event type
  if (webhookPayload.eventType === 'order.updated') {
    // Process the order update
    const orderId = webhookPayload.data.orderId;
    const merchantId = webhookPayload.data.merchantId;

    console.log(`Received order update for order ID: ${orderId}, merchant ID: ${merchantId}`);
    console.log('Full payload:', JSON.stringify(webhookPayload, null, 2));

    // Acknowledge receipt of the webhook
    res.status(200).send('Webhook received successfully');

  } else {
    console.log(`Received unknown webhook event type: ${webhookPayload.eventType}`);
    res.status(400).send('Invalid event type');
  }
});

app.listen(port, () => {
  console.log(`Webhook listener app listening at http://localhost:${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- The `metadata` field within the `data` object is optional. Be prepared to handle cases where it is not present.
---
