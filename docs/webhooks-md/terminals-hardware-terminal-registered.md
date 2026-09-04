# Hardware Terminal Registered

## Overview
This event is triggered when a physical payment terminal, such as a Surfpad or other Surfboard hardware device, is registered under a store.

## Prerequisites
- Webhook endpoint must be set up to receive POST requests over HTTPS.
- Subscribe the webhook to the `terminal.hardware.registered` event in the developer console (or via the webhooks API).
- Verify the authenticity of each delivery using the `x-webhook-signature` header (HMAC-SHA512 of the raw request body, keyed with your webhook certificate).

## Event Details

### Event Type
```
terminal.hardware.registered
```

### When This Event is Triggered
This event is triggered when a physical payment terminal is registered to a merchant's store — for example when a device is claimed with the registration code it displays, or registered via the device registration API.

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
  "eventType": "terminal.hardware.registered",
  "metadata": {
    "eventId": "8455bc02d51e3822ff",
    "created": 1786449701122,
    "retryAttempt": 0,
    "originalCreated": 1786449701122,
    "webhookEventId": "8455bc0311f0b002ff"
  },
  "data": {
    "terminalId": "8455bc02851e380404",
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
- The payload is identifiers-only by design: call `GET /terminals/{terminalId}` if your integration needs the terminal's name, serial number, model, or status.
- Process webhooks asynchronously to avoid blocking the response and causing timeouts or retries.

## Notes
- Separate events exist per terminal category: `terminal.online.registered`, `terminal.softpos.registered`, and `terminal.hardware.registered` — the event name alone tells you what kind of terminal was registered.
- This event covers payment terminals only; peripheral devices such as printers do not produce a registration webhook.

---
