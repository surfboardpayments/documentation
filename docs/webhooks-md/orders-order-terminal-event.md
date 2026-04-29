# Order Terminal Event

## Overview
This event is triggered for every state the terminal undergoes during a transaction.

## Prerequisites
- Webhook endpoint must be set up to receive POST requests.
- Ensure your endpoint is accessible over HTTPS.
- Verify the authenticity of the webhook by checking a shared secret (if configured, though details for this are not present in the provided data).
- No specific configurations appear to be required beyond endpoint setup.

## Event Details

### Event Type
```
order.terminal.event
```

### When This Event is Triggered
This event is triggered each time the terminal's transaction status changes during an order's payment processing lifecycle. This includes stages such as initiation, tip selection, card presentation, PIN entry, authorization, and completion.  For online terminals, the event will also be triggered when the payment page is loaded, secure channel is initialized, customer interaction begins, and when specific payment methods such as Google Pay and Apple Pay are initialized or attempted.

## Webhook Payload

### Payload Structure
The webhook payload consists of three main parts: `eventType`, `metadata`, and `data`.  `eventType` indicates the type of event being sent. `metadata` provides information about the event itself, such as its unique ID and creation timestamp. `data` contains the specific information related to the order and terminal transaction status.

### Payload Parameters

| Parameter   | Type   | Description                                          |
|-------------|--------|------------------------------------------------------|
| eventType   | string | Denotes the category of the webhook event.         |
| metadata    | object | Includes information about the webhook event.        |
| data        | object | The payload containing order and terminal information. |

#### Metadata

| Parameter    | Type   | Description                                                                                                                                               |
|--------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventId      | string | Unique ID of the webhook event.                                                                                                                          |
| created      | number | Timestamp at which the event was created.                                                                                                                  |
| retryAttempt | number | Number of retry attempts made for the webhook event. Surfboard will attempt to post messages three times in case of failures.                             |
| webhookEventId | string | Unique ID of the webhook event.                                                                                                                          |

#### Event Data

| Parameter                | Type   | Description                                                                                                                                                 |
|--------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| orderId                  | string | Unique identifier for the order.                                                                                                                            |
| merchantId               | string | Unique identifier of the merchant.                                                                                                                          |
| paymentId                | string | Unique identifier for the payment.                                                                                                                            |
| terminalTransactionStatus| string | Indicates the terminal's current status in relation to the transaction. Some states are only available for an online terminal. |
| orderStatus              | string | Provides the status of the order.                                                                                                                             |
| metadata                 | object | Metadata passed with the order creation. Optional. |

##### `terminalTransactionStatus` Possible Values

| Value                       | Description                                                                                                                                                               |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STARTED`                   | Transaction is initiated on the terminal.                                                                                                                                |
| `SELECT_TIP`                | Tip selection screen is displayed for customer to select tip.                                                                                                             |
| `AWAITING_CARD`             | Waiting for card tap/insert.                                                                                                                                            |
| `CARD_PRESENTED`            | Customer has presented card.                                                                                                                                             |
| `SELECT_APPLICATION`        | Application needs to select an application as card has more than one application present.                                                                                  |
| `ENTER_PIN`                 | Customer needs to enter PIN.                                                                                                                                               |
| `WRONG_PIN`                 | Wrong pin entered by customer.                                                                                                                                               |
| `AUTHORIZING`               | Payment authorization initiated from terminal.                                                                                                                            |
| `SUBMITTED`                 | Authorization submitted to the backend.                                                                                                                                  |
| `AUTHORIZED`                | Authorization process is complete.                                                                                                                                         |
| `PAGE_LOADED`               | [ONLINE ONLY] Payment page has fully loaded.                                                                                                                                 |
| `SECURE_CHANNEL_INITIALISED`| [ONLINE ONLY] The page is now ready for card details.                                                                                                                    |
| `GOOGLE_PAY_MOUNTED`        | [ONLINE ONLY] Google Pay SDK is available and has been successfully mounted.                                                                                             |
| `APPLE_PAY_MOUNTED`         | [ONLINE ONLY] Apple Pay SDK is available and has been successfully mounted.                                                                                              |
| `CUSTOMER_INTERACTION_IN_FORM`| [ONLINE ONLY] The customer has started entering information in the online page.                                                                                          |
| `CARD_PAYMENT_INITIATED`    | [ONLINE ONLY] Card payment is initiated.                                                                                                                                   |
| `APPLE_PAY_ATTEMPT_INITIATED` | [ONLINE ONLY] Customer has initiated an Apple Pay attempt.                                                                                                                |
| `GOOGLE_PAY_ATTEMPT_INITIATED`| [ONLINE ONLY] The customer has initiated a Google Pay attempt.                                                                                                               |
| `APPLE_PAY_PAYMENT_INITIATED`| [ONLINE ONLY] The Apple Pay payment process is initiated.                                                                                                                  |
| `GOOGLE_PAY_PAYMENT_INITIATED`| [ONLINE ONLY] The Google Pay payment is initiated.                                                                                                                      |

### Complete Payload Example
```json
{
  "eventType": "order.terminal.event",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "orderId": "81b5f2624b16e0080b",
    "merchantId": "8248db4c5c8dd0130e",
    "paymentId": "81b5f26215e9583a06",
    "terminalTransactionStatus": "STARTED",
    "orderStatus": "PAYMENT_INITIATED"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 2xx HTTP status code to acknowledge receipt of the webhook event.
- If the endpoint does not return a 2xx status code, Surfboard will retry the event.
- Timeout information is not explicitly stated but assume a reasonable timeout (e.g., 30 seconds) to prevent retries.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to avoid processing the same event multiple times, especially given the retry mechanism. Use the `eventId` or `webhookEventId` from the `metadata` object as the idempotency key.
- Implement robust error handling to catch exceptions and log errors for debugging.
- Validate the data within the webhook to ensure its integrity and correctness.
- Process webhooks asynchronously to avoid blocking the response and potentially causing timeouts or retries.

## Example Implementation

### Endpoint Setup
```javascript
// Example webhook endpoint handler (Node.js with Express)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhook/order-terminal', (req, res) => {
  const event = req.body;

  // Log the event for debugging
  console.log('Received order terminal event:', JSON.stringify(event, null, 2));

  // Implement idempotency check (example using a simple in-memory set)
  const eventId = event.metadata.eventId;
  if (processedEvents.has(eventId)) {
    console.log(`Event ${eventId} already processed. Skipping.`);
    return res.status(200).send('OK'); // Acknowledge receipt
  }

  // Process the event data
  try {
    // Your business logic here, e.g., update order status in your database
    console.log(`Processing order ID: ${event.data.orderId}, terminal status: ${event.data.terminalTransactionStatus}`);

    // Mark the event as processed
    processedEvents.add(eventId);

    // Send a success response
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).send('Error processing event'); // Indicate failure to retry
  }
});

const port = 3000;
const processedEvents = new Set(); // Simple in-memory idempotency set.  Replace with a database.
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Ensure your business logic can handle the different `terminalTransactionStatus` values and update your system accordingly.
- The `metadata` field within the `data` object is optional and may not always be present.

---
