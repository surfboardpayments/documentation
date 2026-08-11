# Check Payment Status

## Overview
Returns the current status of a payment. Use this API to poll the result of a payment after initiation. When the payment has completed, the response also includes the detailed transaction information.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `paymentId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /payments/:paymentId/status
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /payments/:paymentId/status
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentStatus` | `string` | High-level lifecycle status of the payment, such as PAYMENT_COMPLETED, PAYMENT_FAILED, or PAYMENT_CANCELLED. |
| &nbsp;&nbsp;&nbsp;&nbsp;`failureReason` | `string` | Reason the payment failed, when applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `string` | Identifier of the transaction associated with the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionDetails` | `object` | Detailed transaction information, included when the payment has completed. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `string` | Identifier of the completed transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Identifier of the terminal that processed the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`rrn` | `string` | Retrieval reference number for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `string` | Amount of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | Currency of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`method` | `string` | Payment method used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`truncatedPan` | `string` | Masked card number used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardLabel` | `string` | Label of the card used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`posEntryMode` | `string` | Point-of-sale entry mode of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`aid` | `string` | Application identifier of the card application used. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`customerResponseCode` | `string` | Response code returned for the customer. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cvmMethod` | `string` | Cardholder verification method applied. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`authMode` | `string` | Authorization mode of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Brand of the card used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalVerificationResult` | `string` | Terminal verification result of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cvmMethodDescription` | `string` | Human-readable description of the cardholder verification method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`authCode` | `string` | Authorization code returned for the transaction. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "paymentStatus": "PAYMENT_COMPLETED",
    "transactionId": "82ff7c258148d80504",
    "transactionDetails": {
      "transactionId": "82ff7c258148d80504",
      "terminalId": "82ff7c258148d80504",
      "rrn": "000123456789",
      "amount": "1000",
      "currency": "752",
      "method": "CARD",
      "truncatedPan": "************1234",
      "cardLabel": "VISA",
      "posEntryMode": "07",
      "aid": "A0000000031010",
      "customerResponseCode": "00",
      "cvmMethod": "PIN",
      "authMode": "AUTH",
      "cardBrand": "VISA",
      "terminalVerificationResult": "0000008000",
      "cvmMethodDescription": "Online PIN",
      "authCode": "123456"
    }
  },
  "message": "Payment status fetched successfully"
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
- The `paymentId` is part of the URL path and must be a valid identifier.

---
