### Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.
- **`merchantId`** obtained via [**Create Merchant API**](https://developers.surfboardpayments.com/api/merchants#Create-Merchant).

To do so,

1. Send a `POST` request to the **Create Store API** to create a new store.

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"storeName\": \"Trial Store\",\n  \"email\": \"TS@gmail.com\",\n  \"phoneNumber\": {\n    \"code\": 91,\n    \"number\": \"3214576980\"\n  },\n  \"address\": \"10,\",\n  \"city\": \"Stockholm\",\n  \"zipCode\": \"103 16\",\n  \"country\": \"SE\",\n  }"}] languages=["JSON"] /%}