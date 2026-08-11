# Set Merchant Terminal Config

## Overview
Sets configurations for all the terminals registered to a specific merchant. Use this API to configure uniform settings and parameters across multiple terminals associated with a specific merchant.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/terminals
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `wifiSsid` | `string` | No | Name of the WiFi network. |
| `wifiPassword` | `string` | No | Password for the WiFi network. |
| `autoSleep` | `number` | No | Auto sleep time for the terminal in seconds. Terminal will sleep if no transactions are received in this time period. Only applies if the terminal is running on battery. |
| `preferredRestartTime` | `string` | No | Scheduled restart time for the terminal in HH:MM format. The default is 02:00am according to the device's timezone. It has a 1 hour restart window. For example, if set to 02:00am, restart could occur anytime between 02:00am and 02:59am. It is essential for the device to restart at least once every 24 hours. This might be particularly important for businesses that operate beyond the default restart time. |
| `preferredNetwork` | `string` | No | Preferred network for the terminal. It can be either 'WIFI' or 'GSM'. |
| `alwaysShowMinorUnits` | `number` | No | Determines how the amount is displayed on the terminal. It can be either '0' or '1'. When set to '1', the terminal will always display the minor units, even for whole numbers (e.g., 29 will be displayed as 29.00). When set to 0, the terminal will not include minor units for whole numbers. |
| `language` | `string` | No | Two-letter ISO language code, in lowercase, representing the language to be displayed in the terminal. Can be 'en', 'fi', 'da', or 'se'. |
| `showStatusBar` | `boolean` | No | Determines whether the status bar is displayed on the terminal. If set 'TRUE', the terminal will display the status bar. This is applicable to SurfPad terminals. |
| `chipReadDelay` | `number` | No | Time delay in milliseconds before the card is read. |
| `showReceipt` | `boolean` | No | Set this to determine how receipts are showcased on the terminal. |
| `preferredGsmOperator` | `number` | No | The preferred GSM operator identified by a numeric code. |
| `openPosOnReboot` | `string` | No | Indicates whether the POS system should open automatically after reboot. Possible values are 'enabled' or 'disabled'. |
| `enableRefundLock` | `boolean` | No | Determines if the refund lock screen feature is enabled on the device. This is only available for android terminals. |
| `refundScreenPin` | `string` | No | The PIN code used to authorize refunds on the screen. This is only available for android terminals. |
| `screenTimeout` | `number` | No | The duration (in milliseconds) before the screen times out due to inactivity. |
| `autoSleepInterval` | `number` | No | The interval (in milliseconds) before the device automatically goes to sleep. |
| `receiptScreenTimeout` | `number` | No | Timeout of the receipt screen on hardware terminals. |
| `offlineMode` | `string` | No | Controls whether the terminal keeps accepting card payments while offline (stored and forwarded once connectivity returns). Applies to the sb_terminal_k checkout app. Possible values: `enabled`, `disabled`. |
| `displayContrast` | `number` | No | Display contrast level of the terminal screen. |
| `idleScreenImageUrl` | `string` | No | URL of the image displayed on the idle screen of the terminal. |
| `lockScreenPin` | `string` | No | PIN code used to unlock the terminal lock screen. |
| `enableLockScreen` | `boolean` | No | Determines whether the lock screen is enabled on the terminal. |
| `printerConfig` | `string` | No | Printer configuration mode for the terminal. |

### Request Example
```json
{
  "wifiSsid": "wifiname",
  "wifiPassword": "wifipassword",
  "autoSleep": 3000,
  "preferredNetwork": "WIFI",
  "preferredRestartTime": "03:00",
  "alwaysShowMinorUnits": 1,
  "language": "en",
  "showStatusBar": true,
  "chipReadDelay": 500,
  "showReceipt": true,
  "offlineMode": "enabled"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "MERCHANT config updated successfully"
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

---
