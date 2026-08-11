---
title: "Pagination"
description: "Guide to implementing pagination in Surfboard Payments online API integrations."
category: "Integrations"
path: "/guides/online-payments/integrations/pagination.md"
---

# Pagination

Surfboard APIs provides page-based pagination, enabling efficient and controlled data retrieval. This is essential in scenarios where the API returns lists of data. Our APIs adheres to the following principles in all such scenarios:

- The list is always sorted from newer to older based on time of creation.
- Page size is always maintained at 100.
- The total number of items is available as a header in the response without affecting the API structure.

## Using pagination

To retrieve a specific page, include the desired page number as a **`page`** parameter in the request header. By default, the APIs return the first page if no **`page`** parameter is specified.

The response headers will indicate the total number of entries. If a non-existent page is requested, you will receive an empty array with status **`SUCCESS`** and a message. Here is an example of making a request with page number:

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


{% docfooter relatedLinks="[{ title: 'Surfboard APIs', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'API Architecture', url: '/guides/online-payments/integrations/api-architecture' },{ title: 'Platform Hierarchy', url: '/guides/online-payments/integrations/platform-structure' }]" /%}