# Create Gift Card

## Overview
Creates a new gift card with specified type and configuration. Gift cards can be FUND type (with monetary value) or ENTITLEMENT type (with usage limits).

## Prerequisites
- Merchant account must be set up.
- API keys (api-key and api-secret) and merchant ID must be obtained.
- Ensure you have the correct permissions to create gift cards.

## Request

### HTTP Method and URL
```
POST /giftcards
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| api-key | YOUR_API_KEY | Yes |
| api-secret | YOUR_API_SECRET | Yes |
| merchant-id | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| cardType | string | Yes | Type of gift card to create. Possible values: `FUND`, `ENTITLEMENT`.  `FUND`: Gift card with monetary value. `ENTITLEMENT`: Gift card with usage-based limits. |
| amount | number | Conditional | Monetary amount for FUND type gift cards. Required when `cardType` is `FUND`. |
| redemptionLimit | number | Conditional | Number of times the gift card can be used. Required when `cardType` is `ENTITLEMENT`. |
| currency | string | Optional | Currency code for the gift card amount. |
| name | string | Optional | Optional name for the gift card. |
| accessControl | string | Optional | Access control level for the gift card. Possible values: `OPEN`, `RESTRICTED`.  `OPEN`: Gift card can be used by anyone. `RESTRICTED`: Gift card has restricted access. |
| expiryDate | string | Optional | Expiry date for the gift card in mm/dd/yyyy or mm-dd-yyyy format. |
| note | string | Optional | Optional note or description for the gift card. |

### Request Example
```json
{
	"cardType": "FUND",
	"amount": 100.00,
	"currency": "SEK",
	"name": "Holiday Gift Card",
	"accessControl": "OPEN",
	"expiryDate": "12/31/2024",
	"note": "Happy Holidays!"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing gift card details. |
| data.giftCardId | string | Unique identifier for the created gift card. |
| data.pan | string | Primary Account Number for the gift card. |
| data.name | string | Name of the gift card. |
| data.formats | object | Different format representations of the gift card. |
| data.formats.qrCode | string | QR code representation of the gift card. |
| data.formats.nfcData | string | NFC data for the gift card. |
| data.formats.barcode | string | Barcode representation of the gift card. |
| data.cardType | string | Type of the gift card (FUND or ENTITLEMENT). |
| data.amount | number | Monetary amount for FUND type gift cards. |
| data.redemptionLimit | number | Usage limit for ENTITLEMENT type gift cards. |
| data.currency | string | Currency code for the gift card. |
| data.accessControl | string | Access control level of the gift card. |
| data.externalId | string | External identifier for the gift card. |
| data.externalIdType | string | Type of external identifier. |
| data.status | string | Current status of the gift card. |
| data.shareableLink | string | Shareable link for the gift card. |
| data.expiryDate | string | Expiry date of the gift card. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"giftCardId": "83a5aea0381600045c",
		"pan": "1504703347938280",
		"name": "Birthday Gift Card",
		"formats": {
			"qrCode": "undefinedVWwIYiYXCANr202512310200",
			"nfcData": "undefinedVWwIYiYXCANr202512310200",
			"barcode": "2877866156"
		},
		"cardType": "FUND",
		"amount": 100,
		"redemptionLimit": 0,
		"currency": "SEK",
		"accessControl": "OPEN",
		"externalId": "m_iWGri3XAyTmkbKYsYtV47",
		"externalIdType": "MERCHANT",
		"status": "CREATED",
		"shareableLink": "https://slr.test.surfboard.se/afaa6fb5"
	},
	"message": "Gift card created successfully"
}
```

## Error Responses

### Possible Errors

#### TBD - Missing Mandatory Parameter
```json
{
    "status": "ERROR",
    "message": "Missing mandatory parameter: cardType"
}
```
**Description:** Occurs when a mandatory parameter, such as `cardType`, is missing from the request. Ensure all required parameters are included in the request body.

#### TBD - Invalid Card Type
```json
{
    "status": "ERROR",
    "message": "Invalid card type. Supported types are FUND and ENTITLEMENT."
}
```
**Description:** Occurs when the `cardType` parameter has an invalid value.  Make sure the value is either `FUND` or `ENTITLEMENT`.

#### TBD - Missing Amount for FUND Card
```json
{
    "status": "ERROR",
    "message": "Amount is required for FUND type gift cards."
}
```
**Description:** Occurs when `cardType` is set to `FUND` but the `amount` parameter is missing.  Provide a valid `amount` when creating a `FUND` type gift card.

#### TBD - Missing Redemption Limit for ENTITLEMENT Card
```json
{
    "status": "ERROR",
    "message": "Redemption limit is required for ENTITLEMENT type gift cards."
}
```
**Description:** Occurs when `cardType` is set to `ENTITLEMENT` but the `redemptionLimit` parameter is missing. Provide a valid `redemptionLimit` when creating an `ENTITLEMENT` type gift card.

#### TBD - Invalid API Key
```json
{
    "status": "ERROR",
    "message": "Invalid API Key"
}
```
**Description:** Occurs when an invalid or expired API key is provided. Verify the API key and try again.

---

## Notes
- The `externalId` and `externalIdType` parameters in the response provide a way to link the gift card to an external system.
-  The QR code, NFC data, and barcode formats of the gift card are provided for easy integration with different payment systems.
- The expiry date format must be either mm/dd/yyyy or mm-dd-yyyy.
