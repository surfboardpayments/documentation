1. An order is created in your system
2. You initiate a payment from your system, which will open checkoutX app with your store name/Logo.

    ![prebuilt app](https://developer-portal-docs.web.app/images/spospayments1.png "checkoutX")

3. CheckoutX will display a bottom sheet for the customer to add preferred tipping option for the payment.

    > The tips bottom-sheet will be displayed in both SoftPOS and Android payments terminals flow only if you have configured for tips. To know more about tips feature you can refer tips documentation

4. The customers tap their card on the device.
5. CheckoutX reads the card details and processes the payment.

    ![prebuilt app](https://developer-portal-docs.web.app/images/spospayments2.png "checkoutX")

6. Upon successful payment, CheckoutX displays the success screen.

{% callout type="note" label="Note" %}
Once the terminal prompts you to tap the card, you have a **30-second timeout window** to complete the payment. If it expires, you may need to restart the process.
{% /callout %}

> When you initiate a payment using our SoftPOS solution, the app switch will be performed from your POS app to CheckoutX and vice versa with the redirectURL you set up during the app switch integration.