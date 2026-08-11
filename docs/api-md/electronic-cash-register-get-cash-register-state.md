# Get Cash Register State

## Overview
Retrieve the current state of a cash register, including its active shift, identified by the :cashRegisterId path parameter.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.
- The resource identified by `cashRegisterId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/cash-register/:cashRegisterId/state-info
```

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/stores/:storeId/cash-register/:cashRegisterId/state-info
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterState` | `string` | Current lifecycle state of the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterId` | `string` | Cash register identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterName` | `string` | Name of the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Currency in which the register operates. |
| &nbsp;&nbsp;&nbsp;&nbsp;`shiftInfo` | `object` | Current or most recent shift information. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`shiftNumber` | `number` | Shift number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`shiftState` | `string` | Current state of the shift. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cashierName` | `string` | Name of the cashier. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`shiftOpenedAt` | `string` | Timestamp when the shift started. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`shiftClosedAt` | `string` | Timestamp when the shift was closed. |
| &nbsp;&nbsp;&nbsp;&nbsp;`pettyCash` | `number` | Current petty-cash balance held in the register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`openedAt` | `string` | Timestamp when the register was opened. |
| &nbsp;&nbsp;&nbsp;&nbsp;`closedAt` | `string` | Timestamp when the register was closed. |
| `message` | `string` | Response message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "cashRegisterState": "CASH_REGISTER_OPEN",
    "cashRegisterId": "{{cashRegisterId}}",
    "cashRegisterName": "Main Register",
    "currencyCode": "SEK",
    "shiftInfo": {
      "shiftNumber": 1,
      "shiftState": "SHIFT_OPEN",
      "cashierName": "John Doe",
      "shiftOpenedAt": "2026-04-15T12:00:00Z",
      "shiftClosedAt": null
    },
    "pettyCash": 5000,
    "openedAt": "2026-04-15T08:00:00Z",
    "closedAt": null
  },
  "message": "Fetched cash register state successfully"
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
**Description:** Authentication failed. Ensure the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are correctly set and valid for your account.

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
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.
- The `cashRegisterId` is part of the URL path and must be a valid identifier.

---
