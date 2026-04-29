# Fetch Product by Id

## Overview
This API allows you to retrieve a specific product by its ID.

## Prerequisites
- You need a valid `catalogId` and `productId` to fetch the product.
- You must have a valid `storeId` to access this endpoint.
- Authentication via API Key and Secret is required.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products/:productId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | Yes | The unique identifier for the store. |

### Request Body Parameters
N/A

### Request Example
```json
{
    // No request body is required for GET requests.  Only query parameters and headers are needed.
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing the product details. |
| data.id | string | Unique identifier of the product. |
| data.name | string | Name of the product. |
| data.sellingPrice | number | Selling price of the product. |
| data.currencyCode | string | Currency code for the product price. |
| data.description | string | Description of the product. |
| data.category | string | Category of the product. |
| data.popularity | number | Popularity score of the product. |
| data.unit | string | Unit of measurement for the product. |
| data.hsnCode | string | HSN code of the product. |
| data.barcode | string | Barcode of the product. |
| data.type | string | Type of the product. |
| data.unitType | string | Unit type of the product. |
| data.attributeValues | array | Array of attribute values for the product. |
| data.attributeValues[].attributeKey | string | Key of the attribute. |
| data.attributeValues[].displayName | string | Display name of the attribute. |
| data.attributeValues[].value | string | Value of the attribute. |
| data.tax | array | Array of tax information for the product. |
| data.tax[].type | string | Type of tax. |
| data.tax[].percentage | string | Tax percentage. |
| data.tax[].amount | number | Tax amount. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"id": "838bfc15a601800901",
		"name": "Test Product",
		"sellingPrice": 149,
		"currencyCode": "752",
		"description": "Sitter som en smäck",
		"category": "TERMINAL",
		"popularity": 0,
		"unit": "nos",
		"hsnCode": "",
		"barcode": "",
		"type": "PRODUCT",
		"unitType": "FIXED_UNIT",
		"attributeValues": [
			{
				"attributeKey": "storlek",
				"displayName": "Storlek XL",
				"value": "XL"
			}
		],
		"tax": [
			{
				"type": "VAT",
				"percentage": "3",
				"amount": 0
			}
		]
	},
	"message": "Products fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid storeId provided."
}
```
**Description:** This error occurs when the `storeId` query parameter is missing or invalid. Ensure the `storeId` is a valid string.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Product not found."
}
```
**Description:** This error occurs when the product with the specified `productId` does not exist in the catalog associated with the `catalogId`. Ensure the `productId` and `catalogId` are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a server-side problem. Try again later. If the problem persists, contact support.

## Notes
- Remember to replace `YOUR_API_KEY`, `YOUR_API_SECRET`, and `YOUR_MERCHANT_ID` with your actual credentials.
- The `catalogId` and `productId` should be URL encoded if they contain special characters.
- Ensure that the `storeId` is a valid ID associated with your account.

---
