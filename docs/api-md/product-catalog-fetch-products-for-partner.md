# Fetch Products for Partner

## Overview
Retrieve a paginated list of the products and bundles available across a partner's merchants. Use this to build a partner-wide product catalog view.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/product-catalogue
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Pagination

Page through results with the `x-page-number` request header. The total number of matching products is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/product-catalogue
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The products and bundles on the current page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`products` | `array` | The partner's products. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Unique identifier of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Currency the prices are expressed in. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`category` | `string` | Category the product is grouped under. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`unit` | `string` | Unit of measurement for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productImages` | `array` | Image URLs for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`discount` | `number` | Discount applied to the product, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`hsnCode` | `string` | Harmonized System (HSN) code classifying the product for tax. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`barcode` | `string` | Barcode value printed on the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`variantCategory` | `array` | The variant categories defined for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productProperties` | `object` | Free-form key/value properties describing the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`inventory` | `object` | Current stock information for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`unitType` | `string` | How the product is priced and quantified (FIXED_UNIT, VARIABLE_UNIT or FREE_UNIT). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Whether the item is a PRODUCT or a SERVICE. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`relatedProducts` | `array` | Identifiers of products tagged as related. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`sellingPrice` | `number` | Selling price of the product, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`variants` | `array` | Variants of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlans` | `array` | Recurring billing plans available for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`tax` | `array` | Tax lines that apply to the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type of tax, for example VAT. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | Tax rate as a percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Fixed tax amount, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`attributeValues` | `array` | Attribute values assigned to the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaignInfo` | `array` | Active campaigns on the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaignName` | `string` | Name of the campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaignId` | `string` | Identifier of the campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | `number` | Reduced price during the campaign, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | Percentage discount applied during the campaign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | Free-form key/value metadata attached to the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`bundles` | `array` | Bundles that group several products together. |
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
        "sellingPrice": 1500,
        "description": "SurfPad Payment Terminal in Black",
        "category": "electronics",
        "unit": "nos",
        "productImages": [
          "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
        ],
        "unitType": "FIXED_UNIT",
        "type": "PRODUCT",
        "variants": [],
        "tax": [
          {
            "type": "VAT",
            "percentage": "25",
            "amount": 0
          }
        ]
      }
    ],
    "bundles": []
  },
  "message": "Products for partner fetched successfully"
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
- The `partnerId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
