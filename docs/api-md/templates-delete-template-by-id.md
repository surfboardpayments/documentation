# Delete Template by ID

## Overview
Use this API to delete an existing template by Template ID.

## Prerequisites
- A valid `merchantId` and `sId` (Store ID).
- The `templateId` of the template you wish to delete.
- Authentication is required using API Key and API Secret.
- `MERCHANT-ID` header must be provided.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/stores/:sId/templates/:templateId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// No request body is needed for DELETE requests
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request.  Values: `SUCCESS`, `FAILURE`. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Template id [8271dfa5782e380148] deleted successfully"
}
```

## Error Responses

### Possible Errors

#### *Error responses are not defined in the provided JSON.*

## Notes
- Ensure the `templateId` exists before attempting to delete it. Deleting a non-existent template might not result in an explicit error but may return a success message without actually deleting anything.

---
