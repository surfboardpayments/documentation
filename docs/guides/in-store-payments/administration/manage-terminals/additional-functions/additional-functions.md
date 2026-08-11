---
title: "Additional Functions of the Terminal"
description: "Guide to managing and configuring additional functions of the terminal."
category: "Terminals"
path: "/guides/in-store-payments/administration/manage-terminals/additional-functions/additional-functions.md"
---

# Additional functions

This section provides an overview of the various functionalities available for managing your terminals that are integrated to existing checkout system or ECR.

The key functionalities for managing the terminals are:

-   Change store
-   Delink terminal from store
-   Reboot terminal
-   Update terminal name

### Change Store

Once terminal is successfully registered under a merchant, it cannot be repurposed for use by any other merchant. However, to use the terminal in a different store under the same merchant, you can change the registered store using the [**Change Store API**](/api/terminals#Change-Store).

>Change store can happen only within a merchant.

**Prerequisites**

- API Credentials.
- **`terminalId`** of the terminal being moved to another store.
- **`storeId`**  of the store where the terminal will be registered.

**To change store**,

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/additional-functions/change-store-api-tab.md"
  },
  {
    label: "Through Merchant Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/additional-functions/change-store-merchant-portal-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/additional-functions/change-store-partner-portal-tab.md"
  }
] /%}

### Delink terminal from store

You can delink a terminal from its registered store. Merchants can delink a terminal from its registered store from the merchants tab in the Merchant Dashboard. Partners can use the [**Delink Terminal from Store API**](/api/terminals#Delink-Terminal-from-Store) to delink the terminal from its registered store. However, you cannot use the delinked terminal for another merchant.

**Prerequisites**

- API Credentials.
- **`terminalId`** of the terminal to be delinked.
- The **`storeId`** of the store the terminal is registered to.

**To delink from store,**

1. **`POST`** a request with the required parameters **`terminalId`**  and **`storeId`** to  [**Delink Terminal from Store API**](/api/terminals#Delink-Terminal-from-Store).
2. You will get a response with a confirmation message that the terminal has been removed from the store.


{% requestresponse method="POST" requests=[{language: "cURL", code: "\ncurl -d '{\n\t        \"terminal$id\":\"834ffc078fbcd80904\",\n\t        \"storeId\":\"83402f67a06b68040f\"\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/terminals/deactivate"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"message\": \"Terminal removed from store\"\n}" languages=["cURL"] /%}

### Reboot terminal

Partners have the ability to remotely restart a terminal using the [**Reboot Terminal API**](/api/terminals#Reboot-Terminal). This API publishes a remote reboot command for the terminal. However, it's important to understand that the execution of this reboot command may be influenced by various factors, such as other ongoing commands and the connectivity status of the terminal.
**Prerequisites**

- API Credentials.
- **`terminalId`**  of the terminal to be rebooted.

**To reboot the terminal**,

1. Send a **`POST`** request to [**Reboot Terminal API**](/api/terminals#Reboot-Terminal).
2. You will receive a response with a message describes the status of reboot request.


{% requestresponse method="POST" requests=[{language: "cURL", code: "curl \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     -X POST YOUR_API_URL/terminals/:terminalId/reboot"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"message\": \"Reboot command published successfully\"\n}" /%}

### Update terminal name

Use the [**Update Terminal Name API**](/api/terminals#Update-Terminal-Name) to change the registered terminal's name by specifying the new terminal name in the request.

**Prerequisites**

- API Credentials.
- **`terminalId`** of the registered terminal to be renamed.

**To update terminal name,**

{% tabs tabs=[
  {
    label: "Through API",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/additional-functions/update-terminal-name-api-tab.md"
  },
  {
    label: "Through Merchant Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/additional-functions/update-terminal-name-merchant-portal-tab.md"
  },
  {
    label: "Through Partner Portal",
    markdocSrc: "guides/in-store-payments/administration/manage-terminals/additional-functions/update-terminal-name-partner-portal-tab.md"
  }
] /%}

## Manage terminals linked with CheckoutPro

For your **CheckoutPro** integration, you have the following functionalities for managing your terminals:

-   Link terminal to CheckoutPro
-   Check link status
-   Delink terminal from CheckoutPro

### Link terminal to CheckoutPro

After registering, terminals can be linked with your CheckoutPro to accept payments. Merchants can link their terminal to the CheckoutPro in their respective Partner’s Merchant Portal. Partners can link the terminal to the CheckoutPro using the [**Link Terminal API**](/api/terminals#Link-Terminal).

After the terminals are linked to the CheckoutPro, merchants can manage the terminals in the terminal tab in the Merchant Dashboard. Partners can manage the terminals using the [**Terminals APIs**](/api/terminals).

{% requestresponse method="PUT" requests=[{language: "cURL", code: "curl -X PUT -d '{\n          \"terminal$id\": \"814aae4268e6700704\"\n         }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/merchants/:merchantId/stores/:storeId/terminals/:terminalId/link"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"message\": \"Terminal linked successfully\"\n}" /%}

### Check link status

Partners can check the linkage status between the terminal and the CheckoutPro using the [**Check Link Status API**](/api/terminals#Check-Link-Status). While retrieving the linkage status, you may receive one of the following status messages:

-   LINKED: The terminal is linked to the CheckoutPro
-   NOT LINKED: The terminal is not linked to CheckoutPro

{% requestresponse method="GET" requests=[{language: "cURL", code: "curl -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/merchants/:merchantId/stores/:storeId/terminals/814aae4268e6700704/link"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"data\": {\n\t\t\"linkageStatus\": \"LINKED\"\n\t},\n\t\"message\": \"Terminal Linkage Status fetched Successfully\"\n}" /%}

### Delink terminal from CheckoutPro

The terminals can be swapped between various Checkouts of the same merchant or vice versa. Merchants can delink their terminal from the CheckoutPro in their respective Partner’s Merchant Portal. Partners can use the [**Delink Terminal API**](/api/terminals#Delink-Terminal) to delink a terminal from its linked CheckoutPro. You can then link the terminal with another checkout under the same merchant.

{% requestresponse method="DELETE" requests=[{language: "cURL", code: "\ncurl -X DELETE -d '{\n          \"terminalId\": \"814e73b91052380704\"\n          }' \\\n     -H 'Content-Type: application/json' \\\n     -H 'API-KEY: YOUR_API_KEY' \\\n     -H 'API-SECRET: YOUR_API_SECRET' \\\n     -H 'MERCHANT-ID: YOUR_MERCHANT_ID' \\\n     YOUR_API_URL/merchants/:merchantId/stores/:storeId/terminals/814e73b91052380704/link"}] response="{\n\t\"status\": \"SUCCESS\",\n\t\"message\": \"Terminal delinked successfully\"\n}" /%}

{% docfooter relatedLinks="[{ title: 'Manage your merchants', url: '/guides/in-store-payments/administration/manage-merchants' },{ title: 'Terminal registration', url: '/guides/in-store-payments/terminal-registration/home' },{ title: 'Stores', url: '/docs/stores' }]" /%}
