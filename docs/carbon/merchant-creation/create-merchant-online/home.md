# Create Merchant

Merchant creation is the first step in setting up a business to accept payments on the Surfboard platform. During this stage, key business details are captured, and an initial merchant profile is established. Once created, the merchant can proceed with onboarding, store setup, and further configuration to start processing payments.

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "carbon/merchant-creation/create-merchant-online/create-merchant-api.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "carbon/merchant-creation/create-merchant-online/create-merchant-partner-portal.md"
  }
] /%}

## Domain Verfication

In the production environment, the merchant's domains must be verified to ensure ownership before proceeding with the store onboarding session. The steps are as follows,

- **Get Verification Keys**: When a store is created or updated, unique domain verification keys are generated for both online terminal modes—`paymentPageHostURL` (if provided) and `merchantWebshopURL`. Alternatively, you can use the [**Fetch Store Domains API**](https://developers.surfboardpayments.com/api/stores#Fetch-Store-Domains) to retrieve the store domain details.
- After the store is approved, terminals are automatically registered for the `PaymentPage` and `MerchantInitiated` online terminal modes.
- **Verify Your Domain**: Add these keys as a **TXT record** to your domain's DNS settings. Surfboard will automatically attempt verification every 6 hours, or you can manually trigger a verification attempt using the [**Verify Domain API**](https://developers.surfboardpayments.com/api/stores#Verify-Store-Domain).
- **Check Status**: Monitor the verification status using the [**Fetch Store Details API**](https://developers.surfboardpayments.com/api/stores#Fetch-Store-Details).

{% callout type="caution" label="Security Important" %}
- Required **only in production** (skip in demo).
- **Mandatory** for store onboarding, but **does not guarantee approval**.
- Onboarding team reviews domain, T&C, Privacy Policy, and store details. Merchants must update incomplete or insufficient info.
- **One-time per partner account**: a verified domain (e.g., *example.com*) applies to all merchants under the same partner.
{% /callout %}

## Store Approval & Terminal Registration
After domain verification, Surfboard reviews the store’s compliance details, typically within one business day. Once approved, the Store ID is issued, and terminals are automatically registered for the `PaymentPage` and `MerchantInitiated` modes, allowing you to proceed with payment integration.

## Completing Your KYB URL Application

To complete your merchant application, you must fill out four sections in order. If your partner has already pre-filled some information, those sections will be automatically completed for you.

**1. About Section**

- **Company Information**: Search for your company by name or enter your organization number to find it.
- **Ownership Details**: Provide details for all Ultimate Beneficiary Owners (UBOs) and signatories. They will receive separate email links to sign the application.

**2. Store Information**

- **Store Details**: Provide key details like your store's name, address, and contact information.
- **Business Information**: Include opening hours, estimated sales, and transaction details.
- **Online Payments**: If applicable, check the box to provide details for your online store.

**3. Bank Information**

- **Banking Details**: Provide your bank's IBAN and BIC for settlements.
- **Verification**: Upload a recent bank statement for verification.

> Note: If you skip this, bank details will be requested later via a separate link.
> 

**4. Product Selection**

- **Terminals**: Add the terminals and accessories you need.
- **Quantities**: Adjust quantities as necessary.

**Review and Submission**

- **Review**: Once all sections are complete, review the application. You can go back to any section to make changes.
- **Submit**: Click **Apply Now**. All signatories and UBOs will receive a link to digitally sign the application.

### **Application Review**

- **Review Process**: The compliance team will review your application.
- **Timeline**: The review is typically completed within **3-4 business days**.