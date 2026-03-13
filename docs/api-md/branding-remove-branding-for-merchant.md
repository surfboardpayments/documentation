# Remove Branding for Merchant

## Overview
Removes the existing branding configuration at the merchant level.

## Prerequisites
- A valid `merchantId` is required.
- Authentication is required via API Key and Secret.
- The merchant must have existing branding configurations.

## Request

### HTTP Method and URL
```
DELETE /merchants/:merchantId/branding
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// No request body required for DELETE
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | string | A message describing the outcome of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Configuration deleted successfully for id [8113d3f8403b380409] and type MERCHANT"
}
```

## Error Responses

### Possible Errors

#### *No error responses were specified in the provided JSON.*

## Notes
- The `:merchantId` in the path is a placeholder. Replace it with the actual merchant ID for which you want to remove branding.
- Ensure you have the correct `API-KEY`, `API-SECRET`, and `MERCHANT-ID` in the headers.
---
