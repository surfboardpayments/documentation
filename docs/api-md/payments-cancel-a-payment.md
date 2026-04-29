# Cancel a Payment

## Overview
Cancels the initiated payment. You can use this API to cancel the payment instance created. However, you cannot cancel a completed payment. If the payment is already completed, you can use the Void a Payment API to void the specific payment.

## Prerequisites
- An active payment must exist.
- The payment status must be in a state that allows cancellation (e.g., initiated).
- Authentication is required using API Key and Secret.
- The merchant ID must be provided in the header.

## Request

### HTTP Method and URL
```
DELETE /payments/:paymentId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | `application/json` | Yes |
| API-KEY | `YOUR_API_KEY` | Yes |
| API-SECRET | `YOUR_API_SECRET` | Yes |
| MERCHANT-ID | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters
N/A - No request body is required for this endpoint.

### Request Example
```json
// No request body is required for this endpoint. The paymentId must be supplied in the URL.
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| data.paymentStatus | string | Describes the status of the payment. The possible values are: `PAYMENT_COMPLETED`, `PAYMENT_FAILED`, `PAYMENT_CANCELLED`. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "paymentStatus": "PAYMENT_CANCELLED"
  },
  "message": "Payment cancelled successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Invalid Payment ID
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid payment ID provided."
}
```
**Description:** The payment ID provided in the URL is not valid or doesn't exist. Ensure the payment ID is correct and try again.

#### 403 - Payment Already Completed
```json
{
  "status": "ERROR",
  "data": {
      "paymentStatus": "PAYMENT_COMPLETED"
  },
  "message": "Payment is already completed and cannot be cancelled. Use void API to void this payment."
}
```
**Description:** The payment has already been completed and cannot be cancelled. Use the Void a Payment API to void the payment instead.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred while processing the request."
}
```
**Description:** An internal server error occurred. Contact support and provide the request details.

## Notes
- Ensure the payment is in a cancellable state before attempting to cancel it.
- For completed payments, use the "Void a Payment" API instead.
- Make sure your API key, secret, and merchant ID are correctly configured in the headers.

---
