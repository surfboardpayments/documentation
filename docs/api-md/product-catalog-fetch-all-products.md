# Fetch all products

## Overview
This API allows you to retrieve all products associated with a product catalog.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `catalogId` | `string` | Yes | Identifier supplied in the URL path. |

### Pagination

Pass the mandatory `storeId` query parameter as a string. Page through results with the `x-page-number` request header; the total number of matching products is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /catalog/:catalogId/products
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`products` | `array` | Details of the products. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | ID of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | It refers to the standardised code used to represent a specific currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`category` | `string` | Category the product is grouped under. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`unit` | `string` | This refers to the metric unit of the item. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productImages` | `array` | An array of URLs showcasing the product images. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`discount` | `number` | Discount applied to the product, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`hsnCode` | `string` | A 6-digit uniform code that identifies the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`barcode` | `string` | Encoded white and black lines on the products. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`variantCategory` | `array` | The variant categories defined for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productProperties` | `object` | Additional properties that describe the product details, which include type, size, origin, weight, manufacturer, etc. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`inventory` | `object` | Defines the information about the stock levels of the products listed in the catalog. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`unitType` | `string` | This specifies the general representation of quantity based on the product details and they have possible types. Possible values: `FIXED_UNIT`, `VARIABLE_UNIT`, `FREE_UNIT`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Whether the item is a PRODUCT or a SERVICE. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`relatedProducts` | `array` | Identifiers of products tagged as related to this product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`sellingPrice` | `number` | Selling price of the product, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`variants` | `array` | Variants of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlans` | `array` | Recurring billing plans available for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`tax` | `array` | Array of taxes. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type of tax that applies to the product, for example VAT. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | Percentage of the tax for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Fixed tax amount for the product, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeValues` | `array` | Attribute values assigned to the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeKey` | `string` | Key of the attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`displayName` | `string` | Display name of the attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`value` | `string` | Value of the attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaignInfo` | `array` | Information of campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaignName` | `string` | Name of the campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaignId` | `string` | ID of the campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | `number` | Reduced price during the campaign, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | Percentage discount applied during the campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | Free-form key/value metadata attached to the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`bundles` | `array` | Refers to the products grouped together in a category. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "products": [
      {
        "productId": "823913d474de600e01",
        "name": "SurfPad Black Logo",
        "currencyCode": "752",
        "description": "SurfPad Payment Terminal in Black",
        "category": "electronics",
        "unit": "nos",
        "productImages": [
          "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
        ],
        "hsnCode": "723453",
        "barcode": "7812123454323",
        "productProperties": {
          "size": "15x5 cm",
          "origin": "sweden",
          "weight": "250 g",
          "manufacturer": "datecs"
        },
        "inventory": {},
        "unitType": "FIXED_UNIT",
        "type": "PRODUCT",
        "relatedProducts": [],
        "sellingPrice": 1500,
        "variants": [],
        "billingPlans": [],
        "tax": [
          {
            "type": "VAT",
            "percentage": "25",
            "amount": 0
          }
        ],
        "campaignInfo": [
          {
            "campaignName": "First campaign",
            "campaignId": "8239b16f0a59580224",
            "fixedAmount": 2000,
            "percentage": null
          }
        ]
      }
    ],
    "bundles": []
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
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
