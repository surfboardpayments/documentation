## Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.
- **`terminalId`** :Id of the terminal that should be returned.

Terminals can be returned using [**Create Return Request API**](https://developers.surfboardpayments.com/api/logistics#Create-Return-Request). To do so,

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n    \"email\": \"an@surfboard.se\",\n    \"phoneNumber\": {\n\t\t\t\"code\": 91,\n\t\t\t\"number\":\"00000000\"\n\t\t},\n\t  \"terminalId\":\"816a0ff6bc0fb00404\",\n\t\t\"name\": \"John Doe\",\n\t\t\"address\": {\n\t\t\t\"addressLine1\": \"Main Street 123\",\n\t\t\t\"addressLine2\": \"Building C\",\n\t\t\t\"addressLine3\": null,\n\t\t\t\"city\": \"Stockholm\",\n\t\t\t\"countryCode\": \"SE\",\n\t\t\t\"postalCode\": \"123 45\"\n\t\t},\n    \"deliveryInstruction\": \"Go left after the elevator\",\n    \"comment\": \"Stopped\",\n    \"reasonForReturn\": \"NOT_USING_SERVICE\"\n}"}] languages=["JSON"] /%}