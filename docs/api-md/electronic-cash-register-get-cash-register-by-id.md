# Get Cash Register by ID

## Overview
Retrieve the full cash-register record, including its control-unit details, identified by the :cashRegisterId path parameter.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.
- The resource identified by `cashRegisterId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/cash-register/:cashRegisterId
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
GET /merchants/:merchantId/stores/:storeId/cash-register/:cashRegisterId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterId` | `string` | Cash register identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterName` | `string` | Name of the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`activationDate` | `string` | Date the cash register was activated. |
| &nbsp;&nbsp;&nbsp;&nbsp;`closingTime` | `string` | Configured automatic closing time for the register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`designation` | `string` | Designation of the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`modelOrProgram` | `string` | Model or program of the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `string` | Address associated with the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `array` | Email addresses configured to receive this register's reports. |
| &nbsp;&nbsp;&nbsp;&nbsp;`controlUnitAddress` | `string` | Address of the paired fiscal control unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`controlUnitManufacturer` | `string` | Manufacturer of the control unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`controlUnitType` | `string` | Type of the control unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`controlUnitModel` | `string` | Model of the control unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`controlUnitSerialNumber` | `string` | Serial number of the paired fiscal control unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`notifications` | `array` | Per-email notification subscriptions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Email address subscribed to the notification. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reports` | `array` | Report types this email receives. |
| `message` | `string` | Response message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "cashRegisterId": "{{cashRegisterId}}",
    "cashRegisterName": "Main Register",
    "activationDate": "2026-04-15",
    "closingTime": "23:00",
    "designation": "Register 1",
    "modelOrProgram": "Surfboard ECR 1.0",
    "address": "Main Street 1, Stockholm",
    "email": [
      "store.manager@example.com"
    ],
    "controlUnitAddress": "Main Street 1, Stockholm",
    "controlUnitManufacturer": "Surfboard",
    "controlUnitType": "SOFTWARE",
    "controlUnitModel": "CU-100",
    "controlUnitSerialNumber": "{{controlUnitSerialNumber}}",
    "notifications": [
      {
        "email": "store.manager@example.com",
        "reports": [
          "Z_REPORT"
        ]
      }
    ]
  },
  "message": "Fetched cash register successfully"
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
