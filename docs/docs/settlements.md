# Settlements

Settlement is the process by which funds from transactions are transferred to the merchant's bank account. All settlements are made in the settlement [**currency**](/docs/curriencies) set as part of the onboarding, regardless of the currency used by the customer for the transaction. Surfboard transfers the funds, with all applicable fees and charges deducted once the card networks confirm processing of the transactions and their associated fee.

## Settlement process

Before transactions can be settled to the merchant's bank account, there are certain prerequisites that must be met:

-   [**Onboarding**](/guides/in-store-payments/create-merchant-and-store-setup/home) of the merchant must be completed.
-   Merchant's bank account must be fully activated, allowing for the settlement of transactions.

## Settlement timeline

Transactions are automatically settled to the bank account merchant provided during onboarding. Transactions are usually settled the next business day after the transaction is performed (T+1 days), with a cut-off time of 23:59 CET. It might take two business days for the funds to the merchant's account (T+2).

Here's an example of when funds will reach the merchant's account.

| **A transaction performed on a** | **Settlement initiated by Surfboard on** | **Amount will reach merchant's account during** |
| -------------------------------- | ---------------------------------------- | ----------------------------------------------- |
| Monday                           | Tuesday afternoon                        | Wednesday morning                               |
| Tuesday                          | Wednesday afternoon                      | Thursday morning                                |
| Wednesday                        | Thursday afternoon                       | Friday morning                                  |
| Thursday                         | Friday afternoon                         | Monday morning                                  |
| Friday                           | Monday morning                           | Monday afternoon                                |
| Saturday                         | Monday morning                           | Monday afternoon                                |
| Sunday                           | Monday afternoon                         | Tuesday morning                                 |

## Settlement fees

The fees associated with merchant's settlements are determined by the billing plan you have chosen. These costs may include transaction fees, processing charges, and any additional fees specified in your subscription plan. The specific rates and fees will vary depending on the details of your selected plan.

To ensure a clear understanding of the commissions and fees associated with you merchant's settlements, please refer to the terms and conditions of your billing plan. This information can be found in your account settings or in the contract documentation provided at the time of your subscription.

## Reporting

Settlement reports offer a comprehensive breakdown of all transactions received by Surfboard and settled to the merchant's bank account. Daily settlement reports covering the prior day's transactions are sent to the merchant's registered email address as part of the settlement run along with payout information.

Utilizing the unique payment reference found in the bank statement allows the merchants to associate each settlement report with a specific payout. This helps in the process of settlement reconciliation.

A Settlement report will have the following information:

-   **Customer Information:** This section of the settlement report includes details about the customer, merchant ID, Settlement currency.
-   **Payout information:** This section of the settlement report contains daily settlement summary, such as the reference number, time of the payout, fees and deductions, payout amount, and pending liabilities.
-   **Transaction list:** This section of the settlement report provides a detailed list of all transactions included in the settlement, including the transaction reference, amount, card brand, commission, and payout amount.
-   **Charges:** This section of the settlement report provides a detailed list of all charges such as previous liability, subscription fees, hardware costs or dispute charges listed. The charges part of the report is only present if there is any charge in that settlement run.

## Failed settlements and disputes

In case of failed settlements or any disputes related to settlements, please contact us at [**support@surfboardpayments.com**](mailto:support@surfboardpayments.com).

{% docfooter relatedLinks="[{ title: 'Transactions', url: '/docs/transactions' },{ title: 'Payments', url: '/docs/payments' },{ title: 'Reporting', url: '/docs/reporting' }]" /%}
