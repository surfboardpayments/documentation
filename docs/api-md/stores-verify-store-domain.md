```markdown
# Verify Store Domain

## Overview
Use this API to trigger a verify domain request with Surfboard.

## Prerequisites
- A valid `partnerId`, `merchantId`, and `storeId` are required.
- The store must exist.
- Authentication is required using `API-KEY` and `API-SECRET` headers.
- The merchant should be onboarded before creating a store.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants/:merchantId/stores/:storeId/verify
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| domainType | String | Yes | Specify the domain to be verified.  Must be one of the allowed values. |

#### Possible values for `domainType`
| Value | Description |
|---|---|
| MERCHANT_WEBSHOP_URL | Use this to verify the merchant webshop domain. |
| PAYMENT_PAGE_HOST_URL | To verify the payment page host domain use this. |

### Request Example
```json
{
  "domainType": "MERCHANT_WEBSHOP_URL"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| message | string | Message describing the status of domain verification of store. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Domain verification done successfully for store: 8254c42dc430e00e0f."
}
```

## Error Responses

### Possible Errors
There are no error responses in the original JSON data, but here are some common error scenarios

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid domainType provided."
}
```
**Description:** The provided `domainType` is not a valid value. Ensure it's one of the allowed values (MERCHANT_WEBSHOP_URL or PAYMENT_PAGE_HOST_URL).

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The provided API Key or Secret is invalid. Double-check your credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Store not found."
}
```
**Description:** The store with the specified `storeId` does not exist. Verify the `storeId`.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try again later. If the issue persists, contact support.

## Notes
- Ensure that the `MERCHANT-ID` header matches the `merchantId` in the URL path.
- The `domainType` field is case-sensitive and must match the allowed values exactly.
- Surfboard handles the domain verification process.
---
