# Get Gift Card Details

## Overview
Retrieves detailed information for a specific gift card using its ID or PAN. Includes customer details, transaction history summary, and format representations.

## Prerequisites
- API key and secret are required for authentication.
- Merchant ID is required to identify the merchant making the request.

## Request

### HTTP Method and URL
```
GET /giftcards/:id
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| api-key | YOUR_API_KEY | Yes |
| api-secret | YOUR_API_SECRET | Yes |
| merchant-id | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// Example request is constructed using path parameter ":id"
// No request body needed for GET requests
// Sample URL: /giftcards/83a2adb2fd9d58095c
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Detailed gift card information. |
| data.giftCardId | string | Unique identifier for the gift card. |
| data.pan | string | Primary Account Number for the gift card. |
| data.name | string | Name of the gift card. |
| data.cardType | string | Type of the gift card (FUND or ENTITLEMENT). |
| data.amount | number | Original monetary amount for FUND type gift cards. |
| data.currentAmount | number | Current remaining amount for FUND type gift cards. |
| data.usageCount | number | Number of times the gift card has been used. |
| data.redemptionLimit | number | Usage limit for ENTITLEMENT type gift cards. |
| data.currency | string | Currency code for the gift card. |
| data.accessControl | string | Access control level of the gift card. |
| data.status | string | Current status of the gift card. |
| data.expiryDate | string | Expiry date of the gift card. |
| data.lastTransactionAt | string | Timestamp of the last transaction. |
| data.transactionCount | number | Total number of transactions. |
| data.totalRedeemed | number | Total amount redeemed from the gift card. |
| data.customerDetails | object | Customer information associated with the gift card. |
| data.customerDetails.customerId | string | Unique identifier for the customer. |
| data.customerDetails.firstName | string | Customer's first name. |
| data.customerDetails.middleName | string | Customer's middle name. |
| data.customerDetails.surname | string | Customer's surname. |
| data.customerDetails.countryCode | string | Customer's country code. |
| data.customerDetails.emails | array | Array of customer email addresses. |
| data.customerDetails.emails[].email | string | Customer email address. |
| data.customerDetails.phoneNumbers | array | Array of customer phone numbers. |
| data.customerDetails.phoneNumbers[].phoneNumber | object | Customer phone number details. |
| data.customerDetails.phoneNumbers[].phoneNumber.countryCode | string | Phone number country code. |
| data.customerDetails.phoneNumbers[].phoneNumber.number | string | Phone number. |
| data.shareableLink | string | Shareable link for the gift card. |
| data.formats | object | Different format representations of the gift card. |
| data.formats.qrCode | string | QR code representation of the gift card. |
| data.formats.nfcData | string | NFC data for the gift card. |
| data.formats.barcode | string | Barcode representation of the gift card. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"giftCardId": "83a2adb2fd9d58095c",
		"pan": "1802723955691673",
		"name": "Birthday Gift Card",
		"cardType": "FUND",
		"amount": 100,
		"currentAmount": 75,
		"usageCount": 2,
		"redemptionLimit": 0,
		"currency": "SEK",
		"accessControl": "OPEN",
		"externalId": "m_iWGri3XAyTmkbKYsYtV47",
		"externalIdType": "MERCHANT",
		"status": "ACTIVE",
		"expiryDate": "2025-12-31T00:00:00.000Z",
		"lastTransactionAt": "2024-11-15T10:30:00Z",
		"transactionCount": 2,
		"totalRedeemed": 25,
		"customerDetails": {
			"customerId": "83a2adb2fd9d58001c",
			"firstName": "John",
			"surname": "Doe",
			"countryCode": "SE",
			"emails": [{"email": "john.doe@example.com"}],
			"phoneNumbers": [{"phoneNumber": {"countryCode": "+46", "number": "701234567"}}]
		},
		"shareableLink": "https://slr.test.surfboard.se/afaa6fb5",
		"formats": {
			"qrCode": "undefinedVWwIYiYXCANr202512310200",
			"nfcData": "undefinedVWwIYiYXCANr202512310200",
			"barcode": "2877866156"
		}
	},
	"message": "Gift card details retrieved successfully"
}
```

## Error Responses

### Possible Errors
TBD

## Notes
- Replace `YOUR_API_KEY`, `YOUR_API_SECRET`, and `YOUR_MERCHANT_ID` with your actual credentials.
- The `:id` path parameter can accept either the `giftCardId` or the `pan` of the gift card.

---
