---
title: "Webhooks"
description: "Guide to integrating webhooks for real-time payment event notifications in Surfboard Payments."
category: "Integrations"
path: "/guides/online-payments/integrations/webhooks.md"
---

# Webhooks

Webhooks enable you to receive real-time notifications and data updates for payment related events in Surfboard, eliminating the need for repeated requests to the Surfboard systems. The notification typically includes information about the event, such as the status of your onboarding, terminal logistics, and other payment related events. Your application can then process this information in real-time and display notifications or take any necessary action. Webhooks are offered along with other integration methods such as SSE (Server Sent Events) and other event bus-based solutions (Kafka, Azure Event Stream, Google Pub/Sub, etc.).

## List of Events

You can integrate the following events to receive real-time updates within your platform.

### Order and Payment Events

Order and payment events provide real-time updates on order status and payment flow. These notifications help track orders, detect issues, and improve the checkout experience.

Events for orders and payments include:

-   [Order Updated](/webhooks/orders#Order-Updated)
-   [Order Payment Initiated](/webhooks/orders#Order-Payment-Initiated)
-   [Order Payment Processed](/webhooks/orders#Order-Payment-Processed)
-   [Order Payment Completed](/webhooks/orders#Order-Payment-Completed)
-   [Order Payment Failed](/webhooks/orders#Order-Payment-Failed)
-   [Order Payment Cancelled](/webhooks/orders#Order-Payment-Cancelled)
-   [Order Cancelled](/webhooks/orders#Order-Cancelled)
-   [Order Terminal Event](/webhooks/orders#Order-Terminal-Event)

{% callout type="note" label="Note" %}
We also provide a dynamic URL flow for receiving order events. To enable this, specify your Webhook URL in the `controlFunctions.callBackUrl` field of the [createOrderRequest](/api/orders#Create-New-Order) API. Please note that retries and alert emails are not supported in this mode.

The validation process is the same as regular webhooks. You can obtain the webhook certificate for dynamic webhook validation from the [Surfboard Console Dashboard](/console/dashboard).
{% /callout %}

### Logistics Events

Logistics events notify you about updates on shipments, including terminals and accessories. These events help track order progress from placement to delivery.

Logistics events include:

-   [Logistics Order Update](/webhooks/logistics#Logistics-Order-Update)

### Merchant Application Events

Merchant application events provide updates during the onboarding process, from application creation to approval. These notifications help ensure smooth and timely onboarding for merchants.

Merchant application events include:

-   [Application Initiated](/webhooks/merchants#Application-Initiated)
-   [Application Submitted](/webhooks/merchants#Application-Submitted)
-   [Application Signed](/webhooks/merchants#Application-Signed)
-   [Application Started](/webhooks/merchants#Application-Started)
-   [Application Pending Merchant Information](/webhooks/merchants#Application-Pending-Merchant-Information)
-   [Application Completed](/webhooks/merchants#Application-Completed)
-   [Application Merchant Created](/webhooks/merchants#Application-Merchant-Created)
-   [Application Expired](/webhooks/merchants#Application-Expired)
-   [Application Rejected](/webhooks/merchants#Application-Rejected)

## How our webhooks work?

When an event occurs, Surfboard sends an HTTP **`POST`** request to a URL on your server. The details of the event are included in the request body. All webhook messages will also include a signature parameter to authenticate the event.

To effectively use webhooks, it is important to identify each event and understand the parameters and values communicated in its responses. This way, you can make sure that your application can handle and respond to each event appropriately.

## Getting Started with Surfboard Webhooks

To get started with webhooks

1. Log in to the console.
2. Click on **Add new Webhook**.
3. Enter the name and URL.
4. Enter an email address to receive notifications in case of webhook failures.
5. Choose which events you would like to receive.
6. You will receive a webhook secret, which should be used to verify that messages originate from Surfboard, ensuring their authenticity. Please note that the webhook secret is displayed only once and should be saved securely for future use.
7. Click **Test webhooks** to receive a test notification on your server.

**Note**: You can add multiple webhooks to listen to events.

## Webhook Testing

To ensure the successful activation of a webhook and to prevent potential problems, we have implemented a test step that sends a test message to the webhook endpoint. The structure of the test message is as follows:

```

{
    eventType: 'test.webhook',
    metadata: {
        eventId: eventId,
        created: Date.now(),
        retryAttempt: 0,
        webhookEventId: webhookEventId
    },
}

```

## **Handling Failures and Retries**

### Retry Logic

- **First Retry**: Occurs 5 seconds after a failed attempt.
- **Subsequent Retries**: Up to 3 retries, spaced 30 seconds apart. i.e., 1 × 30, 2 × 30, 3 × 30.

### Failure Alerts and Disabling

- An **alert email** is sent on the first failure.
- Subsequent alerts are sent every 24 hours for up to 7 days after which webhook will be disabled.

Please note that if no action is taken, the webhook is disabled until, you re-run the **Test Webhook** in the console. The disabling of the webhook happens after 7 days.

**Failure on Surfboard's end:** Surfboard guarantees to deliver the event at least once. Surfboard servers will republish all queued events once the servers are back up. In such cases, it must also be ensured that your system is equipped to handle multiple incoming events.

However, it is the responsibility of the integrating partner to check the status manually, especially in the case of payments. A good rule of thumb in the case of payments is to perform a query if an event is not received within 60 seconds. To get the status in failure scenarios, a request must be performed.

## Customising Webhook events

You can customise the URLs in such a way that each endpoint receives only specific events. This is useful in cases where you have a micro-service or Service-Oriented Architecture (SOA) setup.

## Calculating the Signature of the Webhook

Each webhook event is signed by the secret key that is given to you as part of creating the webhook. The signature is attached as part of the **`POST`** request under the **`x-webhook-signature`** header. On the recieving end, it is important that this signature is validated.

To validate the signature, you can follow the algorithm outlined below:

-   Take the body of the request as a string. Please note that if you use a serialisation/deserialisation framework, the hash checking should happen before the JSON is serialised.
-   Perform a HMAC operation on it using the secret key provided.
-   Check if the HMAC matches with the secret key.

This ensures that the message is not tampered with and that it originates from Surfboard.

The following are examples of how to calculate the signature of the webhook:

{% requestresponse method="POST" requests=[{language: "TYPESCRIPT", code: "import { createHmac } from 'node:crypto';\n\nconst message = {\n    eventType: 'test.webhook',\n    metadata: {\n        eventId: eventId,\n        created: Date.now(),\n        retryAttempt: 0,\n    },\n}\n\ngenerateHMACSignature(certificate: string, message: string) {\n        return createHmac('sha512', certificate).update(message).digest().toString('base64');\n}\n\nconst signature = generateHMACSignature('YOUR_WEBHOOK_CERTIFICATE', JSON.stringify(message));\n\n"},{language: "PHP", code: "\n<?php\n\n$jsonMessage = '{\"eventType\":\"test.webhook\",\"metadata\":{\"eventId\":\"some_event_id\",\"created\":' . (time() * 1000) . ',\"retryAttempt\":0}}';\n\nfunction generateHMACSignature($certificate, $message) {\n    return base64_encode(hash_hmac('sha512', $message, $certificate, true));\n}\n\n$certificate = 'YOUR_WEBHOOK_CERTIFICATE';\n$signature = generateHMACSignature($certificate, $jsonMessage);\n\necho $signature;\n\n"}, {language: "JAVA", code: "import javax.crypto.Mac;\nimport javax.crypto.spec.SecretKeySpec;\nimport java.nio.charset.StandardCharsets;\nimport java.util.Base64;\n\npublic class HMACSHA512 {\n\n    public static void main(String[] args) {\n        String certificate = \"YOUR_WEBHOOK_CERTIFICATE\";\n        String jsonMessage = \"{\\\"eventType\\\":\\\"test.webhook\\\",\\\"metadata\\\":{\\\"eventId\\\":\\\"some_event_id\\\",\\\"created\\\":\" + (System.currentTimeMillis()) + \",\\\"retryAttempt\\\":0}}\";\n\n        String signature = generateHMACSignature(certificate, jsonMessage);\n        System.out.println(signature);\n    }\n\n    public static String generateHMACSignature(String certificate, String message) {\n        try {\n            Mac hmac = Mac.getInstance(\"HmacSHA512\");\n            SecretKeySpec secretKey = new SecretKeySpec(certificate.getBytes(StandardCharsets.UTF_8), \"HmacSHA512\");\n            hmac.init(secretKey);\n            byte[] hash = hmac.doFinal(message.getBytes(StandardCharsets.UTF_8));\n            return Base64.getEncoder().encodeToString(hash);\n        } catch (Exception e) {\n            throw new RuntimeException(\"Failed to generate HMAC signature\", e);\n        }\n    }\n}\n\n"}, {language: ".NET", code: "\nusing System;\nusing System.Security.Cryptography;\nusing System.Text;\n\nnamespace HMACSHA512Example\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            string certificate = \"YOUR_WEBHOOK_CERTIFICATE\";\n            string jsonMessage = \"{\\\"eventType\\\":\\\"test.webhook\\\",\\\"metadata\\\":{\\\"eventId\\\":\\\"some_event_id\\\",\\\"created\\\":\" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + \",\\\"retryAttempt\\\":0}}\";\n\n            string signature = GenerateHMACSignature(certificate, jsonMessage);\n            Console.WriteLine(signature);\n        }\n\n        public static string GenerateHMACSignature(string certificate, string message)\n        {\n            using (HMACSHA512 hmac = new HMACSHA512(Encoding.UTF8.GetBytes(certificate)))\n            {\n                byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));\n                return Convert.ToBase64String(hash);\n            }\n        }\n    }\n}\n\n"}, {language: "PYTHON", code: "import base64\nimport hashlib\nimport hmac\nimport time\n\ndef generate_hmac_signature(certificate, message):\n    signature = hmac.new(certificate.encode(), message.encode(), hashlib.sha512)\n    return base64.b64encode(signature.digest()).decode()\n\ncertificate = \"YOUR_WEBHOOK_CERTIFICATE\"\njson_message = (\n    f'{{\"eventType\":\"test.webhook\",\"metadata\":{{\"eventId\":\"some_event_id\",\"created\":{int(time.time() * 1000)},\"retryAttempt\":0}}}}')\n\nsignature = generate_hmac_signature(certificate, json_message)\nprint(signature)\n\n"}, {language: "GO", code: "package main\n\nimport (\n    \"crypto/hmac\"\n    \"crypto/sha512\"\n    \"encoding/base64\"\n    \"fmt\"\n    \"strconv\"\n    \"time\"\n)\n\nfunc generateHMACSignature(certificate, message string) string {\n    key := []byte(certificate)\n    h := hmac.New(sha512.New, key)\n    h.Write([]byte(message))\n    return base64.StdEncoding.EncodeToString(h.Sum(nil))\n}\n\nfunc main() {\n    certificate := \"YOUR_WEBHOOK_CERTIFICATE\"\n    jsonMessage := fmt.Sprintf(`{\"eventType\":\"test.webhook\",\"metadata\":{\"eventId\":\"some_event_id\",\"created\":%d,\"retryAttempt\":0}}`, time.Now().UnixNano()/int64(time.Millisecond))\n\n    signature := generateHMACSignature(certificate, jsonMessage)\n    fmt.Println(signature)\n}\n\n"} ] languages=["TYPESCRIPT", "PHP", "JAVA", ".NET", "PYTHON", "GO" ] /%}

{% docfooter relatedLinks="[{ title: 'Surfboard APIs and Environment', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'API Architecture', url: '/guides/online-payments/integrations/api-architecture' },{ title: 'Platform Hierarchy', url: '/guides/online-payments/integrations/platform-structure' }]" /%}
