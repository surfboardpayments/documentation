# Set Terminal Configurations

{% pills tabs=[
  {
    label: "Using API",
    markdocSrc: "carbon/device-management/terminal-configurations/terminal-level/api.md"
  },
  {
    label: "Using Partner Portal",
    markdocSrc: "carbon/device-management/terminal-configurations/terminal-level/partner-portal.md"
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
