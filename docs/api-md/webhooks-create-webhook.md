# Create Webhook

## Overview
Register a new webhook so Surfboard can deliver events to your endpoint. Supply the HTTPS URL to deliver to, a display name, the event types to subscribe to, and an email to alert on repeated delivery failures. The response returns the new webhook's identifier and the signing certificate you use to verify that incoming deliveries came from Surfboard. Send the `MERCHANT-ID` header to manage a specific merchant's webhooks; omit it to manage the partner's own webhooks.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /webhooks
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhookUrl` | `string` | Yes | The HTTPS endpoint Surfboard should deliver events to. |
| `webhookName` | `string` | Yes | A display name for the webhook, used to identify it in listings. |
| `events` | `array` | Yes | The event types to subscribe this webhook to. |
| `alertEmail` | `string` | Yes | Email address to notify when webhook delivery repeatedly fails. |

### Request Example
```json
{
  "webhookUrl": "https://example.com/surfboard/webhook",
  "webhookName": "Order events",
  "events": [
    "PAYMENT_SUCCEEDED",
    "PAYMENT_FAILED"
  ],
  "alertEmail": "integrations@surfboard.se"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Details of the created webhook. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webhookId` | `string` | Unique identifier of the newly created webhook. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webhookCertificate` | `string` | Signing certificate used to verify that deliveries to your endpoint originated from Surfboard. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tested` | `boolean` | Whether the webhook has passed a delivery test against its endpoint. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "webhookId": "wh_9c1f2a7b40",
    "webhookCertificate": "-----BEGIN CERTIFICATE-----\nMIIB...snip...IDAQAB\n-----END CERTIFICATE-----",
    "tested": false
  },
  "message": "Webhook created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to create webhook. Please try again later"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.

---
