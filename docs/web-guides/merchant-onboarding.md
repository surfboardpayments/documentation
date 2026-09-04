# Merchant Onboarding

Create a merchant application through the Partner API and hand the merchant a prefilled web KYB link. Registry lookup, automatic business classification, people and signing, application status, and store setup.

Source: https://www.surfboardpayments.com/developers/guides/merchant-onboarding
Category: online
Tags: Onboarding, Merchant, KYB, Prefill, MCC, Store, Partners, API

---
## Overview

Merchant onboarding is the first step before accepting payments on Surfboard. A partner creates a merchant application through the API and receives a ready-to-use web onboarding link (**web KYB**, Know Your Business) that is handed to the merchant to finish. You can onboard merchants for both in-store and online payments using the same endpoint.

When you pre-enter the merchant's details, Surfboard does two things before returning the link:

1. **Registry prefill** -- the company's registry data (legal name, address, directors and beneficial owners where available) is resolved from the national business registry for the merchant's country.
2. **Business classification (MCC)** -- the free-text `businessDescription` is classified into a merchant category, which in turn determines the exact documents the merchant must supply (a taxi licence, association statutes, and so on) and any category-specific questions.

The link that comes back is therefore already populated. The merchant only has to add what a partner cannot know for them: their **bank account**, any **required documents** for their business category, and the **signing** (identity verification and e-signature) of the signatories and beneficial owners.

If any part of the prefill cannot be resolved, the call still succeeds and returns a working link. The merchant simply fills those sections in the web KYB flow as normal. Prefill is an accelerator, never a blocker.

The typical flow is:

1. **Create Merchant** -- submit the merchant's details and receive the web KYB link
2. **Merchant completes the web KYB** -- confirms the prefilled data, adds bank account and documents, signs
3. **Check Application Status** -- poll for the result or listen for webhooks
4. **Store Setup** -- optionally create additional stores after onboarding completes

## Prerequisites

Before onboarding merchants:

1. Create a developer account at the [Developer Portal](https://developers.surfboardpayments.com/sign-up)
2. Obtain your `partnerId` from the Developer Portal Console
3. Generate API credentials (API key and secret)

Merchant applications in test and demo environments are approved automatically.

## Step 1: Create a Merchant Application

Send a `POST` request to the Create Merchant endpoint. The same endpoint handles in-store and online merchants; the difference is whether you include `onlineInfo` in the store configuration.

```
POST /partners/{partnerId}/merchants
```

The body has three parts:

- `country` and `organisation` -- who the merchant is. Required.
- `controlFields` -- how the onboarding should behave (store, acquirer, flags). Optional.
- `controlFields.preEnteredInformation` -- the data you prefill on the merchant's behalf. Optional, but this is what unlocks the accelerated flow.

### The minimum request

Country and corporate ID are enough to create an application. Surfboard resolves the legal name and registered address from the business registry, and the merchant fills in everything else in the web KYB:

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5591631360"
  }
}
```

`country` is one of `SE`, `NO`, `DK`, `FI`, `IE`, and the format of `corporateId` is validated per country. Add `localeSelected` (`sv`, `da`, `fi`, `en`) to set the language of the web KYB; it defaults to the country's language.

### Create the first store in the same call

Include `controlFields.store` to create the merchant's first store during onboarding. This is recommended, since the merchant needs a store before it can take payments. `paymentChannels` tells Surfboard where the merchant takes payments; at least one channel must be `true`, and `physicalSharePercent` (1-99) only matters when both are.

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5591631360"
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
      },
      "paymentChannels": { "physical": true, "online": false }
    }
  }
}
```

For online payments, add the `onlineInfo` object to the store with the webshop URL, terms and conditions, and privacy policy. To stop the merchant from changing those URLs in the web KYB, set `controlFields.disableFields.onlineInfo` to `true`; that then requires `merchantWebshopURL`, `termsAndConditionsURL` and `privacyPolicyURL` in the same request.

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5591631360"
  },
  "controlFields": {
    "disableFields": { "onlineInfo": true },
    "store": {
      "name": "My Webshop",
      "email": "shop@example.com",
      "address": {
        "addressLine1": "Main Street 123",
        "city": "Stockholm",
        "countryCode": "SE",
        "postalCode": "123 45"
      },
      "paymentChannels": { "physical": false, "online": true },
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

### Prefill the application

Everything under `controlFields.preEnteredInformation` is optional. Supply what you know; anything you omit is collected from the merchant in the flow, and nothing you prefill is discarded.

**Describe the business.** `businessDescription` is what the merchant will *primarily use the payment solution for*: the specific activity that generates card transactions, not the general company purpose. "Selling coffee and pastries at our café" is right; "Food and beverage services" is not. Supplying it triggers automatic category (MCC) classification, which sets the required documents and category questions. If you already know the MCC, pass `organisation.mccCode` instead.

**Name the people.** You can prefill the `applicant` (the main contact), plus `signatories`, `ubos` (beneficial owners) and `chairpersons`. When you supply a person, give at least their `name` and `email`. A person can hold more than one role: the applicant is often both a signatory and a beneficial owner, which you express with `isSignatory` and `isUbo`.

> **Who receives a signing link:** signing invitations go only to the people who must sign, i.e. the signatories and the beneficial owners. Being the applicant or a chairperson alone does not trigger a signing link; that person signs only if they are also a signatory or UBO.

The ownership fields (`ownershipPercent`, `ownershipType`, `entityName`) describe beneficial ownership and only apply when a person is a UBO. `ownershipType` is `direct` or `indirect`; an indirect owner holds the shares through another company, and then `entityName` (the intermediary company) is required.

**Add trading details.** `openingInfo`, `giftcards`, `prePayments` and `fundsInfo` answer the questions the merchant would otherwise be asked in the flow. A few rules apply on the backend: `isOpenAllYear` and `isSeasonalOpen` must be opposites, `monthsOpen` is required when not open all year, and `reasonForOpeningAtNight` is required when `isStoreOpenAtNight` is `true`. Include `giftcards` and `prePayments` only if the merchant actually sells gift cards or takes prepayments.

### Full example

A Danish café, prefilled by the partner. The registry resolves the legal name and address; the business description classifies the merchant; the applicant is both signatory and sole direct owner, with a second, indirect owner listed under `ubos`.

```json
{
  "country": "DK",
  "localeSelected": "da",
  "organisation": {
    "corporateId": "12345678"
  },
  "controlFields": {
    "generateShortLink": true,
    "store": {
      "name": "Havnens Café",
      "email": "hello@havnenscafe.dk",
      "phoneNumber": { "code": "45", "number": "31234567" },
      "address": {
        "addressLine1": "Havnegade 12",
        "city": "København",
        "countryCode": "DK",
        "postalCode": "1058"
      },
      "paymentChannels": { "physical": true, "online": true, "physicalSharePercent": 80 }
    },
    "preEnteredInformation": {
      "businessDescription": "Selling coffee, pastries and light lunches at our harbourside café.",
      "applicant": {
        "email": "owner@havnenscafe.dk",
        "name": "Mette Jensen",
        "isSignatory": true,
        "isUbo": true,
        "ownershipPercent": 100,
        "ownershipType": "direct"
      },
      "ubos": [
        {
          "name": "Lars Holm",
          "email": "lars@example.dk",
          "ownershipPercent": 0,
          "ownershipType": "indirect",
          "entityName": "Holm Holding ApS"
        }
      ],
      "openingInfo": {
        "isOpenAllYear": true,
        "isSeasonalOpen": false,
        "monthsOpen": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        "isStoreOpenAtNight": false,
        "reasonForOpeningAtNight": ""
      },
      "giftcards": { "revenueSharePercent": 15, "averageValidDays": 365 },
      "fundsInfo": {
        "averageTransactionValuePerDay": 4000,
        "estimatedAmountPerYear": 1200000,
        "priceOfMostExpensiveItemSold": 250,
        "estimatedAmountPerTransaction": 95,
        "estimatedFrequencyOfTransactions": "DAILY"
      }
    }
  }
}
```

### Response

A successful request returns the application ID and the web KYB link. `shortLinkUrl` is present when you asked for it with `generateShortLink`, and `storeId` when you supplied a store.

```json
{
  "status": "SUCCESS",
  "message": "Merchant application created successfully.",
  "data": {
    "applicationId": "845adba035abb00310",
    "webKybUrl": "https://onboarding.surfboard.se/845adba035abb00310?pi=…",
    "shortLinkUrl": "https://sb.fyi/abcd12",
    "validUntil": "2026-12-01T00:00:00.000Z",
    "merchantId": "83af75d53169b0070e",
    "storeId": "845adbc0a3f2b00711"
  }
}
```

Share `webKybUrl` (or `shortLinkUrl`) with the merchant. Treat it as sensitive: it grants access to the application. The link is valid until `validUntil`. Each call creates a new application, so do not call again for the same merchant to recover a link; the current link is always available from the status endpoint in Step 3.

### Key fields

| Field | Description |
|-------|-------------|
| `country` | Two-letter ISO country code: `SE`, `NO`, `DK`, `FI` or `IE`. Required. |
| `localeSelected` | Language of the web KYB (`sv`, `da`, `fi`, `en`). Defaults to the country's language. |
| `organisation.corporateId` | The merchant's corporate or organisation number. Required. |
| `organisation.legalName`, `organisation.address` | Resolved from the registry if omitted. Mandatory for Payment Facilitator (PF) partners. |
| `organisation.mccCode` | Merchant Category Code, if you already know it. Otherwise derived from `businessDescription`. |
| `controlFields.store` | Create a store during onboarding (recommended). |
| `controlFields.store.paymentChannels` | Whether the merchant takes payments in person, online, or both. |
| `controlFields.preEnteredInformation` | Business description, people and trading details to prefill. |
| `controlFields.disableFields.onlineInfo` | Lock the webshop URLs against merchant edits. Requires `store.onlineInfo`. |
| `controlFields.showProductCatalogue` | Show the terminal catalogue step. Requires the catalogue to be enabled for your programme. |
| `controlFields.preSelectProducts` | Pre-select terminals to ship automatically. |
| `controlFields.linkUsers` | Existing user IDs to link to the new merchant. |
| `controlFields.redirectUrl` | Where to send the merchant after they finish the web KYB. |
| `controlFields.generateShortLink` | Set `true` to also receive a shortened link. |
| `controlFields.merchantConfig.settlementFrequency` | Payout cadence: `daily`, `weekly`, `monthly` and more. |
| `controlFields.acquirerConfig`, `controlFields.directMerchantCreation` | PF programmes and direct acquirer agreements only. Leave unset otherwise. |

### Pre-selecting terminals

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

### Linking a service provider

If a service provider already exists when you onboard the merchant, you can link it and set its standing share in the same call under `controlFields.merchantConfig.serviceProvider`. See [Service Providers & Split Payouts](/developers/guides/service-providers).

## Step 2: The Merchant Completes the Web KYB

The merchant opens `webKybUrl` and, because you prefilled the rest, only needs to:

1. **Confirm the prefilled company and people**, already populated from the registry and your data
2. **Add their bank account** for settlement
3. **Upload any required documents** for their business category, determined automatically from `businessDescription`
4. **Complete signing**: each signatory and beneficial owner verifies their identity and e-signs

Signing invitations are sent by email to the signatories and beneficial owners you named, or that the registry returned. Once everyone has signed, the compliance team reviews the application, typically within 3-4 business days. Applications in test and demo environments are approved automatically.

## Step 3: Check Application Status

Poll the application status to track progress. The response also carries the current `webKybUrl` while the application is open, so you never need to store the link from the create call.

```
GET /partners/{partnerId}/merchants/{applicationId}/status
```

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "845adba035abb00310",
    "webKybUrl": "https://onboarding.surfboard.se/845adba035abb00310?pi=…",
    "applicationStatus": "APPLICATION_SUBMITTED",
    "merchantId": "83af75d53169b0070e",
    "storeId": "845adbc0a3f2b00711",
    "onlineOnboardingStatus": "PENDING",
    "billingPlans": [],
    "paymentMethods": [
      { "paymentMethod": "card", "enabledSchemes": ["VISA", "MASTERCARD"], "status": "ACTIVE" }
    ],
    "domainVerification": []
  },
  "message": "Application status fetched successfully"
}
```

### Application statuses

| Status | Description |
|--------|-------------|
| `APPLICATION_INITIATED` | Application created; the merchant has not started. |
| `APPLICATION_STARTED` | The merchant has opened the link and begun. |
| `APPLICATION_SUBMITTED` | The merchant has submitted all information. |
| `APPLICATION_PENDING_INFORMATION` | Awaiting additional information or documents from the merchant. |
| `APPLICATION_SIGNED` | All required signatories and beneficial owners have signed. |
| `APPLICATION_REJECTED` | Application rejected. |
| `APPLICATION_EXPIRED` | The link expired before the application was completed. Create a new application. |
| `APPLICATION_COMPLETED` | Compliance review passed; the merchant is being created. |
| `MERCHANT_CREATED` | The merchant is live and can transact. `merchantId` and `storeId` are returned. |

> **Tip:** You can also receive status updates via webhooks instead of polling. Configure webhooks in the Developer Portal Console. See [Webhooks & Notifications](/developers/guides/webhooks-notifications).

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

## Notes and Behaviours

- **Prefill.** Registry data and category classification are resolved as part of the create call, so the returned link is already populated. If either cannot be resolved, the call still returns a valid link and the merchant completes those sections manually.
- **Documents are category-driven.** The `businessDescription` sets the merchant category, which sets exactly which documents are mandatory and any category-specific questions. You do not specify documents in the request.
- **Prefill is additive.** Anything you omit is collected from the merchant in the flow; nothing you prefill is discarded.
- **One application per call.** Each call creates a new application. Avoid duplicate calls for the same merchant. The current link for an application is always available from the status endpoint.

## Reference

- [Create Merchant API](https://developers.surfboardpayments.com/api/merchants)
- [Check Application Status API](https://developers.surfboardpayments.com/api/merchants)
- [Create Store API](https://developers.surfboardpayments.com/api/stores)
- [Verify Domain API](https://developers.surfboardpayments.com/api/stores)
- [Webhook Reference](https://developers.surfboardpayments.com/references/webhooks/merchants/application-completed)
- [Service Providers & Split Payouts](/developers/guides/service-providers)
- [Developer Portal](https://developers.surfboardpayments.com/)
