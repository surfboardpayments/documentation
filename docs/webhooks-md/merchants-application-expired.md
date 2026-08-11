# Application Expired

## Overview
This event is triggered when the merchant application has reached its expiration. For the continuation of the onboarding process, a new application must be created for the merchant.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Ensure your endpoint is publicly accessible and can handle HTTPS requests.
- Authentication/Verification: Your endpoint must be able to verify the authenticity of the webhook. (Details of the authentication method depend on Surfboard's configuration.)
- Ensure the merchant application exists and has reached its expiration date.

## Event Details

### Event Type
```
application.expired
```

### When This Event is Triggered
This event is triggered immediately after a merchant application has reached its defined expiration date and is no longer valid for further processing.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing event metadata and the core data related to the expired application.

### Payload Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event. Value is `application.expired`. |
| metadata | object | Includes information about the webhook event. |
| data | object | The payload containing the core information about the expired merchant application. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp (in milliseconds) at which the event was created. |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| webhookEventId | string | Unique ID of the webhook event within Surfboard. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| applicationId | string | Unique identifier for the specific merchant application. |
| applicationStatus | string | Indicates the current status of the application. Value is `APPLICATION_EXPIRED`. |
| corporateId | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| companyName | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.expired",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_EXPIRED",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return an HTTP 200 OK status code to acknowledge receipt of the webhook.
- Timeout: Your endpoint should respond within 10 seconds.
- Retry logic: Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to handle potential duplicate webhook deliveries. Use the `eventId` from the `metadata` to track processed events.
- Implement robust error handling and logging to identify and address any issues.
- Verify the `eventType` to ensure you are processing the correct event.

## Example Implementation

### Endpoint Setup
```javascript
// Example webhook endpoint handler (Node.js with Express)
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook/application-expired', (req, res) => {
  const eventData = req.body;

  // 1. Verify the event type
  if (eventData.eventType !== 'application.expired') {
    console.warn('Received unexpected event type:', eventData.eventType);
    return res.status(400).send('Invalid event type');
  }

  // 2. Implement idempotency check (example using a simple in-memory set)
  if (processedEvents.has(eventData.metadata.eventId)) {
    console.log('Duplicate event received:', eventData.metadata.eventId);
    return res.status(200).send('OK - Duplicate event'); // Still return 200 OK
  }

  // 3. Process the event data
  try {
    console.log('Processing application expired event:', eventData);
    // Your business logic here (e.g., update database, trigger notifications)
    processedEvents.add(eventData.metadata.eventId); // Mark event as processed
  } catch (error) {
    console.error('Error processing event:', error);
    return res.status(500).send('Internal Server Error');
  }

  // 4. Return a 200 OK status
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// In-memory set to track processed events (replace with a persistent store in production)
const processedEvents = new Set();
```

## Notes
- Ensure your endpoint handles potential network issues and implements appropriate retry mechanisms on your end if necessary.
- Surfboard will attempt to redeliver the webhook based on its internal retry policy if your endpoint returns an error code (other than 200 OK).
- The `corporateId` can be used to link the expired application to the appropriate merchant record in your system.
- Note the timestamp in milliseconds since Epoch for the `created` field.

---
