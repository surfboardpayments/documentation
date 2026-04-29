# Fetch Order By Id

## Overview
Retrieves the details of an existing order using its Order Id.

## Prerequisites
- API Key and Secret are required for authentication.
- Merchant ID is required to identify the merchant.
- The Order ID must be a valid identifier for an existing order.

## Request

### HTTP Method and URL
```
GET /orders/:orderId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
_None_

### Request Body Parameters
_None_

### Request Example
```json
// No request body is needed for a GET request.  Example request: GET /orders/12345
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Contains the respective order details. |
| data.terminal$id | string | ID of the checkout or payment terminal |
| data.referenceId | string | External reference ID for the order |
| data.comments | string | Additional comments or notes for the order |
| data.customer | object | Customer details for the order |
| data.customer.customerId | string | Unique identifier for the customer |
| data.customer.person | object | Personal information of the customer |
| data.customer.person.name | object | Full name of the customer |
| data.customer.person.name.firstName | string | First name of the customer |
| data.customer.person.name.middleName | string | Middle name of the customer |
| data.customer.person.name.lastName | string | Last name of the customer |
| data.customer.person.email | string | Email address of the customer |
| data.customer.person.phoneNumber | object | Phone number of the customer |
| data.customer.person.phoneNumber.code | string | International dialing code (Eg., 46 for Sweden without '+') |
| data.customer.person.phoneNumber.number | string | National subscriber number (digits only) |
| data.customer.person.birthDate | string | Date of birth in YYYY-MM-DD format |
| data.customer.person.personalNumber | string | Personal identification number |
| data.customer.person.coordinationNumber | string | Coordination number |
| data.customer.person.countryResidence | string | Country of residence of the customer |
| data.customer.person.gdNumber | string | Government-issued identification number of the customer |
| data.customer.company | object | Company information for corporate purchases |
| data.customer.company.vatId | string | VAT ID of the company |
| data.customer.company.poDetails | string | Purchase order details for the company |
| data.billing | object | Billing contact and address |
| data.billing.name | object | Full name of the billing contact |
| data.billing.name.firstName | string | First name of the billing contact |
| data.billing.name.middleName | string | Middle name of the billing contact |
| data.billing.name.lastName | string | Last name of the billing contact |
| data.billing.email | string | Billing email |
| data.billing.phoneNumber | object | Phone number for billing |
| data.billing.phoneNumber.code | string | International dialing code (Eg., 46 for Sweden without '+') |
| data.billing.phoneNumber.number | string | National subscriber number (digits only) |
| data.billing.address | object | Billing address |
| data.billing.address.careOf | string | Care of / attention |
| data.billing.address.addressLine1 | string | Primary address line |
| data.billing.address.addressLine2 | string | Address line 2 |
| data.billing.address.addressLine3 | string | Address line 3 |
| data.billing.address.city | string | City |
| data.billing.address.postalCode | string | Postal/ZIP code |
| data.billing.address.countryCode | string | Country code (ISO 3166-1 alpha-2) |
| data.shipping | object | Shipping contact and address |
| data.shipping.name | object | Full name of the shipping contact |
| data.shipping.name.firstName | string | First name of the shipping contact |
| data.shipping.name.middleName | string | Middle name of the shipping contact |
| data.shipping.name.lastName | string | Last name of the shipping contact |
| data.shipping.email | string | Recipient email |
| data.shipping.phoneNumber | object | Phone number for shipping |
| data.shipping.phoneNumber.code | string | International dialing code (Eg., 46 for Sweden without '+') |
| data.shipping.phoneNumber.number | string | National subscriber number (digits only) |
| data.shipping.address | object | Shipping address |
| data.shipping.address.careOf | string | Care of / attention |
| data.shipping.address.addressLine1 | string | Primary address line |
| data.shipping.address.addressLine2 | string | Address line 2 |
| data.shipping.address.addressLine3 | string | Address line 3 |
| data.shipping.address.city | string | City |
| data.shipping.address.postalCode | string | Postal/ZIP code |
| data.shipping.address.countryCode | string | Country code (ISO 3166-1 alpha-2) |
| data.orderLines | array | List of items in the order |
| data.orderLines[].id | string | Order line identifier |
| data.orderLines[].externalItemId | string | External order line identifier |
| data.orderLines[].name | string | Product name |
| data.orderLines[].categoryId | string | Product category identifier |
| data.orderLines[].description | string | Line item description |
| data.orderLines[].quantity | number | Quantity ordered. A negative value indicates a refund. |
| data.orderLines[].amount | object | Pricing details for the line item |
| data.orderLines[].amount.regular | number | Regular price amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| data.orderLines[].amount.campaign | number | Campaign/discount amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| data.orderLines[].amount.shipping | number | Shipping amount for this item in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| data.orderLines[].amount.total | number | Total line amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| data.orderLines[].amount.currency | string | Currency (numeric ISO 4217 as string) |
| data.orderLines[].amount.tax | array | Tax breakdown |
| data.orderLines[].amount.tax[].amount | number | Tax amount |
| data.orderLines[].amount.tax[].percentage | number | Tax rate percentage |
| data.orderLines[].amount.tax[].type | string | Tax type (e.g., VAT) |
| data.orderLines[].unit | string | Unit of measure. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'.  |
| data.orderLines[].gtin | string | Global Trade Item Number |
| data.orderLines[].imageUrl | string | Image URL for the product |
| data.orderLines[].brand | string | Brand name |
| data.orderLines[].purchaseOrderId | string | Mandatory purchase order identifier if its a return item. |
| data.orderLines[].promotionApplied | string | Product promotional campaign identifier. |
| data.orderLines[].metadata | object | Arbitrary metadata for the line |
| data.orderLines[].storeId | string | Store identifier |
| data.totalOrderAmount | object | Total amount details of the order. |
| data.totalOrderAmount.regular | number | Total regular order amount in the smallest currency unit (e.g., 10 SEK is represented as 1000) |
| data.totalOrderAmount.campaign | number | Total campaign or discount amount applied to the order in the smallest currency unit |
| data.totalOrderAmount.total | number | Overall payable order amount in the smallest currency unit (regular - campaign + shipping + tax) |
| data.totalOrderAmount.currency | string | Order currency represented as a numeric ISO 4217 code (e.g., '752' for SEK) |
| data.totalOrderAmount.tax | array | Order-level tax breakdown across applied tax categories |
| data.totalOrderAmount.tax[].amount | number | Total tax amount for the order in the smallest currency unit |
| data.totalOrderAmount.tax[].percentage | number | Applied tax rate percentage |
| data.totalOrderAmount.tax[].type | string | Type of tax applied (e.g., VAT, GST) |
| data.date | string | Order date in ISO 8601 format (e.g., 2018-04-04T10:20:30+02:00). If not specified, the current date is used. |
| data.metadata | object | Arbitrary key-value style metadata items |
| data.adjustments | array | Order-level adjustments |
| data.adjustments[].type | string | Adjustment type |
| data.adjustments[].value | string | Adjustment value |
| data.adjustments[].metadata | string | Arbitrary key-value style metadata items. |
| data.controlFunctions | object | Advanced order/payment control configuration |
| data.controlFunctions.cancelPreviousPendingOrder | boolean | Set as true when you want to cancel all previous pending orders |
| data.controlFunctions.orderLineLevelCalculation | boolean | Set this to true to apply campaign and shipping at row level. The total will be calculated as total = ((regular * quantity) - campaign) + shipping. Default is set to false. |
| data.controlFunctions.serviceProviders | array | External service providers participating in the transaction |
| data.controlFunctions.serviceProviders[].serviceProviderId | string | Service provider identifier |
| data.controlFunctions.serviceProviders[].amount | object | Share/fee configuration |
| data.controlFunctions.serviceProviders[].amount.percentage | string | Percentage share (as string) |
| data.controlFunctions.serviceProviders[].amount.fixed | string | Fixed share amount (as string) |
| data.controlFunctions.serviceProviders[].amount.adjustmentTypes | array | Allowed adjustment types for this provider as an array of string. |
| data.controlFunctions.initiatePaymentsOptions | object | Parameters for initiating payment |
| data.controlFunctions.initiatePaymentsOptions.paymentMethod | string | Payment method to use |
| data.controlFunctions.initiatePaymentsOptions.amount | number | Amount to charge in smallest currency units. |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams | object | Method-specific parameters |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.tokenId | string | Saved payment token ID |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.swishMode | string | Swish mode (e.g., ECOM) |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.giftCard | object | Gift card payment details |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.giftCard.giftCardId | string | Gift card identifier |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.giftCard.giftCardRedemptionMode | string | Redemption mode (e.g., WALLET) |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice | object | Invoice payment configuration |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice.invoiceDistribution | string | Distribution channel (e.g., EMAIL) |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice.contractReference | string | Contract reference identifier |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice.debtCollectionEnabled | boolean | Enable debt collection |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice.dueDate | string | Due date or relative duration (e.g., 30d) |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice.invoicePaymentMethods | array | Allowed payment methods for invoice |
| data.controlFunctions.initiatePaymentsOptions.paymentMethodParams.invoice.reminder | boolean | Enable reminders |
| data.controlFunctions.initiatePaymentsOptions.serialSplitPaymentsMode | array | An array of amounts in smallest currency unit to split the payment. The order of the amounts in the array will determine the order of the split payments. |
| data.controlFunctions.initiatePaymentsOptions.refundProcessingParams | object | Parameters for processing refunds |
| data.controlFunctions.initiatePaymentsOptions.refundProcessingParams.purchasePaymentId | string | Original purchase payment ID |
| data.controlFunctions.initiatePaymentsOptions.refundProcessingParams.refundReason | string | Reason for refund (as provided) |
| data.controlFunctions.initiatePaymentsOptions.refundProcessingParams.otherReason | string | Other reason details |
| data.controlFunctions.tipsMode | string | Tips configuration (STANDARD \| ROUNDUP \| NONE) |
| data.controlFunctions.cardStatementDescriptor | string | Statement descriptor text |
| data.controlFunctions.includeAdjustmentsForRefund | boolean | Applies for return orders on whether to include the adjustments as part of the refund or not. The default value is true. For partial returns, by default the first order will have includeAdjustments set to true and for the rest as false. |
| data.controlFunctions.lockToPaymentMethods | array | An array of payment methods locked in. All available payment methods are supported. For example, ['CARD', 'KLARNA'] |
| data.controlFunctions.tapBeforeAmount | boolean | If true, requires the customer to tap the card before the amount is entered, ensuring amount confirmation prior to payment. |
| data.controlFunctions.delayCapture | boolean | Allows capture at a later time.  |
| data.controlFunctions.delayPayout | string | Delays the final amount paid out to the merchant after all deductions, in the format numbers + 'm' | 'h' | 'd' . |
| data.controlFunctions.fulfillmentDate | string | Planned fulfillment date in ISO 8601 format (e.g., 2018-04-04T10:20:30+02:00) |
| data.controlFunctions.callBackUrl | string | This is a dynamic callback URL that is used to perform webhook calls in relation to the order and payment. |
| data.controlFunctions.throwErrorIfTerminalInactiveFor | number | Threshold in ms if the respective terminal has been inactive for the given time frame. |
| data.controlFunctions.clearingCutOff | string | Clearing cutoff configuration in ISO 8601 format (e.g., 2018-04-04T10:20:30+02:00) |
| data.controlFunctions.currency | string | Order currency override |
| data.controlFunctions.authMode | string | It can be either PRE-AUTH or AUTH. By default it is set to AUTH. If PRE-AUTH is selected delayCapture is automatically set to true. |
| data.controlFunctions.receipt | object | Receipt handling options |
| data.controlFunctions.receipt.autoPrintReceipt | boolean | Auto-print setting |
| data.controlFunctions.receipt.autoSendReceiptIfEmailAvailable | boolean | Auto-send if email present |
| data.controlFunctions.receipt.sequenceNumber | string | Receipt sequence number |
| data.controlFunctions.receipt.cashRegisterName | string | Cash register name |
| data.controlFunctions.receipt.controlUnitSerialNumber | string | Control unit serial number |
| data.controlFunctions.receipt.receiptRedirectURL | string | Receipt redirect URL |
| data.controlFunctions.receipt.cashierName | string | Cashier name |
| data.controlFunctions.receipt.promotionsToDisplay | array\<any> | Promotions to display on receipt |
| data.controlFunctions.surcharges | object | A record of additional fees or charges applied to the transaction, keyed by unique identifiers. |
| data.controlFunctions.surcharges.domestic | object | Surcharges for domestic transactions (same country). |
| data.controlFunctions.surcharges.domestic.consumer | object | Surcharges for consumer cards in domestic transactions. |
| data.controlFunctions.surcharges.domestic.consumer.debit | object | Surcharge definitions for consumer debit cards. |
| data.controlFunctions.surcharges.domestic.consumer.debit.fixedAmount | number | A flat surcharge amount in minor currency units (e.g., 100 = 1.00). |
| data.controlFunctions.surcharges.domestic.consumer.debit.fixedPercentage | number | A percentage-based surcharge (e.g., 1.5 = 1.5%). |
| data.controlFunctions.surcharges.domestic.consumer.credit | object | Surcharge definitions for consumer credit cards. |
| data.controlFunctions.surcharges.domestic.consumer.credit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.domestic.consumer.credit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.domestic.corporate | object | Surcharges for corporate cards in domestic transactions. |
| data.controlFunctions.surcharges.domestic.corporate.debit | object | Surcharge definitions for corporate debit cards. |
| data.controlFunctions.surcharges.domestic.corporate.debit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.domestic.corporate.debit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.domestic.corporate.credit | object | Surcharge definitions for corporate credit cards. |
| data.controlFunctions.surcharges.domestic.corporate.credit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.domestic.corporate.credit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.international | object | Surcharges for international transactions (outside the merchant’s country). |
| data.controlFunctions.surcharges.international.consumer | object | Surcharges for consumer cards in international transactions. |
| data.controlFunctions.surcharges.international.consumer.debit | object | Surcharge definitions for consumer debit cards. |
| data.controlFunctions.surcharges.international.consumer.debit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.international.consumer.debit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.international.consumer.credit | object | Surcharge definitions for consumer credit cards. |
| data.controlFunctions.surcharges.international.consumer.credit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.international.consumer.credit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.international.corporate | object | Surcharges for corporate cards in international transactions. |
| data.controlFunctions.surcharges.international.corporate.debit | object | Surcharge definitions for corporate debit cards. |
| data.controlFunctions.surcharges.international.corporate.debit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.international.corporate.debit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.international.corporate.credit | object | Surcharge definitions for corporate credit cards. |
| data.controlFunctions.surcharges.international.corporate.credit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.international.corporate.credit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.eea | object | Surcharges for EEA (European Economic Area) transactions. |
| data.controlFunctions.surcharges.eea.consumer | object | Surcharges for consumer cards in EEA transactions. |
| data.controlFunctions.surcharges.eea.consumer.debit | object | Surcharge definitions for consumer debit cards. |
| data.controlFunctions.surcharges.eea.consumer.debit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.eea.consumer.debit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.eea.consumer.credit | object | Surcharge definitions for consumer credit cards. |
| data.controlFunctions.surcharges.eea.consumer.credit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.eea.consumer.credit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.eea.corporate | object | Surcharges for corporate cards in EEA transactions. |
| data.controlFunctions.surcharges.eea.corporate.debit | object | Surcharge definitions for corporate debit cards. |
| data.controlFunctions.surcharges.eea.corporate.debit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.eea.corporate.debit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.surcharges.eea.corporate.credit | object | Surcharge definitions for corporate credit cards. |
| data.controlFunctions.surcharges.eea.corporate.credit.fixedAmount | number | A flat surcharge amount in minor currency units. |
| data.controlFunctions.surcharges.eea.corporate.credit.fixedPercentage | number | A percentage-based surcharge. |
| data.controlFunctions.readTags | string | This field denotes the type of NFC reading allowed on the terminal for the order. The possible values are NONE, SINGLE, MULTIPLE_EDITABLE, MULTIPLE_NONEDITABLE. |
| data.controlFunctions.online | object | Online payment/link settings |
| data.controlFunctions.online.enforceTokenization | boolean | Denotes whether the card is tokenised for a future transaction or not. |
| data.controlFunctions.online.paymentPageValidFor | string | Default validity of the payment page in format <number><unit>, where unit is 'm' | 'h' | 'd' (e.g., '15m', '2h', '3d'). |
| data.controlFunctions.online.enforce3DSecure | boolean | Force 3-D Secure authentication when available. |
| data.controlFunctions.online.redirectUrl | string | Redirect URL after the online transaction completes successfully. The orderId will be appended as a query parameter. |
| data.controlFunctions.online.accountNameVerification | string | Account-name verification strategy used during payment (implementation-specific enum). |
| data.controlFunctions.online.errorIfTokenizationFails | boolean | If true, fail the flow when card tokenization cannot be completed. |
| data.controlFunctions.online.failureRedirectUrl | string | Redirect URL when the transaction fails. The orderId will be appended as a query parameter. |
| data.controlFunctions.online.tokenisationIfPossible | boolean | Attempts tokenization when supported, without failing the flow if tokenization is unavailable. |
| data.controlFunctions.online.subscription | boolean | Marks this as a subscription/recurring-capable order. |
| data.controlFunctions.online.payButtonType | string | UI pay button label/type used on the payment page. Possible values: ADD_MONEY, BOOK, CHECKOUT, CONTINUE, CONTRIBUTE, DONATE, ORDER, PAY, RENT, SUPPORT, TIP, TOP_UP |
| data.controlFunctions.online.generateShortLink | boolean | If true, generates a short URL for the payment page. Default is false. |
| data.controlFunctions.online.generateOnlineLinkWith | string | The terminal identifier used to generate the online payment link. |
| data.controlFunctions.online.recurring | object | Encompasses all controls related to recurring payments. |
| data.controlFunctions.online.recurring.subscriptionAmountType | string | Determines the type of the subscription amount for order. Possible values: fixed, variable. |
| data.controlFunctions.online.recurring.maxAmount | number | Maximum amount for the order in the lowest currency unit (only valid for variable subscription amounts). |
| data.controlFunctions.online.recurring.frequency | string | Frequency of the recurring collection. 'daily' | 'twiceWeekly' | 'weekly' | 'tenDays' | 'fortNightly' | 'monthly' | 'everyTwoMonths' | 'trimester' | 'quarterly' | 'twiceYearly' | 'annually' | 'unscheduled'. |
| data.controlFunctions.online.recurring.numberOfPayments | number | Total number of payments expected for this order. |
| data.controlFunctions.online.recurring.uniqueReference | string | A unique reference for the recurring order. |
| data.controlFunctions.online.recurring.validation | string | The validation type for the recurring order, possible values are 'validated' | 'notValidated'. |
| data.controlFunctions.online.currency | string | Currency as a numeric ISO 4217 code (string), e.g., '752' for SEK. |
| data.controlFunctions.taxHandlingStrategy | object | Tax calculation strategy |
| data.controlFunctions.taxHandlingStrategy.treatAmountAsTaxExclusive | boolean | Prices exclude tax |
| data.controlFunctions.taxHandlingStrategy.taxTreatmentStrategy | string | Rounding strategy configuration |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"terminal$id": "8386af3b0f71b80b04",
		"referenceId": "838f324b016d7009",
		"date": "2025-10-14T07:39:02.812Z",
		"adjustments": [
			{
				"adjustmentId": "838f324b016d703e36",
				"type": "TIPS",
				"value": "100"
			}
		],
		"orderLines": [
			{
				"id": "TERM123NAL",
				"name": "Nike Shoes",
				"quantity": 1,
				"amount": {
					"regular": 500,
					"total": 500,
					"currency": "752",
					"tax": [
						{
							"amount": 20,
							"percentage": 20,
							"type": "VAT"
						}
					]
				}
			}
		],
		"totalOrderAmount": {
			"regular": 500,
			"total": 600,
			"currency": "752"
		},
		"controlFunctions": {
			"cancelPreviousPendingOrder": false,
			"orderLineLevelCalculation": false
		}
	},
	"message": "Order fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 401 - Unauthorized
```json
{
	"status": "ERROR",
	"message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Occurs when the provided API key and secret are invalid or missing. Verify the credentials and ensure they are correctly included in the request headers.

## Notes
- Ensure the Order ID used in the request path is a valid, existing order identifier.
- Surcharges are marked as `comingSoon` and may not be fully implemented.
---