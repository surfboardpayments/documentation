# Remove Branding for Partner

## Overview
Removes the existing branding configuration at the partner level.

## Prerequisites
- Partner ID is required.
- Authentication via API Key and API Secret is required.
- Ensure a branding configuration exists for the specified partner before attempting to remove it.

## Request

### HTTP Method and URL
```
DELETE /partners/:partnerId/branding
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// No request body is required for this DELETE operation
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Configuration deleted successfully for id [8113d3f8403b380409] and type PARTNER"
}
```

## Error Responses

*No error responses provided in the JSON data.*

## Notes
- Replacing `:partnerId` in the URL with the appropriate ID is essential for targeting the correct partner's branding configuration.
- Ensure the API Key and API Secret have the necessary permissions to delete branding configurations.
---
