# Fetch Store Terminal Config

## Overview
Use this API to fetch all currently active configurations for the store.

## Prerequisites
- A valid `merchantId` and `storeId` are required.
- API Key, API Secret, and Merchant ID are required in the headers for authentication.
- The terminal must be registered to the specified store.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/config
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
None

### Request Body Parameters
None

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
| status | string | Status of the request. Possible values include "SUCCESS" or "ERROR". |
| data | object | Response data containing terminal configuration details. |
| &nbsp;&nbsp;&nbsp;&nbsp;wifiSsid | string | Name of the WiFi network. |
| &nbsp;&nbsp;&nbsp;&nbsp;wifiPassword | string | Password for the WiFi network. |
| &nbsp;&nbsp;&nbsp;&nbsp;autoSleep | number | Auto sleep time for the terminal in seconds. Terminal will sleep if no transactions are received in this time period. Only applies if the terminal is running on battery. |
| &nbsp;&nbsp;&nbsp;&nbsp;preferredRestartTime | string | Scheduled restart time for the terminal in HH:MM format. The default is 02:00am according to the device's timezone. It has a 1 hour restart window. For example, if set to 02:00am, restart could occur anytime between 02:00am and 02:59am. |
| &nbsp;&nbsp;&nbsp;&nbsp;preferredNetwork | string | Preferred network for the terminal. It can be either 'WIFI' or 'GSM'. |
| &nbsp;&nbsp;&nbsp;&nbsp;alwaysShowMinorUnits | number | Determines how the amount is displayed on the terminal.  `1`: display minor units. `0`: do not display minor units. |
| &nbsp;&nbsp;&nbsp;&nbsp;language | string | Two letter ISO language code, in lowercase, representing the language to be displayed in the terminal. Can be 'en', 'fi', 'da' , 'se'. |
| &nbsp;&nbsp;&nbsp;&nbsp;showStatusBar | boolean | Determines whether the status bar is displayed on the terminal. This is applicable to SurfPad terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp;chipReadDelay | number | Time delay in milliseconds before the card is read. |
| &nbsp;&nbsp;&nbsp;&nbsp;showReceipt | boolean | Set this to determine how receipts are showcased on the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;preferredGsmOperator | number | The preferred GSM operator identified by a numeric code. |
| &nbsp;&nbsp;&nbsp;&nbsp;autoReboot | boolean | Indicates whether the device should automatically reboot.  The prefered time for the reboot can be specified under 'preferredRestartTime' param. This cannot be turned off |
| &nbsp;&nbsp;&nbsp;&nbsp;openPosOnReboot | string | Indicates whether the POS system should open automatically after reboot. Possible values are 'enabled' or 'disabled'. |
| &nbsp;&nbsp;&nbsp;&nbsp;enableRefundLock | boolean | Determines if the refund lock screen feature is enabled on the device. This is only available for android terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp;screenTimeout | number | The duration (in milliseconds) before the screen times out due to inactivity. |
| &nbsp;&nbsp;&nbsp;&nbsp;autoSleepInterval | number | The interval (in milliseconds) before the device automatically goes to sleep. |
| &nbsp;&nbsp;&nbsp;&nbsp;receiptScreenTimeout | number | Timeout of the receipt screen on hardware terminals. |
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
  "message": "Store Terminal config queried successfully"
}
```

## Error Responses

### Possible Errors
There is no error response data provided in the JSON.

## Notes
It is essential for the device to restart at least once every 24 hours. This might be particularly important for businesses that operate beyond the default restart time which has a one hour window.
`autoReboot` is enabled by default and cannot be turned off.
---
