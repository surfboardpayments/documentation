# Fetch Store Details

## Overview
Retrieves information for a specific store. Use this API to get information regarding a particular store created under a merchant.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Store ID of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | The Merchant ID of the merchant under which the store is created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Status of the store. Possible values: `ACTIVE`, `DEACTIVATED`, `BLOCKED`, `INACTIVE`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onlineOnboardingStatus` | `string` | Onboarding status of the online store. Possible values: `APPROVED`, `INITIATED`, `FAILED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | Name of the addressee that is accepting the correspondence for the intended recipient. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | The first line of the store's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | The second line of the store's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | The third line of the store's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Name of the City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO country code in uppercase, representing the location of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Postal Code of the place where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onlineInfo` | `object` | In order to start accepting online payments you need to create an online store which requires some additional properties such as the following. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantWebshopURL` | `string` | This is the web-shop URL of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentPageHostURL` | `string` | This is the URL of the payment page. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`termsAndConditionsURL` | `string` | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`privacyPolicyURL` | `string` | This is the URL of the privacy policy of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`googlePayMerchantId` | `string` | The Google Pay merchant identifier configured for the online store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | Contact phone number of the store, present only when one is set. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | International dialing code of the store's phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Local phone number of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Email address of the store. |
| `message` | `string` | Message describing the status of the request. |

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
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "103 16"
    },
    "onlineInfo": {
      "merchantWebshopURL": "https://testmerchant.com",
      "paymentPageHostURL": null,
      "termsAndConditionsURL": "https://www.termsandconditions.com",
      "privacyPolicyURL": "https://www.privacypolicy.com",
      "googlePayMerchantId": null
    },
    "phoneNumber": {
      "code": "46",
      "number": "701234567"
    },
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
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `partnerId` is part of the URL path and must be a valid identifier.
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.

---
