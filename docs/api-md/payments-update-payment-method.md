# Update Payment Method

## Overview
Switches the payment method on an in-flight payment, for example when a customer changes from card to Klarna at the payment page. Use this API to set a new payment method and re-apply initiation-style parameters.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `paymentId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /payments/:paymentId/update/payment-method
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

| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentMethod` | `string` | Yes | New payment method to set on the payment. Possible values: `CARD`, `CARD_NP`, `KLARNA`, `CTOKEN`, `GIFTCARD`, `SWISH`. |
| `params` | `object` | No | Additional initiation-style parameters to apply with the new payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Yes | Payment method to apply within the re-initiation parameters; provided separately from the root paymentMethod field. Possible values: `CARD`, `CARD_NP`, `KLARNA`, `CTOKEN`, `GIFTCARD`, `SWISH`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Yes | Identifier of the order the updated payment is for. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | No | Unique identifier of the terminal initiating the updated payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | No | Amount to charge with the new method in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`initialOrderReference` | `string` | No | Reference to an original order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustments` | `array` | No | List of order-level monetary adjustments to apply to the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustmentAmount` | `number` | Yes | Mandatory monetary value of the adjustment in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | No | Optional explicit monetary amount for the adjustment in the smallest currency unit, distinct from the mandatory adjustmentAmount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustmentType` | `string` | Yes | Type or category of the adjustment, such as tip or discount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | No | Arbitrary key/value metadata attached to the adjustment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`createdBy` | `string` | No | Identifier of the actor who created the adjustment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`refundProcessingParams` | `object` | No | Refund metadata used when processing refunds. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`purchasePaymentId` | `string` | No | Identifier of the original purchase payment being refunded. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`refundReason` | `string` | No | Reason for the refund request. Possible values: `CUSTOMER_INITIATED_RETURN`, `SUSPECTED_MALFUNCTION`, `SUSPECTED_FRAUD`, `DUPLICATE_TRANSACTION`, `OTHER`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`otherReason` | `string` | No | Free-text reason for the return request when it does not fall into any of the predefined categories. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serialSplitPaymentsMode` | `array` | No | An array of amounts in smallest currency unit to split the payment serially across multiple charges. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentMethodParams` | `object` | No | Method-specific parameters for the chosen payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`tokenId` | `string` | No | Saved-card or payment token identifier to charge for tokenised card payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`bic` | `string` | No | The BIC (Bank Identifier Code) is an ISO 9362 standard that uniquely identifies a bank, used for account-to-account and bank payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ip` | `string` | No | Customer IP address used as risk and fraud context. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`swishMode` | `string` | No | Swish flow variant or mode selector (e.g., ECOM). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`payeePhoneNumber` | `object` | No | Payee phone number for Swish payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code (e.g., 46 for Sweden without '+'). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | National subscriber number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`giftCardId` | `string` | No | Identifier of the gift card to redeem. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoice` | `object` | No | Invoice payment configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoiceDistribution` | `string` | No | Channel used to deliver the invoice (e.g., EMAIL). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`contractReference` | `string` | No | Reference to the underlying contract or agreement. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debtCollectionEnabled` | `boolean` | No | Whether unpaid invoices are sent to debt collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`dueDate` | `string` | No | Relative due date for the invoice as a chrono expression (e.g., 30d). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reminder` | `boolean` | No | Whether a payment reminder should be sent. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoicePaymentMethods` | `array` | No | Permitted payment methods for settling the invoice. Possible values: `BANK`, `DIRECT_BANK`, `CARD`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`language` | `string` | No | Client or SDK short language code used to resolve the Klarna session locale. |
| &nbsp;&nbsp;&nbsp;&nbsp;`message` | `string` | No | Free-text message attached to the update. |
| &nbsp;&nbsp;&nbsp;&nbsp;`initialOrderId` | `string` | No | Identifier of the original order being updated. |

### Request Example
```json
{
  "paymentMethod": "KLARNA",
  "params": {
    "paymentMethod": "KLARNA",
    "orderId": "838ca7fc6d7de9770b"
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `string` | Identifier of the updated payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentStatus` | `string` | Lifecycle status of the payment after the method update. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "paymentId": "811f9bd48c6eb80c06",
    "paymentStatus": "PAYMENT_INITIATED"
  },
  "message": "Payment method updated successfully"
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
- The `paymentId` is part of the URL path and must be a valid identifier.

---
