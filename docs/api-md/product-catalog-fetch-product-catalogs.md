# Fetch Product Catalogs

## Overview
Retrieves all product catalogs under the store.

## Prerequisites
- A valid store ID is required.
- Authentication is required via API Key and API Secret.
- Merchant ID is also required in the header.

## Request

### HTTP Method and URL
```
GET /catalog
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| storeId | string | Yes |  The ID of the store for which to retrieve catalogs. |

### Request Body Parameters
N/A

### Request Example
```json
// Example request - no body required for GET
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp; catalogId | array | List of product catalogs Id's existing under the store. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"catalogId": [
			"8187c051854a38000a",
			"818a5d4df1c258090a",
			"818bb06b93a5500b0a",
			"818f9f37bd0b58040a"
		]
	},
	"message": "Product catalog fetched for storeId: 8136a645a2c2d1bb0f"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
    "status": "ERROR",
    "message": "Invalid storeId"
}
```
**Description:** The `storeId` provided is not valid or is missing. Verify the `storeId` and ensure it is a valid string.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Invalid API Key or Secret"
}
```
**Description:** The API Key or API Secret provided in the request headers are invalid.  Ensure that you have the correct credentials.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Merchant ID not authorized"
}
```
**Description:** The Merchant ID provided in the request headers is not authorized to access the resource.  Ensure you are using the correct Merchant ID.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server.  Retry the request later or contact support.

## Notes
- Ensure you have the correct API Key, API Secret, and Merchant ID before making the request.
- The `storeId` is a mandatory query parameter.
---
