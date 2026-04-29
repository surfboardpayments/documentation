# Add Customer Details

## Overview
Creates a new customer profile with personal information, addresses, contact details, and associated payment cards. Use this API to register new customers and store their comprehensive information for future transactions and customer management.

## Prerequisites
- An active merchant account.
- API Key, API Secret, and Merchant ID are required for authentication.
- Content-Type header must be set to application/json.

## Request

### HTTP Method and URL
```
POST /customers
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*No query parameters for this endpoint.*

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| firstName | string | No | Customer's first name. |
| middleName | string | No | Customer's middle name. |
| lastName | string | No | Customer's surname or last name. |
| birthDate | string | No | Customer's date of birth in YYYY/MM/DD format. |
| countryCode | string | No | Two-letter ISO country code representing the customer's country, in uppercase. |
| gender | string | No | Customer's gender. |
| address | array | No | Array of customer addresses for different purposes (shipping, billing, etc.). |

#### address Array Properties
| Parameter | Type | Required | Description |
|---|---|---|---|
| address[].careOf | string | No | Care of information for the address. |
| address[].addressLine1 | string | Yes | First line of the customer's address. |
| address[].addressLine2 | string | No | Second line of the customer's address. |
| address[].addressLine3 | string | No | Third line of the customer's address. |
| address[].city | string | Yes | City of the customer's address. |
| address[].countryCode | string | Yes | Two-letter ISO country code for the address, in uppercase. |
| address[].postalCode | string | Yes | Postal code of the customer's address. |
| address[].role | string | No | Purpose of the address (e.g., 'shipping', 'billing'). |

| Parameter | Type | Required | Description |
|---|---|---|---|
| emails | array | No | Array of customer email addresses with their respective roles. |

#### emails Array Properties
| Parameter | Type | Required | Description |
|---|---|---|---|
| emails[].email | string | Yes | Customer's email address. |
| emails[].role | string | Yes | Role or purpose of the email address. |

| Parameter | Type | Required | Description |
|---|---|---|---|
| phoneNumbers | array | No | Array of customer phone numbers with their respective roles. |

#### phoneNumbers Array Properties
| Parameter | Type | Required | Description |
|---|---|---|---|
| phoneNumbers[].phoneNumber | object | Yes | Customer's phone number details. |

##### phoneNumbers[].phoneNumber Object Properties
| Parameter | Type | Required | Description |
|---|---|---|---|
| phoneNumbers[].phoneNumber.code | string | Yes | International dialing code for the phone number. |
| phoneNumbers[].phoneNumber.number | string | Yes | Phone number without the country code. |

| Parameter | Type | Required | Description |
|---|---|---|---|
| phoneNumbers[].role | string | No | Role or purpose of the phone number (e.g., 'own', 'work', 'home'). |
| cardIds | array | No | Array of payment card identifiers associated with the customer. |

### Request Example
```json
{
	"firstName": "John",
	"middleName": "Doe",
	"birthDate": "1940/03/04",
	"countryCode": "SE",
	"address": [
		{
			"careOf": "second address at 3:40",
			"addressLine1": "second address at 3:40",
			"addressLine2": "3rd west street",
			"addressLine3": "B-Block",
			"city": "Ølstykke Stenløse",
			"countryCode": "SE",
			"postalCode": "99 999",
			"role": "shipping"
		}
	],
	"phoneNumbers": [
		{
			"phoneNumber": {
				"code": "91",
				"number": "9876543210"
			},
			"role": "own"
		}
	],
	"cardIds": [
		"824c514bfe001805f0",
		"827a63468b993801f0",
		"827a63460b99380df0"
	]
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing the created customer information. |

#### data Object Properties
| Parameter | Type | Description |
|---|---|---|
| data.customerId | string | Unique identifier assigned to the newly created customer. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"customerId": "83018337960e2802f7"
	},
	"message": "Added customer successfully"
}
```

## Error Responses

### Possible Errors

#### *No error responses provided in the JSON data.*

## Notes
- Ensure all required fields are present in the request body for successful customer creation.
- The `countryCode` should be in uppercase, following the two-letter ISO standard.
---
