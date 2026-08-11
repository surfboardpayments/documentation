# Order Payment Completed

## Overview
This event is triggered when a payment is completed for an order.

## Prerequisites
- Configure a webhook endpoint to receive POST requests.
- Authentication/verification requirements (if applicable) should be implemented on your endpoint.
- Webhook subscription to the `order.paymentcompleted` event.

## Event Details

### Event Type
```
order.paymentcompleted
```

### When This Event is Triggered
This event is triggered immediately after a payment has been successfully completed for a given order. This includes payments made via various methods such as card, Swish, or Amex.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing the `eventType`, `metadata`, and `data` related to the completed payment event.

### Payload Parameters
| Parameter | Type | Description |
|---|---|---|
| `eventType` | `string` | Denotes the category of the webhook event.  Always `order.paymentcompleted` for this event. |
| `metadata` | `object` | Includes information about the webhook event, such as event ID, timestamp, retry attempts, and terminal ID. |
| `data` | `object` | The payload containing the core information about the payment that was completed. |

#### Metadata
| Parameter | Type | Description |
|---|---|---|
| `eventId` | `string` | Unique ID of the webhook event. |
| `created` | `number` | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| `retryAttempt` | `number` | Number of retry attempts made for the webhook event. |
| `terminalId` | `string` | Identifier of the terminal that triggered this event. |
| `originalCreated` | `number` | Timestamp of the very first time the event was published (Unix timestamp in milliseconds). |
| `webhookEventId` | `string` | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|---|---|---|
| `orderId` | `string` | Unique identifier for the order for which the payment has been completed. |
| `merchantId` | `string` | Unique identifier of the merchant. |
| `paymentStatus` | `string` | Provides the status of the payment. For this event, the status is `PAYMENT_COMPLETED`. |
| `paymentMethod` | `string` | Specifies the chosen method for payment. Supported payment methods are `CARD`, `SWISH`, and `AMEX`. |
| `paymentId` | `string` | Unique identifier for the payment that has been initiated. |
| `referenceId` | `string` | External referenceId passed during order creation. |
| `amount` | `string` | Amount involved in the payment in minor currency units (e.g., 10 SEK is 1000 in amount). |
| `type` | `string` | Denotes the order type of the payment whether it is a `RETURN` or `PURCHASE` order. |
| `adjustments` | `array` | List of adjustments applied to the order. |
| `metadata` | `object` | Metadata passed with the order creation (Optional). |
| `transactionDetails` | `array` | Retrieves all transaction details for the order. |

##### Adjustments
| Parameter | Type | Description |
|---|---|---|
| `adjustmentType` | `string` | Category or reason for the adjustment. |
| `amount` | `string` | Amount of the adjustment in minor currency units. |

##### Transaction Details
| Parameter | Type | Description |
|---|---|---|
| `transactionId` | `string` | Unique identifier for the transaction. |
| `terminalId` | `string` | Identifier of the payment terminal from which the transaction was made. |
| `rrn` | `string` | Retrieval Reference Number (RRN) used to uniquely identify a card transaction. |
| `amount` | `string` | Payment amount in minor currency units (e.g., 110 for 1.10 in SEK). |
| `currency` | `string` | Numeric or ISO code for the currency (e.g., 752 for SEK). |
| `method` | `string` | Payment method used for the transaction (e.g., CARD). |
| `truncatedPan` | `string` | Last few digits of the card number. |
| `cardLabel` | `string` | Descriptive label of the card or application (e.g., 'Debit Mastercard'). |
| `posEntryMode` | `string` | Specifies how the card data was read (e.g., contact, contactless). |
| `aid` | `string` | Application Identifier (AID) for the card application. |
| `customerResponseCode` | `string` | Two-character response code representing authorization result (e.g., '00' for approved). |
| `cvmMethod` | `string` | Indicates the cardholder verification method used (e.g., '1f'). |
| `authMode` | `string` | Indicates the entity that authenticated the payment (e.g., ISSUER). |
| `cardBrand` | `string` | Normalized brand of the card (e.g., MASTERCARD, VISA). |
| `terminalVerificationResult` | `string` | Verification outcomes from the terminal (e.g., '0000000001'). |
| `cvmMethodDescription` | `string` | Descriptive explanation of the CVM method (e.g., 'Offline plaintext PIN'). |

### Complete Payload Example
```json
{
	"eventType": "order.paymentcompleted",
	"metadata": {
		"eventId": "831fc2f040bf405fff",
		"created": 1745821536443,
		"retryAttempt": 0,
		"terminalId": "830acac336f6d80b04",
		"originalCreated": 1745821536443,
		"webhookEventId": "831fc2f02a031015ff"
	},
	"data": {
		"orderId": "831fc2de72fed0000b",
		"referenceId": "r_3",
		"adjustments": [
			{
				"adjustmentType": "Discounts",
				"amount": "10"
			}
		],
		"paymentStatus": "PAYMENT_COMPLETED",
		"paymentMethod": "CARD",
		"paymentId": "831fc2ebc0bf400a06",
		"truncatedPan": "0102",
		"amount": "310",
		"merchantId": "82e48bd833d7d80c0e",
		"type": "PURCHASE",
		"transactionDetails": [
			{
				"transactionId": "831fc2ebc0bf401419",
				"terminalId": "830acac336f6d80b04",
				"rrn": "511806000002",
				"amount": "310",
				"currency": "752",
				"method": "CARD",
				"truncatedPan": "0102",
				"cardLabel": "MASTERCARD DEBIT",
				"posEntryMode": "07",
				"aid": "a0000000041010",
				"customerResponseCode": "00",
				"cvmMethod": "5e",
				"cvmMethodDescription": "Signature",
				"authMode": "ISSUER",
				"cardBrand": "MASTERCARD",
				"terminalVerificationResult": "0400008001"
			}
		]
	}
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a `200 OK` HTTP status code to acknowledge receipt of the webhook.
- Failure to return a `200 OK` will trigger retry attempts.
- The timeout for your endpoint is 10 seconds.

### Best Practices
- Implement idempotency checks using the `eventId` in the `metadata` to prevent duplicate processing of the same event.
- Log the webhook payload for debugging and auditing purposes.
- Handle potential errors gracefully and implement retry mechanisms if necessary.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhooks/order-payment-completed', (req, res) => {
  const eventData = req.body;

  // Log the event for debugging
  console.log('Received Order Payment Completed webhook:', JSON.stringify(eventData, null, 2));

  // Implement idempotency check (example using a simple in-memory set)
  if (processedEventIds.has(eventData.metadata.eventId)) {
    console.log(`Event ${eventData.metadata.eventId} already processed. Skipping.`);
    return res.status(200).send('OK'); // Acknowledge the event
  }

  // Process the event data
  try {
    // Example: Update order status in your database
    // updateOrderStatus(eventData.data.orderId, 'PAYMENT_COMPLETED');
    console.log(`Processing payment completion for order ${eventData.data.orderId}`);

    processedEventIds.add(eventData.metadata.eventId); // Add eventId to processed events

    res.status(200).send('OK'); // Acknowledge the event
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).send('Internal Server Error'); // Indicate failure to process
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Simple in-memory set for idempotency check
const processedEventIds = new Set();
```

## Notes
- Surfboard will attempt to post messages three times in case of failures.
  - Delay of 5 minutes between the first and second attempts.
  - Delay of 10 minutes between the second and third attempts.
- Ensure your endpoint is capable of handling potential high volumes of webhook events during peak periods.
---
