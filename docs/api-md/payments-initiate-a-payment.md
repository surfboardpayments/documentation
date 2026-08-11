# Initiate a Payment

## Overview
Initiates a payment for a specific order. Use this API to initiate a payment for the order created. The default method for processing the initiated payment is via card. Additional payment methods can be enabled using the Payment Methods API.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /payments
```

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
| `paymentMethod` | `string` | Yes | Specifies the method in which the payment is to be processed. Possible values: `CARD`, `CARD_NP`, `KLARNA`, `CTOKEN`, `GIFTCARD`, `SWISH`. |
| `orderId` | `string` | Yes | Unique identifier of the order to initiate payment for. |
| `terminalId` | `string` | No | Unique identifier of the terminal that initiates the payment, used for in-store and card-present flows. |
| `amount` | `number` | No | Amount to charge in the smallest currency unit (e.g., 10 SEK is 1000). Use this to make partial payments on the order; defaults to the order total when omitted. |
| `initialOrderReference` | `string` | No | Reference to an original order, used for follow-up or linked payments. |
| `adjustments` | `array` | No | List of order-level monetary adjustments to apply to the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustmentAmount` | `number` | Yes | Mandatory monetary value of the adjustment in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | No | Optional explicit monetary amount for the adjustment in the smallest currency unit, distinct from the mandatory adjustmentAmount. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustmentType` | `string` | Yes | Type or category of the adjustment, such as tip or discount. |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | No | Arbitrary key/value metadata attached to the adjustment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`createdBy` | `string` | No | Identifier of the actor who created the adjustment. |
| `paymentMethodParams` | `object` | No | Method-specific parameters for the chosen payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tokenId` | `string` | No | Saved-card or payment token identifier to charge for tokenised card payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;`bic` | `string` | No | The BIC (Bank Identifier Code) is an ISO 9362 standard that uniquely identifies a bank, used for account-to-account and bank payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;`ip` | `string` | No | Customer IP address used as risk and fraud context. |
| &nbsp;&nbsp;&nbsp;&nbsp;`swishMode` | `string` | No | Swish flow variant or mode selector (e.g., ECOM). |
| &nbsp;&nbsp;&nbsp;&nbsp;`payeePhoneNumber` | `object` | No | Payee phone number for Swish payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code (e.g., 46 for Sweden without '+'). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | National subscriber number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`giftCardId` | `string` | No | Identifier of the gift card to redeem. |
| &nbsp;&nbsp;&nbsp;&nbsp;`invoice` | `object` | No | Invoice payment configuration. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoiceDistribution` | `string` | No | Channel used to deliver the invoice (e.g., EMAIL). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`contractReference` | `string` | No | Reference to the underlying contract or agreement. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debtCollectionEnabled` | `boolean` | No | Whether unpaid invoices are sent to debt collection. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`dueDate` | `string` | No | Relative due date for the invoice as a chrono expression (e.g., 30d). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoicePaymentMethods` | `array` | No | Permitted payment methods for settling the invoice. Possible values: `BANK`, `DIRECT_BANK`, `CARD`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reminder` | `boolean` | No | Whether a payment reminder should be sent. |
| `serialSplitPaymentsMode` | `array` | No | An array of amounts in smallest currency unit to split the payment. The order of the amounts in the array will determine the order of the split payments. |
| `refundProcessingParams` | `object` | No | Refund metadata used when processing refunds. |
| &nbsp;&nbsp;&nbsp;&nbsp;`purchasePaymentId` | `string` | No | Identifier of the original purchase payment being refunded. |
| &nbsp;&nbsp;&nbsp;&nbsp;`refundReason` | `string` | No | Reason for the refund request. Possible values: `CUSTOMER_INITIATED_RETURN`, `SUSPECTED_MALFUNCTION`, `SUSPECTED_FRAUD`, `DUPLICATE_TRANSACTION`, `OTHER`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`otherReason` | `string` | No | Free-text reason for the return request when it does not fall into any of the predefined categories. |
| `language` | `string` | No | Client or SDK short language code (e.g., fi, no) used to resolve the Klarna session locale. |

### Request Example
```json
{
  "orderId": "838ca7fc6d7de9770b",
  "paymentMethod": "CARD"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `string` | A payment ID assigned to each payment instance. Ensure that this ID is stored securely and tied to an identifiable entity until the payment completion. |
| &nbsp;&nbsp;&nbsp;&nbsp;`interAppJWT` | `string` | This key can be used in the inter-app flow to be passed in as part of the app switch. This is an optional key that can improve inter-app transaction initiation performance. This is currently only functional for CARD payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentUrl` | `string` | Direct URL for payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;`qr` | `string` | QR code data for payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`qrData` | `string` | Raw QR code data for payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;`qrVisibleFor` | `string` | Duration for which the QR code remains visible. |
| &nbsp;&nbsp;&nbsp;&nbsp;`qrLink` | `string` | Link to the QR code for payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`klarnaClientToken` | `string` | Client token for Klarna payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentToken` | `string` | Token for payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sveaInitiationParams` | `string` | Initiation parameters for Svea payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;`epassiInitiationParams` | `string` | Initiation parameters for Epassi payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;`invoiceDetails` | `object` | Invoice details for the payment when applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoiceId` | `number` | Unique identifier for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoicePdfUrl` | `string` | URL to download the invoice PDF. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`iban` | `string` | International Bank Account Number for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`accountHolderName` | `string` | Name of the account holder for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`bic` | `string` | Bank Identifier Code for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`bankgiro` | `string` | Bankgiro number to pay the invoice to. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ocr` | `string` | OCR reference number to quote when paying the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;`adjustmentsSummary` | `object` | Summary of the adjustments applied to the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`totalAmount` | `number` | Total amount of all applied adjustments in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`count` | `number` | Number of adjustments applied to the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustments` | `array` | Individual adjustments applied to the payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Amount of the adjustment in the smallest currency unit. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type or category of the adjustment, such as tip or discount. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "paymentId": "811f9bd48c6eb80c06",
    "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4MzA0NDdkM2U3NGQwMDBiMGIiLCJ0aWQiOiI4MmZmN2MyNTgxNDhkODA1MDQiLCJwaWQiOiI4MzA0NGIzNzAzZmVkODAxMDYiLCJwbSI6IkNBUkQiLCJhIjoxMDAwLCJjIjoiNzUyIiwiY29udHJvbEZ1bmN0aW9uc0VuY29kZXIiOiIxIiwiaXNzdWVkQnkiOiJzYi5wcyIsImlhdCI6MTc0MjIyMTI5NDE1NH0.ftXsXUKmNl-ck47jXKPIa1WXbmH0gbiM8nUAOjBbb0U",
    "invoiceDetails": {
      "invoiceId": 1024,
      "invoicePdfUrl": "https://invoices.example.com/811f9bd48c6eb80c06.pdf",
      "iban": "SE3550000000054910000003",
      "accountHolderName": "Surfboard AB",
      "bic": "ESSESESS",
      "bankgiro": "5050-1055",
      "ocr": "1234567890123"
    },
    "adjustmentsSummary": {
      "totalAmount": 100,
      "count": 1,
      "adjustments": [
        {
          "amount": 100,
          "type": "tip"
        }
      ]
    }
  },
  "message": "Payment initiated successfully"
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

---
