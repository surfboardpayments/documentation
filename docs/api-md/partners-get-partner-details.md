# Get Partner Details

## Overview
Retrieve the core details of a partner account, including its onboarding URL, supported billing plans, enabled payment methods, and the acquirer configured for each country the partner operates in.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner to fetch details for. Supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The partner account details. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Unique identifier of the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webOnboardingUrl` | `string` | Hosted URL where the partner's merchants complete web-based onboarding. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerName` | `string` | Display name of the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Lifecycle status of the partner account, for example ACTIVE. |
| &nbsp;&nbsp;&nbsp;&nbsp;`supportedBillingPlans` | `array` | Billing plans the partner is allowed to assign to its merchants. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerType` | `string` | Type of partner, which determines the onboarding and billing flow available to it. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethods` | `array` | Payment methods enabled for the partner, for example CARD or SWISH. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Primary country the partner is registered in (ISO 3166-1 alpha-2). |
| &nbsp;&nbsp;&nbsp;&nbsp;`acquirerConfig` | `array` | The acquirer used to process card payments, per operating country. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`country` | `string` | Country the acquirer applies to (ISO 3166-1 alpha-2). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`acquirer` | `string` | Name of the acquirer that settles card payments in this country. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "partnerId": "pt_9c31a0f4b2",
    "webOnboardingUrl": "https://onboarding.surfboard.se/pt_9c31a0f4b2",
    "partnerName": "Nordic Coffee Group",
    "status": "ACTIVE",
    "supportedBillingPlans": [
      "STANDARD",
      "PREMIUM"
    ],
    "partnerType": "RESELLER",
    "paymentMethods": [
      "CARD",
      "SWISH"
    ],
    "countryCode": "SE",
    "acquirerConfig": [
      {
        "country": "SE",
        "acquirer": "NEXI"
      }
    ]
  },
  "message": "Partner details fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch partner details"
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
