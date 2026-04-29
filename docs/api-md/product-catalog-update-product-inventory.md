# Update Product Inventory

## Overview
Update available stocks in the product inventory using this API.

## Prerequisites
- A valid `catalogId` and `productId` are required.
- The product must already exist in the catalog.
- Authentication is required via `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
PATCH /catalog/:catalogId/products/:productId/inventory
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
None

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `storeId` | `string` | Yes | Unique identifier of the store where the product exists. |
| `operation` | `string` | Yes | Defines the way in which the existing stock is modified. Possible values: `STOCK_UP`, `STOCK_DOWN`. `STOCK_UP`: Indicates an addition to the currently available stock. `STOCK_DOWN`: Decrease the quantity in available stock. |
| `quantity` | `number` | Yes | Defines the number of units of a specific product that are available in stock. |
| `unit` | `string` | Yes | This refers to the metric unit of the item. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "operation": "STOCK_UP",
  "quantity": 10,
  "unit": "nos"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Inventory updated successfully"
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
**Description:** This error occurs when one or more of the request parameters are invalid or missing. Ensure all required parameters are present and of the correct type. Check the possible values for `operation` and `unit`.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Product or Catalog not found."
}
```
**Description:** This error occurs if the specified `catalogId` or `productId` does not exist. Verify that the product and catalog exist.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a problem on the server side. Retry the request after some time. If the problem persists, contact support.

## Notes
- Ensure the `storeId` corresponds to a valid store associated with the provided `MERCHANT-ID`.
- The `quantity` must be a non-negative number.
- The `catalogId` and `productId` are part of the URL path and should be correctly formatted.

---
