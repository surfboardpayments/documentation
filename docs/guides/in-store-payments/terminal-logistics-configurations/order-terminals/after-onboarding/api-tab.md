### Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.

To order additional terminals and accessories,

1. **`POST`** a request to the **Create Shipment API**

Here’s an example

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t\"shippingAddress\": {\n\t\t\"name\": \"John Doe\",\n\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\"addressLine2\": \"Building C\",\n\t\t\"addressLine3\": \"Building C\",\n\t\t\"city\": \"Stockholm\",\n\t\t\"countryCode\": \"SE\",\n\t\t\"postalCode\": \"123 45\",\n\t\t\"phone\": {\n\t\t\t\"code\": 46,\n\t\t\t\"number\": \"771890089\"\n\t\t},\n\t\t\"email\": \"developer@test.se\",\n\t\t\"deliveryInstruction\": \"XXX\"\n\t},\n\t\"lineItems\": [\n\t\t{\n\t\t\t\"productId\": \"12345\",\n\t\t\t\"quantity\": 1\n\t\t}\n\t]\n}"}] languages=["JSON"] /%}
