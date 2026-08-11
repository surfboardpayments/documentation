## Overview

The Product Catalog API lets you build a structured product hierarchy for your stores. You can create catalogs, add products with pricing and tax configuration, define variants (such as sizes and colours), manage stock levels, and pull sales statistics -- all through a single set of REST endpoints.

This guide walks through every operation in the catalog lifecycle, from creating an empty catalog to pulling performance analytics.

## Prerequisites

- A configured **store** with a valid `storeId`
- API credentials (API key, API secret)

## Step 1: Create a Product Catalog

A catalog is the top-level container that groups products for a store. Each store can have one or more catalogs.

### Create catalog

```json
POST /catalog
{
  "storeId": "8136a645a2c2d1bb0f"
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "productcatalogId": "cat_91a3f..."
  },
  "message": "Product catalog created successfully"
}
```

### List catalogs

Retrieve all catalogs that exist under the store:

```
GET /catalog
```

The response returns `data.productcatalogId` as an array of catalog IDs associated with the store.

## Step 2: Add Products

With a catalog in place, add products to it. Each product requires a name, type, pricing, tax, and descriptive metadata.

```json
POST /catalog/:catalogId/products
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Purple Logo",
  "type": "PRODUCT",
  "unitType": "FIXED",
  "costPrice": 20,
  "sellingPrice": 45,
  "currencyCode": "752",
  "tax": [
    {
      "type": "VAT",
      "percentage": "3"
    }
  ],
  "description": "SurfPad Payment Terminal in Purple",
  "category": "electronics",
  "unit": "nos",
  "productImages": [
    "https://example.com/images/surfpad-purple.png"
  ],
  "hsnCode": "723453",
  "barCode": "7812123454323"
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "productId": "prod_82f4a..."
  },
  "message": "Product created successfully"
}
```

### Product types and unit types

| Field | Values | Description |
|-------|--------|-------------|
| `type` | `PRODUCT`, `SERVICE` | Whether the item is a physical product or a service |
| `unitType` | `FIXED`, `VARIABLE`, `FREE_AMOUNT` | How quantity and pricing are determined |

### Fetch a single product

```
GET /catalog/:catalogId/products/:productId
```

Pass `storeId` as a query parameter. The response includes the full product object with pricing, tax, attributes, and inventory status.

### List all products in a catalog

```
GET /catalog/:catalogId/products
```

Returns an array of products including their variants, inventory, billing plans, campaign info, and tax breakdown.

## Step 3: Add Product Variants

Variants represent different versions of a product, such as colour or size options. Attach them to an existing product.

```json
POST /catalog/:catalogId/products/:productId/variants
{
  "storeId": "8136a645a2c2d1bb0f",
  "variants": [
    {
      "name": "SurfPad Blue Variant",
      "description": "Blue variant of SurfPad",
      "costPrice": 10,
      "sellingPrice": 12,
      "currencyCode": "752",
      "productImages": [
        "https://example.com/images/surfpad-blue.png"
      ],
      "hsnCode": "123453",
      "barCode": "1212123454323",
      "attributeValues": [
        {
          "attributeKey": "colour",
          "displayName": "blue",
          "value": "#0000FF"
        },
        {
          "attributeKey": "size",
          "displayName": "medium",
          "value": "M"
        }
      ]
    }
  ]
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "variants": ["var_73b1c..."]
  },
  "message": "Variants added successfully"
}
```

Each variant in the `attributeValues` array uses an `attributeKey` (e.g. `colour`, `size`) paired with a `displayName` and `value` so the storefront can render selectable options.

## Step 4: Link Related Products

Drive cross-sell and upsell opportunities by associating related products with a primary product.

```json
POST /catalog/:catalogId/products/:productId/related-products
{
  "storeId": "8136a645a2c2d1bb0f",
  "relatedProducts": [
    {
      "productId": "prod_82f4a...",
      "relatedProductId": "prod_55d2b..."
    }
  ]
}
```

The API returns a `SUCCESS` status when the association is saved.

## Step 5: Update Products and Variants

### Update a product

Use `PATCH` to modify any product field. Only the fields you include will be changed.

```json
PATCH /catalog/:catalogId/products/:productId
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Black Logo",
  "sellingPrice": 15,
  "description": "SurfPad Payment Terminal in Black"
}
```

### Update a variant

The same partial-update approach works for variants:

```json
PATCH /catalog/:catalogId/products/:productId/variants/:variantId
{
  "storeId": "8136a645a2c2d1bb0f",
  "name": "SurfPad Black Logo - Large",
  "sellingPrice": 18,
  "description": "SurfPad Payment Terminal in Black - Large Size"
}
```

Both endpoints return `{ "status": "SUCCESS" }` on success.

## Step 6: Manage Inventory

Track stock at both the product level and the individual variant level.

### Update product inventory

```json
PATCH /catalog/:catalogId/products/:productId/inventory
{
  "storeId": "8136a645a2c2d1bb0f",
  "inventory": {
    "productId": "prod_82f4a...",
    "inventory": {
      "quantity": 10,
      "reorderLevel": 5,
      "reorderQuantity": 10
    }
  }
}
```

### Update variant inventory

```json
PATCH /catalog/:catalogId/products/:productId/variants/:variantId/inventory
{
  "storeId": "8136a645a2c2d1bb0f",
  "operation": "STOCK_UP",
  "quantity": 15,
  "unit": "nos"
}
```

The `operation` field controls how stock is modified (e.g. `STOCK_UP` to add inventory). The `unit` field accepts standard measurement units such as `nos`, `kg`, `l`, `m`, and many others.

## Step 7: View Statistics

### Product statistics

Get sales performance, inventory levels, and VAT breakdowns for a single product:

```
GET /catalog/:catalogId/products/:productId/statistics
```

Optionally pass `startDate` and `endDate` query parameters in `YYYY-MM-DD` format to filter by date range. The response includes:

- **Sales by currency** -- units sold, units returned, revenue, VAT, campaign discounts, order count, and average order value
- **Inventory status** -- current stock, stock in, stock out
- **VAT breakdown** -- amount and taxable total per VAT percentage
- **Variant-level stats** -- the same metrics broken down per variant

### Catalog statistics

Get an aggregate view across the entire catalog:

```
GET /catalog/:catalogId/products/statistics
```

This returns:

- **Summary** -- total products, total variants, and aggregated sales metrics by currency
- **VAT breakdown** -- catalog-wide tax totals
- **Top-selling products** -- ranked by units sold and revenue, with per-currency breakdowns

Both endpoints support optional `startDate` and `endDate` query parameters.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create catalog | POST | `/catalog` |
| List catalogs | GET | `/catalog` |
| Create product | POST | `/catalog/:catalogId/products` |
| Fetch product by ID | GET | `/catalog/:catalogId/products/:productId` |
| List all products | GET | `/catalog/:catalogId/products` |
| Update product | PATCH | `/catalog/:catalogId/products/:productId` |
| Add variants | POST | `/catalog/:catalogId/products/:productId/variants` |
| Update variant | PATCH | `/catalog/:catalogId/products/:productId/variants/:variantId` |
| Add related products | POST | `/catalog/:catalogId/products/:productId/related-products` |
| Update product inventory | PATCH | `/catalog/:catalogId/products/:productId/inventory` |
| Update variant inventory | PATCH | `/catalog/:catalogId/products/:productId/variants/:variantId/inventory` |
| Product statistics | GET | `/catalog/:catalogId/products/:productId/statistics` |
| Catalog statistics | GET | `/catalog/:catalogId/products/statistics` |