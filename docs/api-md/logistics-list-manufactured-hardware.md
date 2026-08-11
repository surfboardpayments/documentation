# List Manufactured Hardware

## Overview
Retrieves the terminals and devices Surfboard has manufactured for a partner, together with their hardware, network, and software details. Narrow the results by serial number, terminal, device model or vendor, or the merchant a device is assigned to, and sort the list to build inventory reports or reconcile your device fleet.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/manufactured-hardware
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `serialNo` | `string` | No | Return only the device with this hardware serial number. |
| `terminalId` | `string` | No | Return only the device provisioned as this terminal. |
| `deviceModel` | `string` | No | Return only devices of this model, for example Surfpad. |
| `deviceVendor` | `string` | No | Return only devices from this hardware vendor. |
| `merchantId` | `string` | No | Return only devices currently assigned to this merchant. |
| `sortBy` | `string` | No | The field to order the results by. Possible values: `createdAt`, `serialNo`, `status`. |
| `sortOrder` | `string` | No | The direction to sort the results in. Possible values: `ASC`, `DESC`. |

### Pagination

Page through results with the `x-page-number` request header. The total number of matching devices is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/manufactured-hardware?serialNo=TERM001234567&terminalId=816a0ff6bc0fb00404&deviceModel=Surfpad&deviceVendor=Sunmi&merchantId=m_iWGri3XAyTmkbKYsYtV47&sortBy=createdAt&sortOrder=DESC
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The manufactured devices on the current page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialNo` | `string` | Hardware serial number of the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cpuSerialNumber` | `string` | Serial number of the device's CPU. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceSerialNumber` | `string` | Manufacturer's device serial number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Identifier of the terminal this device was provisioned as, once activated. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the device is currently assigned to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceModel` | `string` | Model of the device, for example Surfpad. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deviceVendor` | `string` | Hardware vendor that manufactured the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osType` | `string` | Operating system running on the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`osVersion` | `string` | Operating system version installed on the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adminVersion` | `string` | Version of the Surfboard admin application installed on the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`pinpadVersion` | `string` | Version of the PIN pad firmware installed on the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`softwareVersion` | `string` | Version of the payment software installed on the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`imeiNumber` | `string` | IMEI number of the device's cellular modem. |
| &nbsp;&nbsp;&nbsp;&nbsp;`imsiNumber` | `string` | IMSI number of the SIM provisioned in the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`uiccid` | `string` | ICCID of the SIM card provisioned in the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current lifecycle status of the device, for example whether it has been manufactured, shipped, or activated. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastOperation` | `string` | The most recent operation performed on the device. |
| &nbsp;&nbsp;&nbsp;&nbsp;`manufacturedFor` | `string` | Identifier of the partner the device was manufactured for. |
| &nbsp;&nbsp;&nbsp;&nbsp;`shippedTo` | `string` | Identifier of the merchant or destination the device was shipped to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | When the device record was created, in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`startDate` | `string` | Start of the device's active service period. |
| &nbsp;&nbsp;&nbsp;&nbsp;`endDate` | `string` | End of the device's active service period. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdBy` | `string` | Identifier of the user or system that created the device record. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdFrom` | `string` | The source or channel the device record was created from. |
| &nbsp;&nbsp;&nbsp;&nbsp;`updatedAt` | `string` | When the device record was last updated, in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`updatedBy` | `string` | Identifier of the user or system that last updated the device record. |
| &nbsp;&nbsp;&nbsp;&nbsp;`updatedFrom` | `string` | The source or channel the device record was last updated from. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "serialNo": "TERM001234567",
      "cpuSerialNumber": "CPU-8841207",
      "deviceSerialNumber": "DSN-55120983",
      "terminalId": "816a0ff6bc0fb00404",
      "merchantId": "m_iWGri3XAyTmkbKYsYtV47",
      "deviceModel": "Surfpad",
      "deviceVendor": "Sunmi",
      "osType": "Android",
      "osVersion": "11",
      "adminVersion": "3.4.1",
      "pinpadVersion": "1.2.0",
      "softwareVersion": "5.8.2",
      "imeiNumber": "356938035643809",
      "imsiNumber": "240080012345678",
      "uiccid": "8946071512345678901",
      "status": "SHIPPED",
      "manufacturedFor": "8113d3f8403b380409",
      "shippedTo": "m_iWGri3XAyTmkbKYsYtV47",
      "createdAt": "2026-06-01T09:24:11.000Z",
      "startDate": "2026-06-02",
      "endDate": "2027-06-02"
    }
  ],
  "message": "Manufactured hardware fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch manufactured hardware"
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
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
