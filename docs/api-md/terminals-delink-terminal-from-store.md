# Delink Terminal from Store

## Overview
Delinks the terminal from its registered store. Use this API to remove a terminal from its registered store. You cannot use this delinked terminal for another merchant. However, if you want to use this terminal in another store created under the same merchant, you can use the Change Store API.

## Prerequisites
- You must have a registered terminal.
- You must have a valid Store ID.
- Authentication is required using API Key, API Secret, and Merchant ID.

## Request

### HTTP Method and URL
```
POST /terminals/deactivate
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| terminal$id | String | Yes | Terminal ID of the terminal that has to be delinked. |
| storeId | String | Yes | Store ID of the store from which the terminal needs to be delinked. |

### Request Example
```json
{
  "terminal$id": "c_Ou8mzoVQVn6dS4hvNtKH2",
  "storeId": "st_GZVDbwmS86_G9pwc669U2"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | String | Status of the request. |
| message | String | A message that describes the status of the terminal delinking. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Terminal removed from store"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters"
}
```
**Description:** The request parameters are invalid or missing. Ensure all required parameters are present and correctly formatted.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** The API Key, API Secret, or Merchant ID is invalid or missing. Verify your authentication credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal or Store not found"
}
```
**Description:** The specified Terminal ID or Store ID does not exist. Check that the IDs are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error"
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- You cannot use a delinked terminal for another merchant.
- If you want to use the terminal in another store created under the same merchant, you can use the Change Store API.

---
