### Pre-requisites

- API credentials
- **`purchaseOrderId`** - The orderId of the original purchase transaction

### To create a partial refund order
1. You can create partial refunds using API in two ways:

**Using OrderLines**

Create a return order by specifying the items to be refunded. The total refund amount will be calculated based on the orderLines.

Here is an example call,

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"terminal$id\": \"8360849c9842080a04\",\n  \"type\": \"return\",\n  \"purchaseOrderId\": \"836084bef5e3780f0b\",\n  \"referenceId\": \"orderabc\",\n  \"orderLines\": [\n    {\n      \"id\": \"1234\",\n      \"name\": \"Orange Juice\",\n      \"quantity\": 1,\n      \"itemAmount\": {\n        \"regular\": 100,\n        \"total\": 100,\n        \"currency\": \"SEK\",\n        \"tax\": [\n          {\n            \"amount\": 15,\n            \"percentage\": 15,\n            \"type\": \"vat\"\n          }\n        ]\n      }\n    },\n    {\n      \"id\": \"1233\",\n      \"name\": \"Grape Juice\",\n      \"quantity\": 1,\n      \"itemAmount\": {\n        \"regular\": 100,\n        \"total\": 100,\n        \"currency\": \"SEK\",\n        \"tax\": [\n          {\n            \"amount\": 15,\n            \"percentage\": 15,\n            \"type\": \"vat\"\n          }\n        ]\n      }\n    }\n  ]\n}"}] languages=["JSON"] /%}

**Using Total Amount**

Create a return order by specifying the refund amount directly. 

> Use `orderLines` for all orders except partial refunds with `totalOrderAmount`.

Here is an example call,

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"terminal$id\": \"8360849c9842080a04\",\n  \"type\": \"return\",\n  \"purchaseOrderId\": \"836084bef5e3780f0b\",\n  \"referenceId\": \"orderabc\",\n  \"totalOrderAmount\": {\n    \"regular\": 100,\n    \"total\": 100,\n    \"currency\": \"SEK\",\n    \"tax\": [\n      {\n        \"amount\": 30,\n        \"percentage\": 15,\n        \"type\": \"vat\"\n      }\n    ]\n  },\n  \"controlFunctions\": {\n    \"includeAdjustments\": true\n  }\n}"}] languages=["JSON"] /%}

2. Initiate refund payment using the returned orderId.

{% callout type="note" label="Note" %}
purchasePaymentId is required only when the original order was paid partially, regardless of payment type. It is not required for card-present refunds.
{% /callout %}

Here is an example call,

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"orderId\": \"836084bef5e3780f0b\",\n  \"paymentMethod\": \"CARD\",\n  \"refundReason\": \"CUSTOMER_INITIATED_RETURN\"\n}"}]
 languages=["JSON"] /%}

{% callout type="tip" label="Tip" %}
 Track refund status via webhook or the Fetch Order Status API.
 {% /callout %}
