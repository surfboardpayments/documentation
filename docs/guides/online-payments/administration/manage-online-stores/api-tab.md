---
title: "Create and Update Online Store Using API"
description: "Guide for create and update online stores (Create or Update) Using API."
category: "Administration"
path: "/guides/online-payments/administration/manage-online-stores/api-tab.md"
---

1. **Start by Making a `POST` Request**
    
    Use the [**Create New Store API**](https://developer-portal-dev.web.app/api/stores#Create-New-Store) or [**Update Store API**](https://developer-portal-dev.web.app/api/stores#Update-Store) depending on whether you are creating a new store or updating an existing one.
    
2. **Include Required Parameters**
    
    In addition to the standard store details, include the following online-specific parameters:
    
    - **`storeName`**: Name of the store.
    - **`phoneNumber`**: Phone number of the store.
    - **`address`**: Address of the store.
    - **`city`**: Name of the city where the store is located.
    - **`zipCode`**: ZIP code of the store.
    - **`country`**: Two-letter ISO country code in uppercase, representing the location of the store.
    - **`merchantWebshopURL`**: The URL of the merchant’s webshop.
    - **`termsAndConditionsURL`**: The URL for the merchant’s terms and conditions, including the refund policy.
    - **`privacyPolicyURL`**: The URL of the merchant’s privacy policy.
    - **`paymentPageHostURL`**: The URL of the payment page for integrations in iFrame and SDK mode.

3. **Domain Verification**

    Once you create an online store, you will receive the domain validation keys which needs to be verified for both `paymentpageURL` (if provided) and `merchantWebshopURL`. You must set this key as a TXT record on your domain. Use the [**Verify Domain API**](/api/stores?lang=cURL#Verify-Store-Domain) to verify the domain. Surfboard automatically performs verification every 6 hours.

4. **Receive a Store ID**

    Upon successful creation or update, you will receive a **`Store ID`**. This Store ID is required for registering terminals and performing other store-related operations.

5. **Complete the Store Onboarding Process**

    After creating or updating the store, you will enter the store onboarding process. This involves an internal approval process within Surfboard. Once approved, you can register online terminals under the online store.

Here's an example

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n          \"storeName\": \"Trial Store\",\n          \"email\": \"TS@gmail.com\",\n          \"phoneNumber\": {\n    \t    \"code\": 91,\n    \t    \"number\": \"3214576980\"\n\t\t  },\n          \"address\": \"10,\",\n          \"city\": \"Stockholm\",\n          \"zipCode\": \"103 16\",\n          \"country\": \"SE\",\n          \"onlineInfo\": {\n            \"merchantWebshopURL\": \"https://testmerchantportal.com/home\",\n            \"paymentPageHostURL\": \"https://testmerchantportal.com/payment\",\n            \"termsAndConditionsURL\": \"https://testmerchantportal.com/terms\",\n            \"privacyPolicyURL\": \"https://testmerchantportal.com/privacy\"\n          }\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/partners/:partnerId/merchants/:merchantId/stores"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"storeId\": \"81d64e7174dcb00b0f\",\n\t\t\"merchantId\": \"818712cdbcb670070e\",\n\t\t\"name\": \"Trial Store\",\n\t\t\"address\": {\n\t\t\t\t\"addressLine1\":\"10\",\n\t\t\t\t\"addressLine2\":null ,\n\t\t\t\t\"addressLine3\":null ,\n\t\t\t\t\"city\": \"Stockholm\",\n\t\t\t\t\"countryCode\": \"SE\",\n\t\t\t\t\"postalCode\": \"103 16\"\n\t\t},\n\t\t\"phone\": \"3214576980\",\n\t\t\"email\": \"TS@gmail.com\",\n\t\t\"merchantUrlDomainVerificationKey\": \"499470649f03b53fa1175659d4389743974710260b7f410313487e6062b3d559\",\n\t    \"paymentPageUrlDomainVerificationKey\": \"2179beab4f5e8c3960615205f042939a2ccc6c51a6e5923c9c068b3d9a645590\"\n\t},\n\t\"message\": \"Store Created Successfully\"\n}" /%}