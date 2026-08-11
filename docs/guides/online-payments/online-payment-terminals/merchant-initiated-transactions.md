---
title: "Merchant Initiated Transactions"
description: "How to set up and process Merchant Initiated Transactions (MIT) with Surfboard Payments."
category: "Online Payments"
path: "/guides/online-payments/online-payment-terminals/merchant-initiated-transactions.md"
---
# Merchant Initiated Transactions

Merchant Initiated Transactions (MIT) allow merchants to initiate payments on behalf of customers. To do this, the merchant must first register a Payment Page or Self-hosted Page terminal. The customer completes the first payment through one of these terminals, after which the merchant can initiate subsequent payments using the MIT terminal.

This guide assumes your online store is set up. For details on setting up an online store, refer our [**Onboarding guide**](/guides/in-store-payments/how-to-guides/onboard-merchant/onboard-merchants).

## Setup Payment Processing for MIT

There are two stages involved in MIT payments:

### 1. Initial transaction by Customer

Regardless of the payment mode, every payment acceptance starts with the [**Create Order API**](/api/orders#create-order).

> Please note that the following should be done with the terminal type registered as either PaymentPage or SelfHostedPage.

**Create Order with Tokenization:**

1. Use the [**create order API**](/api/orders#create-order) with the **`enforceTokenization`** parameter set to true in the control fields.

**Customer Completes Payment:**

1. The customer enters their card details on the web-shop page.
2. Once the payment is completed, the card details are tokenized and saved against the order.
3. Then, make a [**Fetch Tokens from Orders API**](/api/orders) call to retrieve the **`tokenId`** and additional card information. This **`tokenId`** must be securely stored against the customer that will be used for future transactions.

### 2. Subsequent Merchant Initiated Payments

> Please note the following should be done with the terminal type registered as MerchantInitiated.

**Initiate Payment Using CTOKEN:**

1. Create an order using [**create order API**](/api/orders#create-order). It will return the **`orderId`** which you need to use in the payment initiation.
2. Make a **`POST`** request to [**Initiate Payment API**](/api/payments#Initiate-a-Payment) with payment method set to **`CTOKEN`** and provide the **tokenId** stored against that customer, as shown below:

```json
curl -d '{
          "orderId": "YOUR_ORDER_ID",
          "paymentMethod": "CTOKEN",
          "tokenId":"YOUR_TOKEN_ID"
         }' \
     -H 'Content-Type: application/json' \
     -H 'API-KEY: YOUR_API_KEY' \
     -H 'API-SECRET: YOUR_API_SECRET' \
     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \
     YOUR_API_URL/payments

```

## Check Order Status

In each stage, to verify if the payment was successful, you can call the [**fetchOrderStatus API**](/api/orders). If the order status changes to **`PAYMENT_COMPLETED`** or **`PAYMENT_CANCELLED`**, you can see the transaction details.

## Post Payments

The post payments process remains the same across all our online payment modes. You can refer to the post-payment functionalities to know more.

{% docfooter relatedLinks="[{ title: 'Online Terminal Registration', url: '/guides/online-payments/terminal-registration/terminal-registration' },{ title: 'Payments', url: '/docs/payments' },{ title: 'Tokens', url: '/guides/online-payments/post-payments/tokens' }]" /%}
