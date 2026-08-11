**`orderLineLevelCalculation`** set to `false`

-   **Nike Shoes:** 100 - 100 + 50 = 50
-   **Apple Pods:** 200 - 100 + 50 = 150
-   **Charging dock:** 100 - 100 + 50 = 50

The **`totalOrderAmount`** is sum of (**total line item× quantity)** then **(50 × 2) + (150 × 1) + (50 × 2) = 350 SEK**.

**Request**

```json-playground
{
    "terminal$id": "8395153bed91780404",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 2,
            "amount": {
                "regular": 100,
                "campaign": 100,
                "shipping": 50,
                "total": 50,
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
                "regular": 200,
                "campaign": 100,
                "shipping": 50,
                "total": 150,
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
            "name": "Charging dock",
            "quantity": 2,
            "amount": {
                "regular": 100,
                "campaign": 100,
                "shipping": 50,
                "total": 50,
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
    "totalOrderAmount": {
        "regular": 350,
        "total": 350,
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
        "orderLineLevelCalculation": false,
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
        "orderId": "8399b630042ce9780b",
        "paymentId": "8399b630c757d80a06",
        "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4Mzk5YjYzMDA0MmNlOTc4MGIiLCJ0aWQiOiI4Mzk1MTUzYmVkOTE3ODA0MDQiLCJwaWQiOiI4Mzk5YjYzMGM3NTdkODBhMDYiLCJwbSI6IkNBUkQiLCJhIjozNTAsImMiOiI3NTIiLCJjb250cm9sRnVuY3Rpb25zRW5jb2RlciI6IjAiLCJpc3N1ZWRCeSI6InNiLnBzIiwiaWF0IjoxNzYxODA1NzkzNDg5fQ.hDuS_ONvncolNkiYo6gbxhNQp8bMbg0qMMIsTj-JTLU"
    },
    "message": "Order created successfully"
}
```
