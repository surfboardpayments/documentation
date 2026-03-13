Create an order with both authMode and delay capture enabled. When authMode is set, payment capture for the order occurs later.

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
         "authorizationMode": "PRE-AUTH",
    "initiatePaymentsOptions": {
      "paymentMethod": "CASH"
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
