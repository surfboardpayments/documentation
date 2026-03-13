---
title: "Refunds"
description: "Guide to processing online refunds for card-not-present transactions."
category: "Online Payment Guides"
path: "/guides/online-payments/post-payments/return-refunds/return-refunds.md"
---

# Refunds

Refunds for online transactions are processed as Card Not Present (CNP) refunds. You can process either full refunds or partial refunds for specific items in an order. This guide explains how to initiate these refunds and check their status using Surfboard's API or merchant portal.

## Pre-requisites

- API credentials
- **`purchaseOrderId`** - The orderId of the original purchase transaction that you want to refund
- For partial refunds:
  - Details of specific items to be refunded
  - Item information for orderLines (name, quantity, unitPrice)

## Types of Refunds

### Full Refund
Process a complete refund for the entire order amount.

### Partial Refund
You can create partial refunds in two ways:

1. **Using OrderLines**: Refund specific items from the original order by creating a return order with those items in the orderLines. For example, if the original order contained multiple items (apple, coke, burger), you can refund just one item (burger) by including only that item in the return order.

2. **Using Total Amount**: Specify the refund amount directly without itemizing products by including the totalOrderPrice in your return order. This is useful when you don't need to track which specific items are being refunded.

## Initiate Online Refund

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/online-payments/post-payments/return-refunds/api-tab.md"
  },
  {
    label: "Through Merchant Portal",
    markdocSrc: "guides/online-payments/post-payments/return-refunds/merchant-portal-tab.md"
  }
] /%}

## Check Refund Status

You can listen to the webhook to receive status of the refund or check its status using the [Fetch order Status API](/api/orders#Fetch-Order-Status). This API allows you to track the progress of your refund request.

{% docfooter relatedLinks="[{ title: 'Surfboard APIs', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' }]" /%}
