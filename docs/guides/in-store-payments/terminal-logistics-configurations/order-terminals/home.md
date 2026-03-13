Ordering terminals can be done during or after merchant onboarding, and managing shipments of terminals using Surfboard APIs and the Partner Portal.

- During onboarding
- After onboarding

{% pills tabs=[
  {
    label: "During onboarding",
    markdocSrc: "guides/in-store-payments/terminal-logistics-configurations/order-terminals/during-onboarding/home.md"
  },
  {
    label: "After onboarding",
    markdocSrc: "guides/in-store-payments/terminal-logistics-configurations/order-terminals/after-onboarding/home.md"
  }
] /%}

### Track shipments

Partners can track the shipment of ordered terminals using the [**Get Shipment Status API**](https://developer-portal-dev.web.app/api/logistics?lang=cURL#Get-Shipment-Status). To do so,

Send a GET request to Get shipment status API as follows

{% requestresponse method="GET" requests=[{language: "JSON", code: "curl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/partners/:partnerId/merchants/:merchantId/shipment/:orderId"}] languages=["JSON"] /%}
