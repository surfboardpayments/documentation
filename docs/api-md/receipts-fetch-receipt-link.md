```markdown
# Fetch Receipt Link

## Overview
This API allows you to retrieve a direct URL link to the receipt for a particular transaction.

## Prerequisites
- You need a valid `API-KEY` and `API-SECRET`.
- You need a valid `MERCHANT-ID`.
- The `:id` in the URL supports Transaction, Payment, and Order IDs.

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
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
*(None)*

### Request Body Parameters
*(None)*

### Request Example
```json
{
  // No request body for GET requests
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. Possible values: `SUCCESS` or `ERROR`. |
| `data` | `object` | Response data containing the receipt URL. |
| `data.receiptURL` | `string` | The URL link to access the receipt for a specific transaction. |
| `message` | `string` | A message that describes the status of the receipt URL request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "receiptURL": "https://surfreceipts.com/831895dac6d240060b"
  },
  "message": "Receipt URL fetched successfully."
}
```

## Error Responses

*(No error response examples provided in the JSON data.  Assuming some potential errors)*

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid ID format."
}
```
**Description:** The provided ID is not in the correct format (e.g., not a valid UUID). Verify the ID format and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key."
}
```
**Description:** The API key is invalid or missing. Ensure the `API-KEY` header is present and contains a valid key.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Invalid API secret."
}
```
**Description:** The API secret is invalid. Ensure the `API-SECRET` header is present and contains the correct secret for the given API key.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Receipt not found for the given ID."
}
```
**Description:**  No receipt was found for the specified ID. Verify the ID and ensure a receipt exists for that transaction, payment, or order.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred on the server.  Retry the request after some time. If the problem persists, contact support.

## Notes
- The `:id` path parameter can accept a Transaction ID, Payment ID or Order ID.
---
