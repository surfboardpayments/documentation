# Email Receipt

## Overview
Use this API to send payment receipts to the required email address.

## Prerequisites
- A valid Transaction ID, Payment ID, or Order ID is required.
- You need a valid API Key, API Secret and Merchant ID to use this endpoint.
- The email address must be a valid email format.

## Request

### HTTP Method and URL
```
PUT /receipts/:id/email
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| email | String | Yes | Email address to which the receipt should be delivered. |

### Request Example
```json
{
  "email": "integrations@surfboard.se"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| message | string | A message that describes the status of the email receipt request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Email Sent"
}
```

## Error Responses

### Possible Errors
There are no error responses specified in the source data, assuming typical HTTP errors may occur.

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body"
}
```
**Description:** The request body is malformed or missing required fields. Verify the request body and ensure it conforms to the expected schema.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key"
}
```
**Description:** The provided API key is invalid or missing. Ensure that the correct API key is used in the header.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found"
}
```
**Description:** The specified Transaction, Payment or Order ID was not found. Verify that the ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error"
}
```
**Description:** An unexpected error occurred on the server. Try again later. If the problem persists, contact support.

## Notes
- The `:id` in the URL supports Transaction, Payment, and Order IDs.
---
