**CheckoutX** is our pre-built, custom-branded payment application. It integrates with your Point-of-Sale (POS) system to handle payments. It comes pre-installed on native Surfboard terminals (**SurfTouch, SurfPrint**) or can be installed as a **SoftPOS solution** on NFC-enabled Android devices via the Google Play Store.

CheckoutX supports:

- Multiple payment methods
- Process contactless card payments
- Display digital receipts
- Customisable branding options (White label app)

### Integration Prerequisites & Steps

- **Prerequisites**:
    - Your external system must be capable of initiating **API calls** to Surfboard.
    - **App-Switch Integration** is required if the POS app and CheckoutX are on the *same device*.
- **Integration Flow Overview**:
    1. **Download CheckoutX** (required only for SoftPOS on COTS devices).
    2. **Register Terminal** (omitted for App-Switch integration).
    3. **Create Order** (in your system).
    4. **Initiate Payment** (in your system).
    5. **Check Payment Status** (in your system).

{% toggle header="CheckoutX Integration Flow" markdocsrc="guides/in-store-payments/in-store-payment-solutions/checkoutx/checkoutx-integration-flow/checkoutx-integration-flow.md" /%}

{% toggle header="Refunds" markdocsrc="guides/in-store-payments/in-store-payment-solutions/checkoutx/refunds.md" /%}

{% toggle header="Branding" markdocsrc="guides/in-store-payments/in-store-payment-solutions/checkoutx/branding.md" /%}
