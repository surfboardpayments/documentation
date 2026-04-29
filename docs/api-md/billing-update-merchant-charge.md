# Update Merchant Charge

## Overview
Updates an existing charge for a merchant. Partners can modify the amount, VAT, and optionally adjust the recurring settings.

## Prerequisites
- A valid Partner ID.
- A valid Merchant ID.
- A valid Charge ID for the merchant.
- API Key and Secret for authentication.
- The partner must be authenticated to access this endpoint.
- The merchant must exist.
- The charge must exist and belong to the specified merchant.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId/charges/:chargeId
```

### Headers
| Header        | Value             | Required |
|---------------|-------------------|----------|
| Content-Type  | application/json  | Yes      |
| API-KEY       | YOUR_API_KEY      | Yes      |
| API-SECRET    | YOUR_API_SECRET   | Yes      |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes      |

### Request Body Parameters
| Parameter | Type   | Required | Description                                                                                                                            |
|-----------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------|
| amount    | number | Yes      | Updated amount in minor currency units.                                                                                                 |
| vat       | number | No       | Optional updated VAT amount.                                                                                                           |
| recurring | object | No       | Updated recurring schedule. Billing end date and updateType can be specified here.                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;updateType | string | Yes, if `recurring` is present      | Indicates the type of the update.                                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Possible Values: `onlyNext`, `lifeTime`, `current`                                                                                                                                         |
| &nbsp;&nbsp;&nbsp;&nbsp;billingEndDate | string | No, if `recurring` is present       | Date in yyyy-mm-dd format specifying the new end date for the recurring charge.                                                      |

### Request Example
```json
{
  "amount": 650000,
  "vat": 15,
  "recurring": {
    "updateType": "onlyNext",
    "billingEndDate": "2025-10-23"
  }
}
```

## Response

### Response Parameters
| Parameter | Type   | Description                                         |
|-----------|--------|-----------------------------------------------------|
| status    | string | Indicates if the request was 'SUCCESS' or 'ERROR'. |
| message   | string | A message describing the outcome of the request.    |
| data      | object | Contains chargeId after successful update          |
| &nbsp;&nbsp;&nbsp;&nbsp;chargeId | string | The charge id that was updated                                               |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "chargeId": "82ed1af7b38e080146"
  },
  "message": "Merchant charge updated successfully"
}
```

## Error Responses

### Possible Errors
*(There is no error documentation in the source JSON, so this section is left intentionally generic.)*

#### Generic Error
```json
{
 "status": "ERROR",
 "message": "Error message describing the issue."
}
```

**Description:** This is a placeholder error response. Specific error codes and responses will vary depending on the nature of the problem.

## Notes
- The `amount` should be specified in minor currency units (e.g., cents instead of dollars).
- Ensure the `billingEndDate` is in the correct `yyyy-mm-dd` format.
- The `updateType` within the `recurring` object is mandatory if you include `recurring` in the request body.
- It is highly recommended to validate input data before sending the request to avoid errors.

---
