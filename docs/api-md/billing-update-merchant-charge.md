# Update Merchant Charge

## Overview
Updates an existing charge for a merchant. Partners can modify the amount, VAT, and optionally adjust the recurring settings.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `chargeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId/charges/:chargeId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `chargeId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `amount` | `number` | Yes | Updated amount in minor currency units. |
| `vat` | `number` | No | Optional updated VAT amount. |
| `recurring` | `object` | No | Updated recurring schedule. Billing end date and updateType can be specified here. |
| &nbsp;&nbsp;&nbsp;&nbsp;`updateType` | `string` | Yes | Indicates the type of the update. Possible values: `onlyNext`, `lifeTime`, `current`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingEndDate` | `string` | No | Date in yyyy-mm-dd format specifying the new end date for the recurring charge. |

### Request Example
```json
{
  "amount": 650000,
  "vat": 15,
  "recurring": {
    "updateType": "onlyNext",
    "billingEndDate": "2025-10-23"
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Indicates if the request was 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Updated merchant charge for partner successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to update merchant charge for partner"
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `partnerId` is part of the URL path and must be a valid identifier.
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `chargeId` is part of the URL path and must be a valid identifier.

---
