# Fetch Session Status

## Overview
This API retrieves the current status of the NFC reading session.

## Prerequisites
- A valid terminal ID and session ID.
- Authentication is required using API Key, API Secret and Merchant ID.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId/sessions/:sessionId/status
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
// No request body
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;sessionStatus | string | The current status of the session. Possible values: PENDING, CANCELLED, COMPLETED, TIMED_OUT, NOT_FOUND. |
| &nbsp;&nbsp;&nbsp;&nbsp;nfcTags | array | List of NFC (Base64 encoded RFID value) tags involved in the session. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"sessionStatus": "COMPLETED",
		"nfcTags": [
			"QjQ2RTE2OEY="
		]
	},
	"message": "Fetched NFC session status."
}
```

## Error Responses

### Possible Errors
There are no error responses explicitly provided in the given data. However, consider the following general cases:

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:**  Indicates incorrect request parameters, such as invalid terminalId or sessionId format. Ensure the request parameters adhere to the expected format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Missing or invalid API Key, API Secret, or Merchant ID."
}
```
**Description:** The API Key, API Secret, or Merchant ID are missing or invalid. Verify that the correct credentials are included in the request headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Session not found."
}
```
**Description:**  The specified session ID does not exist. Verify that the sessionId is correct and corresponds to an existing session.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error."
}
```
**Description:** An unexpected error occurred on the server.  This often requires server-side investigation. Retry the request after a short delay, and if the issue persists, contact support.

## Notes
- Ensure the `terminalId` and `sessionId` are valid and properly formatted in the request URL.
- The `nfcTags` array contains Base64 encoded RFID values. You may need to decode these values for further processing.
-  The `sessionStatus` values indicate the current state of the NFC reading process. Handle different states appropriately in your application.
---
