# Create Read Session

## Overview
Use this API to start a NFC reading session on the terminal.

## Prerequisites
- A terminal ID is required.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
POST /terminals/:terminalId/sessions
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
| mode | string | Yes | Denotes the number of tags that can be read under the created session. The possible values are - 'single' | 'multiple' |

### Request Example
```json
{
  "mode": "single"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data |
| data.sessionId | string | A unique identifier for the NFC reading session. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "sessionId": "827125a9d9d0301949"
  },
  "message": "NFC reading session started successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid mode provided."
}
```
**Description:** The `mode` parameter is invalid or missing. Ensure the `mode` is either "single" or "multiple".

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** The API Key or Secret or Merchant ID is incorrect/missing.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal not found"
}
```
**Description:** The specified `terminalId` does not exist.

---
