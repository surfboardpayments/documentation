# Initiate Individual Service Provider Onboarding

## Overview
Begin onboarding an individual service provider for a specific merchant. Surfboard sends the individual through a signing flow and returns the application and signing session so you can track the agreement to completion. Optionally attach fee configuration that applies to the service provider.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/service-providers/individual
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
| `email` | `string` | Yes | Email address of the individual service provider being onboarded. |
| `countryCode` | `string` | Yes | Two-letter ISO country code where the service provider is based, for example 'SE'. |
| `merchantId` | `string` | Yes | Identifier of the merchant the individual service provider will be associated with. |
| `spType` | `string` | No | Type of service provider being onboarded. Included only when provided. |
| `config` | `object` | No | Optional fee configuration applied to the service provider. Included only when provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;`feePercentage` | `number` | No | Percentage fee taken from each applicable transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`feeFixedAmount` | `number` | No | Fixed fee amount in the smallest currency unit taken from each applicable transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deductApplicableTransactionFee` | `boolean` | No | Whether the applicable transaction fee is deducted from the service provider. |

### Request Example
```json
{
  "email": "harish@surfboard.se",
  "countryCode": "SE",
  "merchantId": "8385f437bc6d200b50",
  "spType": "INDIVIDUAL",
  "config": {
    "feePercentage": 2.5,
    "feeFixedAmount": 100,
    "deductApplicableTransactionFee": true
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Details of the initiated individual onboarding. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | Unique identifier for the individual service provider application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`signingLink` | `string` | Hosted URL where the individual signs the service provider agreement. |
| &nbsp;&nbsp;&nbsp;&nbsp;`signingSessionId` | `string` | Identifier of the signing session used to track the agreement. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current status of the onboarding application. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "838ca3a7c530200810",
    "signingLink": "https://sign-dev.surfboardpayments.com/838ca3a7c530200810",
    "signingSessionId": "8391b7c2ad4e100722",
    "status": "APPLICATION_INITIATED"
  },
  "message": "Individual SP onboarding initiated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Missing required parameter 'merchantId' in initiate individual SP onboarding"
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
