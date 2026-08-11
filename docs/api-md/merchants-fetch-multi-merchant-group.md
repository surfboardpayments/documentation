# Fetch Multi-merchant Group

## Overview
Retrieve the merchants that belong to a single multi-merchant group. A multi-merchant group lets several merchants share the same terminals; this endpoint returns each member merchant of the given group.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/multi-merchants/:merchantId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

### Pagination

Page through results with the `x-page-number` request header. The total number of member merchants is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/multi-merchants/:merchantId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The merchants that belong to the multi-merchant group. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Unique identifier of the member merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantName` | `string` | Name of the member merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO country code, in uppercase, of the member merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currencyCode` | `string` | Three-digit ISO currency code of the member merchant, returned when the merchant has a payment-facilitator account. |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerMID` | `string` | Acquirer Merchant ID of the member merchant, returned when the merchant has a payment-facilitator account. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Identifier of the partner that owns the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLanguage` | `string` | Default language configured for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantLogoUrl` | `string` | URL of the merchant's logo. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Contact email for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`companyId` | `string` | Company registration (organization) number of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`mccCode` | `string` | Merchant category code (MCC) for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | When the merchant was created, in ISO 8601 format. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "merchantId": "817544960dd838040e",
      "merchantName": "Test Merchant one",
      "countryCode": "SE",
      "currencyCode": "752",
      "acquirerMID": "gfprLY1dyAQO"
    },
    {
      "merchantId": "8175449a8dd8380d0e",
      "merchantName": "Test Merchant two",
      "countryCode": "SE"
    }
  ],
  "message": "Successfully fetched merchants details"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "No merchants found under this multi merchant group"
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
- The `merchantId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
