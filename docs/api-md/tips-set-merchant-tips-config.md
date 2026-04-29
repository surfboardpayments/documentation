# Set Merchant Tips Config

## Overview
Sets tips configurations for all the terminals registered to a specific merchant. Use this API to configure the same tips configurations across multiple terminals associated with a specific merchant.

## Prerequisites
- A valid merchant ID is required.
- Authentication is required using API Key and API Secret.
- Ensure you have the necessary permissions to modify merchant configurations.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/tips
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
None

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| tipConfig | string | No | Specifies how tips are managed during the payment. Possible values: `ENABLED`, `DISABLED`. `ENABLED` allows the terminal to display tip options while accepting payments. `DISABLED` disables the tip option, preventing the terminal from showing any tip prompts during payment. |
| tipLevel1 | number | No | Specifies the first preset percentage value for tips. The values should be set as whole numbers representing percentages, e.g., 10 for 10%.  This number represents a percentage of the total amount that can be chosen by the customer as a tip. It will be the first option displayed to customers. |
| tipLevel2 | number | No | Specifies the second preset percentage value for tips. The values should be set as whole numbers representing percentages, e.g., 20 for 20%. This number represents a percentage of the total amount that can be chosen by the customer as a tip. It will be the second option displayed to customers. |
| tipLevel3 | number | No | Specifies the third preset percentage value for tips. The values should be set as whole numbers representing percentages, e.g., 30 for 30%. This number represents a percentage of the total amount that can be chosen by the customer as a tip. It will be the third option displayed to customers. |
| defaultCustomAmount | number | No (Conditional) | A custom amount that will be prefilled on the screen for your ease. This is only available when `freeAmountEnabled` is set to `true` and tips enabled. |
| displayCalculatedAmount | string | No | Specifies whether or not to display calculated tip amount on screen. Possible values: `ENABLED`, `DISABLED`. |
| tipDisplayFormat | string | No | The format in which the tip is displayed. Possible values: `PERCENTAGE`, `AMOUNT`. |
| freeAmountEnabled | boolean | No | Set this to `true` to enable the option for entering a custom amount on the tips screen. |

### Request Example
```json
{
  "tipConfig": "ENABLED",
  "tipLevel1": 10,
  "tipLevel2": 20,
  "tipLevel3": 30,
  "defaultCustomAmount": 5,
  "displayCalculatedAmount": "ENABLED",
  "tipDisplayFormat": "PERCENTAGE",
  "freeAmountEnabled": true
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
  "message": "MERCHANT config updated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid tipConfig value. Must be ENABLED or DISABLED."
}
```
**Description:** The provided `tipConfig` value is not valid. Ensure it is either "ENABLED" or "DISABLED".

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or Secret provided in the headers is invalid. Verify your credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:** The specified merchant ID does not exist. Double-check the merchant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try again later or contact support.

## Notes
- When `freeAmountEnabled` is set to `true`, ensure you handle the case where the customer might not enter any custom amount.
- The preset tip levels (`tipLevel1`, `tipLevel2`, `tipLevel3`) should be valid percentage values (e.g., 10, 15, 20).
- If you enable calculated amounts, ensure the terminal software is compatible to display the calculated amounts.
- The merchant ID is path parameter, not a query parameter or part of the request body.
---
