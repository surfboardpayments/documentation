# AI Product Images and Branding

Turn a phone photo into a usable product image and a website into a branded portal. Two endpoints that remove the design work from onboarding a merchant.

Source: https://www.surfboardpayments.com/developers/guides/ai-merchandising
Category: online
Tags: Online, API, AI, Catalog, Branding

---
## Overview

Two of the slowest parts of onboarding a merchant have nothing to do with payments. Someone has to photograph the products, and someone has to pick the colours. The AI API does both from what the merchant already has: a snapshot taken on the shop floor, and the URL of their website.

| Endpoint | What it takes | What it returns |
|----------|---------------|-----------------|
| `POST /ai/enhance-image` | A product photo and its name | Enhanced images, plain or in a scene |
| `POST /ai/branding` | A website URL | Colour schemes, shapes and fonts for that brand |

Both are ordinary authenticated calls — API key, secret and merchant ID — and both are rate limited. Ask support if you need the limit raised.

## Enhancing Product Images

A catalog full of photos taken under shop lighting is the difference between a POS people use and one they abandon. Send the image you have:

```json
POST /ai/enhance-image
{
  "productName": "Wireless Bluetooth Headphones",
  "url": "https://example.com/images/product-12345.jpg",
  "mode": "STANDARD"
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "imageUrls": [
      "https://cdn.example.com/enhanced/image-abc123-v1.jpg",
      "https://cdn.example.com/enhanced/image-abc123-v2.jpg",
      "https://cdn.example.com/enhanced/image-abc123-v3.jpg"
    ]
  },
  "message": "Image enhanced successfully"
}
```

| Field | Notes |
|-------|-------|
| `productName` | Context for the model. "Wireless Bluetooth Headphones" produces a better result than "IMG_4821". |
| `url` | Must be publicly reachable, in a normal web format — JPEG or PNG. |
| `mode` | `STANDARD` cleans up the photo. `SCENE` places the product in a generated setting. |

You get several variants back, not one. Show them to the merchant and let them choose — this is a suggestion, not a replacement, and the person who sells the product is the one who knows whether it looks right.

`SCENE` is the more computationally expensive mode and takes longer. Use `STANDARD` for the bulk import and offer `SCENE` for the handful of products that carry a storefront.

### Wiring It Into Onboarding

The natural place for this is the product catalog. A merchant uploads whatever photos they have, you enhance them in the background, and the catalog is presentable before they finish the rest of the form. See [Product Catalog](/developers/guides/product-catalog) for how products and variants are stored, and the POS template in [POS Templates](/developers/guides/pos-templates) for how they are laid out on the till.

Treat the returned URLs as inputs you store, not as a live dependency: download them and put them in your own storage before pointing a catalog entry at them.

## Generating Branding

A merchant's website already says what their brand is. Point the endpoint at it:

```json
POST /ai/branding
{
  "url": "https://example-company.com"
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": {
    "options": [
      {
        "brandingOptions": [
          {
            "backgroundColor": "#FDFDFF",
            "brandColor": "#38488F",
            "accentColor": "#38488F",
            "rectShape": "rounded",
            "fontType": "mono",
            "logoUrl": "",
            "iconUrl": "",
            "footerColor": "#F0F0F2"
          }
        ],
        "metadata": {
          "inputTokens": 1043,
          "outputTokens": 85,
          "outputType": "text"
        }
      }
    ]
  },
  "message": "Branding generated successfully"
}
```

Each option is a complete set: background, brand and accent colours, a footer colour, a corner style and a font family, plus logo and icon URLs where they could be derived.

These map onto the branding you can already configure for terminals, payment pages and portals, so the output of this call is the input to that one. [Partner Branding](/developers/guides/partner-branding) covers where each value lands and at which level it applies.

Present the options as a choice with a preview. Generated colour is a starting point that saves a merchant an hour, not a decision made on their behalf — and a brand colour applied without asking is the kind of surprise that generates a support ticket rather than delight.

## Practical Notes

- **Both endpoints are rate limited.** Queue bulk work rather than firing a request per row of an import.
- **Handle the slow path.** Image work, `SCENE` in particular, is not instant. Do it in a background job with a status the merchant can see, not in a request they are waiting on.
- **A 404 on `/ai/enhance-image` means the image URL was unreachable**, not that the endpoint is wrong. Check that the URL is public before retrying.
- **Nothing here is authoritative.** The output is a draft for a human to accept. Keep the original photo and the merchant's own colours; a generated asset should always be replaceable by the real one.

## Reference

- [AI API](https://developers.surfboardpayments.com/api/ai)
- [Product Catalog](/developers/guides/product-catalog)
- [Partner Branding](/developers/guides/partner-branding)
- [POS Templates](/developers/guides/pos-templates)
