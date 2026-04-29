# Application Rejected

## Overview
This event is triggered post-processing when the merchant application doesn't meet the necessary criteria and is subsequently rejected by Surfboard.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Webhook endpoint URL must be configured in the Surfboard dashboard.
- Ensure your endpoint can handle JSON payloads.
- Implement proper authentication/verification mechanism (e.g., API key validation, signature verification) to secure your webhook endpoint.

## Event Details

### Event Type
```
application.rejected
```

### When This Event is Triggered
This event is triggered immediately after a merchant application is reviewed and does not meet the necessary acceptance criteria, resulting in the application being rejected within the Surfboard system.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing the `eventType`, `metadata`, and `data` properties. The `metadata` property contains information about the event itself, and the `data` property contains information about the rejected merchant application.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event.  In this case, `application.rejected`. |
| metadata | object | Includes information about the webhook event. See the Metadata section for details. |
| data | object | Contains core information about the rejected merchant application. See the Event Data section for details. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp at which the event was created (Unix epoch milliseconds). |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| webhookEventId | string | Unique ID of the specific webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| applicationId | string | Unique identifier for the specific merchant application. |
| applicationStatus | string | Indicates the current status of the application. For this event, the value will always be `APPLICATION_REJECTED`. |
| corporateId | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| companyName | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.rejected",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_REJECTED",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a `200 OK` status code to acknowledge successful receipt of the webhook.
- Any other status code (e.g., `500 Internal Server Error`) will be interpreted as a failure, and Surfboard will attempt to retry the webhook.
- Ensure your endpoint can process the request within a reasonable timeframe (e.g., 30 seconds) to avoid timeouts.

### Best Practices
- Implement idempotency to prevent duplicate processing of the same event. Use the `eventId` in the `metadata` object as an idempotency key.
- Log all received webhook events for auditing and debugging purposes.
- Implement robust error handling to gracefully handle unexpected errors.
- Validate the data in the webhook payload before processing it.
- Asynchronously process the webhook payload to avoid blocking the request thread.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook/application_rejected', (req, res) => {
  const eventType = req.body.eventType;
  const metadata = req.body.metadata;
  const data = req.body.data;

  // Implement idempotency check using metadata.eventId
  const eventId = metadata.eventId;
  // Check if eventId has already been processed

  // Process the webhook event
  console.log('Received application.rejected event:', JSON.stringify(req.body));
  console.log('Application ID:', data.applicationId);
  console.log('Company Name:', data.companyName);

  // Return 200 OK to acknowledge receipt
  res.status(200).send('OK');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Ensure your system can handle potential delays caused by retry attempts.
- Use `metadata.retryAttempt` to track the number of attempts for each event. This can assist in debugging or alerting to persistent failures.

---
