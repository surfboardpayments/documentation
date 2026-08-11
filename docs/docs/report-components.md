# Report components

This section provides an overview of the various report components.

## 1. Transaction reports

Here is an example of a transaction report showing the transaction list.

| **Time**         | **Reference** | **Card number**    | **Amount** | **Card brand** | **Indicative Fees** |
| ---------------- | ------------- | ------------------ | ---------- | -------------- | ------------------- |
| 2023-04-09 04:07 | 309904040188  | xxx xxxx xxxx 8348 | 175.00     | Santander Visa | 0                   |

The meaning of each column is described below:

-   **Time:** This column displays the exact moment when the transaction occurred, typically displayed in hours, minutes, and seconds.
-   **Reference**: This column displays the **Retrieval Reference Number(RRN)** of the transaction. RRN is a key to uniquely identify a card transaction based on the ISO 8583 standard.
-   **Card Number**: A card number is a unique numeric identifier assigned to a payment card, such as a credit or debit card. It usually consists of 12 digits.
-   **Amount**: This column displays the total amount of transaction.
-   **Indicative Fees**: Indicative fees refer to an estimated or approximate amount of fees associated with a particular transaction. These fees are not exact figures but rather provide a general indication of the costs involved. You can use this data as a reference to understand the potential expenses that may have incurred during the transaction. Keep in mind that the actual fees may vary based on several factors such as negotiated rates, or specific terms and conditions.

## 2. Settlement reports

Here is an example of a settlement report showing the payout information and transaction list.

### i. Payout information

| **Date**         | **Reference** | **Sales** | **Refunds** | **Commission** | **Charges** | **Payout** | **Pending liability** |
| ---------------- | ------------- | --------- | ----------- | -------------- | ----------- | ---------- | --------------------- |
| 2023-04-10 10:47 | xxxxxxx       | 50 SEK    | 0 SEK       | 5 SEK          | 2 SEK       | 43 SEK     | 0 SEK                 |
| 2023-04-11 10:45 | xxxxxxx       | 20 SEK    | 10 SEK      | 5 SEK          | 15 SEK      | 0 SEK      | 10 SEK                |

The meaning of each column is described below:

-   **Date**: This column displays the date when the settlement occurred, typically displayed in DD/MM/YY format.
-   **Reference**: This column displays the unique transaction reference for the settlement. This reference number can be used to associate each settlement with the payout shown in your bank statement. This helps in the process of settlement reconciliation.
-   **Sales**: This column displays the total amount paid by the customers to you.
-   **Refunds**: This column displays the total amount you paid back to the customers.
-   **Commission**: This column displays the transaction fee charged during the settlement process, typically as a percentage of the transaction amount or a fixed charge per transaction.
-   **Charges**: This column displays the cumulative fee charged by Surfboard. It can include hardware fees, subscription fee, chargeback fees, pending liabilities etc.
-   **Payout:** This column displays the amount of money you will receive in your bank account after all deductions. Payout is calculated by subtracting the sum of Refunds, Commission, and Charges from the Sales.
-   **Pending liability**: Pending liability refers to the outstanding amount the merchant owes Surfboard. This amount is calculated when the merchant's total sales volume is lower than the sum of all deductions, such as refunds, commissions, and other charges. In such cases, the merchant is expected to cover the difference, which is reflected as a pending liability in their account. **Note**: The pending liability will be included as a charge in the subsequent settlement and will be deducted accordingly.

### ii. Transactions list

| **Time**         | **Reference** | **Card number**    | **Amount** | **Card brand** | **Commission** | **Payout** |
| ---------------- | ------------- | ------------------ | ---------- | -------------- | -------------- | ---------- |
| 2023-04-09 04:07 | 309904040188  | xxx xxxx xxxx 8348 | 175.00     | Santander Visa | 5              | 170.00     |

The meaning of each column is described below:

-   **Time:** This column displays the exact moment when the transaction occurred, typically displayed in hours, minutes, and seconds.
-   **Reference**: This column displays the **Retrieval Reference Number(RRN)** of the transaction. RRN is a key to uniquely identify a card transaction based on the ISO 8583 standard.
-   **Card Number**: A card number is a unique numeric identifier assigned to a payment card, such as a credit or debit card. It usually consists of 12 digits.
-   **Amount**: This column displays the total amount of transaction.
-   **Card brand**: This column displays the card brand used in the transaction.
-   **Commission**: This column displays the transaction fee charged, typically as a percentage of the transaction amount or a fixed charge per transaction.
-   **Payout**: This column displays the amount of money you received in your bank account from each transaction after deducting the commission.

{% docfooter relatedLinks="[{ title: 'Payments', url: '/docs/payments' },{ title: 'Settlements', url: '/docs/settlements' }]" /%}
