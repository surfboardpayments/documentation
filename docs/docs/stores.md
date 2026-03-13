# Stores

Stores are the places that can be either physical or virtual location of sales. N number of stores can be registered under a merchant. These Store can accommodate n number of terminals that can accept payments under which it is registered. Stores comes under the hierarchical structure of Surfboard Payment.

# Capabilities of a Store:

-   Register terminals
-   Process payments
-   Track transactions
-   Display and export receipts

## Register terminals

In order to accept payments, each payment terminal must be registered against the **Store ID** of the store where the terminal is being used. Merchants can register terminals to their stores by visiting their respective partner portal. Additionally, partners can also register terminals for their merchants using the [**Register Terminal API**](/api/terminals#Register-Terminal).

## Process payments

[**Payments**](/docs/payments) are processed at the store level. After the terminals are registered to the store, merchants can create [**orders**](/docs/orders) for the goods or services being offered within the store. Using the registered terminals, merchants can then accept payments from customers for the created orders.

## Track Transactions

Transactions are tracked at the store level. This may include information such as the amount of the transaction, the date and time of the transaction, the merchant or seller involved, and any other relevant purchase information.

For each transaction:

-   The **Store ID** is required to register the transaction.
-   The store name is displayed on the receipt.
-   The store name/address appears on the bank statement of the customer.

## Display and export receipts

For each store, Surfboard enables merchants to display digital receipts to customers and export the receipts for internal record-keeping. This ensures a seamless checkout experience and aids in maintaining transparent transaction records at the store level.

{% docfooter relatedLinks="[{ title: 'Partners', url: '/docs/partners' },{ title: 'Merchants', url: '/docs/merchants' },{ title: 'Payments', url: '/docs/payments' }]" /%}
