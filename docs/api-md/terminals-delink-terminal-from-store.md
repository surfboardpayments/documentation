# Delink Terminal from Store

## Overview
Delinks the terminal from its registered store. Use this API to remove a terminal from its registered store. You cannot use this delinked terminal for another merchant. However, if you want to use this terminal in another store created under the same merchant, you can use the Change Store API.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /terminals/deactivate
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminal$id` | `string` | Yes | Terminal ID of the terminal that has to be delinked. |
| `storeId` | `string` | No | Store ID of the store from which the terminal needs to be delinked. |

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
| `status` | `string` | Status of the request. |
| `message` | `string` | A message that describes the status of the terminal delinking. |

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
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.

---
