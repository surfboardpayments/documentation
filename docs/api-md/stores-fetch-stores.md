# Fetch Stores

## Overview
Retrieves a list of all stores associated with a specific merchant. You can use this API to get information regarding all the stores created under a particular merchant. This endpoint supports pagination.

## Prerequisites
- Partner and Merchant must be onboarded.
- Authentication is required using API Key and API Secret.
- The `partnerId` and `merchantId` must be valid and exist in the system.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/stores
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | `application/json` | Yes |
| API-KEY | `YOUR_API_KEY` | Yes |
| API-SECRET | `YOUR_API_SECRET` | Yes |
| MERCHANT-ID | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body is needed for a GET request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. Possible values: `SUCCESS` or `ERROR`. |
| data | array | Response data containing a list of store objects. |
| data[].storeId | string | Store ID of the store. |
| data[].merchantId | string | The Merchant ID of the merchant under which the store is created. |
| data[].name | string | Name of the store. |
| data[].address | object | Address of the store. |
| data[].address.careOf | string | Name of the addressee that is accepting the correspondence for the intended recipient. |
| data[].address.addressLine1 | string | The first line of the store's address. |
| data[].address.addressLine2 | string | The second line of the store's address. |
| data[].address.addressLine3 | string | The third line of the store's address. |
| data[].address.city | string | Name of the City where the store is located. |
| data[].address.countryCode | string | Two-letter ISO country code in uppercase, representing the location of the store. |
| data[].address.postalCode | string | Postal Code of the place where the store is located. |
| data[].phone | string | Contact number of the store. |
| data[].email | string | Email address of the store. |
| data[].onlineInfo | object | Contains information required to start accepting online payments. Only present for online stores. |
| data[].onlineInfo.merchantWebshopURL | string | This is the web-shop URL of the merchant. |
| data[].onlineInfo.paymentPageHostURL | string | This is the URL of the payment page. |
| data[].onlineInfo.termsAndConditionsURL | string | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| data[].onlineInfo.privacyPolicyURL | string | This is the URL of the privacy policy of the merchant. |
| message | string | Message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "storeId": "824bd4a739dc200b0f",
      "merchantId": "81fa6b2d8d5dc8040e",
      "name": "Previous Store",
      "address": {
        "addressLine1": "No:3,10th street",
        "city": "København",
        "countryCode": "SE",
        "postalCode": "576462"
      },
      "phone": "12345678",
      "email": "PS@gmail.com",
      "onlineInfo": {
        "merchantWebshopURL": "https://testmerchantportal.com/home",
        "paymentPageHostURL": "https://testmerchantportal.com/payment",
        "termsAndConditionsURL": "https://testmerchantportal.com/terms",
        "privacyPolicyURL": "https://testmerchantportal.com/privacy"
      }
    },
    {
      "storeId": "st_p5Hprp71IKuPGOCqkZSt5",
      "merchantId": "81fa6b2d8d5dc8040e",
      "name": "New Store",
      "address": {
        "addressLine1": "No:3,10th street",
        "city": "København",
        "countryCode": "SE",
        "postalCode": "576462"
      },
      "phone": "4775866734",
      "email": "NS@gmail.com",
      "onlineInfo": {
        "merchantWebshopURL": "https://testmerchantportal.com/home",
        "paymentPageHostURL": "https://testmerchantportal.com/payment",
        "termsAndConditionsURL": "https://testmerchantportal.com/terms",
        "privacyPolicyURL": "https://testmerchantportal.com/privacy"
      }
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
  "message": "Invalid merchant ID provided."
}
```
**Description:** The `merchantId` provided in the URL is not valid or does not exist.  Verify that the merchant ID is correct and active.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or Secret provided in the headers is incorrect or missing. Ensure that the API Key and Secret are valid and properly included in the request headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found for the given partner."
}
```
**Description:** The combination of `partnerId` and `merchantId` does not exist in the system. Check if both IDs are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** A server-side error occurred while processing the request.  Retry the request after some time. If the problem persists, contact support.

## Notes
- The `addressLine2` and `addressLine3` fields are optional.
- Ensure the `countryCode` is a valid two-letter ISO country code in uppercase.
- This API supports pagination; however, pagination details are not available in the provided data. Implementations should consider standard pagination mechanisms.

---
