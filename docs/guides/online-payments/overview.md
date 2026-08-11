# Overview

With Surfboard Payments, you can effortlessly integrate seamless payment acceptance into your POS systems. Whether you are interested in accepting payments in-store with pre-built checkout, hardware terminals, CPOC (Contactless Payment on COTS) or looking for solution to accept payments online, our comprehensive platform caters both, accommodating your diverse business needs. Beyond payment acceptance, our platform simplifies order management and automates various payment-related functions, providing a robust and all-in-one solution for your business.

We primarily offer two types of payment solutions:

1. **In-store payments**: Utilising our native hardware terminals and softPOS solutions.
2. **Online payments**: Using our online checkout solution.

The integration process varies based on the type of payment solution, with differences primarily in the building and testing phases for each type.

> *Here is a quick run down of the key steps you'll need to follow to build your payment integration for online payments.*

## Step 1: Create an Account

To build your payment integration with the Surfboard Payment Platform, you'll first need to create a developer account in the Surfboard Developer Portal. Creating a developer account allows you to:

- Access the console.
- Use the demo environment to design and develop your integration.
- Undergo certification and accept live payments.

## Step 2: Access Console and Generate API Credentials

After creating your developer account, you can access the Console in the developer portal. The Console lets you generate API keys, configure webhooks, access logs, and more. You can generate your API credentials (**API-KEY** and **API-SECRET**) from the Console. Or you can get access to the test keys though our support team through slack during onboarding. 

There are different environments involved during the process of building the payment integration with Surfboard, each serving a purpose in different scenarios. For more detailed information, you can refer to the [**environment**](/guides/online-payments/integrations/environments) documentation.

| **Environment** | **Supported Terminals** | **Cards Supported** |
| --- | --- | --- |
| Demo | Payment page mode | Only test cards can be used |
| Live | All online terminals | Live cards can be used. Transactions will be settled, and you'll receive payouts. |

## Step 3: Get Demo Environment Access

By default, you gain access to the demo environment when you create a developer account on the Surfboard developer portal. This environment allows you to:

- Build and test your integrations with Surfboard [**APIs**](/docs/integrations/api/api-home) and [**SDKs**](/docs/integrations/sdk-home).

## Step 4: Start Building your Integration

Before you can proceed to the live environment, you'll need to complete the following steps in the demo environment:

- [Onboarding](/guides/online-payments/onboarding/home)
- [Terminals registration](/guides/online-payments/terminals/home)
- [Integrate payment acceptance flow](/guides/online-payments/online-payment-terminals/home)
- [Post payments implementation](/guides/online-payments/post-payments/delay-capture)

{% callout type="note" label="Note" %}
The guides section is organized in a sequential order to help you complete the integration process smoothly. Start with [**Onboarding**](/guides/in-store-payments/onboarding/home), proceed to [**Terminals Setup**](/guides/in-store-payments/terminals/home), and then follow the steps to [**Accept Payments**](/guides/in-store-payments/accept-payments/home). Once the payment integration is complete, refer to the **Post-Payments** section for integrations such as refunds, reporting, and more. Additionally, the [**Administrative**](/guides/in-store-payments/administration/manage-merchants) section includes guides for functions like branding, merchant management, and other administrative tasks.
{% /callout %}

## Step 5: Get Certification and Accept Payments

Once your integration has been built and tested in the appropriate environments, and you have signed the contract and received approval, you'll have an onboarding call to test the integration and get certified. Upon successful certification, you will receive new credentials to access the live environment and start accepting payments.