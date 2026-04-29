# Unsubscribe Notifications for Partner

## Overview
Unsubscribe from a specific notification for a partner. This endpoint removes the notification subscription identified by the notification ID.

## Prerequisites
- Partner ID is required to identify the partner.
- Notification ID is required to identify the notification to be unsubscribed.
- Authentication via API Key and API Secret is required.

## Request

### HTTP Method and URL
```
DELETE /partners/:partnerId/notifications/:notificationId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
(None)

### Request Body Parameters
(None)

### Request Example
```json
// No request body required for DELETE request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|--------|-------|----------|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| message | string | A message that describes the status of the request |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "External notification unsubscribed successfully for the given ID [8113d3f8403b380409] and external alert ID [839d12501df1680cf3]"
}
```

## Error Responses

(No error responses provided in the JSON)

## Notes
- Replace `:partnerId` and `:notificationId` in the URL with the appropriate IDs.
- Ensure that the `API-KEY` and `API-SECRET` headers are correctly set with your authentication credentials.

---
