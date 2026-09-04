# Online Store Onboarded

## Overview
This event is triggered when an online store is approved for online payment acceptance. Once this event is received, the store can start accepting online payments.

## Prerequisites
- Webhook endpoint must be set up to receive POST requests over HTTPS.
- Subscribe the webhook to the `online.store.onboarded` event in the developer console (or via the webhooks API).
- Verify the authenticity of each delivery using the `x-webhook-signature` header (HMAC-SHA512 of the raw request body, keyed with your webhook certificate).

## Event Details

### Event Type
```
online.store.onboarded
```

### When This Event is Triggered
This event is triggered when a store's online onboarding completes and the store is approved for online payment acceptance — after the store has been created (or updated) with its online details (webshop URL, terms and conditions, privacy policy) and the review is approved.

## Webhook Payload

### Payload Structure
The webhook payload consists of three main parts: `eventType`, `metadata`, and `data`. The `data` block identifies the onboarded store and its merchant.

### Payload Parameters

| Parameter | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| eventType | string | Denotes the category of the webhook event.    |
| metadata  | object | Includes information about the webhook event. |
| data      | object | Identifiers of the onboarded store.           |

#### Metadata

| Parameter       | Type   | Description                                                                                                                                                                      |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventId         | string | Unique ID of the webhook event.                                                                                                                                                  |
| created         | number | Timestamp at which the event was created.                                                                                                                                        |
| retryAttempt    | number | Number of retry attempts made for the webhook event. Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts. |
| originalCreated | number | Timestamp of the very first time the event was published.                                                                                                                        |
| webhookEventId  | string | Unique ID of the webhook event.                                                                                                                                                  |

#### Event Data

| Parameter  | Type   | Description                                                     |
|------------|--------|-----------------------------------------------------------------|
| storeId    | string | Unique identifier of the store that was approved for online payments. |
| merchantId | string | Unique identifier of the merchant that the store belongs to.   |

### Complete Payload Example
```json
{
  "eventType": "online.store.onboarded",
  "metadata": {
    "eventId": "8455ba8da5ccb077ff",
    "created": 1786449563660,
    "retryAttempt": 0,
    "originalCreated": 1786449563660,
    "webhookEventId": "8455ba8da304b008ff"
  },
  "data": {
    "storeId": "8455ba3225ccb00f0f",
    "merchantId": "842d872c7b99b00c0e"
  }
}
```

## Handling This Webhook

### Response Requirements
- Your endpoint should return a 2xx HTTP status code to acknowledge receipt of the webhook event.
- If the endpoint does not return a 2xx status code, Surfboard will retry the event.
- Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts.

### Best Practices
- Implement idempotency using `metadata.eventId` as the key — the same event may be delivered more than once across retries.
- Use this event as the signal that the store can start accepting online payments, instead of polling the store APIs.
- Process webhooks asynchronously to avoid blocking the response and causing timeouts or retries.

## Notes
- The store's online terminals are auto-registered as part of online onboarding, so `terminal.online.registered` events typically follow this event for the same store.

---
