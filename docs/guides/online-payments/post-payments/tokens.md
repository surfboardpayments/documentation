---
title: "Tokens"
description: "Guide to tokenization for recurring and merchant-initiated transactions under online."
category: "Online Payment Guides"
path: "/guides/online-payments/post-payments/tokens.md"
---

# Tokens

Tokenization eliminates the need for customers to re-enter their card details for subsequent payments, making it ideal for scenarios like subscriptions and other recurring payments. It is primarily used for Merchant Initiated Transactions (MIT).

| **Area/Feature** | **Tokenisation Use Case** |
| --- | --- |
| Payment Page / SDK | Secure card data handling, PCI compliance |
| Merchant Initiated Terminal | Recurring/subscription payments using stored tokens |
| Refunds | Reference to original payment token for secure refunds |


## Tokenization Process

### Enabling Tokenization

To enable tokenization during order creation, set the `enforceTokenization` parameter to `true` in the [**create new order**](/api/orders#Create-New-Order) request.

For example, let’s say you have created an order with enforceTokenization set to true, it will look like the following:

```json
{
    "terminalId": "123456",
    "purchaseOrderId": "PO123456789",
    "companyPurchase": true,
    "company": {
        "id": "C12345",
        "vatId": "VAT67890",
        "poDetails": "Company purchase order details"
    },
    "customer": {
        "person": {
            "name": "John Doe",
            "id": "CU12345",
            "email": "john.doe@example.com",
            "phone": {
                "extension": "+1",
                "phoneNumber": "1234567890",
                "personalNumber": "123-45-6789",
                "coordinationNumber": "C123456789",
                "countryResidence": "US"
            },
            "birthDate": "1990-01-01"
        },
        "billing": {
            "careof": "Jane Doe",
            "address1": "123 Main St",
            "address2": "Suite 100",
            "city": "Anytown",
            "postalCode": "12345",
            "country": "US"
        }
    },
    "type": "purchase",
    "referenceId": "REF123456",
    "orderLines": [
        {
            "id": "ITEM123",
            "name": "Item Name",
            "description": "Description of the item",
            "quantity": 2,
            "itemAmount": {
                "regular": 100.0,
                "currency": "USD"
            }
        }
    ],
    "totalOrderAmount": {
        "regular": 200.0,
        "currency": "USD"
    },
    "controlFunctions": {
        "enforceTokenization": true
    }
}
```

### Fetching Tokens After Payment

After a successful payment, if `enforceTokenization` was set to `true`, you can retrieve all tokens associated with that order using the [Tokens API](/api/orders#Fetch-Tokens-from-Order).

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "\ncurl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/orders/:orderId/tokens"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": [\n\t\t{\n\t\t\t\"cardBrand\": \"VISA\",\n\t\t\t\"cardholderName\": \"Tom\",\n\t\t\t\"tokenId\": \"822d544dc48c200308\",\n\t\t\t\"createdAt\": \"2024-04-25T11:22:24.845Z\",\n\t\t\t\"expiryMonth\": 7,\n\t\t\t\"expiryYear\": 2026,\n\t\t\t\"truncatedPan\": \"8907\"\n\t\t\t\"cardArt\":\"iVBORw0KGgoAAAANSUhEUgAAAUQAAA......\"\n\t\t},\n\t\t{\n\t\t\t\"cardBrand\": \"VISA\",\n\t\t\t\"cardholderName\": \"Sam\",\n\t\t\t\"tokenId\": \"822d544dc48c200308\",\n\t\t\t\"createdAt\": \"2024-04-25T11:22:24.845Z\",\n\t\t\t\"expiryMonth\": 5,\n\t\t\t\"expiryYear\": 2025,\n\t\t\t\"truncatedPan\": \"0987\"\n\t\t\t\"cardArt\":\"YAAAAAXNSR0IArs4c6QAAAARnQU1BA......\"\n\t\t}\n\t],\n\t\"message\": \"Fetched the card information.\"\n}" languages=["cURL"] /%}

### Storing Tokens

Securely store the retrieved `tokenId` in your system, linked to the customer who made the payment. This ensures you can easily use the token for future Merchant Initiated Transactions.

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' },{ title: 'Payment Methods', url: '/docs/payment-methods' }]" /%}
