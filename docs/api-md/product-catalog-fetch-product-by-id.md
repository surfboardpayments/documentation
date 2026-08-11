# Fetch Product by Id

## Overview
This API allows you to retrieve a specific product by its ID.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.
- The resource identified by `productId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products/:productId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `catalogId` | `string` | Yes | Identifier supplied in the URL path. |
| `productId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters
Pass the mandatory `storeId` query parameter as a string to fetch a specific product by its ID.

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /catalog/:catalogId/products/:productId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing the product details. |
| &nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | Unique identifier of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sellingPrice` | `number` | Selling price of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Currency code for the product price. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`category` | `string` | Category of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`popularity` | `number` | Popularity score of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`unit` | `string` | Unit of measurement for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`hsnCode` | `string` | HSN code of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`barcode` | `string` | Barcode of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`unitType` | `string` | Unit type of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`attributeValues` | `array` | Array of attribute values for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeKey` | `string` | Key of the attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`displayName` | `string` | Display name of the attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`value` | `string` | Value of the attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tax` | `array` | Array of tax information for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type of tax. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | Tax percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Tax amount, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productImages` | `array` | Image URLs for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productProperties` | `object` | Free-form key/value properties describing the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`inventory` | `object` | Current stock information for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`relatedProducts` | `array` | Identifiers of products tagged as related to this product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`pricingPlans` | `array` | Recurring pricing plans available for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`distributors` | `array` | Distributors that supply the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`campaignInfo` | `array` | Active campaigns on the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`variants` | `array` | Variants of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | Free-form key/value metadata attached to the product. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "id": "838bfc15a601800901",
    "name": "Test Product",
    "sellingPrice": 14900,
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
        "percentage": "25",
        "amount": 0
      }
    ],
    "productImages": [],
    "productProperties": {},
    "inventory": {},
    "relatedProducts": [],
    "campaignInfo": [],
    "variants": []
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
  "message": "Failed to process request"
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

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
