# Create Billing Plans

## Overview
Creates new billing plans for a partner. Billing plans define pricing structures for different payment methods, card brands, and terminal types.

## Prerequisites
- Partner ID is required to construct the endpoint URL.
- Authentication via API Key and API Secret is required.
- Content-Type must be set to `application/json`.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/billing-plans
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plans` | array | Yes | Array of billing plan objects to create. |
| &nbsp;&nbsp;&nbsp;&nbsp;`id` | string | Yes | Unique identifier for the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | string | Yes | Card brand for which this plan applies (e.g., VISA, MASTERCARD, DISCOVER). |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | string | Yes | Type of terminal for which this plan applies (e.g., STANDARD). |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | string | Yes | Payment method for which this plan applies (e.g., CARD). |
| &nbsp;&nbsp;&nbsp;&nbsp;`planType` | string | Yes | Type of billing plan. Possible values: `FIXED`, `VARIABLE`.  `FIXED`: Fixed percentage or amount pricing. `VARIABLE`: Variable pricing based on transaction type. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | string | Yes | Description of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticDebitNonCommercial` | number | No | Percentage rate for domestic debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticCreditNonCommercial` | number | No | Percentage rate for domestic credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticDebitCommercial` | number | No | Percentage rate for domestic debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticCreditCommercial` | number | No | Percentage rate for domestic credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaDebitNonCommercial` | number | No | Percentage rate for EEA debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaCreditNonCommercial` | number | No | Percentage rate for EEA credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaDebitCommercial` | number | No | Percentage rate for EEA debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaCreditCommercial` | number | No | Percentage rate for EEA credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalDebitNonCommercial` | number | No | Percentage rate for international debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalCreditNonCommercial` | number | No | Percentage rate for international credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalDebitCommercial` | number | No | Percentage rate for international debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalCreditCommercial` | number | No | Percentage rate for international credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`minimumCeiling` | number | No | Minimum ceiling amount for transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fixedCost` | number | No | Fixed cost amount per transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | Fixed percentage rate applied to transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`vatPercentage` | number | No | VAT percentage applied to the billing plan. |

### Request Example
```json
{
  "plans": [
    {
      "id": "SP_NOK7",
      "paymentMethod": "CARD",
      "cardBrand": "DISCOVER",
      "terminalType": "STANDARD",
      "planType": "FIXED",
      "description": "Testing 2024",
      "fixedPercentage": 13.4
    }
  ]
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Indicates if the request was 'SUCCESS' or 'ERROR'. |
| `message` | string | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Billing plans created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid input data."
}
```
**Description:** The request body contains invalid data or is missing required fields. Check the request body and ensure all required fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is invalid. Verify your API key and secret are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred on the server. Contact support and provide the request details.

## Notes
- The `partnerId` path parameter is dynamic and should be replaced with the actual partner ID when making the request.
- Ensure that the `id` field for each billing plan is unique within the partner's billing plans.
- The rates are inputted as decimals not percentages (e.g. 0.1 for 10%)

---
