# Update Variant

## Overview
You can use this API to modify the product variants.

## Prerequisites
- You need a valid `catalogId`, `productId`, and `variantId`.
- You need a valid store to associate the variant with.
- Authentication is required via `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
PATCH /catalog/:catalogId/products/:productId/variants/:variantId
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
| storeId | string | Yes | Unique identifier of the store where the variant exists. |
| name | string | No | Name of the variant. |
| costPrice | number | No | Cost price of the variant. |
| sellingPrice | number | No | Selling price of the variant. |
| description | string | No | Description of the variant. |
| category | string | No | This refers to a grouping of similar variants that share a common characteristics. |
| unit | string | No | This refers to the metric unit of the variant. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'.  |
| variantImages | array | No | An array of URLs showcasing the variant images. |
| hsnCode | string | No | A 6-digit uniform code that identifies the variant. |
| barCode | string | No | Encoded white and black lines on the variants. |
| variantProperties | object | No | Denotes the additional properties that describe the variant details which includes type, size, origin, weight, manufacturer, etc. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Black Logo - Large",
  "costPrice": 0,
  "sellingPrice": 18,
  "description": "SurfPad Payment Terminal in Black - Large Size",
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
  "message": "Variant updated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters"
}
```
**Description:** This error occurs if the request body contains invalid data or missing required parameters.  Verify all parameters and their data types are correct.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** This error occurs if the API key, secret, or merchant ID are invalid or missing. Double-check these values.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Variant not found"
}
```
**Description:** This error occurs if the specified variant ID does not exist. Verify the variant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error"
}
```
**Description:** This error occurs if there is a server-side problem.  Try again later. If the issue persists, contact support.

## Notes
- The `:catalogId`, `:productId`, and `:variantId` are path parameters and should be replaced with actual values.
- The `storeId` must be a valid identifier for an existing store.
- Ensure your API keys and secrets are properly configured for authentication.

---
