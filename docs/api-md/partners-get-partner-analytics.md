# Get Partner Analytics

## Overview
Retrieve a high-level summary of the partner's onboarding and transaction activity, including application counts by status, merchants created, and transaction volumes and amounts across purchases and returns.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/analytics
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner to fetch analytics for. Supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/analytics
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The partner activity summary. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfApplication` | `number` | Total number of merchant applications created under the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppInitiated` | `number` | Number of applications that have been initiated but not yet submitted. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppExpired` | `number` | Number of applications that expired before completion. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppSubmitted` | `number` | Number of applications submitted for review. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppPending` | `number` | Number of applications awaiting further information. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppSigned` | `number` | Number of applications that have been signed. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppRejected` | `number` | Number of applications that were rejected. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfAppCompleted` | `number` | Number of applications that completed onboarding. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfMerchantCreated` | `number` | Number of merchants created under the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfTransaction` | `number` | Total number of transactions across the partner's merchants. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberOfPurchaseTransaction` | `number` | Number of purchase transactions across the partner's merchants. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalNumberReturnTransaction` | `number` | Number of return transactions across the partner's merchants. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalAmountOfTransaction` | `number` | Total value of all transactions, in the smallest unit of the currency (e.g. öre for SEK). |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalAmountOfPurchaseTransaction` | `number` | Total value of purchase transactions, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalAmountOfReturnTransaction` | `number` | Total value of return transactions, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`recentActivityData` | `array` | Recent activity events for the partner, as an ordered list of key-value entries. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`event` | `string` | The type of activity that occurred. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`timestamp` | `string` | When the activity occurred, in ISO 8601 format. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "totalNumberOfApplication": 128,
    "totalNumberOfAppInitiated": 12,
    "totalNumberOfAppExpired": 4,
    "totalNumberOfAppSubmitted": 9,
    "totalNumberOfAppPending": 6,
    "totalNumberOfAppSigned": 15,
    "totalNumberOfAppRejected": 3,
    "totalNumberOfAppCompleted": 79,
    "totalNumberOfMerchantCreated": 79,
    "totalNumberOfTransaction": 54210,
    "totalNumberOfPurchaseTransaction": 52890,
    "totalNumberReturnTransaction": 1320,
    "totalAmountOfTransaction": 812450000,
    "totalAmountOfPurchaseTransaction": 829100000,
    "totalAmountOfReturnTransaction": 16650000,
    "recentActivityData": [
      {
        "event": "MERCHANT_CREATED",
        "timestamp": "2026-06-14T08:11:00.000Z"
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
