# Create Product

## Overview
This API allows you to create a product in the product catalog.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /catalog/:catalogId/products
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `catalogId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `storeId` | `string` | Yes | Unique identifier of the store where the product will be created. |
| `name` | `string` | Yes | Name of the product. |
| `type` | `string` | Yes | A Product can exist in two ways as. Possible values: `PRODUCT`, `SERVICE`. |
| `unitType` | `string` | Yes | This refers to the way a product is measured or quantified. Possible values: `FIXED_UNIT`, `VARIABLE_UNIT`, `FREE_UNIT`. |
| `costPrice` | `number` | No | Cost price of the product, in the smallest unit of the currency (e.g. öre for SEK). |
| `sellingPrice` | `number` | Yes | Selling price of the product, in the smallest unit of the currency (e.g. öre for SEK). |
| `currencyCode` | `string` | No | It refers to the standardised code used to represent a specific currency. |
| `tax` | `array` | No | Array of taxes. |
| &nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | No | Type of tax that applies to the product. Possible values: `VAT`, `CGST`, `SGST`, `GST`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | No | Percentage of the tax for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | No | Fixed tax amount for the product, in the smallest unit of the currency. |
| `description` | `string` | No | Description of the product. |
| `unit` | `string` | Yes | This refers to the metric unit of the item. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'. |
| `category` | `string` | No | Free-text category the product is grouped under. |
| `categoryId` | `string` | No | Identifier of an existing category to file the product under. |
| `discount` | `number` | No | Discount applied to the product, in the smallest unit of the currency. |
| `productImages` | `array` | Yes | An array of URLs showcasing the product. |
| `hsnCode` | `string` | No | A 6-digit uniform code that identifies the product. |
| `barcode` | `string` | No | Encoded white and black lines on the product. |
| `baseAttributes` | `array` | No | Variant attribute definitions for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`attributeLabel` | `string` | No | Human-readable label for the attribute, for example Color. |
| &nbsp;&nbsp;&nbsp;&nbsp;`attributeKey` | `string` | No | Machine key for the attribute, for example color. |
| `attributeValues` | `array` | No | Values assigned to the product for each attribute. |
| &nbsp;&nbsp;&nbsp;&nbsp;`attributeKey` | `string` | No | Attribute key the value belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`displayName` | `string` | No | Human-readable name of the value. |
| &nbsp;&nbsp;&nbsp;&nbsp;`value` | `string` | No | The attribute value itself. |
| `productProperties` | `object` | No | Additional properties that help describe the product like size, origin, weight, manufacturer, etc. |
| `metadata` | `object` | No | Free-form key/value metadata you can attach to the product for your own use. |
| `monthlyPlans` | `object` | No | Refers to the charges of the product or service for a specific time period. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Yes | Description of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | No | Amount of the plan, in the smallest unit of the currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | No | It refers to the standardised code used to represent a specific currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;`interval` | `string` | No | This refers to the time period of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`intervalCount` | `number` | No | Duration of the plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`recurring` | `boolean` | No | Denotes if the billing plan should repeat at regular intervals. |
| &nbsp;&nbsp;&nbsp;&nbsp;`bindingPeriod` | `number` | No | A binding period is a set timeframe for a billing plan to which the customer is expected to adhere. |
| &nbsp;&nbsp;&nbsp;&nbsp;`earlyTerminationPenalty` | `number` | No | It is the additional amount charged in case of early termination if applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;`earlyTermination` | `string` | No | Defines the intended action to be taken if the plan is terminated early. Possible values: `NO_PENALTY`, `BALANCE_AMOUNT`, `BALANCE_AMOUNT_PLUS_PENALTY`. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Purple Logo",
  "type": "PRODUCT",
  "unitType": "FIXED_UNIT",
  "costPrice": 2000,
  "sellingPrice": 4500,
  "currencyCode": "752",
  "tax": [
    {
      "type": "VAT",
      "percentage": "25"
    }
  ],
  "description": "SurfPad Payment Terminal in Purple",
  "category": "electronics",
  "unit": "nos",
  "productImages": [
    "https://res.cloudinary.com/martinsurf/image/upload/v1619101937/surfboardpayments/surfboard-icon.svg"
  ],
  "hsnCode": "723453",
  "barcode": "7812123454323"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Unique ID of the newly added product. |
| `message` | `string` | A message that describes the status of the request. |

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
  "message": "Failed to process request"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

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

---
