---
title: "Configure Tips Using API"
description: "Guide to configure tips for payment terminals in-store using API."
category: "In-Store Payment Guides"
path: "/guides/in-store-payments/administration/configure-tips/api-tab.md"
---

Tip configurations can be applied at various levels using following APIs

- [**Set Merchant Tips Config API**](/api/tips#Set-Merchant-Tips-Config)
- [**Set Store Tips Config API**](/api/tips#Set-Store-Tips-Config)
- [**Set Terminal Tips Config AP**](/api/tipsL#Set-Terminal-Tips-Config)

Each configuration API involves the following steps

1. Send a **`PATCH`** request to respective API (**Set merchant tip config API/Set store tip config API/Set tip config API**) depending on the level at which you wish to configure and include the optional parameters as needed. The following are the list of configurations available,

| **Parameters** | **Description** |
| --- | --- |
| `tipConfig` | Defines the tip options available at checkout. |
| `tipLevel1` | First preset tip percentage (whole number) shown to customers. |
| `tipLevel2` | Second preset tip percentage (whole number) shown to customers. |
| `tipLevel3` | Third preset tip percentage (whole number) shown to customers. |
| `defaultCustomAmount` | Prefills a custom amount on screen for user convenience. |
| `displayCalculatedAmount` | Shows the calculated tip amount on screen. Values: `ENABLED` or `DISABLED`. |
| `tipDisplayFormat` | Format used for displaying the tip. Values: `PERCENTAGE` or `AMOUNT`. |

2. The API returns a **`message`** in the response confirming the tip configuration at specified levels.