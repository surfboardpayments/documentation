# Partial Payments

Unlike normal payments that require the full order amount to be paid all at once, **partial payments** allow merchants to accept payments in smaller, separate payments. This offers flexibility to both merchants and customers, enabling a single order to be settled over time with various payment methods like card, cash, or Swish.

## Implementation flow

![partial payments flow](https://developer-portal-docs-test.web.app/images/partial-payments.png "partial payments flow")

To design your partial payment integration follow these steps:

1. Create order
2. Initiate partial payments

## 1. Create Order

Create an order for a partial payment by specifying the partial amount within the `initiatePaymentsOptions` of the order creation request. The order will remain incomplete until the total amount of all initiated payments equals the `totalOrderAmount`.

For example, If the order is created for the total order value is **1000** specify the amount as partial value of **500** using initiatePaymentsOptions **`amount`** param while creating the order.

## 2. Initiate partial payments

You need to initiate the remaining payment **partially** against the amount that was **previously paid** in the **Create Order** request. In this call, you must specify the **partial amount** to be paid and the **payment method** used. 

> An order is considered **complete** only when the total of all initiated partial payments equals the order’s total amount.

## 3. Check Order Status

Once you initiate the payment for an order paid in partial payments, check the status of payment using the Fetch Order Status API.