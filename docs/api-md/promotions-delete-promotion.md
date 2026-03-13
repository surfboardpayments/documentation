# Delete Promotion

## Overview
The Delete Promotion by ID API allows users to remove a specific promotion by its unique promotion ID. This API permanently deletes the promotion and its associated data, ensuring that it is no longer active or visible.

## Prerequisites
- A valid merchant ID (`mId`).
- A valid store ID (`sId`) associated with the merchant.
- A valid promotion ID (`promotionId`).
- API Key and Secret authentication.

## Request

### HTTP Method and URL
```
DELETE /merchants/:mId/stores/:sId/promotions/:promotionId
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
//No request body is required for DELETE requests
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Promotion Deleted Successfully"
}
```

## Error Responses

### Possible Errors

#### *Currently Unavailable* - Coming Soon
This API is not yet implemented and is marked as "comingSoon": true in the original API definition.

**Description:** The endpoint is not yet available.  Please check back later.

## Notes
This API is marked as "comingSoon" and is currently unavailable. Ensure that you have the correct merchant ID, store ID, and promotion ID before attempting to use this endpoint once it is released.

---
