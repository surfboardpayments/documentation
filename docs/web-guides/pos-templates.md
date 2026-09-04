# POS Templates

Decide what the till shows and in what order. Lay out product categories, payment methods and terminals per store, and switch layouts automatically by time of day.

Source: https://www.surfboardpayments.com/developers/guides/pos-templates
Category: in-store
Tags: In-Store, API, POS, Templates, Configuration

---
## Overview

A POS template is the layout of the till: which product categories appear, in what order, how many products fit on a page, which payment method is offered first, and which terminal the sale goes to. Templates are defined per store, so a chain can run one layout in a flagship and another in a kiosk.

The `autoSet` field is the one that earns its keep. A café that sells pastries until 11:00 and lunch after it can hold two templates and let the clock switch between them, instead of asking staff to find the right screen during a queue.

## Creating a Template

```json
POST /merchants/:merchantId/stores/:storeId/templates
{
  "name": "Lunch service",
  "paymentMethodOrder": ["SWISH"],
  "productsPerPage": 10,
  "product": [
    {
      "category": "lunch",
      "productOrder": ["82674cfdf77f500001", "82674cfdf77f500002"]
    },
    {
      "category": "drinks",
      "productOrder": ["82674cfdf77f500003"]
    }
  ],
  "autoSet": [
    { "start": "11:00", "end": "14:00" }
  ],
  "terminal": {
    "primaryTerminal": "82674beadf0f700405",
    "terminalOrder": ["82674beadf0f700405"]
  },
  "metaData": {
    "till": "counter-2"
  }
}
```

```json
// Response
{
  "status": "SUCCESS",
  "data": { "templateId": "8271dfa5782e380148" },
  "message": "Pos-Template Created Successfully"
}
```

| Field | Required | What it does |
|-------|----------|--------------|
| `name` | Yes | The label staff see. Name it after the situation — "Lunch service", "Market stall" — not after the file. |
| `paymentMethodOrder` | No | Payment methods in the order they are offered. |
| `productsPerPage` | No | Products per page on the POS. |
| `product[].category` | Yes | A product category. |
| `product[].productOrder` | Yes | Product IDs in display order. |
| `autoSet[]` | No | Time windows, as `HH:MM` in 24-hour format, when this template applies. |
| `terminal.primaryTerminal` | No | The terminal this template sends payments to first. |
| `terminal.secondaryTerminal` | No | The fallback terminal. |
| `terminal.terminalOrder` | No | Terminal IDs in preferred order. |
| `metaData` | No | Free key-value pairs for your own use. |

**Order is meaningful in every array here.** `paymentMethodOrder`, `productOrder` and `terminalOrder` are display order, not sets, so the first entry is what a member of staff reaches for without thinking. Put the thing they sell most at the front and the layout does the training.

Product IDs come from the catalog. See [Product Catalog](/developers/guides/product-catalog) for creating products, variants and categories.

## Managing Templates

```
GET    /merchants/:merchantId/stores/:storeId/templates
GET    /merchants/:merchantId/stores/:storeId/templates/:templateId
PUT    /merchants/:merchantId/stores/:storeId/templates/:templateId
DELETE /merchants/:merchantId/stores/:storeId/templates/:templateId
```

Update carries the same body as create. Keep the template's `name` stable when you change its contents — staff learn the name, and renaming a layout they know costs more than the change was worth.

## Designing Templates That Work

A till is used by someone who is being watched by a customer, so the rules are unforgiving:

- **Fewer products per page beats more.** `productsPerPage` is a temptation to fit everything; a page of ten items that are found instantly beats a page of thirty that must be read.
- **One template per situation, not per person.** Lunch, evening, and the summer terrace are situations. Individual staff preferences are not, and they multiply.
- **Let `autoSet` do the switching.** A template that has to be chosen manually will be the wrong one at the busiest moment of the day.
- **Mind the gaps between windows.** `autoSet` windows that do not cover opening hours leave the till on whatever was last used. Cover the full day, or keep one template as the default that others interrupt.

## Reference

- [Templates API](https://developers.surfboardpayments.com/api/templates)
- [Product Catalog](/developers/guides/product-catalog)
- [Payment Methods](/developers/guides/payment-methods)
- [Terminal & Device Management](/developers/guides/terminal-device-management)
