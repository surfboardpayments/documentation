### Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.
- Merchant’s **`country`** and **`organisation`** with the **`corporateId`** are required for [**Create Merchant API**](https://developer-portal-dev.web.app/api/merchants?lang=cURL#Create-Merchant).

To order terminals,

1. **`POST`** a request to the [**Create Merchant API**](https://developers.surfboardpayments.com/api/merchants#Create-Merchant) and customize for ordering terminals using control function parameters such as
- **Enable Product Catalog Display**: Set the `showProductCatalogue` parameter to `true` in the **Create Merchant API** to make the catalog visible during merchant creation.
- **Configure Products to Display**: Use the `displayProducts` parameter to specify which items and pricing plans are shown to the merchant.
- **Pre-select Products for Shipment (Optional)**: To automatically ship terminals, use the `preselectProducts` parameter and provide the `Product IDs` of the items you want to send.

Here’s an example

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t\"country\": \"SE\",\n\t\"organisation\": {\n\t\t\"corporateId\": \"12345678901\",\n\t\t\"legalName\": \"Legal Name\",\n\t\t\"mccCode\": \"5192\",\n\t\t\"address\": {\n\t\t\t\"careOf\": \"John Doe\",\n\t\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\t\"addressLine2\": \"Building C\",\n\t\t\t\"city\": \"Stockholm\",\n\t\t\t\"countryCode\": \"SE\",\n\t\t\t\"postalCode\": \"123 45\"\n\t\t},\n\t\t\"phone\": {\n\t\t\t\"code\": 46,\n\t\t\t\"number\": \"123456789\"\n\t\t},\n\t\t\"email\": \"contact@test.com\"\n\t},\n\t\"acquirerMID\": \"PF123456\",\n\t\"multiMerchantId\": \"8132483499c658050e\",\n\t\"controlFields\": {\n\t\t\"displayProducts\": [\n\t        {\n\t\t        \"productId\": \"815db2c5adc9b00301\",\n\t\t        \"pricingPlans\": [\"816192c7efa2b0091a\"]\n\t        }\n\t\t],\n\t\t\"showProductCatalogue\": true,\n\t\t\"transactionPricingPlan\": \"816192c7efa2b0091a\",\n\t\t\"preSelectProducts\": [\n\t        {\n\t\t        \"productId\": \"815db2c5adc9b00301\",\n\t\t        \"quantity\": 2,\n\t\t        \"pricingPlanId\": \"816192c7efa2b0091a\"\n\t        }\n\t\t],\n\t\t\"store\": {\n\t\t\t\"name\": \"Test Store\",\n\t\t\t\"email\": \"test@test.com\",\n\t\t\t\"phoneNumber\": {\n\t\t\t\t\"code\": 46,\n\t\t\t\t\"number\": \"987654321\"\n\t\t\t},\n\t\t\t\"address\": {\n\t\t\t\t\"careOf\": \"Jane Doe\",\n\t\t\t\t\"addressLine1\": \"Second Street 456\",\n\t\t\t\t\"city\": \"Stockholm\",\n\t\t\t\t\"countryCode\": \"SE\",\n\t\t\t\t\"postalCode\": \"123 46\"\n\t\t\t}\n\t\t}\n\t}\n}"}] languages=["JSON"] /%}
