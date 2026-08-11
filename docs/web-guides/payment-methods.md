## Overview

Card payments are enabled by default for all merchants. Use the Payment Methods API to activate or deactivate additional methods like Swish, Klarna, AMEX, Vipps, MobilePay, B2B invoicing, and account-to-account transfers. Payment methods can be set at the merchant or store level.

## Available Payment Methods

| Method | Parameter | Description |
|--------|-----------|-------------|
| Card | `card` | Visa, Mastercard (enabled by default) |
| AMEX | `amex` | American Express |
| Swish | `swish` | Swedish mobile payments |
| Klarna | `klarna` | Buy now, pay later |
| B2B Invoice | `b2binv` | B2B invoice payments |
| Account-to-Account | `acc2acc` | Bank transfer |
| Vipps | `svipps` | Norwegian mobile payments |
| MobilePay | `smobilepay` | Danish mobile payments |

## Activate Payment Methods

Enable one or more payment methods for a merchant in a single request. Set each method to `true` to activate it.

```
POST /merchants/:merchantId/payment-methods
```

### Request

```json
{
  "card": true,
  "swish": true,
  "klarna": true,
  "b2binv": true
}
```

### Response

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "method": "card",
      "paymentMethodId": "pm_abc123",
      "status": "SUCCESS"
    },
    {
      "method": "swish",
      "paymentMethodId": "pm_def456",
      "status": "SUCCESS"
    }
  ],
  "message": "Payment methods activated successfully"
}
```

Each activated method returns a `paymentMethodId` you'll need for fetching details or deactivating later.

### Via Partner Portal

1. Log in to the **Partner Portal** > **Merchants** > select the merchant > **Payment Methods**
2. Select the payment methods you want to enable
3. Click **Activate Selected Methods**

## List All Payment Methods

Retrieve all available payment methods and their activation status for a merchant.

```
GET /merchants/:merchantId/payment-methods
```

### Response

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "paymentMethodId": "pm_abc123",
      "paymentMethod": "CARD"
    },
    {
      "paymentMethodId": "pm_def456",
      "paymentMethod": "SWISH"
    }
  ],
  "message": "Payment methods retrieved successfully"
}
```

## Get Payment Method Details

Fetch the configuration and status of a specific payment method.

```
GET /merchants/:merchantId/payment-methods/:paymentMethodId
```

### Response

```json
{
  "status": "SUCCESS",
  "data": {
    "paymentMethodId": "pm_abc123",
    "paymentMethod": "CARD",
    "status": "ACTIVATED",
    "acquirerMID": "12345678"
  },
  "message": "Payment method retrieved successfully"
}
```

The `status` field is either `ACTIVATED` or `DEACTIVATED`. For AMEX, the response includes an `amexMID`. For card payments, it includes an `acquirerMID`.

## Deactivate a Payment Method

Remove a payment method from a merchant using its `paymentMethodId`.

```
DELETE /merchants/:merchantId/payment-methods/:paymentMethodId
```

### Response

```json
{
  "status": "SUCCESS",
  "message": "Payment method deactivated successfully"
}
```

### Via Partner Portal

1. Log in to the **Partner Portal** > **Merchants** > select the merchant > **Payment Methods**
2. Find the method to remove and click the **Delete** icon

## Store-Level Configuration

You can scope payment methods to a specific store by including `storeId` in the activation request:

```json
{
  "storeId": "YOUR_STORE_ID",
  "swish": true,
  "klarna": true
}
```

This lets different stores under the same merchant accept different payment methods.