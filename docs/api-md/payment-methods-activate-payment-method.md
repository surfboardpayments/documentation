# Activate Payment Method

## Overview
Activates multiple payment methods for a merchant in a single request. Each payment method can be enabled with a boolean value.

## Prerequisites
- A valid Surfboard account.
- API Key and Secret are required for authentication.
- The Merchant ID must be known.
- Ensure the payment methods you are trying to activate are supported by your Surfboard account.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/payment-methods
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | No | Optional store identifier to associate payment methods with a specific store. |
| merchantId | string | No | Optional merchant identifier for the payment method configuration. |
| card | boolean | No | Card payment method configuration. Set to `true` to enable card payments. |
| amex | boolean | No | American Express payment method configuration. Set to `true` to enable AMEX payments. |
| swish | boolean | No | Swedish mobile payment method configuration. Set to `true` to enable Swish payments. |
| klarna | boolean | No | Buy now, pay later payment method configuration. Set to `true` to enable Klarna payments. |
| b2binv | boolean | No | B2B invoice payment method configuration. Set to `true` to enable B2B invoice payments. |
| acc2acc | boolean | No | Account to account transfer payment method configuration. Set to `true` to enable account to account transfers. |
| vipps | boolean | No | Norwegian mobile payment method. Set to `true` to enable Vipps payment method. |
| mobilepay | boolean | No | Danish mobile payment method. Set to `true` to enable MobilePay payment method. |

### Request Example
```json
{
	"card": true,
	"amex": true,
	"swish": true,
	"klarna": true,
	"b2binv": true,
	"acc2acc": true,
	"vipps": true,
	"mobilepay": true
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of payment method registration results. |
| data[].method | string | The payment method name (e.g., 'amex', 'swish', 'card'). |
| data[].paymentMethodId | string | Unique identifier assigned to the payment method (present on success). |
| data[].status | string | Registration status for this payment method, either 'SUCCESS' or 'ERROR'. |
| data[].message | string | Error message if registration failed (present on error). |
| message | string | A message that describes the overall status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"method": "b2binv",
			"paymentMethodId": "838f499c1f7bf00c23",
			"status": "SUCCESS"
		},
		{
			"method": "card",
			"paymentMethodId": "82523116c63be80123",
			"status": "SUCCESS"
		},
		{
			"method": "swish",
			"status": "ERROR",
			"message": "PM_0010 - Register payment method failed: SWISH registration already exists."
		},
		{
			"method": "acc2acc",
			"paymentMethodId": "838f499c1f7bf01c23",
			"status": "SUCCESS"
		}
	],
	"message": "Processed payment method registrations"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
    "status": "ERROR",
    "message": "Invalid request format."
}
```
**Description:** The request body does not conform to the expected JSON format, or a mandatory field is missing. Ensure the request body is correctly formatted and includes all required fields.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or Secret provided in the request headers are incorrect or missing. Double-check your API credentials and ensure they are included in the request headers.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Merchant does not have permission."
}
```
**Description:** The merchant associated with the Merchant ID does not have permission to perform this action. Verify the Merchant ID and ensure the associated merchant has the necessary permissions.

#### 404 - Not Found
```json
{
    "status": "ERROR",
    "message": "Merchant not found."
}
```
**Description:** The specified Merchant ID does not exist. Verify the Merchant ID and ensure it is a valid, existing merchant.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Contact Surfboard support and provide the request details for further investigation.

## Notes
- Each payment method is configured individually.
- Setting a payment method to `true` enables it for the specified merchant and/or store.
- If a payment method is already registered, attempting to register it again may result in an error.
- It's important to handle errors gracefully in your application.

---
