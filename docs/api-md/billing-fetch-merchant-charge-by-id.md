# Fetch Merchant Charge by ID

## Overview
Retrieves detailed information about a specific merchant charge, including subscription details, amount, VAT, frequency, and any associated sub-charges.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `chargeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/charges/:chargeId
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

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/merchants/:merchantId/charges/:chargeId
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `object` | Response data containing details of the requested merchant charge |
| &nbsp;&nbsp;&nbsp;&nbsp;`chargeId` | `string` | Unique identifier of the charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`isSubscriptionCharge` | `boolean` | Specifies if this charge is subscription-based (recurring). |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | A short description of the charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Charge amount in smallest currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;`vat` | `number` | The VAT amount applied to this charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;`frequency` | `string` | Specifies how frequently the charge will be billed. Possible values: `daily`, `twiceWeekly`, `weekly`, `tenDays`, `fortNightly`, `monthly`, `everyTwoMonths`, `trimester`, `quarterly`, `twiceYearly`, `annually`, `unscheduled`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingDate` | `string` | Date the charge is billed, in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingStartDate` | `string` | Start date of the recurring charge in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingEndDate` | `string` | End date of the recurring charge in ISO 8601 format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`subCharges` | `array` | Array of sub-charges associated with this main charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`subChargeId` | `string` | Unique identifier for this sub-charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | A short text describing the sub-charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Charge amount in smallest currency units |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vat` | `number` | VAT amount for this sub-charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current status of the sub-charge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`billingDate` | `string` | Date when this sub-charge was billed, in ISO 8601 format. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "chargeId": "82eb21dbb4bcf80c46",
    "isSubscriptionCharge": true,
    "description": "Fee",
    "amount": 5000000,
    "vat": 35,
    "frequency": "daily",
    "billingStartDate": "2025-02-18T00:00:00.000Z",
    "billingEndDate": "2025-02-20T00:00:00.000Z",
    "subCharges": [
      {
        "subChargeId": "82f1a47a1f97000446",
        "description": "Fee",
        "amount": 650000,
        "vat": 15,
        "status": "PENDING",
        "billingDate": "2025-02-18T00:00:00.000Z"
      }
    ]
  },
  "message": "Merchant charge fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch details of the merchant charge for partner."
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
- The `chargeId` is part of the URL path and must be a valid identifier.

---
