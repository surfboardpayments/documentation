```markdown
# Application Started

## Overview
This event is triggered once the merchant has started filling out the application.

## Prerequisites
- A configured webhook endpoint to receive the event.
- The application onboarding process must be initiated.
- No specific authentication requirements beyond standard webhook security measures.
- No additional configuration is required to receive this event once the webhook is set up.

## Event Details

### Event Type
```
application.started
```

### When This Event is Triggered
This webhook event is triggered immediately after a merchant begins the application process. It signifies the initial step in the onboarding journey where the merchant starts entering their business information.

## Webhook Payload

### Payload Structure
The webhook payload consists of three main parts: `eventType`, `metadata`, and `data`. `eventType` specifies the type of event, `metadata` contains information about the event itself, and `data` contains the core information related to the merchant application.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event.  For this event, the value is `application.started`. |
| metadata  | object | Includes information about the webhook event such as the event ID, timestamp, retry attempt number, and the specific webhook event ID. |
| data      | object | The payload in the webhook event that contains the core information related to the merchant application. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId | string | Unique ID of the webhook event. |
| created | number | Timestamp (in milliseconds) at which the event was created. |
| retryAttempt | number | Number of retry attempts made for the webhook event. |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| applicationId | string | Unique identifier for the specific merchant application. |
| applicationStatus | string | Indicates the current status of the application. For this particular event, the status is `APPLICATION_INITIATED`. |
| corporateId | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| companyName | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.started",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_INITIATED",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a `200 OK` HTTP status code to acknowledge receipt of the webhook.
- The endpoint should respond within a reasonable timeframe (e.g., under 5 seconds) to prevent timeouts and potential retry attempts.
- If the request times out or returns a non-200 status code, Surfboard will attempt to post the message three times.

### Best Practices
- Implement robust error handling to gracefully handle unexpected data or processing issues.
- Use the `eventId` or `webhookEventId` to ensure idempotency in your processing logic to avoid duplicate processing of the same event.
- Log webhook events and errors for auditing and debugging purposes.

## Example Implementation

### Endpoint Setup
```javascript
// Example webhook endpoint handler
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/webhook/application-started', (req, res) => {
  const eventData = req.body;

  // Log the event
  console.log('Received application.started event:', JSON.stringify(eventData, null, 2));

  // Process the event data (e.g., store in database, trigger other actions)
  try {
    // Example: Store the application ID
    const applicationId = eventData.data.applicationId;
    console.log(`Application started with ID: ${applicationId}`);

    // Respond with 200 OK
    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook'); // Or other appropriate error code.
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook listener running on port ${port}`);
});
```

## Notes
Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts. Ensure your endpoint can handle potential retry attempts using the event ID for idempotency. The `created` timestamp is in milliseconds since the Unix epoch.
```