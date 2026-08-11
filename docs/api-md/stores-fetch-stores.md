# Fetch Stores

## Overview
Retrieves a list of all stores associated with a specific merchant. You can use this API to get information regarding all the stores created under a particular merchant.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/stores
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /partners/:partnerId/merchants/:merchantId/stores
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. 'SUCCESS' \| 'ERROR'. |
| `data` | `array` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Store ID of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | The Merchant ID of the merchant under which the store is created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current lifecycle status of the store. Possible values: `ACTIVE`, `DEACTIVATED`, `BLOCKED`, `INACTIVE`. |
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
  "data": [
    {
      "storeId": "824bd4a739dc200b0f",
      "status": "ACTIVE",
      "merchantId": "81fa6b2d8d5dc8040e",
      "name": "Previous Store",
      "address": {
        "careOf": null,
        "addressLine1": "No:3, 10th street",
        "addressLine2": null,
        "addressLine3": null,
        "city": "Copenhagen",
        "countryCode": "SE",
        "postalCode": "576462"
      },
      "onlineInfo": {
        "merchantWebshopURL": "https://testmerchantportal.com/home",
        "paymentPageHostURL": "https://testmerchantportal.com/payment",
        "termsAndConditionsURL": "https://testmerchantportal.com/terms",
        "privacyPolicyURL": "https://testmerchantportal.com/privacy",
        "googlePayMerchantId": null
      },
      "phoneNumber": {
        "code": "46",
        "number": "12345678"
      },
      "email": "PS@gmail.com"
    },
    {
      "storeId": "st_p5Hprp71IKuPGOCqkZSt5",
      "status": "ACTIVE",
      "merchantId": "81fa6b2d8d5dc8040e",
      "name": "New Store",
      "address": {
        "careOf": null,
        "addressLine1": "No:3, 10th street",
        "addressLine2": null,
        "addressLine3": null,
        "city": "Copenhagen",
        "countryCode": "SE",
        "postalCode": "576462"
      },
      "onlineInfo": null,
      "phoneNumber": {
        "code": "46",
        "number": "4775866734"
      },
      "email": "NS@gmail.com"
    }
  ],
  "message": "Fetched stores successfully"
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
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
