```markdown
# Logistics Order Update

## Overview
This event is triggered whenever there's a change in the shipment status of the terminals and accessories ordered through the Logistics API.

## Prerequisites
- A configured webhook endpoint capable of receiving POST requests.
- The Logistics API must be integrated and orders must be placed.
- The webhook endpoint needs to be publicly accessible.
- Authentication/verification of the incoming webhook request (e.g., using a shared secret).

## Event Details

### Event Type
```
logistics.orderupdate
```

### When This Event is Triggered
This event is triggered when the status of a product shipment order (terminals and accessories) changes. This could include events such as order placement, shipping, completion, or when an order is pending due to stock availability.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing the `eventType`, `metadata`, and `data` related to the logistics order update.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event. |
| metadata  | object | Includes information about the webhook event. |
| data      | object | The payload containing core information about the order update. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId      | string | Unique ID of the webhook event. |
| created      | number | Timestamp at which the event was created. |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| merchantId  | string | Unique identifier for the merchant for which the products are being shipped. |
| orderId     | string | Unique identifier for the product shipment order. |
| orderStatus | string | Provides the status of the shipment order for the terminals and accessories. |
| trackingUrl | string | (Optional) URL to track the shipment. This is available for ORDER_SHIPPED. |
| packageDetails | array | (Optional) Array of package details. This is available for ORDER_SHIPPED. |

##### Package Details (Array Elements)
| Parameter | Type | Description |
|---|---|---|
| productId | string | Unique identifier for the product. |
| serial | string | Serial number of the product. |

##### Possible Values for `orderStatus`

| Value                      | Description                                            |
|----------------------------|--------------------------------------------------------|
| ORDER_PLACED               | The order has been successfully placed.                |
| ORDER_SHIPPED              | The order has been shipped and is in transit.           |
| ORDER_COMPLETED            | The order has been successfully fulfilled and completed. |
| ORDER_PENDING_FOR_STOCK    | The order is pending processing due to stock availability. |

### Complete Payload Example
```json
{
  "eventType": "logistics.orderupdate",
  "metadata": {
     "eventId": "81a214e74b107801ff",
     "created": 1695793998732,
     "retryAttempt": 0,
     "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
     "merchantId": "81412e2e4102f80f0e",
     "orderId": "81376ad8ebedf80310",
     "orderStatus": "ORDER_SHIPPED",
     "trackingUrl": "https://www.dhl.com/home/tracking.html",
     "packageDetails": [
	    {
		     "productId": "817361bb0a23400701",
		     "serial": "658364"
		}
	]
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a `200 OK` HTTP status code to acknowledge receipt of the webhook.
- The response body can be empty.
- Timeout for the endpoint is 10 seconds.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to avoid processing the same event multiple times.  Use the `eventId` from the `metadata` to track processed events.
- Log webhook events for auditing and debugging purposes.
- Handle potential errors gracefully and provide informative error messages.
- Verify the origin of the webhook using a shared secret or other authentication mechanism.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhooks/logistics', (req, res) => {
  const event = req.body;

  // Verify the event type
  if (event.eventType === 'logistics.orderupdate') {
    // Process the order update event
    console.log('Received Logistics Order Update:', event);

    // Example: Idempotency check (using a database or cache)
    const eventId = event.metadata.eventId;
    // Check if the eventId has already been processed
    // If not, process the event and store the eventId
    // else, ignore

    // Extract data from the event
    const merchantId = event.data.merchantId;
    const orderId = event.data.orderId;
    const orderStatus = event.data.orderStatus;

    // Update your system with the new order status
    console.log(`Updating order ${orderId} for merchant ${merchantId} to status ${orderStatus}`);
    // Send a 200 OK response to acknowledge receipt
    res.status(200).send();
  } else {
    console.log('Received unknown event type:', event.eventType);
    res.status(400).send('Unknown event type');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Retry attempts are made up to three times with delays of 5 minutes and 10 minutes respectively.
- Store the `eventId` to ensure that you process the events only once to avoid inconsistency and data duplication.
-  `trackingUrl` and `packageDetails` are only present when `orderStatus` is `ORDER_SHIPPED`.

---
