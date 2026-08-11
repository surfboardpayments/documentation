Surfboard's customer identification feature enables partners to identify customers during a card transaction to offer a personalized experience, such as discounts or rewards. This feature is available for card transactions, with support for additional payment methods coming soon

> Note: This feature is only supported on our Android Terminals
> 

## Prerequisites

- **API Credentials**: **`API-KEY`**, **`API-SECRET`**
- **`terminal$id`**, **`type`** , **`orderLines`** for creating and updating an order.

## Implementation Flow

{% pills tabs=[
  {
    label: "1. Create Order",
    markdocSrc: "guides/in-store-payments/advanced-payment-features/customer-identification-on-card-tap/create-order.md"
  },
  {
    label: "2. Customer Card Tap & Webhook Reception",
    markdocSrc: "guides/in-store-payments/advanced-payment-features/customer-identification-on-card-tap/customer-card-tap-webhook-reception.md"
  },
  {
    label: "3. Update Order",
    markdocSrc: "guides/in-store-payments/advanced-payment-features/customer-identification-on-card-tap/update-order.md"
  },
  {
    label: "4. Payment Initiation",
    markdocSrc: "guides/in-store-payments/advanced-payment-features/customer-identification-on-card-tap/payment-initiation.md"
  }
] /%}
