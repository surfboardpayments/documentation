# Fetch External Notifications for Merchant

## Overview
Retrieves all external notifications configured for a merchant. Supports filtering by event type, notification channel, and notification ID.

## Prerequisites
- API Key authentication is required. You need a valid `API-KEY` and `API-SECRET` in the request headers.
- A valid `MERCHANT-ID` in the request headers is required.
- The merchant must have notification configurations set up to retrieve data.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/notifications
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| event | string | No | Filter by event type |
| notificationChannel | string | No | Filter by notification channel. Possible values: `EMAIL`, `SLACK`, `SFTP` |
| notificationId | string | No | Filter by notification ID |

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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | array | Array of notification objects |
| data[].notificationId | string | Unique identifier for the notification |
| data[].event | string | Event type for the notification |
| data[].notificationChannel | string | Channel used for notification delivery |
| data[].address | object | Address configuration for the notification |
| data[].address.url | string | URL for webhook notifications |
| data[].address.email | string | Email address for email notifications |
| data[].address.host | string | SFTP host address |
| data[].address.remoteDirectory | string | SFTP remote directory |
| data[].address.user | string | SFTP username |
| data[].address.port | number | SFTP port number |
| data[].address.publicKey | string | SFTP public key |
| data[].address.separator | string | CSV field separator |
| data[].status | string | Status of the notification subscription |
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
      "event": "PAYMENT_COMPLETED",
      "notificationChannel": "EMAIL",
      "address": {
        "email": "merchant@example.com"
      },
      "status": "SUBSCRIBED"
    }
  ],
  "message": "External notification for MERCHANT_ID: m_iWGri3XAyTmkbKYsYtV47 fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid input parameters."
}
```
**Description:** This error occurs when the request contains invalid parameters. Verify that all query parameters are correctly formatted and supported.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Unauthorized: Invalid API key or secret."
}
```
**Description:** This error occurs when the API key or secret provided in the headers are invalid. Check that the `API-KEY` and `API-SECRET` are correct.

#### 403 - Forbidden
```json
{
    "status": "ERROR",
    "data": null,
    "message": "Forbidden: Insufficient permissions."
}
```
**Description:** This error occurs when the merchant does not have permission to access the requested notifications. Verify the `MERCHANT-ID` is correct and the API credentials have the necessary permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Merchant not found."
}
```
**Description:** This error occurs if the specified merchant ID does not exist.  Ensure the `MERCHANT-ID` is valid.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates a problem on the server-side. Retry the request after some time. If the issue persists, contact support.

## Notes
- Ensure the `MERCHANT-ID` in the header matches the merchant for which you are fetching notifications.
- When using SFTP notification channel, ensure all the required fields like `host`, `user`, `port`, `publicKey`, and `remoteDirectory` are properly configured.
- Be aware of the possible values for `notificationChannel` when filtering.
---
