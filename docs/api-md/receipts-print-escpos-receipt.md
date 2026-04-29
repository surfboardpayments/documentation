# Print ESCPOS Receipt

## Overview
This API helps you print receipts on the terminal through ECS/POS commands.

## Prerequisites
- A valid terminal ID.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.
- Ensure the terminal is properly configured to receive and process ESC/POS commands.

## Request

### HTTP Method and URL
```
PUT /receipts/:terminalId/escpos
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| escposCommands | string | Yes | A stream of ECS/POS commands in base64 format. |

### Request Example
```json
{
  "escposCommands":"G0AbYQEbRQFTdXBlciBNYXJ0CjEyMyBNYWluIFN0ChtFABthAERhdGU6IDIwMjQvMTAvMDgKVGltZTogMTI6MDAgUE0KG0UBLS0tLS0tLS0tLQobRQAbYQBJdGVtIEE6IFdhdGVyClByaWNlOiAkMS4wMApJdGVtIEI6IEJyZWFkClByaWNlOiAkMi4wMAobRQEtLS0tLS0tLS0tClRvdGFsOiAkMy4wMAobRQAbYQFUaGFuayB5b3UhCgoKHVYA"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | String | Status of the request. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "ESCPOS Receipt printed successfully."
}
```

## Error Responses

### Possible Errors
No specific error codes were given, but general errors like invalid API keys or malformed requests will return standard HTTP error codes (400, 401, 403, 500). You should implement the necessary error handling and reporting within your application based on these standard codes.

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request format."
}
```
**Description:** This error occurs when the request body is not valid JSON or missing required parameters. Ensure the `escposCommands` parameter is present and in the correct format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** This error occurs when the `API-KEY` or `API-SECRET` headers are incorrect or missing. Double-check your credentials and ensure they are properly set in the request headers.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Invalid Merchant ID"
}
```
**Description:** This error occurs when the `MERCHANT-ID` is incorrect or the API key is not authorized for the specific Merchant ID. Verify you are using the correct Merchant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a server-side issue. Check the server logs for more details and contact support if the problem persists.

## Notes
- The `terminalId` in the path should be replaced with the actual ID of the terminal.
- The `escposCommands` should be properly encoded in base64 format. Incorrect encoding can lead to printing errors or failures.
- It's recommended to test with small ESC/POS command sequences initially to verify the setup and configuration.
- Ensure your API keys and secrets are kept secure and are not exposed in client-side code.

---
