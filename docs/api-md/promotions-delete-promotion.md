# Delete Promotion

## Overview
Permanently deletes a promotion. It is removed from every store it was assigned to and can no longer be displayed or redeemed. This action cannot be undone.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/promotions/:promotionId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| merchantId | string | Yes | The unique identifier of the merchant the promotion belongs to. |
| promotionId | string | Yes | The promotion to delete. |

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Indicates whether the request succeeded — either 'SUCCESS' or 'ERROR'. |
| message | string | For example, "Promotion deleted successfully". |

### Success Response Example (200)
```json
{
  "status": "SUCCESS",
  "message": "Promotion deleted successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
    "status": "ERROR",
    "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required fields. Ensure all required parameters are present and valid.

#### 401 - Unauthorized
```json
{
    "status": "ERROR",
    "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is incorrect. Verify your credentials.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "message": "Forbidden: Insufficient permissions."
}
```
**Description:** The provided MERCHANT-ID does not have the necessary permissions to access this endpoint.

#### 500 - Internal Server Error
```json
{
    "status": "ERROR",
    "message": "An unexpected error occurred."
}
```
**Description:** An internal server error occurred while processing the request. Retry later; if it persists, contact support.

## Notes
- Authentication is required via API Key and API Secret, along with a valid `MERCHANT-ID`.
- All path parameters are required and must reference existing resources.

---
