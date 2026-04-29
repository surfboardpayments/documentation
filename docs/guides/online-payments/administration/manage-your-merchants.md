---
title: "Manage Merchants"
description: "Guide to managing merchants for online payments."
category: "Online Payment Guides"
path: "/guides/online-payments/administration/manage-merchants.md"
---

# Manage your merchants

As a partner, you can manage your merchants from the **Partner portal** or using the **Merchants API**. This section provides an overview of the various functionalities available for merchant management. The key capabilities include:

-   Fetch individual merchant details
-   Fetch all merchants
-   Fetch all merchants contracts
-   Update merchant details
-   Fetch all the terminals associated with a merchant


## Fetch individual merchant details

**Fetch Individual Merchant Details** provides specific information about a merchant associated with the partner using [**Fetch Merchant Details API**](/api/merchants#Fetch-Merchant-Details). Partners can also retrieve the merchant details using Partner Portal.

**Prerequisites**

- API credentials, **`partnerId`** and **`merchantId`**

**To fetch individual merchant details,**

1. Send a **`GET`**  request to [**Fetch Merchant Details API**](/api/merchants#Fetch-Merchant-Details) to retrieve specific merchant details.
2. The API returns the following details about the merchants:
    - Details of the merchant (Merchant ID, Name, Address, Phone number, Language, LogoUrl, Company ID, Supported currency, Primary location)
    - Merchant Category Code (MCC) (Its a four-digit number that classifies businesses by the type of goods or services they offer)
    - Analytics(Count of sales, Refunds for current and previous month)
    - Partner ID
    - Time at which the merchant was created
    - Total number of transactions
    - Total amount from the transactions
    - Time of last transaction

## Fetch all merchants

You can use the [**Fetch All Merchants API**](/api/merchants#Fetch-All-Merchants) to retrieve information about all the merchants. Partners can also fetch the merchant details using **Partner Portal**.

**Prerequisites**

- API credentials and **`partnerId`** .

**To fetch all merchants details under partner,**

1. Make a **`GET`**  request to [**Fetch All Merchants API**](/api/merchants#Fetch-All-Merchants).
2. The API returns the response same information as**Fetch Individual Merchant Details** but for all the merchants under the partner.

## Fetch all merchants contracts

**Fetch All Merchant Contracts** is a feature that allows you to retrieve a complete list of contracts between the partner and the merchant. 

**Prerequisites**

- API credentials and **`merchantId`** .

**To fetch details of merchants contracts,**

1. Send a **`GET`** request to [**Fetch All Merchant Contracts API**](/api/merchants#Fetch-All-Merchant-Contracts)  to retrieve details about the contracts between merchant and partner.
2. The API returns the following information about the merchants contracts 

| **Params** | **Description** |
| --- | --- |
| `contractId` | Unique identifier for the contract. |
| `type` | Type of the merchant contract (e.g., `MERCHANT_AGREEMENT`). |
| `status` | Status of the contract – either `ACTIVE` or `INACTIVE`. |
| `contractLink` | URL link to view the merchant contract. |

## Update merchant details

For merchants who wish to make changes to their merchant information can use the [**Update Merchant Details API**](/api/merchants#Update-Merchant-Details). This API allows you to update certain basic information.

**Prerequisites**

- API credentials and **`merchantId` .**

**To update merchant details,**

1. Make a **`PUT`** request to [**Update Merchant Details API**](/api/merchants#Update-Merchant-Details) with optional parameters, can be used as per the merchant needs as stated below
    - Email address
    - Phone number (With **International dialing code** for a country or region)
    - Merchant logo URL
2. The API returns a confirmation message that merchant details has been updated successfully.

## Fetch all merchant terminals

Partners who need to fetch the details of merchant terminals can use the [**Fetch All Merchant Terminals API**](/api/merchants#Fetch-All-Merchant-Terminals) . 

**Prerequisites**

API credentials.

**To fetch the details of the merchants terminals**,

1. Make a **`GET`**  request with **`merchantId`** to [**Fetch All Merchant Terminals API**](/api/merchants#Fetch-All-Merchant-Terminals) under the specific merchant.
2. The API returns information about devices, their status, payment methods, and other relevant details for all terminals registered under a specific merchant. You get the following information about the terminals:
    - Terminal details( Terminal ID, Name, Software version, Operating system type, Operating system version, Device vendor, Device model, Device serial number, Status)
    - Store ID
    - Terminal ID of the linked CheckoutPro if any
    - Supported payment methods
    - Time registration

{% docfooter relatedLinks="[{ title: 'Create Merchant and Store Setup', url: '/guides/online-payments/create-merchant-and-store-setup/create-merchant-and-store-setup' },{ title: 'Online Payment Terminals', url: '/guides/online-payments/online-payment-terminals/payment-page' }]" /%}
