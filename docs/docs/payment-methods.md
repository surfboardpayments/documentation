# Payment methods

Surfboard Payments offers a comprehensive range of payment methods through both our in-store and online checkout solutions. This allows you to offer multiple payment methods at the checkout there-by giving your customers greater levels of convenience and speed. This flexibility helps merchants meet their customers' payment preferences.

## Payment types

We offer the following types of payment solutions, each supporting a number of payment methods:

1. **Online Payments**
2. **In-store Payments**

## 1. Online Payments

Our online checkout solution supports a variety of payment methods, offering customers multiple options to complete their transactions seamlessly. Once you are onboarded as our online payments [**Partner**](/docs/partners) or [**Merchant**](/docs/merchants), all the supported payment methods are available on your online checkout page by default.

### Supported Payment Methods

The following payment methods are currently supported by default on the online checkout page:

-   **Card**: Includes Visa, Mastercard, AMEX, and Discover
-   **Digital Wallets**: Supports Apple Pay and Google Pay
-   **Swish**
-   **KLARNA**

## 2. In-store payments

Our in-store payment solution, which includes both SoftPOS and hardware payment terminals, accommodates a number of payment methods, ensuring convenience and flexibility for both your merchants and customers. The default payment method enabled for all merchants is card payments, and the additional payment methods can be activated at different levels by [**Partners**](/docs/partners) or [**Merchant**](/docs/merchants).

### Supported Payment Methods

The supported payment methods include:

-   **Card** (Enabled by default for all merchants)
-   **Swish** (Enabled by default for all merchants)
-   **KLARNA** (additional payment method)

> Note: To activate American Express (AMEX) for a specific merchant, partners need to register the merchant with AMEX and acquire an AMEX merchant ID (amexMID). This ID should then be included in the Activate AMEX for Merchants API to complete the activation process.

### Activate Additional Payment Methods

Additional payment methods can be activated at merchant level and store level. Merchants can activate and manage additional payment methods at store level from the [**Merchant Dashboard**](/guides/in-store-payments/integrations/merchant-portal). Partners can use the [**Payment Methods APIs**](api/payment-methods) to activate and manage payment methods for the merchants. When you activate an additional payment method, you will receive a Payment Method ID, which is required for its management.

### Activating Additional Payment Methods at Merchant Level

To activate payment methods at the merchant level, partners can use the following APIs:

-   [**Activate SWISH for Merchant API**](/api/payment-methods#Activate-SWISH-for-Merchant): Enables the Swish payment method for a specific merchant.
-   [**Activate KLARNA for Merchant API**](/api/payment-methods#Activate-KLARNA-for-Merchant): Activates the KLARNA payment method for a specific merchant.

### Fetch All Payment Methods

Partners can use the [**Fetch All Payment Methods API**](/api/payment-methods#Fetch-All-Payment-Methods) to obtain a comprehensive list of all the payment methods currently active under a merchant. This API provides information such as:

-   Payment Method ID
-   Payment method
-   Message describing the status of the request

### Fetch Individual Payment Methods

Partners can use the [**Fetch Payment Method Details API**](/api/payment-methods#Fetch-Payment-Method-Details) by providing the Payment Method ID to obtain specific details about a particular payment method. This includes:

-   Payment Method ID
-   Payment method
-   Status of the payment method (activated or deactivated)
-   AMEX MID (for merchants using the AMEX payment method)
-   Acquirer MID (for merchants using card payments, if onboarded through a Payment Facilitator or Acquirer)

### Deactivate Payment Methods

Partners can use the [**Deactivate Payment Method API**](/api/payment-methods#Deactivate-Payment-Method) to disable a specific payment method associated with a merchant or store. The Payment Method ID is required to deactivate a payment method.

{% docfooter relatedLinks="[{ title: 'Stores', url: '/docs/stores' },{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' }]" /%}
