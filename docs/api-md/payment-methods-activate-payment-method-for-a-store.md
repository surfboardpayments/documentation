# Activate Payment Method for a Store

## Overview
Activates a single payment method for a specific store under a merchant. Only AMEX and SWISH can be activated at the store level; the store is taken from the URL path. Configuration values such as the AMEX merchant id or Swish number can be supplied alongside the payment method.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/stores/:storeId/payment-methods
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentMethod` | `string` | Yes | The payment method to activate for the store. Only AMEX and SWISH are accepted at the store level. Possible values: `AMEX`, `SWISH`. |
| `amexMID` | `string` | No | American Express merchant id, required when activating the AMEX payment method. |
| `swishNumber` | `string` | No | The Swish payee number to route Swish payments to, used when activating the SWISH payment method. |
| `acquirerMID` | `string` | No | Acquirer merchant id to associate with the payment method. |
| `username` | `string` | No | Provider username used when the payment method requires provider credentials. |
| `password` | `string` | No | Provider password used when the payment method requires provider credentials. |
| `klarnaMerchantId` | `string` | No | Klarna merchant id to associate with the payment method. |

### Request Example
```json
{
  "paymentMethod": "AMEX",
  "amexMID": "1234567890"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Array of payment method registration results for the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`method` | `string` | The payment method name that was processed (e.g., 'amex', 'swish'). |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethodId` | `string` | Unique identifier assigned to the payment method (present on success). |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Registration status for this payment method, either 'SUCCESS' or 'ERROR'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`message` | `string` | Error message if registration failed (present on error). |
| `message` | `string` | A message that describes the overall status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "method": "amex",
      "paymentMethodId": "8235c0943bd9800023",
      "status": "SUCCESS"
    }
  ],
  "message": "Processed payment method registrations"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid payment method type. Must be AMEX or SWISH."
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

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
- The `storeId` is part of the URL path and must be a valid identifier.

---
