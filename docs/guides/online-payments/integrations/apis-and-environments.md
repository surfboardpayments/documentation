---
title: "APIs and Environments"
description: "Understanding Surfboard APIs and available environments"
category: "Integrations"
path: "/guides/online-payments/integrations/apis-and-environments.md"
---

# APIs and Environments

## Understanding Environments

Environments are essential for organizing and controlling features throughout your development lifecycle, from building and testing integrations to accepting live payments.

Surfboard provides two key environments:

-   **Demo Environment**
-   **Live Environment**

Here is an overview of each environment.

| **Environment** | **Supported Terminals** | **Cards Supported**                                                               |
| --------------- | ----------------------- | --------------------------------------------------------------------------------- |
| Demo            | Payment page mode       | Only test cards can be used                                                       |
| Live            | All online terminals    | Live cards can be used. Transactions will be settled, and you'll receive payouts. |

## Access environments

This section provides an overview of how to access various environments.

### Demo environment

The demo environment is a testing ground for developing and testing payment integrations without affecting real transactions. Once you login the Surfboard Developer Portal, you get access to the demo environment where you can generate your API credentials for testing.

The demo environment allows you to:

-   Use test cards in payment page mode
-   Test your online integrations with the APIs and SDKs.

{% callout type="note" label="Important" %}
Any transactions made with real cards in the demo environment are automatically voided after 30 minutes and are never captured or settled.
{% /callout %}

### Live environment

The production environment is where you accept live payments. Access to the live environment is provided only after Surfboard certifies your integration in a production setup. Upon certification, you need to obtain a new set of API credentials to access the live environment. Additionally, you should update the test URL with the live URL, and replace the test API Key and API Secret with the live environment API Key and API Secret.

The live environment allows you to:

-   Create orders
-   Perform live transactions
-   Display receipts, Branding, etc

## Surfboard APIs

Surfboard APIs simplifies the integration of secure and efficient payment solutions into your online platform. Our APIs provide payment functionalities for both webapp or mobile application, creating a secured payment experience. Also these APIs allows you to accept payments, process orders, and manage all payment-related tasks in the online terminals across various online payment.

## Types of APIs

{% apidiagram type="online" /%}

## Understanding the Surfboard API Documentation

The API reference section is divided into categories, with each set of APIs having its own parameters and requirements, all explained in detail. For example, APIs related to [**merchants**](/docs/merchants) are grouped under [**Merchants APIs**](/api/merchants), and those related to [**payments**](/docs/payments) are listed under [**Payments APIs**](/api/payments).


{% callout type="tip" label="Getting Started" %}
New developers should start with our [Initial Setup](/guides/online-payments/integrations/initial-setup) to begin the integration.
{% /callout %}

{% docfooter relatedLinks="[{ title: 'Understand API Architecture', url: '/guides/online-payments/integrations/api-architecture' },{ title: 'Understand our platform structure and payment flow', url: 'guides/online-payments/integrations/platform-structure' }]" /%}
