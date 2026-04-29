---
title: "Fetch Settlement Reports"
description: "Guide to retrieving settlement reports."
category: "Online Payments Guides"
path: "/guides/online-payments/post-payments/fetch-settlement-reports/fetch-settlement-reports.md"
---

# Fetch settlement reports

Surfboard Payments enables you to retrieve a detailed summary of completed transactions for a specific merchant. These reports can be generated for specific periods, such as daily or monthly. It provides essential details about each transaction, helping you effectively track and manage payment activities.

## Prerequisites

- API credentials.
- To fetch the report, you need to reference it with its **`partnerId`**.
- **`merchantId`** obtained through the  [**Create Merchant API**](/api/merchants#Create-Merchant) during onboarding.

## To fetch settlement reports

1. Include **`partnerId`** and **`merchantId`** in the request as input parameters to the [**Fetch Settlement Reports API**](/api/reporting#Fetch-Settlement-Reports).

Here's an example

{% requestresponse method="GET" requests=[{language: "cURL", code: "\ncurl -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     -H 'Content-Type: application/json' \\\n     YOUR_API_URL/partners/:partnerId/merchants/:merchantId/reports"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": [\n\t\t{\n\t\t\t\"payoutId\": \"Q6z2e0goIOE4DXD0VYiT\",\n\t\t\t\"merchantId\": \"8149bdef0a2300090e\",\n\t\t\t\"transactionStartDate\": \"2023-08-07\",\n\t\t\t\"transactionEndDate\": \"2023-08-07\",\n\t\t\t\"settlementDate\": \"2023-08-08\",\n\t\t\t\"reportType\": \"DAILY\",\n\t\t\t\"url\": \"https://reports.surfboardpayments.com/settlementReport1.pdf\",\n\t\t\t\"totalSale\": 10000,\n\t\t\t\"totalRefund\": 100,\n\t\t\t\"fee\": 200,\n\t\t\t\"payout\": 9700\n\t\t\t\n\t\t},\n\t\t{\n\t\t\t\"payoutId\": \"Q6z2e0goIOE4DXD0VYiT\",\n\t\t\t\"merchantId\": \"8149bdef0a2300090e\",\n\t\t\t\"transactionStartDate\": \"2023-08-07\",\n\t\t\t\"transactionEndDate\": \"2023-08-07\",\n\t\t\t\"settlementDate\": \"2023-08-08\",\n\t\t\t\"reportType\": \"DAILY\",\n\t\t\t\"url\": \"https://reports.surfboardpayments.com/settlementReport2.pdf\",\n\t\t\t\"totalSale\": 10000,\n\t\t\t\"totalRefund\": 100,\n\t\t\t\"fee\": 200,\n\t\t\t\"payout\": 9700\n\t\t}\n\t],\n\t\"message\": \"Settlement reports fetched successfully\"\n}" /%}

The parameters of response provides information as detailed below

| **Attribute**          | **Description**                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Payout ID              | Id which indicates a specific details of the payment.                                            |
| Merchant Id            | Id of the merchant whose reported is generated                                                   |
| Transaction start Date | Specify the start date of the first transaction in the generated settlement report in YYYY-MM-DD |
| Transaction End date   | Specify the end date of the last transaction in the settlement report in YYYY-MM-DD              |
| Settlement Date        | Specify the date of the completed payment in YYYY-MM-DD.                                         |
| Report type            | Specifies the type of settlement report for the merchant, can be either ‘MONTHLY’ or ‘DAILY’.    |
| URL                    | The URL shows detailed settlement report of a particular transaction.                            |
| Total sale             | Total sales value for the merchant during the period indicated in the settlement report          |
| Total refund           | Total refunded value by the merchant during the period indicated in the settlement report        |
| Fee                    | Total fee collected from transactions during the settlement.                                     |
| Payout                 | Final amount paid to the merchant following all deductions.                                      |

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' },{ title: 'Settlements', url: '/docs/settlements' }]" /%}
