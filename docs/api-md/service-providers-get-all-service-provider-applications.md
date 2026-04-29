# Get All Service Provider Applications

## Overview
This API allows partners to retrieve all service provider applications with optional filtering by application type. Supported application types are ONBOARDING and RENEWAL.

## Prerequisites
- Partner account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/service-providers/applications
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| applicationType | string | No | Filter applications by type. Supported values are 'ONBOARDING' and 'RENEWAL'. Can be a single value or comma-separated values like 'ONBOARDING,RENEWAL'. If not provided, defaults to fetching ONBOARDING applications. |

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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of service provider applications. |
| &nbsp;&nbsp;&nbsp;&nbsp;applicationId | string | Unique identifier of the application. |
| &nbsp;&nbsp;&nbsp;&nbsp;country | string | Country code where the service provider operates. |
| &nbsp;&nbsp;&nbsp;&nbsp;corporateId | string | Corporate identification number. |
| &nbsp;&nbsp;&nbsp;&nbsp;applicationStatus | string | Current status of the application. |
| &nbsp;&nbsp;&nbsp;&nbsp;createdAt | string | ISO timestamp when the application was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;lastUpdatedAt | string | ISO timestamp when the application was last updated. |
| &nbsp;&nbsp;&nbsp;&nbsp;webKybUrl | string | URL for the web-based KYB process, if available. |
| &nbsp;&nbsp;&nbsp;&nbsp;legalName | string | Legal name of the service provider, if available. |
| message | string | A message that describes the status of the request. |

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
  "message": "Applications of partner fetched successfully with partnerId: 8113d3f8403b380409."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid applicationType value."
}
```
**Description:**  Occurs when an invalid value is passed for the `applicationType` query parameter.  Ensure the value is either `ONBOARDING`, `RENEWAL`, or a comma-separated combination of the two.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key."
}
```
**Description:**  Occurs when the API Key is invalid or missing. Ensure the `API-KEY` header is present and contains a valid API Key.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden Access."
}
```
**Description:** Occurs when the user does not have permission to access the requested resource. Check the permissions of the API Key and Merchant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:**  A general error indicating a problem on the server. Try again later. If the problem persists, contact support.

## Notes
- Replace `YOUR_API_KEY`, `YOUR_API_SECRET`, and `YOUR_MERCHANT_ID` with your actual credentials.
- `:partnerId` in the URL path must be replaced with the actual partner ID.
- The timestamps are in ISO 8601 format.
---
