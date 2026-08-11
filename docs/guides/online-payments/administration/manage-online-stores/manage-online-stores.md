---
title: "Create and Update Online Store"
description: "Guide for create and update online stores (Create or Update)."
category: "Administration"
path: "/guides/online-payments/administration/manage-online-stores/manage-online-stores.md"
---

# Setup online store

Online stores in Surfboard function similarly to physical stores but require additional properties to facilitate online payments. You can either create a new online store or update an existing physical store to an online store. The following guide outlines the steps to set up an online store.

## Pre-requisite for Creating an Online Store

- API Credentials.
- **`merchantId`** obtained via [**Create Merchant API**](https://developers.surfboardpayments.com/api/merchants#Create-Merchant).


## Create or Update Online Store

To create a new online store or update an existing physical store, you will use the [Create Store API](/api/stores#Create-Store) with additional parameters for online functionalities.

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/online-payments/administration/manage-online-stores/api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/online-payments/administration/manage-online-stores/partner-portal-tab.md"
  }
] /%}

{% callout type="note" label="Note" %}
The approval process typically completes within a business day. For any queries, contact us at [**support@surfboardpayments.com**](mailto:support@surfboardpayments.com)
{% /callout %}
