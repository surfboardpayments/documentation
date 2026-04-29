# Add Variant For Product

## Overview
This API allows you to add a variant to an existing product in the product catalog.

## Prerequisites
- Store must exist.
- Product must exist in the catalog specified by `catalogId` and `productId`.
- Authentication is required using API Key and API Secret.
- The merchant must be identified using their `MERCHANT-ID`.

## Request

### HTTP Method and URL
```
POST /catalog/:catalogId/products/:productId/variants
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
| storeId | string | Yes | Unique identifier of the store where the product exists. |
| variants | array | Yes | Specifications of the product variants. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].name | string | Yes | Name of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].description | string | No | Description of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].costPrice | number | No | Cost price of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].sellingPrice | number | No | Selling price of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].currencyCode | string | No | It refers to the standardised code used to represent a specific currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].hsnCode | string | No | A 6-digit uniform code that classifies for the known variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].barCode | string | No | A 6-digit uniform code that identifies the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].productImages | array | No | An array of URLs showcasing the variant images. |
| &nbsp;&nbsp;&nbsp;&nbsp;variants[].attributeValues | array | Yes | Use to show the available variants of the products. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variants[].attributeValues[].attributeKey | string | Yes | This refers to the category of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variants[].attributeValues[].displayName | string | Yes | Name of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variants[].attributeValues[].value | string | Yes | Value of the variant. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "variants": [
    {
      "name": "SurfPad Blue Variant",
      "description": "Blue variant of SurfPad",
      "costPrice": 10,
      "sellingPrice": 12,
      "currencyCode": "752",
      "productImages": [
        "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
      ],
      "hsnCode": "123453",
      "barCode": "1212123454323",
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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;data.variants | array | Unique ID of the newly added variants. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "variants": ["81c319b6c7d2080807"]
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
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required fields. Ensure the request body is valid JSON and includes all mandatory parameters.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Product not found."
}
```
**Description:** The specified product does not exist. Verify the `catalogId` and `productId` are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error."
}
```
**Description:** An unexpected error occurred on the server. Try again later. If the problem persists, contact support.

## Notes
- Ensure the `storeId` corresponds to a valid store.
- The `attributeKey` in `attributeValues` should be a predefined attribute key.
- The API returns the newly created variant IDs in the response.

---
