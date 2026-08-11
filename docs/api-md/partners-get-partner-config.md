# Get Partner Config

## Overview
Retrieve the partner-level feature toggles that control how the partner portal and onboarding behave, such as whether terminals can be activated from the portal and whether the cash-register features are available.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/config
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner to fetch configuration for. Supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/config
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The partner feature configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;`activateTerminalFromPortal` | `boolean` | Whether terminals can be activated directly from the partner portal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`allowAdvancedOnboarding` | `boolean` | Whether the partner has access to the advanced onboarding flow. |
| &nbsp;&nbsp;&nbsp;&nbsp;`enableProductCatalogueInOnboarding` | `boolean` | Whether the product catalog step is shown during merchant onboarding. |
| &nbsp;&nbsp;&nbsp;&nbsp;`ecrEnabled` | `boolean` | Whether the partner has access to the cash-register (ECR) features in the portal. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "activateTerminalFromPortal": true,
    "allowAdvancedOnboarding": false,
    "enableProductCatalogueInOnboarding": true,
    "ecrEnabled": false
  },
  "message": "Partner config fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch partner config"
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
