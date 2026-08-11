# Fetch Tokens from Order

## Overview
Fetch all tokenized card information collected for online orders.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `orderId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/tokens
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters

This endpoint does not take a request body.

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request. |
| `data` | `array` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Denotes the brand of the card. E.g. VISA, MASTERCARD, AMEX. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardholderName` | `string` | Name of the card holder. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tokenId` | `string` | Tokenized card information. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | Date of tokenization in ISO string format. |
| &nbsp;&nbsp;&nbsp;&nbsp;`expiryMonth` | `number` | Expiration month of the card. |
| &nbsp;&nbsp;&nbsp;&nbsp;`expiryYear` | `number` | Expiration year of the card. |
| &nbsp;&nbsp;&nbsp;&nbsp;`truncatedPan` | `string` | The last four digits of the PAN (Primary Account Number) from the card. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardArt` | `string` | Denotes the visual images of the card. Eg., VISA, MASTERCARD, AMEX. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "cardBrand": "VISA",
      "cardholderName": "Tom",
      "tokenId": "822d544dc48c200308",
      "createdAt": "2024-04-25T11:22:24.845Z",
      "expiryMonth": 7,
      "expiryYear": 2026,
      "truncatedPan": "8907",
      "cardArt": "iVBORw0KGgoAAAANSUhEUgAAAUQAAA......"
    },
    {
      "cardBrand": "VISA",
      "cardholderName": "Sam",
      "tokenId": "822d544dc48c200308",
      "createdAt": "2024-04-25T11:22:24.845Z",
      "expiryMonth": 5,
      "expiryYear": 2025,
      "truncatedPan": "0987",
      "cardArt": "YAAAAAXNSR0IArs4c6QAAAARnQU1BA......"
    }
  ],
  "message": "Fetched the card information."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** Authentication failed. Ensure the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- The `orderId` is part of the URL path and must be a valid identifier.

---
