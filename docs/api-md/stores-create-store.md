# Create Store

## Overview
Creates a store under a merchant. Use this API to create a store to which you can register your terminals. You can create a single store or multiple stores under a merchant based on your requirements.

## Prerequisites
- An existing partner and merchant must be created.
- The partner and merchant IDs are required for the request URL.
- Authentication via API Key and Secret is required.
- Content-Type must be set to application/json.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants/:merchantId/stores
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeName | string | Yes | Name of the store. |
| email | string | No | Email address of the store. Email address is mandatory to support online payments. |
| phoneNumber | object | Yes | Contact number of the store in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp; code | number | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp; number | string | Yes | A string of numbers ranging from 0-9 with a length of 5-15 characters. |
| address | string | Yes | Address line 1 of the store. |
| careOf | string | No | Name of the addressee that is accepting the correspondence for the intended recipient. |
| city | string | Yes | Name of the city where the store is located. |
| zipCode | string | Yes | ZIP code of the store. |
| country | string | Yes | Two-letter ISO country code in uppercase, representing the location of the store. |
| acquirerMID | string | No | Acquirer Merchant ID is a mandatory parameter for PF partners who want to support a store based acquiring model. Conditional: Dependent on supporting a store-based acquiring model. |
| onlineInfo | object | No | In order to start accepting online payments you need to create an online store which requires some additional properties such as the following. |
| &nbsp;&nbsp;&nbsp;&nbsp; merchantWebshopURL | string | Yes | This is the web-shop URL of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp; paymentPageHostURL | string | No | This is the URL of the payment page. This is required for integrating online payments using SDK mode. |
| &nbsp;&nbsp;&nbsp;&nbsp; termsAndConditionsURL | string | Yes | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp; privacyPolicyURL | string | Yes | This is the URL of the privacy policy of the merchant. |

### Request Example
```json
{
  "storeName": "Trial Store",
  "email": "TS@gmail.com",
  "phoneNumber": {
    "code": 91,
    "number": "3214576980"
  },
  "address": "10,",
  "city": "Stockholm",
  "zipCode": "103 16",
  "country": "SE",
  "onlineInfo": {
    "merchantWebshopURL": "https://testmerchantportal.com/home",
    "paymentPageHostURL": "https://testmerchantportal.com/payment",
    "termsAndConditionsURL": "https://testmerchantportal.com/terms",
    "privacyPolicyURL": "https://testmerchantportal.com/privacy"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp; storeId | string | Store ID of the created store. |
| &nbsp;&nbsp;&nbsp;&nbsp; merchantId | string | The Merchant ID of the merchant under which the store is created. |
| &nbsp;&nbsp;&nbsp;&nbsp; name | string | Name of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp; address | object | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; careOf | string | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; addressLine1 | string | First line of address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; addressLine2 | string | Second line of address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; addressLine3 | string | Third line of address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; city | string | Name of the City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; countryCode | string | Two-letter ISO country code in uppercase, representing the location of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; postalCode | string | Postal Code of the place where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp; phone | string | Contact number of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp; email | string | Email address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp; merchantURLDomainVerficationKey | string | This is a key to set and verify that the merchant owns the domain of the URL. |
| &nbsp;&nbsp;&nbsp;&nbsp; paymentPageURLDomainVerficationKey | string | This is a key to set and verify the payment page domain URL. |
| message | string | A message that describes the status of the request |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"storeId": "81d64e7174dcb00b0f",
		"merchantId": "818712cdbcb670070e",
		"name": "Trial Store",
		"address": {
				"addressLine1":"10",
				"addressLine2":null ,
				"addressLine3":null ,
				"city": "Stockholm",
				"countryCode": "SE",
				"postalCode": "103 16"
		},
		"phone": "3214576980",
		"email": "TS@gmail.com",
		"merchantUrlDomainVerificationKey": "499470649f03b53fa1175659d4389743974710260b7f410313487e6062b3d559",
	    "paymentPageUrlDomainVerificationKey": "2179beab4f5e8c3960615205f042939a2ccc6c51a6e5923c9c068b3d9a645590"
	},
	"message": "Store Created Successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "FAILED",
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs if any of the required request parameters are missing or invalid. Check the request body against the schema and ensure all required fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "FAILED",
  "message": "Invalid API key or secret."
}
```
**Description:** This error occurs if the API key or secret provided in the request headers are incorrect or missing. Verify that the API key and secret are correct and properly included in the headers.

#### 403 - Forbidden
```json
{
  "status": "FAILED",
  "message": "Merchant not found."
}
```
**Description:** This error occurs if the merchant ID provided in the request URL does not exist or the partner does not have permission to access the merchant. Verify that the merchant ID is correct and that the partner has the necessary permissions.

#### 500 - Internal Server Error
```json
{
  "status": "FAILED",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates that an unexpected error occurred on the server while processing the request. This could be due to a variety of issues, such as database connection problems or code errors. If this error persists, contact support with the request details for further assistance.

## Notes
- The `partnerId` and `merchantId` in the URL path are case-sensitive.
- Ensure that the `country` code is a valid two-letter ISO country code in uppercase.
- When supporting a store-based acquiring model, `acquirerMID` is mandatory.
---
