---
title: "Database Connectivity"
description: "Guide to database connectivity for online payment integrations."
category: "Integrations"
path: "/guides/online-payments/integrations/database-connectivity.md"
---

# Database connectivity

Surfboard offers daily data dumps that provide you with up-to-date data about your transactions and settlements. 

The data dumps typically includes all available data for a particular day. You can use this data to streamline your reporting process and gain insights that will help you make informed business decisions. 

We support any database engine of your choice on demand, making it easy for you to perform data warehousing and business intelligence applications.

{% callout type="note" label="Note" %}
This service can be considered for merchants with **over 10,000 daily transactions**. For fewer transactions, we recommend using our API.
{% /callout %}

## **Types of data dumps**

**Transaction Data**: Transaction data dumps gives regular updates that contain information about all transactions that took place in a specific time period, typically on a daily basis. The data includes date, time, transaction amount, transaction type, transaction status, and any other pertinent information. This data can be used for analysis, reporting, and business decision-making purposes.

**Payout Data:** Payoutdata is provided on a daily basis along with basic merchant information about the funds that have been settled for a specific time period. This includes details about the Surfboard fee, the settlement amount, the settlement date, the product charges and any other relevant information.

## **How to activate this?**

We are currently working on making this feature available to you. If you are interested in trying it out, please contact us at [**integrations@surfboard.se**](mailto:integrations@surfboard.se).

{% docfooter relatedLinks="[{ title: 'Surfboard APIs', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'API Architecture', url: '/guides/online-payments/integrations/api-architecture' },{ title: 'Platform Hierarchy', url: '/guides/online-payments/integrations/platform-structure' }]" /%}