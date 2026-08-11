# Fetch Online Orders

## Overview
This API retrieves a list of all online orders created under a terminal.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /orders/:terminalId/online
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `array` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Id of the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Status of the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Id of the payment terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalOrderAmount` | `string` | Total order value. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | Type of currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentPageUrl` | `string` | This is the URL of the payment page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`nonceId` | `string` | Single-use identifier issued for the order's online payment session. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "orderId": "825a37cb9e2048070b",
      "status": "PENDING",
      "terminalId": "825a376eeed1200604",
      "totalOrderAmount": "450",
      "currency": "SEK",
      "paymentPageUrl": "https://pay.beta.surfboard.se/825a37cb9e2048070b?pi=w60wGmUUE-k5XN1iT1RyYo-TzaiUl8wsIyO9IEZf4KE-wmDDnl-cxJ4IWkhnCqRvuk6P1WRPDaZP23_LevN0G5JqG_hDgZI9dEn4ooF3ELZMUHiE-ocL_LGc4nT1Cbuv&add=IzNDMkEyMSB8Q0FSRA==",
      "nonceId": "825a37cd2f1048090c"
    },
    {
      "orderId": "825a37ca1e20480e0b",
      "status": "PENDING",
      "terminalId": "825a376eeed1200604",
      "totalOrderAmount": "450",
      "currency": "SEK",
      "paymentPageUrl": "https://pay.beta.surfboard.se/825a37ca1e20480e0b?pi=gav_crJ4iqayHI05XyMgNdVbTW78QmRMJGm5QFaN0vCvydZfzw8_KQ9j5dd90Yf-OLEq72cpN905QNRXGVki4jxdmvDTPoW8RTNFIC_TPqiCcV80rdpXIuR1Tw6El8PI&add=IzNDMkEyMSB8Q0FSRA==",
      "nonceId": "825a37cb6e10480f0d"
    }
  ],
  "message": "Fetched online orders successfully."
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
- The `terminalId` is part of the URL path and must be a valid identifier.

---
