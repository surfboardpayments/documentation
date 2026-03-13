# Fetch Terminal Config

## Overview
Use this API to fetch all currently active configurations for the terminal.

## Prerequisites
- A valid `merchantId`, `storeId`, and `terminalId` are required.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.
- The terminal must be registered.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/:terminalId/config
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body needed for GET
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. Possible values include "SUCCESS" or "ERROR". |
| data | object | Response data containing the terminal configuration. |
| data.wifiSsid | string | Name of the WiFi network. |
| data.wifiPassword | string | Password for the WiFi network. |
| data.autoSleep | number | Auto sleep time for the terminal in seconds. Terminal will sleep if no transactions are received in this time period. Only applies if the terminal is running on battery. |
| data.preferredRestartTime | string | Scheduled restart time for the terminal in HH:MM format. The default is 02:00am according to the device's timezone. It has a 1 hour restart window. For example, if set to 02:00am, restart could occur anytime between 02:00am and 02:59am. It is essential for the device to restart at least once every 24 hours. This might be particularly important for businesses that operate beyond the default restart time. |
| data.preferredNetwork | string | Preferred network for the terminal. It can be either 'WIFI' or 'GSM'.  |
| data.alwaysShowMinorUnits | number | Determines how the amount is displayed on the terminal. It can be either '0' or '1'. When set to '1', the terminal will always display the minor units, even for whole numbers (e.g., 29 will be displayed as 29.00). When set to 0, the terminal will not include minor units for whole numbers. |
| data.language | string | Two letter ISO language code, in lowercase, representing the language to be displayed in the terminal. Can be 'en', 'fi', 'da' , 'se'. |
| data.showStatusBar | boolean | Determines whether the status bar is displayed on the terminal. If set 'TRUE', the terminal will display the status bar. This is applicable to SurfPad terminals. |
| data.chipReadDelay | number | Time delay in milliseconds before the card is read. |
| data.showReceipt | boolean | Set this to determine how receipts are showcased on the terminal. |
| data.preferredGsmOperator | number | The preferred GSM operator identified by a numeric code. |
| data.openPosOnReboot | string | Indicates whether the POS system should open automatically after reboot. Possible values are 'enabled' or 'disabled'. |
| data.enableRefundLock | boolean | Determines if the refund lock screen feature is enabled on the device. This is only available for android terminals. |
| data.screenTimeout | number | The duration (in milliseconds) before the screen times out due to inactivity. |
| data.autoSleepInterval | number | The interval (in milliseconds) before the device automatically goes to sleep. |
| data.receiptScreenTimeout | number | Timeout of the receipt screen on hardware terminals. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"preferredRestartTime": "02:00",
		"preferredNetwork": "WIFI",
		"wifiSsid": "surfboard",
		"wifiPassword": "surfboa",
		"language": "da",
		"autoSleep": 400,
		"alwaysShowMinorUnits": 1,
		"showStatusBar": false,
		"showReceipt": true,
		"chipReadDelay": 500,
		"openPosOnReboot": "enabled",
		"enableRefundLock": true,
		"screenTimeout": 3000000,
		"preferredGsmOperator": 2
	},
	"message": "Terminal config queried successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid merchantId, storeId, or terminalId"
}
```
**Description:** The provided merchantId, storeId, or terminalId is invalid or does not exist.  Verify that the provided IDs are correct and associated with your account.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API key or secret"
}
```
**Description:** The API key or secret provided in the request headers are invalid or missing. Ensure that the `API-KEY` and `API-SECRET` headers are present and contain valid credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal not found"
}
```
**Description:** The terminal with the specified `terminalId` does not exist or is not associated with the provided merchantId and storeId. Double-check the `terminalId` for accuracy.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server. This may be due to server issues, database connection problems, or other unforeseen circumstances. If this error persists, contact support with the request details and timestamp.

## Notes
- The `preferredRestartTime` should be in HH:MM format. The restart time can occur within a 1-hour window.
- It is essential for the terminal to restart at least once every 24 hours.
- The `preferredNetwork` can be either `WIFI` or `GSM`.
- For the `language` parameter, valid values are: `en`, `fi`, `da`, `se`.
- The `showStatusBar` parameter is only applicable to SurfPad terminals.
---
