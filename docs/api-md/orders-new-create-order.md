# Create Order

## Overview
The `createOrder` API lets you create and pay for an order in a single call—supporting purchases, returns, and multiple payment methods for faster checkout.

## Prerequisites
- API Key and API Secret are required for authentication.
- A valid `MERCHANT-ID` must be provided.
- `terminal$id` is a mandatory field.
- Ensure the terminal is active and configured correctly.

## Request

### HTTP Method and URL
```
POST /orders
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `terminal$id` | string | Yes | ID of the checkout or payment terminal |
| `referenceId` | string | Yes | External reference ID for the order |
| `comments` | string | No | Additional comments or notes for the order |
| `customer` | object | No | Customer details for the order |
| &nbsp;&nbsp;&nbsp;&nbsp;`customerId` | string | No | Unique identifier for the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;`person` | object | No | Personal information of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | object | No | Full name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`firstName` | string | No | First name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`middleName` | string | No | Middle name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lastName` | string | No | Last name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | string | No | Email address of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | object | No | Phone number of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | string | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | string | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`birthDate` | string | No | Date of birth in YYYY-MM-DD format |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`personalNumber` | string | No | Personal identification number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`coordinationNumber` | string | No | Coordination number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryResidence` | string | No | Country of residence of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`gdNumber` | string | No | Government-issued identification number of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;`company` | object | No | Company information for corporate purchases |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vatId` | string | No | VAT ID of the company |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`poDetails` | string | No | Purchase order details for the company |
| `billing` | object | No | Billing contact and address |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | object | No | Full name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`firstName` | string | No | First name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`middleName` | string | No | Middle name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lastName` | string | No | Last name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | string | No | Billing email |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | object | No | Phone number for billing |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | string | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | string | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | object | No | Billing address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | string | No | Care of / attention |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | string | Yes | Primary address line |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | string | No | Address line 2 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | string | No | Address line 3 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | string | Yes | City |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | string | Yes | Postal/ZIP code |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | string | Yes | Country code (ISO 3166-1 alpha-2) |
| `shipping` | object | No | Shipping contact and address |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | object | No | Full name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`firstName` | string | No | First name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`middleName` | string | No | Middle name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lastName` | string | No | Last name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | string | No | Recipient email |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | object | No | Phone number for shipping |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | string | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | string | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | object | No | Shipping address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | string | No | Care of / attention |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | string | Yes | Primary address line |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | string | No | Address line 2 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | string | No | Address line 3 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | string | Yes | City |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | string | Yes | Postal/ZIP code |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | string | Yes | Country code (ISO 3166-1 alpha-2) |
| `orderLines` | array | Yes | List of items in the order |
| &nbsp;&nbsp;&nbsp;&nbsp;`id` | string | Yes | Order line identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;`externalItemId` | string | No | External order line identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | string | Yes | Product name |
| &nbsp;&nbsp;&nbsp;&nbsp;`categoryId` | string | No | Product category identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | string | No | Line item description |
| &nbsp;&nbsp;&nbsp;&nbsp;`quantity` | number | Yes | Quantity ordered. A negative value indicates a refund. |
| &nbsp;&nbsp;&nbsp;&nbsp;`amount` | object | Yes | Pricing details for the line item |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`regular` | number | Yes | Regular price amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`campaign` | number | No | Campaign/discount amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`shipping` | number | No | Shipping amount for this item in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`total` | number | Yes | Total line amount in the smallest currency unit (eg.,10 SEK is 1000 in amount) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`currency` | string | Yes | Currency (numeric ISO 4217 as string) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`tax` | array | No | Tax breakdown |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | number | Yes | Tax amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | number | Yes | Tax rate percentage |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | string | Yes | Tax type (e.g., VAT) |
| &nbsp;&nbsp;&nbsp;&nbsp;`unit` | string | No | Unit of measure. The possible values are 'm' , 'mm' , 'cm' , 'km' , 'in' , 'ft' , 'mi' , 'kg' , 'g' , 'mg' , 'lb' , 'oz' , 'l' , 'ml' , 'cu. m' , 'gal' , 'pt' , 'fl oz' , 'W' , 'kW' , 'kWh' , 'sq m' , 'sq km' , 'sq ft' , 'h' , 'min' , 's' , 'days' , 'wk' , 'mn' , 'yr' , 'nos'.  |
| &nbsp;&nbsp;&nbsp;&nbsp;`gtin` | string | No | Global Trade Item Number |
| &nbsp;&nbsp;&nbsp;&nbsp;`imageUrl` | string | No | Image URL for the product |
| &nbsp;&nbsp;&nbsp;&nbsp;`brand` | string | No | Brand name |
| &nbsp;&nbsp;&nbsp;&nbsp;`purchaseOrderId` | string | No | Mandatory purchase order identifier if its a return item. |
| &nbsp;&nbsp;&nbsp;&nbsp;`promotionApplied` | string | No | Product promotional campaign identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | object | No | Arbitrary metadata for the line |
| &nbsp;&nbsp;&nbsp;&nbsp;`storeId` | string | No | Store identifier |
| `totalOrderAmount` | object | No | Total amount details of the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`regular` | number | Yes | Total regular order amount in the smallest currency unit (e.g., 10 SEK is represented as 1000) |
| &nbsp;&nbsp;&nbsp;&nbsp;`campaign` | number | No | Total campaign or discount amount applied to the order in the smallest currency unit |
| &nbsp;&nbsp;&nbsp;&nbsp;`total` | number | Yes | Overall payable order amount in the smallest currency unit (regular - campaign + shipping + tax) |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | string | Yes | Order currency represented as a numeric ISO 4217 code (e.g., '752' for SEK) |
| &nbsp;&nbsp;&nbsp;&nbsp;`tax` | array | No | Order-level tax breakdown across applied tax categories |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | number | Yes | Total tax amount for the order in the smallest currency unit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | number | Yes | Applied tax rate percentage |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type` | string | Yes | Type of tax applied (e.g., VAT, GST) |
| `date` | string | No | Order date in ISO 8601 format (e.g., 2018-04-04T10:20:30+02:00). If not specified, the current date is used. |
| `metadata` | object | No | Arbitrary key-value style metadata items |
| `adjustments` | array | No | Order-level adjustments |
| &nbsp;&nbsp;&nbsp;&nbsp;`type` | string | Yes | Adjustment type |
| &nbsp;&nbsp;&nbsp;&nbsp;`value` | string | Yes | Adjustment value |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | string | No | Arbitrary key-value style metadata items. |
| `controlFunctions` | object | No | Advanced order/payment control configuration |
| &nbsp;&nbsp;&nbsp;&nbsp;`cancelPreviousPendingOrder` | boolean | No | Set as true when you want to cancel all previous pending orders |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderLineLevelCalculation` | boolean | No | Set this to true to apply campaign and shipping at row level. The total will be calculated as total = ((regular * quantity) - campaign) + shipping. Default is set to false. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serviceProviders` | array | No | External service providers participating in the transaction |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceProviderId` | string | Yes | Service provider identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | object | No | Share/fee configuration |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`percentage` | string | No | Percentage share (as string) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixed` | string | No | Fixed share amount (as string) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`adjustmentTypes` | array | No | Allowed adjustment types for this provider as an array of string. |
| &nbsp;&nbsp;&nbsp;&nbsp;`initiatePaymentsOptions` | object | No | Parameters for initiating payment |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentMethod` | string | No | Payment method to use |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`amount` | number | No | Amount to charge in smallest currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`paymentMethodParams` | object | No | Method-specific parameters |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`tokenId` | string | No | Saved payment token ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`swishMode` | string | No | Swish mode (e.g., ECOM) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`payeePhoneNumber` | object | No | Mandatory phone number for SWISH payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | string | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | string | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`giftCard` | object | No | Gift card payment details (Coming Soon) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`giftCardId` | string | No | Gift card identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`giftCardRedemptionMode` | string | No | Redemption mode (e.g., WALLET) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoice` | object | No | Invoice payment configuration |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoiceDistribution` | string | No | Distribution channel (e.g., EMAIL) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`contractReference` | string | No | Contract reference identifier |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debtCollectionEnabled` | boolean | No | Enable debt collection |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`dueDate` | string | No | Due date or relative duration (e.g., 30d) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`invoicePaymentMethods` | array | No | Allowed payment methods for invoice |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reminder` | boolean | No | Enable reminders |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serialSplitPaymentsMode` | array | No | An array of amounts in smallest currency unit to split the payment. The order of the amounts in the array will determine the order of the split payments. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`refundProcessingParams` | object | No | Parameters for processing refunds |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`purchasePaymentId` | string | No | Original purchase payment ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`refundReason` | string | No | Reason for refund (as provided) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`otherReason` | string | No | Other reason details |
| &nbsp;&nbsp;&nbsp;&nbsp;`tipsMode` | string | No | Tips configuration (STANDARD \| ROUNDUP \| NONE) |
| &nbsp;&nbsp;&nbsp;&nbsp;`cardStatementDescriptor` | string | No | Statement descriptor text |
| &nbsp;&nbsp;&nbsp;&nbsp;`includeAdjustmentsForRefund` | boolean | No | Applies for return orders on whether to include the adjustments as part of the refund or not. The default value is true. For partial returns, by default the first order will have includeAdjustments set to true and for the rest as false. |
| &nbsp;&nbsp;&nbsp;&nbsp;`lockToPaymentMethods` | array | No | An array of payment methods locked in. All available payment methods are supported. For example, ['CARD', 'KLARNA'] |
| &nbsp;&nbsp;&nbsp;&nbsp;`tapBeforeAmount` | boolean | No | If true, requires the customer to tap the card before the amount is entered, ensuring amount confirmation prior to payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`delayCapture` | boolean | No | Allows capture at a later time. |
| &nbsp;&nbsp;&nbsp;&nbsp;`delayPayout` | string | No | Delays the final amount paid out to the merchant after all deductions, in the format numbers + 'm' | 'h' | 'd' . |
| &nbsp;&nbsp;&nbsp;&nbsp;`fulfillmentDate` | string | No | Planned fulfillment date in ISO 8601 format (e.g., 2018-04-04T10:20:30+02:00) |
| &nbsp;&nbsp;&nbsp;&nbsp;`callBackUrl` | string | No | This is a dynamic callback URL that is used to perform webhook calls in relation to the order and payment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`throwErrorIfTerminalInactiveFor` | number | No | Threshold in ms if the respective terminal has been inactive for the given time frame. |
| &nbsp;&nbsp;&nbsp;&nbsp;`clearingCutOff` | string | No | Clearing cutoff configuration in ISO 8601 format (e.g., 2018-04-04T10:20:30+02:00) |
| &nbsp;&nbsp;&nbsp;&nbsp;`currency` | string | No | Order currency override |
| &nbsp;&nbsp;&nbsp;&nbsp;`authMode` | string | No | It can be either PRE-AUTH or AUTH. By default it is set to AUTH. If PRE-AUTH is selected delayCapture is automatically set to true. |
| &nbsp;&nbsp;&nbsp;&nbsp;`receipt` | object | No | Receipt handling options |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`autoPrintReceipt` | boolean | No | Auto-print setting |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`autoSendReceiptIfEmailAvailable` | boolean | No | Auto-send if email present |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`sequenceNumber` | string | No | Receipt sequence number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cashRegisterName` | string | No | Cash register name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`controlUnitSerialNumber` | string | No | Control unit serial number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`receiptRedirectURL` | string | No | Receipt redirect URL |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cashierName` | string | No | Cashier name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`promotionsToDisplay` | array\<any> | No | Promotions to display on receipt |
| &nbsp;&nbsp;&nbsp;&nbsp;`surcharges` | object | No | A record of additional fees or charges applied to the transaction, keyed by unique identifiers. (Coming Soon) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`domestic` | object | No | Surcharges for domestic transactions (same country). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`consumer` | object | No | Surcharges for consumer cards in domestic transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debit` | object | No | Surcharge definitions for consumer debit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units (e.g., 100 = 1.00). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge (e.g., 1.5 = 1.5%). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`credit` | object | No | Surcharge definitions for consumer credit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`corporate` | object | No | Surcharges for corporate cards in domestic transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debit` | object | No | Surcharge definitions for corporate debit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`credit` | object | No | Surcharge definitions for corporate credit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`international` | object | No | Surcharges for international transactions (outside the merchant’s country). |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`consumer` | object | No | Surcharges for consumer cards in international transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debit` | object | No | Surcharge definitions for consumer debit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`credit` | object | No | Surcharge definitions for consumer credit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`corporate` | object | No | Surcharges for corporate cards in international transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debit` | object | No | Surcharge definitions for corporate debit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`credit` | object | No | Surcharge definitions for corporate credit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`eea` | object | No | Surcharges for EEA (European Economic Area) transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`consumer` | object | No | Surcharges for consumer cards in EEA transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debit` | object | No | Surcharge definitions for consumer debit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`credit` | object | No | Surcharge definitions for consumer credit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`corporate` | object | No | Surcharges for corporate cards in EEA transactions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`debit` | object | No | Surcharge definitions for corporate debit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedAmount` | number | No | A flat surcharge amount in minor currency units. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fixedPercentage` | number | No | A percentage-based surcharge. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`credit` | object | No | Surcharge definitions for corporate credit cards. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&