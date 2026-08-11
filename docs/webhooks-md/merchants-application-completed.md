# Application Completed

## Overview
This event is triggered when a merchant application has been processed and accepted. The next steps involve merchant creation and onboarding.

## Prerequisites
- Configure a webhook endpoint capable of receiving POST requests.
- Implement authentication/verification mechanisms (e.g., API keys, HMAC signatures) to ensure the authenticity of incoming webhooks. Surfboard recommends validating the `eventId` to ensure uniqueness and prevent replay attacks.
- Ensure your system is configured to receive the `application.completed` event type.

## Event Details

### Event Type
```
application.completed
```

### When This Event is Triggered
This event is triggered when a merchant application has been fully processed and the application status changes to `APPLICATION_COMPLETED`, indicating acceptance.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing `eventType`, `metadata`, and `data`. `eventType` identifies the type of event. `metadata` provides information about the event itself. `data` contains the core information related to the completed application.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventType` | string | Denotes the category of the webhook event.  Value will be `application.completed`. |
| `metadata` | object | Includes information about the webhook event. |
| `data` | object | The payload in the webhook event that contains the core information about the application. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| `eventId` | string | Unique ID of the webhook event.  Use this value to ensure uniqueness and prevent replay attacks. |
| `created` | number | Timestamp (in milliseconds) at which the event was created. |
| `retryAttempt` | number | Number of retry attempts made for the webhook event. |
| `webhookEventId` | string | Unique ID of the webhook event within the Surfboard system. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| `applicationId` | string | Unique identifier for the specific merchant application. |
| `applicationStatus` | string | Indicates the current status of the application. Value will be `APPLICATION_COMPLETED`. |
| `corporateId` | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| `companyName` | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.completed",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_COMPLETED",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return an HTTP `200 OK` status code to acknowledge receipt of the webhook.
- The response body can be empty or contain a simple success message.
- The endpoint should respond within a reasonable timeframe (e.g., under 5 seconds) to avoid timeouts.  Surfboard waits a maximum of 30 seconds for a 200 response before attempting a retry.

### Best Practices
- Implement idempotency to handle potential duplicate webhook deliveries. Use the `eventId` from the `metadata` to track processed events.
- Log all received webhooks for auditing and debugging purposes.
- Implement robust error handling to gracefully handle unexpected data or processing errors.
- Use asynchronous processing to avoid blocking the webhook endpoint and ensure timely responses.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhooks/application-completed', (req, res) => {
  const event = req.body;
  console.log('Received application.completed webhook:', event);

  // Verify the eventId to prevent replay attacks.  You should persist processed eventIds.
  // Example: if (alreadyProcessed(event.metadata.eventId)) { return res.status(200).send(); }

  // Process the application completed event
  // Example: update database, trigger merchant creation, etc.

  // Acknowledge receipt
  res.status(200).send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.
- Implement retry logic in your processing to handle temporary failures or service outages. Consider using a queueing system for reliable processing.
- Ensure that the `corporateId` is valid and corresponds to an existing corporate entity in your system.
- Monitor webhook delivery success rates and investigate any failures promptly.

---
