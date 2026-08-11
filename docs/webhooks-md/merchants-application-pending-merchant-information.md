# Application Pending Merchant Information

## Overview
This event is triggered when the application is being processed but requires additional data from the merchant for completion.

## Prerequisites
- Webhook endpoint must be configured to receive POST requests.
- Ensure your endpoint is publicly accessible and can handle HTTPS requests.
- Authentication/Verification: Implement a mechanism to verify the authenticity of the webhook. This could involve checking a shared secret, verifying a signature, or using mutual TLS.
- Configure the Surfboard platform to send webhooks to your specified endpoint.
- Ensure your endpoint has sufficient capacity to handle the expected volume of webhook events.

## Event Details

### Event Type
```
application.pendingMerchantInformation
```

### When This Event is Triggered
This event is triggered specifically when a merchant application has been submitted but is missing required information. The application process is paused, and the merchant needs to provide the necessary details to proceed.

## Webhook Payload

### Payload Structure
The webhook payload is a JSON object containing event metadata and application data.

### Payload Parameters

| Parameter | Type | Description |
|---|---|---|
| `eventType` | string | Denotes the category of the webhook event. |
| `metadata` | object | Includes information about the webhook event such as the unique event ID, timestamp, retry attempts, and webhook event ID. |
| `data` | object | The payload in the webhook event that contains the core application information. |

#### Metadata
| Parameter | Type | Description |
|---|---|---|
| `eventId` | string | Unique ID of the webhook event. |
| `created` | number | Timestamp at which the event was created (Unix timestamp in milliseconds). |
| `retryAttempt` | number | Number of retry attempts made for the webhook event. |
| `webhookEventId` | string | Unique ID of the webhook event. |

#### Event Data
| Parameter | Type | Description |
|---|---|---|
| `applicationId` | string | Unique identifier for the specific merchant application. |
| `applicationStatus` | string | Indicates the current status of the application. For this particular event, the status is `APPLICATION_PENDING_INFORMATION`. |
| `corporateId` | string | A unique ID representing the corporate entity of the merchant in the onboarding process. |
| `companyName` | string | The official legal name under which the merchant's organization is registered. |

### Complete Payload Example
```json
{
  "eventType": "application.pendingMerchantInformation",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "applicationStatus": "APPLICATION_PENDING_INFORMATION",
    "corporateId": "12345678901",
    "companyName": "Surfboard"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return an HTTP 200 OK status code to acknowledge receipt of the webhook.
- A timeout of 10 seconds is recommended for processing the webhook and returning a response.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency to prevent duplicate processing of the same event. Use the `eventId` from the `metadata` to track processed events.
- Implement robust error handling to catch and log any exceptions that occur during webhook processing.
- Use asynchronous processing to avoid blocking the webhook endpoint and ensure timely acknowledgment of the event.
- Validate the webhook payload to ensure data integrity and prevent unexpected errors.

## Example Implementation

### Endpoint Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook/merchant-application', (req, res) => {
  const event = req.body;

  // Log the event
  console.log('Received webhook event:', JSON.stringify(event, null, 2));

  // Check event type
  if (event.eventType === 'application.pendingMerchantInformation') {
    // Process the application pending information event
    const applicationId = event.data.applicationId;
    const corporateId = event.data.corporateId;
    const companyName = event.data.companyName;

    console.log(`Application ${applicationId} pending information for corporate ${corporateId} (${companyName})`);

    // Acknowledge the webhook event
    res.status(200).send('OK');
  } else {
    console.log(`Received unknown event type: ${event.eventType}`);
    res.status(200).send('OK'); // Still acknowledge, but log
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
```

## Notes
- Ensure your system can handle potential delays in webhook delivery.
- The `retryAttempt` field in the metadata can be used to track the number of times Surfboard has attempted to deliver the event. This can be useful for debugging purposes.
- Store the `eventId` in your database to ensure idempotency. Check if the `eventId` already exists before processing the event.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

---
