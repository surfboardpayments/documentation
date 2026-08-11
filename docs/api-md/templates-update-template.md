# Update Template

## Overview
This API allows you to update an existing POS template.

## Prerequisites
- You need a valid `merchantId`, `sId` (store ID), and `templateId`.
- You must have a valid API key and secret.
- The template must already exist.
- You need `PUT` access to the resource.

## Request

### HTTP Method and URL
```
PUT /merchants/:merchantId/stores/:sId/templates/:templateId
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentMethodOrder` | `array` | No | Array of preferred payment methods that will be displayed on the POS system in the order of preference. |
| `name` | `string` | Yes | Name or label for the POS template. |
| `productsPerPage` | `number` | No | Number of products to be displayed per page in the POS template. |
| `product` | `array` | No | Product categories and their order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`category` | `string` | Yes | Category of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productOrder` | `array` | Yes | Array of product IDs in the preferred order. |
| `autoSet` | `array` | No | Array of time intervals during which certain automatic settings or actions should be applied. |
| &nbsp;&nbsp;&nbsp;&nbsp;`start` | `string` | Yes | Start time for the interval. |
| &nbsp;&nbsp;&nbsp;&nbsp;`end` | `string` | Yes | End time for the interval. |
| `terminal` | `object` | No | Terminal information for the POS template. |
| &nbsp;&nbsp;&nbsp;&nbsp;`primaryTerminal` | `string` | No | ID of the primary terminal to be used. |
| &nbsp;&nbsp;&nbsp;&nbsp;`secondaryTerminal` | `string` | No | ID of the secondary terminal to be used. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalOrder` | `array` | No | Array of terminal IDs in the preferred order. |
| `metaData` | `object` | No | Additional metadata for the POS template as key-value pairs. |

### Request Example
```json
{
  "name": "Summer Sale Template",
  "productsPerPage": 12,
  "paymentMethodOrder": ["cash", "credit_card", "mobile_payment"],
  "product": [
    {
      "category": "Beverages",
      "productOrder": ["prod123", "prod456", "prod789"]
    },
    {
      "category": "Snacks",
      "productOrder": ["prod987", "prod654", "prod321"]
    }
  ],
  "autoSet": [
    {
      "start": "09:00",
      "end": "12:00"
    },
    {
      "start": "14:00",
      "end": "17:00"
    }
  ],
  "terminal": {
    "primaryTerminal": "terminal_alpha",
    "secondaryTerminal": "terminal_beta",
    "terminalOrder": ["terminal_alpha", "terminal_beta", "terminal_gamma"]
  },
  "metaData": {
    "theme": "light",
    "location": "front"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Pos-Template updated Successfully for template id 8269d8d131d1100848"
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
**Description:** This error occurs when the request body is malformed or contains invalid data. Check that all required fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access."
}
```
**Description:** This error occurs when the API key or secret is invalid or missing. Ensure that the `API-KEY` and `API-SECRET` headers are correctly set. Also make sure `MERCHANT-ID` is set correctly.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Template not found."
}
```
**Description:** This error occurs when the specified `templateId` does not exist. Verify that the template ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a problem on the server side. Contact support if the error persists.

## Notes
- The `merchantId`, `sId`, and `templateId` are part of the URL path and should be replaced with the actual values for the merchant, store, and template being updated, respectively.
- Make sure the time format for the `start` and `end` times in `autoSet` is consistent.
- The order of items in the `productOrder` array within the `product` array dictates the display order.
- The `metaData` object can contain any custom key-value pairs you need to associate with the template.

---
