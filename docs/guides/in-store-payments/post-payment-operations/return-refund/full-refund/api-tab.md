### Pre-requisites

- API credentials
- Set the order type as **`return`**
- **`purchaseOrderId`** - The orderId of the original purchase transaction

### To create a refund Order

1. Make a `POST` request to the  [**Create New Order API**](https://developers.surfboardpayments.com/api/orders#Create-New-Order). Be sure to set the `type` to `"return"`. You must also provide the `purchaseOrderId` from the original, completed transaction.

Here's an example of creating a return order:

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"terminal$id\": \"8360849c9842080a04\",\n  \"type\": \"return\",\n  \"purchaseOrderId\": \"836084bef5e3780f0b\",\n  \"referenceId\": \"orderabc\",\n  \"orderLines\": [\n    {\n      \"id\": \"1234\",\n      \"name\": \"Orange Juice\",\n      \"quantity\": 1,\n      \"itemAmount\": {\n        \"regular\": 100,\n        \"total\": 100,\n        \"currency\": \"SEK\",\n        \"tax\": [\n          {\n            \"amount\": 15,\n            \"percentage\": 15,\n            \"type\": \"vat\"\n          }\n        ]\n      }\n    },\n    {\n      \"id\": \"1233\",\n      \"name\": \"Grape Juice\",\n      \"quantity\": 1,\n      \"itemAmount\": {\n        \"regular\": 100,\n        \"total\": 100,\n        \"currency\": \"SEK\",\n        \"tax\": [\n          {\n            \"amount\": 15,\n            \"percentage\": 15,\n            \"type\": \"vat\"\n          }\n        ]\n      }\n    }\n  ]\n}"}] languages=["JSON"] /%}
2. Initiate the refund using the `orderId` from the return order and make a `POST` request to the **Initiate Payment API.**

Here's an example:

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"orderId\": \"836084bef5e3780f0b\",\n  \"paymentMethod\": \"CASH\"\n}"}] languages=["JSON"] /%}