# Remove Branding for Terminal

## Overview
Removes the existing branding configuration at the terminal level.

## Prerequisites
- You need a valid `merchantId`, `storeId`, and `terminalId`.
- Authentication is required via API Key and Secret.
- You need a pre-existing branding configuration to remove.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/stores/:storeId/terminals/:terminalId/branding
```

### Headers
| Header       | Value             | Required |
|--------------|-------------------|----------|
| Content-Type | application/json  | Yes      |
| API-KEY      | YOUR_API_KEY      | Yes      |
| API-SECRET   | YOUR_API_SECRET   | Yes      |
| MERCHANT-ID  | YOUR_MERCHANT_ID  | Yes      |

### Request Body Parameters
None. This is a DELETE request.

### Request Example
```json
// No request body is required for DELETE requests.
```

## Response

### Response Parameters
| Parameter | Type   | Description                                               |
|-----------|--------|-----------------------------------------------------------|
| status    | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message   | string | A message describing the outcome of the request.         |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Configuration deleted successfully for id [833b9e1cf983580704] and type TERMINAL"
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name
```json
{
  "status": "ERROR",
  "message": "TBD"
}
```
**Description:** Error details not explicitly provided in the input JSON. Will populate once available.

## Notes
- Ensure the `merchantId`, `storeId`, and `terminalId` are valid and correspond to the branding configuration you wish to remove.
- Missing or invalid credentials in the headers will result in authentication errors.

---
