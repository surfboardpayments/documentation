# Order Payment Cancelled

## Overview
This event is triggered when a payment for an order is cancelled.

## Prerequisites
- A configured webhook endpoint to receive the event.
- Proper authentication/verification method in place (e.g., signature verification) to ensure the integrity and origin of the webhook.
- Webhook must be subscribed to the `order.paymentcancelled` event.

## Event Details

### Event Type
```
order.paymentcancelled
```

### When This Event is Triggered
This event is triggered immediately after a payment associated with an order is cancelled. This could happen due to various reasons, such as customer cancellation, insufficient funds, or technical issues during the payment process.

## Webhook Payload

### Payload Structure
The webhook payload consists of three main parts: `eventType`, `metadata`, and `data`. The `eventType` identifies the specific event. The `metadata` contains information about the event itself, such as timestamps and retry attempts. The `data` contains the information related to the cancelled payment and the associated order.

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
| orderId | string | Unique identifier for the order with the cancelled payment. |
| merchantId | string | Unique identifier of the merchant. |
| orderStatus | string | Provides the status of the order. For this event, the status is 'PAYMENT_CANCELLED'. |
| adjustments | array | List of adjustments applied to the order. |
| paymentId | string | Unique identifier for the cancelled payment. |
| referenceId | string | Unique identifier for the cancelled payment. |
| metadata | object | Metadata passed with the order creation. |
| cancelledTransactionDetails | object | Information about the transaction that was cancelled. |

##### Adjustments (Array Elements)
| Parameter | Type | Description |
|-----------|------|-------------|
| adjustmentType | string | Category or reason for the adjustment. |
| amount | string | Amount of the adjustment in minor currency units. |

##### Cancelled Transaction Details
| Parameter | Type | Description |
|-----------|------|-------------|
| paymentId | string | Unique identifier for the payment attempt that was cancelled. |
| terminalId | string | Identifier of the payment terminal where the transaction was initiated. |
| rrn | string | Retrieval Reference Number (RRN) used to uniquely identify the card transaction. |
| amount | number | Amount of the transaction in minor currency units (e.g., 110 for 1.10 SEK). |
| currency | string | Numeric or ISO code for the currency in which the transaction was processed (e.g., '752' for SEK). |
| method | string | Payment method used for the transaction (e.g., 'CARD'). |
| cardLabel | string | Descriptive label of the card application (e.g., 'Debit Mastercard'). |
| posEntryMode | string | Point-of-sale entry mode, indicating how the card data was read (e.g., '07' for contactless). |
| aid | string | Application Identifier (AID) of the card application used for the transaction. |
| cardBrand | string | Normalized brand of the card used (e.g., 'VISA', 'MASTERCARD'). |
| terminalVerificationResult | string | Result code from the terminal’s EMV verification process. |
| customerResponseDescription | string | A message from the payment processor explaining the transaction outcome to the customer. |

### Complete Payload Example
```json
{
	"eventType": "order.paymentcancelled",
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
		"merchantId": "81a641f8b3cfd0070e",
		"cancelledTransactionDetails": {
			"paymentId": "831fc2ebc0bf400a06",
			"terminalId": "830acac336f6d80b04",
			"rrn": "511806000002",
			"amount": 310,
			"currency": "752",
			"method": "CARD",
			"cardLabel": "MASTERCARD DEBIT",
			"posEntryMode": "07",
			"aid": "a0000000041010",
			"cardBrand": "MASTERCARD",
			"terminalVerificationResult": "0400008001",
			"customerResponseDescription":"Description of the customer response code"
		}
	}
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a `200 OK` status code to acknowledge receipt of the webhook event. Any other status code will be interpreted as a failure.
- The endpoint should respond within a reasonable timeframe (e.g., 5 seconds).  Exceeding this may result in a timeout and a retry attempt.
- The response body is not required.

### Best Practices
- Implement idempotency to handle duplicate webhook events. Use the `eventId` in the `metadata` to identify and ignore duplicate events.
- Implement robust error handling to catch and log any errors that occur during webhook processing.
- Verify the webhook's signature to ensure its authenticity and prevent malicious attacks.
- Process webhooks asynchronously to avoid blocking your main application thread. Use a queue or background worker to handle the webhook processing.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhooks/order-payment-cancelled', (req, res) => {
  const event = req.body;

  // Verify the webhook signature (example - replace with your actual verification logic)
  // const signature = req.headers['x-webhook-signature'];
  // if (!verifySignature(event, signature)) {
  //   return res.status(400).send('Invalid signature');
  // }

  // Check for idempotency
  const eventId = event.metadata.eventId;
  // if (isEventAlreadyProcessed(eventId)) {
  //   console.log(`Ignoring duplicate event: ${eventId}`);
  //   return res.status(200).send('OK');
  // }

  // Process the event data
  try {
    console.log('Received order payment cancelled event:', JSON.stringify(event, null, 2));
    // Your business logic here - e.g., update database, send notifications
    // markEventAsProcessed(eventId); // ensure the event is not processed twice

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Log the error and potentially retry the processing later
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Webhook listener app listening at http://localhost:${port}`);
});

//Dummy Functions to replace with actual logic
function verifySignature(event, signature) {
    // Replace with actual signature verification logic
    return true;
}
function isEventAlreadyProcessed(eventId){
    // Replace with actual idempotency check
    return false;
}
function markEventAsProcessed(eventId){
    // Replace with actual logic to mark event as processed
    return;
}
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- The `terminalId` in the `metadata` represents the terminal that triggered the event (e.g., where the payment was initiated).
- Metadata fields within the `data` object should be handled carefully, as they may be customer-specific and require appropriate data handling procedures.

---
