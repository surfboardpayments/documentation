To create a new online store or update an existing physical store, you will use the **Create Store API** with additional parameters for online functionalities.

1. **Create or Update Store**: Send a `POST` request to the **`Create New Store API`** or **`Update Store API`** with the necessary parameters for online functionality.
2. **Domain Verification**: Upon creation, you will receive **domain validation keys** for both the `paymentpageURL` (if provided) and the `merchantWebshopURL`.
    - You **must** set this key as a **TXT record** on your domain server.
    - Use the **`Verify Domain API`** to initiate verification. Surfboard automatically performs checks every 6 hours.
3. **Receive Store ID**: A unique **`Store ID`** is returned on successful creation/update, which is essential for registering online terminals and subsequent store operations.
4. **Complete Onboarding**: The store enters an internal approval process. Once approved, you are authorized to register online terminals under that store.