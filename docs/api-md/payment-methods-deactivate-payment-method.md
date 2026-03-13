# Deactivate Payment Method

## Overview
Deactivates a specific payment method. Use this API to deactivate the payment method added to the merchant or store using its Payment Method ID.

## Prerequisites
- A valid `merchantId` is required.
- A valid `paymentMethodId` is required.
- The payment method must exist and be associated with the specified merchant.
- Authentication via `API-KEY` and `API-SECRET` is required.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/payment-methods/:paymentMethodId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*No query parameters for this endpoint.*

### Request Body Parameters
*No request body parameters for this endpoint.*

### Request Example
```json
// No request body
```

## Response

### Response Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Deactivated payment method successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid merchantId or paymentMethodId."
}
```
**Description:** The provided `merchantId` or `paymentMethodId` is invalid or not in the correct format. Verify the IDs and try again.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Payment method not found for the specified merchant."
}
```
**Description:** The specified `paymentMethodId` does not exist for the given `merchantId`. Confirm that the payment method is associated with the merchant.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The provided `API-KEY` or `API-SECRET` is incorrect. Ensure you are using the correct credentials. Also, verify `MERCHANT-ID`.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred. Please try again later."
}
```
**Description:** An unexpected server-side error occurred. If this persists, contact support.

## Notes
- This endpoint permanently deactivates the payment method.
- A deactivated payment method cannot be used for new transactions.
- The `merchantId` and `paymentMethodId` are case-sensitive.

---
