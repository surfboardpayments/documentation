# Tips

Surfboard Payments offers robust tipping capabilities across its native Android payment terminals and CheckoutX, with flexible customization to match your brand and business needs. On hardware terminals, tip configuration is simple and allows you to define custom tip options, enabling customers to easily add a gratuity during the payment process.

## Tips Configuration

Merchants and partners can enable and customize tips at multiple levels: **Partner**, **Merchant**, **Store**, or **Terminal**. Customers can select preset tip percentages or enter custom amounts during payment.

### Configuration Options

| **Option** | **Description** |
| --- | --- |
| **Enabled** | Allows tips to be accepted during payment processing. |
| **Disabled** | Prevents tips from being accepted during payment processing. |
| **Preset Tip Values** | Up to three percentage values (e.g., 5%, 10%, 15%) for customers to choose from. |

## Tips Settings

Tip settings can be configured via **APIs** or the **Partner Portal** at different hierarchical levels: **Terminal, Store, Merchant,** and **Partner**. Lower-level settings override higher-level ones, system ensures that the specific setting is always applied. These settings apply to all in-store terminals, including SurfTouch, SurfPad, SurfPrint, and SoftPOS.

**For Example:**

1. **Lower-level configuration overrides higher-level configurations**:
    
    If a configuration is set at the **Terminal level**, it will override any settings at the **Partner**, **Merchant**, and **Store** levels.
    
2. **Configuration fetched from higher levels**:
    
    If no configuration is set at the **Terminal**, **Store**, or **Merchant** levels, the system will automatically fetch the default setting from the **Partner level**.
    

> All the parameters can be configured individually, eliminating the need to configure all parameters at once.

## Set Merchant Tips Config

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "carbon/configure-tips/merchant-level/api.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "carbon/configure-tips/merchant-level/partner-portal.md"
  },
  {
    label: "Using Merchant Portal",
    markdocSrc: "carbon/configure-tips/merchant-level/merchant-portal.md"
  }
] /%}