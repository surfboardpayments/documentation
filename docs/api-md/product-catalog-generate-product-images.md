# Generate Product Images

## Overview
Generate AI-powered product images based on product name, custom prompts, and specifications. Use this API to create professional product images that enhance your product catalog and marketing materials.

## Prerequisites
- A valid merchant account with API access.
- Ensure your API key and secret are correctly configured.
- You must have a product name and language code to generate an image.

## Request

### HTTP Method and URL
```
POST catalog/ai/image
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
| Parameter | Type | Required | Description |
|---|---|---|---|
| productName | string | Yes | Name of the product for which to generate images. |
| prompt | string | No | Custom prompt describing the desired image characteristics and style. |
| noOfImages | number | No | Number of images to generate for the product. |
| langCode | string | Yes | Language code for image generation context (e.g., 'en' for English). |

### Request Example
```json
{
	"productName": "Gaming Laptop",
	"prompt": "sleek modern design with RGB lighting",
	"noOfImages": 3,
	"langCode": "en"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing the generated image paths. |
| data.imagePath | array | Array of URLs pointing to the generated product images. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"imagePath": [
			"https://storage.googleapis.com/sb-merchant-portal-ai-images/8113d3f8403b380409%2Fm_iWGri3XAyTmkbKYsYtV47%2Fadidas_t_shirt%2Fadidas_t_shirt_custom_prompt_09_08_2025_07_44_18_1.png",
			"https://storage.googleapis.com/sb-merchant-portal-ai-images/8113d3f8403b380409%2Fm_iWGri3XAyTmkbKYsYtV47%2Fadidas_t_shirt%2Fadidas_t_shirt_custom_prompt_09_08_2025_07_44_18_2.png"
		]
	},
	"message": "Images generated successfully"
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
**Description:** The request body is missing required fields or contains invalid data types. Ensure all required parameters are present and of the correct type.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Invalid API key or secret."
}
```
**Description:** The provided API key or secret is incorrect or missing. Verify your API credentials.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "Image generation failed."
}
```
**Description:** An unexpected error occurred during image generation. Try again later, and if the issue persists, contact support.

## Notes
- The quality of the generated images depends on the clarity and specificity of the `prompt`.
- The number of images generated might be less than the requested number if the AI model encounters issues.
- Ensure the `langCode` is valid and supported to get accurate image generation results.

---
