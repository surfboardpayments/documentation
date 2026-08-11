# Create Cash Register

## Overview
Create a Cash Register for a specific store.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/stores/:storeId/cash-register
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
| `cashRegisterName` | `string` | Yes | Name of the cash register. |
| `deviceId` | `string` | Yes | Terminal / device identifier. |
| `emails` | `array` | No | List of email addresses for notifications. |

### Request Example
```json
{
  "cashRegisterName": "Main Register",
  "deviceId": "{{terminalId}}",
  "emails": [
    "store.manager@example.com"
  ]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegister` | `object` | Cash register details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterId` | `string` | Unique identifier for the cash register. Save this ID as it is required for opening the register and shifts. |
| `message` | `string` | Response message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "cashRegister": {
      "cashRegisterId": "{{cashRegisterId}}"
    }
  },
  "message": "Cash register subscribed successfully"
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

---
