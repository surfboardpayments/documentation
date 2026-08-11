### Prerequisites

- API Credentials.
- Requires `serialNo` of merchant's physical terminal.

Create a `Post` request with the serialNo of the terminal which is to be activated

**Here is an example call**

{% requestresponse method="POST" requests=[{language: "JSON", code: "{\n  \"serialNo\": \"1234567898\"\n}"}] languages=["JSON"] /%}