You need to initiate the remaining payment **partially** against the amount that was **previously paid** in the **Create Order** request. In this call, you must specify the **partial amount** to be paid and the **payment method** used.

An order is considered **complete** only when the total of all initiated partial payments equals the order’s total amount.

### Prerequisites

- **API credentials**
- **`orderId`** of the order for which you want to initiate a partial payment

### To Initiate a Partial Payment

Send a **POST** request to the [**Initiate a Payment API**](https://developers.surfboardpayments.com/api/payments#Initiate-a-Payment) for each partial payment until the total order amount is fully settled.

Here's an example of initiating a partial payment:

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t\"orderId\": \"8359ddb1bb57b00e0b\",\n\t\"paymentMethod\": \"CARD\",\n\t\"amount\": \"500\"\n}"}] languages=["JSON"] /%}
 
 {% callout type="note" label="Note" %}
 Once you initiate the payment for an order paid in partial payments, check the status of payment using the Fetch Order Status API.
 {% /callout %}