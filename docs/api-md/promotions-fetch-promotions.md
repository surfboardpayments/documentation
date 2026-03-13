# Fetch Promotions

## Overview
The Fetch All Promotions API retrieves detailed information about all the promotional campaigns associated with a specific merchant and store.

## Prerequisites
- You must have a valid API key and secret.
- You must have a valid merchant ID.
- The store associated with the provided store ID must exist for the specified merchant.
- Authentication is required using API Key, API Secret and Merchant ID in the header.

## Request

### HTTP Method and URL
```
GET /merchants/:mId/stores/:sId/promotions
```

### Headers
| Header | Value | Required |
|---|---|---|
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
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET",
    "MERCHANT-ID": "YOUR_MERCHANT_ID"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Response data containing an array of promotion objects. |
| data[].promotionId | string | Unique identifier of the promotion. |
| data[].merchantId | string | Unique identifier of the merchant associated with the promotion. |
| data[].name | string | Name of the promotion. |
| data[].title | string | Title of the promotion. |
| data[].description | string | Description of the promotion. |
| data[].storeId | string | Unique identifier of the store where the promotion is running. |
| data[].assetUrl | string | URL of the promotion image. |
| data[].endProduct | string | Product ID associated with the promotion. |
| data[].buttonLabel | string | Label for the action button in the promotion. |
| data[].startDate | string | Start date of the promotion in ISO 8601 format. |
| data[].endDate | string | End date of the promotion in ISO 8601 format. |
| data[].priority | string | Priority of the promotion, where lower numbers represent higher priority. |
| data[].assetOpacity | string | Opacity of the promotion image, ranging from 0 (fully transparent) to 1 (fully opaque). |
| data[].backgroundColor | string | Background color for the promotion, in hex format. |
| data[].contentTextColor | string | Text color for the promotion content, in hex format. |
| data[].endProductUrl | string | URL of the product linked to the promotion. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
	  {
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
      {
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
	  }
	 ],
	"message": "Promotions fetched successfully"
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
**Description:** This error occurs when one or more of the request parameters are invalid. Check the request and ensure all parameters are correctly formatted and present.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** This error occurs when the API key or secret are invalid or missing.  Ensure that the API key and secret are correctly included in the request headers.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Forbidden: You do not have permission to access this resource."
}
```
**Description:** This error appears when the Merchant ID in the header does not have the correct permissions. Verify that the merchant is entitled to view the promotions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** This error occurs when the specified store ID does not exist for the given merchant. Verify that the store ID is valid and associated with the provided merchant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error."
}
```
**Description:** This error indicates an issue on the server side.  Retry the request after some time. If the error persists, contact the support team.

## Notes
-  Ensure date formats for `startDate` and `endDate` conform to ISO 8601.
-  The `priority` field determines the order in which promotions are displayed, with lower numbers indicating higher priority.
---
