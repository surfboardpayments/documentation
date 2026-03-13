---
title: "Online Terminal Registration"
description: "Guide to registering online terminals using API."
category: "Online Payments"
path: "/guides/online-payments/terminals-registration/register-api-tab.md"
---

1. You need to make a **`POST`** request to [**registerOnlineTerminal**](https://developers.surfboardpayments.com/api/terminals#Register-Online-Terminal) endpoint.
2. Specify the terminal type you are registering under **`onlineTerminalMode`**
    
    **`PaymentPage`** : Set this type if you are integrating in the Payment Page mode.
    
    **`SelfHostedPage`** : Set this type if you are integrating in the SDK mode.
    
    **`MerchantInitiated`** : Set this type if you want to accept Merchant Initiated Transactions (MIT). Eg : Subscription charges
    
3. The response will contain a **`termialId`**. Save it securely and link it to something identifiable in your system for later use.