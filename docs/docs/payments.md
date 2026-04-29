# Payments

Surfboard offers versatile [**Payments APIs**](/api/payments) that empowers you with robust payment acceptance functionality. The payment integration enables merchants to accept payments for their goods and services using our terminals both online and in-store. It serves as a dynamic solution for partners looking to expand their service offerings and add value for their merchant base.

## Payment process

The payment process is tightly integrated with Surfboard’s orders. The flow is as follow:

1. An order is created
2. Merchant initiates payment for the order
3. It is then processed through Surfboard’s terminals

{% callout type="note" label="Note" %}
Card payments are activated by default. Other methods can be enabled as needed.
{% /callout %}

This approach simplifies the payment management process and offers a range of advanced feature, including:

-   Multiple payment options
-   Support for diverse payment methods
-   Real-time payment tracking
-   Digital receipt issuance
-   Seamless refund procedures, and more.

## Payment attributes

Each payment is identified by a unique **Payment ID**. The following information is also be associated with each payment:

-   **Merchant ID** of the merchant who initiated the payment
-   **Terminal ID** of the checkout or payment terminal from which the payment is performed
-   **Order ID** of the order for which the payment is performed

## Payments through multi-merchant terminal

Multi-merchant terminals allow multiple merchants in a specific group to accept payments using shared terminals. Any merchant in the group can use terminals registered to the group for payment processing.

The payment flow is similar to regular payments, but the key difference is that payments are directed to the terminal registered under the multi-merchant group. Merchants use the shared **Terminal ID** to initiate payments, ensuring they are processed through the designated terminal.

Even though the terminal is shared, the individual merchant initiating the payment is linked to it through their merchant ID. This ensures that each merchant has a separate merchant account, allowing for individualised settlement and reporting workflows.

## Payment failures and voids

In the event of a payment failure, which can occur due to reasons like early card removal or post-authorization issues, Surfboard takes measures to ensure that the customer is not unfairly charged. Such payments are promptly voided by us. This ensures that no funds are withdrawn from the customer's account for an incomplete or unsuccessful payment.

Typically, these failed payments will display a status of **Payment failed**, providing clear visibility into the nature of the issue. This feature safeguards both the customer and the merchant from unnecessary complications arising from payment errors.

{% docfooter relatedLinks="[{ title: 'Payment methods', url: '/docs/payment-methods' },{ title: 'Payment lifecycle inside a terminal', url: '/docs/payment-lifecycle' },{ title: 'Partial payments', url: '/docs/partial-payments' }]" /%}
