# Print ESC/POS Receipt

## Overview
Send raw ESC/POS commands (base64-encoded) to a terminal for printing. This endpoint takes a terminal ID in the path, not a receipt or transaction ID.

## Prerequisites
- An active partner account is required.
- Authentication is required using API Key and API Secret.
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /receipts/:terminalId/escpos
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `escposCommands` | `string` | Yes | Base64-encoded ESC/POS byte stream to send to the printer. The decoded payload must start with the ESC byte (0x1B). Maximum 100,000 base64 characters per call. |

### Request Example
```json
{
  "escposCommands": "G0A="
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `message` | `string` | Human-facing status message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "ESC/POS commands sent to the terminal successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
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
- The `terminalId` is part of the URL path and must be a valid identifier.

---
