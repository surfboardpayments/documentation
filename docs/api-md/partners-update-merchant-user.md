# Update Merchant User

## Overview
Update the profile of a user belonging to one of the partner's merchants. Any combination of first name, last name, profile image, and address can be updated; omitted fields are left unchanged.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `userId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId/users/:userId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner the merchant belongs to. Supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier of the merchant the user belongs to. Supplied in the URL path. |
| `userId` | `string` | Yes | Identifier of the user to update. Supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `firstName` | `string` | No | New first name for the user. |
| `lastName` | `string` | No | New last name for the user. |
| `imageUrl` | `string` | No | New profile image URL for the user. |
| `address` | `string` | No | New address for the user. |

### Request Example
```json
{
  "firstName": "Erik",
  "lastName": "Lundqvist",
  "address": "Kungsgatan 5, Göteborg"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The updated user profile. |
| &nbsp;&nbsp;&nbsp;&nbsp;`userId` | `string` | Unique identifier of the user. |
| &nbsp;&nbsp;&nbsp;&nbsp;`firstName` | `string` | User's first name after the update. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lastName` | `string` | User's last name after the update. |
| &nbsp;&nbsp;&nbsp;&nbsp;`imageUrl` | `string` | URL of the user's profile image after the update. |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `string` | User's address after the update. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | User's email address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the user belongs to. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "userId": "u_7b42c1",
    "firstName": "Erik",
    "lastName": "Lundqvist",
    "imageUrl": "https://cdn.surfboard.se/u/7b42c1.png",
    "address": "Kungsgatan 5, Göteborg",
    "email": "erik@kaffebaren.se",
    "merchantId": "m_5f2c1a9b3d"
  },
  "message": "User profile updated successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "No fields provided to update."
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
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `userId` is part of the URL path and must be a valid identifier.

---
