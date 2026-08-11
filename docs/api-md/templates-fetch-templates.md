# Fetch Templates

## Overview
This API retrieves all the POS templates created under the user.

## Prerequisites
- A valid merchant ID and store ID are required.
- Authentication is required using API Key and API Secret.
- The merchant must have created POS templates.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:sId/templates
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
| status | string | Status of the request. |
| data | array | Response data containing an array of POS template objects. |
| data[].templateId | string | The unique identifier of the POS template. |
| data[].userId | string | Unique identifier of the user who created the POS template. |
| data[].paymentMethodOrder | array | Array of preferred payment methods that will be displayed on the POS system in the order of preference. |
| data[].name | string | Name or label for the POS template. |
| data[].productsPerPage | number | Number of products to be displayed per page in the POS template. |
| data[].product | array | Product categories and their order. |
| data[].product[].category | string | Category of the product. |
| data[].product[].productOrder | array | Array of product IDs in the preferred order. |
| data[].autoSet | array | Array of time intervals during which certain automatic settings or actions should be applied. |
| data[].autoSet[].start | string | Start time for the interval. |
| data[].autoSet[].end | string | End time for the interval. |
| data[].terminal | object | Terminal information for the POS template. |
| data[].terminal.primaryTerminal | string | ID of the primary terminal to be used. |
| data[].terminal.secondaryTerminal | string | ID of the secondary terminal to be used. |
| data[].terminal.terminalOrder | array | Array of terminal IDs in the preferred order. |
| data[].metaData | object | Additional metadata for the POS template as key-value pairs. |
| data[].deleted | boolean | Denotes whether the template was deleted or not |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "templateId": "826dcc0b62e0100248",
      "userId": "u_EArLulLMogC6b-9e9Gci0",
      "name": "SurfboardString",
      "terminalOrder": {
        "terminalOrder": [
          "82674beadf0f700405"
        ],
        "primaryTerminal": "82674beadf0f700405",
        "secondaryTerminal": null
      },
      "categoryOrder": null,
      "productOrder": [
        {
          "category": "electronics",
          "productOrder": [
            "82674cfdf77f500001",
            "82674cfdf77f500001"
          ]
        }
      ],
      "paymentMethodOrder": [
        "SWISH"
      ],
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
      "deleted": false
    }
  ],
  "message": "Template Data fetched successfully for the user id [u_EArLulLMogC6b-9e9Gci0]"
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
**Description:** This error occurs when the request parameters are invalid.  Ensure all required parameters are present and of the correct type. Check your API key and secret as well.

---
## Notes
-  `merchantId` and `sId` in the URL path should be replaced with the actual Merchant ID and Store ID.
-  The `API-KEY`, `API-SECRET` and `MERCHANT-ID` in the headers must be valid for authentication and authorization.
- If there are no templates found, the data array will be empty.
