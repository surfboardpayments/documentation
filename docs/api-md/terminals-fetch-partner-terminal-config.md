# Fetch Partner Terminal Config

## Overview
Use this API to fetch all currently active terminal configurations for the partner.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/terminals/config
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

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/terminals/config
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preferredRestartTime` | `string` | Scheduled restart time for the terminal in HH:MM format. The default is 02:00am according to the device's timezone. It has a 1 hour restart window. For example, if set to 02:00am, restart could occur anytime between 02:00am and 02:59am. It is essential for the device to restart at least once every 24 hours. This might be particularly important for businesses that operate beyond the default restart time. |
| &nbsp;&nbsp;&nbsp;&nbsp;`idleScreenImageUrl` | `string` | URL of the image displayed on the idle screen of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preferredNetwork` | `string` | Preferred network for the terminal. It can be either 'WIFI' or 'GSM'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`wifiSsid` | `string` | Name of the WiFi network. |
| &nbsp;&nbsp;&nbsp;&nbsp;`wifiPassword` | `string` | Password for the WiFi network. |
| &nbsp;&nbsp;&nbsp;&nbsp;`language` | `string` | Two-letter ISO language code, in lowercase, representing the language to be displayed in the terminal. Can be 'en', 'fi', 'da', or 'se'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`autoSleep` | `number` | Auto sleep time for the terminal in seconds. Terminal will sleep if no transactions are received in this time period. Only applies if the terminal is running on battery. |
| &nbsp;&nbsp;&nbsp;&nbsp;`alwaysShowMinorUnits` | `number` | Determines how the amount is displayed on the terminal. It can be either '0' or '1'. When set to '1', the terminal will always display the minor units, even for whole numbers (e.g., 29 will be displayed as 29.00). When set to 0, the terminal will not include minor units for whole numbers. |
| &nbsp;&nbsp;&nbsp;&nbsp;`showStatusBar` | `boolean` | Determines whether the status bar is displayed on the terminal. If set 'TRUE', the terminal will display the status bar. This is applicable to SurfPad terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp;`showReceipt` | `boolean` | Set this to determine how receipts are showcased on the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`chipReadDelay` | `number` | Time delay in milliseconds before the card is read. |
| &nbsp;&nbsp;&nbsp;&nbsp;`openPosOnReboot` | `string` | Indicates whether the POS system should open automatically after reboot. Possible values are 'enabled' or 'disabled'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lockScreenPin` | `string` | PIN code used to unlock the terminal's lock screen. |
| &nbsp;&nbsp;&nbsp;&nbsp;`refundScreenPin` | `string` | PIN code used to authorize refunds on the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`screenTimeout` | `number` | The duration (in milliseconds) before the screen times out due to inactivity. |
| &nbsp;&nbsp;&nbsp;&nbsp;`autoSleepInterval` | `number` | The interval (in milliseconds) before the device automatically goes to sleep. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preferredGsmOperator` | `number` | The preferred GSM operator identified by a numeric code. |
| &nbsp;&nbsp;&nbsp;&nbsp;`enableRefundLock` | `boolean` | Determines if the refund lock screen feature is enabled on the device. This is only available for android terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp;`enableLockScreen` | `boolean` | Determines whether the lock screen is enabled on the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`printerConfig` | `string` | Printer configuration mode set for the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`receiptScreenTimeout` | `number` | Timeout of the receipt screen on hardware terminals. |
| &nbsp;&nbsp;&nbsp;&nbsp;`offlineMode` | `string` | Current offline-payments toggle for the terminal. Possible values: `enabled`, `disabled`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`displayContrast` | `number` | Display contrast level of the terminal screen. |
| `message` | `string` | A message that describes the status of the request. |

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
    "screenTimeout": 3000000,
    "preferredGsmOperator": 2,
    "enableRefundLock": true
  },
  "message": "Partner Terminal config queried successfully"
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

---
