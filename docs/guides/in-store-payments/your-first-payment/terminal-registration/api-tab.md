### Prerequisites

Before you begin, ensure you have the following:

- **API Credentials**: Valid API-KEY, API-SECRET, and **`merchantId`** for access to APIs.
- **Terminal Registration**: Requires the merchant's physical terminal,
    - 6-digit **`registrationId`** (from terminal display) or if **SurfPad** (serial number found at back of the device)
    - a valid **`storeId`**.

### To register a terminal using the **Register Terminal API**

1. Power on the terminal after receiving it. A 6-digit code (**registrationId**) will be displayed.(for SurfPad, use the serial number on the back of the device)
2. Send a request to the [**Register Terminal API**](https://developers.surfboardpayments.com/api/terminals?lang=cURL#Register-Terminal), including the **`registrationId`** and the **`storeId`** (the terminal where it will be registered).
3. Upon successful registration, the response will include the **`terminalId`**.


{% callout type="note" label="Note" %}
For softPOS solutions, registration can also be done via inter-app switch if configured on your end. See the [**Inter-App Guide**](https://developers.surfboardpayments.com/guides/in-store-payments/integrations/prebuilt-apps/Inter-app) for details.
{% /callout %}

Here’s an example call

{% requestresponse method="POST" requests=[{language: "cURL", code: "curl -d '{\n\t        \"registrationId\":\"250901\",\n\t        \"storeId\":\"83402f67a06b68040f\"\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/terminals"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"terminalId\": \"813ca2cb12ce400405\"\n\t},\n\t\"message\": \"Terminal registered successfully\"\n}" languages=["cURL"] /%}
