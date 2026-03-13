```markdown
# Fetch Merchant Details

## Overview
Retrieves information for a specific merchant. As a partner you can use this API to get information regarding your sub-merchants.

## Prerequisites
- Partner ID is required to access sub-merchant details.
- Merchant ID of the sub-merchant.
- You need to be authenticated as a partner to use this endpoint.  This requires a valid API key and API secret.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId
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
N/A

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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | object | Response data |
| data.merchantId | String | Merchant ID of the merchant. |
| data.partnerId | String | The Partner ID of the partner with whom the merchant is affiliated. |
| data.currencyCode | Number | Three-digit ISO currency code, representing the supported currency for the merchant. Can be any one of the following: ‘208’ | ‘978’ | ‘752’. |
| data.merchantName | String | Name of the merchant. |
| data.merchantLanguage | String | Preferred language selected by the merchant. |
| data.merchantLogoUrl | String | Merchant logo URL. |
| data.email | String | Email address of the merchant. |
| data.companyId | String | Company ID of the merchant. |
| data.countryCode | String | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| data.mccCode | String | Merchant Category Code (MCC) of the merchant. |
| data.address | object | Physical address of the merchant. |
| data.address.careOf | string | Name of the addressee that is accepting the correspondence for the intended recipient. |
| data.address.addressLine1 | string | Address of the merchant. |
| data.address.addressLine2 | string | Address of the merchant. |
| data.address.addressLine3 | string | Address of the merchant. |
| data.address.city | string | City where the merchant is located. |
| data.address.countryCode | string | Two-letter ISO country code in uppercase, representing the location of the merchant. |
| data.address.postalCode | string | Postal code of the merchant. |
| data.createdAt | String | Timestamp at which the merchant was created. |
| data.totalNumberOfTransaction | String | Total number of transactions performed by the merchant. |
| data.totalAmountOfTransaction | String | Denotes the total monetary value of all transactions performed by the merchant. |
| data.lastTransactionAt | String | Timestamp of the last transaction in ISO 8601 format represented as 'YYYY-MM-DDTHH:mm:ss.sssZ'. |
| data.phoneNumber | String | Phone number of the merchant. |
| data.acquirerMID | String | Denotes the Acquirer MID for onboarding merchants through payment institution partners(PF or Acquirer). |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "merchantId": "81fa6b2d8d5dc8040e",
    "partnerId": "8113d3f8403b380409",
    "merchantName": "Conroy Hane and Parker",
    "merchantLanguage": "se",
    "merchantLogoUrl": "https://firebasestorage.googleapis.com/v0/b/firebase-test-2e49.appspot.com/o/files%2F8113d3f8403b380409%2FlogoUrl_1749127943794_emoji.png?alt=media&token=61077942-b4b3-482d-bd4d-1e3526486b7e",
    "email": "ashinisb@surfboard.se",
    "companyId": "5590520507",
    "countryCode": "SE",
    "mccCode": 1520,
    "phoneNumber": "917676576569",
    "merchantType": "STANDARD",
    "currencyCode": "752",
    "acquirerMID": "gfprLY1dyAQO",
    "address": {
      "careOf": "chennai",
      "addressLine1": "Stockholm",
      "addressLine2": "Diya ssssssTowers",
      "addressLine3": "process",
      "city": "Sweden",
      "countryCode": "SE",
      "postalCode": "22331"
    }
  },
  "message": "Successfully fetched merchant details "
}
```

## Error Responses

### Possible Errors

#### 400 - Invalid Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs if the request parameters are invalid or missing.  Ensure all required parameters are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** This error occurs if the API key or secret is invalid. Ensure that the API key and secret are correct and properly configured.

#### 404 - Merchant Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:**  This error occurs if the specified merchant ID does not exist.  Verify the merchant ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:**  This error indicates a problem on the server side. Try again later. If the problem persists, contact support.

## Notes
- The `lastTransactionAt` field will be null if the merchant has not performed any transactions.
- Ensure that the `partnerId` and `merchantId` in the request path match the ones associated with your account and the sub-merchant, respectively.
- Contact support for any issues with onboarding partners.

---
