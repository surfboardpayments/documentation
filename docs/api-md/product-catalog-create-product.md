# Create Product

## Overview
This API allows you to create a product in the product catalog.

## Prerequisites
- You need a valid `catalogId` to create a product under a specific catalog.
- You need a valid `storeId` where the product will be created.
- Authentication is required via `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.
- Ensure your account has the necessary permissions to create products.

## Request

### HTTP Method and URL
```
POST /catalog/:catalogId/products
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | Yes | Unique identifier of the store where the product will be created. |
| name | string | Yes | Name of the product. |
| type | string | Yes | A Product can exist in two ways. Possible values: `PRODUCT`, `SERVICE`.  `PRODUCT`: Refers to tangible things sold for the exchange of a fee. `SERVICE`: Refers to action provided in exchange for a fee. |
| unitType | string | Yes | This refers to the way a product is measured or quantified. Possible values: `FIXED`, `VARIABLE`, `FREE_AMOUNT`. `FIXED`: Pre-packaged products sold in fixed units. `VARIABLE`: Product sold by weight or volume. `FREE_AMOUNT`: Denotes products priced at checkout. |
| costPrice | number | No | Cost price of the product. |
| sellingPrice | number | Yes | Selling price of the product. |
| currencyCode | string | Yes | It refers to the standardised code used to represent a specific currency. |
| tax | array | Yes | Array of taxes. |
| tax[].percentage | string | Yes | Percentage of the tax for the product. |
| tax[].type | string | Yes | Type of the tax. Tax type supported currently is `vat`. |
| variantCategory | array | No | Defines the different variants available for the product. |
| variantCategory[].label | string | Yes | User defined Label for the variant category. |
| variantCategory[].Key | string | Yes | Key of the variant. |
| variantCategories | array | Yes | Describes the different variants available for the product. |
| variantCategories[].category | string | Yes | The user defined variant category under variantCategory. |
| variantCategories[].name | string | Yes | Name of the variant. |
| variantCategories[].value | string | Yes | Value of the variant. |
| description | string | Yes | Description of the product. |
| unit | string | Yes | This refers to the metric unit of the item. The possible values are `m` , `mm` , `cm` , `km` , `in` , `ft` , `mi` , `kg` , `g` , `mg` , `lb` , `oz` , `l` , `ml` , `cu. m` , `gal` , `pt` , `fl oz` , `W` , `kW` , `kWh` , `sq m` , `sq km` , `sq ft` , `h` , `min` , `s` , `days` , `wk` , `mn` , `yr` , `nos`. |
| category | string | Yes | Category of the product. |
| productImages | array | Yes | An array of URLs showcasing the product. |
| hsnCode | string | No | A 6-digit uniform code that identifies the product. |
| barCode | string | No | Encoded white and black lines on the product. |
| productProperties | object | No | Additional properties that help describe the product like size, origin, weight, manufacturer, etc. |
| monthlyPlans | object | No | Refers to the charges of the product or service for a specific time period. |
| monthlyPlans.amount | number | Yes | Amount of the plan. |
| monthlyPlans.currencyCode | string | Yes | It refers to the standardised code used to represent a specific currency. |
| monthlyPlans.interval | string | Yes | This refers to the time period of the billing plan. |
| monthlyPlans.intervalCount | number | Yes | Duration of the plan. |
| monthlyPlans.recurring | boolean | Yes | Denotes if the billing plan should repeat at regular intervals. |
| monthlyPlans.bindingPeriod | number | Yes | A binding period is a set timeframe for a billing plan to which the customer is expected to adhere. |
| monthlyPlans.earlyTerminationPenalty | number | Yes | It is the additional amount charged in case of early termination if applicable. |
| monthlyPlans.earlyTermination | string | Yes | Defines the intended action to be taken if the plan is terminated early. Possible values: `NO_PENALTY`, `BALANCE_AMOUNT`, `BALANCE_AMOUNT_PLUS_PENALTY`. `NO_PENALTY`: No penalty charged for early termination. `BALANCE_AMOUNT`: Customer has to pay the balance amount id terminated early. `BALANCE_AMOUNT_PLUS_PENALTY`: Customer has the pay the remaining amount plus a penalty amount. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Purple Logo",
  "type": "PRODUCT",
  "unitType": "FIXED",
  "costPrice": 20,
  "sellingPrice": 45,
  "currencyCode": "752",
  "tax": [
    {
      "type": "VAT",
      "percentage": "3"
    }
  ],
  "description": "SurfPad Payment Terminal in Purple",
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
| data | object | Response data. |
| data.productId | string | Unique ID of the newly added product. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "productId": "81c30d16df28880301"
  },
  "message": "Product created successfully"
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
**Description:** This error occurs when the request body is malformed or missing required parameters. Ensure all mandatory fields are present and valid.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** This error occurs when the API key, API secret, or merchant ID are invalid or missing. Ensure that you have provided the correct credentials in the request headers.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal Server Error"
}
```
**Description:** This error indicates a problem on the server. Retry the request after some time. If the problem persists, contact support.

## Notes
-  The `catalogId` is expected as part of the URL path, not in the request body.
-  Carefully check the accepted values for enums such as `type`, `unitType`, and `monthlyPlans.earlyTermination` to avoid validation errors.

---
