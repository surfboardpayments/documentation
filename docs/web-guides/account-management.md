## Overview

The Surfboard API provides administrative endpoints for managing accounts, service providers, and notification subscriptions. With these APIs you can:

- **Create user accounts** for merchants and partners with role-based access control
- **Register service providers** under a partner and track their onboarding lifecycle
- **Query service providers** linked to a merchant or partner
- **Subscribe to notifications** for automated report delivery via email, Slack, or SFTP

## User Accounts & Roles

Every account is assigned a role that controls access. The `role` field is optional when creating accounts.

| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Full access to all features and settings. Typically the account owner. |
| `ADMIN` | Can manage resources, invite users, and configure integrations. |
| `USER` | Read access with limited operational permissions. |

### Create a Merchant Account

```
POST /merchants/{merchantId}/accounts
```

```json
{ "email": "admin@merchant.com", "role": "ADMIN" }
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address. An invitation is sent to this address. |
| `role` | string | No | `SUPER_ADMIN`, `ADMIN`, or `USER`. Defaults if omitted. |

Returns `{ "status": "SUCCESS", "message": "..." }` on success.

### Create a Partner Account

Uses the same request body and response format, scoped to the partner:

```
POST /partners/{partnerId}/accounts
```

```json
{ "email": "admin@partner.com", "role": "ADMIN" }
```

## Service Provider Management

Service providers are third-party entities that participate in transaction processing, revenue sharing, or value-added services. Partners register them, track onboarding, and query them at both partner and merchant level.

### Register a Service Provider

Submit a new application. The response includes an `applicationId` and a `webKybUrl` for KYB verification.

```
POST /partners/{partnerId}/service-providers
```

```json
{
  "country": "SE",
  "organisation": { "corporateId": "3532007322" },
  "controlFields": { "isServiceProvider": true }
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | string | Yes | Two-letter ISO country code (e.g., `SE`, `NO`, `DK`). |
| `organisation.corporateId` | string | Yes | Corporate identification number. |
| `controlFields.isServiceProvider` | boolean | Yes | Must be `true`. |

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "app-abc123",
    "webKybUrl": "https://kyb.surfboardpayments.com/application/app-abc123"
  },
  "message": "Service provider application created"
}
```

Share the `webKybUrl` with the service provider so they can complete KYB.

### List All Applications

Retrieve all service provider applications, optionally filtered by lifecycle stage.

```
GET /partners/{partnerId}/service-providers/applications?applicationType=ONBOARDING
```

| Query Parameter | Type | Description |
|-----------------|------|-------------|
| `applicationType` | string | `ONBOARDING`, `RENEWAL`, or `ONBOARDING,RENEWAL`. Defaults to `ONBOARDING`. |

**Response** returns an array of application objects:

```json
{
  "status": "SUCCESS",
  "data": [{
    "applicationId": "app-abc123",
    "country": "SE",
    "corporateId": "3532007322",
    "applicationStatus": "APPLICATION_SUBMITTED",
    "createdAt": "2025-06-15T10:30:00Z",
    "lastUpdatedAt": "2025-06-16T08:00:00Z",
    "legalName": "Acme Services AB"
  }]
}
```

### Check Application Status

```
GET /partners/{partnerId}/service-providers/applications/{applicationId}
```

```json
{
  "status": "SUCCESS",
  "data": {
    "onboardingStatus": "COMPLETED",
    "applicationStatus": "MERCHANT_CREATED",
    "serviceProviderId": "sp-789xyz"
  }
}
```

The `serviceProviderId` is `null` while pending and populated once approved.

### Fetch Service Providers for a Partner

```
GET /partners/{partnerId}/service-providers
```

```json
{
  "status": "SUCCESS",
  "data": {
    "serviceProviders": [{
      "serviceProviderId": "sp-789xyz",
      "corporateId": "3532007322",
      "name": "Acme Services AB",
      "email": "contact@acmeservices.com",
      "address": { "addressLine1": "Birger Jarlsgatan 10", "city": "Stockholm", "countryCode": "SE", "postalCode": "114 34" },
      "phoneNumber": { "code": "46", "number": "812345678" }
    }]
  }
}
```

### Fetch Service Providers for a Merchant

Same response structure as above, scoped to the merchant: `GET /merchants/{merchantId}/service-providers`

## External Notifications

Subscribe to automated event reports delivered via email, Slack, or SFTP. At least one channel is required per subscription.

### Subscribe to Reports

```
POST /merchants/{merchantId}/notifications/reports
POST /partners/{partnerId}/notifications/reports
```

```json
{
  "event": "DAILY_FILE_TRANSFER",
  "email": "finance@merchant.com",
  "slackUrl": "https://hooks.slack.com/services/T00/B00/xxx",
  "sftpInfo": {
    "host": "sftp.merchant.com",
    "user": "surfboard-reports",
    "port": 22,
    "remoteDirectory": "/reports/daily",
    "separator": ","
  }
}
```

**Response** returns a `notificationId` per channel. For SFTP, a `publicKey` is included -- add it to your server's authorized keys.

```json
{
  "status": "SUCCESS",
  "data": [
    { "notificationId": "notif-001", "NotificationChannel": "EMAIL" },
    { "notificationId": "notif-002", "NotificationChannel": "SLACK" },
    { "notificationId": "notif-003", "NotificationChannel": "SFTP", "publicKey": "ssh-rsa AAAA..." }
  ]
}
```

### Fetch Existing Notifications

Retrieve configured subscriptions with optional filters (`event`, `notificationChannel`, `notificationId`):

```
GET /merchants/{merchantId}/notifications
GET /partners/{partnerId}/notifications
```

### Unsubscribe

Remove a subscription by its ID:

```
DELETE /merchants/{merchantId}/notifications/{notificationId}
DELETE /partners/{partnerId}/notifications/{notificationId}
```

Returns `{ "status": "SUCCESS", "message": "..." }` on success.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create merchant account | POST | `/merchants/{merchantId}/accounts` |
| Create partner account | POST | `/partners/{partnerId}/accounts` |
| Register service provider | POST | `/partners/{partnerId}/service-providers` |
| List SP applications | GET | `/partners/{partnerId}/service-providers/applications` |
| Check SP application status | GET | `/partners/{partnerId}/service-providers/applications/{applicationId}` |
| Fetch SPs for partner | GET | `/partners/{partnerId}/service-providers` |
| Fetch SPs for merchant | GET | `/merchants/{merchantId}/service-providers` |
| Subscribe merchant reports | POST | `/merchants/{merchantId}/notifications/reports` |
| Subscribe partner reports | POST | `/partners/{partnerId}/notifications/reports` |
| Fetch merchant notifications | GET | `/merchants/{merchantId}/notifications` |
| Fetch partner notifications | GET | `/partners/{partnerId}/notifications` |
| Unsubscribe merchant | DELETE | `/merchants/{merchantId}/notifications/{notificationId}` |
| Unsubscribe partner | DELETE | `/partners/{partnerId}/notifications/{notificationId}` |