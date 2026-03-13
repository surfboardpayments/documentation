# Generate Product Catalog from Images

## Overview
Generate product catalog data with images and menu information from existing image data. Use this API to extract structured product information from menu images or catalog photos, automatically creating product listings with descriptions and pricing.

## Prerequisites
- You need a valid API key and secret.
- You need a valid Merchant ID.
- Ensure your image URLs are publicly accessible, or provide base64 encoded image data.

## Request

### HTTP Method and URL
```
POST catalog/ai/scan
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| imgData | array | Yes | Array of image URLs or base64 encoded image data to process. |
| imageType | array | Yes | Array of image file types corresponding to the imgData array (e.g., 'png', 'jpg'). |

### Request Example
```json
{
	"imgData": [
		"https://storage.googleapis.com/sb-merchant-portal-ai-images/testMerchant/TestMenu/menu01.png"
	],
	"imageType": [
		"png"
	]
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing extracted menu and product information. |
| data.menuData | array | Array of extracted product/menu items with their details.  This is an array of arrays, where each inner array represents a set of products extracted from a single image. |
| data.menuData[].name | string | Name of the product or menu item. |
| data.menuData[].description | string | Description of the product or menu item. |
| data.menuData[].sellingPrice | string | Price of the product or menu item. |
| data.menuData[].currencyCode | string | Currency code for the price (e.g., '840' for USD). |
| data.menuData[].category | string | Category classification of the product or menu item. |
| data.menuData[].image | string | URL of the generated or associated product image. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"menuData": [
			[
				{
					"name": "The Junior",
					"description": "Two eggs any way, your choice of bacon, sausage, or ham, and coffee or tea.",
					"sellingPrice": "8.50",
					"currencyCode": "840",
					"category": "Breakfast Mains",
					"image": "https://storage.googleapis.com/sb-merchant-portal-ai-images/8113d3f8403b380409%2Fm_iWGri3XAyTmkbKYsYtV47%2Fthe_junior%2Fthe_junior_custom_prompt_09_08_2025_07_45_53_1.png"
				},
				{
					"name": "Buttermilk or Buckwheat Pancakes",
					"description": "Fluffy pancakes with a choice of bacon or maple sausage.",
					"sellingPrice": "8.00",
					"currencyCode": "840",
					"category": "Breakfast Mains",
					"image": "https://storage.googleapis.com/sb-merchant-portal-ai-images/8113d3f8403b380409%2Fm_iWGri3XAyTmkbKYsYtV47%2Fbuttermilk_or_buckwheat_pancakes%2Fbuttermilk_or_buckwheat_pancakes_custom_prompt_09_08_2025_07_45_52_1.png"
				}
			]
		]
	},
	"message": "Menu data extracted successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid input data."
}
```
**Description:** The request body is malformed or missing required fields. Verify that the `imgData` and `imageType` arrays are present and contain valid data. Ensure the `imageType` array matches the number of images given.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is invalid or missing. Double-check your credentials and ensure they are correctly included in the request headers.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred during processing. This could be due to a temporary issue with the server.  Retry the request after a few minutes. If the issue persists, contact support.

## Notes
- The `menuData` is an array of arrays. The outer array represents different sets of products from different images if you send multiple images. The inner arrays each contain a list of products found in a single image.
- Ensure the number of elements in `imgData` and `imageType` arrays are the same.
- Consider the size of the images being passed, extremely large images can cause timeouts.
---