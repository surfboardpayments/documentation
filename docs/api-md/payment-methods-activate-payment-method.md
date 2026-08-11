# Activate Payment Method

## Overview
Activates multiple payment methods for a merchant in a single request. Each payment method can be enabled with a boolean value or configured with specific settings using an object.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/payment-methods
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Optional merchant identifier for the payment method configuration. |

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
| `storeId` | `string` | No | Optional store identifier to associate payment methods with a specific store. |
| `terminalId` | `string` | No | Optional terminal (checkout) identifier to associate the payment methods with a specific terminal. |
| `card` | `boolean` | No | Card payment method configuration. Set to true to enable card payments, or pass an object with a scheme array (visa, mastercard) to configure it in detail. |
| `amex` | `boolean` | No | American Express payment method configuration. Set to true to enable AMEX payments, or pass an object with the AMEX merchant id (mId) to configure it. |
| `swish` | `boolean` | No | Swedish mobile payment method configuration. Set to true to enable Swish payments. |
| `klarna` | `boolean` | No | Buy now, pay later payment method configuration. Set to true to enable Klarna payments. |
| `b2binv` | `boolean` | No | B2B invoice payment method configuration. Set to true to enable B2B invoice payments. |
| `acc2acc` | `boolean` | No | Account to account transfer payment method configuration. Set to true to enable account to account transfers. |
| `vipps` | `boolean` | No | Norwegian mobile payment method. Set to true to enable Vipps payment method. |
| `mobilepay` | `boolean` | No | Danish mobile payment method. Set to true to enable MobilePay payment method. |

### Request Example
```json
{
  "card": true,
  "amex": true,
  "swish": true,
  "klarna": true,
  "b2binv": true,
  "acc2acc": true,
  "vipps": true,
  "mobilepay": true
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Array of payment method registration results. |
| &nbsp;&nbsp;&nbsp;&nbsp;`method` | `string` | The payment method name (e.g., 'amex', 'swish', 'card'). |
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
      "method": "b2binv",
      "paymentMethodId": "838f499c1f7bf00c23",
      "status": "SUCCESS"
    },
    {
      "method": "card",
      "paymentMethodId": "82523116c63be80123",
      "status": "SUCCESS"
    },
    {
      "method": "swish",
      "status": "ERROR",
      "message": "PM_0010 - Register payment method failed: SWISH registration already exists."
    },
    {
      "method": "acc2acc",
      "paymentMethodId": "838f499c1f7bf01c23",
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
  "message": "Invalid request body."
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

---
