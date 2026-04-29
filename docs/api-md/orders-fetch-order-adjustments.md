# Fetch Order Adjustments

## Overview
Fetch all adjustments created under an order.

## Prerequisites
- A valid `orderId` is required.
- Authentication is required using `API-KEY`, `API-SECRET` and `MERCHANT-ID` headers.
- `startDate` and `endDate` query parameters must be in `yyyy-mm-dd` format.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/adjustments
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| startDate | string | Yes | Start date of the range in yyyy-mm-dd format. |
| endDate | string | Yes | End date of the range in yyyy-mm-dd format. |

### Request Example
```
GET /orders/ORDER_ID_HERE/adjustments?startDate=2024-01-01&endDate=2024-01-31
Headers:
{
  "Content-Type": "application/json",
  "API-KEY": "YOUR_API_KEY",
  "API-SECRET": "YOUR_API_SECRET",
  "MERCHANT-ID": "YOUR_MERCHANT_ID"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | array | Response data containing an array of adjustments. |
| data.adjustmentId | String | Adjustment ID of the adjustment. |
| data.adjustmentType | String | Type of the adjustment |
| data.amount | Number | Amount of the adjustment. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"adjustmentId": "81efdbe975ebc800ff",
			"adjustmentType": "tips",
			"amount": "100"
		}
	],
	"message": "Adjustments fetched successfully"
}
```

## Error Responses

### Possible Errors
There were no error examples given in the source data, so no error responses are available to document.

## Notes
- This endpoint supports pagination (although details were not provided in the source JSON data).
- Replace `ORDER_ID_HERE` in the request example with the actual order ID.
- Ensure the `startDate` and `endDate` are in `yyyy-mm-dd` format.
---
