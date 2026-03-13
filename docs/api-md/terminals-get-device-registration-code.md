# Get Device Registration Code

## Overview
This API generates a registration code and link that can be used to register devices to the store. The registration code can be entered manually on the device, or the registration link can be used for automatic registration via a QR code.

## Prerequisites
- A valid merchant account is required.
- A store must be created under the merchant account.
- Authentication is required using `API-KEY` and `API-SECRET` headers.
- `MERCHANT-ID` header must be provided.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/device-registration
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing registration information. |
| &nbsp;&nbsp;&nbsp;&nbsp;registrationCode | string | 6-digit registration code that can be entered on the device for registration. |
| &nbsp;&nbsp;&nbsp;&nbsp;registrationLink | string | Deep link URL that can be used for automatic device registration. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "registrationCode": "905788",
    "registrationLink": "checkoutx://com.surfboard.checkoutx/register?data=eyJyZWdpc3RyYXRpb25Db2RlIjoiOTA1Nzg4In0="
  },
  "message": "Registration Code Generated Successfully"
}
```

## Error Responses

N/A (No specific error responses provided in the original JSON)

## Notes
- Ensure you replace `YOUR_API_KEY`, `YOUR_API_SECRET`, and `YOUR_MERCHANT_ID` with your actual credentials.
- The `registrationLink` is a deep link and should be handled appropriately by the device's operating system.

---
