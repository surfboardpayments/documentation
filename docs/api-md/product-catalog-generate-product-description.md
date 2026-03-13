# Generate Product Description

## Overview
Generate AI-powered product descriptions based on product name, word length, and language preferences. Use this API to create compelling, professional product descriptions that enhance your product listings and improve customer engagement.

## Prerequisites
- Access to the Product Catalog API.
- Authentication is required via `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
POST catalog/ai/description
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*No query parameters are applicable for this endpoint.*

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| productName | string | Yes | Name of the product for which to generate the description. |
| maxWordLength | number | No | Maximum number of words for the generated description. |
| langCode | string | No | Language code for the description generation (e.g., 'en' for English). |

### Request Example
```json
{
	"productName": "Addidas Running Shoes",
	"maxWordLength": 150,
	"langCode": "en"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing the generated description. |
| data.description | string | AI-generated product description. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"description": "Unleash your peak performance with Adidas running shoes, meticulously engineered for speed, comfort, and endurance. Experience the revolutionary boost midsole technology that returns energy with every stride, propelling you forward effortlessly. The lightweight, breathable upper ensures optimal ventilation, keeping your feet cool and dry even during intense workouts. Designed with a precision fit, these shoes offer exceptional support and stability, reducing the risk of injury and enhancing your natural gait. Whether you're a seasoned marathoner or a casual jogger, Adidas running shoes provide the perfect blend of innovation and style. Conquer your goals and shatter your personal bests with the ultimate running companion. Step into a world of unparalleled performance and elevate your running experience with Adidas."
	},
	"message": "Description generated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs when the request body contains invalid data or is missing required parameters.  Ensure that the `productName` is provided and the data types are correct. Check for any typos in the request body.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Unauthorized access. Invalid API key or secret."
}
```
**Description:** This error indicates that the provided `API-KEY` or `API-SECRET` are incorrect or missing. Verify your API credentials and include them in the request headers.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error signifies a problem on the server-side. Retry the request after some time. If the issue persists, contact support.

## Notes
- Ensure to handle potential errors gracefully in your application.
- The quality of the generated description depends on the input provided in the `productName` parameter.
- `maxWordLength` and `langCode` are optional and will use default values if not provided.
---
