```markdown
# Fetch All Multi-Merchant Groups

## Overview
Fetch all existing multi-merchants groups under a specific partner. This endpoint allows retrieval of multi-merchant group details associated with a particular partner ID.

## Prerequisites
- Partner ID is required to be passed in the URL path.
- API Key and API Secret are required for authentication.
- Content-Type must be set to application/json in the header.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/multi-merchants
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
  "Content-Type": "application/json",
  "API-KEY": "YOUR_API_KEY",
  "API-SECRET": "YOUR_API_SECRET"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | object | Response data containing an array of multi-merchant groups. |
| data.multiMerchantId | String | Multimerchant ID of the multi-merchant group. |
| data.multiMerchantName | String | Name of the multi-merchant group. |
| data.countryCode | String | Two-letter ISO country code in uppercase, representing the primary location of the multi-merchant group. |
| data.postalCode | string | Postal code of the multi-merchant. |
| data.merchants | array | List of merchants present under a multi-merchant group. |
| data.merchants.merchantId | String | Merchant ID of the merchant. |
| data.merchants.merchantName | String | Name of the merchant. |
| data.merchants.countryCode | String | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"multiMerchantId": "817544218dd838050e",
			"multiMerchantName": "Multi Merchant one",
			"countryCode": "SE",
			"postalCode": "12345",
			"merchants": [
				{
					"merchantId": "817544960dd838040e",
					"merchantName": "Test Merchant one",
					"countryCode": "SE"
				},
				{
					"merchantId": "8175449a8dd8380d0e",
					"merchantName": "Test Merchant two",
					"countryCode": "SE"
				}
			]
		},
		{
			"multiMerchantId": "81701e32ff5690020e",
			"multiMerchantName": "Multi Merchant two",
			"countryCode": "SE",
			"postalCode": "12346"
		}
	],
	"message": "Multi merchant groups fetched successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid partner ID format."
}
```
**Description:**  The partner ID provided in the URL is not in the correct format. Ensure the partner ID is a valid UUID or integer.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is incorrect or missing.  Verify that the API key and secret are correctly configured in the request headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner not found."
}
```
**Description:** The partner ID provided does not correspond to an existing partner.  Verify the partner ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server.  Retry the request later. If the problem persists, contact support.

## Notes
- This endpoint supports pagination.  Currently, pagination parameters are not explicitly exposed but may be implemented in future versions.
- Ensure the `partnerId` in the path is a valid identifier for your partner account.
- The `countryCode` values follow the ISO 3166-1 alpha-2 standard.
---
