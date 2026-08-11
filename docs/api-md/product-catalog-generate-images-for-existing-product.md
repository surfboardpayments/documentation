# Generate Images for Existing Product

## Overview
Generate AI-created images for a product that already exists in a catalog. The product name and details are read from the catalog; supply an optional prompt to steer the style and the number of images to produce.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.
- The resource identified by `productId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /catalog/:catalogId/products/:productId/ai/image
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `catalogId` | `string` | Yes | Identifier supplied in the URL path. |
| `productId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `prompt` | `string` | No | Optional prompt describing the desired look and style of the images. |
| `noOfImages` | `number` | No | Number of images to generate. |
| `langCode` | `string` | No | Language context for image generation (e.g. 'en' for English). |

### Request Example
```json
{
  "prompt": "sleek modern product shot on a white background",
  "noOfImages": 2,
  "langCode": "en"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The generated images. |
| &nbsp;&nbsp;&nbsp;&nbsp;`imagePath` | `array` | URLs pointing to the generated product images. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "imagePath": [
      "https://storage.googleapis.com/sb-merchant-portal-ai-images/example_1.png",
      "https://storage.googleapis.com/sb-merchant-portal-ai-images/example_2.png"
    ]
  },
  "message": "Image generated successfully"
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

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

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
- The `catalogId` is part of the URL path and must be a valid identifier.
- The `productId` is part of the URL path and must be a valid identifier.

---
