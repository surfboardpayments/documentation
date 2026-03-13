# Fetch All Merchant Terminals

## Overview
Retrieves a list of all terminals associated with a specific merchant. You can use this API to get information regarding all the terminals registered under a merchant. Pagination is supported.

## Prerequisites
- A merchant must be created and onboarded in Surfboard.
- The ISV must have partnered with Surfboard.
- Authentication via API Key and Secret is required.
- The `merchantId` must be available.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/terminals
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| terminalType | string | No | Optional query param to filter terminals by terminal type.  Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`. |

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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | array | Response data containing an array of terminal objects. See nested properties below. |
| data[].terminalId | String | Terminal ID of the terminal. |
| data[].terminalType | string | Describes the type of the terminal. Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`. |
| data[].softwareVersion | String | Software version of the terminal. |
| data[].osType | string | Describes the type of Operating System(OS) running on the terminal. Possible values: `android`, `ios`, `sb_firmware`. |
| data[].osVersion | String | Operating System(OS) version of the terminal. |
| data[].deviceVendor | String | Device vendor of the terminal. |
| data[].deviceModel | String | Device model of the terminal. |
| data[].serialNo | String | Serial number of the terminal. |
| data[].storeId | String | The Store ID of the store under which the terminal is registered. |
| data[].linkedTerminalId | String | The Terminal ID of another terminal to which the current terminal is linked. |
| data[].terminalStatus | String | Status of the terminal, it can be in one of these states: `REGISTERED`, `ACTIVE`, `IN_ACTIVE`, `DE_REGISTERED`. |
| data[].terminalPaymentMethods | String | Payment methods supported by the terminal. |
| data[].startDate | String | Timestamp at which the merchant was created. |
| data[].terminalName | string | Name of the terminal used as a reference for users. |
| data[].terminalPublicKey | String | Public key used while initializing SelfHostedPage Online Terminal (Online SDK) |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "terminalId": "tn_vw_YyrFd33ntb7_340Ob7",
      "terminalType": "surfpad",
      "softwareVersion": "0.0.0",
      "osType": "sb_firmware",
      "osVersion": "0.0.0",
      "deviceVendor": "Datecs",
      "deviceModel": "Datecs PinPad",
      "serialNo": "2922000007",
      "storeId": "st_uCRWV56JkT6eyNXjGr5F1",
      "linkedTerminalId": null,
      "terminalStatus": "ACTIVE",
      "startDate": "2022-11-17T09:29:51.427Z",
      "terminalPaymentMethods": [
        "CARD"
      ],
      "terminalName": "My Terminal"
    },
    {
      "terminalId": "81389f79f703e80105",
      "terminalType": "surftouch",
      "softwareVersion": "0.0.0",
      "osType": "sb_firmware",
      "osVersion": "0.0.0",
      "deviceVendor": "Datecs",
      "deviceModel": "Datecs BluePad 5500",
      "serialNo": null,
      "storeId": "st_uCRWV56JkT6eyNXjGr5F1",
      "linkedTerminalId": null,
      "terminalStatus": "ACTIVE",
      "startDate": "2022-12-15T06:50:48.746Z",
      "terminalPaymentMethods": [
        "SWISH",
        "CASH"
      ],
      "terminalName": "My Test Terminal"
    }
  ],
  "message": "Terminal records fetched successfully"
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
**Description:** This error occurs when the request parameters are invalid or missing. Ensure all required parameters are included and are in the correct format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** This error occurs when the API Key or Secret are invalid or missing. Verify the API Key and Secret.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:** This error occurs when the specified merchant ID does not exist. Verify the merchant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a problem on the server side. Retry the request after some time. If the problem persists, contact support.

## Notes
- Ensure the `merchantId` in the URL path is a valid merchant identifier.
- The `terminalType` query parameter is optional.
- The response is paginated; refer to the documentation for pagination details.
---
