# Add Variant For Product

## Overview
This API allows you to add a variant to an existing product in the product catalog.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.
- The resource identified by `productId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /catalog/:catalogId/products/:productId/variants
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
| `storeId` | `string` | Yes | Unique identifier of the store where the product exists. |
| `variants` | `array` | Yes | Specifications of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Yes | Name of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | No | Description of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`popularity` | `number` | No | Popularity score of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`costPrice` | `number` | No | Cost price of the variant, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sellingPrice` | `number` | No | Selling price of the variant, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | No | It refers to the standardised code used to represent a specific currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productImages` | `array` | No | An array of URLs showcasing the variant images. |
| &nbsp;&nbsp;&nbsp;&nbsp;`baseAttributes` | `array` | No | Variant attribute definitions for the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeLabel` | `string` | Yes | Human-readable label for the attribute, for example Color. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeKey` | `string` | Yes | Machine key for the attribute, for example color. |
| &nbsp;&nbsp;&nbsp;&nbsp;`attributeValues` | `array` | Yes | Use to show the available variants of the products. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeKey` | `string` | Yes | This refers to the category of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`displayName` | `string` | Yes | Name of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`value` | `string` | Yes | Value of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`variantProperties` | `object` | No | Free-form key/value properties describing the variant, such as size, weight or origin. |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | No | Free-form key/value metadata you can attach to the variant for your own use. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "variants": [
    {
      "name": "SurfPad Blue Variant",
      "description": "Blue variant of SurfPad",
      "costPrice": 1000,
      "sellingPrice": 1200,
      "currencyCode": "752",
      "productImages": [
        "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
      ],
      "attributeValues": [
        {
          "attributeKey": "colour",
          "displayName": "blue",
          "value": "#0000FF"
        },
        {
          "attributeKey": "size",
          "displayName": "medium",
          "value": "M"
        }
      ]
    }
  ]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`variants` | `array` | Unique ID of the newly added variants. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "variants": [
      "81c319b6c7d2080807"
    ]
  },
  "message": "Variants added successfully"
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
