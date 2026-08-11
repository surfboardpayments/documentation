# Create Bin Range

## Overview
Create a new bin range together with the card-number sub-ranges it covers.

## Prerequisites
- An active partner account is required.
- Authentication is required using API Key and API Secret.

## Request

### HTTP Method and URL
```
POST /bin-ranges
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `description` | `string` | Yes | A description of the bin range. |
| `rangesIncluded` | `array` | Yes | The card-number sub-ranges covered by this bin range. |
| &nbsp;&nbsp;&nbsp;&nbsp;`start` | `string` | Yes | Inclusive start of the BIN sub-range. |
| &nbsp;&nbsp;&nbsp;&nbsp;`end` | `string` | Yes | Inclusive end of the BIN sub-range. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | Yes | A description of this sub-range. |

### Request Example
```json
{
  "description": "Visa consumer ranges",
  "rangesIncluded": [
    {
      "start": "400000",
      "end": "499999",
      "description": "Visa primary range"
    }
  ]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The created bin range. |
| &nbsp;&nbsp;&nbsp;&nbsp;`binRangeId` | `string` | Unique identifier of the created bin range. |
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
  "data": {
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
  },
  "message": "Bin range created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to create bin range"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

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

---
