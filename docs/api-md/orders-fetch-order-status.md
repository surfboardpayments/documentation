# Fetch Order Status

## Overview
Retrieves the status of the given order. Use this API to obtain information about the current status of the order including the respective payment and transaction details.

## Prerequisites
- A valid `orderId` is required to use this endpoint.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.
- The order must already exist in the system.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/status
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | No, but recommended for future compatibility. |
| `API-KEY` | Your API Key | Yes |
| `API-SECRET` | Your API Secret | Yes |
| `MERCHANT-ID` | Your Merchant ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body is required for this GET request.
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | object | Response data. |
| `data.orderStatus` | string | Describes the status of the order. Possible values: `PENDING`, `PAYMENT_COMPLETED`, `PAYMENT_CANCELLED`, `PARTIAL_PAYMENT_COMPLETED`, `PAYMENT_PROCESSED`. |
| `data.payments` | array | Retrieves the status of all payments related to the order. |
| `data.payments[].paymentId` | String | Unique identifier of the payment. |
| `data.payments[].paymentStatus` | string | Describes the status of the payment. Possible values: `PAYMENT_INITIATED`, `PAYMENT_PROCESSING`, `PAYMENT_PROCESSED`, `PAYMENT_COMPLETED`, `PAYMENT_FAILED`, `PAYMENT_CANCELLED`. |
| `data.payments[].failureReason` | string | Indicates the reason of the payment failure if it is available.  Refer to Concepts → Payments for a complete list of payment failure reasons. |
| `data.payments[].paymentMethod` | String | Denotes the payment method used. |
| `data.payments[].amount` | number | Amount involved with the payment attempt. |
| `data.paymentIds` | array | An array of successful Payment Id(s) related to an order. Payment Ids are available once order reaches 'PAYMENT_COMPLETED' or 'PARTIAL_PAYMENT_COMPLETED' state. |
| `data.transactions` | array | Retrieves all transaction details for the order. This information is only available when orderStatus is 'PAYMENT_COMPLETED' or 'PARTIAL_PAYMENT_COMPLETED'. |
| `data.transactions[].transactionId` | String | Transaction ID of the transaction. |
| `data.transactions[].merchantId` | String | Merchant ID of the merchant who performed the transaction. |
| `data.transactions[].storeId` | String | Store ID of the store in which the transaction was performed |
| `data.transactions[].terminalId` | String | Terminal ID of the checkout or payment terminal from which the transaction was performed. |
| `data.transactions[].orderId` | String | Order ID of the order for which the transaction was performed. |
| `data.transactions[].paymentId` | String | Payment ID of the transaction. |
| `data.transactions[].referenceId` | String | Reference ID of the transaction. |
| `data.transactions[].rrn` | String | Displays the Retrieval Reference Number(RRN) of the transaction. RRN is a key to uniquely identify a card transaction based on the ISO 8583 standard. |
| `data.transactions[].amount` | String | Amount involved in the transaction, either received or refunded by the merchant, in the minor unit of the currency. For example, 10 SEK is 1000 in amount. |
| `data.transactions[].currency` | String | Three digit numeric code representing the currency of the transaction. |
| `data.transactions[].method` | String | The method in which the transaction was carried out. Payment method supported currently is 'CARD’. |
| `data.transactions[].type` | String | Type of the transaction. It can be either 'purchase' or 'return’. |
| `data.transactions[].orderSummary` | String | Specifies a short summary of the order. Usually contains the initial line items included in the order. |
| `data.transactions[].timestamp` | String | Timestamp of the transaction in ISO 8601 format represented as 'YYYY-MM-DDTHH:mm:ss.sssZ'. |
| `data.transactions[].voided` | boolean | A boolean value that denotes if the transaction has been voided or not. |
| `data.transactions[].issuerCountry` | string | Country of the card issuer. |
| `data.transactions[].interchangeDomain` | string | Interchange domain of the transaction. It can be Domestic \| Intraregional-EEA \| Interregional-Non-EEA. |
| `data.transactions[].cardCategory` | string | Denotes the card category, which can be Consumer \| Commercial. |
| `data.transactions[].cardUsage` | string | Denotes the card type, whether it is Debit, Credit or Prepaid. |
| `data.transactions[].fee` | String | The fee collected for each transaction. Fee associated with your settlements are determined by the billing plan you have chosen. These costs may include transaction fees, processing charges, and any additional fees specified in your subscription plan. |
| `data.transactions[].settlementStatus` | String | Denotes the status of the settlement. Possible values: `PROCESSED`, `SETTLED`, `NOT_SETTLED`, `ERROR`. |
| `data.transactions[].payout` | String | Payout is the final amount Surfboard credits to the merchant's bank account. This represents the merchant's actual earnings, which are then transferred to their bank account. |
| `data.transactions[].settlementRef` | String | Reference Id for the payout which includes this transaction. |
| `data.transactions[].settlementDate` | String | Date of the settlement for the transaction. Date in ISO string format. |
| `data.transactions[].truncatedPan` | String | The last four digits of the PAN (Primary Account Number) from the card used for the transaction. |
| `data.transactions[].cardLabel` | String | The designated label of the card brand for the transaction, often referred to as the AID (Application Identifier) Label. |
| `data.transactions[].posEntryMode` | String | Indicates the mode of entry for the card during the transaction, which is based on EMV specifications. This determines whether the card was used in a contact or contactless manner. |
| `data.transactions[].issuerApplication` | String | Specifies the payment application used in the transaction. Usually present when cards with both Debit and Credit facility are used. |
| `data.transactions[].terminalVerificationResult` | String | Specifies the additional results if the transaction underwent EMV terminal verification. |
| `data.transactions[].aid` | String | Specifies the Application Identifier (AID) associated with the card used for the transaction. |
| `data.transactions[].customerResponseCode` | String | A two-character response code of the transaction. For all approved transactions, this code is '00'. |
| `data.transactions[].cvmMethod` | String | Indicates the Card Holder Verification Method (CVM) used in the transaction. |
| `data.transactions[].cvmMethodDescription` | String | Specifies the cvmMethod applied for the provided CARD transaction. |
| `data.transactions[].authMode` | String | Indicates the authentication mode of the payment. This can be either 'ISSUER' or 'CARD'. |
| `data.transactions[].cardBrand` | String | Denotes the brand of card used for the transaction. This is an optional normalized field available only for CARD payments. Eg., VISA, MASTERCARD, AMEX. |
| `message` | string | A message that describes the status of the request. |

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

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid order ID format."
}
```
**Description:** The `orderId` provided in the URL is not in the correct format or is invalid. Ensure that the `orderId` is a valid string.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API Key."
}
```
**Description:** The API Key provided in the header is invalid or missing. Verify and update the API Key.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden: Insufficient permissions."
}
```
**Description:** The merchant does not have the necessary permissions to access the order status. Contact support to grant appropriate permissions.

#### 404 - Order Not Found
```json
{
  "status": "ERROR",
  "message": "Order not found."
}
```
**Description:** The specified order with the provided `orderId` does not exist. Verify the `orderId` and ensure it is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Retry the request after a few minutes. If the error persists, contact support.

## Notes
- The `transactions` array will only be populated if the `orderStatus` is `PAYMENT_COMPLETED` or `PARTIAL_PAYMENT_COMPLETED`.
- The payment failure reasons are available in the "Concepts -> Payments" section of the documentation.
- Ensure your `API-KEY`, `API-SECRET`, and `MERCHANT-ID` are correctly configured for the environment you are using (e.g., sandbox or production).

---
