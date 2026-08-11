## Overview

Stores are the organizational units that sit beneath merchants in the Surfboard hierarchy. Every terminal, whether physical or online, is registered under a store. This guide covers the full store lifecycle: creating in-store and online stores, retrieving store details, updating store information, verifying domains for online payments, listing terminals, and deactivating stores you no longer need.

A default store is often created automatically during merchant onboarding. Both merchants and partners can create additional stores at any time through the API or the Partner Portal.

## Prerequisites

- A registered **partner** and **merchant** in the Surfboard system
- Your `partnerId` and `merchantId`
- API credentials (API key and API secret)

## Create an In-Store (Physical) Store

Use the Create Store endpoint to add a new physical store under a merchant. The store will be assigned a unique `storeId` on creation.

```
POST /partners/:partnerId/merchants/:merchantId/stores
```

### Request

```json
{
  "storeName": "Stockholm Flagship",
  "email": "flagship@example.com",
  "phoneNumber": {
    "code": 46,
    "number": "701234567"
  },
  "address": "Drottninggatan 10",
  "city": "Stockholm",
  "zipCode": "103 16",
  "country": "SE"
}
```

### Key Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `storeName` | string | Yes | Name of the store |
| `email` | string | No | Store email. Mandatory for online payment support |
| `phoneNumber.code` | number | Yes | International dialing code (e.g., `46` for Sweden) |
| `phoneNumber.number` | string | Yes | Phone number, 5-15 digits |
| `address` | string | Yes | Address line 1 |
| `city` | string | Yes | City name |
| `zipCode` | string | Yes | Postal code |
| `country` | string | Yes | Two-letter ISO country code (e.g., `SE`) |
| `acquirerMID` | string | No | Acquirer Merchant ID, required for PF partners with store-based acquiring |

### Response

The response includes the new `storeId` along with the full store object:

```json
{
  "status": "SUCCESS",
  "data": {
    "storeId": "store-abc-123",
    "merchantId": "merchant-xyz-789",
    "name": "Stockholm Flagship",
    "address": {
      "addressLine1": "Drottninggatan 10",
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "103 16"
    },
    "phone": "+46701234567",
    "email": "flagship@example.com"
  },
  "message": "Store created successfully"
}
```

## Create an Online Store

Online stores require additional properties in the `onlineInfo` object to enable e-commerce payment acceptance. You can either create a new online store directly or update an existing physical store to add online capabilities.

```
POST /partners/:partnerId/merchants/:merchantId/stores
```

### Request

```json
{
  "storeName": "Web Store",
  "email": "webstore@example.com",
  "phoneNumber": {
    "code": 46,
    "number": "701234567"
  },
  "address": "Drottninggatan 10",
  "city": "Stockholm",
  "zipCode": "103 16",
  "country": "SE",
  "onlineInfo": {
    "merchantWebshopURL": "https://shop.example.com",
    "paymentPageHostURL": "https://shop.example.com/payment",
    "termsAndConditionsURL": "https://shop.example.com/terms",
    "privacyPolicyURL": "https://shop.example.com/privacy"
  }
}
```

### Online Info Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `onlineInfo.merchantWebshopURL` | string | Yes | The merchant's webshop URL |
| `onlineInfo.paymentPageHostURL` | string | No | Payment page URL. Required for SDK mode integration |
| `onlineInfo.termsAndConditionsURL` | string | Yes | URL to terms and conditions (must include refund policy) |
| `onlineInfo.privacyPolicyURL` | string | Yes | URL to the privacy policy |

When an online store is created, the response includes two domain verification keys:

- `merchantURLDomainVerficationKey` -- used to verify ownership of the webshop domain
- `paymentPageURLDomainVerficationKey` -- used to verify the payment page domain (if provided)

You must complete domain verification before the store is approved for online payments.

## Domain Verification

After creating an online store, verify that you own the domains you provided. This is a two-step process.

### Step 1: Set DNS TXT Records

Take the verification keys returned during store creation and add them as **TXT records** on your domain's DNS configuration. Surfboard also performs automatic checks every 6 hours.

### Step 2: Trigger Verification

```
POST /partners/:partnerId/merchants/:merchantId/stores/:storeId/verify
```

```json
{
  "domainType": "MERCHANT_WEBSHOP_URL"
}
```

The `domainType` value specifies which domain to verify. Use `MERCHANT_WEBSHOP_URL` for the webshop domain or `PAYMENT_PAGE_HOST_URL` for the payment page domain.

### Check Verification Status

You can retrieve the current domain verification status at any time:

```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/online
```

Once verification succeeds, the store enters an internal approval process. After approval, you can register online terminals (PaymentPage, SelfHostedPage, MerchantInitiated) under the store.

## Fetch Store Details

Retrieve complete information about a specific store, including its status and online onboarding status.

```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

### Response

```json
{
  "status": "SUCCESS",
  "data": {
    "storeId": "store-abc-123",
    "merchantId": "merchant-xyz-789",
    "name": "Web Store",
    "status": "ACTIVE",
    "onlineOnboardingStatus": "APPROVED",
    "address": {
      "addressLine1": "Drottninggatan 10",
      "city": "Stockholm",
      "countryCode": "SE",
      "postalCode": "103 16"
    },
    "phone": "+46701234567",
    "email": "webstore@example.com",
    "onlineInfo": {
      "merchantWebshopURL": "https://shop.example.com",
      "paymentPageHostURL": "https://shop.example.com/payment",
      "termsAndConditionsURL": "https://shop.example.com/terms",
      "privacyPolicyURL": "https://shop.example.com/privacy"
    }
  },
  "message": "Store details fetched successfully"
}
```

Store status values: `ACTIVE`, `DEACTIVATED`, `BLOCKED`, `INACTIVE`.
Online onboarding status values: `APPROVED`, `INITIATED`, `FAILED`.

## List All Stores

Retrieve every store registered under a merchant to get a complete overview.

```
GET /partners/:partnerId/merchants/:merchantId/stores
```

The response returns an array of store objects, each with the same structure as the single-store response above.

## Update Store Details

Modify an existing store's name, contact information, address, or add online capabilities. Send only the fields you want to change.

```
PUT /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

### Request

```json
{
  "storeName": "Stockholm Flagship - Updated",
  "email": "new-email@example.com",
  "phoneNumber": {
    "code": 46,
    "number": "709876543"
  }
}
```

All parameters are optional. You can also add `onlineInfo` to convert a physical store into an online store. Note that online info can only be added once.

If you add `onlineInfo` during an update, the response will include the domain verification keys, and you must complete domain verification as described above.

## Fetch Store Terminals

Retrieve all terminals registered under a specific store. You can optionally filter by terminal type.

```
GET /partners/:partnerId/merchants/:merchantId/stores/:storeId/terminals
```

Optional query parameter: `terminalType` (e.g., `surfpad`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`).

### Response

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "terminalId": "terminal-001",
      "terminalType": "PaymentPage",
      "terminalStatus": "ACTIVE",
      "storeId": "store-abc-123",
      "terminalName": "Online Checkout",
      "startDate": "2025-06-15T10:00:00Z"
    }
  ],
  "message": "Terminals fetched successfully"
}
```

Terminal types include: `surfpad`, `surftouch`, `surfprint`, `checkoutPro`, `checkoutX`, `PaymentPage`, `SelfHostedPage`, `MerchantInitiated`, `printer`, `surftester`.

Terminal statuses: `REGISTERED`, `ACTIVE`, `IN_ACTIVE`, `DE_REGISTERED`.

## Deactivate a Store

Remove a store that is no longer needed. You can deactivate immediately or schedule deactivation for a future date.

```
DELETE /partners/:partnerId/merchants/:merchantId/stores/:storeId
```

Optional query parameter: `deactivationDate` in `yyyy-mm-dd` format. If omitted, the store is deactivated immediately.

> **Important:** A store can only be deactivated if it has no terminals registered to it. If active terminals exist, you must first delink them or move them to another store under the same merchant.

### Response

```json
{
  "status": "SUCCESS",
  "message": "Store deactivated successfully"
}
```

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create store | POST | `/partners/:partnerId/merchants/:merchantId/stores` |
| Fetch store details | GET | `/partners/:partnerId/merchants/:merchantId/stores/:storeId` |
| List all stores | GET | `/partners/:partnerId/merchants/:merchantId/stores` |
| Update store | PUT | `/partners/:partnerId/merchants/:merchantId/stores/:storeId` |
| Verify domain | POST | `/partners/:partnerId/merchants/:merchantId/stores/:storeId/verify` |
| Fetch domain status | GET | `/partners/:partnerId/merchants/:merchantId/stores/:storeId/online` |
| Fetch store terminals | GET | `/partners/:partnerId/merchants/:merchantId/stores/:storeId/terminals` |
| Deactivate store | DELETE | `/partners/:partnerId/merchants/:merchantId/stores/:storeId` |