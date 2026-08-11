# Fetch All Merchant Applications

## Overview
Retrieves a list of all merchants applications with a specific partner.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/applications
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

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/applications
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `array` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `String` | The Application ID used to uniquely identify a merchant's application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationStatus` | `string` | Describes the status of the application. Possible values: `APPLICATION_INITIATED`, `APPLICATION_SUBMITTED`, `APPLICATION_PENDING_INFORMATION`, `APPLICATION_SIGNED`, `APPLICATION_REJECTED`, `APPLICATION_COMPLETED`, `MERCHANT_CREATED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`corporateId` | `String` | Corporate ID of the respective merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`country` | `String` | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `String` | Date of application creation in ISO string format |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastUpdatedAt` | `String` | Date of last updation recorded with the merchant application in ISO string format |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | `String` | The Web KYB URL generated for the application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`legalName` | `String` | Legal name of the organization associated with the application. |
| &nbsp;&nbsp;&nbsp;&nbsp;`endDate` | `String` | Date on which the application period ends, in ISO string format. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "applicationId": "816e0b8aabe6580310",
      "country": "SE",
      "corporateId": "1234567898",
      "applicationStatus": "MERCHANT_CREATED",
      "createdAt": "2023-07-10T07:17:41.489Z",
      "lastUpdatedAt": "2023-07-10T07:17:41.519Z",
      "webKybUrl": "https://surfkyb.com/816e0b8aabe6580310",
      "legalName": "Year Zero Press AB",
      "endDate": "2024-07-10T07:17:41.519Z"
    },
    {
      "applicationId": "816e0983abe6580a10",
      "country": "DK",
      "applicationStatus": "APPLICATION_INITIATED",
      "createdAt": "2023-07-10T07:00:23.106Z",
      "lastUpdatedAt": "2023-07-10T07:00:23.106Z",
      "webKybUrl": "https://surfkyb.com/816e0983abe6580a10"
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
  "message": "Invalid request parameters."
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
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
