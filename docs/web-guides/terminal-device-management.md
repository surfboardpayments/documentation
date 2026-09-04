# Terminal & Device Management

Manage payment terminals and devices via the Surfboard API. Register in-store and online terminals, configure settings, and handle device operations.

Source: https://www.surfboardpayments.com/developers/guides/terminal-device-management
Category: in-store
Tags: In-Store, Terminal, API, Device Management, Configuration

---
## Overview

Once merchants are onboarded and stores are created, the next step is registering and managing terminals. Surfboard supports both physical in-store devices and online payment terminals. This guide covers registration, configuration, and ongoing operations like moving or rebooting terminals.

## Terminal Types

| Type | Category | Description |
|------|----------|-------------|
| **EMV** | In-Store | Traditional card-present terminals (countertop, mobile POS, kiosk) |
| **SoftPOS** | In-Store | Tap-to-pay on Android smartphones or tablets |
| **PaymentPage** | Online | Surfboard-hosted checkout page with a payment link |
| **SelfHostedPage** | Online | Surfboard renders card fields on your own web page via the Online SDK |
| **iFrame** | Online | Embedded payment frame within your site |
| **MerchantInitiated** | Online | Server-to-server payments using stored card tokens (subscriptions, recurring) |

## Registering In-Store Terminals

Register physical terminals by providing the device's registration code and the store it belongs to.

```
POST /merchants/{merchantId}/stores/{storeId}/devices
```

```json
{
  "registrationIdentifier": "250901",
  "terminalName": "Checkout 1"
}
```

The `registrationIdentifier` is a 6-digit code displayed when you power on the terminal. For SurfPad and Printer devices, use the serial number printed on the back instead.

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "trm_abc123",
    "registrationStatus": "REGISTERED"
  },
  "message": "Terminal registered successfully"
}
```

The `registrationStatus` will be either `REGISTERED` (new device) or `ALREADY_REGISTERED` (device was previously linked).

## Registering Online Terminals

Two online terminals arrive with the store. Creating an online store provisions a `PaymentPage` terminal, for payment links and hosted checkout, and a `MerchantInitiated` terminal, for backend charges against a stored token. Neither takes a registration call — fetch the store's terminals to get their IDs:

```
GET /merchants/{merchantId}/stores/{storeId}/terminals
```

The remaining modes, `SelfHostedPage` and `iFrame`, are registered per store with the mode named in the body:

```
POST /merchants/{merchantId}/stores/{storeId}/online-terminals
```

```json
{
  "onlineTerminalMode": "SelfHostedPage"
}
```

> **Note:** The default terminals exist from the moment the online store does, but no online terminal can take a payment until the store's domains are verified and the store is approved.

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "trm_xyz789",
    "publicKey": "pk_live_...",
    "registrationStatus": "REGISTERED"
  },
  "message": "Terminal registered successfully"
}
```

For `SelfHostedPage` terminals, the response includes a `publicKey` used to initialize the Online SDK on your checkout page.

## Terminal Configuration

Terminal settings follow a hierarchy: merchant-level defaults cascade down to store-level, which cascade down to terminal-level. Terminal-level settings always take precedence.

### Setting Terminal Config

```
PATCH /merchants/{merchantId}/stores/{storeId}/terminals/{terminalId}
```

```json
{
  "wifiSsid": "StoreNetwork",
  "wifiPassword": "securepass",
  "preferredNetwork": "WIFI",
  "preferredRestartTime": "03:00",
  "language": "en",
  "showReceipt": true,
  "alwaysShowMinorUnits": 1
}
```

Key configuration options:

| Parameter | Description |
|-----------|-------------|
| `preferredRestartTime` | Scheduled restart in HH:MM format (default `02:00`). Terminals restart within a 1-hour window. |
| `preferredNetwork` | `WIFI` or `GSM` |
| `language` | ISO language code: `en`, `fi`, `da`, `se` |
| `autoSleep` | Sleep timeout in seconds (battery-powered devices only) |
| `showStatusBar` | Show/hide the status bar (SurfPad only) |
| `openPosOnReboot` | `enabled` or `disabled` -- auto-launch POS after restart |
| `enableRefundLock` | Require PIN for refunds (Android terminals only) |

### Fetching Terminal Config

```
GET /merchants/{merchantId}/stores/{storeId}/terminals/{terminalId}/config
```

Returns all active configuration values for the terminal, including inherited settings from merchant and store levels.

## Device Operations

### Change Store

Move a terminal between stores under the same merchant. The terminal ID stays the same.

```
POST /terminals/change
```

```json
{
  "terminal$id": "trm_abc123",
  "storeId": "str_newstore456"
}
```

> Terminals can only be moved between stores belonging to the same merchant. To reassign across merchants, use the Move Terminal endpoint.

### Move Terminal (Cross-Merchant)

Partners who manage terminal inventory in bulk can reassign a hardware terminal to a different merchant entirely.

```
PUT /partners/{partnerId}/terminals/{terminalSerialNo}/move
```

```json
{
  "targetMerchantId": "mrc_target789"
}
```

This endpoint uses the terminal's serial number rather than its terminal ID.

### Reboot Terminal

Remotely restart a terminal for troubleshooting or to apply firmware updates.

```
POST /terminals/{terminalId}/reboot
```

```json
{}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Reboot command published successfully"
}
```

A `SUCCESS` status means the reboot command was sent. It does not guarantee the terminal has rebooted -- the device must be connected to the network and not processing another command.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Register in-store device | POST | `/merchants/{merchantId}/stores/{storeId}/devices` |
| Register online terminal | POST | `/merchants/{merchantId}/stores/{storeId}/online-terminals` |
| Set terminal config | PATCH | `/merchants/{merchantId}/stores/{storeId}/terminals/{terminalId}` |
| Fetch terminal config | GET | `/merchants/{merchantId}/stores/{storeId}/terminals/{terminalId}/config` |
| Change store | POST | `/terminals/change` |
| Move terminal | PUT | `/partners/{partnerId}/terminals/{terminalSerialNo}/move` |
| Reboot terminal | POST | `/terminals/{terminalId}/reboot` |

For full endpoint details, see the [Terminals API](https://developers.surfboardpayments.com/api/terminals) and [Stores API](https://developers.surfboardpayments.com/api/stores) reference documentation.
