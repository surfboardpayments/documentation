# Fetch Billing Plans

## Overview
Retrieves all billing plans associated with a partner. Returns detailed information about each plan including pricing structures for different transaction types. Supports pagination through page number headers.

## Prerequisites
- Partner ID is required.
- Authentication is required via API Key and API Secret.
- No specific setup or configuration is required.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/billing-plans
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| x-page-number | Page Number (e.g., 1) | Yes |

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
    "API-SECRET": "YOUR_API_SECRET",
    "x-page-number": "1"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of billing plan objects. |
| data.billingPlanId | string | Unique identifier for the billing plan. |
| data.cardBrand | string | Card brand for which this plan applies (e.g., VISA_MC). |
| data.terminalType | string | Type of terminal for which this plan applies (e.g., STANDARD). |
| data.paymentMethod | string | Payment method for which this plan applies (e.g., CARD). |
| data.planType | string | Type of billing plan (FIXED or VARIABLE). |
| data.description | string | Description of the billing plan. |
| data.domesticDebitNonCommercial | number | Percentage rate for domestic debit non-commercial transactions. |
| data.domesticCreditNonCommercial | number | Percentage rate for domestic credit non-commercial transactions. |
| data.domesticDebitCommercial | number | Percentage rate for domestic debit commercial transactions. |
| data.domesticCreditCommercial | number | Percentage rate for domestic credit commercial transactions. |
| data.eeaDebitNonCommercial | number | Percentage rate for EEA debit non-commercial transactions. |
| data.eeaCreditNonCommercial | number | Percentage rate for EEA credit non-commercial transactions. |
| data.eeaDebitCommercial | number | Percentage rate for EEA debit commercial transactions. |
| data.eeaCreditCommercial | number | Percentage rate for EEA credit commercial transactions. |
| data.internationalDebitNonCommercial | number | Percentage rate for international debit non-commercial transactions. |
| data.internationalCreditNonCommercial | number | Percentage rate for international credit non-commercial transactions. |
| data.internationalDebitCommercial | number | Percentage rate for international debit commercial transactions. |
| data.internationalCreditCommercial | number | Percentage rate for international credit commercial transactions. |
| data.minimumCeiling | number | Minimum ceiling amount for transactions. |
| data.fixedCost | number | Fixed cost amount per transaction. |
| data.fixedPercentage | number | Fixed percentage rate applied to transactions. |
| data.vatPercentage | number | VAT percentage applied to the billing plan. |
| message | string | A message describing the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "billingPlanId": "ANCN_POS_PREMIUM_PLUS",
      "cardBrand": "VISA_MC",
      "terminalType": "STANDARD",
      "paymentMethod": "CARD",
      "planType": "VARIABLE",
      "description": "Billing Plan Description",
      "domesticDebitNonCommercial": 0.49,
      "domesticCreditNonCommercial": 0.59,
      "domesticDebitCommercial": 1.95,
      "domesticCreditCommercial": 1.95,
      "eeaDebitNonCommercial": 0.49,
      "eeaCreditNonCommercial": 0.59,
      "eeaDebitCommercial": 1.95,
      "eeaCreditCommercial": 1.95,
      "internationalDebitNonCommercial": 1.95,
      "internationalCreditNonCommercial": 1.95,
      "internationalDebitCommercial": 1.95,
      "internationalCreditCommercial": 1.95,
      "minimumCeiling": 0,
      "fixedCost": 0.12,
      "fixedPercentage": 0,
      "vatPercentage": 0
    },
    {
      "billingPlanId": "P_DKKVK_V149M000F000",
      "cardBrand": "VISA_MC",
      "terminalType": "STANDARD",
      "paymentMethod": "CARD",
      "planType": "FIXED",
      "description": "Billing Plan Description",
      "domesticDebitNonCommercial": 1.49,
      "domesticCreditNonCommercial": 1.49,
      "domesticDebitCommercial": 1.49,
      "domesticCreditCommercial": 1.49,
      "eeaDebitNonCommercial": 1.49,
      "eeaCreditNonCommercial": 1.49,
      "eeaDebitCommercial": 1.49,
      "eeaCreditCommercial": 1.49,
      "internationalDebitNonCommercial": 1.49,
      "internationalCreditNonCommercial": 1.49,
      "internationalDebitCommercial": 1.49,
      "internationalCreditCommercial": 1.49,
      "minimumCeiling": 0,
      "fixedCost": 0,
      "fixedPercentage": 0,
      "vatPercentage": 0
    }
  ],
  "message": "Partner billing plans fetched successfully"
}
```

## Error Responses

### Possible Errors
*Error responses will vary depending on the specific implementation. Examples are provided below*

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters"
}
```
**Description:**  The request parameters are invalid. Check the parameters and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API Key or Secret"
}
```
**Description:** The API Key or Secret is invalid. Ensure you are using the correct credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner not found"
}
```
**Description:**  The specified partner ID does not exist. Verify the partner ID and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal Server Error"
}
```
**Description:** An unexpected error occurred on the server. Contact support.

## Notes
- This endpoint supports pagination using the `x-page-number` header. Ensure to include the header to iterate through all billing plans.
- The partner ID should be a valid UUID.
- The `API-KEY` and `API-SECRET` are essential for authenticating the request. Replace `YOUR_API_KEY` and `YOUR_API_SECRET` with your actual credentials.
---
