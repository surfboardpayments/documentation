# Fetch All Store Terminals

## Overview
Retrieves a list of all terminals associated with a specific store. You can use this API to get information regarding all the terminals registered under a store. This endpoint supports pagination.

## Prerequisites
- A store must be created for the merchant.
- The merchant ID and store ID are required.
- Authentication is required using API Key and API Secret.
- The `MERCHANT-ID` header must be present.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| terminalType | string | No | Optional query param to filter terminals by terminal type. Valid values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`. |

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
| status | string | Status of the request. Possible values: `SUCCESS`, `ERROR`. |
| data | array | Response data containing an array of terminal objects. |
| data[].terminalId | String | Store ID of the terminal. |
| data[].terminalType | string | Describes the type of the terminal.  Valid values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`. |
| data[].softwareVersion | String | Software version of the terminal. |
| data[].osType | string | Describes the type of operating system running on the terminals. Valid values: `android`, `ios`, `sb_firmware`. |
| data[].osVersion | String | Operating System(OS) version of the terminal. |
| data[].deviceVendor | String | Device vendor of the terminal. |
| data[].deviceModel | String | Device model of the terminal. |
| data[].serialNo | String | Serial number of the terminal. |
| data[].storeId | String | The Store ID of the store under which the terminal is registered. |
| data[].linkedTerminalId | String | The Terminal ID of another terminal to which the current terminal is linked. |
| data[].terminalStatus | String | Status of the terminal. The terminal can be in any one of these states: `REGISTERED`, `ACTIVE`, `IN_ACTIVE`, `DE_REGISTERED`. |
| data[].terminalPaymentMethods | String | Payment methods supported by the terminal. |
| data[].startDate | String | Timestamp at which terminal was registered. |
| data[].terminalName | string | Name of the terminal used as a reference for users. |
| message | string | Message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "terminalId": "81ff0cea07e4300105",
      "softwareVersion": "1.5.3",
      "osType": "android",
      "osVersion": "1.0.0.0",
      "deviceVendor": "Samsung",
      "deviceModel": "Galaxy N10",
      "serialNo": null,
      "storeId": "81fd3113680e60030f",
      "linkedTerminalId": null,
      "terminalStatus": "ACTIVE",
      "startDate": "2024-02-15T06:46:44.046Z",
      "terminalPaymentMethods": [
        "SWISH",
        "CASH",
        "SVEA_SWISH"
      ],
      "terminalName": "surf-touch",
      "terminalType": "unknown",
      "batteryPercentage": null,
      "powerSource": null,
      "deviceNetwork": null,
      "turnOnTime": null,
      "terminalCurrencyCode": "NA"
    },
    {
      "terminalId": "81ff0ff487e4300b04",
      "softwareVersion": "4.0.12.0",
      "osType": "pinpad",
      "osVersion": "2.0.0.0",
      "deviceVendor": "Datecs",
      "deviceModel": "Datecs Bluepad 55",
      "serialNo": "4299989999",
      "storeId": "81fd3113680e60030f",
      "linkedTerminalId": null,
      "terminalStatus": "REGISTERED",
      "startDate": "2024-02-15T07:12:41.658Z",
      "terminalPaymentMethods": [
        "CARD"
      ],
      "terminalName": null,
      "terminalType": "surfpad",
      "batteryPercentage": null,
      "powerSource": null,
      "deviceNetwork": null,
      "turnOnTime": null,
      "terminalCurrencyCode": "NA"
    }
  ],
  "message": "Terminal records fetched successfully"
}
```

## Error Responses

### Possible Errors
*(No error responses were provided in the source JSON)*

## Notes
- This endpoint supports pagination (details not provided in the JSON, consult general API documentation for pagination implementation).
- If the `terminalType` query parameter is not provided, all terminals for the store will be returned.
- Ensure the `MERCHANT-ID` in the header matches the merchant associated with the specified store.

---
