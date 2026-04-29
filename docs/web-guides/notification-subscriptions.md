## Overview

Notification subscriptions let you set up persistent, account-wide delivery of event notifications at the merchant or partner level. Unlike [webhooks](/developers/guides/webhooks-notifications), which deliver HTTP callbacks to your server, notification subscriptions deliver events through **email**, **Slack**, and **SFTP** channels.

Use notification subscriptions for ongoing operational alerts such as daily settlement reports, rather than real-time payment status updates.

## Subscribing to Notifications

### Merchant Report Notifications

```json
POST /merchants/:merchantId/notifications/reports
{
  "event": "DAILY_FILE_TRANSFER",
  "email": "finance@yourcompany.com",
  "slackUrl": "https://hooks.slack.com/services/T00/B00/xxx"
}
```

You must provide at least one delivery channel (`email`, `slackUrl`, or `sftpInfo`). You can include multiple channels in a single request.

**Response:**

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "notificationId": "abc123",
      "NotificationChannel": "EMAIL"
    },
    {
      "notificationId": "def456",
      "NotificationChannel": "SLACK"
    }
  ],
  "message": "Notification subscription created successfully"
}
```

### Partner Notifications

Partners use the same structure with the partner endpoint:

```json
POST /partners/:partnerId/notifications/reports
{
  "event": "DAILY_FILE_TRANSFER",
  "email": "ops@partner.com"
}
```

## SFTP Delivery Channel

For automated file-based delivery (such as settlement CSVs), include `sftpInfo`:

```json
{
  "event": "DAILY_FILE_TRANSFER",
  "sftpInfo": {
    "host": "sftp.yourserver.com",
    "user": "surfboard-reports",
    "port": 22,
    "remoteDirectory": "/reports/daily",
    "separator": ","
  }
}
```

The response includes a `publicKey` for SFTP channels. Add this key to your SFTP server's authorized keys to allow Surfboard to deliver files.

## Fetching Existing Subscriptions

Retrieve all configured notification subscriptions for a merchant or partner:

```
GET /merchants/:merchantId/notifications
GET /partners/:partnerId/notifications
```

Both endpoints support optional query parameters: `event`, `notificationChannel`, and `notificationId`.

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "notificationId": "abc123",
      "event": "DAILY_FILE_TRANSFER",
      "notificationChannel": "EMAIL",
      "address": { "email": "finance@yourcompany.com" },
      "status": "ACTIVE"
    }
  ]
}
```

## Unsubscribing

Remove a subscription by its ID:

```
DELETE /merchants/:merchantId/notifications/:notificationId
DELETE /partners/:partnerId/notifications/:notificationId
```

## Best Practices

- **Store notification IDs.** Save the `notificationId` returned when subscribing -- you need it to unsubscribe or filter notifications later.
- **Monitor subscriptions.** Periodically fetch your active subscriptions with the GET endpoint to confirm they are still active and correctly configured.
- **Use multiple channels.** Combine email and Slack for critical alerts to ensure visibility across your team.
- **Secure SFTP access.** After adding the Surfboard public key to your SFTP server, restrict access to the designated directory and user.

## API Reference

| Action | Method | Endpoint |
|--------|--------|----------|
| Subscribe merchant reports | POST | `/merchants/:merchantId/notifications/reports` |
| Subscribe partner reports | POST | `/partners/:partnerId/notifications/reports` |
| Fetch merchant notifications | GET | `/merchants/:merchantId/notifications` |
| Fetch partner notifications | GET | `/partners/:partnerId/notifications` |
| Unsubscribe merchant | DELETE | `/merchants/:merchantId/notifications/:notificationId` |
| Unsubscribe partner | DELETE | `/partners/:partnerId/notifications/:notificationId` |