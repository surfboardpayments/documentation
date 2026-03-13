## Overview

Merchant onboarding is the first step before accepting payments on Surfboard. The process creates a merchant profile, triggers a Know Your Business (KYB) verification, and sets up the merchant's store. You can onboard merchants for both in-store and online payments using the same API endpoint.

The typical flow is:

1. **Create Merchant** -- submit business details and receive a KYB application link
2. **KYB Process** -- the merchant completes their application via the hosted KYB page
3. **Check Application Status** -- poll for the application result or listen for webhooks
4. **Store Setup** -- optionally create additional stores after onboarding completes

## Prerequisites

Before onboarding merchants:

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Obtain your `partnerId` from the Developer Portal Console
3. Generate API credentials (API key and secret)

## Step 1: Create a Merchant

Send a `POST` request to the Create Merchant endpoint with the merchant's business details. The same endpoint handles both in-store and online merchants -- the difference is whether you include `onlineInfo` in the store configuration.

```
POST /partners/{partnerId}/merchants
```

### In-Store Merchant

A minimal request for an in-store merchant with a physical store created during onboarding:

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "1234567812"
  },
  "controlFields": {
    "store": {
      "name": "Main Street Store",
      "email": "store@example.com",
      "phoneNumber": {
        "code": "46",
        "number": "701234567"
      },
      "address": {
        "addressLine1": "Main Street 123",
        "city": "Stockholm",
        "countryCode": "SE",
        "postalCode": "123 45"
      }
    }
  }
}
```

### Online Merchant

For online payments, add the `onlineInfo` object to the store. This includes your webshop URL, terms and conditions, and privacy policy:

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "1234567812"
  },
  "controlFields": {
    "store": {
      "name": "My Webshop",
      "email": "shop@example.com",
      "phoneNumber": {
        "code": "46",
        "number": "701234567"
      },
      "address": {
        "addressLine1": "Main Street 123",
        "city": "Stockholm",
        "countryCode": "SE",
        "postalCode": "123 45"
      },
      "onlineInfo": {
        "merchantWebshopURL": "https://shop.example.com",
        "paymentPageHostURL": "https://pay.example.com",
        "termsAndConditionsURL": "https://shop.example.com/terms",
        "privacyPolicyURL": "https://shop.example.com/privacy"
      }
    }
  }
}
```

### Response

A successful request returns an `applicationId` and a `webKybUrl` for the merchant to complete their KYB application:

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "abc123-def456",
    "webKybUrl": "https://kyb.surfboardpayments.com/application/abc123-def456"
  },
  "message": "Application created successfully"
}
```

Share the `webKybUrl` with the merchant. They will use it to complete the KYB verification.

### Key Fields

| Field | Description |
|-------|-------------|
| `country` | Two-letter ISO country code (e.g., `SE`, `DK`, `NO`). Required. |
| `organisation.corporateId` | The merchant's corporate/organisation number. Required. |
| `organisation.legalName` | Legal name. Mandatory for Payment Facilitator (PF) partners. |
| `organisation.mccCode` | Merchant Category Code. Mandatory for PF partners. |
| `controlFields.store` | Include to create a store during onboarding (recommended). |
| `controlFields.showProductCatalogue` | Set `true` to show terminal catalogue during KYB. |
| `controlFields.preSelectProducts` | Pre-select terminals to ship automatically. |
| `controlFields.redirectUrl` | URL to redirect to after KYB submission. |
| `controlFields.generateShortLink` | Set `true` to receive a shortened KYB URL. |

### Pre-Selecting Terminals

You can pre-select devices for automatic shipment using `preSelectProducts`, or let the merchant choose from a catalogue by setting `showProductCatalogue` to `true` and optionally filtering with `displayProducts`:

```json
{
  "controlFields": {
    "showProductCatalogue": true,
    "preSelectProducts": [
      {
        "productId": "PRODUCT_ID",
        "quantity": "2",
        "pricingPlanId": "PLAN_ID"
      }
    ]
  }
}
```

## Step 2: KYB Process

After receiving the `webKybUrl`, the merchant completes a four-section application:

1. **About** -- company information, ownership details (UBOs and signatories)
2. **Store Information** -- store name, address, business details, and optionally online payment info
3. **Bank Information** -- IBAN, BIC, and a bank statement upload for verification
4. **Product Selection** -- terminal and accessory selection with quantities

After review and submission, all signatories and UBOs receive a link to digitally sign the application. The compliance team typically reviews applications within 3-4 business days.

> **Tip:** Use `controlFields.preEnteredInformation` to pre-fill parts of the KYB form (opening hours, estimated sales, etc.) and reduce friction for the merchant.

## Step 3: Check Application Status

Poll the application status to track progress:

```
GET /partners/{partnerId}/merchants/{applicationId}/status
```

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "abc123-def456",
    "applicationStatus": "MERCHANT_CREATED",
    "merchantId": "m-789",
    "storeId": "s-012"
  },
  "message": "Application status retrieved"
}
```

### Application Statuses

| Status | Description |
|--------|-------------|
| `APPLICATION_INITIATED` | Application created, KYB not yet completed. |
| `APPLICATION_SUBMITTED` | Merchant submitted the KYB form. |
| `APPLICATION_PENDING_INFORMATION` | Additional information required from the merchant. |
| `APPLICATION_SIGNED` | All signatories have signed. |
| `APPLICATION_COMPLETED` | Compliance review passed. |
| `APPLICATION_REJECTED` | Application was rejected. |
| `APPLICATION_EXPIRED` | Application expired before completion. |
| `MERCHANT_CREATED` | Merchant and store are live. `merchantId` and `storeId` are returned. |

> **Tip:** You can also receive status updates via webhooks instead of polling. Configure webhooks in the Developer Portal Console.

## Step 4: Create Additional Stores

A default store is typically created during onboarding. If the merchant needs additional stores, use the Create Store API:

```
POST /partners/{partnerId}/merchants/{merchantId}/stores
```

```json
{
  "storeName": "Second Location",
  "email": "store2@example.com",
  "phoneNumber": {
    "code": 46,
    "number": "709876543"
  },
  "address": "Second Street 456",
  "city": "Gothenburg",
  "zipCode": "411 01",
  "country": "SE"
}
```

For an online store, add `onlineInfo` with your webshop URLs:

```json
{
  "storeName": "Online Store",
  "email": "online@example.com",
  "phoneNumber": {
    "code": 46,
    "number": "709876543"
  },
  "address": "Main Street 123",
  "city": "Stockholm",
  "zipCode": "103 16",
  "country": "SE",
  "onlineInfo": {
    "merchantWebshopURL": "https://shop.example.com",
    "termsAndConditionsURL": "https://shop.example.com/terms",
    "privacyPolicyURL": "https://shop.example.com/privacy"
  }
}
```

### Domain Verification (Online Stores)

Online stores in production require domain verification before they can process payments:

1. **Get verification keys** -- returned in the Create Store response (`merchantURLDomainVerificationKey` and `paymentPageURLDomainVerificationKey`)
2. **Add DNS TXT record** -- add the verification key as a TXT record on your domain
3. **Trigger verification** -- Surfboard checks automatically every 6 hours, or use the Verify Domain API to trigger it manually
4. **Monitor status** -- use the Fetch Store Details API to check the `onlineOnboardingStatus` field

> **Note:** Domain verification is only required in production (not in demo/sandbox). A verified domain applies to all merchants under the same partner account.

## Reference

- [Create Merchant API](https://developers.surfboardpayments.com/api/merchants)
- [Check Application Status API](https://developers.surfboardpayments.com/api/merchants)
- [Create Store API](https://developers.surfboardpayments.com/api/stores)
- [Verify Domain API](https://developers.surfboardpayments.com/api/stores)
- [Webhook Reference](https://developers.surfboardpayments.com/references/webhooks/merchants/application-completed)
- [Developer Portal](https://developers.surfboardpayments.com/)