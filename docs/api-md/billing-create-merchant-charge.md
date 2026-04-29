# Create Merchant Charge

## Overview
Creates a new charge for a merchant. Partners can specify the charge details.

## Prerequisites
- Valid Partner ID and Merchant ID are required in the URL path.
- Authentication is required using `API-KEY` and `API-SECRET` headers.
- The `MERCHANT-ID` header must be present and correspond to the targeted merchant.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants/:merchantId/charges
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| description | string | Yes | A brief description of the charge. |
| currency | string | Yes | Three-digit currency code. |
| amount | number | Yes | Charge amount in smallest currency units. |
| vat | number | No | Optional VAT amount. |
| billingDate | string | No | Date on which the charge is effective, in yyyy-mm-dd format. |
| recurring | object | No | If set, defines a recurring charge schedule including frequency and optional end date. |
| recurring.frequency | string | Yes (if recurring is present) | Specifies how frequently the charge will be billed. Possible values: daily, twiceWeekly, weekly, tenDays, fortNightly, monthly, everyTwoMonths, trimester, quarterly, twiceYearly, annually. |
| recurring.billingEndDate | string | No | Date in yyyy-mm-dd format specifying when to stop recurring charges. |

### Request Example
```json
{
  "description": "Fee",
  "currency": "752",
  "amount": 5000000,
  "vat": 35,
  "billingDate": "2025-02-11",
  "recurring": {
    "billingEndDate": "2025-02-12",
    "frequency": "daily"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Indicates if the request was 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing information about the created charge. |
| data.chargeId | string | Unique identifier for the newly created charge. |
| message | string | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "chargeId": "82eb21dbb4bcf80c46"
  },
  "message": "Merchant charge created successfully"
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
**Description:** This error occurs when the request body contains invalid data, such as incorrect data types, missing required fields, or invalid date formats. Ensure all request parameters are valid and comply with the specified data types and formats. Check the error message for details on which parameter(s) are invalid.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Invalid API key or secret."
}
```
**Description:** This error occurs when the `API-KEY` or `API-SECRET` headers are missing or invalid. Ensure that the API key and secret are correctly set in the request headers.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Merchant not found."
}
```
**Description:** This error occurs when the `MERCHANT-ID` in the URL or request header is invalid or does not exist. Ensure you're using a valid Merchant ID.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates that an unexpected problem occurred on the server. If this occurs, retry the request after some time. If the problem persists, contact support.

## Notes
- The amount should be provided in the smallest currency unit (e.g., cents for USD, paisa for INR).
- When using the `recurring` object, the `frequency` field is mandatory.
- The `billingDate` defaults to the current date if not specified.
- `billingEndDate` should be after `billingDate`.

---
