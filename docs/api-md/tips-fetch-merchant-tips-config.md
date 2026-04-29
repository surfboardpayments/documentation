# Fetch Merchant Tips Config

## Overview
Retrieves the tips configurations for all terminals registered to a specific merchant. Use this API to get all the tips configurations for all the terminals registered to a merchant.

## Prerequisites
- A valid `merchantId` is required in the URL path.
- You must have a valid API key and secret.
- Your account must be configured to use the Tips API.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/tips
```

### Headers
| Header        | Value              | Required |
|---------------|--------------------|----------|
| Content-Type  | application/json   | Yes      |
| API-KEY       | YOUR_API_KEY       | Yes      |
| API-SECRET    | YOUR_API_SECRET    | Yes      |
| MERCHANT-ID   | YOUR_MERCHANT_ID   | Yes      |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// This is a GET request, so there is no request body.
// The merchantId should be included in the URL path.
```

## Response

### Response Parameters
| Parameter              | Type    | Description                                                                                                                                               |
|------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| status                 | string  | Status of the request, indicated as either 'SUCCESS' or 'ERROR'.                                                                                           |
| data                   | object  | Response data.                                                                                                                                             |
| data.tipConfig         | string  | Specifies how tips are managed during the payment.                                                                                                         |
| &nbsp;&nbsp;&nbsp;&nbsp;Possible values:        |         |                                                                                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ENABLED   |         | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Allows the terminal to support tips while making payments.                                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DISABLED   |         | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Disables the tip option, preventing the terminal from showing any tip prompts during payment.                                                                     |
| data.tipLevel1         | number  | Specifies the first preset percentage value for tips (e.g., 10 for 10%).                                                                                     |
| data.tipLevel2         | number  | Specifies the second preset percentage value for tips (e.g., 20 for 20%).                                                                                    |
| data.tipLevel3         | number  | Specifies the third preset percentage value for tips (e.g., 30 for 30%).                                                                                     |
| data.defaultCustomAmount | number  | A custom amount that will be prefilled on the screen for your ease.                                                                                              |
| data.displayCalculatedAmount  | string | Specifies whether or not to display calculated tip amount on screen.                                                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;Possible values:        |         |                                                                                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ENABLED   |         | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To show calculated tip amount.                                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DISABLED   |         | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To disable display of calculated tip amount.                                                                     |
| data.tipDisplayFormat      | string | The format in which the tip is displayed.                                                                                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;Possible values:        |         |                                                                                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PERCENTAGE   |         | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Display as percentage.                                                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AMOUNT   |         | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Display as amount.                                                                     |
| message                | string  | A message that describes the status of the request.                                                                                                        |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"tipConfig": "ENABLED",
		"tipLevel1": 10,
		"tipLevel2": 20,
		"tipLevel3": 30,
		"displayCustomAmount": 2341,
		"displayCalculatedAmount": "ENABLED",
		"tipDisplayFormat": "AMOUNT"
	},
	"message": "merchant config queried successfully"
}
```

## Error Responses

### Possible Errors
*No error responses were provided in the original JSON.*

## Notes
- Ensure the `MERCHANT-ID` matches the `merchantId` in the URL path.
- The percentage values for `tipLevel1`, `tipLevel2`, and `tipLevel3` should be whole numbers.
- This endpoint retrieves the configuration settings; it does not create or modify them. Other APIs are needed for that purpose.

---
