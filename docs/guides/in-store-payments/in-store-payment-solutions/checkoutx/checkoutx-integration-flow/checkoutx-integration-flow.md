The following steps outline the entire process required to integrate your external system and begin processing payments with CheckoutX.
![prebuilt app](https://developer-portal-docs.web.app/images/cxpaymentflow.png "checkoutX")

1. **Download CheckoutX**
    - Install the app from the Google Play Store for **SoftPOS solutions** (Android COTS devices).
    
    {% callout type="note" label="Note" %}
    The app comes pre-installed on native Surfboard terminals (SurfTouch, SurfPrint).
    {% /callout %}
    
2. **Register Terminal**
    - Register the device on Surfboard's servers using the six-digit registration code via the **`registerTerminal API`**.
    - You receive a unique **`terminalId`**, which is required for all future transactions. (This step is omitted if you are using the App-Switch integration logic.)
3. **Create Order**
    - In your POS system, use the **`terminalId`** to create a new order.
    - The order, identified by its **`orderId`**, contains the transaction details and total payable amount.
4. **Initiate Payment**
    - Initiate the payment from your system using the **`initiatePayment API`**, passing the **`orderId`** and **`terminalId`**.
    
    {% callout type="note" label="Note" %}
    If you are integrating CheckoutX in app-switch flow, you will need to perform an app-switch from your app to the CheckoutX after payment initiation.
    {% /callout %}
    
    Once the payment is initiated, the CheckoutX processes it as SoftPOS solution and Android Payment Terminal (SurfTouch / SurfPrint) as detailed below:

    {% tabs tabs=[
  {
    label: "For SoftPOS Solution",
    markdocSrc: "guides/in-store-payments/in-store-payment-solutions/checkoutx/checkoutx-integration-flow/softpos-tab.md"
  },
  {
    label: "For Android Payment Terminal",
    markdocSrc: "guides/in-store-payments/in-store-payment-solutions/checkoutx/checkoutx-integration-flow/android-tab.md"
  }
] /%}
5. **Digital Receipts**
After any successful payment, CheckoutX displays the receipt digitally. This can be shared with the customer via a QR code, email, or, in the case of a SurfPrint terminal, provided as a printout.
6. **Check Payment Status**
    - Verify the final outcome of the transaction (SUCCESS, CANCELLED, or FAILED) by listening to **webhooks** or querying the **`check payment status API`**.
