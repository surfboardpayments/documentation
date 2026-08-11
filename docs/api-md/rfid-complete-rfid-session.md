# Complete RFID Session

## Overview
Completes an active RFID reading session. Optionally provide the final result of the session.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `terminalId` in the URL path must exist.
- The resource identified by `sessionId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /terminals/:terminalId/sessions/:sessionId/complete
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalId` | `string` | Yes | Identifier supplied in the URL path. |
| `sessionId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `result` | `string` | No | The final result to set for the session. When omitted, the session is completed without an explicit result. Possible values: `COMPLETED`, `CANCELLED`, `TIMED_OUT`. |

### Request Example
```json
{
  "result": "COMPLETED"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Outcome of the request. |
| `message` | `string` | Human-readable result message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "NFC reading session completed successfully."
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
- The `terminalId` is part of the URL path and must be a valid identifier.
- The `sessionId` is part of the URL path and must be a valid identifier.

---
