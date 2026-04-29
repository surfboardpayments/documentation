# Subscribe to Partner Notifications

## Overview
Subscribe to receive automated notifications for partner events via email, Slack, or SFTP. At least one notification channel must be provided to create a notification subscription.

## Prerequisites
- Partner ID is required in the URL.
- You need a valid API Key and API Secret for authentication.
- At least one of `email`, `slackUrl`, or `sftpInfo` must be provided in the request body.
- For SFTP, you will need the SFTP server host, username, and optionally port, hostKey, remoteDirectory, and separator.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/notifications/reports
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| event | string | Yes | The event type to subscribe to for notifications. Possible values: `MERCHANT_ONBOARDED`, `ONLINE_STORE_ONBOARDED`, `TERMINAL_REGISTERED`, `LOGISTICS_TERMINAL_SHIPPED`, `DAILY_FILE_TRANSFER`, `WEEKLY_FILE_TRANSFER`, `MONTHLY_FILE_TRANSFER`. |
| email | string | No | Email address for notification delivery.  Conditional: Required if `slackUrl` and `sftpInfo` are not provided. |
| slackUrl | string | No | Slack webhook URL for notification delivery. Conditional: Required if `email` and `sftpInfo` are not provided. |
| sftpInfo | object | No | SFTP configuration for receiving notification reports. Conditional: Required if `email` and `slackUrl` are not provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;host | string | Yes | SFTP server hostname or IP address. Required if `sftpInfo` is provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;user | string | Yes | Username for SFTP authentication. Required if `sftpInfo` is provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;port | number | No | SFTP server port (default: 22).  Optional if `sftpInfo` is provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;hostKey | string | No | SFTP server host key for secure connection. Optional if `sftpInfo` is provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;remoteDirectory | string | No | Remote directory path for file delivery. Optional if `sftpInfo` is provided. |
| &nbsp;&nbsp;&nbsp;&nbsp;separator | string | No | Field separator for CSV reports. Possible values: `COMMA`, `SEMICOLON`, `PIPE`, `TAB`. Optional if `sftpInfo` is provided. |

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
  "message": "External notification for PARTNER_ID: 8113d3f8403b380409 registered successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": [],
  "message": "Invalid request body"
}
```
**Description:** This error occurs if the request body is malformed or missing required fields.  Ensure that the JSON is valid and that all mandatory parameters are included and properly formatted. For example, the `event` field must be one of the allowed values. If using SFTP, make sure that the SFTP parameters like `host` and `user` are present.

## Notes
- Provide a partner ID for the specific partner you are subscribing to.
- If you provide `sftpInfo`, a public key will be generated and returned in the response for you to add to your `authorized_keys` file on the SFTP server.
- You must provide at least one form of notification: Email, Slack or SFTP.

---
