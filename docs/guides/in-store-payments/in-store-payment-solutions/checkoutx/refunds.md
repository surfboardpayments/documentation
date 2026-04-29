To process a refund, the flow mirrors a standard payment, but with specific parameters:

1. You must create a **return order** by using the **`Create New Order API`** and setting the order `type` to `"return"` and must include the **`purchaseOrderId`** of the original transaction.

> For partial refunds, you must specify the exact amount to be returned.

2. The refund is initiated using the **`Initiate Payment API`**, where you must set the `paymentMethod` to `"CARD_NP"` (Card Not Present). This is **mandatory for SoftPOS refunds** and is the recommended best practice for all other solutions.

{% callout type="Tip" label="Tip" %}
You can monitor webhook notifications for quick status updates or use the **`Fetch Order Status API`** to track the refund progress.
{% /callout %}
