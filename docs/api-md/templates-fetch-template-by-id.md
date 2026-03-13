# Fetch Template by ID

## Overview
This API retrieves the details of a specific POS template using its ID.

## Prerequisites
- A valid merchant ID and store ID are required.
- A valid template ID must be provided.
- API Key and API Secret authentication are required.
- Ensure the POS template exists.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:sId/templates/:templateId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*No query parameters for this endpoint.*

### Request Body Parameters
*No request body parameters for this endpoint.*

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
| status | string | Status of the request. |
| data | object | Response data. |
| data.templateId | string | The unique identifier of the newly created POS template. |
| data.userId | string | Unique identifier of the user who created the POS template. |
| data.paymentMethodOrder | array | Array of preferred payment methods that will be displayed on the POS system in the order of preference. |
| data.name | string | Name or label for the POS template. |
| data.productsPerPage | number | Number of products to be displayed per page in the POS template. |
| data.product | array | Product categories and their order. |
| data.product.category | string | Category of the product. |
| data.product.productOrder | array | Array of product IDs in the preferred order. |
| data.autoSet | array | Array of time intervals during which certain automatic settings or actions should be applied. |
| data.autoSet.start | string | Start time for the interval. |
| data.autoSet.end | string | End time for the interval. |
| data.terminal | object | Terminal information for the POS template. |
| data.terminal.primaryTerminal | string | ID of the primary terminal to be used. |
| data.terminal.secondaryTerminal | string | ID of the secondary terminal to be used. |
| data.terminal.terminalOrder | array | Array of terminal IDs in the preferred order. |
| data.metaData | object | Additional metadata for the POS template as key-value pairs. |
| data.deleted | boolean | Denotes whether the template was deleted or not. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"templateId": "8267defa6150700b48",
		"userId": "u_EArLulLMogC6b-9e9Gci0",
		"name": "SurfboardString",
		"terminalOrder": {
			"terminalOrder": [
				"82674beadf0f700405"
			],
			"primaryTerminal": "82674beadf0f700405",
			"secondaryTerminal": null
		},
		"categoryOrder": null,
		"productOrder": [
			{
				"category": "electronics",
				"productOrder": [
					"82674cfdf77f500001",
					"82674cfdf77f500001"
				]
			}
		],
		"paymentMethodOrder": [
			"SWISH"
		],
		"autoSet": [
			{
				"start": "06:00",
				"end": "09:00"
			},
			{
				"start": "11:00",
				"end": "18:00"
			}
		],
		"deleted": false,
		"metadata": {
			"we": "do",
			"do": "we"
		}
	},
	"message": "Template Data fetched successfully for the template id [8267defa6150700b48]"
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
**Description:** This error occurs if the request parameters are invalid, such as missing required fields or incorrect data types.  Ensure all required parameters are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** This error indicates that the API key or secret is invalid or missing. Verify the API key and secret and include them in the request headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Template not found."
}
```
**Description:** This error indicates that the template with the provided ID does not exist. Verify that the template ID is correct and that the template exists in the system.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates that an unexpected error occurred on the server.  Try the request again later. If the problem persists, contact support.

## Notes
- The `terminalOrder`, `categoryOrder`, `productOrder`, `paymentMethodOrder`, and `autoSet` fields within the `data` object can be null. This indicates that no specific order or settings have been defined for the template.
- The `metadata` field in `data` is an open key-value object, allowing for custom data to be stored alongside the template.
- Ensure the `merchantId`, `sId` and `templateId` parameters in the endpoint URL are replaced with the actual corresponding values.

---
