# Check Link Status

## Overview
Retrieves the linkage status between the terminal and CheckoutPro. Use this API to obtain the current link state between the terminal and CheckoutPro.

## Prerequisites
- You must have a registered terminal.
- You must have a valid `merchantId`, `storeId`, and `terminalId`.
- Authentication is required using `API-KEY` and `API-SECRET` headers.
- The terminal must be associated with a CheckoutPro instance.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/:terminalId/link
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
{
  // No request body required for GET
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `String` | Status of the request. |
| `data` | `object` | Response data. |
| `data.linkageStatus` | `String` | Describes the linkage status of the terminal with CheckoutPro. i.e ‘LINKED’ | ‘NOT_LINKED’. |
| `message` | `String` | A message that describes the status of the delinking request. |

### Success Response Example
```json
{
    "status": "SUCCESS",
    "data": {
        "linkageStatus": "LINKED"
    },
    "message": "Terminal Linkage Status fetched Successfully"
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
**Description:**  The request contains invalid parameters.  Check the `merchantId`, `storeId`, and `terminalId` for correctness.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers are invalid. Ensure they are correct and properly configured.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal not found."
}
```
**Description:** The specified `terminalId` does not exist. Verify that the terminal has been registered correctly. Also ensure the `merchantId` and `storeId` are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server.  Try the request again later. If the problem persists, contact support.

## Notes
- The possible values for `linkageStatus` are `LINKED` and `NOT_LINKED`.
- Ensure your `API-KEY`, `API-SECRET`, and `MERCHANT-ID` are properly configured in the headers.
---
