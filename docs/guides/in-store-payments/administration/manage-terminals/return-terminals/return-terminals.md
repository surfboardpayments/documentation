---
title: "Return Terminals"
description: "Guide to returning malfunction/defective payment terminals in-store."
category: "In-Store Payment Guides"
path: "/guides/in-store-payments/administration//manage-terminals/return-terminals.md"
---

# Return malfunction/defective terminals

If case of receiving a malfunctioning or defective terminal, you can return it to Surfboard and track its status using either the **Partner Portal** or **API**.

## Overview of the flow

```mermaid
flowchart TD
    A[Merchant onboarded and recieve terminal] --> B{Return terminal}
    B --> C1[Create return request API]
    B --> C2[Partner portal]
    D[Return initiates]
    C1 -->D
    C2 -->D
    D-->E[Track status via API]
```

## Pre-requisites

- **API Credentials**: Valid API-KEY, API-SECRET, and **`partnerId`** for access to APIs.
- **`terminalId`** :Id of the terminal that should be returned.

## To return terminal
{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/return-terminals/return-terminal-api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/return-terminals/return-terminal-partner-portal-tab.md"
  }
] /%}
## Track the return status

Partners can track all the return request associated with them using [**Fetch All Return Requests** API](api/logistics#Fetch-All-Return-Requests) by following these steps

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/return-terminals/return-status-api-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/return-terminals/return-status-partner-portal-tab.md"
  }
] /%}

{% docfooter relatedLinks="[{ title: 'Terminal Registration', url: '/guides/in-store-payments/terminal-registration/home' }]" /%}