# Adjustments - Carbon

**Adjustments** APIs allows you to make modifications to the total order value in a transaction, allowing for flexibility in the final amount charged to the customer. These adjustments can be used to either add to or deduct from the original total, enhancing the overall purchasing experience.

> Adjustments cannot be included in return/refund an order

## Type of Adjustments

-   **Tips**: Additional amounts that customers choose to give for good service.
-   **Charity Donations**: Voluntary contributions added to the order total, allowing customers to donate to a selected charitable organization during the checkout process.
-   **Gift Cards**: Amounts deducted from the total order value when customers use gift cards as a form of payment during their purchase.
-   **Discounts or credits:** If a customer is eligible for a discount or credit, an adjustment can be made to reflect the reduced amount.

## Fetch adjustments

If you want to see the adjustments made to your order, use [**Fetch Adjustments**](/api/adjustments?lang=cURL#Fetch-Adjustments) API. This shows you the details of any adjustments made by the merchant or store.

You can also filter the adjustments by date range using **`startDate`** and **`endDate`** in the request. Then response you'll get includes:

-   **`adjustmentId`**-Id of the adjustment for the order
-   **`adjustmentType`:** The type of adjustment (e.g., tip, donation, gift card).
-   **`amount`:** The amount of money added or subtracted.

This adjustments API can be utilized to adjust the add ons like tips, receipts,

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "curl -H \'Content-Type: application/json\' \\n -H \'API-KEY: YOUR_API_KEY\' \\n -H \'API-SECRET: YOUR_API_SECRET\' \\n -H \'MERCHANT-ID: YOUR_MERCHANT_ID\' \\n YOUR_API_URL/adjustments/:id"}] response="{\n "status": "SUCCESS",\n "data": [\n {\n "adjustmentId": "81efdbe975ebc800ff",\n "adjustmentType": "tips",\n "amount": "100"\n }\n ],\n "message": "Adjustments fetched successfully"\n}" /%}

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Transactions', url: '/docs/transactions' },{ title: 'Currencies', url: '/docs/currencies' }]" /%}
