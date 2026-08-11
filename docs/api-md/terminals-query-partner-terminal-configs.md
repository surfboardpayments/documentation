# Query Partner Terminal Configs

## Overview
Retrieves the allowed external software versions for a partner. Use this API to fetch the configurations applicable at the partner, merchant, store, or terminal scope. The scope is selected based on the query param provided, in priority order: terminalId, then storeId, then merchantId, otherwise the partner scope.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/terminal-configs
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

To select the config scope, send in `terminalId`, `storeId` or `merchantId` as a query param.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalId` | `string` | No | Selects the TERMINAL config scope. This has the highest priority. |
| `storeId` | `string` | No | Selects the STORE config scope when terminalId is absent. |
| `merchantId` | `string` | No | Selects the MERCHANT config scope when terminalId and storeId are absent. When none of these are provided, the scope defaults to PARTNER. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/terminal-configs?terminalId=value&storeId=value&merchantId=value
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`allowedExternalSoftwareVersions` | `array` | List of allowed external software versions. Defaults to an empty array when none are configured. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type of the external software. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`version` | `string` | Version of the external software. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`softwareId` | `string` | Identifier of the external software. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`minVersion` | `string` | Minimum supported version of the external software. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isPos` | `boolean` | Indicates whether the software is a POS application. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Terminal type the software applies to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`deviceType` | `string` | Device type the software applies to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`overrideLevel` | `string` | Scope at which the configuration is overridden. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "allowedExternalSoftwareVersions": [
      {
        "type": "pos",
        "version": "1.2.0",
        "softwareId": "81fa6b2d8d5dc8040e",
        "minVersion": "1.0.0",
        "isPos": true,
        "terminalType": "surftouch",
        "deviceType": "android",
        "overrideLevel": "PARTNER"
      }
    ]
  },
  "message": "Terminal configs fetched successfully"
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
- The `partnerId` is part of the URL path and must be a valid identifier.

---
