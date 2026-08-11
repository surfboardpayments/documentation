# Application Submitted

## Overview
This event is triggered once the merchant has completed and submitted the KYB for review. It provides real-time updates on the progress of each merchant application, enabling partners to ensure timely and accurate completion of merchant onboarding.

## Prerequisites
- Webhook endpoint must be set up to receive POST requests.
- Endpoint must be accessible over HTTPS.
- Authentication/verification method (e.g., API key, signature verification) must be implemented.
- Requires initial configuration to subscribe to merchant application events.

## Event Details

### Event Type
```
application.submitted
```

### When This Event is Triggered
This event is triggered immediately after a merchant submits their KYB (Know Your Business) application for review, signaling the completion of the application submission process.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing the event type, metadata about the event, and the application data.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType   | string | Denotes the category of the webhook event. |
| metadata    | object | Includes information about the webhook event like the unique event ID, the date and time the event was created (timestamp), the number of retry attempts made to send the event, and the specific webhook event ID denoting the type of event. |
| data        | object | The payload in the webhook event that contains the core information or updates being delivered. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId       | string | Unique ID of the webhook event. |
| created       | number | Timestamp at which the event was created. |
| retryAttempt  | number | Number of retry attempts made for the webhook event. |
| webhookEventId| string | Unique ID of the webhook event. |

#### Event Data
| Parameter       | Type   | Description                                                                 |
|-----------------|--------|-----------------------------------------------------------------------------|
| applicationId   | string | Unique identifier for the specific merchant application.                      |
| applicationStatus | string | Indicates the current status of the application. For this event, the status is 'APPLICATION_SUBMITTED'. |
| corporateId     | string | A unique ID representing the corporate entity of the merchant.              |
| companyName     | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.submitted",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_SUBMITTED",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 2xx HTTP status code (e.g., 200 OK) to acknowledge receipt of the webhook.
- Response should be sent within a reasonable timeframe (e.g., under 5 seconds) to avoid timeouts.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to prevent duplicate processing of the same event. Use the `eventId` in the `metadata` to track processed events.
- Implement robust error handling to gracefully handle unexpected errors.
- Log all incoming webhook events for auditing and debugging purposes.
- Validate the authenticity of the webhook by verifying the signature (if available).

## Example Implementation

### Endpoint Setup
```javascript
// Example webhook endpoint handler
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhook/application-submitted', (req, res) => {
  const eventData = req.body;

  // Verify the event type
  if (eventData.eventType === 'application.submitted') {
    // Process the event data
    console.log('Received Application Submitted event:', eventData);

    // Acknowledge receipt of the webhook
    res.status(200).send('OK');
  } else {
    // Handle unknown event types
    console.warn('Received unknown event type:', eventData.eventType);
    res.status(400).send('Bad Request: Unknown event type');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- The `applicationId` can be used to query the Surfboard API for more detailed information about the application.

---
