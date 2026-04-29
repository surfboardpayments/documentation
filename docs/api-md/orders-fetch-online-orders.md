# Fetch Online Orders

## Overview
This API retrieves a list of all online orders created under a terminal.

## Prerequisites
- A terminal ID is required to identify the terminal for which orders should be fetched.
- Authentication is required via API Key, API Secret, and Merchant ID.

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

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body for GET requests
```

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
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentPageUrl` | `string` | This is the URL of the payment page.  |
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
      "paymentPageUrl": "https://pay.beta.surfboard.se/825a37cb9e2048070b?pi=w60wGmUUE-k5XN1iT1RyYo-TzaiUl8wsIyO9IEZf4KE-wmDDnl-cxJ4IWkhnCqRvuk6P1WRPDaZP23_LevN0G5JqG_hDgZI9dEn4ooF3ELZMUHiE-ocL_LGc4nT1Cbuv&add=IzNDMkEyMSB8Q0FSRA=="
    },
    {
      "orderId": "825a37ca1e20480e0b",
      "status": "PENDING",
      "terminalId": "825a376eeed1200604",
      "totalOrderAmount": "450",
      "currency": "SEK",
      "paymentPageUrl": "https://pay.beta.surfboard.se/825a37ca1e20480e0b?pi=gav_crJ4iqayHI05XyMgNdVbTW78QmRMJGm5QFaN0vCvydZfzw8_KQ9j5dd90Yf-OLEq72cpN905QNRXGVki4jxdmvDTPoW8RTNFIC_TPqiCcV80rdpXIuR1Tw6El8PI&add=IzNDMkEyMSB8Q0FSRA=="
    }
  ],
  "message": "Fetched online orders Successfully."
}
```

## Error Responses

### Possible Errors

#### [400] - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid terminal ID provided."
}
```
**Description:** The terminal ID provided in the request is not valid or does not exist. Ensure the terminal ID is correct and try again.

#### [401] - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the request headers is invalid. Verify your API credentials and ensure they are correctly set in the request headers.

#### [403] - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant ID not authorized to access this terminal."
}
```
**Description:** The Merchant ID does not have permission to access the specified terminal. Check the assigned terminal list under the merchant account.

#### [500] - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred while processing the request."
}
```
**Description:** An unexpected error occurred on the server. Contact support with the request details for further investigation.

## Notes
-  The `paymentPageUrl` is a unique URL generated for each order and can be used to redirect the customer to the payment page.
-  The `terminalId` in the path parameter should correspond to the terminal for which online orders are to be fetched.
-  Always include all required headers in every request.
---
