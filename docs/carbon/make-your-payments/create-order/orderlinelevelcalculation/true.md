**`orderLineLevelCalculation`** set to `true`

-   **Nike Shoes:** (200 × 2) - 100 + 50 = 400 - 100 + 50 = **350 SEK**
-   **Apple Pods:** (200 × 1) - 100 + 50 = 200 - 100 + 50 = **150 SEK**
-   **Charging dock:** (200 × 2) - 100 + 50 = 400 - 100 + 50 = **350 SEK**

The **`totalOrderAmount`** is the sum of all line items:350 + 150 + 350 = **850 SEK**.

**Request**

```json-playground
{
    "terminal$id": "83a3b280c51b280604",
    "orderLines": [
        {
            "id": "0000CHI01",
            "name": "Nike Shoes",
            "quantity": 2,
            "amount": {
                "regular": 200,
                "campaign": 100,
                "shipping": 50,
                "total": 350,
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
                "regular": 200,
                "campaign": 100,
                "shipping": 50,
                "total": 350,
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
        "regular": 850,
        "total": 850,
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
        "orderLineLevelCalculation": true,
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
        "orderId": "83a1ba32774149710b",
        "paymentId": "83a1ba3264bd500106",
        "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4M2ExYmEzMjc3NDE0OTcxMGIiLCJ0aWQiOiI4MzlkMDU5NDVlZjk5MDA2MDQiLCJwaWQiOiI4M2ExYmEzMjY0YmQ1MDAxMDYiLCJwbSI6IkNBUkQiLCJhIjo4NTAsImMiOiI3NTIiLCJjb250cm9sRnVuY3Rpb25zRW5jb2RlciI6IjAiLCJpc3N1ZWRCeSI6InNiLnBzIiwiaWF0IjoxNzYyODU2NDIxMzA0fQ.bhfh78wvhrMdRZBDWUfKnmaHs1-lkNLQkRcghhrx02Y"
    },
    "message": "Order created successfully"
}
```
