# Make your First Payment

An order is always created against the **`terminal$id`** obtained after terminal registration, the **`POST`** request includes line items with their respective prices, serving as the first step in the payment flow. You can also include **`includePaymentOptions`** to complete the payment instantly. Each payment is linked to its corresponding **`orderId`**, ensuring an efficient transaction process.

The following gives you a comprehensive overview of the order flow.

![create order flow](https://developer-portal-docs-test.web.app/images/create-order.png "create order flow")

## OrderLineLevelCalculation

Order Line level Calculation this function handles how `totalItemAmount` is calculated for each line item, affecting the final `totalOrderAmount`. This is useful for merchants selling items with campaigns or shipping costs.

> Default value set to False

| Setting                  | Formula                                                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`true` (Recommended)** | An order is created with **`orderLineLevelCalculation`** set to **`true`**. Each line item’s `totalItemAmount` is calculated as **(regular × quantity) - campaign + shipping**.                          |
| **`false`**              | An order is created with **`orderLineLevelCalculation`** set to **`false`** and the **`totalOrderAmount`** is sum of (**total line item× quantity)** then **(50 × 2) + (150 × 1) + (50 × 2) = 350 SEK**. |

{% pills tabs=[
  {
    label: "true",
    markdocSrc: "carbon/make-your-payments/create-order/orderlinelevelcalculation/true.md"
  },
  {
    label: "false",
    markdocSrc: "carbon/make-your-payments/create-order/orderlinelevelcalculation/false.md"
  }
] /%}

## Adjustments

Adjustments modify the total order value by adding or deducting from the final amount. This feature provides flexibility for various scenarios, including tips, donations, gift cards, and discounts.

**Request**

```json-playground
{
    "terminal$id": "839d05945ef9900604",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 2,
            "amount": {
                "regular": 100,
                "total": 100,
                "currency": "752",
                "tax": [
                    {
                        "amount": 0,
                        "percentage": 0,
                        "type": "CGST"
                    }
                ]
            }
        },
        {
            "id": "0000CHI02",
            "name": "Apple Pods",
            "quantity": 1,
            "amount": {
                "regular": 100,
                "total": 100,
                "currency": "752",
                "tax": [
                    {
                        "amount": 0,
                        "percentage": 0,
                        "type": "CGST"
                    }
                ]
            }
        }
    ],
    "adjustments": [
        {
            "type": "Tips",
            "value": 10,
            "metaData": {
                "key": "This is the tip from order lines"
            }
        }
    ],
    "totalOrderAmount": {
        "regular": 300,
        "total": 310,
        "currency": "752",
        "tax": [
            {
                "amount": 0,
                "percentage": 0,
                "type": "CGST"
            }
        ]
    },
    "controlFunctions": {
        "initiatePaymentsOptions": {
            "paymentMethod": "CARD"
        }
    }
}
```

**Response**

```json
{
    "status": "SUCCESS",
    "data": {
        "orderId": "83a2458358e6217b0b",
        "paymentId": "83a2458364bd500606",
        "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4M2EyNDU4MzU4ZTYyMTdiMGIiLCJ0aWQiOiI4MzlkMDU5NDVlZjk5MDA2MDQiLCJwaWQiOiI4M2EyNDU4MzY0YmQ1MDA2MDYiLCJwbSI6IkNBUkQiLCJhIjozMTAsImMiOiI3NTIiLCJjb250cm9sRnVuY3Rpb25zRW5jb2RlciI6IjAiLCJpc3N1ZWRCeSI6InNiLnBzIiwiaWF0IjoxNzYyOTI3NzUwNDI0fQ.3Ao3f8l9Ks7fZouH4blLiUlRXIckk46JJ1mp8VfBF4c"
    },
    "message": "Order created successfully"
}
```

## Include Adjustments for Refund

Create an order with adjustments, where if the completed order is return/refund, the `includeAdjustmentsForRefund` feature is enabled as part of the refund process. Default value set to True.

> For partial returns, by default the first order will have includeAdjustments set to true and for the rest as false.

**Request**

```json-playground
{
    "terminal$id": "839d05945ef9900604",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 2,
            "amount": {
                "regular": 100,
                "total": 100,
                "currency": "752",
                "tax": [
                    {
                        "amount": 0,
                        "percentage": 0,
                        "type": "CGST"
                    }
                ]
            }
        },
        {
            "id": "0000CHI02",
            "name": "Apple Pods",
            "quantity": 1,
            "amount": {
                "regular": 100,
                "total": 100,
                "currency": "752",
                "tax": [
                    {
                        "amount": 0,
                        "percentage": 0,
                        "type": "CGST"
                    }
                ]
            }
        }
    ],
    "adjustments": [
        {
            "type": "Tips",
            "value": 10,
            "metaData": {
                "key": "This is the tip from order lines"
            }
        }
    ],
    "totalOrderAmount": {
        "regular": 300,
        "total": 310,
        "currency": "752",
        "tax": [
            {
                "amount": 0,
                "percentage": 0,
                "type": "CGST"
            }
        ]
    },
    "controlFunctions": {
        "initiatePaymentsOptions": {
            "paymentMethod": "CARD"
        }
    }
}
```

**Response**

```json
{
    "status": "SUCCESS",
    "data": {
        "orderId": "83a2458358e6217b0b",
        "paymentId": "83a2458364bd500606",
        "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4M2EyNDU4MzU4ZTYyMTdiMGIiLCJ0aWQiOiI4MzlkMDU5NDVlZjk5MDA2MDQiLCJwaWQiOiI4M2EyNDU4MzY0YmQ1MDA2MDYiLCJwbSI6IkNBUkQiLCJhIjozMTAsImMiOiI3NTIiLCJjb250cm9sRnVuY3Rpb25zRW5jb2RlciI6IjAiLCJpc3N1ZWRCeSI6InNiLnBzIiwiaWF0IjoxNzYyOTI3NzUwNDI0fQ.3Ao3f8l9Ks7fZouH4blLiUlRXIckk46JJ1mp8VfBF4c"
    },
    "message": "Order created successfully"
}
```

> For full detailed flow of refund with adjustments, click [here]

## Delay Capture

Delay capture is the feature, where the actual fund capture is delayed until order fulfillment is confirmed. This is commonly used in e-commerce, digital product delivery, or service bookings, where the order is verified before processing the payment. The authorized amount will be the exact amount captured later.

Create the order with delayCapture true

**Request**

```json-playground
{
    "terminal$id": "83abab731f6fb00704",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 1,
            "amount": {
                "regular": 500,
                "total": 500,
                "currency": "752",
                "tax": [
                    {
                        "amount": 20,
                        "percentage": 25,
                        "type": "VAT"
                    }
                ]
            }
        }
    ],
    "totalOrderAmount": {
        "regular": 500,
        "total": 500,
        "currency": "752",
        "tax": [
            {
                "amount": 20,
                "percentage": 25,
                "type": "VAT"
            }
        ]
    },

    "controlFunctions": {
        "delayCapture": true,
        "initiatePaymentsOptions": {
            "paymentMethod": "CARD"
        }
    }
}
```

**Response**

```json
{
    "status": "SUCCESS",
    "data": {
        "orderId": "83ac302f7c5130810b",
        "paymentId": "83ac302f24bfb00b06",
        "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4M2FjMzAyZjdjNTEzMDgxMGIiLCJ0aWQiOiI4M2FiYWI3MzFmNmZiMDA3MDQiLCJwaWQiOiI4M2FjMzAyZjI0YmZiMDBiMDYiLCJwbSI6IkNBU0giLCJhIjo1MDAsImMiOiI3NTIiLCJjb250cm9sRnVuY3Rpb25zRW5jb2RlciI6IjAiLCJpc3N1ZWRCeSI6InNiLnBzIiwiaWF0IjoxNzY0MjI3NTUwOTAwfQ.B301ggBPTYpnTxPdHx60fvAxb0eukP9QtyBjOSA_CsE"
    },
    "message": "Order created successfully"
}
```

## Read Tags

This is the feature, When merchants receive new inventory with NFC chips, they create a read session in their POS system for an order. During checkout, the merchant scans the NFC chip to read the product information and complete the purchase.

Order is created and completed with controlFunctions.readTags included in the request, indicating that NFC tag reading will be used to identify products for this order. To read multiple products, set it to MULTIPLE

**Request**

```json-playground
{
    "terminal$id": "83abab731f6fb00704",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 1,
            "amount": {
                "regular": 500,
                "total": 500,
                "currency": "752",
                "tax": [
                    {
                        "amount": 20,
                        "percentage": 25,
                        "type": "VAT"
                    }
                ]
            }
        }
    ],
    "totalOrderAmount": {
        "regular": 500,
        "total": 500,
        "currency": "752",
        "tax": [
            {
                "amount": 20,
                "percentage": 25,
                "type": "VAT"
            }
        ]
    },

    "controlFunctions": {
        "readTags": "SINGLE",
        "initiatePaymentsOptions": {
            "paymentMethod": "CARD"
        }
    }
}
```

**Response**

```json
{
    "status": "SUCCESS",
    "data": {
        "orderId": "83ac3f16e3a100890b",
        "paymentId": "83ac3f16a4bfb00006",
        "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4M2FjM2YxNmUzYTEwMDg5MGIiLCJ0aWQiOiI4M2FiYWI3MzFmNmZiMDA3MDQiLCJwaWQiOiI4M2FjM2YxNmE0YmZiMDAwMDYiLCJwbSI6IkNBUkQiLCJhIjo1MDAsImMiOiI3NTIiLCJjb250cm9sRnVuY3Rpb25zRW5jb2RlciI6IjEiLCJpc3N1ZWRCeSI6InNiLnBzIiwiaWF0IjoxNzY0MjM1MTgxNzAyfQ.rGxnYnHA2ZG3AUV13O54ZPdvg0xbWo45upLkjETw8f4"
    },
    "message": "Order created successfully"
}
```

## Tokenization

Tokenization eliminates the need for customers to re-enter their card details for subsequent payments, making it ideal for scenarios like subscriptions and other recurring payments. It is primarily used for Merchant Initiated Transactions (MIT).

| **Area/Feature**            | **Tokenisation Use Case**                              |
| --------------------------- | ------------------------------------------------------ |
| Payment Page / SDK          | Secure card data handling, PCI compliance              |
| Merchant Initiated Terminal | Recurring/subscription payments using stored tokens    |
| Refunds                     | Reference to original payment token for secure refunds |

To enable tokenization during order creation, set the **`enforceTokenization`** parameter to **`true`** in the **create new order** request.

For example, let’s say you have created an order with enforceTokenization set to true, it will look like the following:

```json-playground
{
    "terminal$id": "83abab731f6fb00704",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 1,
            "amount": {
                "regular": 500,
                "total": 500,
                "currency": "752",
                "tax": [
                    {
                        "amount": 20,
                        "percentage": 25,
                        "type": "VAT"
                    }
                ]
            }
        }
    ],
    "totalOrderAmount": {
        "regular": 500,
        "total": 500,
        "currency": "752",
        "tax": [
            {
                "amount": 20,
                "percentage": 25,
                "type": "VAT"
            }
        ]
    },

    "controlFunctions": {
        "enforceTokenization": true,
        "initiatePaymentsOptions": {
            "paymentMethod": "CARD"
        }
    }
}
```
