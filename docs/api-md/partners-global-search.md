# Global Search

## Overview
Run a free-text search across everything the partner owns — merchants, stores, terminals, applications, and companies — and get back the matching records grouped by type, along with the fields that matched. Narrow the search with filters such as merchant, store, or status.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/global-search
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner whose records are searched. Supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | `string` | Yes | The text to search the partner's records for, such as a merchant name, store name, or company. |
| `pageNumber` | `number` | No | Page of results to return. Overrides the x-page-number header when supplied. |
| `merchantId` | `string` | No | Return only records belonging to this merchant. Accepts a single value or a comma-separated list. |
| `merchantType` | `string` | No | Return only records for merchants of this type. Accepts a single value or a comma-separated list. |
| `storeId` | `string` | No | Return only records belonging to this store. Accepts a single value or a comma-separated list. |
| `storeStatus` | `string` | No | Return only stores in this status. Accepts a single value or a comma-separated list. |
| `terminalStatus` | `string` | No | Return only terminals in this status. Accepts a single value or a comma-separated list. |
| `applicationStatus` | `string` | No | Return only applications in this status. Accepts a single value or a comma-separated list. |
| `applicationType` | `string` | No | Return only applications of this type. Accepts a single value or a comma-separated list. |
| `type` | `string` | No | Return only records of this document type, for example MERCHANT or STORE. Accepts a single value or a comma-separated list. |

### Pagination

Page through results with the `x-page-number` request header, or supply `pageNumber` as a `query` parameter. The total number of matches is returned in the `x-total-items` response header.

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/global-search?query=Kaffebaren&type=MERCHANT&storeStatus=ACTIVE
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The search results. |
| &nbsp;&nbsp;&nbsp;&nbsp;`hits` | `array` | The matching records. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Identifier of the partner the matched record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the matched record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the store the matched record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`data` | `object` | The matched record's document fields. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | The kind of record that matched, for example MERCHANT, STORE, or COMPANY. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Identifier of the partner the record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant the record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the store the record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`companyId` | `string` | Identifier of the company the record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`pfAccountId` | `string` | Payment facilitator account identifier for the record. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Display name of the matched record. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Email associated with the matched record. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Status of the matched record, mirrored from its store status. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storeStatus` | `string` | Status of the store the record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantType` | `string` | Type of the merchant the record belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`matches` | `array` | The individual field matches for this record. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`field` | `string` | The document field that matched the search. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`matched` | `array` | The matched value or values for the field. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`snippet` | `string` | A snippet of text surrounding the match. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "hits": [
      {
        "partnerId": "pt_9c31a0f4b2",
        "merchantId": "m_5f2c1a9b3d",
        "storeId": "st_2a91",
        "data": {
          "type": "MERCHANT",
          "partnerId": "pt_9c31a0f4b2",
          "merchantId": "m_5f2c1a9b3d",
          "storeId": "st_2a91",
          "companyId": "co_71ad",
          "pfAccountId": "pf_88c2",
          "name": "Kaffebaren AB",
          "email": "hello@kaffebaren.se",
          "status": "ACTIVE",
          "storeStatus": "ACTIVE",
          "merchantType": "STANDARD"
        },
        "matches": [
          {
            "field": "name",
            "matched": [
              "Kaffebaren AB"
            ],
            "snippet": "…Kaffebaren AB…"
          }
        ]
      }
    ]
  },
  "message": "Global search results fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch global search results"
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- The `partnerId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
