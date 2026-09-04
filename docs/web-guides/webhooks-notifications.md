# Webhooks

Receive real-time event notifications via webhooks. Subscribe to order, payment, logistics, and merchant application events with automatic retries and signature verification.

Source: https://www.surfboardpayments.com/developers/guides/webhooks-notifications
Category: online
Tags: Online, API, Webhooks, Events

---
## Overview

Webhooks enable you to receive real-time notifications for payment-related events in Surfboard, eliminating the need for repeated polling of the Surfboard APIs. When an event occurs, Surfboard sends an HTTP `POST` request to a URL on your server with the event details in the request body. All webhook messages include a signature for authenticity verification.

Surfboard supports two webhook mechanisms:

1. **Console webhooks:** Persistent, account-level subscriptions configured in the Surfboard Console. Support retries, failure alerts, and signature verification.
2. **Callback URL (per-order webhook):** A dynamic webhook URL set per order via `controlFunctions.callBackUrl`. Useful for order-level status updates during checkout.

Webhooks are also offered alongside other integration methods such as SSE (Server Sent Events) and event bus-based solutions (Kafka, Azure Event Stream, Google Pub/Sub, etc.).

## Available Events

You can subscribe to the following event categories to receive real-time updates within your platform.

### Order and Payment Events

Order and payment events provide real-time updates on order status and payment flow. These notifications help track orders, detect issues, and improve the checkout experience.

- **Order Updated** -- The order has been modified (e.g. order lines changed).
- **Order Payment Initiated** -- A payment attempt has started for the order.
- **Order Payment Processed** -- The payment is being processed by the payment provider.
- **Order Payment Completed** -- The payment has been successfully completed.
- **Order Payment Failed** -- The payment attempt has failed.
- **Order Payment Cancelled** -- The payment has been cancelled.
- **Order Cancelled** -- The entire order has been cancelled.
- **Order Customer Identity** -- A customer taps their card on the terminal, enabling you to identify the customer during a transaction and personalize the experience. Event type: `order.customer.identify`.
- **Order Terminal Event** -- Triggered for every state the terminal undergoes during a transaction (e.g. tip selection, card presented, PIN entry, authorizing). Also covers online terminal states such as page loaded, wallet SDK mounted, and payment initiated. Event type: `order.terminal.event`.

### Logistics Events

Logistics events notify you about updates on shipments, including terminals and accessories. These events help track order progress from placement to delivery.

- **Logistics Order Update** -- A logistics shipment status has changed.

### Merchant Application Events

Merchant application events provide updates during the onboarding process, from application creation to approval. These notifications help ensure smooth and timely onboarding for merchants.

- **Application Initiated** -- A new merchant application has been created.
- **Application Submitted** -- The application has been submitted for review.
- **Application Signed** -- The application has been signed by the merchant.
- **Application Started** -- Processing of the application has begun.
- **Application Pending Merchant Information** -- Additional information is required from the merchant.
- **Application Completed** -- The application review is complete.
- **Application Merchant Created** -- The merchant account has been created.
- **Application Expired** -- The application has expired.
- **Application Rejected** -- The application has been rejected.

## Event Payload Details

### Order Customer Identity

This event is triggered when a customer taps their card on the terminal, before the order is finalized or payment is processed. It enables customer identification early in the transaction flow.

**Event type:** `order.customer.identify`

**Payload example:**

```json
{
  "eventType": "order.customer.identify",
  "metadata": {
    "eventId": "832cf9fe1806581dff",
    "created": 1747553660038,
    "retryAttempt": 0,
    "webhookEventId": "81a214e74b107801ff"
  },
  "data": {
    "orderId": "832cf9f93d2fd0410b",
    "cardId": "c550c29e80908c887a"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `data.orderId` | string | Unique identifier for the order. |
| `data.cardId` | string | Tokenized identifier for the customer's card, used to recognize or link the customer to the order. |

> **Note:** The `cardId` is a tokenized representation and should be treated as sensitive data.

### Order Terminal Event

This event is triggered for every state the terminal undergoes during a transaction, including stages like tip selection, card presentation, PIN entry, authorization, and completion.

**Event type:** `order.terminal.event`

**Payload example:**

```json
{
  "eventType": "order.terminal.event",
  "metadata": {
    "eventId": "81a214e74b107801ff",
    "created": 1695793998732,
    "retryAttempt": 0,
    "webhookEventId": "81a214e7455ed01cff"
  },
  "data": {
    "orderId": "81b5f2624b16e0080b",
    "merchantId": "8248db4c5c8dd0130e",
    "paymentId": "81b5f26215e9583a06",
    "terminalTransactionStatus": "STARTED",
    "orderStatus": "PAYMENT_INITIATED"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `data.orderId` | string | Unique identifier for the order. |
| `data.merchantId` | string | Unique identifier of the merchant. |
| `data.paymentId` | string | Unique identifier for the payment. |
| `data.terminalTransactionStatus` | string | Current terminal state (see table below). |
| `data.orderStatus` | string | Current order status. |
| `data.metadata` | object | Optional metadata passed with the order creation. |

**Terminal transaction statuses:**

| Status | Description |
|--------|-------------|
| `STARTED` | Transaction initiated on the terminal. |
| `SELECT_TIP` | Tip selection screen displayed. |
| `AWAITING_CARD` | Waiting for card tap/insert. |
| `CARD_PRESENTED` | Customer has presented card. |
| `SELECT_APPLICATION` | Card has multiple applications; selection required. |
| `ENTER_PIN` | Customer needs to enter PIN. |
| `WRONG_PIN` | Wrong PIN entered. |
| `AUTHORIZING` | Payment authorization initiated. |
| `SUBMITTED` | Authorization submitted to the backend. |
| `AUTHORIZED` | Authorization complete. |
| `PAGE_LOADED` | Online only -- payment page fully loaded. |
| `SECURE_CHANNEL_INITIALISED` | Online only -- page ready for card details. |
| `GOOGLE_PAY_MOUNTED` | Online only -- Google Pay SDK mounted. |
| `APPLE_PAY_MOUNTED` | Online only -- Apple Pay SDK mounted. |
| `CUSTOMER_INTERACTION_IN_FORM` | Online only -- customer started entering information. |
| `CARD_PAYMENT_INITIATED` | Online only -- card payment initiated. |
| `APPLE_PAY_ATTEMPT_INITIATED` | Online only -- Apple Pay attempt initiated. |
| `GOOGLE_PAY_ATTEMPT_INITIATED` | Online only -- Google Pay attempt initiated. |
| `APPLE_PAY_PAYMENT_INITIATED` | Online only -- Apple Pay payment process initiated. |
| `GOOGLE_PAY_PAYMENT_INITIATED` | Online only -- Google Pay payment initiated. |

## Getting Started

To set up webhooks via the Surfboard Console:

1. Log in to the [Surfboard Developer Portal](https://developers.surfboardpayments.com).
2. Click **Add new Webhook**.
3. Enter a name and the URL of your webhook endpoint.
4. Enter an email address to receive notifications in case of webhook failures.
5. Choose which events you would like to receive.
6. Save the **webhook secret** that is displayed. This secret is used to verify that messages originate from Surfboard. It is only shown once -- store it securely.
7. Click **Test webhooks** to send a test notification to your endpoint and confirm it is working.

> **Note:** You can add multiple webhooks to listen to different events. You can also customise your URLs so that each endpoint receives only specific events -- useful for microservice or service-oriented architectures.

## Testing Webhooks

When you create or test a webhook in the Console, Surfboard sends a test message to verify your endpoint is reachable. The test message has the following structure:

```json
{
  "eventType": "test.webhook",
  "metadata": {
    "eventId": "string",
    "created": 1234567890,
    "retryAttempt": 0,
    "webhookEventId": "string"
  }
}
```

Your endpoint should return a `200` status code to acknowledge receipt.

## Callback URL (Per-Order Webhook)

In addition to Console webhooks, you can set a per-order callback URL when creating an order. This is useful for receiving status updates for a specific order during checkout.

Set `controlFunctions.callBackUrl` in the [Create Order API](https://developers.surfboardpayments.com/api/orders) request:

```json
POST /orders
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [ ... ],
  "controlFunctions": {
    "callBackUrl": "https://your-server.com/webhooks/payments",
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD"
    }
  }
}
```

> **Note:** Retries and alert emails are not supported for callback URL webhooks. The validation process is the same as regular webhooks -- you can obtain the webhook certificate for signature validation from the [Surfboard Developer Portal](https://developers.surfboardpayments.com).

## Handling Duplicate Deliveries

> **Info:** Surfboard guarantees **at-least-once delivery** for webhook callbacks. Because the system operates in a distributed multi-cloud environment, your endpoint may receive duplicate notifications for the same event. Surfboard performs deduplication on its side, but you must also handle duplicates on yours.

Use the combination of `orderId` and `paymentId` as your idempotency key. When you receive a callback, update the payment status to the value in the payload rather than applying it as an incremental state change.

**Important:** Due to network conditions, callbacks may arrive out of order. Once a payment reaches a terminal state -- `PAYMENT_COMPLETED`, `PAYMENT_FAILED`, or `PAYMENT_CANCELLED` -- do not overwrite it with an earlier status update. Your implementation should treat these three statuses as final and ignore any subsequent callbacks that would move the payment to a non-terminal state.

## Handling Failures and Retries

### Retry Logic

When a webhook delivery fails (your endpoint does not return a `200` status code), Surfboard retries automatically:

- **Attempts:** Up to 3 total delivery attempts.
- **First retry:** 5 minutes after the initial failure.
- **Second retry:** 10 minutes after the first retry.

### Failure Alerts and Automatic Disabling

- An **alert email** is sent on the first delivery failure.
- If the endpoint continues to fail, subsequent alerts are sent every 24 hours for up to 7 days.
- After 7 days of continuous failure with no action taken, the webhook is **automatically disabled**.
- To re-enable a disabled webhook, fix the underlying issue and re-run **Test Webhook** in the Console.

### Failures on Surfboard's Side

Surfboard guarantees to deliver events at least once. If Surfboard experiences an outage, all queued events are republished once the servers recover. Ensure your system can handle a burst of incoming events in this scenario.

> **Tip:** As a safety net for payment events, perform a status query via the API if you have not received a webhook within 60 seconds of initiating a payment. Do not rely solely on webhooks for critical payment status confirmation.

## Verifying Webhook Signatures

Every webhook event is signed using the secret key provided when you created the webhook. The signature is included in the `x-webhook-signature` header of the `POST` request. Always validate this signature to confirm that the message originates from Surfboard.

The signature is an HMAC-SHA512 hash of the JSON request body, encoded as Base64. Below are examples in several languages:

### TypeScript

```typescript
import { createHmac } from 'node:crypto';

function generateHMACSignature(certificate: string, message: string): string {
  return createHmac('sha512', certificate)
    .update(message)
    .digest()
    .toString('base64');
}

// Verify incoming webhook
function verifyWebhook(secret: string, body: string, receivedSignature: string): boolean {
  const expectedSignature = generateHMACSignature(secret, body);
  return expectedSignature === receivedSignature;
}
```

### PHP

```php
<?php

function generateHMACSignature($certificate, $message) {
    return base64_encode(hash_hmac('sha512', $message, $certificate, true));
}

// Verify incoming webhook
$certificate = 'YOUR_WEBHOOK_SECRET';
$body = file_get_contents('php://input');
$receivedSignature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'];

$expectedSignature = generateHMACSignature($certificate, $body);

if ($expectedSignature === $receivedSignature) {
    // Signature is valid
    http_response_code(200);
} else {
    // Signature mismatch -- reject the request
    http_response_code(401);
}
```

### Java

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class WebhookVerifier {

    public static String generateHMACSignature(String certificate, String message) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(
                certificate.getBytes(StandardCharsets.UTF_8), "HmacSHA512"
            );
            hmac.init(secretKey);
            byte[] hash = hmac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate HMAC signature", e);
        }
    }
}
```

### .NET

```csharp
using System;
using System.Security.Cryptography;
using System.Text;

public static class WebhookVerifier
{
    public static string GenerateHMACSignature(string certificate, string message)
    {
        using (HMACSHA512 hmac = new HMACSHA512(Encoding.UTF8.GetBytes(certificate)))
        {
            byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
            return Convert.ToBase64String(hash);
        }
    }
}
```

### Python

```python
import base64
import hashlib
import hmac

def generate_hmac_signature(certificate, message):
    signature = hmac.new(certificate.encode(), message.encode(), hashlib.sha512)
    return base64.b64encode(signature.digest()).decode()
```

### Go

```go
package main

import (
    "crypto/hmac"
    "crypto/sha512"
    "encoding/base64"
)

func generateHMACSignature(certificate, message string) string {
    key := []byte(certificate)
    h := hmac.New(sha512.New, key)
    h.Write([]byte(message))
    return base64.StdEncoding.EncodeToString(h.Sum(nil))
}
```

## Best Practices

- **Return 200 quickly.** Process webhook payloads asynchronously. Return a `200` response before performing business logic to avoid timeouts and retries.
- **Always verify signatures.** Validate the `x-webhook-signature` header on every incoming webhook to confirm it originates from Surfboard.
- **Handle duplicates idempotently.** Use `orderId` + `paymentId` as your idempotency key and treat terminal payment statuses as final.
- **Plan for retries.** Your endpoint may receive the same event multiple times. Ensure your processing logic is idempotent.
- **Query on timeout.** If you have not received a payment event within 60 seconds, query the order status via the API as a fallback.
- **Use HTTPS.** Always use HTTPS URLs for webhook endpoints to protect data in transit.
- **Monitor your endpoints.** Watch for failure alert emails and resolve issues promptly to avoid your webhook being disabled after 7 days.

## Related Guides

- [Notification Subscriptions](/developers/guides/notification-subscriptions) -- Set up persistent email, Slack, and SFTP delivery for settlement reports and operational alerts.

## API Reference

| Action | Method | Endpoint |
|--------|--------|----------|
| Set per-order webhook | POST | `/orders` (via `controlFunctions.callBackUrl`) |
