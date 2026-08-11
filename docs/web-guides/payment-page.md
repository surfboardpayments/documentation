## Overview

The Payment Page is the simplest way to accept online payments with Surfboard. Instead of building your own checkout form, you redirect customers to a Surfboard-hosted payment page. The customer completes payment there and is redirected back to your site.

This approach requires minimal frontend work -- you only need to create an order via the API and redirect the customer to the returned payment link.

## Prerequisites

Before accepting payments with the Payment Page:

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Complete onboarding (merchant and store setup)
3. Register a terminal with the type set to **PaymentPage**

## Payment Types

There are two primary types of payments:

1. **Customer Initiated Transaction (CIT):** Transactions initiated by customers on your webshop, such as e-commerce purchases.
2. **Merchant Initiated Transaction (MIT):** Transactions initiated by the merchant, such as subscription charges.

> **Note:** MIT payments can only be processed by terminals set to `MerchantInitiated`. See the [Server-to-Server API guide](/developers/guides/server-to-server-api) for details on MIT.

## Payment Process

### Step 1: Create an Order

Create an order using the [Create Order API](https://developers.surfboardpayments.com/api/orders). On success, you receive a **payment link** to share with the customer.

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Annual Subscription",
      "quantity": 1,
      "amount": {
        "total": 99900,
        "currency": "752"
      }
    }
  ],
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD",
      "amount": 99900
    }
  }
}
```

### Control Fields

The Payment Page supports additional control fields for fine-grained payment control:

| Field | Description |
|-------|-------------|
| `delayCapture` | Set to `true` to capture payment later after authorisation. Default: `false`. |
| `enforceTokenization` | Override tokenisation config -- control whether the card is saved for future use. |
| `enforce3DSecure` | Whether the customer goes through 3D Secure verification. |
| `paymentPageValidFor` | How long the payment link is valid. Default: one day. |
| `lockToPaymentMethod` | Force the customer to use a specific payment method. |
| `authMode` | `PREAUTH` or `AUTH`. Default: `AUTH`. If `PREAUTH`, `delayCapture` is set to `true` automatically. |
| `redirectUrl` | URL to redirect to after successful payment. Includes `orderId` as a query param. |
| `failureRedirectUrl` | URL to redirect to after failed payment. Includes `orderId` as a query param. |
| `generateShortLink` | Set to `true` to get a shortened payment URL. Default: `false`. |

### Recurring Payment Fields

For subscription-based payments, include these additional fields:

| Field | Description |
|-------|-------------|
| `subscriptionAmountType` | `FIXED` or `VARIABLE` |
| `maxAmount` | Maximum amount in minor units (for variable subscriptions) |
| `frequency` | `daily`, `weekly`, `monthly`, `quarterly`, `annually`, `unscheduled`, etc. |
| `numberOfPayments` | Total expected payments for this subscription |
| `uniqueReference` | Unique reference for the recurring order |

### Step 2: Check Order Status

Monitor the order status using the [Fetch Order Status API](https://developers.surfboardpayments.com/api/orders). When the status changes to `PAYMENT_COMPLETED` or `PAYMENT_CANCELLED`, you can view the transaction details.

You can also receive real-time updates via webhook notifications -- configure them in the Developer Portal Console.

## Integration Flow

Here is the typical integration flow:

1. Customer clicks "Pay" on your website
2. Your backend calls the Create Order API
3. You redirect the customer to the `paymentUrl` from the response
4. Customer completes payment on the Surfboard-hosted page
5. Customer is redirected to your `redirectUrl` (or `failureRedirectUrl`)
6. Your backend verifies the order status via the API or webhook

> **Tip:** Always verify the order status server-side after redirect. Do not rely solely on the redirect URL to confirm payment success.

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Fetch Order Status API](https://developers.surfboardpayments.com/api/orders)
- [Webhook Reference](https://developers.surfboardpayments.com/references/webhooks/merchants/application-completed)
- [Developer Portal](https://developers.surfboardpayments.com/)