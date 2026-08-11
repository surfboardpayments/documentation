# Get Interapp Details

## Overview
Fetches the current status of the interapp registration for a terminal.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.
- The resource identified by `registrationCode` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/interapp/:registrationCode
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |
| `registrationCode` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/stores/:storeId/terminals/interapp/:registrationCode
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Interapp registration details returned for the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`registrationStatus` | `string` | Denotes the registration status of the terminal. Possible values: `REGISTERED`, `NOT_REGISTERED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the registered terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalName` | `string` | The name assigned to the registered terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareMode` | `string` | The software mode the terminal is running in. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "registrationStatus": "REGISTERED",
    "terminalId": "81f878852b3a280904",
    "terminalName": "Front Desk Terminal",
    "softwareMode": "online"
  },
  "message": "Terminal details fetched successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

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
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.
- The `registrationCode` is part of the URL path and must be a valid identifier.

---
