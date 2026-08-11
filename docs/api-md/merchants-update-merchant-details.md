# Update Merchant Details

## Overview
Updates the merchant details. You can use this API to edit the merchant name, preferred language, email address, merchant logo URL, and phone number of a merchant.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId
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

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantName` | `string` | No | Name of the merchant. |
| `merchantLanguage` | `string` | No | Preferred language for the merchant, as a two-letter language code, for example 'sv' or 'en'. |
| `email` | `string` | No | Email address of the merchant. |
| `merchantLogoUrl` | `string` | No | Merchant logo URL. |
| `phoneNumber` | `object` | No | Contact number of the merchant in code and number format |
| &nbsp;&nbsp;&nbsp;&nbsp;`code` | `number` | No | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | No | A string of numbers ranging from 0-9 with a length of 5-15 characters. |

### Request Example
```json
{
  "merchantName": "Conroy Hane and Parker",
  "merchantLanguage": "sv",
  "email": "test@gmail.com",
  "phoneNumber": {
    "code": 46,
    "number": "771890089"
  },
  "merchantLogoUrl": "https://storage.googleapis.com/merchant-logo.png"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request 'SUCCESS' \| 'ERROR'. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Successfully updated the merchant details."
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

---
