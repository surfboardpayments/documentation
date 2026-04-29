# Add Receipt Information

## Overview
This API allows you to store cash register details for receipts.

## Prerequisites
- You need a valid `orderId` to identify the transaction to associate the receipt with.
- Authentication is required via API Key and API Secret.
- A valid `MERCHANT-ID` is also required.

## Request

### HTTP Method and URL
```
PUT /receipts/:orderId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| sequenceNumber | string | Yes | Receipt Sequence Number. |
| cashRegisterName | string | Yes | Cash Register Designation. |
| controlUnitSerialNumber | string | Yes | Control unit manufacturing number or Control System manufacturing number. |
| cashierName | string | No | Name of the cashier. |
| customerName | string | No | Name of the customer. |

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
| status | string | Status of the request 'SUCCESS' | 'ERROR'. |
| message | string | Status message of the request is displayed. |

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
**Description:** The request body is malformed or missing required fields. Ensure all required parameters are present and valid.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is incorrect. Verify your credentials.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Forbidden: Insufficient permissions."
}
```
**Description:** The provided MERCHANT-ID does not have the necessary permissions to access this endpoint.

#### 404 - Not Found
```json
{
    "status": "ERROR",
    "message": "Order not found."
}
```
**Description:** The specified `orderId` does not exist. Verify the `orderId`.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "An unexpected error occurred."
}
```
**Description:** An internal server error occurred while processing the request. Retry the request later. If the problem persists, contact support.

## Notes
- Ensure the `orderId` in the URL path corresponds to an existing order in the system.
- The combination of `sequenceNumber`, `cashRegisterName`, and `controlUnitSerialNumber` should be unique. Duplicates may lead to errors or overwrites.
- It is recommended to include `cashierName` and `customerName` for more comprehensive receipt data.

---
