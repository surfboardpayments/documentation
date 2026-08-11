# Get Related Products

## Overview
Retrieve the products that have been tagged as related to a given product, for example accessories or recommended pairings shown alongside it.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.
- The resource identified by `productId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products/:productId/related-products
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `catalogId` | `string` | Yes | Identifier supplied in the URL path. |
| `productId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /catalog/:catalogId/products/:productId/related-products
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The product and its related products. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Identifier of the product the related products belong to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`relatedProducts` | `array` | The products tagged as related. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | Unique identifier of the related product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the related product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description of the related product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`sellingPrice` | `number` | Selling price of the related product, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Currency the price is expressed in. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productImages` | `array` | Image URLs for the related product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Whether the related item is a PRODUCT or a SERVICE. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "productId": "81c30d16df28880301",
    "relatedProducts": [
      {
        "id": "818f9fc43d0b580f01",
        "name": "SurfPad Charging Dock",
        "description": "Charging dock for the SurfPad terminal",
        "sellingPrice": 1200,
        "currencyCode": "752",
        "productImages": [
          "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
        ],
        "type": "PRODUCT"
      }
    ]
  },
  "message": "Related products fetched successfully"
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
