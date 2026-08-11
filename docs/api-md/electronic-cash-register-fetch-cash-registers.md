# Fetch Cash Registers

## Overview
Retrieve all cash registers associated with a merchant. This API is useful for verifying registered cash registers and fetching their details.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/cash-register
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
GET /merchants/:merchantId/cash-register
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `array` | Array of cash register objects. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterId` | `string` | Unique identifier of the cash register. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Store identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Associated terminal (may be null if not yet assigned). |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Merchant identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterName` | `string` | Name of the cash register. |
| `message` | `string` | Response message. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "cashRegisterId": "{{cashRegisterId}}",
      "storeId": "{{storeId}}",
      "terminalId": "{{terminalId}}",
      "merchantId": "{{merchantId}}",
      "cashRegisterName": "Main Register"
    }
  ],
  "message": "Cash registers fetched successfully"
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

---
