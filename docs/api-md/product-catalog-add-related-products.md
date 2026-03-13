# Add Related Products

## Overview
This API helps you to tag the product with other relatable products in the catalog.

## Prerequisites
- A valid product catalog must exist.
- The specified product must exist in the catalog.
- The related products must exist in the catalog.
- Authentication is required using API key, API secret, and Merchant ID.

### Authentication Requirements
- API Key: `API-KEY` header is required.
- API Secret: `API-SECRET` header is required.
- Merchant ID: `MERCHANT-ID` header is required.

## Request

### HTTP Method and URL
```
POST /catalog/:catalogId/products/:productId/related-products
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `storeId` | string | Yes | Unique identifier of the store where the product exists. |
| `relatedProducts` | array | Yes | An array of product Id's. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "relatedProducts": ["818f9fc43d0b580f01"]
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Related Products for merchant added successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body"
}
```
**Description:** The request body is malformed or missing required fields. Ensure that the JSON is valid and includes all required parameters (`storeId`, `relatedProducts`).

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Product or catalog not found"
}
```
**Description:** The specified product or catalog does not exist. Verify that the `catalogId` and `productId` in the URL are correct, and that the product and related products exist in the catalog.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected server error occurred. This could be due to a database issue or a problem with the API itself. Try the request again later, and if the problem persists, contact support.

## Notes
- Ensure that all product IDs in the `relatedProducts` array are valid and exist in the same store as the main product.
- The API Key, API Secret, and Merchant ID are required for authentication. Replace `YOUR_API_KEY`, `YOUR_API_SECRET` and `YOUR_MERCHANT_ID` with the actual credentials.
---
