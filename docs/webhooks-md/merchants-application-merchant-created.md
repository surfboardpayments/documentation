# Application Merchant Created

## Overview
This event is triggered when the merchant is created in Surfboard. The accompanying event data will include both the Merchant ID and Store ID.

## Prerequisites
- Webhook endpoint must be configured in Surfboard to receive `application.merchantCreated` events.
- Ensure your endpoint is accessible over HTTPS.
- Authentication/verification of the webhook request is required (implementation details depend on Surfboard's configuration).
- The merchant application must be successfully created within the Surfboard platform.

## Event Details

### Event Type
```
application.merchantCreated
```

### When This Event is Triggered
This event is triggered immediately after a merchant is successfully created in Surfboard, following the submission of a merchant application. The event signifies the initial creation of the merchant profile within the Surfboard platform.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing event metadata and the core merchant application data.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event.  For this event, it will be `application.merchantCreated`. |
| metadata | object | Includes information about the webhook event like the unique event ID, the date and time the event was created (timestamp), the number of retry attempts made to send the event, and the specific webhook event ID denoting the type of event. |
| data | object | The payload in the webhook event that contains the core information or updates being delivered. This is the useful data that recipients can act on. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| applicationId | string | Unique identifier for the specific merchant application. |
| applicationStatus | string | Indicates the current status of the application. For this particular event, the status is 'MERCHANT_CREATED'. |
| merchantId | string | Unique identifier assigned to the merchant created in Surfboard. This ID serves as the primary reference for all merchant-related activities and interactions within the platform. |
| storeId | string | Unique identifier for the specific store associated with the newly created merchant. This ID differentiates individual stores under a single merchant. |
| corporateId | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| companyName | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.merchantCreated",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "MERCHANT_CREATED",
    "merchantId": "81412e2e4102f80f0e",
    "storeId": "81412e3c3b1090060f",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 200 OK HTTP status code to acknowledge receipt of the webhook event.
- Timeout for processing the webhook is typically 30 seconds.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement robust error handling to gracefully handle unexpected data or processing failures.
- Design your endpoint to be idempotent.  Process the event only once, even if you receive duplicate webhook calls (use `metadata.eventId` for checking).
- Log all received webhook events and any errors encountered during processing.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  const eventType = req.body.eventType;

  if (eventType === 'application.merchantCreated') {
    const eventData = req.body.data;
    const metadata = req.body.metadata;

    // Process the merchant creation event
    console.log('Received Merchant Created Event:', eventData);
    console.log('Metadata:', metadata);

    // Acknowledge receipt of the webhook
    res.status(200).send('OK');
  } else {
    // Handle other event types or return an error
    console.log('Unknown event type:', eventType);
    res.status(400).send('Bad Request: Unknown event type');
  }
});

app.listen(port, () => {
  console.log(`Webhook endpoint listening at http://localhost:${port}`);
});
```

## Notes
- Retry attempts are made with delays of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Use the `merchantId` and `storeId` values to uniquely identify the merchant and store in your system. Ensure these IDs are properly stored and associated within your database.

---
