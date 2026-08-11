In the following example, an order is created with **`orderLineLevelCalculation`** set to `true`. Each line item’s `totalItemAmount` is calculated as **(regular × quantity) - campaign + shipping**.

- **T-shirts:** (200 × 2) - 100 + 50 = 400 - 100 + 50 = **350 SEK**
- **Shorts:** (200 × 1) - 100 + 50 = 200 - 100 + 50 = **150 SEK**
- **Belt:** (200 × 2) - 100 + 50 = 400 - 100 + 50 = **350 SEK**

The **`totalOrderAmount`** is the sum of all line items:

350 + 150 + 350 = **850 SEK**.