# Update Webhook

## Overview
Update a webhook's configuration. Supply the webhook identifier in the path and include only the fields you want to change; any field you omit is left untouched. Use this to point a webhook at a new URL, rename it, change the alert email, or adjust which events it is subscribed to. Send the `MERCHANT-ID` header to manage a specific merchant's webhooks; omit it to manage the partner's own webhooks.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `webhookId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /webhooks/:webhookId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhookId` | `string` | Yes | Identifier of the webhook to update, supplied in the URL path. |

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
| `webhookUrl` | `string` | No | New HTTPS endpoint to deliver events to. Omit to leave unchanged. |
| `webhookName` | `string` | No | New display name for the webhook. Omit to leave unchanged. |
| `alertEmail` | `string` | No | New email address to notify on repeated delivery failures. Omit to leave unchanged. |
| `events` | `array` | No | New set of event types to subscribe the webhook to. Omit to leave unchanged. |

### Request Example
```json
{
  "webhookName": "Order and refund events",
  "events": [
    "PAYMENT_SUCCEEDED",
    "PAYMENT_FAILED",
    "REFUND_SUCCEEDED"
  ]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Webhook updated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to update webhook. Please try again later"
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

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

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
- The `webhookId` is part of the URL path and must be a valid identifier.

---
