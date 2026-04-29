Orders can be refunded either **fully** or **partially**. The total amount you refund cannot exceed the original transaction amount.

- **Full refund**: Process a refund for the entire order
- **Partial refund**: Process a refund for specific items in the order (e.g., refunding only the burger from an order containing burger, fries, and drink)

Refunds can use the same payment method as the original payment through Initiate payment API.

- **Card transactions:** Use `CARD_NP`.
- **Digital payments (e.g., KLARNA):** Use the same method as the original transaction.

### Types of Refunds

{% pills tabs=[
  {
    label: "Full Refund",
    markdocSrc: "guides/in-store-payments/post-payment-operations/return-refund/full-refund/home.md"
  },
  {
    label: "Partial Refund",
    markdocSrc: "guides/in-store-payments/post-payment-operations/return-refund/partial-refund/home.md"
  }
] /%}