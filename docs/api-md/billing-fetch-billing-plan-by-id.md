# Fetch Billing Plan by ID

## Overview
Fetch detailed information for a specific billing plan using its ID.

## Prerequisites
- Partner ID is required.
- A valid billing plan ID must exist.
- Authentication is required using `API-KEY` and `API-SECRET` headers.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/billing-plans/:id
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array containing the filtered billing plan details. |
| data.billingPlanId | string | Unique identifier for the billing plan. |
| data.paymentMethod | string | Payment method for which this plan applies. |
| data.cardBrand | string | Card brand for which this plan applies. |
| data.terminalType | string | Type of terminal for which this plan applies. |
| data.planType | string | Type of billing plan (FIXED or VARIABLE). |
| data.description | string | Description of the billing plan. |
| data.domesticDebitNonCommercial | number | Percentage rate for domestic debit non-commercial transactions. |
| data.domesticCreditNonCommercial | number | Percentage rate for domestic credit non-commercial transactions. |
| message | string | A message describing the status of the request. |

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
N/A - Example error responses were not provided in the source JSON

## Notes
- This endpoint does not support pagination.
- Ensure that the `partnerId` and `id` path parameters are correctly set in the request URL.

---
