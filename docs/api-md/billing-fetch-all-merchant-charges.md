# Fetch All Merchant Charges

## Overview
Retrieves a list of all charges associated with a particular merchant. This includes both one-time and subscription-based charges.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/charges
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

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/merchants/:merchantId/charges
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | An array of merchant charges. |
| &nbsp;&nbsp;&nbsp;&nbsp;`chargeId` | `string` | Unique identifier for the charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`subChargeId` | `string` | Identifier specifically tied to the sub-charge, usually the same as 'id' for single charges. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | The merchant ID to whom this charge applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;`isSubscriptionCharge` | `boolean` | Indicates whether this charge is part of a subscription (recurring). |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | A brief text describing the charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Charge amount in smallest currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;`vat` | `number` | VAT amount applied to this charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current status of the charge, for example 'PENDING'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingDate` | `string` | Date the charge is billed, in ISO 8601 format. |
| `message` | `string` | A message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "chargeId": "82ed1af7b38e080146",
      "subChargeId": "82ed1af7b38e080146",
      "merchantId": "m_iWGri3XAyTmkbKYsYtV47",
      "isSubscriptionCharge": true,
      "description": "Fee",
      "amount": 650000,
      "vat": 15,
      "status": "PENDING",
      "billingDate": "2025-02-11T00:00:00.000Z"
    },
    {
      "chargeId": "82eb21dbb4bcf80c46",
      "subChargeId": "82ec36fee443f80f46",
      "merchantId": "m_iWGri3XAyTmkbKYsYtV47",
      "isSubscriptionCharge": true,
      "description": "Fee",
      "amount": 5000000,
      "vat": 35,
      "status": "PENDING",
      "billingDate": "2025-02-09T00:00:00.000Z"
    },
    {
      "chargeId": "82eb21dbb4bcf80c46",
      "subChargeId": "82eb21dbb4bcf80c46",
      "merchantId": "m_iWGri3XAyTmkbKYsYtV47",
      "isSubscriptionCharge": true,
      "description": "Fee",
      "amount": 5000000,
      "vat": 35,
      "status": "PENDING",
      "billingDate": "2025-02-08T00:00:00.000Z"
    }
  ],
  "message": "Merchant charges fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch merchant charges for partner."
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
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
