# Create Merchant

## Overview
As a partner, use the Create Merchant API to onboard your sub-merchants for using Surfboard's payment solutions. You can also display products ( terminals, accessories etc. from Surfboard) for your merchants to choose, set product pricing plans for your merchant, display the product catalogue, and pre-select products for your merchants.

## Prerequisites
- Partner account with API key and secret.
- Authentication is required using the `API-KEY` and `API-SECRET` headers.
- Ensure the partner ID is correctly included in the URL.
- Merchant applications in test and demo environments are configured for automatic approval.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `country` | string | Yes | Two-letter ISO country code, in uppercase e.g 'SE', 'DK', 'NO'. |
| `organisation` | object | No | Details of the organisation. |
| &nbsp;&nbsp;&nbsp;&nbsp;`corporateId` | string | Yes | Provide the corporate ID of the respective merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`legalName` | string | Conditional | The legal name of the organization. Mandatory for a PF partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mccCode` | string | Conditional | Merchant Category Code (MCC) of the organization. Mandatory for a PF partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | object | Conditional | The address of the organization. Mandatory for a PF partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | string | No | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | string | Yes | Address of the organisation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | string | No | Address of the organisation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | string | No | Address of the organisation. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | string | Yes | City where the organisation is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | string | Yes | Two-letter ISO country code in uppercase, representing the country where the organization is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | string | Yes | Postal code of the organisation. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | object | No | Contact number of the organisation in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | number | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | string | Yes | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | string | Conditional | Email address of the organization. Mandatory for a PF partner. |
| `multiMerchantId` | string | No | The multi merchant ID in case this merchant should belong to a multiMerchant setup. |
| `controlFields` | object | No | These fields allow you to control the behavior of the API by adding additional actions or controlling the default execution path of the API call. |
| &nbsp;&nbsp;&nbsp;&nbsp;`displayProducts` | array | No | Allows the customization of product display for onboarding merchants. Specify a set of Product IDs (e.g. terminals, accessories) to be shown. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | string | Yes | Represents the product ID of a product selected for delivery to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pricingPlans` | array | No | A list of strings specifying the billing plan for a merchant. This allows you to set up a plan based on the monthly price for a terminal and the duration in months. The specific plan details are provided by Surfboard. |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerConfig` | object | Conditional | Configuration for acquirer settings. This is mandatory for PF partners and Direct merchants. Now supports structured format with additional fields. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | string | No | Currency code for the acquirer configuration (e.g., 'SEK', 'EUR', 'USD'). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acquirer` | string | No | Name of the acquirer (e.g., 'nets', 'swedbank'). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acquirerMID` | string | No | Acquirer Merchant ID for transaction processing in structured format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`showProductCatalogue` | boolean | No | Toggles the visibility of the product catalogue during the Web KYB process. Defaults to false if not specified. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantConfig` | object | No | Configuration settings for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementFrequency` | string | No | Settlement frequency for the merchant payments. Possible values: `DAILY`, `WEEKLY`, `MONTHLY`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceProvider` | array | No | Array of service provider configurations for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceProviderId` | string | Yes | Unique identifier of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`deductApplicableTransactionFee` | boolean | No | Whether to deduct applicable transaction fees. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | object | No | Fee structure for the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | string | No | Percentage-based fee. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixed` | number | No | Fixed fee amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustmentTypes` | array | No | Array of adjustment types for the fee structure. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionPricingPlan` | string | No | Specifies the billing plan based on which transaction cost is calculated for a merchant. If more than one billing plan exists it is mandatory to send in this value. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethods` | object | No | Configuration for payment methods to be enabled for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`card` | object | No | Card payment method configuration. Can be a boolean to enable/disable or an object with specific settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlan` | string | No | Billing plan for card payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mId` | string | No | Merchant ID for card payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`scheme` | array | Yes | Array of supported card schemes. Possible values: `visa`, `mastercard`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amex` | object | No | American Express payment method configuration. Can be a boolean to enable/disable or an object with specific settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mId` | string | Yes | American Express Merchant ID. Required when configuring AMEX payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`swish` | object | No | Swedish mobile payment method configuration. Can be a boolean to enable/disable or an object with specific settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlan` | string | No | Billing plan for Swish payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`swishNumber` | string | No | Optional Swish number for the payment method configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`klarna` | object | No | Buy now, pay later payment method configuration. Can be a boolean to enable/disable or an object with specific settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlan` | string | No | Billing plan for Klarna payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mId` | string | No | Klarna Merchant ID for the payment method configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`klarnaPricingPlan` | string | No | Klarna pricing plan configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`username` | string | Yes | Klarna account username. Required when configuring KLARNA payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`password` | string | Yes | Klarna account password. Required when configuring KLARNA payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`b2binv` | object | No | B2B invoice payment method configuration. Can be a boolean to enable/disable or an object with specific settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlan` | string | No | Billing plan for B2B invoice payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`clientId` | string | No | Client ID for B2B invoice payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`clientSecretKey` | string | No | Client secret key for B2B invoice payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acc2acc` | object | No | Account to account transfer payment method configuration. Can be a boolean to enable/disable or an object with specific settings. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingPlan` | string | No | Billing plan for account-to-account payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mId` | string | No | Merchant ID for account to account transfers. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vipps` | boolean | No | Norwegian mobile payment method. Set to true to enable Vipps payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`mobilepay` | boolean | No | Danish mobile payment method. Set to true to enable MobilePay payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preSelectProducts` | array | No | A set of products that are pre-selected by you for the merchant. These products are shipped as part of the onboarding process without further input from the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | string | Yes | Represents the product ID of a product selected for delivery to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`quantity` | string | No | Quantity of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pricingPlanId` | string | No | Specifies the billing plan for a merchant. This allows you to set up a plan based on the monthly price for a terminal and the duration in months. The specific plan details are provided by Surfboard. |
| &nbsp;&nbsp;&nbsp;&nbsp;`redirectUrl` | string | No | This will be the redirect URL from the web kyb page, once the application is submitted the user can choose to redirect to the provided URL. |
| &nbsp;&nbsp;&nbsp;&nbsp;`generateShortLink` | boolean | No | Set as true when you need the short URL for the web kyb page. Default is set to false. |
| &nbsp;&nbsp;&nbsp;&nbsp;`store` | object | Conditional | Input the store details if you also want to create a store for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | string | Yes | Name of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | string | Yes | Email address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | object | Yes | Contact number of the store in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | string | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | string | Yes | A string of numbers ranging from 0-9 with a length of 5-15 characters. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address` | object | Yes | The address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | string | No | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | string | Yes | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | string | No | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | string | No | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | string | Yes | City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | string | Yes | Two-letter ISO country code in uppercase, representing the country where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | string | Yes | Postal code of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`onlineInfo` | object | No | In order to start accepting online payments you need to create an online store which requires some additional properties such as the following. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantWebshopURL` | string | Yes | This is the web-shop URL of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentPageHostURL` | string | No | This is the URL of the payment page. This is required for integrating online payments using SDK mode. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`termsAndConditionsURL` | string | Yes | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`privacyPolicyURL` | string | Yes | This is the URL of the privacy policy of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`googlePayMerchantId` | string | No | This is the Google Pay merchant ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preEnteredInformation` | object | No | Use this param to pre fill the merchant application |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`openingInfo` | object | No | These details helps us understand when payments are accepted for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isSeasonalOpen` | boolean | Yes | If they are a seasonal merchant, open only on select seasons. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`monthsOpen` | array | No | If they are a seasonal merchant, mention the months they will be open for payments. e.g., Seasonal shops open only during january and map can be mentioned as [1,5] |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isOpenAllYear` | boolean | Yes | If merchant will be accepting payments all year round. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isStoreOpenAtNight` | boolean | Yes | Mention if merchant stores are open all night. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reasonForOpeningAtNight` | string | Conditional | Provide a reason as to why they are open all night. Mandatory when 'isStoreOpenAtNight' is set to true. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`giftcards` | object | No | Gift card details of the merchant if any. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amountPerYear` | number | Yes | Estimated amount spent using gift cards per year. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageValidDays` | number | Yes | Average validity of gift card provided by merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`prePayments` | object | No | Details of pre payment option provided by merchant |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageDeliveryTimeInDays` | number | Yes | Average delivery time in days taken after pre payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`salesPercentPerYear` | number | Yes | Percentage of sales revenue generated via pre payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fundsInfo` | object | No | Sales information with respect to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedAmountPerYear` | number | Yes | Estimated amount of sales per year. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`priceOfMostExpensiveItemSold` | number | Yes | Price of most expensive item. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageTransactionValuePerDay` | number | Yes | Estimated amount of sales per day. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedAmountPerTransaction` | number | Yes | Average amount per transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedFrequencyOfTransactions` | string | Yes | Denotes how often transactions are made under merchant. Possible values are 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY' |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedNoOfDailyTransactions` | number | Conditional | Average number of sales per day. Mandatory when 'estimatedFrequencyOfTransactions' is set to 'DAILY' |

### Request Example
```json
{
	"country": "SE",
	"organisation": {
		"corporateId": "5591631360",
		"legalName": "Year Zero Press AB",
		"mccCode": "5192",
		"address": {
			"careOf": "John Doe",
			"addressLine1": "Main Street 123",
			"addressLine2": "Building C",
			"city": "Stockholm",
			"countryCode": "SE",
			"postalCode": "123 45"
		},
		"email": "contact@test.com"
	},
	"controlFields": {
		"transactionPricingPlan": "SP_SE_Fix129",
		"generateShortLink": true,
		"acquirerConfig": {
			"acquirerMID": "752113",
			"acquirer": "nets"
		},
		"store": {
			"name": "Test Store",
			"email": "test@test.com",
			"acquirerMID": "752113",
			"phoneNumber": {
				"code": "46",
				"number": "987654321"
			},
			"address": {
				"careOf": "Jane Doe",
				"addressLine1": "Second Street 456",
				"city": "Stockholm",
				"countryCode": "SE",
				"postalCode": "123 46"
			}
		}
	}
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request 'SUCCESS' | 'ERROR'. |
| `data` | object | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | string | This is the applicationId that you will use to track the status of the create merchant request. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | string | This is the link for the KYC session created for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | string | For PF partners, merchant is created and the merchantId is returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | string | For PF partners, store is created and the storeId is returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;`shortLinkUrl` | string | Short URL of the web kyb page if generateShortLink is set to true. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"applicationId": "8268abfc4ae6900a10",
		"webKybUrl": "https://surfkyb.com/8268abfc4ae6900a10?pi=M703SPUzM0Rhz0f91l209KundIhf-1vZnPfSEQX7UdQBnwbkR4bZIUtHZAh4WmUAiwb2J8Rjnuus10i8QrFYncEA18qbAS6QszW641AYdymGi8-PkmZd"
	},
	"message": "Merchant application created successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
    "status": "ERROR",
    "data": null,
    "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required fields. Review the request parameters and ensure all required fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "data": null,
    "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret is invalid. Verify that the API key and secret are correct and properly included in the request headers.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "data": null,
    "message": "Insufficient permissions."
}
```
**Description:** The partner does not have sufficient permissions to create a merchant. Contact Surfboard support to request the necessary permissions.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "data": null,
    "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the error persists, contact Surfboard support.

## Notes
- Conditional fields are required depending on the partner type (PF partner, Direct Merchant).
- For PF partners, providing organisation details, acquirer configuration is mandatory.
- Make sure country codes are always in uppercase.
-  Merchant applications in test and demo environments are configured for automatic approval.

---
