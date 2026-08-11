# Enhance Image

## Overview
Enhance product images using AI-powered image processing. This API takes a product image URL and generates enhanced versions of the image. Choose between STANDARD mode for basic enhancements or SCENE mode for contextual scene generation.

## Prerequisites
- A valid product image URL
- An active account with access to the AI API.
- Authentication via API Key, API Secret and Merchant ID
- Ensure the image URL is publicly accessible.

## Request

### HTTP Method and URL
```
POST /ai/enhance-image
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| productName | string | Yes | Name of the product to provide context for image enhancement. |
| url | string | Yes | URL of the product image to be enhanced. |
| mode | string | Yes | Enhancement mode to apply to the image.  Possible values: `STANDARD`, `SCENE`. |

### Request Example
```json
{
	"productName": "Wireless Bluetooth Headphones",
	"url": "https://example.com/images/product-12345.jpg",
	"mode": "STANDARD"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing enhanced image URLs. |
| data.imageUrls | array | Array of URLs pointing to the enhanced product images. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"imageUrls": [
			"https://cdn.example.com/enhanced/image-abc123-v1.jpg",
			"https://cdn.example.com/enhanced/image-abc123-v2.jpg",
			"https://cdn.example.com/enhanced/image-abc123-v3.jpg"
		]
	},
	"message": "Image enhanced successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Invalid Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid request parameters. Please check your input."
}
```
**Description:** This error occurs when the request body is malformed or missing required parameters. Ensure all required parameters are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API key or secret."
}
```
**Description:** This error occurs when the provided API key or secret are invalid or do not have sufficient permissions. Verify your API credentials and ensure they are correctly configured.

#### 404 - Image Not Found
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Image not found at the provided URL."
}
```
**Description:** The provided image URL could not be found. Ensure the URL is correct and the image is publicly accessible.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a server-side issue. Retry the request after a short delay. If the issue persists, contact support.

## Notes
- The API is rate limited. Please contact support for increasing the rate limit, if needed.
- The processing time may vary depending on the image complexity and the selected mode.
- Ensure the `url` parameter points to a valid and publicly accessible image. The image should be in a format compatible with standard web browsers (e.g., JPEG, PNG).
- Selecting the `SCENE` mode will generate more computationally intensive results, so processing may take longer.
---
