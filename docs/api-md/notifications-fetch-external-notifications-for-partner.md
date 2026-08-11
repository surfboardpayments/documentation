# Fetch External Notifications for Partner

## Overview
Retrieves all external notifications configured for a partner. Supports filtering by event type, notification channel, and notification ID

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/notifications
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

To filter notifications by specific criteria, send `event`, `notificationChannel`, or `notificationId` as query params.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | No | Filter by event type. Possible values: `MERCHANT_ONBOARDED`, `ONLINE_STORE_ONBOARDED`, `TERMINAL_REGISTERED`, `LOGISTICS_TERMINAL_SHIPPED`, `DAILY_FILE_TRANSFER`, `WEEKLY_FILE_TRANSFER`, `MONTHLY_FILE_TRANSFER`. |
| `notificationChannel` | `string` | No | Filter by notification channel. Possible values: `EMAIL`, `SLACK`, `SFTP`. |
| `notificationId` | `string` | No | Filter by notification ID |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/notifications?event=WEEKLY_FILE_TRANSFER&notificationChannel=SFTP&notificationId=839cfe66fe08b00bf3
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `array` | Array of notification objects |
| &nbsp;&nbsp;&nbsp;&nbsp;`notificationId` | `string` | Unique identifier for the notification |
| &nbsp;&nbsp;&nbsp;&nbsp;`event` | `string` | Event type for the notification. Possible values: `MERCHANT_ONBOARDED`, `ONLINE_STORE_ONBOARDED`, `TERMINAL_REGISTERED`, `LOGISTICS_TERMINAL_SHIPPED`, `DAILY_FILE_TRANSFER`, `WEEKLY_FILE_TRANSFER`, `MONTHLY_FILE_TRANSFER`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`notificationChannel` | `string` | Channel used for notification delivery |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Address configuration for the notification |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`url` | `string` | URL for webhook notifications |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Email address for email notifications |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`host` | `string` | SFTP host address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`remoteDirectory` | `string` | SFTP remote directory |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`user` | `string` | SFTP username |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`port` | `number` | SFTP port number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`publicKey` | `string` | SFTP public key |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`separator` | `string` | CSV field separator |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentStatuses` | `array` | Payment statuses the SFTP report is filtered to, when configured |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentTypes` | `array` | Payment types the SFTP report is filtered to, when configured |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`includeColumns` | `array` | Columns included in the SFTP report, when configured |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Status of the notification subscription |
| `message` | `string` | A message that describes the status of the request |

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
        "separator": ",",
        "paymentStatuses": [
          "PAYMENT_COMPLETED"
        ],
        "paymentTypes": [
          "PURCHASE",
          "RETURN"
        ],
        "includeColumns": [
          "ADJUSTMENTS"
        ]
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
  "message": "Invalid notificationChannel. Must be one of: EMAIL, SLACK, SFTP"
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- The `partnerId` is part of the URL path and must be a valid identifier.

---
