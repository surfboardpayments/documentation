# Set Terminal Tips Config

## Overview
Sets tips configuration for an individual terminal. Use this API to configure tips for a particular terminal.

## Prerequisites
- A valid Merchant ID, Store ID, and Terminal ID.
- API Key and API Secret for authentication.
- The terminal must be properly configured and connected to the network.

## Request

### HTTP Method and URL
```
PATCH /merchants/merchantId/stores/storeId/terminals/:terminalId/tips
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
| tipConfig | string | No | Specifies how tips are managed during the payment. Possible values: `ENABLED`, `DISABLED`.  `ENABLED`: Allows the terminal to display tip options while accepting payments. `DISABLED`: Disables the tip option, preventing the terminal from showing any tip prompts during payment. |
| tipLevel1 | number | No | Specifies the first preset percentage value for tips. The values should be set as whole numbers representing percentages, e.g., 10 for 10%. This number represents a percentage of the total amount that can be chosen by the customer as a tip. It will be the first option displayed to customers. |
| tipLevel2 | number | No | Specifies the second preset percentage value for tips. The values should be set as whole numbers representing percentages, e.g., 20 for 20%. This number represents a percentage of the total amount that can be chosen by the customer as a tip. It will be the second option displayed to customers. |
| tipLevel3 | number | No | Specifies the third preset percentage value for tips. The values should be set as whole numbers representing percentages, e.g., 30 for 30%. This number represents a percentage of the total amount that can be chosen by the customer as a tip. It will be the third option displayed to customers. |
| defaultCustomAmount | number | No (Conditional) | A custom amount that will be prefilled on the screen. This is only available when `freeAmountEnabled` is set to `true` and tips enabled. |
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
	"message": "TERMINAL config updated successfully"
}
```

## Error Responses

### Possible Errors

####  - Error Name
```json
{}
```
**Description:** No error responses provided in the documentation.

## Notes
- Ensure that the Merchant ID, Store ID, and Terminal ID are correct and correspond to the terminal you are trying to configure.
- `tipLevel1`, `tipLevel2`, and `tipLevel3` should be mutually exclusive. You can set only one, some, or all of them. If none is provided the system will choose the default ones.

---
