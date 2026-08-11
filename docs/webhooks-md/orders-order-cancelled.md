# Order Cancelled

## Overview
This event is triggered when an order is cancelled.

## Prerequisites
- Webhook endpoint URL configured in the system.
- Authentication/verification mechanism (e.g., HMAC signature verification) implemented for the webhook endpoint.
- Proper configuration of order status tracking within the system.

## Event Details

### Event Type
```
order.cancelled
```

### When This Event is Triggered
This webhook event is triggered immediately after an order is cancelled in the system. This could happen due to a customer request, system error, or other business logic reasons.

## Webhook Payload

### Payload Structure
The webhook payload contains information about the cancelled order, including its ID, merchant ID, status, adjustments, and associated metadata.  It is structured as a JSON object with `eventType`, `metadata`, and `data` fields.

### Payload Parameters
| Parameter | Type | Description |
|---|---|---|
| eventType | string | Denotes the category of the webhook event. |
| metadata | object | Includes information about the webhook event. |
| data | object | The payload containing the core information about the cancelled order. |

#### Metadata
| Parameter | Type | Description |
|---|---|---|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| terminalId | string | Identifier of the terminal that triggered this event. |
| originalCreated | number | Timestamp of the very first time the event was published (Unix timestamp in milliseconds). |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|---|---|---|
| orderId | string | Unique identifier for the order that is cancelled. |
| merchantId | string | Unique identifier of the merchant. |
| orderStatus | string | Provides the status of the order.  For this event, the status will be 'CANCELLED' or 'PAYMENT_CANCELLED'. |
| referenceId | string | External referenceId passed during order creation. |
| adjustments | array | List of adjustments applied to the order. |
| metadata | object | Metadata passed with the order creation.  Optional field. |

##### Adjustments
| Parameter | Type | Description |
|---|---|---|
| adjustmentType | string | Category or reason for the adjustment. |
| amount | string | Amount of the adjustment in minor currency units. |

##### Metadata (Order Metadata)
| Parameter | Type | Description |
|---|---|---|
| name | string | Name associated with the order metadata |

### Complete Payload Example
```json
{
	"eventType": "order.cancelled",
	"metadata": {
		"eventId": "831fc72840bf401fff",
		"created": 1745823696789,
		"retryAttempt": 0,
		"terminalId": "83134bb823ce380f04",
		"originalCreated": 1745823696789,
		"webhookEventId": "831fc728aa03100bff"
	},
	"data": {
		"metadata": [
			{
				"name": "Henry"
			}
		],
		"orderId": "831fc71d72fed00a0b",
		"adjustments": [
			{
				"adjustmentType": "test",
				"amount": "100"
			}
		],
		"orderStatus": "PAYMENT_CANCELLED",
		"paymentId": "831fc72240bf400006",
		"referenceId": "abc6",
		"merchantId": "81a641f8b3cfd0070e"
	}
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 200 OK status code to acknowledge receipt of the webhook.
- Timeout for processing the webhook should be reasonable (e.g., 10 seconds).
- If the endpoint fails to respond with a 200 OK, the system will retry sending the webhook.

### Best Practices
- Implement idempotency to handle duplicate webhooks (use `eventId` from metadata).
- Log all webhook events for auditing and debugging purposes.
- Implement robust error handling to gracefully handle failures and prevent data loss.
- Validate the authenticity of the webhook using a shared secret or other security mechanism.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(express.json());

const webhookSecret = 'YOUR_WEBHOOK_SECRET'; // Replace with your actual secret

app.post('/webhook', (req, res) => {
  // Verify the webhook signature (example using HMAC)
  const signature = req.headers['x-signature'];
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Webhook signature verification failed.');
    return res.status(401).send('Unauthorized');
  }

  const event = req.body;

  // Handle the event based on its type
  if (event.eventType === 'order.cancelled') {
    // Process the order cancellation event
    console.log('Order Cancelled Event Received:', event);

    // Extract order details
    const orderId = event.data.orderId;
    const merchantId = event.data.merchantId;
    const orderStatus = event.data.orderStatus;

    //Implement your business logic here
    console.log(`Processing order cancellation for orderId: ${orderId}, merchantId: ${merchantId}, status: ${orderStatus}`);
  }

  // Respond with a 200 OK to acknowledge receipt
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Webhook endpoint listening at http://localhost:${port}`);
});

```

## Notes
- The system attempts to deliver webhooks three times in case of failures.
- There is a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- The `paymentId` field is present in the example, but not described in the original parameter list. Depending on the context, this may need to be included in the parameter definitions.
- Ensure your webhook endpoint is always available and responds quickly to prevent missed events.

---
