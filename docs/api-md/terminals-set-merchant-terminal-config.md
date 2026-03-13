# Set Merchant Terminal Config

## Overview
Sets configurations for all the terminals registered to a specific merchant. Use this API to configure uniform settings and parameters across multiple terminals associated with a specific merchant.

## Prerequisites
- You must have a valid `merchantId`.
- You must have a valid `API-KEY` and `API-SECRET`.
- The merchant must have registered terminals.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/terminals
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| wifiSsid | string | No | Name of the WiFi network. Supported for: SurfPad |
| wifiPassword | string | No | Password for the WiFi network. Supported for: SurfPad |
| autoSleep | number | No | Auto sleep time for the terminal in seconds. Terminal will sleep if no transactions are received in this time period. Only applies if the terminal is running on battery. Supported for: SurfPad |
| preferredRestartTime | string | No | Scheduled restart time for the terminal in HH:MM format. The default is 02:00am according to the device's timezone. It has a 1 hour restart window. For example, if set to 02:00am, restart could occur anytime between 02:00am and 02:59am. It is essential for the device to restart at least once every 24 hours. This might be particularly important for businesses that operate beyond the default restart time. Supported for: SurfPad |
| preferredNetwork | string | No | Preferred network for the terminal. It can be either 'WIFI' or 'GSM'. Supported for: SurfPad |
| alwaysShowMinorUnits | number | No | Determines how the amount is displayed on the terminal. It can be either '0' or '1'. When set to '1', the terminal will always display the minor units, even for whole numbers (e.g., 29 will be displayed as 29.00). When set to 0, the terminal will not include minor units for whole numbers. Supported for: SurfPad |
| language | string | No | Two letter ISO language code, in lowercase, representing the language to be displayed in the terminal. Can be 'en', 'fi', 'da' , 'se'. Supported for: SurfPad, SurfTouch, SurfPrint, SoftPOS |
| showStatusBar | boolean | No | Determines whether the status bar is displayed on the terminal. If set 'TRUE', the terminal will display the status bar.This is applicable to SurfPad terminals. Supported for: SurfPad |
| chipReadDelay | number | No | Time delay in milliseconds before the card is read. Supported for: SurfPad |
| showReceipt | boolean | No | Set this to determine how receipts are showcased on the terminal. Supported for: SurfTouch, SurfPrint, SoftPOS |
| preferredGsmOperator | number | No | The preferred GSM operator identified by a numeric code. Supported for: SurfPad |
| openPosOnReboot | string | No | Indicates whether the POS system should open automatically after reboot. Possible values are 'enabled' or 'disabled'. Supported for: SurfTouch, SurfPrint |
| enableRefundLock | boolean | No | Determines if the refund lock screen feature is enabled on the device. This is only available for android terminals. Coming Soon. Supported for: SurfTouch, SurfPrint, SoftPOS |
| refundScreenPin | string | No | The PIN code used to authorize refunds on the screen. This is only available for android terminals. Coming Soon. Supported for: SurfTouch, SurfPrint, SoftPOS |
| screenTimeout | number | No | The duration (in milliseconds) before the screen times out due to inactivity. Supported for: SurfTouch, SurfPrint, SoftPOS |
| autoSleepInterval | number | No | The interval (in milliseconds) before the device automatically goes to sleep. Supported for: SurfPad |
| receiptScreenTimeout | number | No | Timeout of the receipt screen on hardware terminals. Supported for: SurfTouch, SurfPrint, SoftPOS |

### Request Example
```json
{
  "serialNo": "123456789",
  "wifiSsid": "wifiname",
  "wifiPassword": "wifipassword",
  "autoSleep": 3000,
  "preferredNetwork": "WIFI",
  "preferredRestartTime": "03:00",
  "alwaysShowMinorUnits": 1,
  "language": "en",
  "showStatusBar": true,
  "chipReadDelay": 500,
  "showReceipt": true
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "MERCHANT config updated successfully"
}
```

## Error Responses

### Possible Errors
N/A. No error codes provided in JSON.

## Notes
- `enableRefundLock` and `refundScreenPin` are marked as "Coming Soon".
- Some parameters are only supported for specific terminal types. Check the `supportedFor` field in the request body parameters table.

---
