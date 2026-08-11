---
title: "Online Terminal Registration"
description: "Guide to registering online terminals."
category: "Online Payments"
path: "/guides/online-payments/terminals-registration/terminal-registration.md"
---

# **Online Terminal registration**

Terminal registration for online terminal works the same way as in-store. This process requires store ID which you will get on completing the store onboarding process. For store onboarding refer to the [**Online Store Setup**](https://developers.surfboardpayments.com/guides/online-payments/onboarding/online-store).

After store onboarding, any number of terminals can be registered under a store. We provide three types of online terminals and you can specify the type during registration.

1. **Payment Page**
2. **SelfHostedPage (SDK)**
3. **MerchantInitiated**

> The availability of the terminals is dependent on the presence of the **`paymentPageHostURL`** and its verification.

### Pre-requisites

- API credentials or Partner Portal access.
- a valid **`storeId`**: Complete store onboarding to obtain a storeId (see [**Online Store Setup**](https://developers.surfboardpayments.com/guides/online-payments/onboarding/online-store)).

## To register online terminals

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/online-payments/terminal-registration/register-api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/online-payments/terminal-registration/register-partner-portal-tab.md"
  }
] /%}

