## Overview

Surfboard Payments provides APIs for two complementary commerce features: **gift cards** for stored-value and entitlement-based programs, and **promotions** for marketing campaigns displayed across merchant channels. This guide covers creating and managing both, with full API details and request/response examples.

## Gift Cards

Gift cards in Surfboard come in two types:

- **FUND** -- A stored monetary balance. Customers spend down the balance over one or more transactions.
- **ENTITLEMENT** -- A usage-limited card. Instead of a cash value, the card grants a fixed number of redemptions (e.g., "5 free coffees").

### Create a Gift Card

```
POST /gift-cards
```

#### FUND Type Request

```json
{
  "cardType": "FUND",
  "amount": 500,
  "currency": "SEK",
  "name": "Holiday Gift Card",
  "accessControl": "OPEN",
  "expiryDate": "12/31/2026",
  "note": "Happy Holidays!"
}
```

#### ENTITLEMENT Type Request

```json
{
  "cardType": "ENTITLEMENT",
  "redemptionLimit": 10,
  "name": "Loyalty Reward Card",
  "accessControl": "OPEN",
  "expiryDate": "06/30/2027",
  "note": "Thank you for being a valued customer"
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cardType` | string | Yes | `FUND` or `ENTITLEMENT` |
| `amount` | number | Conditional | Monetary amount in smallest currency unit. Required for `FUND` type |
| `redemptionLimit` | number | Conditional | Number of allowed uses. Required for `ENTITLEMENT` type |
| `currency` | string | No | ISO currency code (e.g., `SEK`, `EUR`) |
| `name` | string | No | Display name for the gift card |
| `accessControl` | string | No | Access control level (e.g., `OPEN`) |
| `expiryDate` | string | No | Expiry date in `mm/dd/yyyy` or `mm-dd-yyyy` format |
| `note` | string | No | Optional note or message |

#### Response

```json
{
  "status": "SUCCESS",
  "data": {
    "giftCardId": "gc-abc-123",
    "pan": "6789012345678901",
    "name": "Holiday Gift Card",
    "cardType": "FUND",
    "amount": 500,
    "currency": "SEK",
    "accessControl": "OPEN",
    "status": "ACTIVE",
    "expiryDate": "12/31/2026",
    "shareableLink": "https://giftcards.surfboardpayments.com/gc-abc-123",
    "formats": {
      "qrCode": "data:image/png;base64,...",
      "nfcData": "NFC_ENCODED_DATA",
      "barcode": "data:image/png;base64,..."
    },
    "externalId": "ext-001",
    "externalIdType": "CUSTOM"
  },
  "message": "Gift card created successfully"
}
```

The response includes multiple format representations (QR code, NFC data, barcode) for flexible distribution. The `shareableLink` provides a URL that can be sent directly to the recipient.

### List All Gift Cards

Retrieve a paginated list of all gift cards for a merchant, with optional filtering.

```
GET /gift-cards
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | Filter by card type: `FUND` or `ENTITLEMENT` |
| `status` | string | No | Filter by card status |

#### Response

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "giftCardId": "gc-abc-123",
      "pan": "6789012345678901",
      "name": "Holiday Gift Card",
      "cardType": "FUND",
      "amount": 500,
      "currentAmount": 350,
      "usageCount": 2,
      "currency": "SEK",
      "accessControl": "OPEN",
      "status": "ACTIVE",
      "expiryDate": "12/31/2026",
      "lastTransactionAt": "2026-01-15T14:30:00Z",
      "transactionCount": 2,
      "totalRedeemed": 150
    }
  ],
  "message": "Gift cards fetched successfully"
}
```

Note the tracking fields: `currentAmount` shows the remaining balance for FUND cards, `usageCount` tracks how many times the card has been used, and `totalRedeemed` shows the cumulative amount spent.

### Get Gift Card Details

Retrieve full details for a single gift card, including customer information and format representations.

```
GET /gift-cards/:id
```

#### Response

```json
{
  "status": "SUCCESS",
  "data": {
    "giftCardId": "gc-abc-123",
    "pan": "6789012345678901",
    "name": "Holiday Gift Card",
    "cardType": "FUND",
    "amount": 500,
    "currentAmount": 350,
    "usageCount": 2,
    "currency": "SEK",
    "status": "ACTIVE",
    "expiryDate": "12/31/2026",
    "lastTransactionAt": "2026-01-15T14:30:00Z",
    "transactionCount": 2,
    "totalRedeemed": 150,
    "customerDetails": {
      "customerId": "cust-456",
      "firstName": "Anna",
      "surname": "Svensson",
      "countryCode": "SE",
      "emails": [{ "email": "anna@example.com" }],
      "phoneNumbers": [
        {
          "phoneNumber": {
            "countryCode": "46",
            "number": "701234567"
          }
        }
      ]
    },
    "shareableLink": "https://giftcards.surfboardpayments.com/gc-abc-123",
    "formats": {
      "qrCode": "data:image/png;base64,...",
      "nfcData": "NFC_ENCODED_DATA",
      "barcode": "data:image/png;base64,..."
    }
  },
  "message": "Gift card details fetched successfully"
}
```

### Get Gift Card Transactions

View the transaction history for a specific gift card. Supports filtering by transaction type and pagination via the `x-page-number` header.

```
GET /gift-cards/:giftCardId/transactions
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transactionType` | string | No | Filter by type: `ISSUED`, `CREDIT`, or `DEBIT` |

#### Response

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "paymentId": "pay-789",
      "transactionType": "DEBIT",
      "transactionAmount": 150,
      "currency": "SEK",
      "valueBefore": 500,
      "valueAfter": 350,
      "orderId": "order-456",
      "merchantId": "merchant-xyz-789",
      "storeId": "store-abc-123",
      "metadata": {}
    },
    {
      "paymentId": "pay-001",
      "transactionType": "ISSUED",
      "transactionAmount": 500,
      "currency": "SEK",
      "valueBefore": 0,
      "valueAfter": 500,
      "merchantId": "merchant-xyz-789",
      "metadata": {}
    }
  ],
  "message": "Transactions fetched successfully"
}
```

Each transaction record shows the `valueBefore` and `valueAfter` fields, giving a clear audit trail of the gift card balance over time.

## Promotions

Promotions let you create and manage marketing campaigns that appear across merchant channels, such as on payment terminals, receipts, and idle screens. Each promotion is scoped to a specific merchant and store.

### Create a Promotion

```
POST /merchants/:merchantId/stores/:storeId/promotions
```

#### Request

```json
{
  "title": "Summer Sale",
  "name": "summer-sale-2026",
  "description": "50% off all summer items",
  "assetUrl": "https://cdn.example.com/promo-summer.png",
  "type": "RECEIPT_BIG",
  "assetOpacity": "0.8",
  "backgroundColor": "#1e3a5f",
  "contentTextColor": "#ffffff",
  "endProductUrl": "https://shop.example.com/summer",
  "endProduct": "SUMMER-COLLECTION",
  "buttonLabel": "Shop Now",
  "priority": 1,
  "startDate": "06-01-2026",
  "endDate": "08-31-2026"
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Unique name for the promotion |
| `type` | string | Yes | Promotion type (e.g., `RECEIPT_BIG`, `RECEIPT_SMALL`) |
| `priority` | number | Yes | Display priority. Lower numbers = higher priority |
| `startDate` | string | Yes | Start date in `MM-DD-YYYY` format |
| `endDate` | string | Yes | End date in `MM-DD-YYYY` format |
| `title` | string | No | Display title for the promotion |
| `description` | string | No | Brief description of the promotion |
| `assetUrl` | string | No | URL of the promotional image |
| `assetOpacity` | string | No | Image opacity, `0` (transparent) to `1` (opaque) |
| `backgroundColor` | string | No | Background color in hex format |
| `contentTextColor` | string | No | Text color in hex format |
| `endProductUrl` | string | No | URL of the promoted product |
| `endProduct` | string | No | Product ID linked to the promotion |
| `buttonLabel` | string | No | Label for the call-to-action button |

#### Response

```json
{
  "status": "SUCCESS",
  "data": {
    "promotionId": "promo-abc-456"
  },
  "message": "Promotion created successfully"
}
```

### List All Promotions

Retrieve all promotions for a merchant's store to view, manage, and track active and past campaigns.

```
GET /merchants/:merchantId/stores/:storeId/promotions
```

#### Response

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "promotionId": "promo-abc-456",
      "merchantId": "merchant-xyz-789",
      "storeId": "store-abc-123",
      "name": "summer-sale-2026",
      "title": "Summer Sale",
      "description": "50% off all summer items",
      "assetUrl": "https://cdn.example.com/promo-summer.png",
      "endProduct": "SUMMER-COLLECTION",
      "buttonLabel": "Shop Now",
      "startDate": "2026-06-01T00:00:00Z",
      "endDate": "2026-08-31T00:00:00Z",
      "priority": "1",
      "assetOpacity": "0.8",
      "backgroundColor": "#1e3a5f",
      "contentTextColor": "#ffffff",
      "endProductUrl": "https://shop.example.com/summer"
    }
  ],
  "message": "Promotions fetched successfully"
}
```

### Get Promotion by ID

Retrieve the full configuration and current state of a single promotion.

```
GET /merchants/:merchantId/stores/:storeId/promotions/:promotionId
```

The response structure is identical to a single item in the list response above.

### Update a Promotion

Modify any attributes of an existing promotion. Send only the fields you want to change.

```
PUT /merchants/:merchantId/stores/:storeId/promotions/:promotionId
```

#### Request

```json
{
  "description": "Up to 60% off all summer items - extended!",
  "endDate": "09-30-2026",
  "priority": 1
}
```

All fields are optional. The response confirms the update:

```json
{
  "status": "SUCCESS",
  "message": "Promotion updated successfully"
}
```

### Delete a Promotion

Permanently remove a promotion and its associated data.

```
DELETE /merchants/:merchantId/stores/:storeId/promotions/:promotionId
```

#### Response

```json
{
  "status": "SUCCESS",
  "message": "Promotion deleted successfully"
}
```

> **Warning:** Deletion is permanent. The promotion will no longer be active or visible on any channel.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create gift card | POST | `/gift-cards` |
| List all gift cards | GET | `/gift-cards` |
| Get gift card details | GET | `/gift-cards/:id` |
| Get gift card transactions | GET | `/gift-cards/:giftCardId/transactions` |
| Create promotion | POST | `/merchants/:merchantId/stores/:storeId/promotions` |
| List all promotions | GET | `/merchants/:merchantId/stores/:storeId/promotions` |
| Get promotion by ID | GET | `/merchants/:merchantId/stores/:storeId/promotions/:promotionId` |
| Update promotion | PUT | `/merchants/:merchantId/stores/:storeId/promotions/:promotionId` |
| Delete promotion | DELETE | `/merchants/:merchantId/stores/:storeId/promotions/:promotionId` |