# Update Store Details

## Overview
Updates the store details. You can use this API to edit the name, address information,  email address, and phone number of a store.

## Prerequisites
- Merchant must be onboarded.
- Store must already exist under the specified merchant.
- Authentication is required using `API-KEY` and `API-SECRET` headers.
- A valid `MERCHANT-ID` header representing the merchant is required.
- A valid `partnerId`, `merchantId`, and `storeId` must be included in the URL path.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| storeName | string | No | Name of the store. |
| email | string | No | Email address of the store. |
| phoneNumber | object | No | Contact number of the store in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;code | number | No | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;number | string | No | A string of numbers ranging from 0-9 with a length of 5-15 characters |
| address | string | No | Address line 1 of the store. |
| careOf | string | No | Name of the addressee that is accepting the correspondence for the intended recipient. |
| city | string | No | City where the store is located. |
| onlineInfo | object | No | In order to update physical store into online store, some additional properties are required. Online Info can be updated only once.  Dependent on supporting a store. |
| &nbsp;&nbsp;&nbsp;&nbsp;merchantWebshopURL | string | Yes | This is the web-shop URL of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;paymentPageHostURL | string | No | This is the URL of the payment page. Required for integrating online payments using SDK mode. |
| &nbsp;&nbsp;&nbsp;&nbsp;termsAndConditionsURL | string | Yes | This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;privacyPolicyURL | string | Yes | This is the URL of the privacy policy of the merchant. |

### Request Example
```json
{
  "storeName": "My Updated Store Name",
  "email": "updated.store@example.com",
  "phoneNumber": {
    "code": 1,
    "number": "5551234567"
  },
  "address": "123 Updated Main St",
  "careOf": "John Doe",
  "city": "Updated City",
  "onlineInfo": {
    "merchantWebshopURL": "https://www.example.com",
    "paymentPageHostURL": "https://payment.example.com",
    "termsAndConditionsURL": "https://www.example.com/terms",
    "privacyPolicyURL": "https://www.example.com/privacy"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. 'SUCCESS' \| 'ERROR'. |
| data | array | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;merchantURLDomainVerficationKey | string | This is a key to set and verify that the merchant owns the domain of the URL. |
| &nbsp;&nbsp;&nbsp;&nbsp;paymentPageURLDomainVerficationKey | string | This is a key to set and verify the payment page domain URL. |
| message | string | Message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data":{
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
  "message": "Invalid request body"
}
```
**Description:** The request body is malformed or contains invalid data types. Check the request parameters and ensure they conform to the specified types and constraints.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret"
}
```
**Description:** The provided API key or secret is incorrect or missing.  Ensure that the `API-KEY` and `API-SECRET` headers are present and contain valid credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant ID not authorized"
}
```
**Description:** The provided Merchant ID is not authorized to access this resource or perform this action. Verify that the `MERCHANT-ID` is correct and that the associated merchant has the necessary permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found"
}
```
**Description:** The specified store ID does not exist.  Verify that the `storeId` in the URL is correct and that the store has been created under the specified merchant.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server.  This could be due to a temporary issue or a bug in the system.  Try again later. If the problem persists, contact support.

## Notes
- Updating `onlineInfo` is only possible once for each store.
- The `merchantWebshopURL`, `termsAndConditionsURL`, and `privacyPolicyURL` parameters are mandatory when updating `onlineInfo`.
- Ensure that all URLs provided are valid and accessible.

---
