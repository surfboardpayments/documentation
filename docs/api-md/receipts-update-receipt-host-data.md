# Update Receipt Host Data

## Overview
Legacy. Update order data that Surfboard does not hold but that the receipt needs. Superseded by Add Receipt Data.

## Prerequisites
- An active partner account is required.
- Authentication is required using API Key and API Secret.
- The resource identified by `orderId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /receipts/:orderId
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
| `merchantId` | `string` | No | Identifier of the merchant. |
| `sequenceNumber` | `string` | No | Sequence number of the receipt from your system. |
| `cashRegisterName` | `string` | No | Name of the cash register that produced the receipt. |
| `controlUnitSerialNumber` | `string` | No | Serial number of the control unit used. |
| `cashierName` | `string` | No | Name of the cashier who handled the transaction. |
| `customerName` | `string` | No | Name of the customer. |

### Request Example
```json
{
  "merchantId": "{{merchantId}}",
  "sequenceNumber": "1042",
  "cashRegisterName": "Register 1",
  "controlUnitSerialNumber": "CU-123456",
  "cashierName": "Alex",
  "customerName": "Sam Smith"
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
  "message": "Receipt host data updated successfully."
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
- The `orderId` is part of the URL path and must be a valid identifier.

---
