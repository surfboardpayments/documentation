# Fetch Receipt Link

## Overview
Return a shareable link to the digital receipt for a transaction.

## Prerequisites
- An active partner account is required.
- Authentication is required using API Key and API Secret.
- The resource identified by `id` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /receipts/:id/link
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /receipts/:id/link
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Contains the receipt link. |
| &nbsp;&nbsp;&nbsp;&nbsp;`receiptURL` | `string` | Shareable URL of the digital receipt. |
| `message` | `string` | Human-facing status message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "receiptURL": "https://receipt.surfboardpayments.com/{{transactionId}}"
  },
  "message": "Receipt URL fetched successfully."
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
- The `id` is part of the URL path and must be a valid identifier.

---
