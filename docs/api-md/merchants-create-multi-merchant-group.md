# Create Multi-merchant Group

## Overview
Creates a multi-merchant group. Partners can use this API to create a multi-merchant group that enables multiple merchants to use the same terminal. Individual merchants are tagged to this group, enabling access to all the terminals registered in this group.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/multi-merchant
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
| `country` | `string` | Yes | Two-letter ISO country code, in uppercase e.g 'SE', 'DK', 'NO'. |
| `postalCode` | `string` | Yes | Postal code of the multi-merchant group's address. |
| `name` | `string` | No | Name of the Multi-merchant group. |
| `email` | `string` | No | Email address of the Multi-merchant group. |

### Request Example
```json
{
  "country": "SE",
  "postalCode": "123456"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request 'SUCCESS' \| 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | This is the applicationId that you will use to track the status of the create multi-merchant group request. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Multi-merchant ID. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Multi-merchant store ID. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "merchantId": "81660b596c7fd0000e",
    "storeId": "81660b59434440030f"
  },
  "message": "Multi Merchant created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body."
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
