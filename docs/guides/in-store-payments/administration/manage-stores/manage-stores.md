---
title: "Manage Stores"
description: "Guide to create and updating stores for in-store."
category: "In-Store Payment Guides"
path: "/guides/in-store-payments/administration/manage-stores/manage-stores.md"
---

# Manage stores

A store is the physical location where sales occur. During the merchant creation process, a default store can be created. Merchants or Partners can create additional stores as needed using the [**createStore API**](/api/stores#Create-Store). Each store is identified by a unique **Store ID** linked to the merchant.

## Pre-requisites

- API Credentials.
- **`merchantId`** obtained via [**Create Merchant API**](/api/merchants#Create-Merchant).

## Overview of the flow

```mermaid
flowchart TD
    A[Complete merchant and store setup] --> B{Add stores}
    B--Create store API-->C[Store updated]
    B--Partner portal-->C[Store updated]
    C-->D[Terminal registration]
    C-->E[Configuration updates]
```

## Create and add stores

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/manage-stores/create-add-stores-api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-stores/create-add-stores-partner-portal-tab.md"
  }
] /%}

## Update store details

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/manage-stores/update-store-api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-stores/update-store-partner-portal-tab.md"
  }
] /%}

{% docfooter relatedLinks="[{ title: 'Create Merchant and Store Setup', url: '/guides/in-store-payments/create-merchant-and-store-setup/home' }]" /%}