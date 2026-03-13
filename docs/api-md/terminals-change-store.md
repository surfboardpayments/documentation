# Change Store

## Overview
Changes the store to which the terminal is registered. You can use this API to utilize the terminal in another store created under the same merchant. However, the Terminal ID remains unchanged.

## Prerequisites
- A valid Terminal ID and Store ID.
- The Store ID must belong to a store created under the same merchant as the terminal.
- Authentication via API Key, API Secret, and Merchant ID.

## Request

### HTTP Method and URL
```
POST /terminals/change
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| terminal$id | String | Yes | Terminal ID of the terminal for which the store needs to be changed. |
| storeId | String | Yes | Store ID of the store to which the terminal needs to be registered. |

### Request Example
```json
{
  "terminal$id":"c_Ou8mzoVQVn6dS4hvNtKH2",
  "storeId":"st_GZVDbwmS86_G9pwc669U2"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | String | Status of the store change. |
| message | String | A message that describes the status of the store change. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Store successfully changed for the terminal"
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name
```json
{
  "status": "ERROR",
  "message": "Error message"
}
```
**Description:** Error responses are not provided.

## Notes
- The Terminal ID remains unchanged after the store change.
- Ensure that the Store ID belongs to the same merchant as the terminal.

---
