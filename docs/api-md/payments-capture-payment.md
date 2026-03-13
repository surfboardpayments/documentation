# Capture Payment

## Overview
Use this API to complete the authorisation and capture a payment while using the pre-auth flow or to capture a payment when the delayCapture flag is set.

## Prerequisites
- An existing payment must be authorized (either via pre-auth flow or by setting the delayCapture flag).
- API Key and API Secret are required for authentication.
- Merchant ID is required to identify the merchant making the request.

## Request

### HTTP Method and URL
```
POST /payments/:paymentId/capture
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| amount | number | No | This is only valid if the authMode was set to `PRE-AUTH`. This sets the final authorisation amount to the amount specified and initiates capture on the payment. |

### Request Example
```json
{
  "amount": 200
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status":"SUCCESS",
	"message":"Payment captured successfully"
}
```

## Error Responses

### Possible Errors
There is no error code information provided in the JSON.

## Notes
- Ensure that the `paymentId` in the URL corresponds to a valid, authorized payment.
- The `amount` parameter is only applicable when using the pre-authorization flow.
---
