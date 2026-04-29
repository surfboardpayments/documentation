## Overview

A multi-merchant terminal allows several independent businesses to accept payments through a single physical device. Each merchant retains its own merchant account -- orders, transactions, and payouts are routed individually -- but they share the same hardware.

This setup is designed for scenarios where multiple vendors operate in close proximity and dedicated terminals per merchant would be impractical or cost-prohibitive. The Multi-Merchant Group API lets partners create a group, onboard merchants into it, and register shared devices.

## Use Cases

| Scenario | Description |
|----------|-------------|
| **Food courts** | Multiple food vendors in a shopping centre share terminals at a central checkout or at individual stalls. |
| **Music festivals and events** | Pop-up vendors at concerts, markets, or festivals share a limited pool of terminals. Each vendor's sales are tracked and settled separately. |
| **Co-working retail spaces** | Small businesses sharing a physical storefront use the same terminal while keeping financials separate. |
| **Seasonal markets** | Temporary setups like Christmas markets or farmers' markets where deploying one terminal per vendor is impractical. |

## Setup Flow

Setting up multi-merchant terminals involves three steps:

1. **Create a multi-merchant group** -- Establishes the shared group and generates a group-level merchant and store.
2. **Add merchants to the group** -- Onboard individual businesses and link them to the group.
3. **Register a terminal** -- Assign a physical device to the group so all linked merchants can process payments.

After setup, each merchant creates orders using their own `merchantId`, but the payment is processed on the shared terminal.

## Step 1: Create a Multi-Merchant Group

Create the group under your partner account. This generates a group-level `merchantId` and `storeId` that you will use when registering shared terminals.

```
POST /partners/{partnerId}/multi-merchant
```

**Request:**

```json
{
  "country": "SE",
  "zipCode": "123456",
  "name": "Central Food Court",
  "email": "foodcourt@example.com"
}
```

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `country` | string | Yes      | Two-letter ISO country code in uppercase (e.g., `SE`, `DK`, `NO`). |
| `zipCode` | string | Yes      | ZIP/postal code of the shared location. |
| `name`    | string | No       | Human-readable name for the group (e.g., "Stockholm Food Hall"). |
| `email`   | string | No       | Contact email for the multi-merchant group. |

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "app_mm_a1b2c3",
    "merchantId": "8353ffb4664d900d0e",
    "storeId": "str_mm_d4e5f6"
  },
  "message": "Multi-merchant group created successfully"
}
```

| Parameter            | Type   | Description |
|----------------------|--------|-------------|
| `status`             | string | `SUCCESS` or `ERROR`. |
| `data.applicationId` | string | Use this ID to track the status of the group creation request. |
| `data.merchantId`    | string | Group-level merchant ID. Use this when registering shared terminals (Step 3). |
| `data.storeId`       | string | Group-level store ID. Use this when registering shared terminals (Step 3). |
| `message`            | string | Human-readable description of the result. |

Save the `merchantId` and `storeId` from this response -- you will need them when registering devices in Step 3.

## Step 2: Add Merchants to the Group

Onboard individual merchants and link them to the multi-merchant group by passing the group's `multiMerchantId` in the standard Create Merchant request.

```
POST /partners/{partnerId}/merchants
```

**Request (minimal):**

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5566692092"
  },
  "multiMerchantId": "8353ffb4664d900d0e",
  "controlFields": {
    "transactionPricingPlan": "SP_SE_Fix129"
  }
}
```

| Parameter                              | Type   | Required | Description |
|----------------------------------------|--------|----------|-------------|
| `country`                              | string | Yes      | Two-letter ISO country code in uppercase. |
| `organisation.corporateId`             | string | Yes      | Corporate/organisation ID of the merchant being added. |
| `organisation.legalName`               | string | Conditional | Legal name of the organisation. Required for Payment Facilitator (PF) partners. |
| `organisation.mccCode`                 | string | Conditional | Merchant Category Code. Required for PF partners. |
| `multiMerchantId`                      | string | Yes      | The `merchantId` returned from Step 1. Links this merchant to the shared group. |
| `controlFields.transactionPricingPlan` | string | Conditional | Billing plan for transaction costs. Required if more than one plan exists. |

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "app_merch_g7h8i9",
    "webKybUrl": "https://kyb.surfboardpayments.com/app_merch_g7h8i9",
    "merchantId": "mrc_vendor_001"
  },
  "message": "Merchant application created successfully"
}
```

| Parameter            | Type   | Description |
|----------------------|--------|-------------|
| `data.applicationId` | string | Track the merchant onboarding status with this ID. |
| `data.webKybUrl`     | string | KYB (Know Your Business) link. Share this with the merchant to complete their verification. |
| `data.merchantId`    | string | The merchant's individual ID (PF partners only -- returned when the merchant is created immediately). |
| `data.storeId`       | string | The merchant's store ID (PF partners only). |
| `data.shortLinkUrl`  | string | Shortened KYB URL, returned when `generateShortLink` is set to `true`. |

Repeat this step for every merchant that should be part of the group. Each merchant completes their own KYB verification independently.

### Adding Merchants via the Partner Portal

You can also add merchants through the Partner Portal UI:

1. Log in to your **Partner Portal** and go to the **Applications** section.
2. Click **Create Application**.
3. Enable the **MultiMerchant** toggle.
4. Select the group from the **MultiMerchantId or name** dropdown.
5. Fill in the required merchant details and click **Create Application**.
6. Share the generated WebKYB link with the merchant.

### Organisation and Address Details

For PF partners or when full merchant details are required, you can include comprehensive organisation information:

```json
{
  "country": "SE",
  "organisation": {
    "corporateId": "5566692092",
    "legalName": "Vendor AB",
    "mccCode": "5812",
    "address": {
      "addressLine1": "Storgatan 10",
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "11123"
    },
    "phoneNumber": {
      "code": 46,
      "number": "701234567"
    },
    "email": "vendor@example.com"
  },
  "multiMerchantId": "8353ffb4664d900d0e",
  "controlFields": {
    "transactionPricingPlan": "SP_SE_Fix129"
  }
}
```

## Step 3: Register a Device to the Group

Once the group is created, register a physical terminal using the group-level `merchantId` and `storeId` from Step 1. This makes the terminal available to all merchants in the group.

```
POST /merchants/{merchantId}/stores/{storeId}/devices
```

Use the **group-level** `merchantId` and `storeId` returned in Step 1, not an individual merchant's IDs.

**Request:**

```json
{
  "registrationIdentifier": "250901",
  "terminalName": "Kiosk One"
}
```

| Parameter                | Type   | Required | Description |
|--------------------------|--------|----------|-------------|
| `registrationIdentifier` | string | Yes      | 6-digit code shown on the terminal at startup. For SurfPad and Printer devices, use the serial number from the back of the device. |
| `terminalName`           | string | Yes      | A friendly name for the terminal (e.g., "Food Court Register 1"). |

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "trm_shared_001",
    "registrationStatus": "REGISTERED"
  },
  "message": "Terminal registered successfully"
}
```

| Parameter                 | Type   | Description |
|---------------------------|--------|-------------|
| `data.terminalId`         | string | Terminal ID of the registered device. |
| `data.registrationStatus` | string | `REGISTERED` for a new device, `ALREADY_REGISTERED` if the device was previously linked. |

## Processing Payments

After setup, each merchant processes payments independently using their own `merchantId` -- the shared terminal handles the routing automatically. When creating an order, the merchant specifies the terminal ID of the shared device:

```json
{
  "terminal$id": "trm_shared_001",
  "orderLines": [...],
  "totalOrderAmount": {...}
}
```

Key points for payment processing on shared terminals:

- **Orders** are tied to the individual merchant's `merchantId`, not the group.
- **Payouts** are settled to each merchant's own bank account.
- **Transaction history** is kept separate per merchant.
- The terminal displays the correct merchant name and receipt details for each transaction.

## Important Considerations

- **One location per group.** A multi-merchant group represents a single physical location. If you have vendors across multiple sites, create a separate group for each location.
- **Merchant independence.** Adding a merchant to a group does not affect their ability to have their own dedicated terminals elsewhere. The `multiMerchantId` link only applies to the shared setup.
- **KYB is still required.** Each merchant must complete their own Know Your Business verification regardless of being part of a group. The group setup does not bypass compliance requirements.
- **Terminal limits.** You can register multiple terminals to the same group. There is no restriction on the number of devices per group.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create multi-merchant group | POST | `/partners/{partnerId}/multi-merchant` |
| Add merchant to group | POST | `/partners/{partnerId}/merchants` |
| Register shared terminal | POST | `/merchants/{merchantId}/stores/{storeId}/devices` |