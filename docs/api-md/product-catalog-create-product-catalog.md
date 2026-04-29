# Create Product Catalog

## Overview
This API lets you to create a product catalog for your store to make an effortless product organisation in the catalog.

## Prerequisites
- Authentication via API Key, API Secret, and Merchant ID is required.
- The store must exist.

## Request

### HTTP Method and URL
```
POST /catalog
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*This endpoint does not use any query parameters.*

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | Yes | Unique identifier of the store where the catalog will be created. |

### Request Example
```json
{
  "storeId":"8136a645a2c2d1bb0f"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data |
| data.productcatalogId | string | Unique ID of the newly created catalog. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "catalogId": "8219688f18ebb8020a"
  },
  "message": "Product catalog created successfully"
}
```

## Error Responses

### Possible Errors

#### *No specific error codes are documented in the source data. Please refer to general API documentation for error handling conventions.*

## Notes
-  `productcatalogId` in the response data is misnamed as `catalogId` in the example, but described as `productcatalogId` in resParams.

---
