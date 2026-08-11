# Generate Product Images

## Overview
Generate AI-powered product images based on product name, custom prompts, and specifications. Use this API to create professional product images that enhance your product catalog and marketing materials.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /catalog/ai/image
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `productName` | `string` | Yes | Name of the product for which to generate images. |
| `prompt` | `string` | No | Custom prompt describing the desired image characteristics and style. |
| `noOfImages` | `number` | No | Number of images to generate for the product. |
| `langCode` | `string` | Yes | Language code for image generation context (e.g., 'en' for English). |

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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing the generated image paths. |
| &nbsp;&nbsp;&nbsp;&nbsp;`imagePath` | `array` | Array of URLs pointing to the generated product images. |
| `message` | `string` | A message that describes the status of the request. |

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
  "message": "Failed to process request"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.

---
