# Partial Refund the Order

Similar to a full refund, a **partial refund** is processed by refunding a portion of the total order amount. To do this, set negative values for the quantity and amount of the specific items to be partially refunded. This can be done

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "carbon/make-your-payments/partial-refund-order/api.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "carbon/make-your-payments/partial-refund-order/partner-portal.md"
  }
] /%}

**Payment Method Requirements for Refunds**

Refunds must be processed using the corresponding refund method for the original payment

- For card transactions, use CARD_NP to process the refund.
- For digital payment methods (like KLARNA, etc.), use the same payment method as the original transaction.

{% callout type="note" label="Note" %}
All payment methods except NSWISH, SVIPPS, SMOBILEPAY support partial payment refunds.
{% /callout %}

>Track refund status via webhook or the Check Order Status API.