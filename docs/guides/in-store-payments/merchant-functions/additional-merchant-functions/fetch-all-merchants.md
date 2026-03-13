You can use the [**Fetch All Merchants API**](https://developers.surfboardpayments.com/api/merchants#Fetch-All-Merchants) to retrieve information about all the merchants. Partners can also fetch the merchant details using **Partner Portal**.

**Prerequisites**

- API credentials and **`partnerId`** .

**To fetch all merchants details under partner,**

{% requestresponse method="POST" requests=[{language: "JSON", code: "curl -X GET \\\n  -H 'Content-Type: application/json' \\\n  -H 'API-KEY: YOUR_API_KEY' \\\n  -H 'API-SECRET: YOUR_API_SECRET' \\\n  'YOUR_API_URL//partners/:partnerId/merchants'"}] languages=["JSON"] /%}