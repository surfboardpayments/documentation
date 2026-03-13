# Fetch Terminal by ID

## Overview
Retrieves information about a specific terminal. Use this API to get information regarding a particular terminal registered under a merchant.

## Prerequisites
- You must have a valid `terminalId` for the terminal you wish to retrieve.
- You must have valid API credentials.
- The terminal must be registered under a valid merchant.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*No query parameters for this endpoint.*

### Request Body Parameters
*No request body parameters for this endpoint.*

### Request Example
```json
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET",
    "MERCHANT-ID": "YOUR_MERCHANT_ID"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | object | Response data. |
| data.terminalId | String | Terminal ID of the terminal. |
| data.terminalType | string | Describes the type of the terminal. Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `softpos`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`. |
| data.softwareVersion | String | Software version of the terminal. |
| data.osType | string | Describes the type of Operating System(OS) running on the terminal. Possible values: `android`, `ios`, `sb_firmware`. |
| data.osVersion | String | Operating System(OS) version of the terminal. |
| data.deviceVendor | String | Device vendor of the terminal. |
| data.deviceModel | String | Device model of the terminal. |
| data.serialNo | String | Serial number of the terminal. |
| data.storeId | String | The Store ID of the store under which the terminal is registered. |
| data.linkedTerminalId | String | The Terminal ID of another terminal to which the current terminal is linked. |
| data.terminalStatus | String | Status of the terminal, it can be in one of these states: `REGISTERED`, `ACTIVE`, `IN_ACTIVE`, `DE_REGISTERED`. |
| data.terminalPaymentMethods | String | Payment methods supported by the terminal. |
| data.startDate | String | Timestamp at which the merchant was created. |
| data.terminalName | string | Name of the terminal used as a reference for users. |
| data.lastAliveAt | string | Time at which the terminal was last seen online. |
| data.isCharging | boolean | A boolean value that denotes if the terminal is charging or not. |
| data.batteryPercentage | number | Battery percentage of the terminal. |
| data.powerSource | String | Current power source to the terminal. Possible values: `EXTERNAL_POWER`, `BATTERY`. |
| data.deviceNetwork | String | The current mode of communication. Possible values: `WIFI`, `GSM`. |
| data.turnOnTime | String | Last boot up time of terminal. |
| data.terminalPublicKey | String | Public key used while initializing SelfHostedPage Online Terminal (Online SDK) |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data":{
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
			"turnOnTime": "2024-02-21T05:14:33.417Z",
			"terminalPublicKey": null
		},
	"message":"Terminal records fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
    "status": "ERROR",
    "message": "Invalid terminalId provided."
}
```
**Description:** The `terminalId` provided in the request is not valid. Ensure the `terminalId` is correctly formatted and exists within the system.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API Key or Secret"
}
```
**Description:** The API key or secret provided in the request headers are invalid. Ensure that you are using valid credentials associated with your merchant account.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden: Insufficient permissions"
}
```
**Description:** The merchant does not have the required permissions to access this resource. Verify that the merchant ID associated with the API key has the necessary privileges.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal not found."
}
```
**Description:** The `terminalId` provided does not correspond to any registered terminal. Verify that the `terminalId` is correct and that the terminal is registered under the specified merchant.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server while processing the request. This may be due to a temporary issue. Please try again later. If the problem persists, contact support.

## Notes
- Ensure to handle different terminal types and their corresponding properties appropriately in your application.
- The `lastAliveAt` field represents the last time the terminal successfully communicated with the server.
- Pay attention to the possible values for `terminalStatus`, `powerSource`, and `deviceNetwork` when implementing logic based on terminal status or connectivity.

---
