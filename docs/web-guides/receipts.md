## Overview

After a payment is completed, Surfboard gives you several ways to deliver receipts to customers. You can attach cash register details for regulatory compliance, email a digital copy, retrieve a shareable link, print directly on a Surfboard terminal, or send fully custom ESC/POS commands for branded receipt output.

All receipt endpoints accept a Transaction ID, Payment ID, or Order ID as the identifier, so you can work with whichever reference suits your integration.

## Prerequisites

Before working with receipts, make sure you have:

- A Surfboard developer account with valid API credentials (`API-KEY` and `API-SECRET`)
- At least one completed transaction, payment, or order
- For printing: a registered Surfboard terminal with printing capability (SurfTouch with dock or SurfPrint)

## Adding Receipt Information

Use this endpoint to store cash register-specific details against an order. This data is used when generating receipt output and is often required for fiscal compliance in Nordic markets.

```
PUT /receipts/{orderId}
```

**Request body:**

```json
{
  "sequenceNumber": "1234567",
  "cashRegisterName": "Kassa 1",
  "controlUnitSerialNumber": "9876543",
  "cashierName": "Amanda",
  "customerName": "Tom"
}
```

**Request parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sequenceNumber` | string | Yes | Receipt sequence number from your cash register. |
| `cashRegisterName` | string | Yes | Cash register designation or name. |
| `controlUnitSerialNumber` | string | Yes | Control unit or control system manufacturing number. |
| `cashierName` | string | No | Name of the cashier handling the transaction. |
| `customerName` | string | No | Name of the customer. |

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Receipt information added successfully"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `SUCCESS` or `ERROR`. |
| `message` | string | Human-readable status message. |

## Emailing Receipts

Send a digital receipt directly to a customer's email address. This is the simplest way to deliver post-payment confirmation without any printing hardware.

```
PUT /receipts/{id}/email
```

The `{id}` path parameter accepts a Transaction ID, Payment ID, or Order ID.

**Request body:**

```json
{
  "email": "customer@example.com"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address to deliver the receipt to. |

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Receipt email sent successfully"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Status of the request. |
| `message` | string | Description of the result. |

> **Tip:** You can call this endpoint multiple times with different email addresses if the customer or merchant both need a copy.

## Fetching a Receipt Link

Retrieve a URL that points to a hosted digital receipt. This is useful when you want to display a QR code on the terminal screen, include a link in an SMS, or embed it in your own notification flow.

```
GET /receipts/{id}/link
```

The `{id}` path parameter accepts a Transaction ID, Payment ID, or Order ID.

**Request body:** None (empty `GET` request).

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "receiptURL": "https://receipts.surfboardpayments.com/r/abc123xyz"
  },
  "message": "Receipt link fetched successfully"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `SUCCESS` or `ERROR`. |
| `data.receiptURL` | string | URL to access the hosted digital receipt. |
| `message` | string | Description of the result. |

## Printing Receipts on a Terminal

Print a receipt directly from a Surfboard terminal that has printing capability. Surfboard supports printing through SurfTouch (which features a dock with a printer for checkout) and SurfPrint (which has a built-in printer for on-floor payments).

```
PUT /receipts/{id}/print
```

The `{id}` path parameter accepts a Transaction ID, Payment ID, or Order ID.

**Request body:**

```json
{
  "templateId": "default",
  "terminalId": "trm_abc123",
  "language": "sv"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `templateId` | string | No | Select from Surfboard's default set of receipt templates. |
| `terminalId` | string | No | Target a specific printing-enabled terminal. If omitted, prints on the terminal that handled the transaction. |
| `language` | string | No | Receipt language. Available: `sv`, `da`, `fi`, `en`. Defaults to the merchant's configured language. |

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Receipt print command sent successfully"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Status of the request. |
| `message` | string | Description of the result. |

> **Note:** A `SUCCESS` response means the print command was dispatched to the terminal. The terminal must be online and not processing another command for the receipt to print.

## Custom ESC/POS Printing

For full control over receipt layout and branding, send raw ESC/POS commands to a terminal's built-in printer. This lets you design completely custom receipts -- including logos, formatted tables, barcodes, and styled text -- using the industry-standard ESC/POS command set.

```
PUT /receipts/{terminalId}/escpos
```

Note that this endpoint uses the `terminalId` directly in the path, not a transaction or order ID.

**Request body:**

```json
{
  "escposCommands": "G0AbYQEbRQFTdXBlciBNYXJ0CjEyMyBNYWluIFN0ChtFABthAERhdGU6IDIwMjQvMTAvMDgKVGltZTogMTI6MDAgUE0KG0UBLS0tLS0tLS0tLQobRQAbYQBJdGVtIEE6IFdhdGVyClByaWNlOiAkMS4wMApJdGVtIEI6IEJyZWFkClByaWNlOiAkMi4wMAobRQEtLS0tLS0tLS0tClRvdGFsOiAkMy4wMAobRQAbYQFUaGFuayB5b3UhCgoKHVYA"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `escposCommands` | string | Yes | A stream of ESC/POS commands encoded as a Base64 string. |

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "ESC/POS receipt sent to terminal"
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Status of the request. |
| `message` | string | Description of the result. |

### Building ESC/POS Commands

ESC/POS is a command protocol originally developed by Epson and now supported by most thermal receipt printers. Common commands include:

| Command | Hex | Description |
|---------|-----|-------------|
| Initialize printer | `1B 40` | Reset printer to default settings. |
| Bold on | `1B 45 01` | Enable bold text. |
| Bold off | `1B 45 00` | Disable bold text. |
| Center align | `1B 61 01` | Center-align subsequent text. |
| Left align | `1B 61 00` | Left-align subsequent text. |
| Cut paper | `1D 56 00` | Full cut of the receipt paper. |

**Workflow:**

1. Compose your ESC/POS byte stream (text interspersed with control commands).
2. Encode the entire byte stream as a Base64 string.
3. Send the Base64 string in the `escposCommands` field.

> **Tip:** Most ESC/POS libraries (e.g., `escpos` for Python, `node-escpos` for Node.js) can generate the byte stream for you. Encode the output buffer to Base64 before sending it to Surfboard.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Add receipt information | PUT | `/receipts/{orderId}` |
| Email a receipt | PUT | `/receipts/{id}/email` |
| Fetch receipt link | GET | `/receipts/{id}/link` |
| Print receipt on terminal | PUT | `/receipts/{id}/print` |
| Print custom ESC/POS receipt | PUT | `/receipts/{terminalId}/escpos` |

For full endpoint details, see the [Receipts API](https://developers.surfboardpayments.com/api/receipts) reference documentation.