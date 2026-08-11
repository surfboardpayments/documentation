# SurfTester: Integration tester app

## Introduction

The SurfTester app streamlines integration with Surfboard during your development stage. It mimics our TTP solution with the comfort of debugging your app with SurfTester in development/debug mode. You can download the app and start testing payments immediately without the hassle of waiting for a physical terminal.

**Note:** SurfTester is a development tool and is not brandable. For production, you'll use our standard hardware terminals or softPOS solution ([checkoutX](/guides/in-store-payments/integrations/prebuilt-apps/checkoutX)).

## Key Features

-   Register and test multiple terminals in one app.
-   Has built-in success and failure test cards.
-   Supports inter-app terminal registration.
-   Test app switch.
-   Test CNP(card not present) refund.

## Working flow of SurfTester app

During the order creation and payment initiation via SurfTester app, the following occurs

![Surftester](https://developer-portal-docs.web.app/images/surftester/flow.png "Surftesterflow")

## Get Started with SurfTester

To start testing payments using the app follow the steps below,

### Installation

SurfTester app is only available for Android devices. You can download and install from the Google Play Store [here](https://play.google.com/store/apps/details?id=com.surfboard.checkout_tester) or scan the QR code below.

![Surftester](https://developer-portal-docs.web.app/images/surftester/qr-code.png "Surftesterflow")

### **Register the Terminal**

Once you download the app, register your device as a terminal with Surfboard’s backend servers. To do so,

1. Tap **Get Started now**, a six-digit terminal registration code will be displayed on the screen.

![Surftester](https://developer-portal-docs.web.app/images/surftester/registration.png "Surftesterflow")

2. Use the six-digit code to register the terminal using the [**Register Terminal**](/api/terminals#Register-Terminal) API.

> _If you find any issue with the code generation, check your internet connection and restart the app._

Alternatively, if you are doing the app switch integration, you can perform inter-app registration. For more details, Refer to the [Inter-app guide](/guides/in-store-payments/integrations/prebuilt-apps/Inter-app#introduction).

3. After registration, SurfTester app will display an idle screen waiting for you to create an order.

## Order Creation and Payment initiation

Orders are created using the [**Create Order API**](/api/orders#Create-New-Order) and payments are initiated via [Initiate Payment API](/api/payments#Initiate-a-Payment) using ‘CARD’ as the payment method. During the transaction, payments can also be initiated with tips, which can be configured using the [**Tips API**](/api/tipsL).

{% callout type="note" label="Note" %}
Tips can be enabled after the registration or when the terminal is in idle state.
{% /callout %}

### Order Creation

![Surftester](https://developer-portal-docs.web.app/images/surftester/ordercreation.png "Surftester")

### Payment Initiation with the Tip

![Surftester](https://developer-portal-docs.web.app/images/surftester/paymentwithtip.png "Surftester")

**Selecting from Multiple cards**

1. After initiating a card payment , you'll see five different test cards, each with different payment scenarios. Tap **All Cards** to view all available test cards for various test cases.
2. Use the **Filters** to narrow down to your preferred test card by entering your specific card details.

![Surftester](https://developer-portal-docs.web.app/images/surftester/selectcard.png "Surftester")

3. Choose a card based on the payment scenario you want to test. A quick animation will play simulating card tap indicating that the selected test card is being used for payment.

![Surftester](https://developer-portal-docs.web.app/images/surftester/animation.png "Surftester")

### Payment Verification

If the order amount exceeds 400 during the payment process using built-in test cards, a separate screen will prompt you to enter PIN code. (PIN will be displayed in the bottom right corner of the test card)

![Surftester](https://developer-portal-docs.web.app/images/surftester/pinverification.png "Surftester")

### Payment Completion

Based on the type of test card you choose (approved or denied), the payment will proceed.

> _Please note that the transactions are conducted with built-in test cards, providing a real-time simulation to test the payment process._

-   When you use ‘Approved’ card for the payment, the transaction will be completed and displays **Transaction Successful.**
-   When you use ‘Declined’ card for the payment, transaction will not be completed and an error screen displays **Transaction Failed**, with the reason of failure.

> _If your payment fails, tap **Retry** and make the transaction with new payment._

![Surftester](https://developer-portal-docs.web.app/images/surftester/paymentstatus.png "Surftester")

## Using Multiple Terminals

SurfTester enables you to add multiple terminals in one device. This allows you to seamlessly switch between one terminal to another within the app and ensuring smooth function for all the connected terminals.

![Surftester](https://developer-portal-docs.web.app/images/surftester/multipleterminals.png "Surftester")

1. You can switch from one terminal to another using the terminal icon in the top right corner of the waiting screen.
2. To add a new terminal, tap **Add new terminal** on the bottom sheet.
3. After the successful registration of current terminal, it is ready to accept orders, whereas the old terminal will be inactive. You can easily switch back and forth with the registered terminals in SurfTester app.

## POS App Switch

This app switch feature is designed for testing the SurfTouch (Attached mode) terminal integration. In real-time deployments, SurfTouch terminals are manually registered before the client POS app is installed. This means the POS app needs to know the specific terminalId to communicate with its assigned terminal. To streamline the testing process and avoid manual terminalId entry, the **Open POS App** feature automatically switches to your POS app and transfers the registered **terminalId**.

![Surftester](https://developer-portal-docs.web.app/images/surftester/appswitch.png "Surftester")

## CNP Refund

This feature enables the testing of refunds for completed orders using the CNP payment method through the [**Initiate Payment API**](/api/payments#Initiate-a-Payment). For more details, refer to the [**Return/Refund Order**](/guides/in-store-payments/post-payments/return-refund) guide.

![Surftester](https://developer-portal-docs.web.app/images/surftester/cnprefund.png "Surftester")

{% docfooter relatedLinks="[{ title: 'CheckoutX', url: '/guides/in-store-payments/integrations/prebuilt-apps/checkoutX' },{ title: 'Inter-app guide', url: '/guides/in-store-payments/integrations/prebuilt-apps/Inter-app' },{ title: 'Terminal Registration', url: '/guides/in-store-payments/terminals/terminal-registration' }]" /%}
