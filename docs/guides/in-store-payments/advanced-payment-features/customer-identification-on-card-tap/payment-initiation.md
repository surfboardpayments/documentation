Once done, you can initiate payment for the updated order with [**Initiate payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment).

Here’s an example of initiate payment API call

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t\"orderId\": \"8359ddb1bb57b00e0b\",\n\t\"paymentMethod\": \"CARD\",\n\t\"amount\": \"500\"\n}"}] languages=["JSON"] /%}