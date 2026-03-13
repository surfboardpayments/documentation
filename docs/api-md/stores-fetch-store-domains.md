# Fetch Store Domains

## Overview
This API retrieves the details of the store's domain.

## Prerequisites
- An active partner account.
- An onboarded merchant with a store created.
- Authentication via API Key and Secret.
- The partner ID, merchant ID, and store ID are required to construct the URL.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/online
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

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
        "MERCHANT-ID": "YOUR_MERCHANT_ID"
    }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request. |
| `data` | object | Response data. |
| `data.onlineStoreStatus` | string | Status of the online store. Possible values: `APPROVED`, `INITIATED`, `FAILED`. |
| `data.domains` | array | Contains the domain details. |
| `data.domains[].status` | string | The current status of the domain. Possible values: `ACTIVE`, `DEACTIVATED`. |
| `data.domains[].type` | string | Refers to the type of the domain. Possible values: `MERCHANT_WEBSHOP_URL`, `PAYMENT_PAGE_HOST_URL`. |
| `data.domains[].name` | string | Name of the domain. |
| `data.domains[].verificationKey` | string | This is the key set in your domain which is used for verification. |
| `data.domains[].isDomainVerified` | boolean | Indicates whether the domain has been verified. |
| `message` | string | Message describing the status of domain verification of store. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "onlineStoreStatus": "APPROVED",
    "domains": [
      {
        "status": "ACTIVE",
        "type": "PAYMENT_PAGE_HOST_URL",
        "name": "www.surfpayapp.com",
        "verificationKey": "7fd242dd862a9f9f74ae11d62216f5729a5e5600e00b8d44300db41b4efcce68",
        "isDomainVerified": true
      },
      {
        "status": "ACTIVE",
        "type": "MERCHANT_WEBSHOP_URL",
        "name": "test.surfboard.se",
        "verificationKey": "7fd242dd862a9f9f74ae11d62216f5729a5e5600e00b8d44300db41b4efcce68",
        "isDomainVerified": true
      }
    ]
  },
  "message": "Online store domain details fetched successfully."
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
**Description:** This error occurs when the request parameters are invalid or missing. Ensure that the `partnerId`, `merchantId`, and `storeId` are valid and present in the URL.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** This error occurs when the API Key or Secret provided in the request headers are invalid. Double-check your API credentials and ensure they are correctly configured.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** This error occurs when the specified store ID does not exist or is not associated with the provided merchant ID. Verify that the store ID is correct and belongs to the merchant.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a server-side issue. If this error persists, contact support and provide the request details for further investigation.

## Notes
- The `verificationKey` is crucial for domain verification. It must be correctly set in your domain's DNS records.
- The `onlineStoreStatus` reflects the overall verification status of the online store, while the `domains[].status` indicates the status of individual domains.
- Ensure your API Key and Secret are securely managed.
---
