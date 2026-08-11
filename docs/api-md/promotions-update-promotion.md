# Update Promotion

## Overview
Updates an existing promotion. Only the fields included in the request are changed; any omitted field is left as it was. Updated content is then synced to the terminals where the promotion is displayed.

> **Note:** The promotion type (`promoType`) is fixed at creation and cannot be changed here — to change it, delete the promotion and create a new one.

## Request

### HTTP Method and URL
```
PUT /merchants/:merchantId/promotions/:promotionId
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
| promotionId | string | Yes | The promotion to update, as returned when it was created. |
| name | string | No | A new name for the promotion. |
| schedule | object | No | The window during which the promotion runs. |
| schedule.startTime | string | Yes | ISO-8601 timestamp at which the promotion becomes active. |
| schedule.endTime | string | Yes | ISO-8601 timestamp at which the promotion ends. |
| visualAssets | array | No | Replaces the promotion’s display content with this set. Each item’s `type` determines which of the fields below apply. |
| visualAssets.type | string | Yes | The kind of asset. Values: `TEXT`, `IMAGE`, `VIDEO`, `BUTTON`. |
| visualAssets.headline | string | No | The primary line of a TEXT asset. |
| visualAssets.subheadline | string | No | The secondary line of a TEXT asset. |
| visualAssets.body | string | No | The body copy of a TEXT asset. |
| visualAssets.url | string | No | The public URL of an IMAGE or VIDEO asset. |
| visualAssets.buttonText | string | No | The label shown on a BUTTON asset. |
| visualAssets.buttonUrl | string | No | The URL a BUTTON asset opens when tapped. |
| promoCode | object | No | The discount configuration for a promo-code promotion. |
| promoCode.code | string | Yes | The code a customer enters at checkout to redeem the offer (for example, SAVE20). |
| promoCode.offer | object | Yes | How much the code discounts. |
| promoCode.offer.type | string | Yes | Whether the discount is a percentage or a fixed amount. Values: `PERCENTAGE_OFF`, `FIXED_AMOUNT_OFF`. |
| promoCode.offer.percentage | number | No | The percentage discount to apply (0–100). |
| promoCode.offer.amount | number | No | The fixed discount amount, in the smallest currency unit (for example, 10 SEK is 1000). |
| promoCode.budget | object | Yes | The spend limit for the promo code. |
| promoCode.budget.maxAmount | number | Yes | The maximum total discount the promotion may give away, in the smallest currency unit. When reached, the promotion stops automatically with status BUDGET_DEPLETED. |
| redirectLink | object | No | The redirect destination for a redirect-link promotion. |
| redirectLink.url | string | Yes | The destination the customer is taken to. |
| assignmentRules | object | No | Conditions an order must satisfy for a customer to be eligible for the promotion. |
| assignmentRules.minimumOrderAmount | number | No | The minimum order total required, in the smallest currency unit. |
| assignmentRules.itemPresentInOrder | array | No | The order must contain at least one of these item IDs. |
| assignmentRules.categoryPresentInOrder | array | No | The order must contain at least one item from these category IDs. |
| redemptionRules | object | No | Conditions that must be met at checkout before the discount is applied. |
| redemptionRules.minimumOrderAmount | number | No | The minimum order total required, in the smallest currency unit. |
| redemptionRules.itemPresentInOrder | array | No | The order must contain at least one of these item IDs. |
| redemptionRules.categoryPresentInOrder | array | No | The order must contain at least one item from these category IDs. |
| usageLimits | object | No | Limits on how many times the promotion can be redeemed. |
| usageLimits.maximumRedemptions | number | Yes | The total number of redemptions allowed across all customers. Once reached, the promotion stops with status ATTEMPTS_EXHAUSTED. |
| usageLimits.maximumRedemptionsPerCustomer | number | No | The number of redemptions allowed per individual customer (for example, 1 for a one-time offer). |

### Request Example
```json
{
  "name": "Loyalty Boost (extended)",
  "schedule": {
    "startTime": "2026-08-01T00:00:00Z",
    "endTime": "2026-09-15T23:59:59Z"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Indicates whether the request succeeded — either 'SUCCESS' or 'ERROR'. |
| data | object | The updated promotion. |
| message | string | For example, "Promotion updated successfully". |

### Success Response Example (200)
```json
{
  "status": "SUCCESS",
  "data": {},
  "message": "Promotion updated successfully"
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
