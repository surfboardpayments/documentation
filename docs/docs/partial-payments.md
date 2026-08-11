# Partial payments

Partial payments enables your customers to pay an order through several smaller payments, which can be divided equally or by percentage. They can use various methods like card, cash, or Swish for each payment, and the system ensures that the total of these smaller payments matches the full order amount

**For example**, if a group of 5 people has a restaurant bill of 500 SEK, each person can pay their portion using their preferred method, avoiding the hassle of settling up later. This also simplifies transaction tracking and financial reporting for merchants, making it easier to balance payments at the end of the billing cycle.

Here are some scenarios where you can implement partial payments:

-   **Group dining**: A table of multiple diners can split the bill according to their consumption or equally, each paying with their preferred method.
-   **Pre-bookings**: Customers can pay an initial amount online to secure a service or item, with the balance settled at a later date or upon delivery.
-   **Event ticketing**: For group events, each attendee can pay for their portion of the total ticket cost separately.
-   **Travel and accommodations**: Multiple travellers can chip in for a single booking, whether it's for a flight, hotel, or full vacation package.
-   **Healthcare payments**: In case of medical bills, different family members or insurance entities can contribute to a single invoice.

> If you are designing your partial payment flow integration, we recommend reading our [Accept partial payments](/guides/in-store-payments/administration/accept-partial-payments) guide.

The following alternative payment methods can be used based on your needs:

-   Prepaid
-   Cash
-   Gift card
-   Others

## Partial refunds for partial payments

Partial refunds provide an additional layer of flexibility in refunds for orders originally paid using partial payments.

While executing partial refunds, any segment of the order that was paid via card can only be refunded to a card.

However, the refund does not necessarily have to go back to the same card; it could potentially be issued to a different card as per the merchant's policies or customer preference.

**For example**, let's consider an order of 1000 SEK where 600 SEK was paid by card and 400 SEK in cash, the 600 SEK can only be refunded to a card, though it can also be a different card if needed. The 400 SEK paid in cash can be refunded via any available payment method, including cards. If the merchant’s policy allows, the full 1000 SEK could even be refunded in cash or any other payment method, providing flexibility in handling partial refunds.

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Terminals', url: '/docs/terminals' },{ title: 'Payment Methods', url: '/docs/payment-methods' }]" /%}
