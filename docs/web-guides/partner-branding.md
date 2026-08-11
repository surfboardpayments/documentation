## Overview

Surfboard is fully white-label. Use the Branding API to configure colors, fonts, logos, and images that apply to all terminals and customizable pages under your partner account. Branding can be set at the partner level and inherited by all merchants and stores beneath it.

## Set Partner Branding

Configure the visual appearance for your payment pages and terminals.

```
PATCH /partners/:partnerId/branding
```

### Request

```json
{
  "backgroundColor": "#071132",
  "brandColor": "#0e44e1",
  "accentColor": "#00ffa7",
  "footerColor": "#071132",
  "rectShape": "rounded",
  "fontType": "sans-serif",
  "logoUrl": "https://your-cdn.com/logo.svg",
  "iconUrl": "https://your-cdn.com/icon.png",
  "primaryCoverImage": "https://your-cdn.com/cover-primary.jpg",
  "secondaryCoverImage": "https://your-cdn.com/cover-secondary.jpg"
}
```

All fields are optional -- only include the ones you want to update.

### Branding Parameters

| Parameter | Description |
|-----------|-------------|
| `backgroundColor` | Background color for pages (hex) |
| `brandColor` | Primary brand color for buttons and accents (hex) |
| `accentColor` | Secondary color that complements the brand color (hex) |
| `footerColor` | Footer background color (hex) |
| `rectShape` | Button shape: `rounded`, `pill`, or `edgy` |
| `fontType` | Font family: `sans-serif`, `serif`, or `mono` |
| `logoUrl` | URL to your logo image |
| `iconUrl` | URL to your icon/favicon image |
| `primaryCoverImage` | URL to the primary cover image |
| `secondaryCoverImage` | URL to the secondary cover image |

### Response

```json
{
  "status": "SUCCESS",
  "message": "Branding updated successfully"
}
```

### Via Partner Portal

Navigate to **Settings** > **Set Partner Branding Config**, enter your branding values, and click **Save Changes**.

## Fetch Partner Branding

Retrieve the current branding configuration for your partner account.

```
GET /partners/:partnerId/branding
```

### Response

```json
{
  "status": "SUCCESS",
  "data": {
    "backgroundColour": "#071132",
    "brandColor": "#0e44e1",
    "accentColor": "#00ffa7",
    "footerColor": "#071132",
    "rectShape": "rounded",
    "fontType": "sans-serif",
    "logoUrl": "https://your-cdn.com/logo.svg",
    "iconUrl": "https://your-cdn.com/icon.png",
    "primaryCoverImage": "https://your-cdn.com/cover-primary.jpg",
    "secondaryCoverImage": "https://your-cdn.com/cover-secondary.jpg"
  },
  "message": "Branding retrieved successfully"
}
```

## How Branding Applies

Partner-level branding is the default for all merchants and stores under your account. It applies to:

- **Payment pages** -- hosted checkout UI
- **Terminals** -- on-screen branding for smart terminals
- **Receipts** -- logo and styling on digital receipts

This means your merchants' customers see your brand, not Surfboard's, across all payment touchpoints.