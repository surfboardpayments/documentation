# Update Product

## Overview
You can use this API to modify the products.

## Prerequisites
- API Key and Secret are required for authentication.
- Merchant ID is required to identify the merchant.
- The product must already exist in the catalog.
- The catalog must exist and be accessible.

## Request

### HTTP Method and URL
```
PATCH /catalog/:catalogId/products/:productId
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
| name | string | No | Name of the product. |
| costPrice | number | No | Cost price of the product. |
| sellingPrice | number | No | Selling price of the product. |
| description | string | No | Description of the product. |
| category | string | No | This refers to a grouping of similar products that share a common characteristics. |
| unit | string | No | This refers to the metric unit of the item. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'.  |
| productImages | array | No | An array of URLs showcasing the product images. |
| hsnCode | string | No | A 6-digit uniform code that identifies the product. |
| barCode | string | No | Encoded white and black lines on the products. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Black Logo",
  "costPrice": 0,
  "sellingPrice": 15,
  "description": "SurfPad Payment Terminal in Black",
  "category": "electronics",
  "unit": "nos",
  "productImages": [
    "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
  ],
  "hsnCode": "723453",
  "barCode": "7812123454323"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Product updated successfully"
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
**Description:** One or more request parameters are invalid or missing. Check the request body and ensure all required parameters are present and valid.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the request headers is invalid. Ensure the correct API key and secret are used.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant not authorized to perform this action."
}
```
**Description:** The merchant ID provided does not have permission to update the product. Ensure the correct merchant ID is used and that the merchant has the necessary permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Product not found."
}
```
**Description:** The product with the specified product ID was not found. Verify that the product ID is correct and that the product exists in the catalog.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the error persists, contact support.

## Notes
- Ensure that the `catalogId` and `productId` are correctly specified in the URL path.
- The `Content-Type` header must be set to `application/json`.
- The API key and secret are case-sensitive.
- If a field is not provided in the request body, it will not be updated.  To clear a field, explicitly set it to `null`.
---
