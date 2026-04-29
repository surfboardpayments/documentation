# Fetch Service Provider Application Status

## Overview
This API allows partners to retrieve the status of a specific service provider application by its ID.

## Prerequisites
- Partner account with valid credentials
- Valid `partnerId`
- Valid `applicationId`
- Authentication via API Key, API Secret, and Merchant ID in the headers

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/service-providers/applications/:applicationId
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
*This endpoint does not accept any query parameters.*

### Request Body Parameters
*This endpoint does not accept request body parameters.*

### Request Example
```json
//No request body
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | object | Response data containing application status information. |
|  `data.onboardingStatus` | string | Current onboarding status, null if not yet started. |
|  `data.applicationStatus` | string | Current status of the application. |
|  `data.serviceProviderId` | string | Service provider ID once approved, null if still pending. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "onboardingStatus": null,
    "applicationStatus": "APPLICATION_INITIATED",
    "serviceProviderId": null
  },
  "message": "Service provider application status fetched successfully"
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name
```json
{}
```
**Description:** Error responses are not defined in the documentation.

## Notes
- Ensure that `partnerId` and `applicationId` are valid and correspond to an existing service provider application.
---
