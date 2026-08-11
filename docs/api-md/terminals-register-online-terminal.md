# Register Online Terminal

## Overview
Registers a terminal with an online store so it can accept online payments.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/stores/:storeId/online-terminals
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `onlineTerminalMode` | `string` | Yes | Online payments can be carried out using any of these following modes. Possible values: `PaymentPage`, `SelfHostedPage`, `iFrame`, `MerchantInitiated`. |

### Request Example
```json
{
  "onlineTerminalMode": "PaymentPage"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the terminal registration. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the registered terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`publicKey` | `string` | For SelfHostedPage terminals use this key to initialize your Online SDK. |
| &nbsp;&nbsp;&nbsp;&nbsp;`registrationStatus` | `string` | Represents the current status of the terminal. Possible values: `REGISTERED`, `DEREGISTERED`, `FAILED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sdkUrl` | `string` | The SDK server URL, returned when a self-hosted SDK key is provisioned for the terminal. |
| `message` | `string` | A message that describes the status of the terminal registration. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "813ca2cb12ce400405"
  },
  "message": "Terminal registered successfully"
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.

---
