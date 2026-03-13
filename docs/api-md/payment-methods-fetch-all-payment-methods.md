# Fetch All Payment Methods

## Overview
Retrieves a list of all payment methods activated for a specific merchant. You can use this API to get information regarding all the payment methods added for the merchant.

## Prerequisites
- A valid Merchant ID is required.
- Authentication is required using API Key and API Secret.
- Ensure the merchant exists within the Surfboard system.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/payment-methods
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// No request body is needed for a GET request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Response data. Contains a list of payment methods. |
| data.paymentMethodId | string | PaymentMethod ID of the payment method. |
| data.paymentMethod | string | Specifies the payment method. It can be one of the following: 'AMEX', 'SWISH', or 'CARD’. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"paymentMethodId": "8235c0a33bd9800223",
			"paymentMethod": "SSWISH"
		},
		{
			"paymentMethodId": "8235c0943bd9800023",
			"paymentMethod": "AMEX"
		}
	],
	"message": "Fetched activated payment methods"
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name *No error information was provided in the original JSON.*
```json
{}
```
**Description:** *No error information was provided in the original JSON.  Please add error responses for a complete documentation.*

## Notes
- Replace `YOUR_API_KEY`, `YOUR_API_SECRET`, and `YOUR_MERCHANT_ID` with your actual credentials.
- The `paymentMethod` values are case-sensitive and should match the allowed values ('AMEX', 'SWISH', 'CARD') exactly.
- Ensure the `merchantId` in the URL path is a valid and existing merchant ID.

---
