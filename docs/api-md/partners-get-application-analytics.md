# Get Application Analytics

## Overview
Retrieve aggregated merchant onboarding analytics for the partner, such as application counts by status, conversion and rejection rates, and merchants created. Filter by country, application type, or status group, choose a time frame, and group by dimensions like country or month for onboarding reporting.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/partner-analytics
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier of the partner to fetch onboarding analytics for. Supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `timeFrame` | `string` | No | Preset time window to aggregate over. Use CUSTOM together with dateFrom and dateTo for an explicit range. Possible values: `LAST_24_HOURS`, `LAST_7_DAYS`, `LAST_30_DAYS`, `LAST_90_DAYS`, `LAST_6_MONTHS`, `LAST_12_MONTHS`, `MONTH_TO_DATE`, `QUARTER_TO_DATE`, `YEAR_TO_DATE`, `CUSTOM`. |
| `dateFrom` | `string` | No | Start of a custom date range (ISO 8601). Used when timeFrame is CUSTOM. |
| `dateTo` | `string` | No | End of a custom date range (ISO 8601). Used when timeFrame is CUSTOM. |
| `groupBy` | `array` | No | One or more dimensions to group the results by. Possible values: `country`, `applicationType`, `statusGroup`, `day`, `week`, `month`, `quarter`, `year`. |
| `filters[countries]` | `array` | No | Return only applications for these countries (ISO 3166-1 alpha-2 codes). |
| `filters[applicationTypes]` | `array` | No | Return only applications of these types. Possible values: `ONBOARDING`, `RENEWAL`. |
| `filters[statusGroup]` | `string` | No | Return only applications in this status group. Possible values: `IN_PROGRESS`, `COMPLETED`, `FAILED`, `UNDER_REVIEW`. |
| `sortBy` | `string` | No | Field to sort the grouped rows by. Possible values: `totalApplications`, `totalCompleted`, `country`. |
| `sortOrder` | `string` | No | Sort direction for the results. Possible values: `ASC`, `DESC`. |
| `pageNumber` | `number` | No | Page of results to return. Overrides the x-page-number header when supplied. |
| `itemsPerPage` | `number` | No | Number of rows to return per page. |

### Pagination

Page through results with the `x-page-number` request header. The total number of matching rows is returned in the `x-total-items` response header. List filters use bracket notation, for example `filters[countries]=SE&filters[countries]=NO`.

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
GET /partners/:partnerId/partner-analytics?timeFrame=LAST_30_DAYS&groupBy=country&sortBy=totalApplications&sortOrder=DESC
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The aggregated onboarding analytics. |
| &nbsp;&nbsp;&nbsp;&nbsp;`applicationAnalyticsData` | `array` | The grouped analytics rows. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`country` | `string` | Country the row is grouped by. Present only when grouping by country. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`applicationType` | `string` | Application type the row is grouped by. Present only when grouping by application type. Possible values: `ONBOARDING`, `RENEWAL`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`statusGroup` | `string` | Status group the row is grouped by. Present only when grouping by status group. Possible values: `IN_PROGRESS`, `COMPLETED`, `FAILED`, `UNDER_REVIEW`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`timeSegment` | `string` | Time bucket the row is grouped by. Present only when grouping by a time dimension. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalApplications` | `number` | Total applications in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalInitiated` | `number` | Applications initiated but not yet submitted in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalExpired` | `number` | Applications that expired before completion in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalSubmitted` | `number` | Applications submitted for review in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalPending` | `number` | Applications awaiting further information in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalSigned` | `number` | Applications signed in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalRejected` | `number` | Applications rejected in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalCompleted` | `number` | Applications that completed onboarding in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalMerchantCreated` | `number` | Merchants created in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalServiceProviderCreated` | `number` | Service providers created in this bucket. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`conversionRate` | `number` | Share of applications that completed onboarding, as a percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`rejectionRate` | `number` | Share of applications that were rejected, as a percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`expirationRate` | `number` | Share of applications that expired, as a percentage. |
| &nbsp;&nbsp;&nbsp;&nbsp;`totalCount` | `number` | Total number of grouped rows across all pages. |
| &nbsp;&nbsp;&nbsp;&nbsp;`pageNumber` | `number` | The page of results returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;`itemsPerPage` | `number` | Number of rows returned per page. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationAnalyticsData": [
      {
        "country": "SE",
        "totalApplications": 84,
        "totalInitiated": 6,
        "totalExpired": 2,
        "totalSubmitted": 5,
        "totalPending": 3,
        "totalSigned": 9,
        "totalRejected": 1,
        "totalCompleted": 58,
        "totalMerchantCreated": 58,
        "totalServiceProviderCreated": 0,
        "conversionRate": 69.05,
        "rejectionRate": 1.19,
        "expirationRate": 2.38
      }
    ],
    "totalCount": 1,
    "pageNumber": 1,
    "itemsPerPage": 100
  },
  "message": "Application analytics fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch application analytics."
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
