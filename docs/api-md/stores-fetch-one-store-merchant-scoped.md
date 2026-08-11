# Fetch One Store (Merchant Scoped)

## Overview
Retrieves the full details of a single store belonging to the authenticated merchant, including its address, contact details, lifecycle status, and any online store configuration.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /stores/:storeId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /stores/:storeId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Details of the requested store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the store belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current lifecycle status of the store. Possible values: `ACTIVE`, `DEACTIVATED`, `BLOCKED`, `INACTIVE`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onlineOnboardingStatus` | `string` | Onboarding status of the store for online payments. Possible values: `APPROVED`, `INITIATED`, `FAILED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Physical address of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | Name of the person or entity receiving correspondence on behalf of the store (c/o). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | First line of the store's street address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | Second line of the store's street address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | Third line of the store's street address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | City where the store is located. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO 3166-1 alpha-2 country code in uppercase. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Postal or ZIP code of the store's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onlineInfo` | `object` | Online store details, present only when the store is set up to accept online payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantWebshopURL` | `string` | The URL of the merchant's webshop. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentPageHostURL` | `string` | The URL that hosts the payment page. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`termsAndConditionsURL` | `string` | URL of the webshop's terms and conditions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`privacyPolicyURL` | `string` | URL of the webshop's privacy policy. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`googlePayMerchantId` | `string` | The Google Pay merchant identifier configured for the online store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | Contact phone number of the store, present only when one is set. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | International dialing code of the store's phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Local phone number of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Contact email address of the store. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "storeId": "824bd4a739dc200b0f",
    "merchantId": "81a641f8b3cfd0070e",
    "name": "Trial Store",
    "status": "ACTIVE",
    "onlineOnboardingStatus": "APPROVED",
    "address": {
      "careOf": null,
      "addressLine1": "Hagmarksgatan 3",
      "addressLine2": null,
      "addressLine3": null,
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "103 16"
    },
    "onlineInfo": {
      "merchantWebshopURL": "https://testmerchant.com",
      "paymentPageHostURL": null,
      "termsAndConditionsURL": "https://testmerchant.com/terms",
      "privacyPolicyURL": "https://testmerchant.com/privacy",
      "googlePayMerchantId": null
    },
    "phoneNumber": {
      "code": "46",
      "number": "701234567"
    },
    "email": "integrations@surfboard.se"
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
  "message": "Unable to fetch store details."
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
- The `storeId` is part of the URL path and must be a valid identifier.

---
