# Complete NFC Reading Session

## Overview
This endpoint completes an ongoing NFC (RFID) reading session. You must provide both the terminal ID and session ID in the path, as well as an optional result in the request body.

## Prerequisites
- You need a valid terminal ID.
- You need an active NFC reading session ID.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
POST /terminals/:terminalId/sessions/:sessionId/complete
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| result | string | No | Indicates the final state of the NFC session. Default is set to 'COMPLETED'. Possible values: `COMPLETED`, `CANCELLED`, `TIMED_OUT`. |

### Request Example
```json
{
  "result": "COMPLETED"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | Describes the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "NFC reading session completed successfully."
}
```

## Error Responses

### Possible Errors

#### *No error codes provided in source JSON*

## Notes
- If the `result` parameter is not provided in the request body, the default value `COMPLETED` will be used.
- Ensure that the `terminalId` and `sessionId` in the path are valid and correspond to an existing, active NFC reading session.

---
