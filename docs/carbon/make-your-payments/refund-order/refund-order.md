# Refund Your Order

An order refund can be processed on the original purchase order by setting the order line’s quantity and products to negative values. When the payment is processed, the corresponding amount is refunded.

Using the Create Order API, you can process a refund. The following provides an overview of the refund process.

![refund order flow](https://developer-portal-docs-test.web.app/images/refund-order.png "refund order flow")

{% callout type="note" label="Note" %}
- For refunds, CARD_NP is the recommended payment method.
- During refunds, the transaction fee is charged again
{% /callout %}