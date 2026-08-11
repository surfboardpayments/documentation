# Search Companies

## Overview
Search a company registry by name to find businesses during merchant onboarding, returning matching companies with their registry identifiers, legal form, and registered address. Optionally restrict the search to one or more countries.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/companies/search
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner performing the search. Supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `companyName` | `string` | Yes | The company name to search the registry for. |
| `countryCode` | `string` | No | Restrict the search to one or more countries (ISO 3166-1 alpha-2). Accepts a single value or a list. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/companies/search?companyName=Kaffebaren&countryCode=SE
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The matching companies. |
| &nbsp;&nbsp;&nbsp;&nbsp;`companyId` | `string` | Surfboard identifier for the company. |
| &nbsp;&nbsp;&nbsp;&nbsp;`creditsafeId` | `string` | Identifier of the company in the Creditsafe registry. |
| &nbsp;&nbsp;&nbsp;&nbsp;`companyName` | `string` | Registered name of the company. |
| &nbsp;&nbsp;&nbsp;&nbsp;`legalGroupCode` | `string` | Code identifying the company's legal form. |
| &nbsp;&nbsp;&nbsp;&nbsp;`legalGroupText` | `string` | Human-readable description of the company's legal form. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | The company's registered address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`simpleValue` | `string` | The full address as a single formatted string. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`street` | `string` | Street part of the address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | City part of the address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postCode` | `string` | Postal code part of the address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`telephone` | `string` | Registered telephone number for the company. |
| &nbsp;&nbsp;&nbsp;&nbsp;`town` | `string` | Town the company is registered in. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "companyId": "co_71ad",
      "creditsafeId": "SE-0-5566778899",
      "companyName": "Kaffebaren AB",
      "legalGroupCode": "AB",
      "legalGroupText": "Aktiebolag",
      "address": {
        "simpleValue": "Storgatan 1, 111 22 Stockholm",
        "street": "Storgatan 1",
        "city": "Stockholm",
        "postCode": "111 22",
        "telephone": "+46 8 123 456"
      },
      "town": "Stockholm"
    }
  ],
  "message": "Company search completed successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to search companies"
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

---
