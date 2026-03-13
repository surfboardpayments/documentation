```markdown
# Fetch Store Details

## Overview
Retrieves information for a specific store. Use this API to get information regarding a particular store created under a merchant.

## Prerequisites
- A valid Partner ID and Merchant ID are required.
- The Store ID must be a valid ID of a store created under the specified merchant.
- **Authentication:** API Key and API Secret are required in the headers for authentication.
- The Merchant ID must also be passed in the header `MERCHANT-ID`.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*This endpoint does not use query parameters.*

### Request Body Parameters
*This endpoint does not accept a request body.*

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
| status | string | Status of the request. |
| data | object | Response data. |
| data.storeId | string | Store ID of the store. |
| data.merchantId | string | The Merchant ID of the merchant under which the store is created. |
| data.name | string | Name of the store. |
| data.status | string | Status of the store. Possible values: `ACTIVE`, `DEACTIVATED`, `BLOCKED`, `INACTIVE`. |
| data.status.ACTIVE | string | The store is active and ready for payments. |
| data.status.DEACTIVATED | string | The store is deactivated. |
| data.status.BLOCKED | string | The store is blocked from further activities. |
| data.status.INACTIVE | string | The store is in verification stage. |
| data.onlineOnboardingStatus | string | Onboarding status of the online store. Possible values: `APPROVED`, `INITIATED`, `FAILED`. |
| data.onlineOnboardingStatus.APPROVED | string | The store is approved for online payments. |
| data.onlineOnboardingStatus.INITIATED | string | The online store verification is initiated. |
| data.onlineOnboardingStatus.FAILED | string | Failed to verify the online store. |
| data.address | object | Address of the store. |
| data.address.careOf | string | Name of the addressee that is accepting the correspondence for the intended recipient. |
| data.address.addressLine1 | string | The first line of the store's address. |
| data.address.addressLine2 | string | The second line of the store's address. |
| data.address.addressLine3 | string | The third line of the store's address. |
| data.address.city | string | Name of the City where the store is located. |
| data.address.countryCode | string | Two-letter ISO country code in uppercase, representing the location of the store. |
| data.address.postalCode | string | Postal Code of the place where the store is located. |
| data.phone | string | Contact number of the store. |
| data.email | string | Email address of the store. |
| data.onlineInfo | object | In order to start accepting online payments you need to create an online store which requires some additional properties such as the following. This is optional. |
| data.onlineInfo.merchantWebshopURL | string | This is the web-shop URL of the merchant. |
| data.onlineInfo.paymentPageHostURL | string | This is the URL of the payment page. |
| data.onlineInfo.termsAndConditionsURL | string | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| data.onlineInfo.privacyPolicyURL | string | This is the URL of the privacy policy of the merchant. |
| message | string | Message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "storeId": "824bd4a739dc200b0f",
    "merchantId": "81a641f8b3cfd0070e",
    "name": "TEST",
    "status": "ACTIVE",
    "onlineOnboardingStatus": "APPROVED",
    "address": {
      "careOf": null,
      "addressLine1": "Main Street 123",
      "addressLine2": "6th lane",
      "addressLine3": "Building C",
      "city": "Stockolm",
      "countryCode": "SE",
      "postalCode": "103 16"
    },
    "onlineInfo": {
    "merchantWebshopURL": "https://testmerchant.com",
    "termsAndConditionsURL": "https://www.termsandconditions.com",
    "privacyPolicyURL": "https://www.privacypolicy.com"
    },
    "phone": "+46 23423423",
    "email": "test@gmail.com"
  },
  "message": "Fetched store by ID"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs when the request parameters are invalid. Check your parameters and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized."
}
```
**Description:** This error occurs when the API key or secret is invalid or missing. Ensure that valid API credentials are provided in the headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** This error occurs when the specified store ID does not exist or is not associated with the given merchant. Verify that the store ID and merchant ID are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error."
}
```
**Description:** An unexpected error occurred on the server. Try again later. If the problem persists, contact support.

## Notes
- Ensure the Merchant ID and Partner ID are correctly associated with the store.
- The `onlineInfo` object is only returned if online store information is available.
- The `status` field indicates the current state of the store.
- Contact support for more information on onboarding and store status.

---
