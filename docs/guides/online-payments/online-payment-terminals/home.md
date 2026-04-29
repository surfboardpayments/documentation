---
title: "Online Payment Terminals"
description: "Overview of Surfboard's online payment terminal options and how to choose the right one for your business."
category: "Online Payments"
path: "/guides/online-payments/online-payment-terminals/home.md"
---
{% header title="Online Payment Terminals" /%}

Surfboard Payments offers multiple types of online payment terminals to suit different business needs. Each terminal type is designed for specific use cases and provides unique features to help you integrate payment acceptance seamlessly into your online platform.

## Types of Online Payment Terminals

### 1. Payment Page
 
A fully hosted payment page by Surfboard. Customers are redirected to a secure Surfboard page to complete their payment.

**Use Cases:**  
- Merchants who want a quick and secure way to accept payments without handling sensitive card data.
- Businesses looking to minimize PCI DSS compliance requirements.
- Suitable for e-commerce stores, donation sites, and event registrations.

**Features:**  
- Customizable branding (logo, colors, etc.).
- Supports multiple payment methods (cards, wallets, etc.).
- Automatic updates and compliance handled by Surfboard.
- Built-in fraud prevention and 3D Secure support.


### 2. Online SDK (Self-Hosted Page)
 
A JavaScript SDK that allows you to embed payment forms directly into your website or web application, providing maximum control over the checkout experience.

**Use Cases:**  
- Merchants who want to fully customize the payment UI and user journey.
- Businesses with complex checkout flows or custom requirements.
- Ideal for web-shops, SaaS platforms, and marketplaces.

**Features:**  
- Complete control over the look and feel of the user payment experience.
- Real-time validation and error handling.
- Supports multiple payment methods and currencies.

### 3. Merchant Initiated Transactions (MIT)

Enables merchants to initiate payments on behalf of customers, typically for recurring billing, subscriptions, or delayed charges.

**Use Cases:**  
- Subscription services (SaaS, memberships, etc.).
- Businesses needing to charge customers after service delivery (e.g., hotel check-out, car rentals).
- Any scenario where the customer is not present for subsequent payments.

**Features:**  
- Requires initial customer authentication via Payment Page or Online SDK.
- Secure storage of payment credentials for future use.
- Compliant with card network rules for recurring and MIT transactions.
- Reduces friction for repeat customers.

## Choosing the Right Terminal

- **Payment Page:** Easiest to implement, best for fast go-live and minimal compliance.
- **Online SDK:** Best for custom checkout experiences and advanced integrations.
- **Merchant Initiated:** Essential for subscriptions and recurring billing, requires initial customer authentication.

For detailed integration guides, see the links below:

{% buttonlist items=[
  { label: "Payment Page", link: "/guides/online-payments/online-payment-terminals/payment-page" },
  { label: "Online SDK", link: "/guides/online-payments/online-payment-terminals/online-sdk-guide" },
  { label: "Merchant Initiated Transactions", link: "/guides/online-payments/online-payment-terminals/merchant-initiated-transactions" }
] /%}