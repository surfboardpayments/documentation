# Fetch Promotion by ID

## Overview
The Fetch Promotion by ID API retrieves detailed information about a specific promotion using its unique promotion ID.

## Prerequisites
- API Key and Secret are required for authentication.
- Merchant ID is required to identify the merchant.
- The Store ID is required to identify the store.
- The Promotion ID is required to identify the specific promotion.

## Request

### HTTP Method and URL
```
GET /merchants/:mId/stores/:sId/promotions/:promotionId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Response data |
| data.promotionId | string | Unique identifier of the promotion. **Required**. |
| data.merchantId | string | Unique identifier of the merchant associated with the promotion. **Required**. |
| data.name | string | Name of the promotion. **Required**. |
| data.title | string | Title of the promotion. **Required**. |
| data.description | string | Description of the promotion. **Required**. |
| data.storeId | string | Unique identifier of the store where the promotion is running. **Required**. |
| data.assetUrl | string | URL of the promotion image. **Required**. |
| data.endProduct | string | Product ID associated with the promotion. **Required**. |
| data.buttonLabel | string | Label for the action button in the promotion. **Required**. |
| data.startDate | string | Start date of the promotion in ISO 8601 format. **Required**. |
| data.endDate | string | End date of the promotion in ISO 8601 format. **Required**. |
| data.priority | string | Priority of the promotion, where lower numbers represent higher priority. **Required**. |
| data.assetOpacity | string | Opacity of the promotion image, ranging from 0 (fully transparent) to 1 (fully opaque). |
| data.backgroundColor | string | Background color for the promotion, in hex format. |
| data.contentTextColor | string | Text color for the promotion content, in hex format. |
| data.endProductUrl | string | URL of the product linked to the promotion. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"promotionId": "ca_UROCd1qJl9RX0tqiK0Ai5",
		"name": "Slash sale",
		"title": "First Promotion - test",
		"description": "Slash sale on all fruits",
		"storeId": "82895887ae0b900e0f",
		"assetUrl": "https://www.surfpayapp.com/hubfs/connect/surfpay_checkout-companion.png",
		"endProduct": "12345",
		"buttonLabel": "Click",
		"startDate": "2025-05-05T00:00:00.000Z",
		"endDate": "2027-05-05T00:00:00.000Z",
		"priority": "1",
		"assetOpacity": "0",
		"backgroundColor": "#a1a1aa",
		"contentTextColor": "#78716c",
		"endProductUrl": "https://www.timestamp-converter.com/"
	},
	"message": "Promotion For The Given Promotion ID Fetched Successfully"
}
```

## Error Responses

### Possible Errors
N/A - No error response examples provided in source JSON.

## Notes
This API endpoint is marked as `comingSoon: true`. It may not be available for use yet.

---
