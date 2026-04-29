# Fetch All Merchant Applications

## Overview
Retrieves a list of all merchants applications with a specific partner. This endpoint supports pagination.

## Prerequisites
- Partner ID is required.
- Authentication via API Key and API Secret is required.
- A Surfboard partner account must be set up.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/applications
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `array` | Response data containing an array of merchant applications. |
| `data[].applicationId` | `String` | The Application ID used to uniquely identify a merchant's application. |
| `data[].applicationStatus` | `string` | Describes the status of the application. Possible values are: `APPLICATION_INITIATED`, `APPLICATION_SUBMITTED`, `APPLICATION_PENDING_INFORMATION`, `APPLICATION_SIGNED`, `APPLICATION_REJECTED`, `APPLICATION_COMPLETED`, `MERCHANT_CREATED`. |
| `data[].corporateId` | `Number` | Corporate ID of the respective merchant. |
| `data[].country` | `String` | Two-letter ISO country code in uppercase, representing the primary location of the merchant. |
| `data[].createdAt` | `String` | Date of application creation in ISO string format |
| `data[].lastUpdatedAt` | `String` | Date of last updation recorded with the merchant application in ISO string format |
| `data[].webKybUrl` | `string` | The Web KYB URL generated for the application. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"applicationId": "816e0b8aabe6580310",
			"country": "SE",
			"corporateId": "1234567898",
			"applicationStatus": "MERCHANT_CREATED",
			"createdAt": "2023-07-10T07:17:41.489Z",
			"lastUpdatedAt": "2023-07-10T07:17:41.519Z",
			"webKybUrl": "https://surfkyb.com/816e0b8aabe6580310"
		},
		{
			"applicationId": "816e0983abe6580a10",
			"country": "DK",
			"applicationStatus": "APPLICATION_INITIATED",
			"createdAt": "2023-07-10T07:00:23.106Z",
			"lastUpdatedAt": "2023-07-10T07:00:23.106Z",
			"webKybUrl": "https://surfkyb.com/816e0983abe6580a10"
		}
	],
	"message": "Applications of partner fetched successfully with partnerId: 8113d3f8403b380409."
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name
```json
{
  "status": "ERROR",
  "data": [],
  "message": "TBD"
}
```
**Description:** Error description goes here.

## Notes
-  `:partnerId` is a path parameter and should be replaced with the actual partner ID.
-  Ensure that the `API-KEY` and `API-SECRET` headers are properly configured for authentication.
- This endpoint supports pagination, but the parameters are not currently defined.
---
