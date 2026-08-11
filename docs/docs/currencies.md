# Currencies

Currencies play an important role in charging customers, processing payments, and settling funds. In the payment process, three types of currency come into play:

-   **Card Currency:** The currency used by the customer's debit/credit card for the payment.
-   **Transaction Currency:** The currency in which the goods or services are priced and sold.
-   **Settlement Currency:** The currency used for financial settlements between merchants and the acquiring bank.

## Processing currencies

We support multiple currencies, allowing merchants to update their currency in addition to the default currency, which make easy for customers to accept payouts. Generally, we mandate merchants to use the same currency for both transactions and settlements to minimize conversion fees. If the transaction currency differs from the settlement currency, Surfboard will handle the currency conversion.

## Supported transaction currencies

When submitting amounts to the [**Surfboard APIs**](/guides/integrations/api), it is required to use the **minor units** of the currency. For most currencies, the minor unit has two decimals, which means that the amount submitted should be multiplied by 100.

For example, SEK has two decimals. Therefore, to submit an amount of 10 SEK, the value should be multiplied by 100 to obtain the minor units, so the amount submitted should be 1000.

> _Surfboard imposes a minimum transaction amount of 3 SEK and a maximum amount of 499,999 SEK for each transaction._

Merchants can accept payments in the following list of currencies:

| **Currency**  | **Currency Code** | **Currency Number** | **Minor Units** |
| ------------- | ----------------- | ------------------- | --------------- |
| Danish krone  | DKK               | 208                 | 2               |
| Euro          | EUR               | 978                 | 2               |
| Swedish krona | SEK               | 752                 | 2               |

> _Surfboard uses [**ISO 4217**](https://www.iso.org/iso-4217-currency-codes.html) currency codes to identify currencies in API requests._

{% docfooter relatedLinks="[{ title: 'Payments', url: '/docs/payments' },{ title: 'Transactions', url: '/docs/transactions' },{ title: 'Settlements', url: '/docs/settlements' }]" /%}
