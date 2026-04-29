# Fetch Merchant Charge by ID

## Overview
Retrieves detailed information about a specific merchant charge, including subscription details, amount, VAT, frequency, and any associated sub-charges.

## Prerequisites
- Partner must be authenticated to access the Merchant Charges API.
- Valid `partnerId`, `merchantId`, and `chargeId` are required.
- Authentication requires a valid `API-KEY` and `API-SECRET` in the request headers.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/charges/:chargeId
```

### Headers
| Header | Value | Required |
|---|---|---|
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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | object | Response data containing details of the requested merchant charge |
| data.isSubscriptionCharge | boolean | Specifies if this charge is subscription-based (recurring). |
| data.description | string | A short description of the charge. |
| data.amount | number | Charge amount in smallest currency units. |
| data.vat | number | The VAT amount applied to this charge. |
| data.frequency | string | Specifies how frequently the charge will be billed. Possible values: daily, twiceWeekly, weekly, tenDays, fortNightly, monthly, everyTwoMonths, trimester, quarterly, twiceYearly, annually, unscheduled |
| data.billingStartDate | string | Start date of the recurring charge in ISO 8601 format. |
| data.billingEndDate | string | End date of the recurring charge in ISO 8601 format. |
| data.subCharges | array | Array of sub-charges associated with this main charge. |
| data.subCharges[].chargeId | string | Unique identifier for this sub-charge. |
| data.subCharges[].description | string | A short text describing the sub-charge. |
| data.subCharges[].amount | number | Charge amount in smallest currency units |
| data.subCharges[].vat | number | VAT amount for this sub-charge. |
| data.subCharges[].status | string | Current status of the sub-charge. |
| data.subCharges[].billingDate | string | Date when this sub-charge was billed, in ISO 8601 format. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
	  "chargeId":"82eb21dbb4bcf80c46",
		"isSubscriptionCharge": true,
		"description": "Fee",
		"amount": 5000000,
		"vat": 35,
		"frequency": "daily",
		"billingStartDate": "2025-02-18T00:00:00.000Z",
		"billingEndDate": "2025-02-20T00:00:00.000Z",
		"subCharges": [
			{
				"subChargeId": "82f1a47a1f97000446",
				"type": "PARTNER_FEE",
				"description": "Fee",
				"amount": 650000,
				"vat": 15,
				"status": "PENDING",
				"billingDate": "2025-02-18T00:00:00.000Z"
			}
		]
	},
	"message": "Merchant charge fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters"
}
```
**Description:** This error occurs when the request parameters are invalid. Check the request parameters and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** This error occurs when the API key or secret is invalid. Ensure your API key and secret are correct and properly configured.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant charge not found"
}
```
**Description:** This error occurs when the specified merchant charge could not be found. Verify that the charge ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** This error occurs when there is a server-side issue. Try again later. If the problem persists, contact support.

## Notes
- Ensure the `partnerId`, `merchantId`, and `chargeId` are valid and correspond to an existing merchant and charge within your system.
- The `amount` and `vat` values are in the smallest currency unit (e.g., cents for USD, pence for GBP).
- The date format for `billingStartDate`, `billingEndDate`, and `billingDate` follows the ISO 8601 standard (e.g., "2025-02-18T00:00:00.000Z").
---
