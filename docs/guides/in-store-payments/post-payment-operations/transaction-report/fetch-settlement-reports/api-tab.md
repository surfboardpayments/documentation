You can retrieve a detailed summary of completed transactions for a specific merchant. These reports can be generated for different periods, such as daily or monthly.

### Prerequisites

- API credentials.
- To fetch the report, you need to reference it with its **`partnerId`**.
- **`merchantId`** obtained through the [**Create Merchant API**](https://developers.surfboardpayments.com/api/merchants#Create-Merchant) during onboarding.

### To fetch settlement reports

1. Include **`partnerId`** and **`merchantId`** in the request as input parameters to the [**Fetch Settlement Reports API**](https://developers.surfboardpayments.com/api/reporting#Fetch-Settlement-Reports).

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "\ncurl -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     -H 'Content-Type: application/json' \\\n     YOUR_API_URL/partners/:partnerId/merchants/:merchantId/reports"}] /%}


