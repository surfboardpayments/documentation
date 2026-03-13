# Link Terminal

## Overview
Links a specific terminal to the CheckoutPro integration, enabling payment acceptance through that terminal.

## Prerequisites
- You must have a valid API Key and API Secret.
- You must have a valid Merchant ID.
- The terminal must be registered.
- CheckoutPro integration must be configured.

## Request

### HTTP Method and URL
```
PUT /merchants/:merchantId/stores/:storeId/terminals/:terminalId/link
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| terminal$id | String | Yes | Terminal ID of the terminal that needs to be linked with CheckoutPro. |

### Request Example
```json
{
  "terminal$id": "814aae4268e6700704"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request (e.g., "SUCCESS", "FAILURE"). |
| message | string | A message describing the status of the linking request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Terminal linked successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "FAILURE",
  "message": "Invalid terminal ID format."
}
```
**Description:** The provided `terminal$id` does not conform to the expected format. Verify the ID and retry the request.

#### 404 - Not Found
```json
{
  "status": "FAILURE",
  "message": "Terminal not found."
}
```
**Description:** The specified `terminal$id` does not exist in the system. Ensure the terminal is registered.

#### 409 - Conflict
```json
{
  "status": "FAILURE",
  "message": "Terminal is already linked to another CheckoutPro."
}
```
**Description:** The terminal is already linked to another CheckoutPro integration.  Delink from the previous integration before linking to a new one.

#### 500 - Internal Server Error
```json
{
  "status": "FAILURE",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Contact support if the issue persists.

## Notes
- Ensure the `terminal$id` is correct before making the request.
- Linking a terminal to CheckoutPro enables payment processing through that terminal.
- Only one CheckoutPro integration can be linked to a terminal at a time.
---
