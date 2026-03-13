# Fetch External Notifications for Partner

## Overview
Retrieves all external notifications configured for a partner. Supports filtering by event type, notification channel, and notification ID.

## Prerequisites
- Partner ID (`partnerId`) is required to identify the partner whose notifications are being fetched.
- Authentication via `API-KEY` and `API-SECRET` headers is required.
- Ensure the partner has existing external notifications configured to retrieve meaningful data.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/notifications
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| event | string | No | Filter by event type |
| notificationChannel | string | No | Filter by notification channel. Possible values: `EMAIL`, `SLACK`, `SFTP` |
| notificationId | string | No | Filter by notification ID |

### Request Example
```
GET /partners/8113d3f8403b380409/notifications?event=WEEKLY_FILE_TRANSFER&notificationChannel=SFTP
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | array | Array of notification objects |
| &nbsp;&nbsp;&nbsp;&nbsp;notificationId | string | Unique identifier for the notification |
| &nbsp;&nbsp;&nbsp;&nbsp;event | string | Event type for the notification |
| &nbsp;&nbsp;&nbsp;&nbsp;notificationChannel | string | Channel used for notification delivery |
| &nbsp;&nbsp;&nbsp;&nbsp;address | object | Address configuration for the notification |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url | string | URL for webhook notifications |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email | string | Email address for email notifications |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host | string | SFTP host address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remoteDirectory | string | SFTP remote directory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user | string | SFTP username |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port | number | SFTP port number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;publicKey | string | SFTP public key |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;separator | string | CSV field separator |
| &nbsp;&nbsp;&nbsp;&nbsp;status | string | Status of the notification subscription |
| message | string | A message that describes the status of the request |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "notificationId": "839cfe66fe08b00bf3",
      "event": "WEEKLY_FILE_TRANSFER",
      "notificationChannel": "SFTP",
      "address": {
        "host": "192.168.0.211",
        "user": "surfboard-test",
        "port": 8080,
        "publicKey": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDPrhFN05QsXZPVGn3uHpRih3bJrRARfvqvyZ5RuRG78YXiVjfHszckpzcay7uF6fsMQes8ky4RGywHs7UfhWbXhu5EDE/swZzTtu8TRVmRhIL6K1o8VKFEEJat3+UgwgrkdKHpUyld3r2doNcViHDiBTiVW4O4JR98/XHrhR7Ge9EPxE/iVwyur+YREtt3RKdZV3d+NG+4WFRqaq70lM13z0u1lACP8PRl4dyRbjrpGoMGq2zDSvyerzS6fKg7jm1UBOt4wznu8pjIE+A+9xiNvzpnxG1q4GxwpRq8e8AY5WIvpngOpaiifEObAGWnauvWnenPwV/yvudTwK4bFQBV surfboard-test@192.168.0.211",
        "separator": ","
      },
      "status": "REGISTERED"
    },
    {
      "notificationId": "839d223b9df16805f3",
      "event": "ONLINE_STORE_ONBOARDED",
      "notificationChannel": "EMAIL",
      "address": {
        "email": "partner@example.com"
      },
      "status": "SUBSCRIBED"
    }
  ],
  "message": "External notification for PARTNER_ID: 8113d3f8403b380409 fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": [],
  "message": "Invalid request parameters"
}
```
**Description:** This error occurs if the request parameters are invalid or missing. Ensure all required parameters are present and in the correct format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": [],
  "message": "Invalid API key or secret"
}
```
**Description:** This error occurs if the API key or secret is invalid. Verify the correctness of your API key and secret.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "data": [],
  "message": "Partner not found"
}
```
**Description:** This error occurs if the specified partner ID does not exist. Check and correct the partner ID in the request.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": [],
  "message": "An unexpected error occurred"
}
```
**Description:** This error occurs due to an unexpected server-side issue. Retry the request after some time. If the issue persists, contact support.

## Notes
- The `partnerId` path parameter is mandatory.
- The `API-KEY` and `API-SECRET` headers are essential for authenticating the request.
- When specifying the `notificationChannel` query parameter, use uppercase values (`EMAIL`, `SLACK`, or `SFTP`).
- The response `data` array will be empty if no notifications match the specified filter criteria.

---
