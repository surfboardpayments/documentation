# Fetch Order Status

## Overview
Retrieves the status of the given order. Use this API to obtain information about the current status of the order including the respective payment and transaction details.

## Prerequisites
- An `orderId` is required to identify the order.
- Authentication is required using the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/status
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | No |
| `API-KEY` | Your API Key | Yes |
| `API-SECRET` | Your API Secret | Yes |
| `MERCHANT-ID` | Your Merchant ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```
// This is a GET request, no request body is required.
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderStatus` | `string` | Describes the status of the order. The possible values are:  `PENDING`: An order has been created and is waiting for payment processing. `PAYMENT_COMPLETED`: The payment has been completed for the order. `PAYMENT_CANCELLED`: The payment attempt has been cancelled for the order. `PARTIAL_PAYMENT_COMPLETED`: A partial payment was completed for the order. `PAYMENT_PROCESSED`: The payment has been authorized. |
| &nbsp;&nbsp;&nbsp;&nbsp;`payments` | `array` | Retrieves the status of all payments related to the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `String` | Unique identifier of the payment |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentStatus` | `string` | Describes the status of the payment. The possible values are: `PAYMENT_INITIATED`: A payment attempt has been initiated. `PAYMENT_PROCESSING`: The payment is being authorized. `PAYMENT_PROCESSED`: The payment has been authorized. `PAYMENT_COMPLETED`: The payment has been completed. `PAYMENT_FAILED`: The payment attempt has failed. `PAYMENT_CANCELLED`: The payment attempt has been cancelled. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`failureReason` | `string` | Indicates the reason of the payment failure if it is available.  Refer to Concepts → Payments for a complete list of payment failure reasons. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | `String` | Denotes the payment method used. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `number` | Amount involved with the payment attempt. |
| &nbsp;&nbsp;&nbsp;&nbsp;`paymentIds` | `array` | An array of successful Payment Id(s) related to an order. Payment Ids are available once order reaches 'PAYMENT_COMPLETED' or 'PARTIAL_PAYMENT_COMPLETED' state. |
| &nbsp;&nbsp;&nbsp;&nbsp;`transactions` | `array` | Retrieves all transaction details for the order. This information is only available when orderStatus is 'PAYMENT_COMPLETED' or 'PARTIAL_PAYMENT_COMPLETED' |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`transactionId` | `String` | Transaction ID of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `String` | Merchant ID of the merchant who performed the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`storeId` | `String` | Store ID of the store in which the transaction was performed |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `String` | Terminal ID of the checkout or payment terminal from which the transaction was performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `String` | Order ID of the order for which the transaction was performed. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentId` | `String` | Payment ID of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`referenceId` | `String` | Reference ID of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`rrn` | `String` | Displays the Retrieval Reference Number(RRN) of the transaction. RRN is a key to uniquely identify a card transaction based on the ISO 8583 standard. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | `String` | Amount involved in the transaction, either received or refunded by the merchant, in the minor unit of the currency. For example, 10 SEK is 1000 in amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | `String` | Three digit numeric code representing the currency of the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`method` | `String` | The method in which the transaction was carried out. Payment method supported currently is 'CARD’. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | `String` | Type of the transaction. It can be either 'purchase' or 'return’. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`orderSummary` | `String` | Specifies a short summary of the order. Usually contains the initial line items included in the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`timestamp` | `String` | Timestamp of the transaction in ISO 8601 format represented as 'YYYY-MM-DDTHH:mm:ss.sssZ'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`voided` | `boolean` | A boolean value that denotes if the transaction has been voided or not. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`issuerCountry` | `string` | Country of the card issuer. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`interchangeDomain` | `string` | Interchange domain of the transaction. It can be Domestic \| Intraregional-EEA \| Interregional-Non-EEA. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardCategory` | `string` | Denotes the card category, which can be Consumer \| Commercial. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardUsage` | `string` | Denotes the card type, whether it is Debit, Credit or Prepaid. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fee` | `String` | The fee collected for each transaction. Fee associated with your settlements are determined by the billing plan you have chosen. These costs may include transaction fees, processing charges, and any additional fees specified in your subscription plan. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementStatus` | `String` | Denotes the status of the settlement. Possible values: `PROCESSED`: Settlement processed. Waiting on amount to be credited to merchant's bank account. `SETTLED`: The transaction was settled. `NOT_SETTLED`: The transaction is not settled. `ERROR`: Error occurred during the settlement process. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`payout` | `String` | Payout is the final amount Surfboard credits to the merchant's bank account. This represents the merchant's actual earnings, which are then transferred to their bank account. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementRef` | `String` | Reference Id for the payout which includes this transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`settlementDate` | `String` | Date of the settlement for the transaction. Date in ISO string format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`truncatedPan` | `String` | The last four digits of the PAN (Primary Account Number) from the card used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardLabel` | `String` | The designated label of the card brand for the transaction, often referred to as the AID (Application Identifier) Label. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`posEntryMode` | `String` | Indicates the mode of entry for the card during the transaction, which is based on EMV specifications. This determines whether the card was used in a contact or contactless manner. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`issuerApplication` | `String` | Specifies the payment application used in the transaction. Usually present when cards with both Debit and Credit facility are used. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalVerificationResult` | `String` | Specifies the additional results if the transaction underwent EMV terminal verification. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`aid` | `String` | Specifies the Application Identifier (AID) associated with the card used for the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`customerResponseCode` | `String` | A two-character response code of the transaction. For all approved transactions, this code is '00'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cvmMethod` | `String` | Indicates the Card Holder Verification Method (CVM) used in the transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cvmMethodDescription` | `String` | Specifies the cvmMethod applied for the provided CARD transaction. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`authMode` | `String` | Indicates the authentication mode of the payment. This can be either 'ISSUER' or 'CARD'. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cardBrand` | `String` | Denotes the brand of card used for the transaction. This is an optional normalized field available only for CARD payments. Eg., VISA, MASTERCARD, AMEX. |
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
		"paymentIds": [
			"838a071326f1330706"
		]
	},
	"message": "Fetched order status successfully"
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name
```json
{
  "status": "ERROR",
  "message": "TBD"
}
```
**Description:** TBD

## Notes
- Ensure your `API-KEY`, `API-SECRET`, and `MERCHANT-ID` are correctly configured.
- Check the `orderStatus` and `paymentStatus` fields to understand the current state of the order and its payments.
---
