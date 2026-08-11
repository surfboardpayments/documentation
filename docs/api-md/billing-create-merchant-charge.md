# Create Merchant Charge

## Overview
Creates a new charge for a merchant. Partners can specify the charge details.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants/:merchantId/charges
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `description` | `string` | Yes | A brief description of the charge. |
| `currency` | `string` | Yes | Three-digit currency code |
| `amount` | `number` | Yes | Charge amount in smallest currency units |
| `vat` | `number` | No | Optional VAT amount. |
| `billingDate` | `string` | No | Date on which the charge is effective, in yyyy-mm-dd format. |
| `recurring` | `object` | No | If set, defines a recurring charge schedule including frequency and optional end date. |
| &nbsp;&nbsp;&nbsp;&nbsp;`frequency` | `string` | Yes | Specifies how frequently the charge will be billed. Possible values: `daily`, `twiceWeekly`, `weekly`, `tenDays`, `fortNightly`, `monthly`, `everyTwoMonths`, `trimester`, `quarterly`, `twiceYearly`, `annually`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingEndDate` | `string` | No | Date in yyyy-mm-dd format specifying when to stop recurring charges. |

### Request Example
```json
{
  "description": "Fee",
  "currency": "752",
  "amount": 5000000,
  "vat": 35,
  "billingDate": "2025-02-11",
  "recurring": {
    "billingEndDate": "2025-02-12",
    "frequency": "daily"
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Indicates if the request was 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing information about the created charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`chargeId` | `string` | Unique identifier for the newly created charge. |
| `message` | `string` | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "chargeId": "82eb21dbb4bcf80c46"
  },
  "message": "Merchant charge created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to create merchant charge for partner"
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

---
