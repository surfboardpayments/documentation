# Application Signed

## Overview
This event is triggered when both the merchant signatories and UBOs have signed the application.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Ensure proper authentication/verification is implemented to secure the endpoint (e.g., API keys, HMAC).
- Subscription to the `application.signed` event is required.

## Event Details

### Event Type
```
application.signed
```

### When This Event is Triggered
This event is triggered immediately after both the merchant signatories and the Ultimate Beneficial Owners (UBOs) have completed signing the merchant application. This indicates that the application has reached a crucial stage where all required signatures are in place.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object with three top-level properties: `eventType`, `metadata`, and `data`. The `eventType` specifies the type of event. The `metadata` provides details about the event itself, such as its unique ID and creation timestamp. The `data` contains the core information related to the merchant application.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event.  Will be `application.signed` for this event. |
| metadata  | object | Includes information about the webhook event. See the Metadata section below. |
| data      | object | The payload in the webhook event that contains the core information. See the Event Data section below. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId       | string | Unique ID of the webhook event. |
| created       | number | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| retryAttempt  | number | Number of retry attempts made for the webhook event. |
| webhookEventId| string | Unique ID of the webhook event. |

#### Event Data
| Parameter       | Type   | Description                                                                                     |
|-----------------|--------|-------------------------------------------------------------------------------------------------|
| applicationId   | string | Unique identifier for the specific merchant application.                                        |
| applicationStatus | string | Indicates the current status of the application. For this particular event, the status is `APPLICATION_SIGNED`. |
| corporateId     | string | A unique ID representing the corporate entity of the merchant in the onboarding process.        |
| companyName     | string | The official legal name under which the merchant's organization is registered.                  |

### Complete Payload Example
```json
{
  "eventType": "application.signed",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_SIGNED",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return an HTTP `200 OK` status code to acknowledge successful receipt of the webhook.
- Failure to return a `200 OK` status code will trigger retry attempts.
- The endpoint should respond within 30 seconds to avoid timeouts.

### Best Practices
- Implement idempotency to prevent duplicate processing of the same event. Use the `eventId` from the `metadata` to track processed events.
- Log all webhook events for auditing and debugging purposes.
- Implement robust error handling to gracefully handle unexpected data or processing errors.
- Verify the authenticity of the webhook using a shared secret or other verification mechanism.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook/application-signed', (req, res) => {
  const event = req.body;

  // Verify the event type
  if (event.eventType === 'application.signed') {
    // Extract data
    const eventId = event.metadata.eventId;
    const applicationId = event.data.applicationId;
    const applicationStatus = event.data.applicationStatus;
    const corporateId = event.data.corporateId;
    const companyName = event.data.companyName;

    // Log the event
    console.log(`Received Application Signed event for application ${applicationId}, event ID: ${eventId}`);

    // Process the event data (e.g., update your database)
    // Implement idempotency check here using eventId
    // Example: check if eventId exists in processed events database, and skip if it does.

    // Acknowledge receipt
    res.status(200).send('OK');
  } else {
    // Invalid event type
    console.log(`Received unexpected event type: ${event.eventType}`);
    res.status(400).send('Bad Request: Invalid event type');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook listener listening at http://localhost:${port}`);
});
```

## Notes
- Surfboard will attempt to deliver messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Ensure your endpoint can handle potential delays in receiving the event due to retry attempts.
- Use the `applicationId` to uniquely identify the merchant application within your system.
- The `applicationStatus` will always be `APPLICATION_SIGNED` for this particular webhook event.

---
