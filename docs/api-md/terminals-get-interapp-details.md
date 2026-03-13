# Get Interapp Details

## Overview
Make use of this API to fetch the current status of the interapp registration.

## Prerequisites
- You need a valid `merchantId` and `storeId`.
- You need a valid `interappcode`.
- API keys and secrets are required for authentication.

## Request

### HTTP Method and URL
```
GET /merchants/merchantId/stores/:storeId/terminals/interapp/:interappcode
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
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
// No request body needed for GET request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | object |  |
| &nbsp;&nbsp;&nbsp;&nbsp;registrationStatus | string | Denotes the registration status of the terminal. Possible values: `REGISTERED` (Interapp registration successful), `NOT_REGISTERED` (Terminal not registered yet). |
| &nbsp;&nbsp;&nbsp;&nbsp;terminalId | string | Terminal ID of the registered terminal. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"registrationStatus": "REGISTERED",
		"terminalId": "81f878852b3a280904"
	},
	"message": "Registration status checked successfully"
}
```

## Error Responses

N/A

## Notes
- Ensure the provided `merchantId`, `storeId`, and `interappcode` are valid and correspond to an existing terminal.
- The `registrationStatus` field provides the current status of the interapp registration. Check this field to determine if the terminal needs to be registered.

---
