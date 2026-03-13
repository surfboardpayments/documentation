# Fetch All Merchants

## Overview
Retrieves a list of all merchants associated with a specific partner. Partners can use this API to get information regarding all their sub-merchants. This endpoint supports pagination.

## Prerequisites
- Partner must be registered with Surfboard.
- Partner must have merchants associated with them.
- API Key and API Secret are required for authentication.
- Content-Type header must be set to `application/json`.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

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
    "API-SECRET": "YOUR_API_SECRET"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | array | Response data containing a list of merchant objects. |
| data[].merchantId | String | Merchant ID of the merchant. |
| data[].partnerId | String | The Partner ID of the partner with whom the merchant is affiliated. |
| data[].merchantName | String | Name of the merchant. |
| data[].merchantLanguage | String | Preferred language selected by the merchant. |
| data[].merchantLogoUrl | String | Merchant logo URL. |
| data[].email | String | Email address of the merchant. |
| data[].companyId | String | Company ID of the merchant. |
| data[].countryCode | String | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| data[].mccCode | String | Merchant Category Code (MCC) of the merchant. |
| data[].address | object | Physical address of the merchant. |
| data[].address.careOf | string | Name of the addressee that is accepting the correspondence for the intended recipient. |
| data[].address.addressLine1 | string | Address of the merchant. |
| data[].address.addressLine2 | string | Address of the merchant. |
| data[].address.addressLine3 | string | Address of the merchant. |
| data[].address.city | string | City where the merchant is located. |
| data[].address.countryCode | string | Two-letter ISO country code in uppercase, representing the location of the merchant. |
| data[].address.postalCode | string | Postal code of the merchant. |
| data[].createdAt | String | Timestamp at which the merchant was created. |
| data[].totalNumberOfTransaction | string | The total number of transactions performed. |
| data[].totalAmountOfTransaction | string | The total amount of money involved in all transactions. |
| data[].lastTransactionAt | string | The timestamp of the last transaction in ISO format. |
| data[].phoneNumber | string | The contact phone number related to the merchant. |
| data[].currencyCode | Number | Three-digit ISO currency code, representing the supported currency for the merchant. Can be any one of the following: ‘208’ | ‘978’ | ‘752’. |
| data[].acquirerMID | string | Denotes the Acquirer MID for onboarding merchants through payment institution partners(PF or Acquirer). |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"merchantId": "8248db4c5c8dd0130e",
			"partnerId": "8113d3f8403b380409",
			"merchantName": "Raynor LLC",
			"merchantLanguage": "sv",
			"merchantLogoUrl": "https://www.freepik.com/free-vector/hand-painted-watercolor-abstract.htm#query=background&position=0&from_view=keyword&",
			"email": "sathish@surfboard.se",
			"companyId": "5590890439",
			"countryCode": "SE",
			"mccCode": 8021,
			"address":{
			    "careOf": "somebody",
			    "addressLine1": "Some Address",
			    "addressLine2": "Some other address",
			    "addressLine3": null,
			    "city": "Stockholm",
			    "countryCode": "SE",
			    "postalCode": "12345"
			},
			"createdAt": "2024-06-06 06:03:49.125",
			"totalNumberOfTransaction": "11",
			"totalAmountOfTransaction": "2200",
			"lastTransactionAt": "2024-08-22 07:58:35.310568",
			"phoneNumber": "4623423423",
			"currencyCode": "752",
			"acquirerMID": "gkjb4ug3KAUP"
		},
		{
			"merchantId": "81a25a0b304ed0070e",
			"partnerId": "8113d3f8403b380409",
			"merchantName": "Conroy, Hane",
			"merchantLanguage": "en",
			"merchantLogoUrl": "https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg",
			"email": "conroy@gmail.com",
			"companyId": null,
			"countryCode": "SE",
			"mccCode": 5812,
			"address":{
			    "careOf": "somebody",
			    "addressLine1": "Some Address",
			    "addressLine2": null,
			    "addressLine3": null,
			    "city": "Gothenburg",
			    "countryCode": "SE",
			    "postalCode": "54321"
			},
			"createdAt": "2022-11-04 13:41:46.81",
			"totalNumberOfTransaction": "1877",
			"totalAmountOfTransaction": "774628102",
			"lastTransactionAt": "2024-07-15 09:23:09.816546",
			"phoneNumber": "+468787870484",
			"currencyCode": "752",
			"acquirerMID": "kpIy8YO3ycKyhKR"
		}
	],
	"message": "Successfully fetched merchants details"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid partner ID"
}
```
**Description:** The partner ID provided in the URL is invalid. Verify the partner ID and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret"
}
```
**Description:** The API Key or Secret provided in the headers is invalid.  Ensure that the API Key and Secret are correct and properly configured.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner not found"
}
```
**Description:** The specified partner ID does not exist. Verify the partner ID and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server. Contact support for assistance.

## Notes
- The endpoint supports pagination. Consult the general API documentation for information on how to use pagination.
- The `partnerId` in the URL is case-sensitive.
- Ensure the `countryCode` is in ISO 3166-1 alpha-2 format (e.g., "SE" for Sweden).
- Ensure the `currencyCode` is a valid ISO 4217 numeric code.
---
