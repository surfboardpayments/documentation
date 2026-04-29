# Create Service Provider

## Overview
This API allows partners to create a new service provider application with company information and control fields.

## Prerequisites
- Partner account must be created and active.
- API key, API secret, and merchant ID are required for authentication.
- The partner ID must be available.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/service-providers
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| country | string | Yes | Two-letter ISO country code where the service provider operates. |
| organisation | object | Yes | Organization details for the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp; corporateId | string | Yes | Corporate identification number of the organization. |
| controlFields | object | Yes | Control fields for service provider configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp; isServiceProvider | boolean | Yes | Flag indicating whether this entity is a service provider. |

### Request Example
```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "3532007322"
  },
  "controlFields": {
    "isServiceProvider": true
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing the application details. |
| &nbsp;&nbsp;&nbsp;&nbsp; applicationId | string | Unique identifier for the created service provider application. |
| &nbsp;&nbsp;&nbsp;&nbsp; webKybUrl | string | URL for the web-based KYB (Know Your Business) process. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "838ca3a7c530200810",
    "webKybUrl": "https://web-kyb-dev.web.app/838ca3a7c530200810?pi=QGv2Kgu9q0WAdg6FjkK0iEliyh8l61yxIXnaf0M70l4psKXW_6KihWL4wcY2aL0NfI5aM69J7bYUisZ8ecrFTNMrj4KU1ZjrN5Q3O9hcqlEgc6oQACb2eLM7SwwP0006"
  },
  "message": "Merchant application created successfully."
}
```

## Error Responses

### Possible Errors

#### [400] - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs when one or more of the required request parameters are missing or invalid. Check the request body and ensure that all mandatory fields are present and of the correct type.

#### [401] - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API key or secret."
}
```
**Description:** This error occurs if the API key or secret is invalid. Make sure the API-KEY and API-SECRET headers are set correctly.

#### [403] - Forbidden
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Insufficient permissions."
}
```
**Description:** This error occurs if the merchant associated with the provided `MERCHANT-ID` lacks necessary permissions to create service providers. Verify that the merchant has the appropriate role and permissions configured.

#### [500] - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a problem on the server side. Please try again later. If the problem persists, contact support.

## Notes
- Ensure that the `partnerId` in the URL path is a valid identifier for the partner making the request.
- The `webKybUrl` provided in the response is a one-time use URL and should be handled securely.
- Contact support if you encounter any issues during the service provider creation process.

---
