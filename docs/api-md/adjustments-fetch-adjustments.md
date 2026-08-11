# Fetch Adjustments

## Overview
Fetch all adjustments created under a merchant or store. The `:id` in the URL supports both Merchant ID and Store ID. To fetch adjustments made under a certain date range, use `startDate` and `endDate` as query parameters.

## Prerequisites
- Valid API Key and Secret are required for authentication.
- Merchant ID is required for identifying the merchant.
- Ensure the specified Merchant ID or Store ID exists.

## Request

### HTTP Method and URL
```
GET /adjustments/:id
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| startDate | string | Yes | Start date of the range in yyyy-mm-dd format. |
| endDate | string | Yes | End date of the range in yyyy-mm-dd format. |

### Request Example
```json
{
  "startDate": "2023-01-01",
  "endDate": "2023-01-31"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Response data containing adjustment information. |
| data.adjustmentId | String | Adjustment ID of the adjustment. |
| data.adjustmentType | String | Type of the adjustment. |
| data.amount | String | Amount of the adjustment. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"adjustmentId": "81efdbe975ebc800ff",
			"adjustmentType": "tips",
			"amount": "100"
		}
	],
	"message": "Adjustments fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Invalid Date Format
```json
{
	"status": "ERROR",
	"message": "Invalid date format"
}
```
**Description:** The `startDate` or `endDate` provided is not in the `yyyy-mm-dd` format. Ensure the date format is correct.

#### 401 - Authentication Failed
```json
{
	"status": "ERROR",
	"message": "Authentication failed"
}
```
**Description:** The API Key, API Secret or Merchant ID provided is incorrect or missing. Verify your authentication credentials.

#### 404 - No Adjustments Found
```json
{
	"status": "ERROR",
	"message": "No adjustments found"
}
```
**Description:** No adjustments were found for the specified Merchant ID/Store ID and date range. Check the provided IDs and date range for accuracy.

## Notes
This endpoint supports pagination.
The `:id` parameter in the URL accepts both Merchant ID and Store ID.

---
