# Void a Payment

## Overview
Voids a completed payment. If a merchant identifies an issue with a payment soon after it has been completed, use this API to promptly void the payment, thereby preventing potential issues arising from incorrect payments. Note that payment has to be in status ‘PAYMENT_COMPLETED’ and void triggered before 23:00 UTC. For orders with delayCapture set to true, void can be initiated anytime before the capture call.

## Prerequisites
- The payment must be in 'PAYMENT_COMPLETED' status.
- Void must be triggered before 23:00 UTC on the same day as the payment.
- For orders with `delayCapture` set to true, void can be initiated anytime before the capture call.
- Authentication via API Key, API Secret, and Merchant ID is required.

## Request

### HTTP Method and URL
```
PUT /payments/:paymentId/void
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
N/A - This endpoint does not require a request body.

### Request Example
```json
// No request body is required for this endpoint.
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp; voidStatus | string | Depicts the status of the void command. Possible values: `VOID_INITIATED`, `CANNOT_VOID`, `VOIDED`. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"voidStatus": "VOID_INITIATED"
	},
	"message": "payment void status successfully retrieved from external API"
}
```

## Error Responses

### Possible Errors
N/A - No specific error codes were provided in the original data.  Typical errors may include invalid API keys or attempts to void payments not in a `PAYMENT_COMPLETED` state.

## Notes
- Ensure the payment is in the `PAYMENT_COMPLETED` state before attempting to void.
- Pay close attention to the time constraints for voiding payments, especially the 23:00 UTC deadline.
- Use orders with delayCapture = true to avoid time constraint.

---
