# Fetch Billing Plan by ID

## Overview
Fetches detailed information for a specific billing plan using its ID.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `id` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/billing-plans/:id
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `id` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /partners/:partnerId/billing-plans/:id
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Array containing the filtered billing plan details. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingPlanId` | `string` | Unique identifier for the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Payment method for which this plan applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Card brand for which this plan applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Type of terminal for which this plan applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;`planType` | `string` | Type of billing plan (FIXED, VARIABLE, or IC++). |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticDebitNonCommercial` | `number` | Percentage rate for domestic debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticCreditNonCommercial` | `number` | Percentage rate for domestic credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticDebitCommercial` | `number` | Percentage rate for domestic debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticCreditCommercial` | `number` | Percentage rate for domestic credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaDebitNonCommercial` | `number` | Percentage rate for EEA debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaCreditNonCommercial` | `number` | Percentage rate for EEA credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaDebitCommercial` | `number` | Percentage rate for EEA debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaCreditCommercial` | `number` | Percentage rate for EEA credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalDebitNonCommercial` | `number` | Percentage rate for international debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalCreditNonCommercial` | `number` | Percentage rate for international credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalDebitCommercial` | `number` | Percentage rate for international debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalCreditCommercial` | `number` | Percentage rate for international credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | `number` | Fixed percentage rate applied to transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fixedCost` | `number` | Fixed cost per transaction, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`minimumCeiling` | `number` | Minimum ceiling amount for transactions, in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`vatPercentage` | `number` | VAT percentage applied to the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardTypeFees` | `object` | Per-card-type rate overrides for the plan, keyed by card type. Empty when the plan has no per-card-type overrides. |
| &nbsp;&nbsp;&nbsp;&nbsp;`binRangeFees` | `array` | Rate overrides that apply to specific card BIN ranges. Empty when the plan has no BIN-range overrides. |
| `message` | `string` | A message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "billingPlanId": "PLAN_001",
      "paymentMethod": "CARD",
      "cardBrand": "VISA",
      "terminalType": "STANDARD",
      "planType": "FIXED",
      "description": "Standard billing plan",
      "domesticDebitNonCommercial": 1.49,
      "domesticCreditNonCommercial": 1.59
    }
  ],
  "message": "Billing plan retrieved successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to fetch billing plans for partner"
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
- The `id` is part of the URL path and must be a valid identifier.

---
