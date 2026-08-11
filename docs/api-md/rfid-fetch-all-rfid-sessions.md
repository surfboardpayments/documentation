# Fetch All RFID Sessions

## Overview
Retrieves all RFID reading sessions for the specified terminal.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId/sessions
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalId` | `string` | Yes | Identifier supplied in the URL path. |

### Pagination

This endpoint is paginated using request and response headers, not query parameters. Send the `x-page-number` request header to select the page (defaults to 1 when omitted). Each response returns the `x-total-items` header (total number of sessions) and the `x-page-number` header (the page that was served).

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |
| `X-Page-Number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /terminals/:terminalId/sessions
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Outcome of the request. |
| `data` | `array` | List of RFID reading sessions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sessionId` | `string` | Unique identifier of the RFID reading session. |
| &nbsp;&nbsp;&nbsp;&nbsp;`action` | `string` | The action the session performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mode` | `string` | The read mode used for the session. |
| `message` | `string` | Human-readable result message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "sessionId": "rfid_8267defa6150700b48",
      "action": "start",
      "mode": "single"
    }
  ],
  "message": "Fetched all NFC reading sessions under terminal."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

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
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
