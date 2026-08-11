When **`orderLineLevelCalculation`** is **`false`**, each line item’s **`totalItemAmount`** is calculated as **regular - campaign + shipping**:

* **T-shirts:** 100 - 100 + 50 = 50
* **Shorts:** 200 - 100 + 50 = 150
* **Belt:** 100 - 100 + 50 = 50

The **`totalOrderAmount`** is then **(50 × 2) + (150 × 1) + (50 × 2) = 350 SEK**.