Our in-store solution supports a variety of payment methods, with card payments enabled by default for all merchants. Additional methods can be activated at either the API or partner portal.

### Activate Additional Payment Methods

Additional payment methods can be activated at merchant and partner level

- Using API
- Using partner portal

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "guides/in-store-payments/advanced-payment-features/additional-payment-methods/api-tab/api-home.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "guides/in-store-payments/advanced-payment-features/additional-payment-methods/partner-portal-tab.md"
  }
] /%}

{% callout type="note" label="Note" %}
1. Use the [**Fetch All Payment Methods API**](/api/payment-methods#Fetch-All-Payment-Methods) to obtain a comprehensive list of all the payment methods currently active under a merchant. 
2. Use the [**Fetch Payment Method Details API**](/api/payment-methods#Fetch-Payment-Method-Details) by providing the Payment Method ID to obtain specific details about a particular payment method.
3. Use the [**Deactivate Payment Method API**](/api/payment-methods#Deactivate-Payment-Method) to disable a specific payment method associated with a merchant or store
{% /callout %}
