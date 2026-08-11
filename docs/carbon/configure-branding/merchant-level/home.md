# Configure Branding

**Branding** is a simple process that enables you to customize the terminal interface with your logo, colors to offer a seamless and professional payment experience.

For in-store payments, branding can be applied across terminals like **SurfPad**, **SurfTouch**, and **SoftPOS**. Each of these options provides unique branding features:

- **SurfPad**: Allows hardware customization with available colors. You can see the customisation options [here](https://www.surfboardpayments.com/products/surfpad/build-your-own).
- **SurfTouch** & **SoftPOS**: Both run our **checkoutX** app, which supports branding in two modes:
    - **Attached Mode**: In this mode, checkoutX connects with the merchant's POS. The order must be created in the POS, and the payment is also initiated directly from the POS.
    - **Standalone Mode**: checkoutX operates independently, managing both order creation and payment initiation.

> SoftPOS: Essentially, it is the **checkoutX** app running on an Android device, providing flexible payment acceptance without the need for additional hardware.

Both SurfTouch and SoftPOS support **attached mode** and **standalone mode**, giving merchants flexibility based on their setup

The branding UI differs between attached mode and standalone mode as shown in the following examples.

## STANDALONE MODE

![Standalone Mode](https://developer-portal-docs-test.web.app/images/brandingsolo.png "Standalone Mode")

## ATTACHED MODE

![Attached Mode](https://developer-portal-docs-test.web.app/images/brandingattached.png "Attached Mode")

## Configuration Hierarchy

| **Level** | **Description** |
| --- | --- |
| **Partner Level** | Branding applied at the partner level acts as a default for all associated merchants and stores. |
| **Merchant Level** | Overrides partner-level branding for specific merchants, ensuring that a merchant’s unique identity is reflected. |
| **Store Level** | Overrides the configurations set on Partner and Merchant level to enable store-specific branding. |

## Activate branding

Partners can configure branding at various levels using both **Partner portal** and **branding APIs**, which is applicable to both in-store and online payments.

## Create Branding for Merchant

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "carbon/configure-branding/merchant-level/api.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "carbon/configure-branding/merchant-level/partner-portal.md"
  }
] /%}