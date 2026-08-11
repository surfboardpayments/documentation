# List Bin Ranges

## Overview
Fetch a paginated list of the partner's bin ranges.

## Prerequisites
- An active partner account is required.
- Authentication is required using API Key and API Secret.

## Request

### HTTP Method and URL
```
GET /bin-ranges
```

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `includeInactive` | `boolean` | No | Whether inactive bin ranges are included in the results. |

### Pagination

To page through results send the requested page in the `x-page-number` header.

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
GET /bin-ranges?includeInactive=false
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The list of bin ranges for the current page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`binRangeId` | `string` | Unique identifier of the bin range. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Identifier of the partner that owns the bin range. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Description supplied when the bin range was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`rangesIncluded` | `array` | The card-number sub-ranges stored for this bin range. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`start` | `string` | Inclusive start of the BIN sub-range. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`end` | `string` | Inclusive end of the BIN sub-range. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | A description of this sub-range. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "binRangeId": "br_81efdbe975ebc800",
      "partnerId": "p_5f2c1a9b3d",
      "description": "Visa consumer ranges",
      "rangesIncluded": [
        {
          "start": "400000",
          "end": "499999",
          "description": "Visa primary range"
        }
      ]
    }
  ],
  "message": "Bin ranges fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to fetch bin ranges"
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Authentication failed"
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
- This endpoint is paginated; see the Pagination section for how to page through the results.

---
