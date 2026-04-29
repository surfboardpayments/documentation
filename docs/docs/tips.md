# Tips

Merchants can configure tips, allowing them to set both preset and custom tip amounts. Tips can be configured from the Merchant Dashboard. Additionally, partners can utilize the [**Tips APIs**](/api/tips) to set up tip configurations for merchants. When making payments, customers can select from these preset tip values or opt to input a custom amount based on their preference.

The following functionalities are available for you to manage tips:

-   Configure tips
-   Fetch tips configuration

## Configure tips

With tips configurations, you can enable and customize tips for your terminals at various hierarchical levels. Tips can be set at the **Partner**, **Merchant**, **Store**, or even at the individual **Terminal level**.

### Configuration Options

You can adjust the following tips settings:

**Tip configuration**: Here, you customize how tips are managed during payments:

| **Configuration** | **Description**                                                 |
| ----------------- | --------------------------------------------------------------- |
| Enabled           | This option allows accepting tips while processing payments.    |
| Disabled          | With this, you can opt-out of accepting tips during payments.   |
| Other amount      | This lets you input a custom tip amount at the time of payment. |

**Preset Tip Values**: You can also set up to three percentage values for tips. During payment, customers can choose from these preset percentages for their tip.

For example, if you preset the tip values at 5%, 10%, and 15%, customers have the option to select any of these when they pay.

### Set tip configurations at various levels

**Partner level configurations**: Partners can configure tips in the Partner Portal.

To set tips configurations at the other levels, partners can use the following APIs:

-   [**Set Merchant Tips Config API**](/api/tips#Set-Merchant-Tips-Config): Configure tips for all terminals associated with a specific merchant.
-   [**Set Store Tips Config API**](/api/tips#Set-Store-Tips-Config): Configure tips for all terminals associated with a specific store.
-   [**Set Terminal Tips Config API**](/api/tipsL#Set-Terminal-Tips-Config): Configure tips for an individual terminal.

Merchants can set Merchant, Store, and Terminal level tips configurations from the Merchant Portal.

### Configuration hierarchy

When applying tips configurations across multiple levels, the terminal observes the following hierarchy: Terminal level, Store level, Merchant level, Partner level. Lower-level tips configurations are prioritized, and identical configurations at higher levels are ignored.

If a particular parameter is not configured at a lower level, the system will fetch the configuration from the next higher level in the hierarchy. This ensures that a specific setting is always applied, whether it's defined at the Terminal, Store, Merchant, or Partner level.

### Example 1: Lower-level tips configuration overrides higher-level configuration

| **Level**      | **Tips configuration** |
| -------------- | ---------------------- |
| Partner level  | Enabled                |
| Merchant Level | Disabled               |
| Store level    | Enabled                |
| Terminal level | Enabled                |
| Final result   | Enabled                |

In this example, the Terminal Level tips configuration overrides the Store, Merchant, and Partner Level configurations, resulting in the final configuration of tips being enabled for the terminal.

### Example 2: Tips configuration fetched from higher levels

| **Level**       | **Tips configuration** |
| --------------- | ---------------------- |
| Partner level   | Enabled                |
| Merchant level  | -                      |
| Store level     | -                      |
| Terminals level | -                      |
| Final result    | Enabled                |

In this example, since there is no tips configuration at the Terminal, Store, and Merchant levels, the system fetches the configuration from the Partner level, resulting in the final setting of tips being enabled for the terminal.

## Fetch tips configurations

Partners can use the following APIs to get information regarding the tips configurations at various levels:

-   [**Fetch Merchant Tips Config API**](/api/tips#Fetch-Merchant-Tips-Config): To get information about the tips configuration for all the terminals associated with a specific merchant.
-   [**Fetch Store Tips Config API**](/api/tips#Fetch-Store-Tips-Config): To get information about the tips configuration for all the terminals registered to a specific store.
-   [**Fetch Terminals Tips Config API**](/api/tips#Fetch-Terminal-Tips-Config): To get information about the tips configuration set at the individual terminal level.

Merchants can get information regarding their tips configurations from the Merchant Dashboard.

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Payments', url: '/docs/payments' },{ title: 'Transactions', url: '/docs/transactions' }]" /%}
