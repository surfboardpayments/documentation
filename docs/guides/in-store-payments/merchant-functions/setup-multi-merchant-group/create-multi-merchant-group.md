You can create a multi-merchant group using the **Create Multi-Merchant Group API**. This API creates an application that allows multiple merchants to use the same terminal in a single location.

### **Prerequisites**

- API Credentials.
- Merchant’s **`country`** and **`organisation`** with the **`corporateId`** (organisation ID) are required for application creation.

Here is the request body for the API

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n\t\"country\": \"SE\",\n\t\"zipCode\": \"11121\"\n}"}] languages=["JSON"] /%}