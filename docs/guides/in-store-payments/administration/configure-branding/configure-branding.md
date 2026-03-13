---
title: "Configure Branding"
description: "Guide to configure branding for payment terminals in-store."
category: "In-Store Payment Guides"
path: "/guides/in-store-payments/administration/configure-branding/configure-branding.md"
---

# **Branding: In-store**

Surfboard Payments offers extensive branding capabilities across our native Android payment terminals and CheckoutX. From hardware to software, we provide customization options, allowing you to seamlessly integrate your brand identity throughout the entire payment process.

## In-Store Branding Capabilities

For in-store payments, branding can be applied across terminals like **SurfPad**, **SurfTouch**, and **SoftPOS**. Each of these options provides unique branding features:

-   **SurfPad**: Allows hardware customization with available colors. You can see the customisation options [**here**](https://www.surfboardpayments.com/products/surfpad/build-your-own).
-   **SurfTouch** & **SoftPOS**: Both run our **checkoutX** app, which supports branding in two modes:
    -   **Attached Mode**: In this mode, checkoutX connects with the merchant's POS. The order must be created in the POS, and the payment is also initiated directly from the POS.
    -   **Standalone Mode**: checkoutX operates independently, managing both order creation and payment initiation.

> SoftPOS: Essentially, it is the checkoutX app running on an Android device, providing flexible payment acceptance without the need for additional hardware.

Both SurfTouch and SoftPOS support **attached mode** and **standalone mode**, giving merchants flexibility based on their setup.

Here are the branding elements you can configure for in-store payments in SurfTouch and SoftPOS:

-   **Background color**
-   **Brand color**
-   **Accent color**
-   **Rect shape**
-   **Font type**
-   **Logo URL**
-   **Icon URL**

_Note: The branding UI differs between attached mode and standalone mode as shown in the following examples._

**STANDALONE MODE**

![](https://developer-portal-docs.web.app/images/brandingsolo.png)

**ATTACHED MODE**

![](https://developer-portal-docs.web.app/images/brandingattached.png)

## Configuration Hierarchy

| **Level**          | **Description**                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Partner Level**  | Branding applied at the partner level acts as a default for all associated merchants and stores.                  |
| **Merchant Level** | Overrides partner-level branding for specific merchants, ensuring that a merchant’s unique identity is reflected. |
| **Store Level**    | Overrides the configurations set on Partner and Merchant level to enable store-specific branding.                 |

## Activate branding

Partners can configure branding at various levels using both **Partner portal** and [**branding APIs**](/api/branding), which is applicable to both in-store and online payments.

### Pre-requisites

-   API Credentials and **`partnerId`**.
-   **`merchantId`**: Obtained by integrating a merchant via the [**Create Merchant API**](/api/merchants#Create-Merchant).
-   **`storeId`**: Generated when creating a store using the [**Create Store API**](/api/stores#Create-Store).

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/configure-branding/api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/configure-branding/partner-portal-tab.md"
  }
] /%}

## Fetching Branding

You can also retrieve existing branding configurations using the [**Fetch Branding APIs**](/api/branding):

-   [**Fetch Branding for Merchant**](/api/branding#Fetch-Branding-for-Merchant): Retrieve the current branding setup for a specific merchant.
-   [**Fetch Branding for Store**](/api/branding#Fetch-Branding-for-Store): Retrieves the current branding configuration for a particular store.
-   [**Fetch Branding for Partner**](/api/branding#Fetch-Branding-for-Partner): Retrieves the existing branding configurations at a partner level.

{% docfooter relatedLinks="[{ title: 'Hardware Terminals', url: '/guides/in-store-payments/hardware-terminals/surftouch/home' },{ title: 'Register Terminal', url: '/guides/in-store-payments/terminal-registration/home' },{ title: 'Manage Terminals', url: '/guides/in-store-payments/administration/manage-terminals/order-terminals/order-terminals' }]" /%}
