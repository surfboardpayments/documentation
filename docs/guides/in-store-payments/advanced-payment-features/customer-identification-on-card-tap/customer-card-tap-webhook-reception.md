When a customer taps their card, you will receive an `order.customer.identify` webhook at your configured endpoint. This webhook contains the `tokenId` and other card-related information. You can also use the `Fetch token for order` endpoint to retrieve this information.

Below is an example of the webhook response you will receive for this event

```json
event: order.customer.identify
data: {
 orderId: string,
 tokenId: string
}
```

{% callout type="note" label="Note" %}
Partners can also use Fetch token for order endpoint to retrieve card tokenId and other related card data.
{% /callout %}
