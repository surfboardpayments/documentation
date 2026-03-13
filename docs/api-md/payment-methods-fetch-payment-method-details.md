# Fetch Payment Method Details

## Overview
Retrieves information for a specific payment method. Use this API to get information regarding the payment method using its Payment Method ID.

## Prerequisites
- A valid Merchant ID.
- A valid Payment Method ID.
- Authentication via API Key and API Secret.
- API Key, API Secret, and Merchant ID must be properly configured in the request headers.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/payment-methods/:paymentMethodId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
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
| data | object | Response data |
| data.paymentMethodId | String | PaymentMethod ID of the payment method. |
| data.paymentMethod | String | Specifies the payment method. It can be one of the following: 'AMEX', 'SWISH', or 'CARD’. |
| data.status | String | Status of the payment method, indicated as either ACTIVATED' or 'DEACTIVATED’. |
| data.amexMID | Number | Returns AMEX MID for AMEX payment method. |
| data.acquirerMID | String | Returns the respective Acquirer MID for CARD payment method. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"paymentMethodId": "8235c0943bd9800023",
		"paymentMethod": "AMEX",
		"status": "ACTIVATED",
		"amexMID": "abcedefg"
	},
	"message": "Fetched payment method successfully"
}
```

## Error Responses

### Possible Errors
N/A - (No error codes were provided in the original data.)

## Notes
- Ensure you have the correct Merchant ID and Payment Method ID.
- API Key and API Secret are required for authentication.
---
