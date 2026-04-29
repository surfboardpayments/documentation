# Initiate a Payment

## Overview
Initiates a payment for a specific order. Use this API to initiate a payment for the order created. The default method for processing the initiated payment is via card. Additional payment methods can be enabled using the Payment Methods API.

## Prerequisites
- A valid order ID is required to initiate a payment.
- Authentication is required via API Key, API Secret, and Merchant ID.
- The order must be in a state that allows payment initiation.

## Request

### HTTP Method and URL
```
POST /payments
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| paymentMethod | string | Yes | Specifies the method in which the payment is to be processed. Possible values: CARD, CARD_NP, KLARNA, CTOKEN, GIFTCARD. |
| orderId | string | Yes | Unique identifier of order to initiate payment for. |
| terminalId | string | No | Unique identifier of terminal. |
| amount | number | No | Use this parameter to make partial payments on the order by sending in the amount in the smallest currency unit (e.g., 10 SEK is 1000 in amount). This is only required for purchase transactions. |
| initialOrderReference | string | No | initialOrderReference |
| paymentMethodParams | object | No | Method-specific parameters. |
| &nbsp;&nbsp;&nbsp;&nbsp;tokenId | string | No | Token ID is mandatory if CTOKEN is passed in as the payment method. Conditional: Dependent on using CTOKEN as the payment method. |
| &nbsp;&nbsp;&nbsp;&nbsp;bic | string | No | The BIC (Bank Identifier Code) is an ISO 9362 standard that uniquely identifies a bank in cross-border transactions. It is mandatory for the ACC2ACC payment method. Conditional. |
| &nbsp;&nbsp;&nbsp;&nbsp;ip | string | No | ip |
| &nbsp;&nbsp;&nbsp;&nbsp;swishMode | string | No | Swish mode (e.g., ECOM) |
| &nbsp;&nbsp;&nbsp;&nbsp;payeePhoneNumber | object | No | Mandatory phone number for SWISH payments. Conditional. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code | string | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number | string | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;giftCardId | string | No | Gift card identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;invoice | object | No | Invoice payment configuration |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invoiceDistribution | string | Yes | Distribution channel (e.g., EMAIL) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractReference | string | No | Contract reference identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;debtCollectionEnabled | boolean | No | Enable debt collection |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dueDate | string | Yes | Due date or relative duration (e.g., 30d) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invoicePaymentMethods | array | Yes | Specifies the payment methods available for settling an invoice. Possible values: BANK, DIRECT_BANK, CARD |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reminder | boolean | Yes | Enable reminders |
| serialSplitPaymentsMode | array | No | An array of amounts in smallest currency unit to split the payment. The order of the amounts in the array will determine the order of the split payments. Coming Soon. |
| refundProcessingParams | object | No | Parameters for processing refunds. Conditional. |
| &nbsp;&nbsp;&nbsp;&nbsp;purchasePaymentId | string | No | For SWISH, NSWISH, KLARNA and CARD_NP(card-not-present) partial refunds, it is mandatory to send in the Original Purchase Payment ID to which the refund will be initiated. Conditional: Dependent on partial CNP refund. |
| &nbsp;&nbsp;&nbsp;&nbsp;refundReason | string | No | Indicates the reason for the return request. Mandatory for CARD_NP refunds. Conditional: Dependent on CARD_NP refunds. Possible values: CUSTOMER_INITIATED_RETURN, SUSPECTED_MALFUNCTION, SUSPECTED_FRAUD, DUPLICATE_TRANSACTION, OTHER. |
| &nbsp;&nbsp;&nbsp;&nbsp;otherReason | string | No | Describe the reason for the return request that do not fall into any of the predefined categories. Mandatory when "OTHER" is selected as the `refundReason`. Conditional. |

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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;paymentId | string | A payment ID assigned to each payment instance. Ensure that this ID is stored securely and tied to an identifiable entity until the payment completion. |
| &nbsp;&nbsp;&nbsp;&nbsp;interAppJWT | string | This key can be used in the inter-app flow to be passed in as part of the app switch. This is an optional key that can improve inter-app transaction initiation performance. This is currently only functional for CARD payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;paymentUrl | string | Direct URL for payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;qr | string | QR code data for payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;qrData | string | Raw QR code data for payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;qrVisibleFor | string | Duration for which the QR code remains visible. |
| &nbsp;&nbsp;&nbsp;&nbsp;qrLink | string | Link to the QR code for payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;klarnaClientToken | string | Client token for Klarna payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;paymentToken | string | Token for payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;sveaInitiationParams | string | Initiation parameters for Svea payment processing. |
| &nbsp;&nbsp;&nbsp;&nbsp;invoiceDetails | object | Invoice details for the payment when applicable. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invoiceId | number | Unique identifier for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invoicePdfUrl | string | URL to download the invoice PDF. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iban | string | International Bank Account Number for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accountHolderName | string | Name of the account holder for the invoice. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bic | string | Bank Identifier Code for the invoice. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "paymentId": "811f9bd48c6eb80c06",
    "interAppJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiI4MzA0NDdkM2U3NGQwMDBiMGIiLCJ0aWQiOiI4MmZmN2MyNTgxNDhkODA1MDQiLCJwaWQiOiI4MzA0NGIzNzAzZmVkODAxMDYiLCJwbSI6IkNBUkQiLCJhIjoxMDAwLCJjIjoiNzUyIiwiY29udHJvbEZ1bmN0aW9uc0VuY29kZXIiOiIxIiwiaXNzdWVkQnkiOiJzYi5wcyIsImlhdCI6MTc0MjIyMTI5NDE1NH0.ftXsXUKmNl-ck47jXKPIa1WXbmH0gbiM8nUAOjBbb0U"
  },
  "message": "Payment initiated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Invalid Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs when the request body contains invalid or missing parameters. Ensure that all required fields are present and correctly formatted according to the API documentation.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API Key or Secret."
}
```
**Description:** This error occurs when the provided API Key or Secret is invalid or missing. Verify that the correct credentials are being used.

#### 404 - Order Not Found
```json
{
  "status": "ERROR",
  "message": "Order not found."
}
```
**Description:** This error occurs when the specified order ID does not exist. Ensure that the order ID is correct and the order has been created successfully.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a problem on the server-side. If this error persists, contact the API support team for assistance.

## Notes
-  Store the payment ID securely and tie it to an identifiable entity until the payment completion.
-  `serialSplitPaymentsMode` is a coming soon feature.
---
