# List Merchant Users

## Overview
Retrieve all users that belong to a specific merchant under the partner, including their names, contact details, and role. Use this to manage the staff of one of your merchants.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/users
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner the merchant belongs to. Supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier of the merchant whose users are returned. Supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/merchants/:merchantId/users
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The users belonging to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`userId` | `string` | Unique identifier of the user. |
| &nbsp;&nbsp;&nbsp;&nbsp;`firstName` | `string` | User's first name. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastName` | `string` | User's last name. |
| &nbsp;&nbsp;&nbsp;&nbsp;`imageUrl` | `string` | URL of the user's profile image. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the user belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Identifier of the partner the user is associated with, if any. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `string` | User's phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`swishNumber` | `string` | User's Swish number, if set. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `string` | User's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | User's email address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`role` | `string` | The user's role, which determines their permissions. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "userId": "u_7b42c1",
      "firstName": "Erik",
      "lastName": "Lund",
      "imageUrl": "https://cdn.surfboard.se/u/7b42c1.png",
      "merchantId": "m_5f2c1a9b3d",
      "partnerId": "pt_9c31a0f4b2",
      "phoneNumber": "+46707654321",
      "swishNumber": "1231181189",
      "address": "Kungsgatan 5, Göteborg",
      "email": "erik@kaffebaren.se",
      "role": "CASHIER"
    }
  ],
  "message": "Fetched users for merchant successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch users for merchant"
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
- The `merchantId` is part of the URL path and must be a valid identifier.

---
