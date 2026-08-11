# Fetch Order Adjustments

## Overview
Fetch all adjustments created under an order.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `orderId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/adjustments
```

### Query Parameters
To fetch adjustments made under a certain date range send in <span class='font-semibold'>startDate</span> and <span class='font-semibold'>endDate</span> as query params

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
| `startDate` | `string` | No | Start of the date range to filter adjustments by, in yyyy-mm-dd format. Applied only when endDate is also sent. |
| `endDate` | `string` | No | End of the date range to filter adjustments by, in yyyy-mm-dd format. Applied only when startDate is also sent. |

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `array` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustmentId` | `string` | Adjustment ID of the adjustment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `string` | Transaction the adjustment is associated with. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Order the adjustment belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustmentType` | `string` | Type of the adjustment |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Amount of the adjustment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | Currency of the adjustment amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | Free-form metadata for the adjustment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | Timestamp when the adjustment was created. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "adjustmentId": "81efdbe975ebc800ff",
      "transactionId": "8267defa6150700b48",
      "orderId": "82674cfdf77f500001",
      "adjustmentType": "tips",
      "amount": 100,
      "currency": "SEK",
      "metadata": {},
      "createdAt": "2026-06-22T07:39:02.812Z"
    }
  ],
  "message": "Adjustments fetched successfully"
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
- The `orderId` is part of the URL path and must be a valid identifier.
- This endpoint supports pagination via the `page` and `size` query parameters.

---
