# Fetch Terminal by ID

## Overview
Retrieves information about a specific terminal. Use this API to get information regarding a particular terminal registered under a merchant.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /terminals/:terminalId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Describes the type of the terminal. Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `iFrame`, `MerchantInitiated`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareVersion` | `string` | Software version of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osType` | `string` | Describes the type of Operating System (OS) running on the terminal. Possible values: `android`, `ios`, `sb_firmware`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osVersion` | `string` | Operating System (OS) version of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceVendor` | `string` | Device vendor of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceModel` | `string` | Device model of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialNo` | `string` | Serial number of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | The Store ID of the store under which the terminal is registered. |
| &nbsp;&nbsp;&nbsp;&nbsp;`linkedTerminalId` | `string` | The Terminal ID of another terminal to which the current terminal is linked. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalStatus` | `string` | Status of the terminal, it can be in one of these states: REGISTERED \| ACTIVE \| IN_ACTIVE \| DE_REGISTERED. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalPaymentMethods` | `string` | Payment methods supported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`startDate` | `string` | Timestamp at which the terminal was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalName` | `string` | Name of the terminal used as a reference for users. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastAliveAt` | `string` | Time at which the terminal was last seen online. |
| &nbsp;&nbsp;&nbsp;&nbsp;`isCharging` | `boolean` | A boolean value that denotes if the terminal is charging or not. |
| &nbsp;&nbsp;&nbsp;&nbsp;`batteryPercentage` | `number` | Battery percentage of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`powerSource` | `string` | Current power source to the terminal. Possible values: `EXTERNAL_POWER`, `BATTERY`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceNetwork` | `string` | The current mode of communication. Possible values: `WIFI`, `GSM`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`turnOnTime` | `string` | Last boot up time of terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalPublicKey` | `string` | Public key used while initializing the SelfHostedPage Online Terminal (Online SDK). |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | Arbitrary key-value metadata stored against the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`wifiStrength` | `number` | Wi-Fi signal strength reported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`gsmStrength` | `number` | GSM signal strength reported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`signalStrength` | `number` | Overall network signal strength reported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareMode` | `string` | Software mode the terminal is running in. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sdkUrl` | `string` | SDK URL associated with the terminal. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "81f878852b3a280904",
    "terminalType": "surfpad",
    "softwareVersion": "0.0.0",
    "osType": "sb_firmware",
    "osVersion": "0.0.0",
    "deviceVendor": "Datecs",
    "deviceModel": "Datecs PinPad",
    "serialNo": "2922000007",
    "storeId": "81497439a52270000f",
    "linkedTerminalId": null,
    "terminalStatus": "ACTIVE",
    "startDate": "2022-11-17T09:29:51.427Z",
    "terminalPaymentMethods": [
      "CARD"
    ],
    "terminalName": "My Terminal",
    "lastAliveAt": "2024-02-21T08:48:26.000Z",
    "isCharging": false,
    "batteryPercentage": 100,
    "powerSource": "BATTERY",
    "deviceNetwork": "WIFI",
    "turnOnTime": "2024-02-21T05:14:33.417Z"
  },
  "message": "Fetched terminal details successfully"
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
- The `terminalId` is part of the URL path and must be a valid identifier.

---
