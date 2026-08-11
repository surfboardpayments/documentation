# Get Payment Details

## Overview
Fetches the full payment slip and detail record for a payment. Use this API to retrieve the data needed for receipts and reconciliation.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `paymentId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /payments/:paymentId
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

To localize receipt content, send in `lang` as a query param. It defaults to en when omitted.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `lang` | `string` | No | Language used for any localized receipt content. Defaults to en. |

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
GET /payments/:paymentId?lang=value
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `string` | Unique identifier of the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Identifier of the order this payment belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`checkoutId` | `string` | Identifier of the checkout this payment belongs to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Identifier of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Identifier of the store. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `string` | Identifier of the underlying card transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;`purchasePaymentId` | `string` | Identifier of the original purchase payment this record relates to. |
| &nbsp;&nbsp;&nbsp;&nbsp;`requestId` | `string` | Identifier of the request that created the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`externalRequestId` | `string` | External request identifier supplied by the caller. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `string` | Payment amount, in minor units. |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | ISO 4217 alpha currency code of the payment (e.g. SEK). |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentType` | `string` | Type of the payment (for example PURCHASE). |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Payment method used for the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentStatus` | `string` | Current status of the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Card brand used for the payment (for example VISA). |
| &nbsp;&nbsp;&nbsp;&nbsp;`payeePhoneNumber` | `string` | Phone number of the payee, when applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalMessage` | `string` | Message shown on the terminal for the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalCode` | `array` | Terminal code(s) associated with the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`userMessageId` | `string` | Identifier of the localized user message for the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`voided` | `boolean` | Whether the payment has been voided. |
| &nbsp;&nbsp;&nbsp;&nbsp;`voidStatus` | `string` | Void status of the payment (for example NOT_INITIATED, VOID_INITIATED, VOIDED, CANNOT_VOID). |
| &nbsp;&nbsp;&nbsp;&nbsp;`voidRequestedAt` | `string` | Timestamp when a void was requested for the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdAt` | `string` | Timestamp when the payment record was created. |
| &nbsp;&nbsp;&nbsp;&nbsp;`firstEntryTime` | `string` | Timestamp of the first entry for the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdBy` | `string` | Identifier of the actor that created the payment record. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "paymentId": "811f9bd48c6eb80c06",
    "orderId": "838ca7fc6d7de9770b",
    "checkoutId": "83044b3703fed80106",
    "merchantId": "82ff7c258148d80504",
    "storeId": "83044b3703fed80106",
    "transactionId": "82ff7c258148d80504",
    "requestId": "84b1c2d3e4f5a60789",
    "amount": "1000",
    "currency": "SEK",
    "paymentType": "PURCHASE",
    "paymentMethod": "CARD",
    "paymentStatus": "PAYMENT_COMPLETED",
    "cardBrand": "VISA",
    "terminalMessage": "Approved",
    "terminalCode": [
      "000"
    ],
    "voided": false,
    "voidStatus": "NOT_INITIATED",
    "createdAt": "2026-06-17T10:15:00.000Z"
  },
  "message": "Payment details fetched successfully"
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
