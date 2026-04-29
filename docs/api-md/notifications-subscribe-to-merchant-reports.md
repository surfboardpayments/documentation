# Subscribe to Merchant Reports

## Overview
Subscribe to receive automated notifications for merchant events. You must provide at least one notification channel: email, slackUrl, or sftpInfo to create a notification subscription. This endpoint supports multiple notification channels including EMAIL, SLACK, and SFTP.

## Prerequisites
- Valid API Key and Secret
- Valid Merchant ID
- Content-Type must be set to application/json
- At least one notification channel (email, slackUrl, or sftpInfo) must be provided.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/notifications/reports
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| event | string | Yes | The event type to subscribe to for notifications. Possible values: `DAILY_REPORTS`, `MONTHLY_REPORTS`, `PAYMENT_COMPLETED`, `DAILY_FILE_TRANSFER`, `WEEKLY_FILE_TRANSFER`, `MONTHLY_FILE_TRANSFER`. |
| email | string | No | Email address for notification delivery (optional). Required if `slackUrl` and `sftpInfo` are not provided. |
| slackUrl | string | No | Slack webhook URL for notification delivery (optional). Required if `email` and `sftpInfo` are not provided. |
| sftpInfo | object | No | SFTP configuration for receiving notification reports (optional). Required if `email` and `slackUrl` are not provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;host | string | Yes (if `sftpInfo` is present) | SFTP server hostname or IP address. |
| &nbsp;&nbsp;&nbsp;&nbsp;user | string | Yes (if `sftpInfo` is present) | Username for SFTP authentication. |
| &nbsp;&nbsp;&nbsp;&nbsp;port | number | No (if `sftpInfo` is present) | SFTP server port (default: 22). |
| &nbsp;&nbsp;&nbsp;&nbsp;hostKey | string | No (if `sftpInfo` is present) | SFTP server host key for secure connection. |
| &nbsp;&nbsp;&nbsp;&nbsp;remoteDirectory | string | No (if `sftpInfo` is present) | Remote directory path for file delivery. |
| &nbsp;&nbsp;&nbsp;&nbsp;separator | string | No (if `sftpInfo` is present) | Field separator for CSV reports. Possible values: `COMMA`, `SEMICOLON`, `PIPE`, `TAB`. |

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
    "hostKey": "AAAAB3NzaC1yc2EAAAADAQABAAABgQDVjVZBKMAFE3z4m1M6xVpudb+Wcal1kAfzdpOsi64cXjBdK2VS0cuI38htYHGXhpqQ2z/XbYZ2ZfPUkzL/P0IV7Kec22ohLNSN3+r9r3jjB/EU9S46ApuHzloEFnSlPVT5xQA2d09Rs40iMjRp3hfov4pwNPwlav0ikLafSvPWZ2bUfsWq/vNdhnNGBd0au59qIAHrphkF5oyRQUjC5kssSuwZXo2GWC0zHuT06h3/t21BJMoQT4cJ2AEw5Cfvq/cUtSAUKsWaz++0wgyYBOYnYGHpxype+6c7x8gRkuAeuSyj/CdDG39CMSKLsf35CSr7bH8Tsmm6VuIPFwTr8FloGdVwthQiSOPDn15kQXeEiksmzeIMKilgpEWIxp1pgYgtrOefAXp+aoKSqNw+ccvUhiVwIpo2BXxM+l3douJMy2B7A29R+VvwOGDV1zbiYrxjbpDHqMpLjOo5vckj/YYyvHn32nnmb92Hl+A1+b9om1c/y/RN2aRgz6tgmPxhhVU="
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of notification subscription data. |
| &nbsp;&nbsp;&nbsp;&nbsp;notificationId | string | Unique identifier for the notification subscription. |
| &nbsp;&nbsp;&nbsp;&nbsp;NotificationChannel | string | Type of notification channel (e.g., SLACK, SFTP, EMAIL). |
| &nbsp;&nbsp;&nbsp;&nbsp;publicKey | string | Public key for SFTP authentication (only present for SFTP channels). |
| message | string | A message that describes the status of the request. |

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
  "data": [],
  "message": "Invalid request parameters"
}
```
**Description:** The request body is malformed or missing required fields. Ensure that the request body is valid JSON and contains all required parameters, including a valid event type and at least one notification channel.

## Notes
- This endpoint is newly created.
- The `publicKey` field is only present in the response when the notification channel is SFTP.
- The `MERCHANT-ID` header should contain the ID of the merchant you are subscribing to notifications for.

---
