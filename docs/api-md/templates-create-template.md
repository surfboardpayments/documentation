# Create Template

## Overview
This API allows you to create a new POS template.

## Prerequisites
- A valid merchant ID and store ID are required in the URL path.
- Authentication via API key and secret is required.
- The merchant must have necessary permissions to create POS templates.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/stores/:storeId/templates
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| paymentMethodOrder | array | No | Array of preferred payment methods that will be displayed on the POS system in the order of preference. |
| name | string | Yes | Name or label for the POS template. |
| productsPerPage | number | No | Number of products to be displayed per page in the POS template. |
| product | array | No | Product categories and their order. |
| &nbsp;&nbsp;&nbsp;&nbsp;category | string | Yes | Category of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;productOrder | array | Yes | Array of product IDs in the preferred order. |
| autoSet | array | No | Array of time intervals during which certain automatic settings or actions should be applied. |
| &nbsp;&nbsp;&nbsp;&nbsp;start | string | Yes | Start time for the interval. |
| &nbsp;&nbsp;&nbsp;&nbsp;end | string | Yes | End time for the interval. |
| terminal | object | No | Terminal information for the POS template. |
| &nbsp;&nbsp;&nbsp;&nbsp;primaryTerminal | string | No | ID of the primary terminal to be used. |
| &nbsp;&nbsp;&nbsp;&nbsp;secondaryTerminal | string | No | ID of the secondary terminal to be used. |
| &nbsp;&nbsp;&nbsp;&nbsp;terminalOrder | array | No | Array of terminal IDs in the preferred order. |
| metaData | object | No | Additional metadata for the POS template as key-value pairs. |

### Request Example
```json
{
  "paymentMethodOrder": ["SWISH"],
  "name": "SurfboardString",
  "productsPerPage": 10,
  "autoSet": [
    {
      "start": "06:00",
      "end": "09:00"
    },
    {
      "start": "11:00",
      "end": "18:00"
    }
  ],
  "product": [
    {
      "category": "electronics",
      "productOrder": ["82674cfdf77f500001", "82674cfdf77f500001"]
    }
  ],
  "terminal": {
    "primaryTerminal": "82674beadf0f700405",
    "terminalOrder": ["82674beadf0f700405"]
  },
  "metaData": {
    "we": "do",
    "do": "we"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;templateId | string | The unique identifier of the newly created POS template. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "templateId": "8271dfa5782e380148"
  },
  "message": "Pos-Template Created Successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body"
}
```
**Description:** The request body is malformed or missing required fields. Ensure that the request body is valid JSON and contains all required fields.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key"
}
```
**Description:** The provided API key is invalid or missing. Verify that you have supplied a valid API key in the request headers.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Insufficient permissions"
}
```
**Description:** The merchant does not have sufficient permissions to create templates. Ensure that the merchant account has the necessary privileges.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant or store not found"
}
```
**Description:** The specified merchant or store ID does not exist. Verify that the merchant ID and store ID in the URL path are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
-  The `templateId` is automatically generated and returned in the success response.
-  The order of elements within arrays like `paymentMethodOrder` and `productOrder` is significant and determines the display order.
-  Time values in `autoSet` should be in a valid 24-hour format (HH:MM).
-  The `metaData` field allows for flexible extension with custom key-value pairs.

---
