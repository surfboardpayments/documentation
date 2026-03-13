# Fetch Sessions for Terminal

## Overview
This API lets you fetch all reading sessions created under the terminal. This API is part of the NFC Reading APIs which enable you to read NFC tags for an order.

## Prerequisites
- You need a valid `terminalId` for the terminal you want to fetch sessions for.
- Authentication is required using API Key, API Secret, and Merchant ID.
- Ensure you have set up the NFC reading functionality for your application.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId/sessions
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
// No request body for GET requests
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Response data containing an array of session objects. |
| data[].sessionId | string | A unique identifier for the RFID reading session. |
| data[].action | string | Denotes the stage at which the session is. The possible values are - 'start' | 'end' |
| data[].mode | string | Denotes the number of tags read under the created session. The  possible values are - 'single' | 'multiple' |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "sessionId": "826e5fb507cd180849",
      "action": "end",
      "mode": "multiple"
    },
    {
      "sessionId": "826e5fff87cd181b49",
      "action": "end",
      "mode": "multiple"
    },
    {
      "sessionId": "826e600207cd180049",
      "action": "end",
      "mode": "multiple"
    },
    {
      "sessionId": "826e609587cd181249",
      "action": "end",
      "mode": "multiple"
    }
  ],
  "message": "Fetched all NFC reading sessions under terminal."
}
```

## Error Responses

### Possible Errors

#### ERROR_CODE - Error Name (Example - Assuming Errors Exist, replace with actual errors)
```json
{
  "status": "ERROR",
  "message": "Error description."
}
```
**Description:** [Replace with what causes this error and how to resolve it. For example: Invalid terminal ID provided. Verify the terminal ID and try again.]

## Notes
- Ensure your API Key, API Secret, and Merchant ID are correctly configured for authentication.
- The `terminalId` in the path parameter is case-sensitive and must match the ID in your system.
- The response data will be an empty array if no NFC reading sessions are found for the specified terminal.

---
