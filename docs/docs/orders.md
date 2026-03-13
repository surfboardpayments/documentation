# Orders

An order serves as the foundation of every payment process. It must be created before you can initiate a payment. It links each payment with a specific order providing complete context for each transaction.

Surfboard's Orders APIs allow partners to easily integrate orders into their systems, including checkouts and ECRs, enhancing both order and payment management, while enabling features like:

-   Customer loyalty programs
-   Tap-before-payment options
-   Partial payments
-   Payment tracking
-   Digital receipt issuance
-   Refund management, and more.

## Order Types

The following are the order types:

**Purchase**: Purchase orders outline the details of the products being bought, including individual prices and quantities.

**Return**: Return orders specify the details of the products being returned, such as the items and quantities.

## Order attributes

-   **Order ID**: Unique identifier for every order.
-   **Line items**: Each order consists of a collection of line items that includes, product names, the price per individual product, the quantity, total payable amount and other relevant purchase details.
-   **Terminal ID:** Links the orders to the specific terminal or checkout from which it were created.

{% docfooter relatedLinks="[{ title: 'Payments', url: '/docs/payments' },{ title: 'Creating an Order', url: '/guides/in-store-payments/accept-payments/create-order' },{ title: 'Online Terminals', url: '/guides/online-payments/online-payment-terminals/home' }]" /%}
