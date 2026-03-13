# Fetch all products

## Overview
This API allows you to retrieve all products associated with a product catalog.

## Prerequisites
- You must have a valid `catalogId`.
- You need a valid `storeId` as a query parameter.
- Authentication is required via `API-KEY`, `API-SECRET` and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | Yes |  The ID of the store to fetch products from. |

### Request Body Parameters
N/A

### Request Example
```json
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET",
    "MERCHANT-ID": "YOUR_MERCHANT_ID"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| data.products | array | Details of the products. |
| data.products[].productId | string | ID of the product. |
| data.products[].name | string | Name of the product. |
| data.products[].currencyCode | string | It refers to the standardised code used to represent a specific currency. |
| data.products[].description | string | Description of the product. |
| data.products[].category | string | Indicates the products in particular category. |
| data.products[].unit | string | This refers to the metric unit of the item. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'. |
| data.products[].productImages | array | An array of URLs showcasing the product images. |
| data.products[].hsnCode | string | A 6-digit uniform code that identifies the product. |
| data.products[].barCode | string | Encoded white and black lines on the products. |
| data.products[].productProperties | object | Denotes the additional variants that describe the products details which includes type, size, origin, weight, manufacturer, etc. |
| data.products[].inventory | object | Defines the information about the stock levels of the products listed in the catalog. |
| data.products[].unitType | string | This specifies the general representation of quantity based on the product details and they have possible types. Possible values: `FIXED`, `VARIABLE`, `FREE_AMOUNT` |
| data.products[].relatedProducts | string | It refers to add product with some other relatable product. |
| data.products[].sellingPrice | number | Selling price of the product. |
| data.products[].variants | array | Specifications of the product. |
| data.products[].billingPlans | array | Refers to schedule of individual billing dates for the products. |
| data.products[].tax | array | Array of taxes. |
| data.products[].tax[].amount | number | Amount of the tax for the items in the order created. |
| data.products[].tax[].percentage | string | Percentage of the taxes for the items in the order. |
| data.products[].tax[].type | string | Type of the tax supported currently is 'vat'. |
| data.products[].variantCategories | array | Used to show the available variants of the products. |
| data.products[].campaignInfo | array | Information of campaign. |
| data.products[].campaignInfo[].campaignName | string | Name of the campaign. |
| data.products[].campaignInfo[].campaignId | string | ID of the campaign. |
| data.products[].campaignInfo[].fixedAmount | number | Fixed amount of the products. |
| data.products[].campaignInfo[].percentage | string | Percentage of the products. |
| data.bundles | array | Refers to the products grouped together in a category. |
| message | string | A message that describes the status of the request. |

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
        "barCode": "7812123454323",
        "productProperties": {
          "size": "15x5 cm",
          "origin": "sweden",
          "weight": "250 g",
          "manufacturer": "datecs"
        },
        "inventory": {},
        "unitType": "FIXED",
        "type": "PRODUCT",
        "relatedProducts": [],
        "sellingPrice": 15,
        "variants": [],
        "billingPlans": [],
        "tax": [
          {
            "type": "VAT",
            "percentage": "3",
            "amount": 0
          }
        ],
        "variantCategories": [],
        "campaignInfo": [
          {
            "campaignName": "First campaign",
            "campaignId": "8239b16f0a59580224",
            "fixedAmount": 20,
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
  "message": "Invalid request parameters."
}
```
**Description:**  This error occurs when the request parameters are invalid, such as missing required fields or incorrect data types.  Ensure that all required query parameters (e.g., `storeId`) are included and are of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized."
}
```
**Description:** This error indicates that the API request lacks valid authentication credentials. Verify that the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are correctly set.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Catalog not found."
}
```
**Description:** This error means the specified catalog ID does not exist. Double-check the `catalogId` in the URL path to ensure it is valid.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error."
}
```
**Description:**  This error indicates a problem on the server-side. If this error persists, contact the API support team.

## Notes
- The `catalogId` must be a valid ID associated with your merchant account.
- The `storeId` must be a valid ID of the store associated with your merchant account.
- Consider implementing proper error handling in your application to gracefully handle potential errors.
---
