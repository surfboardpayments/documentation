# Fetch All Merchant Charges

## Overview
Retrieves a list of all charges associated with a particular merchant. This includes both one-time and subscription-based charges. This endpoint supports pagination.

## Prerequisites
- A Partner ID is required to access merchant information.
- A Merchant ID is required to fetch specific merchant charges.
- Authentication is required using API Key and API Secret.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/charges
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// This endpoint does not require a request body. The partnerId and merchantId must be included in the URL path as parameters. Example: /partners/123/merchants/456/charges
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | An array of merchant charges. |
| data.chargeId | string | Unique identifier for the charge. |
| data.subChargeId | string | Identifier specifically tied to the sub-charge, usually the same as 'chargeId' for single charges. |
| data.merchantId | string | The merchant ID to whom this charge applies. |
| data.isSubscriptionCharge | boolean | Indicates whether this charge is part of a subscription (recurring). |
| data.description | string | A brief text describing the charge. |
| data.amount | number | Charge amount in smallest currency units. |
| data.vat | number | VAT amount applied to this charge. |
| data.status | string | Current status of the charge, for example 'PENDING'. |
| data.billingDate | string | Date the charge is billed, in ISO 8601 format. |
| message | string | A message describing the status of the request. |

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
  "message": "Invalid request parameters"
}
```
**Description:** This error occurs when the provided request parameters are invalid or missing. Check the URL path for correctness of the `partnerId` and `merchantId`.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret"
}
```
**Description:**  This error occurs when the API key or secret is invalid or missing. Ensure the `API-KEY` and `API-SECRET` headers are correctly set.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found"
}
```
**Description:** This error occurs when the specified merchant does not exist. Verify the `merchantId` is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:**  This error occurs when there is a server-side issue. Contact support for assistance.

## Notes
- The `amount` and `vat` fields are represented in the smallest currency unit (e.g., cents for USD, paisa for INR).
-  The `billingDate` is in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
-  This endpoint supports pagination. Check API documentation for details on how to implement pagination with query parameters, if available.
- Be aware that `subChargeId` might have the same value as `chargeId`.

---
