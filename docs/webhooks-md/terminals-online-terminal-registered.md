# Online Terminal Registered

## Overview
This event is triggered when an online terminal is registered under a store. Online terminals cover the hosted payment page, self-hosted (SDK) integrations, iFrame, and merchant-initiated interfaces.

## Prerequisites
- Webhook endpoint must be set up to receive POST requests over HTTPS.
- Subscribe the webhook to the `terminal.online.registered` event in the developer console (or via the webhooks API).
- Verify the authenticity of each delivery using the `x-webhook-signature` header (HMAC-SHA512 of the raw request body, keyed with your webhook certificate).

## Event Details

### Event Type
```
terminal.online.registered
```

### When This Event is Triggered
This event is triggered when an online terminal is registered under a merchant's store — typically as part of online store onboarding, when the store's online terminals are created and become available for online payment acceptance.

## Webhook Payload

### Payload Structure
The webhook payload consists of three main parts: `eventType`, `metadata`, and `data`. The `data` block carries identifiers only — fetch the terminal from `GET /terminals/{terminalId}` when you need its details.

### Payload Parameters

| Parameter | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| eventType | string | Denotes the category of the webhook event.    |
| metadata  | object | Includes information about the webhook event. |
| data      | object | Identifiers of the registered terminal.       |

#### Metadata

| Parameter       | Type   | Description                                                                                                                                                                      |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventId         | string | Unique ID of the webhook event.                                                                                                                                                  |
| created         | number | Timestamp at which the event was created.                                                                                                                                        |
| retryAttempt    | number | Number of retry attempts made for the webhook event. Surfboard will attempt to post messages three times in case of failures, with a delay of 5 minutes between the first and second attempts, and a delay of 10 minutes between the second and third attempts. |
| originalCreated | number | Timestamp of the very first time the event was published.                                                                                                                        |
| webhookEventId  | string | Unique ID of the webhook event.                                                                                                                                                  |

#### Event Data

| Parameter  | Type   | Description                                              |
|------------|--------|----------------------------------------------------------|
| terminalId | string | Unique identifier of the registered terminal.            |
| merchantId | string | Unique identifier of the merchant that the terminal belongs to. |
| storeId    | string | Unique identifier of the store the terminal is registered under. |

### Complete Payload Example
```json
{
  "eventType": "terminal.online.registered",
  "metadata": {
    "eventId": "8455ba8e6d1d584dff",
    "created": 1786449564082,
    "retryAttempt": 0,
    "originalCreated": 1786449564082,
    "webhookEventId": "8455ba8e2304b000ff"
  },
  "data": {
    "terminalId": "8455ba8ded1d580204",
    "merchantId": "842d872c7b99b00c0e",
    "storeId": "8455ba3225ccb00f0f"
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
- The payload is identifiers-only by design: call `GET /terminals/{terminalId}` if your integration needs the terminal's name, status, or configuration.
- Process webhooks asynchronously to avoid blocking the response and causing timeouts or retries.

## Notes
- Separate events exist per terminal category: `terminal.online.registered`, `terminal.softpos.registered`, and `terminal.hardware.registered` — the event name alone tells you what kind of terminal was registered.
- Online terminals are commonly auto-registered during online store onboarding, so this event often follows an `online.store.onboarded` event for the same store.

---
