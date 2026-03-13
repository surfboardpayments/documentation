# Fetch Store Tips Config

## Overview
Retrieves the tips configurations for all terminals registered to a specific store. Use this API to get all the tips configurations for all the terminals registered to a store.

## Prerequisites
- A valid Merchant ID and Store ID are required.
- The store must be configured within the system.
- Authentication via API Key and API Secret is required.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/tips
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
_None_

### Request Body Parameters
_None_

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
| data | object | Response data. |
| data.tipConfig | string | Specifies how tips are managed during the payment. The possible values are: `ENABLED`, `DISABLED`. |
| data.tipLevel1 | number | Specifies the first preset percentage value for tips (e.g., 10 for 10%). |
| data.tipLevel2 | number | Specifies the second preset percentage value for tips (e.g., 20 for 20%). |
| data.tipLevel3 | number | Specifies the third preset percentage value for tips (e.g., 30 for 30%). |
| data.defaultCustomAmount | number | A custom amount that will be prefilled on the screen. |
| data.displayCalculatedAmount | string | Specifies whether or not to display calculated tip amount on screen. Possible values: `ENABLED`, `DISABLED`. |
| data.tipDisplayFormat | string | The format in which the tip is displayed. Possible values: `PERCENTAGE`, `AMOUNT`. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "tipConfig": "ENABLED",
    "tipLevel1": 10,
    "tipLevel2": 20,
    "tipLevel3": 30,
    "defaultCustomAmount": 2341,
    "displayCalculatedAmount": "ENABLED",
    "tipDisplayFormat": "AMOUNT"
  },
  "message": "store config queried successfully"
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
**Description:** This error occurs if the request parameters are invalid or missing. Check the request parameters and ensure they are valid and present.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** This error occurs when the provided API Key or Secret is invalid. Verify your API Key and Secret.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** This error occurs if the specified store is not found. Verify the Store ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a server-side issue. Contact support for assistance.

## Notes
- `tipLevel1`, `tipLevel2`, and `tipLevel3` should be whole numbers representing percentages. For example, use '10' to represent 10%.
- Ensure that the `MERCHANT-ID` in the headers matches the merchant associated with the store.
---
