## **Prerequisites**

- API Credentials.
- **`terminalId`** of the registered terminal to be renamed.

Send a `PUT` request to the [**Update terminal name API**](https://developers.surfboardpayments.com/api/terminals#Update-Terminal-Name), providing the `terminalId` and the new name, as follows

{% requestresponse method="PUT" requests=[{language: "JSON", code: "{\n\"terminalName\": \"New Terminal\"\n}"}] languages=["JSON"] /%}