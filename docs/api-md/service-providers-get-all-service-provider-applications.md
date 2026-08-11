# Get All Service Provider Applications

## Overview
Retrieve every service provider application under a partner, optionally filtered by application type. Use this to monitor onboarding and renewal progress across all of a partner's service providers.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/service-providers/applications
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

To filter results, pass the optional query param `applicationType`. Supported values are ONBOARDING and RENEWAL. Provide a single value or a comma-separated list such as ONBOARDING,RENEWAL. When omitted, ONBOARDING applications are returned.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `applicationType` | `string` | No | Filters applications by type. Provide a single value or a comma-separated list such as 'ONBOARDING,RENEWAL'. Defaults to 'ONBOARDING' when not supplied. Passed as a query parameter. Possible values: `ONBOARDING`, `RENEWAL`. |

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
GET /partners/:partnerId/service-providers/applications?applicationType=ONBOARDING
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | List of service provider applications under the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | Unique identifier of the application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`country` | `string` | Two-letter ISO country code where the service provider is registered. |
| &nbsp;&nbsp;&nbsp;&nbsp;`corporateId` | `string` | Corporate registration number of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationStatus` | `string` | Current status of the application. Possible values: `APPLICATION_INITIATED`, `APPLICATION_STARTED`, `APPLICATION_EXPIRED`, `APPLICATION_SUBMITTED`, `APPLICATION_PENDING_INFORMATION`, `APPLICATION_SIGNED`, `APPLICATION_UNDER_REVIEW`, `APPLICATION_REJECTED`, `APPLICATION_COMPLETED`, `APPLICATION_APPROVED`, `MERCHANT_CREATED`, `SERVICE_PROVIDER_CREATED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | ISO timestamp of when the application was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastUpdatedAt` | `string` | ISO timestamp of when the application was last updated. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | `string` | Hosted URL where the service provider completes KYB verification, when available. |
| &nbsp;&nbsp;&nbsp;&nbsp;`legalName` | `string` | Legal name of the service provider, when available. |
| &nbsp;&nbsp;&nbsp;&nbsp;`endDate` | `string` | ISO timestamp marking the end date of the application, when available. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "applicationId": "838ca3a7c530200810",
      "country": "SE",
      "corporateId": "3532007322",
      "applicationStatus": "APPLICATION_INITIATED",
      "createdAt": "2025-10-10T10:32:47.565Z",
      "lastUpdatedAt": "2025-10-10T10:32:47.565Z",
      "webKybUrl": "https://web-kyb-dev.web.app/838ca3a7c530200810?pi=QGv2Kgu9q0WAdg6FjkK0iEliyh8l61yxIXnaf0M70l4psKXW_6KihWL4wcY2aL0NfI5aM69J7bYUisZ8ecrFTNMrj4KU1ZjrN5Q3O9hcqlEgc6oQACb2eLM7SwwP0006",
      "legalName": "Turner, Runte and Kemmer"
    },
    {
      "applicationId": "838ca332c530200310",
      "country": "SE",
      "corporateId": "5834862013",
      "applicationStatus": "APPLICATION_STARTED",
      "createdAt": "2025-10-10T10:28:53.740Z",
      "lastUpdatedAt": "2025-10-10T10:39:34.614Z",
      "webKybUrl": "https://web-kyb-dev.web.app/838ca332c530200310?pi=rZzanQBc-0lZgNKHpPE0_ou4KDDcH1nXxKDuqS07IdTnTOQ-k62W--U2uyB21T2-ipMtS6E7iA6LLMb8T52FYHGd54jZX9nOdzM1YA9qNlZgT3n8_AZTcyC3ljNm0002",
      "legalName": "LOCO SP OBERBRUNNER LLC"
    }
  ],
  "message": "Applications under partner fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Bad request. Please check your request parameters"
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
