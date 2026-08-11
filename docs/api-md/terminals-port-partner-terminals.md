# Port Partner Terminals

## Overview
Ports a batch of terminals to a target merchant under a partner. Use this API to bulk reassign terminals, specifying the destination store for each terminal. This is limited to partners who handle their own storage and deal with terminals in bulk.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/terminals/port
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalDetails` | `array` | Yes | List of terminals to port to the target merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialNo` | `string` | Yes | Serial number of the terminal to port. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Yes | Store ID the terminal should be assigned to under the target merchant. |
| `targetMerchantId` | `string` | Yes | Merchant ID of the merchant the terminals are ported to. |

### Request Example
```json
{
  "targetMerchantId": "81fa6b2d8d5dc8040e",
  "terminalDetails": [
    {
      "serialNo": "2922000007",
      "storeId": "st_GZVDbwmS86_G9pwc669U2"
    }
  ]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Response data. Each entry reports the per-terminal port outcome. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Port status of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialNo` | `string` | Serial number of the ported terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the resulting terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`registrationInfo` | `object` | Registration information of the ported terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`errorMessage` | `string` | Error message describing why the terminal failed to port, when applicable. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "status": "SUCCESS",
      "serialNo": "2922000007",
      "terminalId": "81f878852b3a280904",
      "registrationInfo": {},
      "errorMessage": ""
    }
  ],
  "message": "Terminals of partner ported successfully"
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
