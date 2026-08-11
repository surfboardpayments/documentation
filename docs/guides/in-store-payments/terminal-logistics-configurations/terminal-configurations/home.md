After a terminal is registered, you can customize its settings to fit your business needs. Configurations can be set at four hierarchical levels: **Terminal**, **Store**, **Merchant**, and **Partner APIs.**

A configuration set at a lower level (e.g., Terminal) will always override a higher-level setting (e.g., Partner). If a setting isn't configured at the Terminal, Store, or Merchant level, it will automatically inherit the default setting from the Partner level.

> All the parameters can be configured individually, eliminating the need to configure all parameters at once.

Terminal configurations can be applied at various levels 

- Using API
- Using Partner Portal

{% tabs tabs=[
  {
    label: "Using API",
    markdocSrc: "guides/in-store-payments/terminal-logistics-configurations/terminal-configurations/apii/home.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "guides/in-store-payments/terminal-logistics-configurations/terminal-configurations/partner-portal/home.md"
  }
] /%}
