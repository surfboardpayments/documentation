# Update Variant Inventory

## Overview
Update available stocks in the variant inventory using this API.

## Prerequisites
- A valid catalog must exist.
- A product must exist within the catalog.
- A variant must exist for the product.
- Authentication via API Key and Secret is required.
- You need the Merchant ID.

## Request

### HTTP Method and URL
```
PATCH /catalog/:catalogId/products/:productId/variants/:variantId/inventory
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | Yes | Unique identifier of the store where the variant exists. |
| operation | string | Yes | Defines the way in which the existing variant stock is modified. Possible values: `STOCK_UP` (Indicates an addition to the currently available variant stock), `STOCK_DOWN` (Decrease the quantity in available variant stock). |
| quantity | number | Yes | Defines the number of units of a specific variant that are available in stock. |
| unit | string | Yes | This refers to the metric unit of the variant. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'. |

### Request Example
```json
{
  "storeId": "8136a645a2c2d1bb0f",
  "operation": "STOCK_UP",
  "quantity": 15,
  "unit": "nos"
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
  "message": "Variant inventory updated successfully"
}
```

## Error Responses

### Possible Errors
N/A (Example error response would be provided here if available in the JSON)

## Notes
- Ensure the `catalogId`, `productId`, and `variantId` are valid and correspond to existing resources.
- The available units are defined as 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'.

---
