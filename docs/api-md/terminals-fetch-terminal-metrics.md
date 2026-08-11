# Fetch Terminal Metrics

## Overview
Retrieves metric time-series data for a terminal, such as battery status and network strength. Use this API to monitor the health and connectivity of a terminal over time. You can optionally filter the metrics by event type and date range.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId/metrics
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminalId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event` | `string` | No | Metric event type to filter by. Must be one of the accepted values: BATTERY_STATUS, NETWORK_STRENGTH, AGGREGATED_BATTERY_PERCENTAGE, AGGREGATED_CHARGING_STATE, AGGREGATED_POWER_SOURCE, AGGREGATED_GSM_CONNECTION_TYPE, AGGREGATED_GSM_SIGNAL_STRENGTH, AGGREGATED_WIFI_SIGNAL_STRENGTH or AGGREGATED_NETWORK_TYPE. |
| `queryDates` | `string` | No | One or more dates to scope the metrics query. A single value is accepted and wrapped into an array. |

### Pagination

To filter the metrics, send in `event` and `queryDates` as query params. This endpoint is paginated. Send the `x-page-number` request header to page through the results (default 1). Each response returns the `x-total-items` header (total number of matching records) and the `x-page-number` header (the page that was served).

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |
| `x-page-number` | `1` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /terminals/:terminalId/metrics?event=value&queryDates=value
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `array` | List of terminal metric series, one per requested event. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the terminal the metric belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`event` | `string` | Metric event type of the series. |
| &nbsp;&nbsp;&nbsp;&nbsp;`data` | `object` | Metric data of the series. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`value` | `array` | Time-ordered list of metric samples. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`time` | `string` | Timestamp of the sample. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`value` | `string` | Value of the sample, which can be a string or a boolean. |
| `message` | `string` | Status message of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "terminalId": "81f878852b3a280904",
      "event": "BATTERY_STATUS",
      "data": {
        "value": [
          {
            "time": "2024-02-21T08:48:26.000Z",
            "value": "100"
          }
        ]
      }
    }
  ],
  "message": "Fetched terminal metrics successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `terminalId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
