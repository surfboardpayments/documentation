# Fetch Terminal Tips Config

## Overview
This endpoint retrieves the tip configuration settings for a specific terminal.  These settings control how tips are presented to customers during the payment process.

## Prerequisites
- An active merchant account is required.
- API Key and API Secret are needed for authentication.
- Valid Merchant ID, Store ID, and Terminal ID are required.
- The terminal must be properly configured in the system.

## Request

### HTTP Method and URL
```
GET /merchants/merchantId/stores/storeId/terminals/:terminalId/tips
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*This endpoint does not accept any query parameters.*

### Request Body Parameters
*This endpoint does not accept any request body parameters.*

### Request Example
```json
// No request body is required for this GET request.
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request; can be "SUCCESS" or "ERROR". |
| data | object | Response data containing the tip configuration. |
| data.tipConfig | string | Specifies how tips are managed. Possible values: "ENABLED" (allows tip options) or "DISABLED" (disables tip options). |
| data.tipLevel1 | number | First preset percentage value for tips (e.g., 10 for 10%). |
| data.tipLevel2 | number | Second preset percentage value for tips (e.g., 20 for 20%). |
| data.tipLevel3 | number | Third preset percentage value for tips (e.g., 30 for 30%). |
| data.defaultCustomAmount | number | A custom amount that will be prefilled on the screen for your ease. |
| data.displayCalculatedAmount | string | Specifies whether to display the calculated tip amount. Possible values: "ENABLED" or "DISABLED". |
| data.tipDisplayFormat | string | The format in which the tip is displayed. Possible values: "PERCENTAGE" or "AMOUNT". |
| message | string | A message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "tipConfig": "ENABLED",
    "tipLevel1": 10,
    "tipLevel2": 20,
    "tipLevel3": 30,
    "displayCustomAmount": 2341,
    "displayCalculatedAmount": "ENABLED",
    "tipDisplayFormat": "AMOUNT"
  },
  "message": "terminal config queried successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid terminal ID format."
}
```
**Description:**  The provided terminal ID does not conform to the expected format. Ensure the terminal ID is valid and matches the expected pattern.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the request headers are invalid or missing.  Verify that the API key and secret are correct and properly included in the request.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant does not have permission to access this resource."
}
```
**Description:** The merchant associated with the provided merchant ID does not have sufficient permissions to access the specified terminal. Verify the merchant ID and ensure the account has the necessary access rights.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal not found."
}
```
**Description:**  The terminal ID provided does not correspond to an existing terminal in the system.  Double-check the terminal ID to ensure it is accurate and active.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server while processing the request.  Retry the request later. If the error persists, contact support with the request details.

## Notes
- The tip configuration is applied at the terminal level.
- Ensure the MERCHANT-ID in the header matches the merchant ID associated with the terminal being queried.
- The percentage values for `tipLevel1`, `tipLevel2`, and `tipLevel3` should be whole numbers representing the percentage (e.g., 10 for 10%).
---
