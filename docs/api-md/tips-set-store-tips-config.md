# Set Store Tips Config

## Overview
Sets tips configurations for all the terminals registered to a specific store. Use this API to configure the same tips configurations across multiple terminals associated with a specific store.

## Prerequisites
- A valid merchant account.
- API Key and Secret for authentication.
- Store ID for which to set the tips configuration.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/stores/:storeId/tips
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| tipConfig | string | No | Specifies how tips are managed during the payment. Possible values: `ENABLED`, `DISABLED`.  `ENABLED`: Allows the terminal to display tip options while accepting payments.  `DISABLED`: Disables the tip option, preventing the terminal from showing any tip prompts during payment. |
| tipLevel1 | number | No | Specifies the first preset percentage value for tips (e.g., 10 for 10%). |
| tipLevel2 | number | No | Specifies the second preset percentage value for tips (e.g., 20 for 20%). |
| tipLevel3 | number | No | Specifies the third preset percentage value for tips (e.g., 30 for 30%). |
| defaultCustomAmount | number | No | A custom amount that will be prefilled on the screen for your ease. This is only available when `freeAmountEnabled` is set to `true` and tips are enabled. |
| displayCalculatedAmount | string | No | Specifies whether or not to display calculated tip amount on screen. Possible values: `ENABLED`, `DISABLED`. `ENABLED`: To show calculated tip amount. `DISABLED`: To disable display of calculated tip amount. |
| tipDisplayFormat | string | No | The format in which the tip is displayed. Possible values: `PERCENTAGE`, `AMOUNT`. `PERCENTAGE`: Display as percentage. `AMOUNT`: Display as amount. |
| freeAmountEnabled | boolean | No | Set this to `true` to enable the option for entering a custom amount on the tips screen. |

### Request Example
```json
{
  "tipConfig": "ENABLED",
  "tipLevel1": 10,
  "tipLevel2": 20,
  "tipLevel3": 30
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "STORE config updated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** Occurs when the request body contains invalid or missing parameters.  Check the request body against the schema and ensure all required fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** Occurs when the provided API key or secret is invalid.  Verify that the `API-KEY` and `API-SECRET` headers are correctly set with valid credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** Occurs when the specified store ID does not exist.  Verify that the `storeId` path parameter is a valid store ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** Occurs when there is a server-side error.  Retry the request after some time. If the issue persists, contact support.

## Notes
- The `tipLevel` parameters are percentages and should be provided as whole numbers (e.g., 10 for 10%).
- Ensure that the merchant ID in the path matches the `MERCHANT-ID` header.
- When enabling custom amounts, consider setting a `defaultCustomAmount` to provide a suggestion to the customer.

---
