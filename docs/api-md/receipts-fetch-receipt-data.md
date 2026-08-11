# Fetch Receipt Data

## Overview
Fetch the raw receipt data for a completed transaction. Use this when you want to print the receipt yourself or render your own digital receipt.

## Prerequisites
- An active partner account is required.
- Authentication is required using API Key and API Secret.
- The resource identified by `id` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /receipts/:id
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
GET /receipts/:id
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | The receipt payload for the transaction. Includes at least the fields below, plus line items, totals, and payment/fiscal details. |
| &nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | Transaction identifier the receipt belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Transaction amount, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | ISO 4217 currency code of the transaction. |
| `message` | `string` | Human-facing status message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "id": "{{transactionId}}",
    "amount": 1000,
    "currency": "SEK"
  },
  "message": "Receipt data fetched successfully."
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
