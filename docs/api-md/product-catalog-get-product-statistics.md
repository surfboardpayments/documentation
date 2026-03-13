# Get Product Statistics

## Overview
Retrieve comprehensive statistics for a specific product including sales data, inventory status, VAT breakdown, and variant performance metrics within an optional date range.

## Prerequisites
- Merchant account setup and configured.
- Valid `catalogId` and `productId`.
- Authentication via API Key, Secret, and Merchant ID.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products/:productId/statistics
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
| startDate | string | No | Start date of the statistics period in YYYY-MM-DD format. |
| endDate | string | No | End date of the statistics period in YYYY-MM-DD format. |

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
| data | object | Response data containing product statistics. |
| data.productId | string | Unique identifier of the product. |
| data.productName | string | Name of the product. |
| data.unit | string | Unit of measurement for the product. |
| data.query | object | The date range used for filtering statistics. |
| data.query.startDate | string | Start date of the statistics period in YYYY-MM-DD format. |
| data.query.endDate | string | End date of the statistics period in YYYY-MM-DD format. |
| data.statistics | object | Sales and performance statistics for the product. |
| data.statistics.byCurrency | array | Statistics broken down by currency. |
| data.statistics.byCurrency[].currency | string | Currency code. |
| data.statistics.byCurrency[].totalUnitsSold | number | Total number of units sold. |
| data.statistics.byCurrency[].totalUnitsReturned | number | Total number of units returned. |
| data.statistics.byCurrency[].totalRevenue | number | Total revenue generated. |
| data.statistics.byCurrency[].totalVat | number | Total VAT collected. |
| data.statistics.byCurrency[].totalCampaignDiscount | number | Total campaign discount applied. |
| data.statistics.byCurrency[].orderCount | number | Total number of orders containing this product. |
| data.statistics.byCurrency[].averageOrderValue | number | Average order value for orders containing this product. |
| data.statistics.netUnitsSold | number | Net units sold after accounting for returns. |
| data.inventoryStatus | object | Current inventory status of the product. |
| data.inventoryStatus.currentStock | number | Current stock quantity available. |
| data.inventoryStatus.stockIn | number | Total stock added during the period. |
| data.inventoryStatus.stockOut | number | Total stock removed during the period. |
| data.vatBreakdown | array | VAT breakdown by percentage. |
| data.vatBreakdown[].vatPercentage | string | VAT percentage applied. |
| data.vatBreakdown[].vatAmount | number | Total VAT amount collected at this percentage. |
| data.vatBreakdown[].taxableAmount | number | Total taxable amount at this percentage. |
| data.variants | array | Statistics for each product variant. |
| data.variants[].variantId | string | Unique identifier of the variant. |
| data.variants[].variantName | string | Name of the variant. |
| data.variants[].unit | string | Unit of measurement for the variant. |
| data.variants[].byCurrency | array | Variant statistics broken down by currency. |
| data.variants[].inventoryStatus | object | Current inventory status of the variant. |
| data.variants[].vatBreakdown | array | VAT breakdown for the variant. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "productId": "838bfc15a601800901",
    "productName": "Test Product",
    "unit": "nos",
    "query": {
      "startDate": "2025-09-17",
      "endDate": "2025-12-17"
    },
    "statistics": {
      "byCurrency": [],
      "netUnitsSold": 0
    },
    "inventoryStatus": {
      "currentStock": 0,
      "stockIn": 0,
      "stockOut": 0
    },
    "vatBreakdown": [],
    "variants": []
  },
  "message": "Product statistics fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid date format"
}
```
**Description:**  The `startDate` or `endDate` query parameters are not in the correct YYYY-MM-DD format.  Ensure dates are formatted correctly.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Product not found"
}
```
**Description:** The specified `productId` does not exist in the catalog.  Verify the `productId` is correct and the product exists.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** Invalid or missing API Key, Secret, or Merchant ID. Ensure all authentication headers are present and valid.

## Notes
- The `startDate` and `endDate` query parameters are optional. If they are not provided, the API will return statistics for all available data.
- If no data is available for a given date range, the `byCurrency`, `vatBreakdown` and `variants` arrays will be empty.
- Make sure the date format is 'YYYY-MM-DD'
---
