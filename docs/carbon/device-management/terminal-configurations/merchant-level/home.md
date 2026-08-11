# Terminal Configurations

After terminal registration, you can customize the terminal's functionalities and configurations at various hierarchical levels through our APIs and the Partner portal. This configuration settings follow a hierarchical structure across four levels: Terminal, Store, Merchant, and Partner. The system ensures that the specific setting is always applied, whether it's defined at the Terminal, Store, Merchant, or Partner level.

**For Example:**

1. Lower-level configuration overrides higher-level configurations:

If a configuration is set at the Terminal level, it will override any settings at the Partner, Merchant, and Store levels.

2. Configuration fetched from higher levels:

If no configuration is set at the Terminal, Store, or Merchant levels, the system will automatically fetch the default setting from the Partner level.

> All the parameters can be configured individually, eliminating the need to configure all parameters at once.

## Set Merchant Terminal Configurations

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "carbon/device-management/terminal-configurations/merchant-level/api.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "carbon/device-management/terminal-configurations/merchant-level/partner-portal.md"
  }
] /%}

## SurfPad

To enable specific features for SurfPad, use the following configuration 

**Request**

```json-playground
{
	"wifiSsid": "datecs_devices",
	"wifiPassword": "12345678",
	"autoSleep": 30000,
	"serialNo": "3224900115",
	"preferredNetwork":"WIFI",
	"alwaysShowMinorUnits": 1,
	"preferredRestartTime": "09:50",
	"language": "en",
	"showStatusBar": true,
	"chipReadDelay": 500,
	"autoSleepInterval": 3000
}
```
**Response**

```json
{
	"status": "SUCCESS",
	"message": "TERMINAL config updated successfully"
}
```

## SurfTouch

To enable specific features for SurfTouch, use the following configuration 

**Request**

```json-playground
{
	"serialNo": "3224900115",
	"preferredRestartTime": "08:55",
	"language": "en",
	"showReciept": true,
	"screenTimeout": 300000,
	"openPosOnReboot": "enabled"
	"receiptScreenTimeout": 300000
}
```
**Response**

```json
{
	"status": "SUCCESS",
	"message": "TERMINAL config updated successfully"
}
```
## SurfPrint

To enable specific features for SurfPrint, use the following configuration 

**Request**

```json-playground
{
	"serialNo": "3224900115",
	"preferredRestartTime": "08:55",
	"language": "en",
	"showReciept": true,
	"screenTimeout": 300000,
	"openPosOnReboot": "enabled"
	"receiptScreenTimeout": 300000
}
```
**Response**

```json
{
	"status": "SUCCESS",
	"message": "TERMINAL config updated successfully"
}
```


## SoftPOS

To enable specific features for SoftPOS, use the following configuration 

**Request**

```json-playground
{
	"language": "en",
	"showReciept": true,
	"screenTimeout": 300000,
	"openPosOnReboot": "enabled"
	"receiptScreenTimeout": 300000
}
```
**Response**

```json
{
	"status": "SUCCESS",
	"message": "TERMINAL config updated successfully"
}
```