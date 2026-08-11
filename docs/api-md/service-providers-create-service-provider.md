# Create Service Provider

## Overview
Start a company service provider application under a partner. Supply the company's country and corporate identifier, and Surfboard returns an application record together with a hosted KYB (Know Your Business) link that the service provider completes to finish onboarding.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/service-providers
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

| Parameter | Type | Required | Description |
|---|---|---|---|
| `country` | `string` | Yes | Two-letter ISO country code where the service provider is registered, for example 'SE'. |
| `organisation` | `object` | Yes | Company details for the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;`corporateId` | `string` | Yes | Corporate registration number of the company, validated against the supplied country. |

### Request Example
```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5560000000"
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Details of the created service provider application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | Unique identifier for the created service provider application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | `string` | Hosted URL where the service provider completes the KYB (Know Your Business) verification. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "838ca3a7c530200810",
    "webKybUrl": "https://web-kyb-dev.web.app/838ca3a7c530200810?pi=QGv2Kgu9q0WAdg6FjkK0iEliyh8l61yxIXnaf0M70l4psKXW_6KihWL4wcY2aL0NfI5aM69J7bYUisZ8ecrFTNMrj4KU1ZjrN5Q3O9hcqlEgc6oQACb2eLM7SwwP0006"
  },
  "message": "Service provider company application created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Missing required parameter 'country' in create service provider company application"
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
- The `partnerId` is part of the URL path and must be a valid identifier.

---
