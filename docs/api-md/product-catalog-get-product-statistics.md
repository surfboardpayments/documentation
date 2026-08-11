# Get Product Statistics

## Overview
Retrieve comprehensive statistics for a specific product including sales data, inventory status, VAT breakdown, and variant performance metrics within an optional date range.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `catalogId` in the URL path must exist.
- The resource identified by `productId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /catalog/:catalogId/products/:productId/statistics
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `catalogId` | `string` | Yes | Identifier supplied in the URL path. |
| `productId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters
Optionally pass the `startDate` and `endDate` query parameters in YYYY-MM-DD format to filter statistics by date range.

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /catalog/:catalogId/products/:productId/statistics
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing product statistics. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Unique identifier of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productName` | `string` | Name of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`unit` | `string` | Unit of measurement for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`query` | `object` | The date range used for filtering statistics. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`startDate` | `string` | Start date of the statistics period in YYYY-MM-DD format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`endDate` | `string` | End date of the statistics period in YYYY-MM-DD format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`statistics` | `object` | Sales and performance statistics for the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`byCurrency` | `array` | Statistics broken down by currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | Currency code. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalUnitsSold` | `number` | Total number of units sold. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalUnitsReturned` | `number` | Total number of units returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalRevenue` | `number` | Total revenue generated. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalVat` | `number` | Total VAT collected. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalCampaignDiscount` | `number` | Total campaign discount applied. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`orderCount` | `number` | Total number of orders containing this product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageOrderValue` | `number` | Average order value for orders containing this product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`netUnitsSold` | `number` | Net units sold after accounting for returns. |
| &nbsp;&nbsp;&nbsp;&nbsp;`inventoryStatus` | `object` | Current inventory status of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currentStock` | `number` | Current stock quantity available. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`stockIn` | `number` | Total stock added during the period. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`stockOut` | `number` | Total stock removed during the period. |
| &nbsp;&nbsp;&nbsp;&nbsp;`vatBreakdown` | `array` | VAT breakdown by percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vatPercentage` | `string` | VAT percentage applied. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vatAmount` | `number` | Total VAT amount collected at this percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`taxableAmount` | `number` | Total taxable amount at this percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;`variants` | `array` | Statistics for each product variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`variantId` | `string` | Unique identifier of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`variantName` | `string` | Name of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`unit` | `string` | Unit of measurement for the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`byCurrency` | `array` | Variant statistics broken down by currency. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`inventoryStatus` | `object` | Current inventory status of the variant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vatBreakdown` | `array` | VAT breakdown for the variant. |
| `message` | `string` | A message that describes the status of the request. |

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
- The `productId` is part of the URL path and must be a valid identifier.

---
