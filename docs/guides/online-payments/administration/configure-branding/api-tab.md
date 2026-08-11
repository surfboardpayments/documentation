---
title: "Branding using API"
description: "Guide to customizing branding for Surfboard Payments online solutions using API."
category: "Online Payment Guides"
path: "/guides/online-payments/administration/configure-branding/api-tab.md"
---

Branding can be configured at various levels using following APIs

- [**Create branding for merchant API**](https://developers.surfboardpayments.com/api/branding?lang=cURL#Create-Branding-for-Merchant)
- [**Create branding for store API**](https://developers.surfboardpayments.com/api/branding?lang=cURL#Create-Branding-for-Store)
- [**Create branding for partner API**](https://developers.surfboardpayments.com/api/branding?lang=cURL#Create-Branding-for-Partner)

Each configuration API involves the following steps

1. Send a **`PATCH`** request to respective API (**Create branding for merchant API/Create branding for store API/Create branding for partner API**) depending on the level at which you wish to configure and include the optional parameters as needed. The following are the list of configurations available,

| **Parameters** | **Description** |
| --- | --- |
| `backgroundColor` | Background color for the page. |
| `brandColor` | Primary brand color for your page. |
| `footerColor` | Footer's background color on the page. |
| `accentColor` | A secondary color that complements your brand color. |
| `rectShape` | Shape of page buttons: `'rounded'`, `'pill'`, or `'edgy'`. |
| `fontType` | Font family: `'sans-serif'`, `'serif'`, or `'mono'`. |
| `logoUrl` | Logo displayed on the page. |
| `iconUrl` | Icon displayed on the page. |
| `primaryCoverImage` | Primary cover image displayed on the page. |
| `secondaryCoverImage` | Secondary cover image displayed on the page. (Coming soon) |

2. The API returns a **`message`** in the response confirming the tip configuration at specified levels.