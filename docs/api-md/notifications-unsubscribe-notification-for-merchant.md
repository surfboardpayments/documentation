# Unsubscribe Notification for Merchant

## Overview
Unsubscribe from a specific notification for a merchant. This endpoint removes the notification subscription identified by the notification ID.

## Prerequisites
- A valid merchant ID is required.
- A valid notification ID is required.
- Authentication is required using API Key and Secret.
- The merchant must have an existing notification subscription for the specified notification ID.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/notifications/:notificationId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body is needed for DELETE requests.
```

## Response

### Response Parameters
| Parameter | Type | Description |
|--------|-------|-------------|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "External notification unsubscribed successfully for the given ID [m_iWGri3XAyTmkbKYsYtV47] and external alert ID [839d12501df1680cf3]"
}
```

## Error Responses

### Possible Errors

####  400 - Invalid Request
```json
{
  "status": "ERROR",
  "message": "Invalid merchant ID or notification ID"
}
```
**Description:** This error occurs when the merchant ID or notification ID provided in the URL is invalid or does not exist.  Ensure the IDs are valid and correctly formatted.

####  401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API Key or Secret"
}
```
**Description:**  This error occurs when the provided API Key or Secret is incorrect.  Verify that your API Key and Secret are correct and properly included in the request headers.

####  404 - Notification Not Found
```json
{
  "status": "ERROR",
  "message": "Notification not found for the given merchant."
}
```
**Description:** This error indicates that the specified notification ID does not exist for the given merchant. Verify the notification ID and ensure that it belongs to the specified merchant.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates an issue on the server-side.  If this error persists, contact support with the request details for further assistance.

## Notes
- Ensure that the `merchantId` and `notificationId` are correctly formatted and exist in the system before making the request.
- The success message in the response may vary depending on the specific notification being unsubscribed.

---
