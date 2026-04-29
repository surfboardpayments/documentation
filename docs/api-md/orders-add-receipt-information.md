# Add Receipt Information

## Overview
This API allows you to store cash register details for receipts.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The order with the given `orderId` must exist.

## Request

### HTTP Method and URL
```
PUT /orders/:orderId/receipt
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `sequenceNumber` | `string` | Yes | Receipt Sequence Number. |
| `cashRegisterName` | `string` | Yes | Cash Register Designation. |
| `controlUnitSerialNumber` | `string` | Yes | Control unit manufacturing number or Control System manufacturing number. |
| `cashierName` | `string` | No | Name of the cashier. |
| `customerName` | `string` | No | Name of the customer. |

### Request Example
```json
{
  "sequenceNumber": "1234567",
  "cashRegisterName": "Test",
  "controlUnitSerialNumber": "1234567",
  "cashierName": "Amanda",
  "customerName": "Tom"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. Possible values: `SUCCESS`, `ERROR`. |
| `message` | `string` | Status message of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Receipt data updated successfully."
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
**Description:** Authentication failed. Ensure the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
    "status": "ERROR",
    "message": "Order not found."
}
```
**Description:** The specified `orderId` does not exist. Verify the order ID and try again.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server.  Try the request again later.  If the problem persists, contact support.

## Notes
- The `orderId` is part of the URL path and must be a valid order identifier.
- Providing correct `controlUnitSerialNumber` and `cashRegisterName` values might be a legal requirement in some jurisdictions.

---
