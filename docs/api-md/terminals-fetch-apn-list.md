# Fetch APN List

## Overview
Retrieves the list of APN's of the terminal. The terminal has to be active for a successful read and the response will be received in exactly 10 seconds.

## Prerequisites
- Terminal must be active.
- Authentication is required using API Key and API Secret.
- You must have the Merchant ID.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/:terminalId/apns
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
// No request body required for GET request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | object | Response data. |
| data.apns | array | An array of strings depicting all APN's of the terminal. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"apns": [
			"WIFI1",
			"WIFI2"
		]
	},
	"message": "APN list fetch successfully."
}
```

## Error Responses

N/A (No error responses were provided in the original JSON.)

## Notes
- The terminal has to be active for a successful read.
- The response will be received in exactly 10 seconds.

---
