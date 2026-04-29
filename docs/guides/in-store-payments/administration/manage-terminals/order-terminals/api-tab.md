---
title: "Order Terminals Using API"
description: "Step-by-step guide to order terminals through the API."
category: "In-Store Payments Guides"
path: "/guides/in-store-payments/administration/manage-terminals/order-terminals/api-tab.md"
---

1. **`POST`** a request to the [**Create Merchant API**](api/merchants#Create-Merchant) with the required parameters **`country`**, **`organisation`** , **`corporateId`**. 
2. Customize for ordering terminals using control function parameters such as

**Step 1: Enable Product Catalogue Display**

To show the product catalogue during merchant creation:

- During the merchant creation with **Create Merchant API**, set the **`showProductCatalogue`** parameter to **`true`**

**Step 2: Configure Which Products Are Displayed**

To control which products are shown in the catalogue:

- Use the **`displayProducts`** parameter in the **control fields** of the **Create Merchant API**.
- For each product, provide:
    - **Product ID**
    - **Pricing plan** for the merchant
    
    > Surfboard provides the details of the pricing plan.
    > 

**Step 3: Preselect Products for Shipment (Optional)**

To automatically ship specific terminals or accessories to the merchant (without the need of merchant input):

- Use the **`preselectProducts`** parameter in the **control fields** of the **Create Merchant API**.
- Provide the **Product IDs** of the items to be preselected.

Here’s an example

{% requestresponse method="POST" requests=[{language: "cURL", code: "\ncurl -d ' \\\n{\n\t\"country\": \"SE\",\n\t\"organisation\": {\n\t\t\"corporateId\": \"12345678901\",\n\t\t\"legalName\": \"Legal Name\",\n\t\t\"mccCode\": \"5192\",\n\t\t\"address\": {\n\t\t\t\"careOf\": \"John Doe\",\n\t\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\t\"addressLine2\": \"Building C\",\n\t\t\t\"city\": \"Stockholm\",\n\t\t\t\"countryCode\": \"SE\",\n\t\t\t\"postalCode\": \"123 45\"\n\t\t},\n\t\t\"phone\": {\n\t\t\t\"code\": 46,\n\t\t\t\"number\": \"123456789\"\n\t\t},\n\t\t\"email\": \"contact@test.com\"\n\t},\n\t\"acquirerMID\": \"PF123456\",\n\t\"multiMerchantId\": \"8132483499c658050e\",\n\t\"controlFields\": {\n\t\t\"displayProducts\": [\n\t        {\n\t\t        \"productId\": \"815db2c5adc9b00301\",\n\t\t        \"pricingPlans\": [\"816192c7efa2b0091a\"]\n\t        }\n\t\t],\n\t\t\"showProductCatalogue\": true,\n\t\t\"transactionPricingPlan\": \"816192c7efa2b0091a\",\n\t\t\"preSelectProducts\": [\n\t        {\n\t\t        \"productId\": \"815db2c5adc9b00301\",\n\t\t        \"quantity\": 2,\n\t\t        \"pricingPlanId\": \"816192c7efa2b0091a\"\n\t        }\n\t\t],\n\t\t\"store\": {\n\t\t\t\"name\": \"Test Store\",\n\t\t\t\"email\": \"test@test.com\",\n\t\t\t\"phoneNumber\": {\n\t\t\t\t\"code\": 46,\n\t\t\t\t\"number\": \"987654321\"\n\t\t\t},\n\t\t\t\"address\": {\n\t\t\t\t\"careOf\": \"Jane Doe\",\n\t\t\t\t\"addressLine1\": \"Second Street 456\",\n\t\t\t\t\"city\": \"Stockholm\",\n\t\t\t\t\"countryCode\": \"SE\",\n\t\t\t\t\"postalCode\": \"123 46\"\n\t\t\t}\n\t\t}\n\t}\n}' \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  YOUR_API_URL/partners/:partnerId/merchants"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"applicationId\": \"8268abfc4ae6900a10\",\n\t\t\"webKybUrl\": \"https://web-kyb-beta.web.app/8268abfc4ae6900a10?pi=rzj8s3Mrrfckktk9iuaxajqU3IDEhX_XdfwR5zJGHJXjLN3dDIZ8xMfL4p1XvZaML0vyeTpRPMBpJg_5xLq3R_HEQC_qLKKnUn10H2LO2hxFcJmz9JjjlyKXzH_Vu8yy\"\n\t},\n\t\"message\": \"Merchant application created successfully.\"\n}" languages=["cURL"] /%}