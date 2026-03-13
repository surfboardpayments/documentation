# Update Merchant Details

## Overview
Updates the merchant details. You can use this API to edit the email address, merchant logo URL, and phone number of a merchant.

## Prerequisites
- Partner account with Surfboard
- Valid `partnerId` and `merchantId`
- API Key and API Secret for authentication
- `MERCHANT-ID` header set to the merchant's ID.

## Request

### HTTP Method and URL
```
PUT /partners/:partnerId/merchants/:merchantId
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | No | Email address of the merchant. |
| `merchantLogoUrl` | `string` | No | Merchant logo URL. |
| `phoneNumber` | `object` | No | Contact number of the merchant in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`code` | `number` | No | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | No | A string of numbers ranging from 0-9 with a length of 5-15 characters. |

### Request Example
```json
{
  "email": "test@gmail.com",
  "phoneNumber": {
    "code": 46,
    "number": "771890089"
  },
  "merchantLogoUrl": "https://merchant.com/image"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. Possible values: `SUCCESS` or `ERROR`. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Successfully updated the merchant details."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required fields.  Check the request body parameters and ensure they conform to the specified types and formats.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers are invalid. Ensure the `API-KEY` and `API-SECRET` headers are set correctly.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant ID does not match the authorized partner."
}
```
**Description:** The `MERCHANT-ID` in the header does not correspond to a merchant associated with the specified `partnerId`. Verify the merchant ID is correct for the partner.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:** The specified `merchantId` does not exist. Verify the merchant ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server.  Retry the request. If the error persists, contact Surfboard support.

## Notes
- All fields are optional, but at least one field must be provided to update.
- If the `phoneNumber` object is provided, both `code` and `number` are expected.
- The `merchantId` and `partnerId` are path parameters and should be included in the URL.

---
