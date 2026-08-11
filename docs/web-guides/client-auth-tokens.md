## Overview

Client auth tokens let client-side applications (web browsers, mobile apps) authenticate with the Surfboard API without exposing your `API-KEY` or `API-SECRET`. Use them for customer-facing operations where you need to call the API directly from the frontend.

## What You Can Do With Client Tokens

Client tokens support operational API requests:

- Orders
- Payments
- Transactions
- Tips
- Reporting
- Branding
- Receipts

> **Note:** Client tokens cannot perform administrative tasks like creating merchants, managing stores, or other backend operations. Those still require full API credentials.

## Create a Token

Generate a token by sending a `POST` request with your auth provider credentials.

```
POST /partners/:partnerId/token
```

### Request

```json
{
  "providerId": "YOUR_PROVIDER_ID",
  "providerCertificate": "YOUR_PROVIDER_CERTIFICATE",
  "externalUserId": "user_12345"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `providerId` | string | Yes | Provider ID of the auth provider |
| `providerCertificate` | string | Yes | Certificate of the auth provider |
| `externalUserId` | string | Yes | Unique identifier for the user (e.g., a customer ID from your system) |
| `email` | string | No | Email address of the user |

> **Note:** To get your `providerId` and `providerCertificate`, contact [integrations@surfboard.se](mailto:integrations@surfboard.se) or reach out via Slack.

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "validUntil": "3600",
  "status": "SUCCESS",
  "message": "Token created successfully"
}
```

The `validUntil` field indicates the token's validity period in seconds. When a token expires, generate a new one.

## Using Client Tokens

Include the token in the `Authorization` header as a Bearer token:

```
Authorization: Bearer <YOUR_TOKEN>
```

### Example: Initiate a Payment

```bash
curl -X POST YOUR_API_URL/payments \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <YOUR_TOKEN>' \
  -d '{
    "orderId": "o_RelSnor1A6gqgKzZxrbM7",
    "paymentMethod": "CARD"
  }'
```

## Token Lifecycle

1. **Generate** a token from your backend using full API credentials
2. **Pass** the token to your frontend application
3. **Use** the token for client-side API calls
4. **Refresh** the token when it expires by generating a new one from your backend

Keep your `API-KEY` and `API-SECRET` on the server side. Only the generated token should reach the client.