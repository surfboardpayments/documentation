# Create Store (Merchant Scoped)

## Overview
Creates a store directly under the authenticated merchant, without addressing the partner and merchant in the path. Use this when you are operating on behalf of a single merchant and want to spin up a new store to register terminals against. Supplying online store details also triggers domain verification so the store can accept online payments.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /stores
```

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
| `storeName` | `string` | Yes | Name of the store as it should appear to staff and on reporting. |
| `email` | `string` | No | Contact email address for the store. Required if you plan to enable online payments for the store. |
| `phoneNumber` | `object` | No | Contact phone number of the store, split into dialing code and number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | The local phone number, 5 to 15 digits with no separators. |
| `address` | `object` | Yes | Physical address of the store. City, postal code, and country code are required. |
| &nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | No | Name of the person or entity receiving correspondence on behalf of the store (c/o). |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | First line of the store's street address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Second line of the store's street address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Third line of the store's street address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Two-letter ISO 3166-1 alpha-2 country code in uppercase, representing where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Yes | Postal or ZIP code of the store's address. |
| `acquirerMID` | `string` | No | Acquirer Merchant ID, required for payment facilitator partners that operate a store-based acquiring model. |
| `onlineInfo` | `object` | No | Online store details. Provide these to turn the store into an online store that can accept web payments; doing so initiates domain verification. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantWebshopURL` | `string` | Yes | The URL of the merchant's webshop. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentPageHostURL` | `string` | No | The URL that hosts the payment page. Required when integrating online payments in SDK mode. |
| &nbsp;&nbsp;&nbsp;&nbsp;`termsAndConditionsURL` | `string` | Yes | URL of the webshop's terms and conditions, which must include the refund policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;`privacyPolicyURL` | `string` | Yes | URL of the webshop's privacy policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;`googlePayMerchantId` | `string` | No | Your Google Pay merchant identifier, used to enable Google Pay on the online store. |

### Request Example
```json
{
  "storeName": "Trial Store",
  "email": "integrations@surfboard.se",
  "phoneNumber": {
    "code": "46",
    "number": "701234567"
  },
  "address": {
    "addressLine1": "Hagmarksgatan 3",
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
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Details of the created store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the newly created store. Use this when registering terminals or fetching the store's details. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantUrlDomainVerificationKey` | `string` | Verification key to place on the merchant's webshop domain to prove ownership. Returned only when online store details were provided; null otherwise. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentPageUrlDomainVerificationKey` | `string` | Verification key to place on the payment page host domain to prove ownership. Returned only when a payment page host URL was provided; null otherwise. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "storeId": "81d64e7174dcb00b0f",
    "merchantUrlDomainVerificationKey": null,
    "paymentPageUrlDomainVerificationKey": null
  },
  "message": "Store created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Mandatory address parameters missing"
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

---
