Once merchants are onboarded and linked to a multi-merchant group, register the terminal using the **`merchantId`** from the Create Multi-Merchant Group API.

In this setup, merchants share a terminal for payments, but orders and payouts remain tied to each merchant’s individual **`merchantId`**.

### Prerequisites

- API Credentials.
- Requires the merchant's physical terminal,
    - 6-digit **`registrationId`** (from terminal display) or if **SurfPad** (serial number)
    - a valid **`storeId`**.

Here is the request body for the API

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t \"registrationId\":\"250901\",\n\t \"storeId\":\"st_GZVDbwmS86_G9pwc669U2\"\n}"}] languages=["JSON"] /%}