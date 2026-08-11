# Create Merchant

## Overview
As a partner, use the Create Merchant API to onboard your sub-merchants for using Surfboard's payment solutions. You can also display products ( terminals, accessories etc. from Surfboard) for your merchants to choose, set product pricing plans for your merchant, display the product catalog, and pre-select products for your merchants.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `country` | `string` | Yes | Two-letter ISO country code, in uppercase e.g 'SE', 'DK', 'NO'. |
| `localeSelected` | `string` | No | Preferred locale for the merchant application, for example 'sv' or 'en'. |
| `organisation` | `object` | No | Details of the organization. |
| &nbsp;&nbsp;&nbsp;&nbsp;`corporateId` | `string` | Yes | Provide the corporate ID of the respective merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`legalName` | `string` | No | The legal name of the organization. Mandatory for a PF partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mccCode` | `string` | No | Merchant Category Code (MCC) of the organization. Mandatory for a PF partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | No | The address of the organization. Mandatory for a PF partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | No | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | Address of the organization. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Address of the organization. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Address of the organization. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City where the organization is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Two-letter ISO country code in uppercase, representing the country where the organization is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Yes | Postal code of the organization. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | No | Contact number of the organization in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `number` | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | No | Email address of the organization. Mandatory for a PF partner. |
| `multiMerchantId` | `string` | No | The multi merchant ID in case this merchant should belong to a multiMerchant setup. |
| `controlFields` | `object` | No | These fields allow you to control the behavior of the API by adding additional actions or controlling the default execution path of the API call. |
| &nbsp;&nbsp;&nbsp;&nbsp;`displayProducts` | `array` | No | Allows the customization of product display for onboarding merchants. Specify a set of Product IDs (e.g. terminals, accessories) to be shown. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Yes | Represents the product ID of a product selected for delivery to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pricingPlans` | `array` | No | A list of strings specifying the billing plan for a merchant. This allows you to set up a plan based on the monthly price for a terminal and the duration in months. The specific plan details are provided by Surfboard. |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerConfig` | `object` | No | Configuration for acquirer settings. This is mandatory for PF partners and Direct merchants. Now supports structured format with additional fields. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | No | Currency code for the acquirer configuration (e.g., 'SEK', 'EUR', 'USD'). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acquirer` | `string` | No | Name of the acquirer (e.g., 'nets', 'swedbank'). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acquirerMID` | `string` | No | Acquirer Merchant ID for transaction processing in structured format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acquirerIID` | `string` | No | Acquirer Institution ID (IID) for the acquirer configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;`showProductCatalogue` | `boolean` | No | Toggles the visibility of the product catalog during the Web KYB process. Defaults to false if not specified. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantConfig` | `object` | No | Configuration settings for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementFrequency` | `string` | No | Settlement frequency for the merchant payments. Possible values: `DAILY`, `WEEKLY`, `MONTHLY`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceProvider` | `array` | No | Array of service provider configurations for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceProviderId` | `string` | Yes | Unique identifier of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`deductApplicableTransactionFee` | `boolean` | No | Whether to deduct applicable transaction fees. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `object` | No | Fee structure for the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | `string` | No | Percentage-based fee. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixed` | `number` | No | Fixed fee amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustmentTypes` | `array` | No | Array of adjustment types for the fee structure. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionPricingPlan` | `string` | No | Specifies the billing plan based on which transaction cost is calculated for a merchant. If more than one billing plan exists it is mandatory to send in this value. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethods` | `object` | No | Configuration for payment methods to be enabled for the merchant. Each key accepts only a boolean value — true to enable, false to disable. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`card` | `boolean` | No | Enable or disable card payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amex` | `boolean` | No | Enable or disable American Express payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`swish` | `boolean` | No | Enable or disable Swish (Swedish mobile) payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`klarna` | `boolean` | No | Enable or disable Klarna (buy now, pay later) payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`b2binv` | `boolean` | No | Enable or disable B2B invoice payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acc2acc` | `boolean` | No | Enable or disable account-to-account transfer payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`svipps` | `boolean` | No | Enable or disable Vipps (Norwegian mobile) payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`smobilepay` | `boolean` | No | Enable or disable MobilePay (Danish mobile) payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preSelectProducts` | `array` | No | A set of products that are pre-selected by you for the merchant. These products are shipped as part of the onboarding process without further input from the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Yes | Represents the product ID of a product selected for delivery to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`quantity` | `string` | No | Quantity of the product |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pricingPlanId` | `string` | No | Specifies the billing plan for a merchant. This allows you to set up a plan based on the monthly price for a terminal and the duration in months. The specific plan details are provided by Surfboard. |
| &nbsp;&nbsp;&nbsp;&nbsp;`redirectUrl` | `string` | No | This will be the redirect URL from the web kyb page, once the application is submitted the user can choose to redirect to the provided URL. |
| &nbsp;&nbsp;&nbsp;&nbsp;`generateShortLink` | `boolean` | No | Set as true when you need the short URL for the web kyb page. Default is set to false. |
| &nbsp;&nbsp;&nbsp;&nbsp;`store` | `object` | No | Input the store details if you also want to create a store for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Yes | Name of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Yes | Email address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | Yes | Contact number of the store in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | A string of numbers ranging from 0-9 with a length of 5-15 characters. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Yes | The address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | No | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Two-letter ISO country code in uppercase, representing the country where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Yes | Postal code of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`onlineInfo` | `object` | No | In order to start accepting online payments you need to create an online store which requires some additional properties such as the following. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantWebshopURL` | `string` | Yes | This is the web-shop URL of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentPageHostURL` | `string` | No | This is the URL of the payment page. This is required for integrating online payments using SDK mode. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`termsAndConditionsURL` | `string` | Yes | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`privacyPolicyURL` | `string` | Yes | This is the URL of the privacy policy of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`googlePayMerchantId` | `string` | No | This is the Google Pay merchant ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`disableFields` | `object` | No | Locks specific sections of the merchant application so they cannot be edited by the merchant during the Web KYB flow. Any section you lock must be supplied with complete values in this same request. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`onlineInfo` | `boolean` | No | When set to true, the online store section is locked for editing in Web KYB. This requires store.onlineInfo to be provided in the same request with merchantWebshopURL, termsAndConditionsURL and privacyPolicyURL; otherwise the request is rejected. |
| &nbsp;&nbsp;&nbsp;&nbsp;`preEnteredInformation` | `object` | No | Use this param to pre fill the merchant application |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`openingInfo` | `object` | No | These details helps us understand when payments are accepted for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isSeasonalOpen` | `boolean` | Yes | If they are a seasonal merchant, open only on select seasons. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`monthsOpen` | `array` | No | If they are a seasonal merchant, mention the months they will be open for payments. e.g., Seasonal shops open only during january and map can be mentioned as [1,5] |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isOpenAllYear` | `boolean` | Yes | If merchant will be accepting payments all year round. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isStoreOpenAtNight` | `boolean` | Yes | Mention if merchant stores are open all night. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reasonForOpeningAtNight` | `string` | No | Provide a reason as to why they are open all night. Mandatory when 'isStoreOpenAtNight' is set to true. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`giftcards` | `object` | No | Gift card details of the merchant if any. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amountPerYear` | `number` | Yes | Estimated amount spent using gift cards per year. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageValidDays` | `number` | Yes | Average validity of gift card provided by merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`prePayments` | `object` | No | Details of pre payment option provided by merchant |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageDeliveryTimeInDays` | `number` | Yes | Average delivery time in days taken after pre payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`salesPercentPerYear` | `number` | Yes | Percentage of sales revenue generated via pre payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fundsInfo` | `object` | No | Sales information with respect to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedAmountPerYear` | `number` | Yes | Estimated amount of sales per year. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`priceOfMostExpensiveItemSold` | `number` | Yes | Price of most expensive item. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`averageTransactionValuePerDay` | `number` | Yes | Estimated amount of sales per day. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedAmountPerTransaction` | `number` | Yes | Average amount per transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedFrequencyOfTransactions` | `string` | Yes | Denotes how often transactions are made under merchant. Possible values are 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY' |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`estimatedNoOfDailyTransactions` | `number` | No | Average number of sales per day. Mandatory when 'estimatedFrequencyOfTransactions' is set to 'DAILY' |

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
| `status` | `string` | Status of the request 'SUCCESS' \| 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | This is the applicationId that you will use to track the status of the create merchant request. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | `string` | This is the link for the KYC session created for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`validUntil` | `string` | Timestamp until which the Web KYB session for the merchant application remains valid. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | For PF partners, merchant is created and the merchantId is returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | For PF partners, store is created and the storeId is returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;`shortLinkUrl` | `string` | Short URL of the web kyb page if generateShortLink is set to true. |
| `message` | `string` | A message that describes the status of the request. |

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
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- The `partnerId` is part of the URL path and must be a valid identifier.

---
