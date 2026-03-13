# Fetch Merchant Terminal Config

## Overview
Use this API to fetch all currently active terminal configurations for the merchant.

## Prerequisites
- A valid merchant ID is required.
- API Key and API Secret are needed for authentication.
- The merchant should have at least one terminal registered.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/terminals/config
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

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
| status | string | Status of the request. Possible values: "SUCCESS", "ERROR". |
| data | object | Response data containing terminal configuration details. |
| &nbsp;&nbsp;&nbsp;&nbsp; wifiSsid | string | Name of the WiFi network. |
| &nbsp;&nbsp;&nbsp;&nbsp; wifiPassword | string | Password for the WiFi network. |
| &nbsp;&nbsp;&nbsp;&nbsp; autoSleep | number | Auto sleep time for the terminal in seconds. Terminal will sleep if no transactions are received in this time period. Only applies if the terminal is running on battery. |
| &nbsp;&nbsp;&nbsp;&nbsp; preferredRestartTime | string | Scheduled restart time for the terminal in HH:MM format. The default is 02:00am according to the device's timezone. It has a 1 hour restart window. For example, if set to 02:00am, restart could occur anytime between 02:00am and 02:59am. It is essential for the device to restart at least once every 24 hours. This might be particularly important for businesses that operate beyond the default restart time. |
| &nbsp;&nbsp;&nbsp;&nbsp; preferredNetwork | string | Preferred network for the terminal. It can be either 'WIFI' or 'GSM'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; WIFI | string | Sets the preferred network of the terminal as WiFI. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GSM | string | Sets the preferred network of the terminal as GSM or mobile network. |
| &nbsp;&nbsp;&nbsp;&nbsp; alwaysShowMinorUnits | number | Determines how the amount is displayed on the terminal. It can be either '0' or '1'. When set to '1', the terminal will always display the minor units, even for whole numbers (e.g., 29 will be displayed as 29.00). When set to 0, the terminal will not include minor units for whole numbers. |
| &nbsp;&nbsp;&nbsp;&nbsp; language | string | Two letter ISO language code, in lowercase, representing the language to be displayed in the terminal. Can be 'en', 'fi', 'da' , 'se'. |
| &nbsp;&nbsp;&nbsp;&nbsp; showStatusBar | boolean | Determines whether the status bar is displayed on the terminal. If set 'TRUE', the terminal will display the status bar. This is applicable to SurfPad terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp; chipReadDelay | number | Time delay in milliseconds before the card is read. |
| &nbsp;&nbsp;&nbsp;&nbsp; showReceipt | boolean | Set this to determine how receipts are showcased on the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp; preferredGsmOperator | number | The preferred GSM operator identified by a numeric code. |
| &nbsp;&nbsp;&nbsp;&nbsp; openPosOnReboot | string | Indicates whether the POS system should open automatically after reboot. Possible values are 'enabled' or 'disabled'. |
| &nbsp;&nbsp;&nbsp;&nbsp; enableRefundLock | boolean | Determines if the refund lock screen feature is enabled on the device. This is only available for android terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp; screenTimeout | number | The duration (in milliseconds) before the screen times out due to inactivity. |
| &nbsp;&nbsp;&nbsp;&nbsp; autoSleepInterval | number | The interval (in milliseconds) before the device automatically goes to sleep. |
| &nbsp;&nbsp;&nbsp;&nbsp; receiptScreenTimeout | number | Timeout of the receipt screen on hardware terminals. |
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
	"message": "Merchant Terminal config queried successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid merchant ID"
}
```
**Description:** The merchant ID provided in the request is invalid or does not exist. Verify the merchant ID and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret"
}
```
**Description:** The API key or secret provided in the headers is incorrect or missing. Double-check the API key and secret and ensure they are correctly passed in the headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "No terminal configuration found for this merchant."
}
```
**Description:** No terminal configuration exists for the specified merchant ID. Ensure that the merchant has registered at least one terminal.

## Notes
- The `preferredRestartTime` is critical for the device to restart at least once every 24 hours.
- Ensure the device's timezone is appropriately configured for accurate restart scheduling.
- The `preferredNetwork` setting allows you to prioritize network connectivity.
- SurfPad terminals support showing or hiding the status bar with the `showStatusBar` parameter.
- If the terminal is running on battery, the `autoSleep` parameter can help conserve power.
- The `language` parameter supports 'en', 'fi', 'da', and 'se'.
-  The `receiptScreenTimeout` parameter only applies to hardware terminals.
---
