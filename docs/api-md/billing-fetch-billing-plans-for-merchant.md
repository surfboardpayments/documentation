# Fetch Billing Plans for Merchant

## Overview
Retrieves billing plans specifically assigned to a merchant under a partner. This endpoint returns the billing plans that are applicable to the specified merchant.

## Prerequisites
- Partner account and API credentials (API-KEY and API-SECRET) are required.
- Merchant must be associated with the partner.
- Authentication is performed using the `API-KEY` and `API-SECRET` in the headers.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/plans
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of billing plan objects assigned to the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;billingPlanId | string | Unique identifier for the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;cardBrand | string | Card brand for which this plan applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;terminalType | string | Type of terminal for which this plan applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;paymentMethod | string | Payment method for which this plan applies. |
| &nbsp;&nbsp;&nbsp;&nbsp;planType | string | Type of billing plan (FIXED or VARIABLE). |
| &nbsp;&nbsp;&nbsp;&nbsp;description | string | Description of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;domesticDebitNonCommercial | number | Percentage rate for domestic debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;domesticCreditNonCommercial | number | Percentage rate for domestic credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;domesticDebitCommercial | number | Percentage rate for domestic debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;domesticCreditCommercial | number | Percentage rate for domestic credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;eeaDebitNonCommercial | number | Percentage rate for EEA debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;eeaCreditNonCommercial | number | Percentage rate for EEA credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;eeaDebitCommercial | number | Percentage rate for EEA debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;eeaCreditCommercial | number | Percentage rate for EEA credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;internationalDebitNonCommercial | number | Percentage rate for international debit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;internationalCreditNonCommercial | number | Percentage rate for international credit non-commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;internationalDebitCommercial | number | Percentage rate for international debit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;internationalCreditCommercial | number | Percentage rate for international credit commercial transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;minimumCeiling | number | Minimum ceiling amount for transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;fixedCost | number | Fixed cost amount per transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;fixedPercentage | number | Fixed percentage rate applied to transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;vatPercentage | number | VAT percentage applied to the billing plan. |
| message | string | A message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "billingPlanId": "SP_SE_Fix119",
      "cardBrand": "VISA_MC",
      "terminalType": "STANDARD",
      "paymentMethod": "CARD",
      "planType": "FIXED",
      "description": "Billing Plan Description",
      "domesticDebitNonCommercial": 1.19,
      "domesticCreditNonCommercial": 1.19,
      "domesticDebitCommercial": 1.19,
      "domesticCreditCommercial": 1.19,
      "eeaDebitNonCommercial": 1.19,
      "eeaCreditNonCommercial": 1.19,
      "eeaDebitCommercial": 1.19,
      "eeaCreditCommercial": 1.19,
      "internationalDebitNonCommercial": 1.19,
      "internationalCreditNonCommercial": 1.19,
      "internationalDebitCommercial": 1.19,
      "internationalCreditCommercial": 1.19,
      "minimumCeiling": 0.99,
      "fixedCost": 0,
      "fixedPercentage": 0,
      "vatPercentage": 0
    }
  ],
  "message": "Billing plans for the merchant fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret"
}
```
**Description:** Occurs when the provided API Key or Secret are invalid or missing. Ensure that the `API-KEY` and `API-SECRET` headers are correctly set with valid credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found"
}
```
**Description:** Occurs when the specified merchant ID does not exist or is not associated with the partner. Verify the `merchantId` in the URL path is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal Server Error"
}
```
**Description:** An unexpected error occurred on the server. Contact support and provide the request details for investigation.

## Notes
- This endpoint does not support pagination.
- Ensure that the `partnerId` and `merchantId` parameters in the URL are valid and correspond to existing records.

---
