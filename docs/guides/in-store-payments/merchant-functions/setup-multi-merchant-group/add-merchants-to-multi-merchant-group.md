Once you have created the multi-merchant group, you can add individual merchants to it. When calling this Create merchant API, pass the **`multiMerchantId`** which links the merchant to the group. The API response will return an **`applicationId`** and a **`webKYB`**URL. As usual fill up the merchant application and you can create multiple merchants as much

### Prerequisites

- API Credentials
- **`multiMerchantId`** from **Create Multi-Merchant Group API** which links the merchant to the group.

Here is the request body for the API

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t\"country\": \"SE\",\n\t\"organisation\": {\n\t\t\"corporateId\": \"5566692092\"\n\t},\n  \"multiMerchantId\": \"8353ffb4664d900d0e\",\n\t\"controlFields\": {\n\t\t\"transactionPricingPlan\": \"💪🏻☺️✌🏻+🙈 = 🐹\"\n\t},\n\t\"store\": {\n\t\t\t\"name\": \"Test Store\",\n\t\t\t\"email\": \"test@test.com\",\n\t\t\t\"phoneNumber\": {\n\t\t\t\t\"code\": 46,\n\t\t\t\t\"number\": \"987654321\"\n\t\t\t},\n\t\t\t\"address\": {\n\t\t\t\t\"careOf\": \"Jane Doe\",\n\t\t\t\t\"addressLine1\": \"Second Street 456\",\n\t\t\t\t\"city\": \"Stockholm\",\n\t\t\t\t\"countryCode\": \"SE\",\n\t\t\t\t\"postalCode\": \"123 46\"\n\t\t\t}\n\t\t}\n\t}"}] languages=["JSON"] /%}