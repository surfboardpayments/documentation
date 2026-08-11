# Query Terminals Under Partner

## Overview
Retrieves the terminals registered under a partner. Use this API to look up a terminal by its Terminal ID or serial number. When the path value is longer than 13 characters it is treated as a Terminal ID, otherwise it is treated as a serial number.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/terminals/:terminalId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `terminalId` | `string` | Yes | Identifier supplied in the URL path. |

### Pagination

This endpoint is paginated. Send the `x-page-number` request header to page through the results (default 1). Each response returns the `x-total-items` header (total number of matching records) and the `x-page-number` header (the page that was served).

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/terminals/:terminalId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Describes the type of the terminal, for example 'surfpad', 'surftouch', 'surfprint', 'checkoutPro', 'checkoutX' or 'iFrame'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareVersion` | `string` | Software version of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osType` | `string` | Describes the type of Operating System (OS) running on the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osVersion` | `string` | Operating System (OS) version of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceVendor` | `string` | Device vendor of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceModel` | `string` | Device model of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialNo` | `string` | Serial number of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastAliveAt` | `string` | Timestamp of the last time the terminal was seen alive. |
| &nbsp;&nbsp;&nbsp;&nbsp;`isCharging` | `boolean` | Whether the terminal is currently charging. |
| &nbsp;&nbsp;&nbsp;&nbsp;`batteryPercentage` | `number` | Current battery charge level of the terminal, as a percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;`wifiStrength` | `number` | Wi-Fi signal strength of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`gsmStrength` | `number` | GSM signal strength of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`powerSource` | `string` | Power source the terminal is currently using. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceNetwork` | `string` | Network the terminal device is connected to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`turnOnTime` | `string` | Timestamp of when the terminal was last turned on. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareMode` | `string` | The software mode the terminal is running in. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalPublicKey` | `string` | The public key of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`signalStrength` | `number` | Overall signal strength reported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sdkUrl` | `string` | The SDK server URL, present for self-hosted SDK terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | The Store ID of the store under which the terminal is registered. |
| &nbsp;&nbsp;&nbsp;&nbsp;`linkedTerminalId` | `string` | The Terminal ID of another terminal to which the current terminal is linked. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalStatus` | `string` | Status of the terminal, it can be in one of these states: REGISTERED \| ACTIVE \| IN_ACTIVE \| DE_REGISTERED. |
| &nbsp;&nbsp;&nbsp;&nbsp;`startDate` | `string` | Timestamp at which the terminal was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalPaymentMethods` | `string` | Payment methods supported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalName` | `string` | Name of the terminal used as a reference for users. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | The Merchant ID of the merchant under which the terminal is registered. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalCurrencyCode` | `string` | Currency code associated with the terminal. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "terminalId": "81f878852b3a280904",
      "terminalType": "surfpad",
      "serialNo": "2922000007",
      "storeId": "81497439a52270000f",
      "terminalStatus": "ACTIVE",
      "terminalName": "My Terminal",
      "merchantId": "81fa6b2d8d5dc8040e",
      "terminalCurrencyCode": "NA"
    }
  ],
  "message": "Fetched terminals successfully"
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
- The `terminalId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
