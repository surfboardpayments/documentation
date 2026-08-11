# Update Scheduled Close Time

## Overview
Update the scheduled close time for a cash-register. Sending a closing time sets the shift close type to CUSTOM, the default is 00:00 local time. The register is identified by the :cashRegisterId path parameter.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.
- The resource identified by `cashRegisterId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/stores/:storeId/cash-register/:cashRegisterId/closing-time
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
| `closingTime` | `string` | Yes | New automatic closing time; sending it sets the shift close type to CUSTOM. |

### Request Example
```json
{
  "closingTime": "23:00"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterId` | `string` | Cash register identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;`newClosingTime` | `string` | Closing time now configured for the register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`shiftCloseType` | `string` | Close type that was applied (CUSTOM). |
| &nbsp;&nbsp;&nbsp;&nbsp;`scheduledClosingTime` | `string` | Next scheduled automatic close, when applicable. |
| `message` | `string` | Response message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "cashRegisterId": "{{cashRegisterId}}",
    "newClosingTime": "23:00",
    "shiftCloseType": "CUSTOM",
    "scheduledClosingTime": "2026-04-16T23:00:00Z"
  },
  "message": "Cash register closing time updated successfully"
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
- The `cashRegisterId` is part of the URL path and must be a valid identifier.

---
