# Application Initiated

## Overview
This event is triggered when the merchant application is created, and the KYB URL is generated. At this point, the merchant needs to provide the necessary details via the Web KYB.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Webhook endpoint must be accessible by Surfboard.
- Authentication/verification method (if required) must be implemented on the endpoint. No specific Auth details provided in the JSON but your endpoint should have the ability to verify the requests.
- The partner must have initiated the merchant application process.

## Event Details

### Event Type
```
application.initiated
```

### When This Event is Triggered
This event is triggered immediately after a merchant application is successfully created in Surfboard. It signifies the start of the merchant onboarding process and the point at which the KYB (Know Your Business) URL is generated, prompting the merchant to submit their details.

## Webhook Payload

### Payload Structure
The webhook payload consists of three main parameters: `eventType`, `metadata`, and `data`. The `eventType` specifies the type of event, `metadata` provides contextual information about the event itself (like ID and timestamp), and `data` contains the actual information about the merchant application that triggered the event.

### Payload Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| eventType | string | Denotes the category of the webhook event. |
| metadata  | object | Includes information about the webhook event like the unique event ID, the date and time the event was created (timestamp), the number of retry attempts made to send the event, and the specific webhook event ID denoting the type of event. |
| data      | object | The payload in the webhook event that contains the core information or updates being delivered. This is the useful data that recipients can act on. |

#### Metadata
| Parameter | Type | Description |
|-----------|------|-------------|
| eventId       | string | Unique ID of the webhook event. |
| created       | number | Timestamp at which the event was created. |
| retryAttempt  | number | Number of retry attempts made for the webhook event. Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts. |
| webhookEventId | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|-----------|------|-------------|
| applicationId   | string | Unique identifier for the specific merchant application. |
| applicationStatus | string | Indicates the current status of the application. For this particular event, the status is 'APPLICATION_INITIATED'. |
| corporateId     | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| companyName     | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.initiated",
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
- Your endpoint should return a `200 OK` HTTP status code to acknowledge successful receipt and processing of the webhook.
- If the webhook cannot be processed, return a `5xx` error code. Note that Surfboard attempts to post messages three times in case of failures.
- The endpoint should respond within a reasonable timeframe (e.g., under 5 seconds) to avoid timeouts.
- The response body can be empty, but may contain a message detailing acceptance.

### Best Practices
- Implement robust error handling to gracefully handle potential issues with the webhook data.
- Use a queueing system to process webhooks asynchronously, preventing your endpoint from becoming overloaded.
- Implement logging to track webhook events and debug any issues.
- Design your system to be idempotent. The `eventId` from the metadata object can be used to prevent double processing of the same event.

## Example Implementation

### Endpoint Setup
```javascript
// Example webhook endpoint handler (Node.js with Express)
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

app.post('/webhook', (req, res) => {
  const eventData = req.body;
  console.log('Received webhook:', eventData);

  // Process the webhook data (e.g., save to database, trigger other actions)
  // Consider using a queueing system for asynchronous processing

  if (eventData.eventType === 'application.initiated') {
        console.log('Application Initiated event received for Application ID:', eventData.data.applicationId);
        // Add your business logic here.
  }

  // Respond with a 200 OK status code to acknowledge receipt
  res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {
  console.log(`Webhook endpoint listening at http://localhost:${port}`);
});
```

## Notes
- Surfboard will attempt to deliver webhooks up to three times. The retry schedule is: 5 minutes between the first and second attempts, and 10 minutes between the second and third attempts.
- Use the `eventId` from the metadata to ensure idempotency. If you receive the same eventId multiple times, only process it once.
- Specific business logic will depend on how you intend to use the merchant application data. The example code shows basic logging and conditional execution based on `eventType`.
- Ensure your corporateId is safely stored and only used to identify the correct application or corporate.

---
