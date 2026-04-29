---
title: "Create and add Stores Using API"
description: "Guide to create and add stores through API."
category: "In-Store Payment Guides"
path: "/guides/in-store-payments/administration/manage-stores/create-add-stores-api-tab.md"
---

1. **`POST`** a request to [**Create Store API**](/api/stores#Create-Store) with the required parameters
    - **`storeName`** : Store’s name
    - **`phoneNumber`**: Store’s phone number
    - **`address`** : Store’s address
    - **`city`** : Name of the city where the store is located.
    - **`zipCode`** : ZIP code of the store
    - **`country`** : Two-letter ISO country code of the merchant, in uppercase. For e.g. 'SE', 'DK'.

 2. You will receive a response containing the **`storeId`**, **`merchantId`**, **`name`**, **`address`**, **`phoneNumber`** and **`email`**. Save the **`storeId`** which can be used for terminal registration and future updates to the created store.

Here’s the example request and response for adding a additional store

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"storeName\": \"Trial Store\",\n          \"email\": \"TS@gmail.com\",\n          \"phoneNumber\": {\n    \t    \"code\": 91,\n    \t    \"number\": \"3214576980\"\n\t\t  },\n          \"address\": \"10,\",\n          \"city\": \"Stockholm\",\n          \"zipCode\": \"103 16\",\n          \"country\": \"SE\",\n          \"onlineInfo\": {\n            \"merchantWebshopURL\": \"https://testmerchantportal.com/home\",\n            \"paymentPageHostURL\": \"https://testmerchantportal.com/payment\",\n            \"termsAndConditionsURL\": \"https://testmerchantportal.com/terms\",\n            \"privacyPolicyURL\": \"https://testmerchantportal.com/privacy\"\n          }\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/partners/:partnerId/merchants/:merchantId/stores"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"storeId\": \"81d64e7174dcb00b0f\",\n\t\t\"merchantId\": \"818712cdbcb670070e\",\n\t\t\"name\": \"Trial Store\",\n\t\t\"address\": {\n\t\t\t\t\"addressLine1\":\"10\",\n\t\t\t\t\"addressLine2\":null ,\n\t\t\t\t\"addressLine3\":null ,\n\t\t\t\t\"city\": \"Stockholm\",\n\t\t\t\t\"countryCode\": \"SE\",\n\t\t\t\t\"postalCode\": \"103 16\"\n\t\t},\n\t\t\"phone\": \"3214576980\",\n\t\t\"email\": \"TS@gmail.com\",\n\t},\n\t\"message\": \"Store Created Successfully\"\n}" languages=["cURL"] /%}