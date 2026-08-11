# Fetch All Multi-Merchant Groups

## Overview
Fetch all existing multi-merchant groups under a partner.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/multi-merchants
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/multi-merchants
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `array` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`multiMerchantId` | `String` | Multimerchant ID of the multi-merchant group. |
| &nbsp;&nbsp;&nbsp;&nbsp;`multiMerchantName` | `String` | Name of the multi-merchant group. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `String` | Two-letter ISO country code in uppercase, representing the primary location of the multi-merchant group. |
| &nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Postal code of the multi-merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchants` | `array` | List of merchants present under a multi-merchant group. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `String` | Merchant ID of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantName` | `String` | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `String` | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "multiMerchantId": "817544218dd838050e",
      "multiMerchantName": "Multi Merchant one",
      "countryCode": "SE",
      "postalCode": "12345",
      "merchants": [
        {
          "merchantId": "817544960dd838040e",
          "merchantName": "Test Merchant one",
          "countryCode": "SE"
        },
        {
          "merchantId": "8175449a8dd8380d0e",
          "merchantName": "Test Merchant two",
          "countryCode": "SE"
        }
      ]
    },
    {
      "multiMerchantId": "81701e32ff5690020e",
      "multiMerchantName": "Multi Merchant two",
      "countryCode": "SE",
      "postalCode": "12346"
    }
  ],
  "message": "Multi merchant groups fetched successfully."
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
- The `partnerId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
