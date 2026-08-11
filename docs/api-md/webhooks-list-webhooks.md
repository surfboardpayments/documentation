# List Webhooks

## Overview
Retrieve a paginated list of the webhooks configured on the authenticated account, including each webhook's URL, subscribed events, alert email, and whether it is active and has passed its delivery test. Send the `MERCHANT-ID` header to manage a specific merchant's webhooks; omit it to manage the partner's own webhooks.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
GET /webhooks
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `page` | `string` | No | Page of results to return. Defaults to the first page when omitted or not a number. |

### Pagination

Page through results with the `page` query parameter, for example `?page=2`. When omitted, the first `page` is returned.

### Headers
| Header | Value | Required |
|---|---|---|
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /webhooks?page=1
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The webhooks configured on the account for the current page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webhookId` | `string` | Unique identifier of the webhook. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webhookName` | `string` | The display name you gave the webhook. |
| &nbsp;&nbsp;&nbsp;&nbsp;`webhookUrl` | `string` | The HTTPS endpoint Surfboard delivers events to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`active` | `boolean` | Whether the webhook is currently active and receiving events. |
| &nbsp;&nbsp;&nbsp;&nbsp;`alertEmail` | `string` | Email address notified when webhook delivery repeatedly fails. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tested` | `boolean` | Whether the webhook has passed a delivery test against its endpoint. |
| &nbsp;&nbsp;&nbsp;&nbsp;`events` | `array` | The event types this webhook is subscribed to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | When the webhook was created, in ISO 8601 format. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "webhookId": "wh_9c1f2a7b40",
      "webhookName": "Order events",
      "webhookUrl": "https://example.com/surfboard/webhook",
      "active": true,
      "alertEmail": "integrations@surfboard.se",
      "tested": true,
      "events": [
        "PAYMENT_SUCCEEDED",
        "PAYMENT_FAILED"
      ],
      "createdAt": "2026-06-01T09:24:11.000Z"
    }
  ],
  "message": "Fetched all webhooks under merchant"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to get all webhooks. Please try again later"
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
