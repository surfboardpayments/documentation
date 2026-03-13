# Deactivate a Store

## Overview
Deactivates a store. Use this API to deactivate any store under a merchant. You can delete a store instantly or schedule it to be deleted at a later date. Stores can be deleted only if there are no terminals registered to it. If a store has terminals registered to it, you will have to delink the terminal from the store or change the terminal to another store under the same merchant.

## Prerequisites
- Valid Partner ID, Merchant ID, and Store ID.
- Authentication via API Key and API Secret.
- Store must not have any active terminals linked to it. Delink the terminals or move them to another store before deactivation.

## Request

### HTTP Method and URL
```
DELETE /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*No query parameters are available for this endpoint.*

### Request Body Parameters
*No request body parameters are available for this endpoint.*

### Request Example
```json
// No request body needed for DELETE method
```

## Response

### Response Parameters
| Parameter | Type | Description |
|--------|-------|-------------|
| status | string | Status of the request. |
| message | string | Message describing the status of store deactivation. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Store deactivation initiated successfully"
}
```

## Error Responses

### Possible Errors

#### *No error codes provided in original JSON.  Assuming standard HTTP codes may apply*

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request format."
}
```
**Description:** The request format is incorrect or missing required parameters. Ensure that all required headers are present and properly formatted.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided are invalid. Verify that your API key and secret are correct and properly configured.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant ID does not match API key."
}
```
**Description:** The MERCHANT-ID provided in the header does not match the API key associated with the request. Ensure the MERCHANT-ID is correctly associated with the API credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** The specified store ID does not exist or is not accessible to the authenticated merchant. Verify the store ID.

#### 409 - Conflict
```json
{
  "status": "ERROR",
  "message": "Store has active terminals. Please delink or move the terminals before deactivation."
}
```
**Description:** The store has terminals registered to it. You must delink or move the terminals to another store before deactivating the store.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the error persists, contact support.

## Notes
-  The `deactivationDate` parameter (yyyy-mm-dd format) is optional. If not provided, the store will be deactivated immediately.
-  Ensure that the MERCHANT-ID in the header matches the merchant ID for which the store is being deactivated.
-  This API performs a soft delete. The store record is not physically deleted from the database, but its status is changed to inactive.
-  Deactivated stores are not available for creating new terminals.
---
