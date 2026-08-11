# Subscribe to Merchant Reports

## Overview
Subscribe to receive automated notifications for merchant events. You must provide at least one notification channel: email, slackUrl, or sftpInfo to create a notification subscription. This endpoint supports multiple notification channels including EMAIL, SLACK, and SFTP.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/notifications/reports
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | Yes | The event type to subscribe to for notifications. Possible values: `DAILY_REPORTS`, `MONTHLY_REPORTS`, `PAYMENT_COMPLETED`, `DAILY_FILE_TRANSFER`, `WEEKLY_FILE_TRANSFER`, `MONTHLY_FILE_TRANSFER`. |
| `email` | `string` | No | Email address for notification delivery (optional) |
| `slackUrl` | `string` | No | Slack webhook URL for notification delivery (optional) |
| `sftpInfo` | `object` | No | SFTP configuration for receiving notification reports |
| &nbsp;&nbsp;&nbsp;&nbsp;`host` | `string` | Yes | SFTP server hostname or IP address |
| &nbsp;&nbsp;&nbsp;&nbsp;`user` | `string` | Yes | Username for SFTP authentication |
| &nbsp;&nbsp;&nbsp;&nbsp;`port` | `number` | No | SFTP server port (default: 22) |
| &nbsp;&nbsp;&nbsp;&nbsp;`hostKey` | `string` | No | SFTP server host key for secure connection |
| &nbsp;&nbsp;&nbsp;&nbsp;`remoteDirectory` | `string` | No | Remote directory path for file delivery |
| &nbsp;&nbsp;&nbsp;&nbsp;`separator` | `string` | No | Field separator for CSV reports. Possible values: `COMMA`, `SEMICOLON`, `PIPE`, `TAB`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentStatuses` | `array` | No | Restrict the report to payments with these statuses. Accepts a subset of PAYMENT_COMPLETED and PAYMENT_FAILED. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentTypes` | `array` | No | Restrict the report to these payment types, letting you control whether refunds are included. Accepts PURCHASE and RETURN. |
| &nbsp;&nbsp;&nbsp;&nbsp;`includeColumns` | `array` | No | Choose which columns appear in the CSV report. Accepts individual column names or group tokens such as ADJUSTMENTS. |

### Request Example
```json
{
  "event": "DAILY_FILE_TRANSFER",
  "slackUrl": "https://surfboardworkspace.slack.com/archives/C039RL0LS8M",
  "email": "john@gmail.com",
  "sftpInfo": {
    "host": "192.168.0.211",
    "user": "surfboard-test",
    "port": 8080,
    "hostKey": "AAAAB3NzaC1yc2EAAAADAQABAAABgQDVjVZBKMAFE3z4m1M6xVpudb+Wcal1kAfzdpOsi64cXjBdK2VS0cuI38htYHGXhpqQ2z/XbYZ2ZfPUkzL/P0IV7Kec22ohLNSN3+r9r3jjB/EU9S46ApuHzloEFnSlPVT5xQA2d09Rs40iMjRp3hfov4pwNPwlav0ikLafSvPWZ2bUfsWq/vNdhnNGBd0au59qIAHrphkF5oyRQUjC5kssSuwZXo2GWC0zHuT06h3/t21BJMoQT4cJ2AEw5Cfvq/cUtSAUKsWaz++0wgyYBOYnYGHpxype+6c7x8gRkuAeuSyj/CdDG39CMSKLsf35CSr7bH8Tsmm6VuIPFwTr8FloGdVwthQiSOPDn15kQXeEiksmzeIMKilgpEWIxp1pgYgtrOefAXp+aoKSqNw+ccvUhiVwIpo2BXxM+l3douJMy2B7A29R+VvwOGDV1zbiYrxjbpDHqMpLjOo5vckj/YYyvHn32nnmb92Hl+A1+b9om1c/y/RN2aRgz6tgmPxhhVU=",
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
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| `data` | `array` | Array of notification subscription data |
| &nbsp;&nbsp;&nbsp;&nbsp;`notificationId` | `string` | Unique identifier for the notification subscription |
| &nbsp;&nbsp;&nbsp;&nbsp;`NotificationChannel` | `string` | Type of notification channel (e.g., SLACK, SFTP, EMAIL) |
| &nbsp;&nbsp;&nbsp;&nbsp;`publicKey` | `string` | Public key for SFTP authentication (only present for SFTP channels) |
| `message` | `string` | A message that describes the status of the request |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "notificationId": "839dd1b8113ff809f3",
      "NotificationChannel": "EMAIL"
    },
    {
      "notificationId": "839dd1b8113ff819f3",
      "NotificationChannel": "SLACK"
    },
    {
      "notificationId": "839dd1b8113ff82af3",
      "NotificationChannel": "SFTP",
      "publicKey": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCfGfO3kOLdYji5R6GNI8lvfyI5MgpQY43OF+HwAqgF96L6hg1jG/Nu58bToPZoaf+lkqp+/MDNGTIeRfMkR+3g1Q2sgZ3jGvN3lErvfbbnYGx7qDzfyMCg7i9VneVOJb4fxoSRzbja2ZG7XxbSzBPvzGky38AKqBq5EysO8/FnA6I9SNCMPcyaEq3Rs33kGjcBthOxc3X+3dRvKt0GU77xtt0tWl7vP/DHXj9m32kcjNN2647i/oRoAiM58fhtsU3UM5TQGYn6WJ0/su7X5JnBy2+WktotJvfzF7ri2Q+R5Ac7kem5g17wdMPgICaz1sDY6haxI3TuDOe8ZVybfV6T surfboard-test@34.88.179.4"
    }
  ],
  "message": "External notification for MERCHANT_ID: m_iWGri3XAyTmkbKYsYtV47 registered successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid SFTP event: \"PAYMENT_COMPLETED\". Accepted: DAILY_FILE_TRANSFER, WEEKLY_FILE_TRANSFER, MONTHLY_FILE_TRANSFER"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.

---
