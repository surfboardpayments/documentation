# Withdraw Cash

## Overview
Record a cash withdrawal taken out of the cash register during an active shift.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /merchants/:merchantId/stores/:storeId/cash-register/withdraw
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
| `amount` | `number` | Yes | Amount to withdraw. |
| `terminalId` | `string` | Yes | Terminal / device identifier. |

### Request Example
```json
{
  "amount": 500,
  "terminalId": "{{terminalId}}"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `message` | `string` | Response message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Cash withdrawn successfully"
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
