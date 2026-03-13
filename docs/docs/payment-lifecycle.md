# Payment lifecycle inside a terminal

The payment lifecycle inside the terminal is a series of events that occur after a merchant creates an order and initiates a payment. This document provides a comprehensive insight into these stages inside the terminal.

The payment lifecycle inside the terminal is a series of events that occur after a merchant creates an order and initiates a payment. The following guide details the process that happens inside the terminal.

## **Payment lifecycle**

The total time for the payment lifecycle can extend up to a maximum of 180 seconds. If the payment isn't completed within this window, it is considered to have timed out. You can request to adjust the default lifecycle duration by contacting Surfboard.

The payment lifecycle consists of the following stages, as shown below:

![payment lifecycle](https://developer-portal-docs.web.app/images/lifecycle.png "payment")

### 1. Payment initiation

The payment lifecycle inside the terminal begins when a payment is initiated by the merchant. After a payment is initiated, the terminal prepares to accept the payment in less than 100 milliseconds. In this phase the terminal waits for the customer’s card to be presented.

The total time for the payment lifecycle can extend up to a maximum of 180 seconds. You can configure this time contacting Surfboard.

### 2. Card engagement

The customer presents their card by tapping for contactless or inserting the chip card into the reader. The customer presents their card by tapping for contactless or inserting the chip card into the reader. Contactless cards can be immediately removed after tapping while chip cards must remain inserted for the entire transaction.

### 3. Card response

Upon the customer's card engagement, one of the following scenarios may occur:

-   **PIN entry**: Customer is prompted on the terminal to enter their PIN.
-   **Card read error**: If the card is not read correctly, the terminal displays an error and instructs the customer to try again.
-   **Insert card again**: In some cases, the customer might need to insert their card for reasons such as authentication. In other scenarios, error messages may prompt the customer to use another card.

{% callout type="note" label="Note" %}
Positive outcomes from the above scenarios will lead the process to the next step.
{% /callout %}

### 4. Authorization flow

Once the card has been presented and all necessary details captured, the payment data is then submitted for further processing. In this step, the card data, including the PIN if entered, is sent to the acquirer for authorization.

On average, authorization is completed within 1.5 seconds. However, this phase has a default timeout of 30 seconds, but can be configured for shorter durations. If the authorization flow times out, the transaction attempt is cancelled and the payment cycle must be restarted.

Possible scenarios in the authorization flow include:

-   **Payment authorized**: The payment request has been approved by the acquirer.
-   **PIN re-entry**: If the PIN entered is incorrect, the customer can retry up to 3 times before the transaction is cancelled.
-   **Card insertion for SCA(Strong Customer Authentication)**: If contactless was used, the chip card may need to be inserted for additional identity verification to ensure a safe transaction.

{% callout type="note" label="Note" %}
If there are any issues during authorization, the payment cycle can be restarted and retried, with the exception of 3 failed PIN attempts.
{% /callout %}

### 5. Payment confirmation

After the authorization, the received authorization is acknowledged. The terminal recognizes that the payment was authorized successfully.

On average, payment confirmation is completed within 2 seconds. However, this phase has a default timeout of 30 seconds, but can be configured for shorter durations. If the authorization flow times out, the transaction attempt is cancelled and the payment cycle must be restarted.

Possible scenarios in the payment confirmation include flow include:

-   **Payment completed**: Payment is successful.
-   **Payment failed**: Payment unsuccessful due to various reasons.
-   **Payment cancelled**: The payment is cancelled if the merchant decides to cancel for any reason.

## Final payment statuses

At the end of the payment lifecycle, the payment will have one of the following statuses:

-   PAYMENT_COMPLETED
-   PAYMENT_FAILED
-   PAYMENT_CANCELLED

## Timeouts

Timely execution is crucial for the payment lifecycle inside the terminal. The associated timeouts are:

-   **Authorization flow**: 30 seconds
-   **Payment confirmation**: 30 seconds
-   **Overall lifecycle**: 180 seconds (default)

{% callout type="note" label="Note" %}
If a specific operation within the lifecycle exceeds its designated time, it's considered to have timed out. The payment attempt is cancelled and the cycle must be restarted.
{% /callout %}

{% docfooter relatedLinks="[{ title: 'Payments', url: '/docs/payments' },{ title: 'Payment methods', url: '/docs/payment methods' },{ title: 'In-store terminals', url: '/guides/in-store-payments/terminals.home' }]" /%}
