# Activate Webhook

## Overview
Activate a webhook against a specific environment so it begins receiving events. Supply the webhook identifier in the path and the target environment in the body. Use this once your endpoint is ready to accept live deliveries. Send the `MERCHANT-ID` header to manage a specific merchant's webhooks; omit it to manage the partner's own webhooks.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `webhookId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /webhooks/:webhookId/activate
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhookId` | `string` | Yes | Identifier of the webhook to activate, supplied in the URL path. |

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
| `type` | `string` | Yes | Environment to activate the webhook in. Possible values: `DEMO`, `LIVE`. |

### Request Example
```json
{
  "type": "LIVE"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Details of the activated webhook. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webhookId` | `string` | Identifier of the activated webhook. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "webhookId": "wh_9c1f2a7b40"
  },
  "message": "Webhook activated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to activate webhook. Please try again later"
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
