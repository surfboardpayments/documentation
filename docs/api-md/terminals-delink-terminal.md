# Delink Terminal

## Overview
Delinks the terminal from its linked CheckoutPro. Use this API to swap the terminal between different Checkouts or vice-versa.

## Prerequisites
- Merchant account with access to the Terminals API
- Valid `merchantId` and `storeId`
- Terminal must be previously linked to a CheckoutPro
- Authentication via API Key and API Secret

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/stores/:storeId/terminals/:terminalId/link
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters
N/A - This is a DELETE request.  The terminal ID is passed in the URL.

### Request Example
```json
{
  "terminalId": "814e73b91052380704"
}
```

**Note:** While the request body is present in the original JSON example, it is not required for a DELETE request. The terminalId should be passed in the URL path itself.

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `String` | Status of the request. Possible values include "SUCCESS". |
| `message` | `String` | A message that describes the status of the delinking request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Terminal delinked successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "FAILED",
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs when one or more request parameters are invalid or missing. Verify that `merchantId`, `storeId`, and `terminalId` are all valid and correctly formatted.

#### 401 - Unauthorized
```json
{
  "status": "FAILED",
  "message": "Invalid API Key or API Secret."
}
```
**Description:**  This error indicates that the provided API key or API secret is incorrect or invalid. Ensure you are using the correct credentials.

#### 404 - Not Found
```json
{
  "status": "FAILED",
  "message": "Terminal not found."
}
```
**Description:** This error occurs when the specified terminal ID does not exist or cannot be found within the provided merchant and store context. Verify the `terminalId` is correct.

#### 500 - Internal Server Error
```json
{
  "status": "FAILED",
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a problem on the server side.  If this error persists, contact support.

## Notes
- The `terminalId` must exist and belong to the specified merchant and store.
- Ensure that the terminal is currently linked to a CheckoutPro instance before attempting to delink it.
- Check the `status` field in the response to confirm the success or failure of the delinking operation.

---
