# Check Application Status

## Overview
Retrieves the status of the merchant onboarding. After initiating the onboarding for the sub-merchant, use the Check Application Status API to get updates regarding the application’s progress. After the merchant is created, the Merchant ID and Store ID are also available through the webhook.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `applicationId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:applicationId/status
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `applicationId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/merchants/:applicationId/status
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationId` | `string` | The Application ID of the respective merchant returned by the Create Merchant API. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webKybUrl` | `string` | This is the link for the KYC session created for the merchant, which can be fetched for applications in state 'APPLICATION_INITIATED' or 'APPLICATION_PENDING_INFORMATION'. This URL will be returned for ISV(Independent Software Vendors) partners only. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationStatus` | `string` | Describes the status of the application. Possible values: `APPLICATION_INITIATED`, `APPLICATION_STARTED`, `APPLICATION_SUBMITTED`, `APPLICATION_PENDING_INFORMATION`, `APPLICATION_SIGNED`, `APPLICATION_REJECTED`, `APPLICATION_COMPLETED`, `APPLICATION_EXPIRED`, `MERCHANT_CREATED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Merchant ID of the created merchant is returned when application status is 'MERCHANT_CREATED' |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Store ID of the store created under the merchant is returned when application status is 'MERCHANT_CREATED' |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingPlans` | `array` | Array of billing plans associated with the merchant application. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | Unique identifier of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Card brand the billing plan applies to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalType` | `string` | Terminal type the billing plan applies to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Payment method the billing plan applies to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`planType` | `string` | Type of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Human-readable description of the billing plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;`onlineOnboardingStatus` | `string` | Status of the online onboarding process for the merchant. Can be null if not applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethods` | `array` | Array of payment methods configured for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Name of the payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Status of the payment method for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`domainVerification` | `array` | Domain verification details for the merchant's online store. Empty when domain verification is not applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`domainName` | `string` | Domain name being verified for the merchant's online store. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`domainStatus` | `string` | Verification status of the domain. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`domainVerificationKey` | `string` | Key the merchant uses to verify ownership of the domain. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`verifyDomainType` | `string` | Type of domain verification being performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isDomainVerified` | `boolean` | Indicates whether the domain has been verified. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`verificationMethod` | `string` | Method used to verify the domain. |
| `message` | `string` | A message that describes the status of the request. |

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
    "onlineOnboardingStatus": "PENDING_VERIFICATION",
    "billingPlans": [
      {
        "id": "81412e3c3b1090060f",
        "cardBrand": "VISA",
        "terminalType": "sb_terminal_c",
        "paymentMethod": "CARD",
        "planType": "TRANSACTION",
        "description": "Standard Transaction Plan"
      }
    ],
    "paymentMethods": [
      {
        "paymentMethod": "CARD",
        "status": "ACTIVE"
      },
      {
        "paymentMethod": "SWISH",
        "status": "ACTIVE"
      }
    ],
    "domainVerification": [
      {
        "domainName": "shop.example.se",
        "domainStatus": "VERIFIED",
        "domainVerificationKey": "sb-verify-81412e3c3b",
        "verifyDomainType": "DNS",
        "isDomainVerified": true,
        "verificationMethod": "TXT_RECORD"
      }
    ]
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
  "message": "Invalid request parameters."
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

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
- The `applicationId` is part of the URL path and must be a valid identifier.

---
