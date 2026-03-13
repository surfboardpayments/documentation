# Print Receipt

## Overview
Use this API to print receipts from the terminals. The `:id` in the URL supports Transaction, Payment, and Order IDs.

## Prerequisites
- A valid API Key and API Secret.
- A valid Merchant ID.
- A Surfboard terminal that is printing-enabled.
- Ensure you have the Transaction ID, Payment ID, or Order ID for which you want to print the receipt.

## Request

### HTTP Method and URL
```
PUT /receipts/:id/print
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| language | String | No | Prints the receipt in the given language. The available languages are: 'sv', 'da', 'fi', 'en'. Default is the merchant language. |
| templateId | String | No | Select from a default set of templates offered by Surfboard.  **COMING SOON**|
| terminalId | String | No | Print receipt on any printing enabled Surfboard terminal using this param. |

### Request Example
```json
{
  "language": "sv"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| message | string | A message that describes the status of the print receipt request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "PNG Receipt printed successfully."
}
```

## Error Responses

### Possible Errors

#### (Error codes and detailed error responses were not provided in the original JSON, so I am unable to include them in this documentation.)
**Description:** (Detailed descriptions for each error code were not provided in the original JSON, so I am unable to include them in this documentation.)

## Notes
The `:id` parameter in the URL can be a Transaction ID, Payment ID, or Order ID.
---
