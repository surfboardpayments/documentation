```markdown
# Order Customer Identity

## Overview
This event is triggered when a customer taps their card on the terminal, enabling you to identify the customer during a transaction and personalize the experience.

## Prerequisites
- A compatible terminal capable of card tap detection.
- Webhook endpoint must be configured to receive `order.customer.identify` events.
- The webhook endpoint must be accessible and return a 200 OK status code.
- Ensure proper authentication/verification mechanism is set up for incoming webhooks (e.g., signature verification).

## Event Details

### Event Type
```
order.customer.identify
```

### When This Event is Triggered
This event is triggered immediately after a customer taps their card on a compatible terminal, but before the order is finalized or any payment is processed. It allows for customer identification early in the transaction flow.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing the event type, metadata about the event delivery, and data related to the order and card used.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event.  In this case: `order.customer.identify` |
| metadata | object | Contains metadata about the webhook delivery itself, including unique identifiers, timestamps, and retry counts. |
| data | object | Holds the actual event payload — details about the order and the card token used to identify the customer. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID for this specific webhook event. |
| created | number | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| retryAttempt | number | Number of retry attempts made for the webhook event. Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| orderId | string | Unique identifier for the order associated with the identified customer. |
| cardId | string | Tokenized identifier for the customer's card used to recognize or link the customer to the order. |

### Complete Payload Example
```json
{
	"eventType": "order.customer.identify",
	"metadata": {
		"eventId": "832cf9fe1806581dff",
		"created": 1747553660038,
		"retryAttempt": 0,
		"webhookEventId": "81a214e74b107801ff"
	},
	"data": {
		"orderId": "832cf9f93d2fd0410b",
		"cardId": "c550c29e80908c887a"
	}
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return an HTTP 200 OK status code to acknowledge receipt of the webhook.
- The endpoint must respond within a reasonable timeout (e.g., 10 seconds) to avoid triggering retry attempts.

### Best Practices
- Implement idempotency logic to handle potential duplicate webhook deliveries, using the `eventId` from the `metadata` object.
- Log webhook events for auditing and debugging purposes.
- Implement error handling and alerting to detect and address issues with webhook processing.
- Verify the origin of the webhook using a shared secret or signature verification.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhooks', (req, res) => {
  const event = req.body;

  if (event.eventType === 'order.customer.identify') {
    const eventId = event.metadata.eventId;
    const orderId = event.data.orderId;
    const cardId = event.data.cardId;

    // Process the customer identification event
    console.log(`Received order.customer.identify event for order ${orderId} and card ${cardId} (Event ID: ${eventId})`);

    // Your business logic here:
    // - Lookup the customer based on the cardId
    // - Associate the customer with the order
    // - Personalize the experience

    // Acknowledge receipt of the webhook
    res.status(200).send('OK');
  } else {
    // Ignore unknown event types
    console.log(`Received unknown event type: ${event.eventType}`);
    res.status(200).send('OK'); // Still acknowledge to prevent retries
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Implement robust error handling to gracefully handle failures and prevent data loss.  Consider using a queuing system for asynchronous processing of webhooks.
- The `cardId` is a tokenized representation of the customer's card and should be treated as sensitive data.
---
