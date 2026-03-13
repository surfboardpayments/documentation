# Move Terminal

## Overview
Use this API to reassign a hardware terminal to another merchant. This is limited to partners who handle their own storage and deal with terminals in bulk.

## Prerequisites
- Partner account with access to the Terminals API.
- API Key and API Secret are required for authentication.
- The target merchant ID must be a valid and existing merchant ID.
- The terminal serial number must exist and be associated with the partner making the request.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/terminals/:terminalSerialNo/move
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| targetMerchantId | String | Yes | Target Merchant ID to which the terminal needs to be assigned to. |

### Request Example
```json
{
  "targetMerchantId":"81fa6b2d8d5dc8040e"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| message | string | A message that describes the status of the move terminal request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Changed merchant for terminal successfully"
}
```

## Error Responses

### Possible Errors
There is no error information provided in the source JSON. Add error response examples and descriptions here if available.

## Notes
- The `partnerId` and `terminalSerialNo` must be replaced with the actual partner ID and terminal serial number in the URL path.
- Ensure that the API Key and API Secret are correctly set in the headers for proper authentication.

---
