# Fetch Promotion by ID

## Overview
Returns the full configuration of a single promotion — its schedule, visual assets, discount or redirect details, rules, and current status. The promotion is returned inside the `data` array.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/promotions/:promotionId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| merchantId | string | Yes | The unique identifier of the merchant the promotion belongs to. |
| promotionId | string | Yes | The promotion to retrieve. |

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Indicates whether the request succeeded — either 'SUCCESS' or 'ERROR'. |
| data | array | The matching promotion. |
| data.promotionId | string | The unique identifier of the promotion. |
| data.name | string | The promotion’s name. |
| data.status | string | The current lifecycle state of the promotion. Values: `ACTIVE`, `CREATED`, `DEACTIVATED`, `EXPIRED`, `BUDGET_DEPLETED`, `ATTEMPTS_EXHAUSTED`. |
| data.promoType | string | The promotion mechanism. Values: `PROMO_CODE`, `REDIRECT_LINK`. |
| data.appliedTo | string | The kind of entity the promotion applies to (for example, STORE or MERCHANT). |
| data.appliedToId | string | The identifier of the entity the promotion applies to. |
| data.schedule | object | The promotion’s active window. |
| data.schedule.startTime | string | ISO-8601 start time. |
| data.schedule.endTime | string | ISO-8601 end time. |
| data.promoCode | object | Present when `promoType` is PROMO_CODE. |
| data.promoCode.code | string | The redeemable code. |
| data.promoCode.offer | object | The discount the code applies. |
| data.promoCode.offer.type | string | Whether the discount is a percentage or a fixed amount. |
| data.promoCode.offer.percentage | number | The percentage off, when the offer is PERCENTAGE_OFF. |
| data.promoCode.offer.amount | number | The fixed amount off, when the offer is FIXED_AMOUNT_OFF. |
| data.promoCode.budget | object | Budget and spend tracking. |
| data.promoCode.budget.maxAmount | number | The spend limit. |
| data.promoCode.budget.currency | string | The currency of the budget figures. |
| data.promoCode.budget.spentAmount | number | How much of the budget has been used so far. |
| data.redirectLink | object | Present when `promoType` is REDIRECT_LINK. |
| data.redirectLink.url | string | The destination URL. |
| data.redirectLink.sharableIdleLink | string | A generated short link for display on the idle screen. |
| data.redirectLink.sharablePrinterLink | string | A generated short link for printed receipts. |
| data.usageLimits | object | The redemption limits. |
| data.usageLimits.maximumRedemptions | number | The total redemption limit. |
| data.usageLimits.maximumRedemptionsPerCustomer | number | The per-customer redemption limit (may be null). |
| data.visualAssets | array | The promotion’s display assets. |
| data.createdAt | string | When the promotion was created. |
| data.updatedAt | string | When the promotion was last updated. |
| message | string | For example, "Promotions fetched successfully". |

### Success Response Example (200)
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "promotionId": "promo_8KzR4pQ7eZ2LvUjH",
      "name": "Loyalty Boost",
      "status": "ACTIVE",
      "promoType": "PROMO_CODE",
      "appliedTo": "STORE",
      "appliedToId": "store_123",
      "schedule": {
        "startTime": "2026-08-01T00:00:00Z",
        "endTime": "2026-08-31T23:59:59Z"
      },
      "promoCode": {
        "code": "AUG10",
        "offer": {
          "type": "PERCENTAGE_OFF",
          "percentage": 10
        },
        "budget": {
          "maxAmount": 5000,
          "currency": "SEK",
          "spentAmount": 1200
        }
      },
      "usageLimits": {
        "maximumRedemptions": 1000,
        "maximumRedemptionsPerCustomer": 2
      },
      "visualAssets": [],
      "createdAt": "2026-07-20T08:00:00Z",
      "updatedAt": "2026-07-25T09:30:00Z"
    }
  ],
  "message": "Promotions fetched successfully"
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
**Description:** The request body is malformed or missing required fields. Ensure all required parameters are present and valid.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is incorrect. Verify your credentials.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Forbidden: Insufficient permissions."
}
```
**Description:** The provided MERCHANT-ID does not have the necessary permissions to access this endpoint.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "An unexpected error occurred."
}
```
**Description:** An internal server error occurred while processing the request. Retry later; if it persists, contact support.

## Notes
- Authentication is required via API Key and API Secret, along with a valid `MERCHANT-ID`.
- All path parameters are required and must reference existing resources.

---
