# Fetch Order Status

## Overview
Retrieves the status of the given order. Use this API to obtain information about the current status of the order including the respective payment and transaction details.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `orderId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/status
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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderStatus` | `string` | Describes the status of the order. Possible values: `PENDING`, `PAYMENT_COMPLETED`, `PAYMENT_CANCELLED`, `PARTIAL_PAYMENT_COMPLETED`, `PAYMENT_PROCESSED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`payments` | `array` | Retrieves the status of all payments related to the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `string` | Unique identifier of the payment |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentStatus` | `string` | Describes the status of the payment. Possible values: `PAYMENT_INITIATED`, `PAYMENT_PROCESSING`, `PAYMENT_PROCESSED`, `PAYMENT_COMPLETED`, `PAYMENT_FAILED`, `PAYMENT_CANCELLED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`failureReason` | `string` | Indicates the reason of the payment failure if it is available. You can refer to Concepts → Payments for a complete list of payment failure reasons. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `string` | Denotes the payment method used. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Amount involved with the payment attempt. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentIds` | `array` | An array of successful Payment Id(s) related to an order. Payment Ids are available once order reaches 'PAYMENT_COMPLETED' or 'PARTIAL_PAYMENT_COMPLETED' state. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactions` | `array` | Retrieves all transaction details for the order. This information is only available when orderStatus is 'PAYMENT_COMPLETED' or 'PARTIAL_PAYMENT_COMPLETED' |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `string` | Transaction ID of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Merchant ID of the merchant who performed the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `string` | Store ID of the store in which the transaction was performed |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Terminal ID of the checkout or payment terminal from which the transaction was performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Order ID of the order for which the transaction was performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `string` | Payment ID of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`referenceId` | `string` | Reference ID of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`rrn` | `string` | Displays the Retrieval Reference Number(RRN) of the transaction. RRN is a key to uniquely identify a card transaction based on the ISO 8583 standard. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `string` | Amount involved in the transaction, either received or refunded by the merchant, in the minor unit of the currency. For example, 10 SEK is 1000 in amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | Three digit numeric code representing the currency of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`method` | `string` | The method in which the transaction was carried out. The payment method currently supported is 'CARD'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | Type of the transaction. It can be either 'purchase' or 'return. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`orderSummary` | `string` | Specifies a short summary of the order. Usually contains the initial line items included in the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`timestamp` | `string` | Timestamp of the transaction in ISO 8601 format represented as 'YYYY-MM-DDTHH:mm:ss.sssZ'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`voided` | `boolean` | A boolean value that denotes if the transaction has been voided or not. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`issuerCountry` | `string` | Country of the card issuer. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`interchangeDomain` | `string` | Interchange domain of the transaction. It can be Domestic \| Intraregional-EEA \| Interregional-Non-EEA. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardCategory` | `string` | Denotes the card category, which can be Consumer \| Commercial. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardUsage` | `string` | Denotes the card type, whether it is Debit, Credit or Prepaid. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fee` | `string` | The fee collected for each transaction. Fee associated with your settlements are determined by the billing plan you have chosen. These costs may include transaction fees, processing charges, and any additional fees specified in your subscription plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementStatus` | `string` | Denotes the status of the settlement. Possible values: `PROCESSED`, `SETTLED`, `NOT_SETTLED`, `ERROR`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`payout` | `string` | Payout is the final amount Surfboard credits to the merchant's bank account. This represents the merchant's actual earnings, which are then transferred to their bank account. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementRef` | `string` | Reference Id for the payout which includes this transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementDate` | `string` | Date of the settlement for the transaction. Date in ISO string format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`truncatedPan` | `string` | The last four digits of the PAN (Primary Account Number) from the card used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardLabel` | `string` | The designated label of the card brand for the transaction, often referred to as the AID (Application Identifier) Label. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`posEntryMode` | `string` | Indicates the mode of entry for the card during the transaction, which is based on EMV specifications. This determines whether the card was used in a contact or contactless manner. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`issuerApplication` | `string` | Specifies the payment application used in the transaction. Usually present when cards with both Debit and Credit facility are used. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalVerificationResult` | `string` | Specifies the additional results if the transaction underwent EMV terminal verification. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`aid` | `string` | Specifies the Application Identifier (AID) associated with the card used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`customerResponseCode` | `string` | A two-character response code of the transaction. For all approved transactions, this code is '00'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cvmMethod` | `string` | Indicates the Card Holder Verification Method (CVM) used in the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cvmMethodDescription` | `string` | Specifies the cvmMethod applied for the provided CARD transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`authMode` | `string` | Indicates the authentication mode of the payment. This can be either 'ISSUER' or 'CARD'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `string` | Denotes the brand of card used for the transaction. This is an optional normalized field available only for CARD payments. Eg., VISA, MASTERCARD, AMEX. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderLines` | `array` | List of items in the order |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | Unique identifier of the order line. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Display name of the actor, or null. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`quantity` | `number` | Quantity ordered. A negative value indicates a refund. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `object` | Pricing details for the order line. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`regular` | `number` | Regular price amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`total` | `number` | Total line amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | `string` | ISO currency code of the amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`purchasePaymentId` | `string` | Original purchase payment ID |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "orderStatus": "PAYMENT_COMPLETED",
    "payments": [
      {
        "paymentId": "838a071326f1330706",
        "paymentStatus": "PAYMENT_COMPLETED",
        "paymentMethod": "CARD",
        "amount": 200
      }
    ],
    "transactions": [
      {
        "transactionId": "838a071326f1333319",
        "merchantId": "8280577d677b18050e",
        "terminalId": "828057b63d8e480804",
        "orderId": "838a071326f130950b",
        "paymentId": "838a071326f1330706",
        "rrn": "526506000001",
        "amount": "200",
        "currency": "752",
        "method": "CARD",
        "type": "PURCHASE",
        "timestamp": "2025-10-08T07:25:11.144Z",
        "voided": false,
        "settlementStatus": "NOT_SETTLED",
        "truncatedPan": "0010",
        "posEntryMode": "07",
        "customerResponseCode": "00",
        "cvmMethodDescription": "No CVM",
        "authMode": "ISSUER",
        "cardBrand": "VISA"
      }
    ],
    "orderLines": [
      {
        "id": "838a071326f1330707",
        "name": "Sample Product",
        "quantity": 2,
        "amount": {
          "regular": 10000,
          "total": 20000,
          "currency": "752"
        },
        "purchasePaymentId": "838a071326f1330706"
      }
    ],
    "paymentIds": [
      "838a071326f1330706"
    ]
  },
  "message": "Fetched order status successfully"
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
