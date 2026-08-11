---
title: "Payment Page"
description: "How to set up and accept payments using the Surfboard Payment Page mode."
category: "Online Payments"
path: "/guides/online-payments/online-payment-terminals/payment-page.md"
---
# Payment page

The Payment Page is one of the modes available in Surfboard's online payment solutions. This guide will walk you through the steps for setting up and accepting payments using the Payment Page mode.

Complete onboarding and register a terminal with Payment Page selected as the terminal type.

## Prerequisites

Complete the onboarding and terminal registration process with terminal type set as `PaymentPage`

## Payment Types

There are two primary types of payments involving tokens:

1. **Customer Initiated Transaction (CIT):** Transactions initiated by customers on your web-shop, such as e-commerce purchases.
2. **Merchant Initiated Transaction (MIT):** Transactions initiated by the merchant, such as subscription charges.

{% callout type="note" label="Note" %}
MIT payments can only be processed by terminals set to MerchantInitiated. To know more about MIT, please refer to the [MIT guide](/guides/online-payments/online-payment-terminals/merchant-initiated-transactions).
{% /callout %}

## Payment process
### Step 1: Create Order

In order to accept payments you will have to create an order using the [**create Order API**](/api/orders#create-order). There are some additional control fields when creating an online order, that gives you fine-grained control over the payment process. 

On successful order creation, you will receive a payment link which you must share with your customer to complete the payment. The payment link will be valid for the duration specified in the `paymentPageValidFor` field.

| **Control Fields**         | **Description**                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`delayCapture`**         | This by default is set to **`false`**. This needs to be set to **`true`** if you want to capture payments at a later day after authorisation.                         |
| **`enforceTokenization`**  | This field overrides the configuration in relation to tokenisation and controls whether the card is tokenised for a future transaction or not.                        |
| **`enforce3DSecure`**      | This field denotes whether the user goes through 3DSecure flow.                                                                                                       |
| **`paymentPageValidFor`**  | This sets the default validity of the payment page. The default is one day.                                                                                           |
| **`lockToPaymentMethod`**  | This is useful only in the Payment Page and forces the customer to use the provided payment method.                                                                   |
| **`authMode`**             | It can be either **`PREAUTH`** or **`AUTH`**. By default it is set to **`AUTH`**. If **`PREAUTH`** is selected **`delayCapture`** is automatically set to **`true`**. |
| **`delayPayout`**          | This refers to the situation where the final payment to a merchant is delayed after all deductions have been made.                                                    |
| **`redirectUrl`**          | It’s a web address that directs from the payment page once the transaction is completed, including the Order ID as a query param for order reference.                 |
| **`failureRedirectUrl`**   | This web address that will redirect incase of failed transactions, including the Order ID as a query param for order reference.                                       |
| **`generateShortLink`**    | Set as true when you need the short URL for the payment page. Default is set to false.                                                                                |

You can also configure for recurring payment while making the create order request which includes all the required control fields.

| **Control fields**           | **Description**                                                                                                                                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`subscriptionAmountType`** | Type of the subscription for the order. The possible values are FIXED and VARIABLE.                                                                                                                                                           |
| **`maxAmount`**              | Maximum amount for the order in lowest currency unit (only valid for variable subscription amounts)                                                                                                                                           |
| **`frequency`**              | Possible values are 'daily', 'twiceWeekly', 'weekly', 'tenDays', 'fortNightly', 'monthly', 'everyTwoMonths', 'trimester', 'quarterly', 'twiceYearly', 'annually', 'unscheduled'. This is a mandatory parameter for Subscription based orders. |
| **`numberOfPayments`**       | Total no of payments that is expected to be executed for this order.                                                                                                                                                                          |
| **`uniqueReference`**        | Unique reference for the recurring order.                                                                                                                                                                                                     |

### Step 2: Check Order Status

Once an order is created, monitor its status using the [**Fetch Order Status API**](/api/orders). If the status changes to **`PAYMENT_COMPLETED`** or **`PAYMENT_CANCELLED`**, you’ll be able to view the transaction details. Additionally, updates can be received through Webhook notifications.

{% docfooter relatedLinks="[{ title: 'Surfboard APIs and Environments', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' }]" /%}
