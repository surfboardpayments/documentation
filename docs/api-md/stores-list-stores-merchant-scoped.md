# List Stores (Merchant Scoped)

## Overview
Retrieves a paginated list of all stores that belong to the authenticated merchant. Use this to see every store you can register terminals against without addressing the partner and merchant in the path.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
GET /stores
```

### Pagination

Page through results with the `x-page-number` request header. The total number of stores is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /stores?x-page-number=1
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The stores on the current page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current lifecycle status of the store. Possible values: `ACTIVE`, `DEACTIVATED`, `BLOCKED`, `INACTIVE`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the store belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the store. |
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
  "data": [
    {
      "storeId": "824bd4a739dc200b0f",
      "status": "ACTIVE",
      "merchantId": "81fa6b2d8d5dc8040e",
      "name": "Trial Store",
      "address": {
        "careOf": null,
        "addressLine1": "Hagmarksgatan 3",
        "addressLine2": null,
        "addressLine3": null,
        "city": "Stockholm",
        "countryCode": "SE",
        "postalCode": "103 16"
      },
      "onlineInfo": null,
      "phoneNumber": {
        "code": "46",
        "number": "701234567"
      },
      "email": "integrations@surfboard.se"
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
  "message": "No stores found under this merchant"
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
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
