# Update Store Details

## Overview
Updates the store details. You can use this API to edit the name, address information,  email address, and phone number of a store.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId/stores/:storeId
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

| Parameter | Type | Required | Description |
|---|---|---|---|
| `storeName` | `string` | No | Name of the store. |
| `email` | `string` | No | Email address of the store. |
| `phoneNumber` | `object` | No | Contact number of the store in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | No | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | No | A string of numbers ranging from 0-9 with a length of 5-15 characters |
| `address` | `object` | No | Address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | No | First line of address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Second line of address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Third line of address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | No | City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | No | Two-letter ISO country code in uppercase, representing the location of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | No | Postal code of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | No | Care-of (c/o) recipient line for the address. |
| `acquirerMID` | `string` | No | Acquirer Merchant ID. Required for payment facilitator partners that want to support a store-based acquiring model. |
| `onlineInfo` | `object` | No | In order to update a physical store into an online store, some additional properties are required. Online info can be updated only once. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantWebshopURL` | `string` | Yes | This is the web-shop URL of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentPageHostURL` | `string` | No | This is the URL of the payment page. Required for integrating online payments using SDK mode. |
| &nbsp;&nbsp;&nbsp;&nbsp;`termsAndConditionsURL` | `string` | Yes | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;`privacyPolicyURL` | `string` | Yes | This is the URL of the privacy policy of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`googlePayMerchantId` | `string` | No | Your Google Pay merchant identifier, used to enable Google Pay on the online store. |

### Request Example
```json
{
  "storeName": "Updated Store",
  "email": "US@gmail.com",
  "phoneNumber": {
    "code": "46",
    "number": "7312345678"
  },
  "address": {
    "addressLine1": "Hagmarksgatan 3",
    "addressLine2": "Suite 724",
    "addressLine3": "North",
    "city": "Stockholm",
    "countryCode": "SE",
    "postalCode": "103 16"
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. 'SUCCESS' \| 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantUrlDomainVerificationKey` | `string` | Verification key to place on the merchant's webshop domain to prove ownership. Returned only when online store details were provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentPageUrlDomainVerificationKey` | `string` | Verification key to place on the payment page host domain to prove ownership. Returned only when a payment page host URL was provided. |
| `message` | `string` | Message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "merchantUrlDomainVerificationKey": "499470649f03b53fa1175659d4389743974710260b7f410313487e6062b3d559",
    "paymentPageUrlDomainVerificationKey": "2179beab4f5e8c3960615205f042939a2ccc6c51a6e5923c9c068b3d9a645590"
  },
  "message": "Store data updated successfully"
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `partnerId` is part of the URL path and must be a valid identifier.
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.

---
