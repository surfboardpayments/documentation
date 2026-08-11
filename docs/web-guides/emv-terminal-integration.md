## Overview

Surfboard Payments lets you integrate traditional EMV card-present terminals through a single, unified API. Whether you are deploying countertop terminals, mobile POS devices, or kiosk setups, the integration follows the same workflow: create an account, get API credentials, build and test in the sandbox, then go live.

This guide walks you through the complete process from zero to accepting live in-store payments.

## Step 1: Create a Developer Account

Sign up at the [Surfboard Developer Portal](https://developers.surfboardpayments.com/sign-up) to get started. A developer account gives you:

- Access to the Console for managing your integration
- A sandbox environment for building and testing
- The path to certification and live payments

No approval process required -- you get instant sandbox access.

## Step 2: Generate API Credentials

After creating your account, open the **Console** in the Developer Portal. From there you can:

- Generate your **API-KEY** and **API-SECRET**
- Configure webhooks
- Access logs and monitoring
- Manage terminals and merchants

> **Tip:** You can also request test credentials through the Surfboard support team on Slack during onboarding.

## Step 3: Understand Environments

Surfboard provides different environments for building and testing your integration:

| Environment | Supported Terminals | Cards Supported |
|-------------|-------------------|-----------------|
| **Demo** | All hardware terminals, Terminal Tester App, Mobile Checkout | Live cards can be used. Transactions are voided immediately after payment. |
| **Live** | All hardware terminals, Mobile Checkout | Live cards. Transactions are settled and you receive payouts. |

By default, you gain access to the demo environment when you create a developer account. Use it to build and test your integration with the [Surfboard APIs](https://developers.surfboardpayments.com/) and SDKs.

> **Note:** For in-store payments, use the Terminal Tester App (available on Android) for payment simulations. It includes built-in success and failure test cards.

## Step 4: Build Your Integration

Complete these steps in the demo environment before going live:

### 4.1 Merchant Onboarding

Set up your merchant hierarchy using the [Merchants API](https://developers.surfboardpayments.com/api/merchants) and [Stores API](https://developers.surfboardpayments.com/api/stores). Each merchant can have multiple stores, and each store can have multiple terminals.

### 4.2 Terminal Registration

Register your hardware terminals through the [Terminals API](https://developers.surfboardpayments.com/api/terminals). When registering a terminal, you provide:

- The `registrationIdentifier` (printed on the terminal or provided during provisioning)
- The `storeId` for the store the terminal belongs to
- A human-readable `terminalName`

```json
POST /merchants/:merchantId/stores/:storeId/devices
{
  "registrationIdentifier": "250901",
  "terminalName": "Checkout 1"
}
```

### 4.3 Accept Payments

Create orders and initiate payments using the [Orders API](https://developers.surfboardpayments.com/api/orders). The Carbon API uses an orders-first workflow -- create an order and initiate payment in a single call:

```json
POST /merchants/:merchantId/orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [
    {
      "id": "ITEM-001",
      "name": "Coffee",
      "quantity": 1,
      "amount": {
        "total": 4500,
        "currency": "752"
      }
    }
  ],
  "controlFunctions": {
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD",
      "amount": 4500
    }
  }
}
```

The terminal displays the payment UI automatically. The customer taps, inserts, or swipes their card. You receive the result via the API response or webhooks.

### 4.4 Post-Payment Operations

After payments are accepted, integrate post-payment functionality:

- **Refunds** -- Use negative quantities in order lines
- **Receipts** -- Send digital receipts via the [Receipts API](https://developers.surfboardpayments.com/api/receipts)
- **Reporting** -- Query order and payment history

## Step 5: Certification & Go Live

Once your integration is built and tested in the demo environment:

1. Sign the contract and receive approval
2. Complete an onboarding call to test and certify your integration
3. Receive production credentials
4. Update your base URL from demo to production
5. Start accepting live payments

## Webhooks

Configure webhooks to receive real-time notifications about order and payment events. Key events include:

- `order.payment.completed` -- Payment was successful
- `order.payment.cancelled` -- Payment was cancelled
- `order.payment.failed` -- Payment failed
- `merchant.application.completed` -- Merchant onboarding completed

Set up webhook endpoints in the Console under your developer account settings.

## API Quick Reference

| API | Purpose |
|-----|---------|
| [Merchants API](https://developers.surfboardpayments.com/api/merchants) | Create and manage merchants |
| [Stores API](https://developers.surfboardpayments.com/api/stores) | Create and manage stores |
| [Terminals API](https://developers.surfboardpayments.com/api/terminals) | Register and manage terminals |
| [Orders API](https://developers.surfboardpayments.com/api/orders) | Create orders and initiate payments |
| [Receipts API](https://developers.surfboardpayments.com/api/receipts) | Send digital receipts |
| [Branding API](https://developers.surfboardpayments.com/api/branding) | Customise terminal branding |

## Reference

- [Developer Portal](https://developers.surfboardpayments.com/)
- [Carbon API Documentation](https://developers.surfboardpayments.com/references/api/orders/create-order)
- [Webhook Reference](https://developers.surfboardpayments.com/references/webhooks/merchants/application-completed)