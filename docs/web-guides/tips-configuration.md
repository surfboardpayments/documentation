## Overview

Surfboard Payments provides flexible tipping capabilities across all native Android payment terminals, including SurfTouch, SurfPad, SurfPrint, and SoftPOS. You can enable tips, define preset percentage options, allow custom amounts, and control how tip values are displayed to customers -- all through the API.

Tip settings follow a hierarchical model. Configuration set at a higher level acts as the default for everything below it, while lower-level settings override higher-level ones. This lets you define a baseline across your entire merchant account and then fine-tune individual stores or terminals as needed.

## Configuration Hierarchy

Settings cascade downward and lower levels always take precedence:

```
Partner (default)
  └── Merchant
        └── Store
              └── Terminal (highest priority)
```

**How the hierarchy works:**

- If a terminal has its own tip config, that config is used -- regardless of what is set at the store, merchant, or partner level.
- If a terminal has no config, the system checks the store level, then the merchant level, and finally falls back to the partner-level default.
- Each parameter is resolved independently. You can set `tipLevel1` at the merchant level and override only `tipLevel2` at a specific store.

## Configuration Parameters

All three levels (merchant, store, terminal) accept the same set of parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `tipConfig` | string | Enable or disable tips. Values: `ENABLED`, `DISABLED`. |
| `tipLevel1` | number | First preset tip percentage shown to the customer (e.g., `10` for 10%). |
| `tipLevel2` | number | Second preset tip percentage (e.g., `20` for 20%). |
| `tipLevel3` | number | Third preset tip percentage (e.g., `30` for 30%). |
| `freeAmountEnabled` | boolean | When `true`, customers can enter a custom tip amount. |
| `defaultCustomAmount` | number | Pre-filled custom amount shown when `freeAmountEnabled` is `true`. |
| `displayCalculatedAmount` | string | Show the calculated tip in the local currency on screen. Values: `ENABLED`, `DISABLED`. |
| `tipDisplayFormat` | string | How tip options are presented. Values: `PERCENTAGE`, `AMOUNT`. |

> **Note:** All parameters are optional on every request. You can update a single field without resending the entire configuration. The system merges your changes with the existing config.

## Setting Merchant-Level Tips

Apply a tip configuration to all terminals registered under a merchant. This is the best starting point when you want a consistent tipping experience across every location.

```
PATCH /merchants/{merchantId}/tips
```

**Request body:**

```json
{
  "tipConfig": "ENABLED",
  "tipLevel1": 10,
  "tipLevel2": 15,
  "tipLevel3": 20,
  "freeAmountEnabled": true,
  "defaultCustomAmount": 50,
  "displayCalculatedAmount": "ENABLED",
  "tipDisplayFormat": "PERCENTAGE"
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Merchant tip configuration updated successfully"
}
```

### Fetching Merchant-Level Tips

Retrieve the current tip configuration for a merchant.

```
GET /merchants/{merchantId}/tips
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "tipConfig": "ENABLED",
    "tipLevel1": 10,
    "tipLevel2": 15,
    "tipLevel3": 20,
    "defaultCustomAmount": 50,
    "displayCalculatedAmount": "ENABLED",
    "tipDisplayFormat": "PERCENTAGE"
  },
  "message": "Merchant tip configuration fetched successfully"
}
```

## Setting Store-Level Tips

Override the merchant defaults for a specific store. Useful when different locations have different tipping norms -- for example, a restaurant store might offer higher preset percentages than a retail store under the same merchant.

```
PATCH /merchants/{merchantId}/stores/{storeId}/tips
```

**Request body:**

```json
{
  "tipConfig": "ENABLED",
  "tipLevel1": 15,
  "tipLevel2": 20,
  "tipLevel3": 25
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Store tip configuration updated successfully"
}
```

### Fetching Store-Level Tips

```
GET /merchants/{merchantId}/stores/{storeId}/tips
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "tipConfig": "ENABLED",
    "tipLevel1": 15,
    "tipLevel2": 20,
    "tipLevel3": 25,
    "defaultCustomAmount": 50,
    "displayCalculatedAmount": "ENABLED",
    "tipDisplayFormat": "PERCENTAGE"
  },
  "message": "Store tip configuration fetched successfully"
}
```

> **Note:** The response includes all effective values, including those inherited from the merchant level (such as `defaultCustomAmount` and `displayCalculatedAmount` in this example).

## Setting Terminal-Level Tips

Apply a tip configuration to a single terminal. Terminal-level settings have the highest priority and override everything above them.

```
PATCH /merchants/{merchantId}/terminals/{terminalId}/tips
```

**Request body:**

```json
{
  "tipConfig": "ENABLED",
  "tipLevel1": 5,
  "tipLevel2": 10,
  "tipLevel3": 15,
  "freeAmountEnabled": false,
  "tipDisplayFormat": "AMOUNT"
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Terminal tip configuration updated successfully"
}
```

### Fetching Terminal-Level Tips

```
GET /merchants/{merchantId}/terminals/{terminalId}/tips
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "tipConfig": "ENABLED",
    "tipLevel1": 5,
    "tipLevel2": 10,
    "tipLevel3": 15,
    "freeAmountEnabled": false,
    "displayCalculatedAmount": "ENABLED",
    "tipDisplayFormat": "AMOUNT"
  },
  "message": "Terminal tip configuration fetched successfully"
}
```

## Example: Multi-Level Configuration

Consider a restaurant chain with one merchant account, two stores, and several terminals. The merchant enables tips at 10/15/20%, the fine dining store overrides to 15/20/25%, and the bar terminal at that store switches to amount display with no custom entry:

```
Merchant "Nordic Bistro Group"  → ENABLED, 10/15/20%, PERCENTAGE
  └── Store "Casual Eatery"     → inherits merchant config
        └── Terminal "Checkout 1"  → 10% / 15% / 20%, PERCENTAGE
        └── Terminal "Checkout 2"  → 10% / 15% / 20%, PERCENTAGE
  └── Store "Fine Dining"       → overrides to 15/20/25%
        └── Terminal "Table POS"   → 15% / 20% / 25%, PERCENTAGE
        └── Terminal "Bar POS"     → 15% / 20% / 25%, AMOUNT, no custom
```

Each terminal resolves its effective config by merging all levels, with the most specific setting winning.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Set merchant tips | PATCH | `/merchants/{merchantId}/tips` |
| Fetch merchant tips | GET | `/merchants/{merchantId}/tips` |
| Set store tips | PATCH | `/merchants/{merchantId}/stores/{storeId}/tips` |
| Fetch store tips | GET | `/merchants/{merchantId}/stores/{storeId}/tips` |
| Set terminal tips | PATCH | `/merchants/{merchantId}/terminals/{terminalId}/tips` |
| Fetch terminal tips | GET | `/merchants/{merchantId}/terminals/{terminalId}/tips` |

For full endpoint details, see the [Terminals API](https://developers.surfboardpayments.com/api/terminals) and [Merchants API](https://developers.surfboardpayments.com/api/merchants) reference documentation.