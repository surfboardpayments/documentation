# Fetch Payment Methods with Status

## Overview
Retrieves every payment method configured for a merchant, including each method's activation status. Use this when you need to see both active and deactivated payment methods, for example to build a settings screen.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/all-payment-methods
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/all-payment-methods
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The payment methods configured for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethodId` | `string` | PaymentMethod ID of the payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Specifies the payment method, for example 'AMEX', 'SWISH', or 'CARD'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentStatus` | `string` | Activation status of the payment method, indicated as either 'ACTIVATED' or 'DEACTIVATED'. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "paymentMethodId": "8235c0a33bd9800223",
      "paymentMethod": "SWISH",
      "paymentStatus": "ACTIVATED"
    },
    {
      "paymentMethodId": "8235c0943bd9800023",
      "paymentMethod": "AMEX",
      "paymentStatus": "DEACTIVATED"
    }
  ],
  "message": "Fetched all payment methods for merchant"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch payment methods for merchant"
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

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
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.

---
