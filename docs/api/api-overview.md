# Surfboard API: Essentials and Data Handling

This document outlines the foundational principles for integrating with and using the Surfboard APIs, covering authentication, data structures, error handling, and scalable data retrieval.

## 1. Platform Strategy and Overview

Our API architecture is built for **security, stability, and scale**. We enforce standard JSON formatting and utilize robust authentication headers (API-KEY and API-SECRET) to protect all transaction metadata. For large data sets, our **page-based pagination** system ensures efficient and controlled data retrieval, preventing system overload and guaranteeing quick access to financial reports. All partners must successfully complete a **certification process** before receiving live credentials, ensuring compliance and platform integrity.

## 2. API Integration Fundamentals

All requests and responses use the JSON format exclusively.

### Required Request Headers

All API calls must include these key-value pairs for authentication and context:

| Header | Value | Purpose |
| --- | --- | --- |
| **Content-Type** | `application/json` | Specifies the format of the request body. |
| **API-KEY** | `YOUR_API_KEY` | Public key for identification. (Must be provided for all calls.) |
| **API-SECRET** | `YOUR_API_SECRET` | Private secret for authentication. (Must be provided for all calls.) |
| **MERCHANT-ID** | `YOUR_MERCHANT_ID` | Identifies the merchant context for the call. |

### Example API Request

Here is how to initiate a payment using cURL:

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

### Understanding API Responses

Responses always adhere to a standard JSON envelope structure containing `status` and `data` properties.

```json

{
    "status" : "SUCCESS"
    "data"  : {...},
    "message": "Message related to the API call".
}

```

| `status` Value | Meaning | Action |
| --- | --- | --- |
| **SUCCESS** | Request was processed successfully. | Proceed to next step. |
| **ERROR** | Request failed (check HTTP status and `message`). | Debug based on `message` content. |

### Error Handling

Always check both the HTTP status code and the internal API `status` property.

| HTTP Status Code | API Status | Meaning |
| --- | --- | --- |
| 201/200 | SUCCESS | Successful request and processing. |
| 400 | ERROR | Malformed request (syntax issue). |
| 401 | ERROR | Unauthorized request (check API keys/secrets). |
| 404 | ERROR | Incorrect URL or resource not found. |
| 500/502 | ERROR | Internal server error. |

### Go-Live Requirements

To transition from testing to the live environment, you **must complete the certification process**. After certification, you will receive new production credentials (API-KEY and API-SECRET) and the production API URL. Replace all test credentials and URLs to go live.

## 3. Data Retrieval and Pagination

When retrieving lists of data (like transactions or reports), the API uses **page-based pagination** to ensure efficient data management.

### Key Principles

- **Sorting:** Data lists are always sorted from **newer to older** based on creation time.
- **Page Size:** The maximum number of items per page is **100**.
- **Total Count:** The total number of available items is returned in the response headers.

### Using Pagination

To retrieve data beyond the first 100 results, specify the desired page number in the header:

| Header | Value | Purpose |
| --- | --- | --- |
| **X-PAGE-NUMBER** | `2` | Requests the second page of data. |

If no page parameter is specified, the API defaults to returning page 1. Requesting a non-existent page will result in a SUCCESS status but an empty `data` array.

### Example Request with Pagination

```bash

curl  YOUR_API_URL/transactions
  -H 'Content-Type: application/json'
  -H 'API-KEY: YOUR_API_KEY'
  -H 'API-SECRET: YOUR_API_SECRET'
  -H 'MERCHANT-ID: YOUR_MERCHANT_ID'
  -H 'X-PAGE-NUMBER: 2'

```

The response headers and the body for a successful response is displayed below:

```bash

// Headers

< HTTP/2 200
< access-control-allow-origin: *
< content-security-policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
< content-type: application/json; charset=utf-8
< cross-origin-embedder-policy: require-corp
< cross-origin-opener-policy: same-origin
< cross-origin-resource-policy: same-origin
< date: Fri, 12 May 2023 11:35:59 GMT
< etag: W/"85c-qIPLYtEDOpsweKf2cIu6invWb/0"
< origin-agent-cluster: ?1
< referrer-policy: no-referrer
< strict-transport-security: max-age=15552000; includeSubDomains
< x-content-type-options: nosniff
< x-dns-prefetch-control: off
< x-download-options: noopen
< x-frame-options: SAMEORIGIN
< x-permitted-cross-domain-policies: none
< x-xss-protection: 0
< content-length: 2140
< x-page-number: 2
< x-total-items: 230

// JSON BODY
{
 "status": "SUCCESS",
 "data": [
  {...},
  {...},
    {...},
    .
    .
    .
 ],
 "message": "Fetched transactions"
}

```

For cases where the page number exceeds the total available pages, the response structure would be :

```bash

// Headers

< HTTP/2 200
< access-control-allow-origin: *
< content-security-policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
< content-type: application/json; charset=utf-8
< cross-origin-embedder-policy: require-corp
< cross-origin-opener-policy: same-origin
< cross-origin-resource-policy: same-origin
< date: Fri, 12 May 2023 11:35:59 GMT
< etag: W/"85c-qIPLYtEDOpsweKf2cIu6invWb/0"
< origin-agent-cluster: ?1
< referrer-policy: no-referrer
< strict-transport-security: max-age=15552000; includeSubDomains
< x-content-type-options: nosniff
< x-dns-prefetch-control: off
< x-download-options: noopen
< x-frame-options: SAMEORIGIN
< x-permitted-cross-domain-policies: none
< x-xss-protection: 0
< content-length: 2140
< x-page-number: 4
< x-total-items: 230

// JSON BODY
{
 "status": "SUCCESS",
 "data": [],
 "message": "No transactions available in the specified page"
}

```