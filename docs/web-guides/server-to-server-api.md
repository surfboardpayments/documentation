## Overview

Merchant Initiated Transactions (MIT) allow you to initiate payments on behalf of customers entirely from your backend. This is the foundation for subscription billing, recurring charges, and any scenario where you need to charge a stored card without the customer being present.

The flow has two stages: the customer completes an initial payment (which tokenizes their card), then you use the stored token for subsequent charges.

## Prerequisites

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Complete onboarding (merchant and store setup)
3. Register two terminals:
   - A **PaymentPage** or **SelfHostedPage** terminal for the initial customer payment
   - A **MerchantInitiated** terminal for subsequent server-to-server payments

## Stage 1: Initial Customer Payment

The first payment must be initiated by the customer. This step collects and tokenizes the card details.

### Step 1: Create Order with Tokenization

Use the [Create Order API](https://developers.surfboardpayments.com/api/orders) with `enforceTokenization` set to `true`:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_PAYMENT_PAGE_TERMINAL_ID",
  "orderLines": [
    {
      "id": "SUB-001",
      "name": "Monthly Subscription",
      "quantity": 1,
      "amount": {
        "total": 29900,
        "currency": "752"
      }
    }
  ],
  "controlFunctions": {
    "enforceTokenization": true,
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD",
      "amount": 29900
    }
  }
}
```

### Step 2: Customer Completes Payment

The customer enters their card details on the payment page or your self-hosted checkout. Once payment completes, the card is tokenized and saved against the order.

### Step 3: Retrieve the Token

After the payment completes, call the [Fetch Tokens from Orders API](https://developers.surfboardpayments.com/api/orders) to retrieve the `tokenId` and card information:

```json
GET /merchants/:merchantId/orders/:orderId/tokens
```

Store the `tokenId` securely against the customer in your system. You will use it for all future charges.

> **Warning:** Store tokens securely on your backend. Never expose token IDs to the client or include them in frontend code.

## Stage 2: Merchant Initiated Payments

With the `tokenId` stored, you can now charge the customer from your backend at any time.

### Step 1: Create an Order

Create a new order using the **MerchantInitiated** terminal:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_MIT_TERMINAL_ID",
  "orderLines": [
    {
      "id": "SUB-002",
      "name": "Monthly Subscription - February",
      "quantity": 1,
      "amount": {
        "total": 29900,
        "currency": "752"
      }
    }
  ]
}
```

### Step 2: Initiate Payment with Token

Use the [Initiate Payment API](https://developers.surfboardpayments.com/api/payments) with the stored `tokenId`:

```bash
curl -X POST YOUR_API_URL/payments \
  -H 'Content-Type: application/json' \
  -H 'API-KEY: YOUR_API_KEY' \
  -H 'API-SECRET: YOUR_API_SECRET' \
  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \
  -d '{
    "orderId": "YOUR_ORDER_ID",
    "paymentMethod": "CTOKEN",
    "tokenId": "YOUR_TOKEN_ID"
  }'
```

### Step 3: Check Order Status

Verify the payment result using the [Fetch Order Status API](https://developers.surfboardpayments.com/api/orders):

```json
GET /merchants/:merchantId/orders/:orderId/status
```

The status will be `PAYMENT_COMPLETED` on success or `PAYMENT_CANCELLED` / `PAYMENT_FAILED` otherwise. You can also receive real-time updates via webhooks.

## Common Use Cases

| Use Case | Description |
|----------|-------------|
| **Subscriptions** | Charge customers monthly/yearly on a schedule |
| **Metered billing** | Charge variable amounts based on usage |
| **Retry failed payments** | Re-attempt a charge after a soft decline |
| **Installments** | Split a large payment into scheduled charges |

## Post-Payment Operations

Post-payment operations (refunds, receipts, reporting) work the same way as other online payment modes. Use the standard APIs:

- [Receipts API](https://developers.surfboardpayments.com/api/receipts) for sending digital receipts
- [Orders API](https://developers.surfboardpayments.com/api/orders) for refunds and order management

## Reference

- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Initiate Payment API](https://developers.surfboardpayments.com/api/payments)
- [Token Management](https://developers.surfboardpayments.com/api/orders)
- [Developer Portal](https://developers.surfboardpayments.com/)