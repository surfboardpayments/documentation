# Fetch Service Provider Application Status

## Overview
Retrieve the current status of a single service provider application by its ID. Use this to check where an application sits in the onboarding lifecycle and to obtain the resulting service provider ID once the application is approved.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `applicationId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/service-providers/applications/:applicationId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `applicationId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /partners/:partnerId/service-providers/applications/:applicationId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Current status details of the application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onboardingStatus` | `string` | Current onboarding status of the application, null if onboarding has not started. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationStatus` | `string` | Current status of the application. Possible values: `APPLICATION_INITIATED`, `APPLICATION_STARTED`, `APPLICATION_EXPIRED`, `APPLICATION_SUBMITTED`, `APPLICATION_PENDING_INFORMATION`, `APPLICATION_SIGNED`, `APPLICATION_UNDER_REVIEW`, `APPLICATION_REJECTED`, `APPLICATION_COMPLETED`, `APPLICATION_APPROVED`, `MERCHANT_CREATED`, `SERVICE_PROVIDER_CREATED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serviceProviderId` | `string` | Identifier of the created service provider once the application is approved, null while still pending. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "onboardingStatus": null,
    "applicationStatus": "APPLICATION_INITIATED",
    "serviceProviderId": null
  },
  "message": "Service provider application status fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to fetch service provider application status"
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
- The `applicationId` is part of the URL path and must be a valid identifier.

---
