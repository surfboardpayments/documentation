# Check Application Status

## Overview
Retrieves the status of the merchant onboarding. After initiating the onboarding for the sub-merchant, use the Check Application Status API to get updates regarding the application’s progress. After the merchant is created, the Merchant ID and Store ID are also available through the webhook.

## Prerequisites
- A partner account with Surfboard
- An existing merchant application initiated through the Create Merchant API.
- Authentication using API Key and API Secret.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:applicationId/status
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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | object | Response data |
| data.applicationId | string | The Application ID of the respective merchant returned by the Create Merchant API. |
| data.webKybUrl | string | This is the link for the KYC session created for the merchant, which can be fetched for applications in state 'APPLICATION_INITIATED' or 'APPLICATION_PENDING_INFORMATION'. This URL will be returned for ISV(Independent Software Vendors) partners only. |
| data.applicationStatus | string | Describes the status of the application.  Possible values are described in the nested table below. |
| data.merchantId | string | Merchant ID of the created merchant is returned when application status is 'MERCHANT_CREATED' |
| data.storeId | string | Store ID of the store created under the merchant is returned when application status is 'MERCHANT_CREATED' |
| data.billingPlans | array | Array of billing plans associated with the merchant application. |
| data.onlineOnboardingStatus | string | Status of the online onboarding process for the merchant. Can be null if not applicable. |
| data.paymentMethods | array | Array of payment methods configured for the merchant. |
| data.acquirerOnboarding | object | Acquirer onboarding details for the merchant. Can be null if not applicable. |
| message | string | A message that describes the status of the request. |

#### Possible values for `data.applicationStatus`:

| Value | Description |
|---|---|
| APPLICATION_INITIATED | The application has been created, and the Web KYB URL has been generated. The merchant is now required to fill in necessary information through the Web KYB. |
| APPLICATION_STARTED | The merchant has started filling in the Web KYB form but has not yet submitted it. |
| APPLICATION_SUBMITTED | The merchant has finished filling in the Web KYB and submitted it for processing. |
| APPLICATION_PENDING_INFORMATION | The application is still under processing, and additional data is required from the merchant. |
| APPLICATION_SIGNED | Both the merchant signatories and UBOs have signed the application. |
| APPLICATION_REJECTED | The application has been processed and rejected. |
| APPLICATION_COMPLETED | The application has been processed and accepted. It is now pending merchant creation and onboarding. |
| APPLICATION_EXPIRED | Each application is valid for 30 days. If there is no action during these 30 days, the KYB is treated as session expired. |
| MERCHANT_CREATED | The merchant account has been created. At this stage, the Merchant ID and Store ID will be returned in the status call. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"applicationId": "81409507c1a5f00110",
		"webKybUrl": "http://partner.surfboardpayments.com/81409507c1a5f00110",
		"applicationStatus": "MERCHANT_CREATED",
		"merchantId": "81412e2e4102f80f0e",
		"storeId": "81412e3c3b1090060f",
		"billingPlans": [
			{
				"planId": "81412e3c3b1090060f",
				"planName": "Standard Transaction Plan"
			}
		],
		"onlineOnboardingStatus": "PENDING_VERIFICATION",
		"paymentMethods": [
			{
				"methodId": "81412e3c3b1090060f",
				"methodType": "CARD",
				"enabled": true
			},
			{
				"methodId": "81412e3c3b10900610",
				"methodType": "SWISH",
				"enabled": true
			}
		],
		"acquirerOnboarding": {
			"acquirerId": "81412e3c3b10900611",
			"status": "ACTIVE",
			"merchantId": "81412e2e4102f80f0e"
		}
	},
	"message": "Application status fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid Application ID"
}
```
**Description:** The provided Application ID is invalid or does not exist.  Ensure the Application ID is correct and corresponds to an existing application.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API Key or API Secret"
}
```
**Description:** The API Key or API Secret provided in the request headers is invalid.  Verify that the API Key and API Secret are correct and properly configured for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Partner not found"
}
```
**Description:** The specified Partner ID does not exist. Double-check that the provided Partner ID is correct.

## Notes
- The `webKybUrl` is only returned for ISV (Independent Software Vendors) partners and only for applications in the 'APPLICATION_INITIATED' or 'APPLICATION_PENDING_INFORMATION' states.
- The Merchant ID and Store ID are returned only when the application status is 'MERCHANT_CREATED'.
- Each application is valid for 30 days. If there is no action during these 30 days, the KYB is treated as session expired, and the status will be 'APPLICATION_EXPIRED'.

---
