---
title: "API Integration Basics"
description: "Understanding Surfboard Payments API fundamentals, headers, responses, and error handling."
category: "Integrations"
path: "/guides/online-payments/integrations/api-architecture.md"
---

# Surfboard API Architecture

This guide covers the key aspects of integrating with Surfboard APIs.

## Making API Calls

### Example API Request

Here's a quick example of initiating a payment:

```bash
curl -d '{
          "orderId": "o_RelSnor1A6gqgKzZxrbM7",
          "paymentMethod": "CARD"
         }
     -H 'Content-Type: application/json'
     -H 'API-KEY: YOUR_API_KEY'
     -H 'API-SECRET: YOUR_API_SECRET'
     -H 'MERCHANT-ID: MERCHANT_ID'
     YOUR_API_URL/payments
```

### Headers

Headers are **key-value pairs** that convey metadata, authentication details, and other information crucial for processing **requests** and **responses**.

Apart from the **`API_URL`**, you must provide the **`API-KEY`** and **`API-SECRET`** headers for all calls. The **`MERCHANT-ID`** is also significant for all partners offering a seamless payment solution to their merchants.

| **Header**   | **Value**        |
| ------------ | ---------------- |
| Content-Type | application/json |
| API-KEY      | YOUR_API_KEY     |
| API-SECRET   | YOUR_API_SECRET  |
| MERCHANT-ID  | YOUR_MERCHANT_ID |

### Data format

Surfboard currently offers **JSON** format as the only request/response markup. If you require other formats, please reach out to us at [**integrations@surfboard.se**](mailto:integrations@surfboard.se)

## Understanding API response

Here is a short example of a response:

```json

{
    "status" : "SUCCESS"
    "data"  : {...},
    "message": "Message related to the API call".
}

```

**Handle the response:** All API calls will return JSON, with containing the  **`status`**  and **`data`** properties.

The API response includes a **`status`** property indicating success or failure. Additional details like **`message`** might be included.

The message for the status will be as follows:

-   **`SUCCESS`**: The request was successful.
-   **`ERROR`**: The request failed.

Always decode the response in JSON and check the **`status`** for successful API calls.

### Errors

Here is an example of an error response:

```json
{
    "status": "ERROR",
    "message": "An Error occured here is the description"
}
```

For errors, the **`status`** property will contain ‘ERROR’ and the **`message`** property will display a message describing the error.

### HTTP status handling

HTTP statuses adhere to the  [**RFC 9110**](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes) standard. A 2XX HTTP status indicates a successful response, but you should also check the **`status`** attribute of the API response. If it is **ERROR**, refer to the **`message`** attribute for details on the error and its cause.

Below is a table of the most commonly received HTTP status codes from the Surfboard APIs. For a complete list of HTTP status codes, please refer to the [**RFC 9110**](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes) standard.

| **Response Code** | **Status** | **Meaning**                                                       |
| ----------------- | ---------- | ----------------------------------------------------------------- |
| 201/200           | SUCCESS    | Request sent successfully and processed successfully              |
| 201/200           | ERROR      | Request contains an error. Error details are found in the message |
| 400               | ERROR      | Malformed request                                                 |
| 404               | ERROR      | Incorrect URL                                                     |
| 401               | ERROR      | Unauthorized request                                              |
| 500               | ERROR      | Internal server error                                             |
| 502               | ERROR      | Bad gateway                                                       |

## Go live with your integration

To go live:
1. Complete certification process
2. Update test URL to live URL
3. Replace test credentials with live ones

{% docfooter relatedLinks="[{ title: 'APIs and Environments', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'Client Side Token', url: '/guides/online-payments/integrations/client-side-tokens' }]" /%}
