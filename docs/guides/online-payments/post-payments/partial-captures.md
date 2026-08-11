# Partial captures

Partial capture allows merchants to capture a portion of the authorized payment amount instead of the full amount. This feature is particularly useful in scenarios where the final payment amount is uncertain at the time of authorization, such as in hotel bookings, car rentals, or online marketplaces.

### Enabling Partial Capture

When you authorise a payment, you can later decide to capture only a part of the authorised amount. This is done by specifying the capture amount in your capture request.

### Capturing a Partial Payment

To perform a partial capture, use the [**Capture Payment API**](/api/payments#Capture-Payment) and specify the amount you want to capture in the amount parameter. The amount parameter determines the amount to be captured setting the final authorized amount to the specified amount and initiates the capture on the payment. Any remaining authorized amount can be captured later if needed. This is only valid if the authMode was set to PRE-AUTH.

Example request to capture a partial payment:

### Considerations

-   **Multiple Captures:** You can perform multiple partial captures until the total authorized amount is fully captured. Each capture must be less than or equal to the remaining authorized amount.
-   **Authorization Expiry:** Be mindful of the authorization expiry period. If the authorization expires, you cannot capture the remaining amount.
-   **Fees:** Partial captures might incur additional processing fees.

By using partial capture, you gain flexibility in managing payments, ensuring you only capture the necessary funds while keeping the rest of the authorization available for future use.
