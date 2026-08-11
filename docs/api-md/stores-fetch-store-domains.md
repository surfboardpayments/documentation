# Fetch Store Domains

## Overview
This API retrieves the details of the store's domain.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/online
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/online
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onlineStoreStatus` | `string` | Status of the online store. Possible values: `APPROVED`, `INITIATED`, `FAILED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domains` | `array` | Contains the domain details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | The current status of the domain. Possible values: `ACTIVE`, `DEACTIVATED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Refers to the type of the domain. Possible values: `MERCHANT_WEBSHOP_URL`, `PAYMENT_PAGE_HOST_URL`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the domain. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`verificationKey` | `string` | This is the key set in your domain which is used for verification. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isDomainVerified` | `boolean` | Indicates whether the domain has been verified. |
| `message` | `string` | Message describing the status of domain verification of store. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "onlineStoreStatus": "APPROVED",
    "domains": [
      {
        "status": "ACTIVE",
        "type": "PAYMENT_PAGE_HOST_URL",
        "name": "www.surfpayapp.com",
        "verificationKey": "7fd242dd862a9f9f74ae11d62216f5729a5e5600e00b8d44300db41b4efcce68",
        "isDomainVerified": true
      },
      {
        "status": "ACTIVE",
        "type": "MERCHANT_WEBSHOP_URL",
        "name": "test.surfboard.se",
        "verificationKey": "7fd242dd862a9f9f74ae11d62216f5729a5e5600e00b8d44300db41b4efcce68",
        "isDomainVerified": true
      }
    ]
  },
  "message": "Online store domain details fetched successfully."
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `partnerId` is part of the URL path and must be a valid identifier.
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.

---
