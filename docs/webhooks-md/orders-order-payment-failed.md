# Order Payment Failed

## Overview
This webhook event is triggered when a payment for an order fails.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Webhook endpoint URL must be registered in the system.
- Authentication/verification mechanisms (e.g., API keys, HMAC signatures) may be required. Refer to the system's security documentation.
- Ensure proper handling of potential failures and implement retry logic.

## Event Details

### Event Type
```
order.paymentfailed
```

### When This Event is Triggered
This event is triggered specifically when an attempt to process a payment for an order has failed.  This means the payment authorization or capture process was unsuccessful.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing the `eventType`, `metadata`, and `data` fields. The `eventType` identifies the specific event. The `metadata` contains information about the event itself, such as timestamps and retry attempts. The `data` contains information about the order and the failed payment.

### Payload Parameters

| Parameter | Type | Description |
|---|---|---|
| eventType | string | Denotes the category of the webhook event.  Always `order.paymentfailed` for this event. |
| metadata | object | Includes information about the webhook event. |
| data | object | The payload containing information about the order and failed payment. |

#### Metadata
| Parameter | Type | Description |
|---|---|---|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created (in milliseconds). |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| terminalId | string | Identifier of the terminal that triggered this event. |
| originalCreated | number | Timestamp of the very first time the event was published (in milliseconds). |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|---|---|---|
| orderId | string | Unique identifier for the order for which the payment failed. |
| merchantId | string | Unique identifier of the merchant. |
| orderStatus | string | Provides the status of the order. For this event, the status is `PAYMENT_FAILED`. |
| adjustments | array | List of adjustments applied to the order. |
| referenceId | string | Unique identifier for the cancelled payment. |
| paymentId | string | Unique identifier for the payment that failed. |
| metadata | object | Metadata passed with the order creation.  This field is optional and may be null or absent. |
| failedTransactionDetails | object | Information about the failed transaction. |

##### Adjustments (Array of Objects)

| Parameter | Type | Description |
|---|---|---|
| adjustmentType | string | Category or reason for the adjustment. |
| amount | string | Amount of the adjustment in minor currency units. |

##### Failed Transaction Details

| Parameter | Type | Description |
|---|---|---|
| paymentId | string | Unique identifier for the payment attempt that was cancelled. |
| terminalId | string | Identifier of the payment terminal where the transaction was initiated. |
| rrn | string | Retrieval Reference Number (RRN) used to uniquely identify the card transaction. |
| amount | number | Amount of the transaction in minor currency units. |
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
	"eventType": "order.paymentfailed",
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
		"orderStatus": "PAYMENT_FAILED",
		"paymentId": "831fc2ebc0bf400a06",
		"referenceId": "abc6",
		"merchantId": "81a641f8b3cfd0070e",
		"failedTransactionDetails": {
			"paymentId": "831fc2ebc0bf401419",
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
- Your endpoint should return a `200 OK` HTTP status code upon successful receipt and processing of the webhook.
- The response body can be empty or contain a simple acknowledgement message (e.g., `{"status": "success"}`).
- The endpoint should respond within a reasonable timeframe (e.g., 5 seconds).  Exceeding this time may result in the platform retrying the webhook.
- Ensure to return a `5XX` status code to indicate failure in processing to trigger a retry attempt.

### Best Practices
- **Idempotency:** Implement idempotency to prevent duplicate processing of the same event. Use the `eventId` in the `metadata` to track processed events and avoid reprocessing.
- **Error Handling:** Implement robust error handling to gracefully handle unexpected issues. Log errors for debugging and monitoring. Use try-catch blocks and appropriate error codes in your response.
- **Asynchronous Processing:**  Offload the main processing logic to a background queue or worker to avoid blocking the webhook endpoint and ensure timely responses.
- **Data Validation:** Validate the data received in the webhook payload to ensure data integrity and prevent unexpected errors.
- **Security:** Verify the authenticity of the webhook request using appropriate security measures such as HMAC signatures or API keys.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook/order-payment-failed', (req, res) => {
  const event = req.body;

  // Verify the event type
  if (event.eventType !== 'order.paymentfailed') {
    console.warn('Received unexpected event type:', event.eventType);
    return res.status(400).send('Invalid event type');
  }

  // Extract event details
  const eventId = event.metadata.eventId;
  const orderId = event.data.orderId;
  const paymentId = event.data.paymentId;

  // TODO: Implement idempotency check using eventId

  // TODO: Process the failed payment event (e.g., notify customer, update order status)
  console.log(`Processing order payment failed event for order ${orderId}, payment ${paymentId}, event ID ${eventId}`);

  // Simulate asynchronous processing (e.g., using a message queue)
  setTimeout(() => {
    console.log(`Successfully processed event ${eventId}`);
  }, 1000);

  // Send a success response
  res.status(200).send({ status: 'success' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Ensure your endpoint is capable of handling concurrent requests to avoid performance bottlenecks.
- Review and adhere to data privacy regulations when handling customer data.
- Metadata that was passed during order creation can be found in the data.metadata field

---
