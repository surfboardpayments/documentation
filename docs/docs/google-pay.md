# Google Pay™

## Introduction

Surfboard allows you to accept Google Pay™ from customers for **online payments**, enabling them to complete purchases using their debit or credit cards linked to their Google Accounts.

## Integration Options

Surfboard offers two modes for Google Pay™ integration:

1. **PaymentPage Mode**: Google Pay™ is enabled by default for all Surfboard partners with no additional code implementation
2. **SelfHostedPage (Online SDK) Mode**: For merchant seeking greater flexibility with the checkout page, consider our **SelfHostedPage (Online SDK)**. This option involves some additional setup but offers you with enhanced control over branding.

{% callout type="note" label="Note" %}
All merchants must adhere to the Google Pay™ APIs Acceptable Use Policy and accept the terms defined in the Google Pay™ API Terms of Service.
{% /callout %}

## Payment Processing Overview

Google Pay™ can be used to complete payments on all supported devices using Surfboard's online solution. The process works as follows:

1. Customers select the Google Pay™ button on the checkout page
2. If they have saved cards, they can quickly select their preferred option
3. If not, they'll be prompted to link a new card
4. Once confirmed, the card is charged like any standard transaction

The following setup is required only to our **SelfHostedPage (Online SDK)** flow

## Prerequisites

- A Google account with administrative access
- Your business website domain(s)
- Required business images for Google Pay™ branding

## Step 1: Access Google Pay™ Business Console

1. Navigate to [Google Pay business console](https://pay.google.com/business/console)
2. Sign in with your Google account
3. Either create a new business or select an existing one

## Step 2: Domain Configuration

1. Provide your store's domain for integration setup
    - Our API will verify and register all domains under your ownership
    - This step enables the required Web SDK support
2. In your Web SDK configuration, ensure the `mountGooglePayWidget` field is properly set

## Step 3: Google Pay™ API Configuration

1. In the left navigation bar in Google pay console, locate and click on "Google Pay™ API"
2. You'll find the following sections:
    - API Integration Overview
    - Developer Documentation
    - Example Integrations
    - Android App Integration
    - Website Integration
    - Direct Integration (not required for standard setup)

## Step 4: Website Integration Setup

1. Select **Website Integrate**
2. Click **Add website**
3. Complete the integration form:
    - Choose **Gateway** as your Integration type
    - Upload required business images
    - Fill in all required business information
4. Submit the form for review

## Step 5: Activation

After submission, Google will review your integration request and activate Google Pay™ for your website. You'll receive a confirmation once the setup is complete.

## SDK Configuration

When using the Online SDK, include the **`gateway`** and **`gatewayMerchantId`** parameters:

-   The **`gateway`** parameter should be set to **`"surfboard"`** and the **`gatewayMerchantId`** to your merchant identifier, as shown below:

```json
{
    "gateway": "surfboard",
    "gatewayMerchantId": "<your_surfboard_merchant_id>"
}
```

### Supported Card Networks and Auth Methods

Surfboard supports the following payment card types and authentication methods:

```json
const allowedCardNetworks = ["AMEX", "DISCOVER", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

```

{% callout type="note" label="Note" %}
Google Pay™ transactions operating in PAN_ONLY mode use the actual card number (PAN) for the transaction and must comply with the 3D-Secure (SCA) mandate. If 3D-Secure applies to your market region, Surfboard will automatically enable 3D-Secure on your merchant account. In contrast, CRYPTOGRAM_3DS uses a secure token generated during the transaction process, typically for tokenized cards, which do not require 3D-Secure
{% /callout %}

### Billing Address Data

Billing address to be submitted by the developer for address verification will be handled by Surfboard on behalf of our merchants. To know more, see the [**BillingAddressParameters**](https://developers.google.com/pay/api/web/reference/request-objects#BillingAddressParameters).

### IsReadyToPayRequest

The **`IsReadyToPayRequest`** specifies which payment methods are supported. Here’s how it’s handled in our SDK:

```json
function getGoogleIsReadyToPayRequest() {
  return baseCardPaymentRequest;
}

```

To check if Google Pay™ is ready:

```json
paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(function(response) {
        if (response.result) {
          addGooglePayButton();
          // @todo prefetch payment data to improve performance after confirming site functionality
          // prefetchGooglePaymentData();
        }
      })
      .catch(function(err) {
        // show error in developer console for debugging
        console.error(err);
      });

```

{% callout type="note" label="Note" %}
Some Google Pay™ and Google Wallet features may be unavailable in certain countries or regions. Learn more about it [here](https://support.google.com/googlepay/answer/12429287#zippy=%2Cpay-online-or-in-apps).
{% /callout %}

Below is an example of how to process **Google Pay™** encrypted data through Surfboard APIs

```json
import SurfboardGooglePayClient from '@surfboard/gpay'
function processPayment(paymentData) {
  // show returned data in developer console for debugging
    console.log(paymentData);
  // To do pass payment token to your gateway to process payment
  // DO NOT save the payment credentials for future transactions,
  // unless they're used for merchant-initiated transactions with user
  // consent in place.
  paymentToken = paymentData.paymentMethodData.tokenizationData.token;
  return SurfboardGooglePayClient.process(paymentData);
}

```

### Integration Checklist

We recommend using the [**Google Pay™ Web Integration checklist**](https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist) to ensure all integration steps are completed. Once validated, you can request production access.

### Additional Google Pay™ Resources

-   **Google API Documentation**: [**Google Pay™ Web Developer Documentation**](https://developers.google.com/pay/api/web/overview)
-   **Brand Guidelines**: [**Google Pay™ Web Brand Guidelines**](https://developers.google.com/pay/api/web/guides/brand-guidelines)

## Google Pay™ for Android merchants (coming soon)

We are currently working on enabling Google Pay™ support for our Android merchants. Once available, you will be able to integrate Google Pay™ into your Android apps, allowing customers to make payments seamlessly using their saved cards.

For more information about Google Pay™ on Android, you can refer to the following resources:

-   [**Google Pay™ Android Developer Documentation**](https://developers.google.com/pay/api/android/overview)
-   [**Google Pay™ Android Integration Checklist**](https://developers.google.com/pay/api/android/guides/test-and-deploy/integration-checklist)
-   [**Google Pay™ Android Brand Guidelines**](https://developers.google.com/pay/api/android/guides/brand-guidelines)

{% docfooter relatedLinks=[{'title':'Manage your payments','url':'/guides/in-store-payments/post-payments/manage-your-payments/fetch-payment'},{'title':'Payment methods','url':'/docs/payment-methods'},{'title':' Online SDK','url':'/guides/online-payments/online-payment-terminals/online-sdk-guide'}] /%}
