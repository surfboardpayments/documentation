# Create Billing Plans

## Overview
Creates new billing plans for a partner. Billing plans define pricing structures for different payment methods, card brands, and terminal types.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/billing-plans
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plans` | `array` | Yes | Array of billing plan objects to create. |
| &nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | Yes | Unique identifier for the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | No | Card brand this plan's rates apply to. Leave unset to apply the plan across all supported brands. Possible values: `AMEX`, `DISCOVER`, `MASTERCARD`, `VISA`, `VISA_MC`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Yes | The kind of terminal this plan prices. Possible values: `STANDARD`, `SOFTPOS`, `ONLINE`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Yes | The payment method this plan prices. Possible values: `ACCTOACC`, `B2BINV`, `CARD`, `DCC_INSTORE`, `EPASSI`, `KLARNA`, `MOBILEPAY`, `SWISH`, `VIPPS`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`planType` | `string` | Yes | How this plan prices transactions. Possible values: `FIXED`, `VARIABLE`, `IC++`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Yes | Description of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticDebitNonCommercial` | `number` | No | Percentage rate for domestic debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticCreditNonCommercial` | `number` | No | Percentage rate for domestic credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticDebitCommercial` | `number` | No | Percentage rate for domestic debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domesticCreditCommercial` | `number` | No | Percentage rate for domestic credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaDebitNonCommercial` | `number` | No | Percentage rate for EEA debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaCreditNonCommercial` | `number` | No | Percentage rate for EEA credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaDebitCommercial` | `number` | No | Percentage rate for EEA debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`eeaCreditCommercial` | `number` | No | Percentage rate for EEA credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalDebitNonCommercial` | `number` | No | Percentage rate for international debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalCreditNonCommercial` | `number` | No | Percentage rate for international credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalDebitCommercial` | `number` | No | Percentage rate for international debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`internationalCreditCommercial` | `number` | No | Percentage rate for international credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`minimumCeiling` | `number` | No | Minimum ceiling amount for transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fixedCost` | `number` | No | Fixed cost amount per transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | `number` | No | Fixed percentage rate applied to transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`vatPercentage` | `number` | No | VAT percentage applied to the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardTypeFees` | `object` | No | Per-card-type rate overrides, keyed by card type. Each override may set fixedPercentage (0-100), fixedCost (smallest currency unit), and minimumCeiling (smallest currency unit). Use this to price specific card types differently from the plan's default rates. |
| &nbsp;&nbsp;&nbsp;&nbsp;`binRangeFees` | `array` | No | Rate overrides that apply only to card BIN ranges, letting you price specific issuing ranges differently from the plan's default rates. |

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
| `status` | `string` | Indicates if the request was 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message describing the outcome of the request. |

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
  "message": "Unable to create billing plans"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- The `partnerId` is part of the URL path and must be a valid identifier.

---
