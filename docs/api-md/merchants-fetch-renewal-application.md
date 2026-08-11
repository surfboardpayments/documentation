# Fetch Renewal Application

## Overview
Retrieve the merchant's most recent active renewal application, including its status and the KYB continuation link. Returns null when the merchant has no active renewal in progress.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/renewal-application
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/renewal-application
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The latest active renewal application, or null when none exists. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | Identifier of the renewal application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationStatus` | `string` | Current status of the renewal application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`endDate` | `string` | Date on which the renewal application period ends. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | Timestamp at which the renewal application was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | `string` | KYB continuation link for the renewal, when available. Can be null. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "81409507c1a5f00110",
    "applicationStatus": "APPLICATION_INITIATED",
    "endDate": "2026-12-31T00:00:00.000Z",
    "createdAt": "2026-06-01T09:24:11.000Z",
    "webKybUrl": "https://surfkyb.com/81409507c1a5f00110"
  },
  "message": "Fetched latest active renewal application successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch latest active renewal application"
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.

---
