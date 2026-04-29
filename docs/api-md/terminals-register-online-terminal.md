# Register Online Terminal

## Overview
Register a terminal with an online store to start accepting online payments using this API.

## Prerequisites
- A merchant account must be created.
- A store must be created under the merchant account.
- Authentication is required using API-KEY and API-SECRET.
- The MERCHANT-ID must be included in the header.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/stores/:storeId/online-terminals
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| onlineTerminalMode | string | Yes | Online payments can be carried out using any of these following modes: PaymentPage, SelfHostedPage, or MerchantInitiated. <br> - **PaymentPage**: In this mode, the payment page and all associated configuration is managed by Surfboard. This is the simplest mode to integrate as all that is required as an integrating partner is to redirect the customer to the payment page. The payment page needs to be the top level frame in any given context. <br> - **SelfHostedPage**: With SelfHostedPage, Surfboard renders the fields in your page. This provides you with maximum customization as to render the layout any way you want. <br> - **MerchantInitiated**: Set this type if you want to accept Merchant Initiated Transactions (MIT). |

### Request Example
```json
{
  "onlineTerminalMode": "PaymentPage"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | String | Status of the terminal registration. |
| data | object | Response data. |
| data.terminalId | String | Terminal ID of the registered terminal. |
| data.publicKey | String | For SelfHostedPage terminals use this key to initialize your Online SDK. |
| data.registrationStatus | string | Represents the current status of the terminal. The possible values are: REGISTERED, DEREGISTERED, FAILED. <br> - **REGISTERED**: The terminal has been successfully registered. <br> - **DEREGISTERED**: The terminal was previously registered but has now been removed from the system. <br> - **FAILED**: The registration was unsuccessful. |
| message | string | A message that describes the status of the terminal registration. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "813ca2cb12ce400405"
  },
  "message": "Terminal registered successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "FAILED",
  "message": "Invalid onlineTerminalMode value"
}
```
**Description:** The `onlineTerminalMode` value is not one of the allowed values (PaymentPage, SelfHostedPage, MerchantInitiated). Ensure you are sending a valid `onlineTerminalMode`.

## Notes
- Ensure that the `merchantId` and `storeId` in the URL path are valid and correspond to an existing merchant and store.
- The `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are case-sensitive and must be included in every request.

---
