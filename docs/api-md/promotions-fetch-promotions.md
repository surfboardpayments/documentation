# Fetch Promotions

## Overview
Returns a paginated list of the merchant’s promotions with their full configuration and current store/terminal assignments. Optionally filter by status, for example to show only ACTIVE promotions.

> **Note:** Results are paginated. The total number of promotions and the current page are returned in the `x-total-items` and `x-page-number` response headers.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/v2/promotions
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
| merchantId | string | Yes | The unique identifier of the merchant whose promotions are listed. |
| status | string | No | Returns only promotions in this state. Omit to return promotions of any status. Values: `ACTIVE`, `CREATED`, `DEACTIVATED`, `EXPIRED`, `BUDGET_DEPLETED`, `ATTEMPTS_EXHAUSTED`. |
| pageNumber | number | No | The page of results to return. Defaults to 1. |
| pageSize | number | No | The number of promotions per page. Defaults to 100. |

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Indicates whether the request succeeded — either 'SUCCESS' or 'ERROR'. |
| data | object | The paginated promotions payload. |
| data.promotions | array | The promotions on the requested page. |
| data.promotions.promotionId | string | The unique identifier of the promotion. |
| data.promotions.name | string | The promotion’s name. |
| data.promotions.status | string | The current lifecycle state of the promotion. Values: `ACTIVE`, `CREATED`, `DEACTIVATED`, `EXPIRED`, `BUDGET_DEPLETED`, `ATTEMPTS_EXHAUSTED`. |
| data.promotions.promoType | string | The promotion mechanism. Values: `PROMO_CODE`, `REDIRECT_LINK`. |
| data.promotions.appliedTo | string | The kind of entity the promotion applies to (for example, STORE or MERCHANT). |
| data.promotions.appliedToId | string | The identifier of the entity the promotion applies to. |
| data.promotions.schedule | object | The promotion’s active window. |
| data.promotions.schedule.startTime | string | The ISO-8601 timestamp at which the promotion becomes active. |
| data.promotions.schedule.endTime | string | The ISO-8601 timestamp at which the promotion ends. |
| data.promotions.promoCode | object | Present when `promoType` is PROMO_CODE. |
| data.promotions.promoCode.code | string | The redeemable code. |
| data.promotions.promoCode.offer | object | The discount the code applies. |
| data.promotions.promoCode.offer.type | string | Whether the discount is a percentage or a fixed amount. |
| data.promotions.promoCode.offer.percentage | number | The percentage off, when the offer is PERCENTAGE_OFF. |
| data.promotions.promoCode.offer.amount | number | The fixed amount off, when the offer is FIXED_AMOUNT_OFF. |
| data.promotions.promoCode.budget | object | Budget and spend tracking. |
| data.promotions.promoCode.budget.maxAmount | number | The spend limit. |
| data.promotions.promoCode.budget.currency | string | The currency of the budget figures. |
| data.promotions.promoCode.budget.spentAmount | number | How much of the budget has been used so far. |
| data.promotions.redirectLink | object | Present when `promoType` is REDIRECT_LINK. |
| data.promotions.redirectLink.url | string | The destination URL. |
| data.promotions.redirectLink.sharableIdleLink | string | A generated short link for display on the idle screen. |
| data.promotions.redirectLink.sharablePrinterLink | string | A generated short link for printed receipts. |
| data.promotions.usageLimits | object | The redemption limits. |
| data.promotions.usageLimits.maximumRedemptions | number | The total redemption limit. |
| data.promotions.usageLimits.maximumRedemptionsPerCustomer | number | The per-customer redemption limit (may be null). |
| data.promotions.visualAssets | array | The promotion’s display assets. |
| data.promotions.assignments | array | Where the promotion is currently assigned. |
| data.promotions.assignments.targetType | string | Whether the promotion is assigned to a store or a terminal. |
| data.promotions.assignments.targetId | string | The identifier of the store or terminal the promotion is assigned to. |
| data.promotions.assignments.assignedAt | string | When the assignment was made. |
| data.promotions.createdAt | string | When the promotion was created. |
| data.promotions.updatedAt | string | When the promotion was last updated. |
| message | string | For example, "Promotions fetched successfully". |

### Success Response Example (200)
```json
{
  "status": "SUCCESS",
  "data": {
    "promotions": [
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
        "assignments": [
          {
            "targetType": "STORE",
            "targetId": "store_123",
            "assignedAt": "2026-08-01T10:00:00Z"
          }
        ],
        "createdAt": "2026-07-20T08:00:00Z",
        "updatedAt": "2026-07-25T09:30:00Z"
      }
    ]
  },
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
- This endpoint is paginated; see the parameter notes for page/size handling.

---
