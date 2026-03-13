```markdown
# Remove Branding for Store

## Overview
Removes the existing branding configuration at the store level.

## Prerequisites
- You must have a valid `merchantId` and `storeId`.
- You must have valid `API-KEY`, `API-SECRET`, and `MERCHANT-ID` to authenticate.
- No specific setup or configuration required beyond having branding configured at the store level to begin with.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/stores/:storeId/branding
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body required for DELETE
```

## Response

### Response Parameters
| Parameter | Type | Description |
|--------|-------|-------------|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Configuration deleted successfully for id [8113d3f8403b380409] and type STORE"
}
```

## Error Responses

### Possible Errors

#### ERROR - General Error (Specific error code not provided in the data)
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unspecified error occurred during the process. Check server logs for details.  Verify all prerequisites are met.

## Notes
- The `merchantId` and `storeId` parameters in the path are case-sensitive.
- Ensure that the `MERCHANT-ID` in the header matches the `merchantId` in the path.
- A successful response does not guarantee that branding was previously configured; it only indicates that the removal process completed successfully.  If no branding was set, the message will still indicate success.

---
