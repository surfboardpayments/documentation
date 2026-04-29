---
title: "Onboard Merchant via API"
description: "Guide to onboarding merchants using the API."
category: "Online Payment Guides"
path: "/guides/online-payments/create-merchant-and-store-setup/api-tab.md"
---

1. Start by making a **`POST`** request to the [**Create Merchant API**](/api/merchants#Create-Merchant).
2. Include these key parameters in your request:
    - **`country`** : Two-letter ISO country code of the merchant, in uppercase. For e.g. 'SE', 'DK'.
    - **`organisation`** : This object should contain details about your organization like **`corporateId`** and other relevant information.

Pass in the online store info by adding the following parameters

-   `merchantWebpage`: This is the web-shop URL of the merchant.
-   `termsAndConditionsURL`: This is the URL of the T&C of the merchant’s web-shop, it has to contain the refund policy. It will be rendered on the online checkout page.
-   `privacyPolicyURL`: This is the URL of the privacy policy of the merchant. It will be rendered on the online checkout page.
-   `paymentOriginPageHost`: This is the URL of the payment page. It is required when doing integrations in the SDK mode.

{% callout type="important" label="Important" %}
It is mandatory for you to display the contact information, privacy policy and the terms and conditions on the web-shop page. And please note that the online info can be updated only once.
{% /callout %}

3. In response to the create merchant request, you will receive an **`applicationId`** along with the **KYB URL** ( **`webKybUrl`** ).
4. The **`applicationId`** is required to track the status of the create merchant application. Store the **Application ID** securely and associate it with an identifiable record in your system for easy retrieval.
5. Share the `webKybUrl` with the merchant for them to complete the merchant application.

Here’s an example

{% requestresponse method="POST" requests=[{language: "cURL", code: "\ncurl -d ' \\\n{\n\t\"country\": \"SE\",\n\t\"organisation\": {\n\t\t\"corporateId\": \"1234567890\",\n\t\t\"legalName\": \"Legal Name\",\n\t\t\"mccCode\": \"5192\",\n\t\t\"address\": {\n\t\t\t\"careOf\": \"John Doe\",\n\t\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\t\"addressLine2\": \"Building C\",\n\t\t\t\"city\": \"Stockholm\",\n\t\t\t\"countryCode\": \"SE\",\n\t\t\t\"postalCode\": \"123 45\"\n\t\t},\n\t\t\"phone\": {\n\t\t\t\"code\": 46,\n\t\t\t\"number\": \"123456789\"\n\t\t},\n\t\t\"email\": \"contact@test.com\"\n\t},\n\t\"acquirerMID\": \"PF123456\",\n\t\"multiMerchantId\": \"8132483499c658050e\",\n\t\"controlFields\": {\n\t\t\"displayProducts\": [\n\t        {\n\t\t        \"productId\": \"815db2c5adc9b00301\",\n\t\t        \"pricingPlans\": [\"816192c7efa2b0091a\"]\n\t        }\n\t\t],\n\t\t\"showProductCatalogue\": true,\n\t\t\"transactionPricingPlan\": \"816192c7efa2b0091a\",\n\t\t\"preSelectProducts\": [\n\t        {\n\t\t        \"productId\": \"815db2c5adc9b00301\",\n\t\t        \"quantity\": 2,\n\t\t        \"pricingPlanId\": \"816192c7efa2b0091a\"\n\t        }\n\t\t],\n\t\t\"store\": {\n\t\t\t\"name\": \"Test Store\",\n\t\t\t\"email\": \"test@test.com\",\n\t\t\t\"phoneNumber\": {\n\t\t\t\t\"code\": 46,\n\t\t\t\t\"number\": \"987654321\"\n\t\t\t},\n\t\t\t\"address\": {\n\t\t\t\t\"careOf\": \"Jane Doe\",\n\t\t\t\t\"addressLine1\": \"Second Street 456\",\n\t\t\t\t\"city\": \"Stockholm\",\n\t\t\t\t\"countryCode\": \"SE\",\n\t\t\t\t\"postalCode\": \"123 46\"\n\t\t\t},\n\t\t\t\"onlineInfo\": {\n\t\t\t\t\"merchantWebshopURL\": \"https://merchant-shop.com\",\n\t\t\t\t\"paymentPageHostURL\": \"https://payments.merchant-shop.com\",\n\t\t\t\t\"termsAndConditionsURL\": \"https://merchant-shop.com/terms\",\n\t\t\t\t\"privacyPolicyURL\": \"https://merchant-shop.com/privacy\"\n\t\t\t}\n\t\t}\n\t}\n}' \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  YOUR_API_URL/partners/:partnerId/merchants"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"applicationId\": \"8268abfc4ae6900a10\",\n\t\t\"webKybUrl\": \"https://web-kyb-beta.web.app/8268abfc4ae6900a10?pi=rzj8s3Mrrfckktk9iuaxajqU3IDEhX_XdfwR5zJGHJXjLN3dDIZ8xMfL4p1XvZaML0vyeTpRPMBpJg_5xLq3R_HEQC_qLKKnUn10H2LO2hxFcJmz9JjjlyKXzH_Vu8yy\"\n\t},\n\t\"message\": \"Merchant application created successfully.\"\n}" languages=["cURL"] /%}
