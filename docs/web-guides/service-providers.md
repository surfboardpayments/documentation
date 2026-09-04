# Service Providers & Split Payouts

Route a share of each payment to a third party with Surfboard Flow. Onboard a service provider, link it to a merchant, and set the split on the order.

Source: https://www.surfboardpayments.com/developers/guides/service-providers
Category: online
Tags: Online, In-Store, API, Service Providers, Flow, Payouts, Partners

---
## Overview

Surfboard Flow lets a partner route part of a payment to someone other than the merchant: a platform fee, a commission, a franchise royalty, or a tip that belongs to an individual. The recipient is called a **service provider**. Once a service provider is onboarded and linked to a merchant, you name it on the order and Surfboard tracks the share, settles it, and reports it. One payment in, several payouts out, with no separate billing or payout code on your side.

There are three steps, all at the partner level:

1. **Onboard the service provider** -- submit an application, the recipient completes KYB (Know Your Business) or signs an agreement, and Surfboard issues a `serviceProviderId`
2. **Link it to a merchant** -- a service provider can only take a share from merchants it is linked to
3. **Set the split on the order** -- add the service provider and its share under `controlFunctions.serviceProviders`

```
Partner
  ├── Service provider  (onboarded once, reused across merchants)
  └── Merchant
        ├── link ──────► Service provider
        └── Order
              └── controlFunctions.serviceProviders[]
                    └── { serviceProviderId, amount }
```

The same mechanism works for in-store and online orders and for every payment method and acquirer.

## Prerequisites

1. A partner account with API credentials and your `partnerId` from the [Developer Portal](https://developers.surfboardpayments.com/)
2. At least one onboarded merchant. See [Merchant Onboarding](/developers/guides/merchant-onboarding)
3. Flow enabled on your partner account. Contact your Surfboard account manager if the service provider endpoints return `403`

Service provider endpoints are partner-scoped. Send `API-KEY` and `API-SECRET`. The `MERCHANT-ID` header is optional on these calls and, when present, must match the merchant in the path. See [API Conventions](/developers/guides/api-conventions).

## Step 1: Onboard a Service Provider

Every recipient goes through an application before it can receive funds. This is how Surfboard, as a licensed payment institution, meets its KYC and AML obligations for the entity being paid. There are two kinds of application.

| Kind | Who | Verification | Endpoint |
|------|-----|--------------|----------|
| **Company** | A registered business (a franchisor, a software vendor, a marketplace operator) | Hosted web KYB, same as merchant onboarding | `POST /partners/{partnerId}/service-providers` |
| **Individual** | A private person tied to one merchant (a waiter who should receive their own tips, a stylist, a driver) | Hosted signing flow | `POST /partners/{partnerId}/service-providers/individual` |

### Company service provider

Submit the company's country and corporate ID:

```
POST /partners/{partnerId}/service-providers
```

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5560000000"
  },
  "controlFields": {
    "isServiceProvider": true
  }
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `country` | string | Yes | Two-letter ISO country code where the company is registered. |
| `organisation.corporateId` | string | Yes | Corporate registration number, validated against `country`. |
| `controlFields.isServiceProvider` | boolean | Yes | Must be `true`. Marks the application as a service provider rather than a merchant. |

The response returns the application and a hosted KYB link:

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "838ca3a7c530200810",
    "webKybUrl": "https://kyb.surfboardpayments.com/838ca3a7c530200810?pi=..."
  },
  "message": "Service provider company application created successfully"
}
```

Share `webKybUrl` with the company. A signatory fills in the company details, contact information, and bank account for payouts, then signs. Treat the link as sensitive: it grants access to the application.

### Individual service provider

The typical individual is an employee who should receive money that belongs to them rather than to the business. Tips are the clearest case. Without Flow, a tip left on the terminal is paid out to the restaurant, taxed as the restaurant's revenue, and only then shared with the waiter through payroll. With the waiter onboarded as an individual service provider, the tip is split off at settlement and paid to the waiter directly.

An individual is onboarded for one specific merchant, so pass the `merchantId` up front. You can also attach a fee configuration if the person should receive a share of the order amount itself, for example a commission:

```
POST /partners/{partnerId}/service-providers/individual
```

```json
{
  "email": "anna@restaurant.example",
  "countryCode": "SE",
  "merchantId": "8385f437bc6d200b50",
  "spType": "INDIVIDUAL",
  "config": {
    "deductApplicableTransactionFee": false
  }
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Where the signing link is sent. |
| `countryCode` | string | Yes | Two-letter ISO country code of the individual. |
| `merchantId` | string | Yes | The merchant this individual will take a share from. |
| `spType` | string | No | Type of service provider, for example `INDIVIDUAL`. |
| `config.feePercentage` | number | No | Percentage of each applicable transaction that goes to the individual. |
| `config.feeFixedAmount` | number | No | Fixed amount per applicable transaction, in minor currency units. |
| `config.deductApplicableTransactionFee` | boolean | No | When `true`, Surfboard's transaction fee is deducted from the individual's share rather than the merchant's. For a waiter receiving tips you normally leave this `false` so the tip arrives in full. |

The response returns a signing session instead of a KYB link:

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "838ca3a7c530200810",
    "signingLink": "https://sign.surfboardpayments.com/838ca3a7c530200810",
    "signingSessionId": "8391b7c2ad4e100722",
    "status": "APPLICATION_INITIATED"
  },
  "message": "Individual SP onboarding initiated successfully"
}
```

The individual receives the link by email, identifies themselves, and signs the service provider agreement. Once approved, the waiter is associated with the restaurant and can be named on its orders. No separate link step is needed.

### Track the application

There are no webhooks for service provider applications yet, so poll. Fetch a single application to get its status and, once approved, the `serviceProviderId` you need for the next step:

```
GET /partners/{partnerId}/service-providers/applications/{applicationId}
```

```json
{
  "status": "SUCCESS",
  "data": {
    "onboardingStatus": null,
    "applicationStatus": "SERVICE_PROVIDER_CREATED",
    "serviceProviderId": "839ab2f1c47d300a20"
  },
  "message": "Service provider application status fetched successfully"
}
```

`serviceProviderId` is `null` until the application is approved. The statuses follow the merchant application lifecycle:

| Status | Meaning |
|--------|---------|
| `APPLICATION_INITIATED` | Application created, link not yet opened. |
| `APPLICATION_STARTED` | The recipient has opened the KYB or signing link. |
| `APPLICATION_SUBMITTED` | Details submitted, awaiting signature or review. |
| `APPLICATION_PENDING_INFORMATION` | Surfboard needs more information from the recipient. |
| `APPLICATION_SIGNED` | All required signatures collected. |
| `APPLICATION_UNDER_REVIEW` | Compliance review in progress. |
| `APPLICATION_APPROVED` / `APPLICATION_COMPLETED` | Approved, service provider being created. |
| `SERVICE_PROVIDER_CREATED` | Done. `serviceProviderId` is populated. |
| `APPLICATION_REJECTED` | Did not pass review. |
| `APPLICATION_EXPIRED` | Not completed in time. Create a new application. |

To see every application under the partner, including renewals, list them:

```
GET /partners/{partnerId}/service-providers/applications?applicationType=ONBOARDING,RENEWAL
```

`applicationType` defaults to `ONBOARDING`. Each entry carries `applicationStatus`, `legalName`, `webKybUrl` while the link is still valid, and `endDate` for renewals.

Once created, service providers appear in the partner roster with their contact and address details:

```
GET /partners/{partnerId}/service-providers
```

## Step 2: Link the Service Provider to a Merchant

A service provider can only be named on orders from merchants it is linked to. Naming an unlinked one fails order creation with `SP_0001` (see [Create Order Error Codes](/developers/guides/create-order-error-codes)). Company service providers are linked explicitly. Individuals are associated with the merchant given at onboarding.

Link an onboarded service provider:

```
POST /partners/{partnerId}/merchants/{merchantId}/service-providers/link
```

```json
{
  "serviceProviderId": "839ab2f1c47d300a20"
}
```

```json
{
  "status": "SUCCESS",
  "message": "Service provider linked to merchant successfully"
}
```

One service provider can be linked to many merchants, and one merchant can have several service providers. A franchisor, for example, is onboarded once and linked to every franchisee.

### Verify the link

```
GET /partners/{partnerId}/merchants/{merchantId}/service-providers
```

```json
{
  "status": "SUCCESS",
  "data": {
    "activeServiceProviders": [
      {
        "merchantId": "8385f437bc6d200b50",
        "partnerId": "8113d3f8403b380409",
        "isActive": true,
        "serviceProvider": {
          "id": "839ab2f1c47d300a20",
          "name": "Nordic Franchise AB"
        }
      }
    ]
  },
  "message": "Active service providers fetched successfully"
}
```

The merchant can see the same list through the merchant-scoped endpoint `GET /merchants/{merchantId}/service-providers`, which returns full contact details.

### Unlink

To stop a service provider from taking a share of a merchant's payments, remove the link. Orders already created keep their split.

```
DELETE /partners/{partnerId}/merchants/{merchantId}/service-providers/unlink
```

```json
{
  "serviceProviderId": "839ab2f1c47d300a20"
}
```

### Linking at merchant creation

If the service provider already exists when you onboard a new merchant, you can link it and set a standing share in the same call. Add `merchantConfig.serviceProvider` to the [Create Merchant](/developers/guides/merchant-onboarding) request:

```json
{
  "country": "SE",
  "organisation": { "corporateId": "5591631360" },
  "controlFields": {
    "merchantConfig": {
      "serviceProvider": [
        {
          "serviceProviderId": "839ab2f1c47d300a20",
          "deductApplicableTransactionFee": false,
          "amount": {
            "percentage": "5",
            "fixed": 200,
            "adjustmentTypes": ["TIPS"]
          }
        }
      ]
    },
    "store": { "...": "..." }
  }
}
```

The `amount` object has the same shape as on the order, described below. A share set here becomes the merchant's standing configuration for that service provider.

### Partner Portal

Both steps can also be done by hand. The Service Providers page in the [Partner Portal](/partner-portal/service-providers) creates applications and shows their status, and each merchant's Service Providers tab links and unlinks providers.

## Step 3: Set the Split on the Order

With the service provider linked, name it on the order. Nothing else about the order changes: same line items, same totals, same payment initiation.

```
POST /orders
```

```json
{
  "terminal$id": "YOUR_TERMINAL_ID",
  "orderLines": [
    {
      "id": "TABLE-12",
      "name": "Dinner for two",
      "quantity": 1,
      "amount": {
        "regular": 120000,
        "total": 120000,
        "currency": "752",
        "tax": [{ "amount": 12857, "percentage": 12, "type": "VAT" }]
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 120000,
    "total": 120000,
    "currency": "752",
    "tax": [{ "amount": 12857, "percentage": 12, "type": "VAT" }]
  },
  "controlFunctions": {
    "tipsMode": "STANDARD",
    "serviceProviders": [
      {
        "serviceProviderId": "839ab2f1c47d300a20",
        "amount": {
          "percentage": "100",
          "adjustmentTypes": ["TIPS"]
        }
      }
    ],
    "initiatePaymentsOptions": {
      "paymentMethod": "CARD"
    }
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `serviceProviders[]` | array | No | One entry per recipient. Every `serviceProviderId` must be linked to the merchant in the `MERCHANT-ID` header. |
| `serviceProviderId` | string | Yes | The ID returned when the application was approved. |
| `amount` | object | No | The share for this order. Omit it to fall back to the share configured on the merchant link. |
| `amount.percentage` | string | No | Percentage of the order total, for example `"5"` for 5%. |
| `amount.fixed` | string | No | Fixed amount in minor currency units, for example `"200"` for 2 SEK. |
| `amount.adjustmentTypes` | array | No | Adjustment types the share is taken from, for example `["TIPS"]`. A tip added on the terminal is an adjustment on top of the order total, so it is not included unless listed here. |

In the example above the service provider is the waiter serving table 12. The order total goes to the restaurant as usual. Whatever the guest adds as a tip on the terminal is an adjustment of type `TIPS`, and the entry routes it to the waiter, who is paid at settlement without the amount passing through the restaurant's books. See [Tips Configuration](/developers/guides/tips-configuration) for enabling tips on the terminal.

`percentage` and `fixed` can be combined. A 3% commission plus a 2 SEK fee is `{ "percentage": "3", "fixed": "200" }`. The Create Order reference documents both as strings; the Update Order reference accepts numbers.

Several service providers on one order each get their own entry:

```json
"serviceProviders": [
  { "serviceProviderId": "839ab2f1c47d300a20", "amount": { "percentage": "3" } },
  { "serviceProviderId": "83a1c4e7f20b100c11", "amount": { "fixed": "500" } }
]
```

### What happens next

Surfboard authorises and captures the payment as usual. When the payment completes, each share is recorded against the transaction. At settlement, the merchant is paid the order amount less the shares, and each service provider is paid its share to the bank account from its application. The split is visible in settlement reports, SFTP exports, and the order itself. Fetching the order returns `controlFunctions.serviceProviders` exactly as sent, so your reconciliation can read the split from the same place it was written. See [Settlements & Reporting](/developers/guides/settlements-reporting).

Refunds follow the money. A refund of a split order reverses the service provider's share in proportion, so you refund the order the same way as any other. See [Refund an Order](/developers/guides/refund-an-order).

### Changing the split

The split can be changed with [Update Order](https://developers.surfboardpayments.com/api/orders) while the order is still pending. Once the payment is completed, the shares are locked to the transaction.

## Common Patterns

**Platform fee.** The partner onboards itself, or its billing entity, as a company service provider, links it to every merchant, and adds a percentage on each order. The platform's revenue arrives with settlement instead of through monthly invoicing.

**Franchise royalty.** The franchisor is one service provider linked to every franchisee. Each franchisee's orders carry the royalty percentage. Because the split is per order, campaigns or exempt product lines can simply omit the entry.

**Restaurant tips.** Each waiter is onboarded as an individual service provider for the restaurant. The POS puts the waiter serving the table on the order with `adjustmentTypes: ["TIPS"]`, and the tip is paid to the waiter at settlement instead of being paid out to the restaurant, taxed, and shared through payroll.

**Staff commissions.** The same setup pays a stylist, trainer, or driver a cut of the order itself. Set `feePercentage` in `config` at onboarding, or a `percentage` on each order for the person who did the work.

**Marketplace seller.** The seller is a company service provider and the marketplace is the merchant. Set the seller's share to the item price less the marketplace's take, using `percentage` for a take rate or `fixed` for a listing fee.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| `SP_0001` Service provider IDs `[...]` not associated with this merchant | The ID on the order is not linked to the merchant in `MERCHANT-ID`, or the application is not yet approved. | Check the application status, then link the service provider (Step 2). |
| `400` Missing required parameter `serviceProviderId` | Link or unlink called without a body. | Send `{ "serviceProviderId": "..." }`. |
| `403` on service provider endpoints | Flow is not enabled for the partner. | Contact your account manager. |
| `404` Resource not found | Wrong `partnerId`, `merchantId`, or `applicationId`. | The merchant must belong to the partner in the path. |
| `APPLICATION_EXPIRED` | The KYB or signing link was not completed in time. | Create a new application. The old ID cannot be revived. |

## API Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/partners/{partnerId}/service-providers` | Create a company service provider application |
| `POST` | `/partners/{partnerId}/service-providers/individual` | Onboard an individual for a merchant |
| `GET` | `/partners/{partnerId}/service-providers/applications` | List applications, filter by `applicationType` |
| `GET` | `/partners/{partnerId}/service-providers/applications/{applicationId}` | Application status and `serviceProviderId` |
| `GET` | `/partners/{partnerId}/service-providers` | All service providers under the partner |
| `POST` | `/partners/{partnerId}/merchants/{merchantId}/service-providers/link` | Link a service provider to a merchant |
| `DELETE` | `/partners/{partnerId}/merchants/{merchantId}/service-providers/unlink` | Remove the link |
| `GET` | `/partners/{partnerId}/merchants/{merchantId}/service-providers` | Active links on a merchant |
| `GET` | `/merchants/{merchantId}/service-providers` | Merchant-scoped view with contact details |
| `POST` | `/orders` | Set the split in `controlFunctions.serviceProviders` |

## Reference

- [Service Providers API](https://developers.surfboardpayments.com/api/service-providers)
- [Create Order API](https://developers.surfboardpayments.com/api/orders)
- [Create Merchant API](https://developers.surfboardpayments.com/api/merchants)
- [Surfboard Flow](/flow)
- [Partner Portal: Service Providers](/partner-portal/service-providers)
