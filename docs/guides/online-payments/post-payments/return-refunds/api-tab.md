---
title: "Refunds Using API"
description: "Guide to processing online refunds for card-not-present transactions Using API."
category: "Online Payment Guides"
path: "/guides/online-payments/post-payments/return-refunds/api-tab.md"
---

To initiate an online refund, use the CNP refund method provided in the [**Initiate Payment API**](/api/payments?lang=cURL#Initiate-a-Payment). The refund request must include `orderID` and that can be obtained from the following steps:

1. **`POST`** request to the [**Create New Order API**](/api/orders#Create-New-Order). Include the following key parameters
    - **`terminal$id`**: Identify the terminal from which you're creating the order.
    - **`purchaseOrderId`** : This is the **Order ID**(**`orderId`**) of the order to be returned or refunded.
    - **`type`**: Specify the order type as ‘return’.

Here is an example

{% requestresponse method="POST" requests=[{language: "cURL", code: "\ncurl  -d ' \\  \n{\n\t\"terminal$id\": \"8342bf45e0cef80504\",\n\t\"type\": \"return\",\n\t\"purchaseOrderId\": \"834952e5ac0738040b\",\n\t\"referenceId\": \"orderabc\",\n\t\"orderLines\": [\n\t\t{\n\t\t\t\"id\": \"1234\",\n\t\t\t\"name\": \"Orange Juice\",\n\t\t\t\"quantity\": 1,\n\t\t\t\"itemAmount\": {\n\t\t\t\t\"regular\": 100,\n\t\t\t\t\"total\": 100,\n\t\t\t\t\"currency\": \"SEK\",\n\t\t\t\t\"tax\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"amount\": 15,\n\t\t\t\t\t\t\"percentage\": 15,\n\t\t\t\t\t\t\"type\": \"vat\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t{\n\t\t\t\"id\": \"1233\",\n\t\t\t\"name\": \"Grape Juice\",\n\t\t\t\"quantity\": 1,\n\t\t\t\"itemAmount\": {\n\t\t\t\t\"regular\": 100,\n\t\t\t\t\"total\": 100,\n\t\t\t\t\"currency\": \"SEK\",\n\t\t\t\t\"tax\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"amount\": 15,\n\t\t\t\t\t\t\"percentage\": 15,\n\t\t\t\t\t\t\"type\": \"vat\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t}\n\t]\n}' \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n YOUR_API_URL/orders"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"orderId\": \"83495a30ac0738050b\"\n\t},\n\t\"message\": \"Order created successfully\"\n}" /%}

2. Then initiate refund using the [Initiate payment API](/api/payments?lang=cURL#Initiate-a-Payment) and include the following:

- Use the return **`orderId`** received from step 1.
- Choose your **`paymentMethod`**
    
    **CARD_NP**: For processing refunds on card transactions.
    
- **`refundReason`**: Indicates the reason for the return request. Mandatory for **`CARD_NP`** refunds.
    
    
    | **Parameter** | **Description** |
    | --- | --- |
    | `CUSTOMER_INITIATED_RETURN` | When a customer initiates a return of a product or service they purchased. |
    | `SUSPECTED_MALFUNCTION` | When there is a suspected system malfunction. |
    | `SUSPECTED_FRAUD` | When there is suspected irregularity/fraud. |
    | `DUPLICATE_TRANSACTION` | When there are duplicate transactions noticed in the system. |
    | `OTHER` | For refund requests that do not fit into the specific categories mentioned above. |

-   **otherReason**: Describe the reason for the return request that does not fall into any predefined categories. Mandatory when "OTHER" is selected as the `refundReason`.   


Here is an example

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"orderId\": \"83495a30ac0738050b\",\n          \"paymentMethod\": \"CARD_NP\"\n          \"refundReason\": \"CUSTOMER_INITIATED_RETURN\"\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments"}] response="{\n\t\"status\":\"SUCCESS\",\n\t\"data\":{\n\t\t\"paymentId\": \"811f9bd48c6eb80c06\"\n\t}\n\t\"message\":\"Refund initiated successfully\"\n}" /%}

### Partial Refunds

There are two ways to create a partial refund:

#### 1. Using OrderLines
Create a return order by specifying the items to be refunded. The total refund amount will be automatically calculated based on the orderLines. 

Include:
- All required parameters mentioned above
- `orderLines`: Array of items to be refunded, each containing:
  - `id`: Unique identifier for the order line (e.g., "1234")
  - `name`: Product name (e.g., "Burger")
  - `quantity`: Number of items (e.g., 1)
  - `itemAmount` - Object containing:
    - `regular`: Regular price of the product in the smallest currency unit (e.g., 2000)
    - `total`: Total amount payable by the customer per unit in smallest currency units (e.g., 2000)
    - `currency`: Type of currency in ISO 4217 format (e.g., "SEK")
    - `tax` - Array of tax objects, each containing:
      - `amount`: Taxable amount in the smallest currency unit (e.g., 200)
      - `percentage`: Percentage of respective tax (e.g., 10)
      - `type`: Type of the tax supported currently is 'vat'

Example:
{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"terminal$id\": \"82e69dd73d52c80805\",\n          \"type\": \"return\",\n          \"purchaseOrderId\": \"82e89db83d0470090b\",\n          \"orderLines\": [\n              {\n                  \"id\": \"1234\",\n                  \"name\": \"Bucket hat\",\n                  \"quantity\": 1,\n                  \"itemAmount\": {\n                      \"regular\": 2000,\n                      \"total\": 2000,\n                      \"currency\": \"SEK\",\n                      \"tax\": [\n                          {\n                              \"amount\": 200,\n                              \"percentage\": 10,\n                              \"type\": \"vat\"\n                          }\n                      ]\n                  }\n              }\n          ]\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/orders"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"orderId\": \"82ea625b03c9100d0b\"\n\t},\n\t\"message\": \"Order created successfully\"\n}" /%}

**Step 2:**  Initiate refund payment using the returned orderId:
{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"orderId\": \"82ea625b03c9100d0b\",\n          \"paymentMethod\": \"CARD_NP\",\n          \"refundReason\": \"CUSTOMER_INITIATED_RETURN\",\n          \"purchasePaymentId\": \"8344c1bba91f580506\" // required only if the original order was paid partially (not required for card-present refunds)\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments"}] response="{\n\t\"status\":\"SUCCESS\",\n\t\"data\":{\n\t\t\"paymentId\": \"811f9bd48c6eb80c06\"\n\t}\n\t\"message\":\"Partial refund initiated successfully\"\n}" /%}

{% callout type="note" label="Note" %}
`purchasePaymentId` is required only when the original order was paid partially, regardless of payment type. It is not required for card-present refunds.
{% /callout %}

#### 2. Using Total Order Amount
Create a return order by specifying the refund amount directly. Include:
- All required parameters mentioned above
- `totalOrderAmount`: Object containing:
  - `regular`: Regular price of the order in the smallest currency unit (e.g., 2000)
  - `total`: Actual amount that the customer has to pay in the smallest currency unit (e.g., 2000)
  - `currency`: Type of currency in ISO 4217 format (e.g., "SEK")
  - `tax`: Array of tax objects, each containing:
    - `amount`: Taxable amount in the smallest currency unit (e.g., 200)
    - `percentage`: Percentage of respective tax (e.g., 10)
    - `type`: Type of the tax supported currently is 'vat'

> `orderLines` is required for both purchase and return orders. The only exception is when processing a partial refund using the `totalOrderAmount` field. In this case, `orderLines` is not needed.

Example:
{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"terminal$id\": \"82e69dd73d52c80805\",\n          \"type\": \"return\",\n          \"purchaseOrderId\": \"82e89db83d0470090b\",\n          \"totalOrderAmount\": {\n              \"regular\": 2000,\n              \"total\": 2000,\n              \"currency\": \"SEK\",\n              \"tax\": [\n                  {\n                      \"amount\": 200,\n                      \"percentage\": 10,\n                      \"type\": \"vat\"\n                  }\n              ]\n          }\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/orders"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"orderId\": \"82ea625b03c9100d0b\"\n\t},\n\t\"message\": \"Order created successfully\"\n}" /%}

**Step 2:** Initiate refund payment using the returned orderId.

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"orderId\": \"82ea625b03c9100d0b\",\n          \"paymentMethod\": \"CARD_NP\",\n          \"refundReason\": \"CUSTOMER_INITIATED_RETURN\",\n          \"purchasePaymentId\": \"8344c1bba91f580506\" // required only if the original order was paid partially (not required for card-present refunds)\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/payments"}] response="{\n\t\"status\":\"SUCCESS\",\n\t\"data\":{\n\t\t\"paymentId\": \"811f9bd48c6eb80c06\"\n\t}\n\t\"message\":\"Partial refund initiated successfully\"\n}" /%}

{% callout type="note" label="Note" %}
`purchasePaymentId` is required only when the original order was paid partially, regardless of payment type. It is not required for card-present refunds.
{% /callout %}

Refunds must be processed using the corresponding payment method used in the purchase transaction
- For card transactions, use CARD_NP to process the refund
- For digital payment methods (like KLARNA, etc.), use the same payment method as the original transaction.
