# Generate Product Catalog from Images

## Overview
Generate product catalog data with images and menu information from existing image data. Use this API to extract structured product information from menu images or catalog photos, automatically creating product listings with descriptions and pricing.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /catalog/ai/scan
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
| `imgData` | `array` | Yes | Array of image URLs or base64 encoded image data to process. |
| `imageType` | `array` | Yes | Array of image file types corresponding to the imgData array (e.g., 'png', 'jpg'). |

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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing extracted menu and product information. |
| &nbsp;&nbsp;&nbsp;&nbsp;`menuData` | `array` | Array of extracted product/menu items with their details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the product or menu item. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description of the product or menu item. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`sellingPrice` | `string` | Price of the product or menu item. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Currency code for the price (e.g., '840' for USD). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`category` | `string` | Category classification of the product or menu item. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`image` | `string` | URL of the generated or associated product image. |
| `message` | `string` | A message that describes the status of the request. |

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
