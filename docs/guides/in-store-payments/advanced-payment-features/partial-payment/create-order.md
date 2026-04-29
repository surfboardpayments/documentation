Create an order for the partial payment in the order itself, by specifying the payment initiation amount (the partial amount) against the total order value using the `initiatePaymentsOptions` within the order creation request.

### Prerequisites

- API Credentials.
- **`terminal$id`** of the terminal where you are creating the order.
- **`initiatePaymentsOptions`** is given to complete a partial payment using **`amount`**

### To create an order

1. Send a `POST` to the **Create New Order API**.

Here's an example of creating a order:

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"terminalId\": \"8386af3b0f71b80b04\",\n  \"referenceId\": \"\",\n  \"orderLines\": [\n    {\n      \"id\": \"TERM123NAL\",\n      \"name\": \"Nike Shoes\",\n      \"quantity\": 1,\n      \"amount\": {\n        \"regular\": 500,\n        \"campaign\": 0,\n        \"shipping\": 0,\n        \"total\": 500,\n        \"currency\": \"752\",\n        \"tax\": [\n          {\n            \"amount\": 20,\n            \"percentage\": 20,\n            \"type\": \"VAT\"\n          }\n        ]\n      },\n      \"totalOrderAmount\": {\n        \"total\": 500,\n        \"campaign\": 0,\n        \"regular\": 500,\n        \"currency\": \"752\",\n        \"tax\": [\n          {\n            \"amount\": 20,\n            \"percentage\": 20,\n            \"type\": \"VAT\"\n          }\n        ]\n      },\n      \"controlFunctions\": {\n        \"initiatePaymentsOptions\": {\n          \"paymentMethod\": \"CARD\",\n          \"amount\": 500\n        }\n      }\n    },\n    {\n      \"id\": \"TERM124NAL\",\n      \"name\": \"Apple AirPods\",\n      \"quantity\": 1,\n      \"amount\": {\n        \"regular\": 500,\n        \"campaign\": 0,\n        \"shipping\": 0,\n        \"total\": 500,\n        \"currency\": \"752\",\n        \"tax\": [\n          {\n            \"amount\": 20,\n            \"percentage\": 20,\n            \"type\": \"VAT\"\n          }\n        ]\n      },\n      \"totalOrderAmount\": {\n        \"total\": 500,\n        \"campaign\": 0,\n        \"regular\": 500,\n        \"currency\": \"752\",\n        \"tax\": [\n          {\n            \"amount\": 20,\n            \"percentage\": 20,\n            \"type\": \"VAT\"\n          }\n        ]\n      },\n      \"controlFunctions\": {\n        \"initiatePaymentsOptions\": {\n          \"paymentMethod\": \"CARD\",\n          \"amount\": 500\n        }\n      }\n    }\n  ]\n}"}] languages=["JSON"] /%}