# Fetch All Store Terminals

## Overview
Retrieves a list of all terminals associated with a specific store. You can use this API to get information regarding all the terminals registered under a store.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalType` | `string` | No | Optional query param to filter terminals by terminal type. Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`. |

### Pagination

To query terminals by terminal type, send in `terminalType` as query param.

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
GET /merchants/:merchantId/stores/:storeId/terminals?terminalType=surfpad
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. 'SUCCESS' \| 'ERROR'. |
| `data` | `array` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `String` | Store ID of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Describes the type of the terminal. Possible values: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareVersion` | `String` | Software version of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osType` | `string` | Describes the type of operating system running on the terminals. Possible values: `android`, `ios`, `sb_firmware`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osVersion` | `String` | Operating System(OS) version of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceVendor` | `String` | Device vendor of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceModel` | `String` | Device model of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialNo` | `String` | Serial number of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `String` | The Store ID of the store under which the terminal is registered. |
| &nbsp;&nbsp;&nbsp;&nbsp;`linkedTerminalId` | `String` | The Terminal ID of another terminal to which the current terminal is linked. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalStatus` | `String` | Status of the terminal. The terminal can be in any one of these states: 'REGISTERED' \| 'ACTIVE' \| 'IN_ACTIVE' \| 'DE_REGISTERED’. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalPaymentMethods` | `String` | Payment methods supported by the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`startDate` | `String` | Timestamp at which terminal was registered. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalName` | `string` | Name of the terminal used as a reference for users. |
| `message` | `string` | Message describing the status of the request. |

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
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
