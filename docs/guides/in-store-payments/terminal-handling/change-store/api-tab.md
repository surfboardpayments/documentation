## **Prerequisites**

- API Credentials.
- **`terminalId`** of the terminal being moved to another store.
- **`storeId`** of the store where the terminal will be registered.

Send a `POST` request to the [**Change Store API**](https://developers.surfboardpayments.com/api/terminals#Change-Store) providing both the `terminalId` and the `storeId` to reassign the terminal under the same merchant, as follows

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"terminal$id\": \"c_Ou8mzoVQVn6dS4hvNtKH2\",\n  \"storeId\": \"st_GZVDbwmS86_G9pwc669U2\"\n}"}] languages=["JSON"] /%}