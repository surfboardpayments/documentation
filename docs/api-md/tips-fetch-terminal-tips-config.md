# Fetch Terminal Tips Config

## Overview
Retrieves the tips configuration for an individual terminal. Use this API to get the tips configuration applied to a particular terminal.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.
- The resource identified by `terminalId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/:terminalId/tips
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |
| `terminalId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/stores/:storeId/terminals/:terminalId/tips
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tipConfig` | `string` | Specifies how tips are managed during payment. Always returned as ENABLED or DISABLED; a configuration stored as OTHER_AMOUNT is normalized to ENABLED here and surfaced separately through the freeAmountEnabled flag (which is true in that case). Possible values: `ENABLED`, `DISABLED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tipLevel1` | `number` | The first preset tip option shown to the customer, interpreted as a percentage or a fixed amount according to tipDisplayFormat. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tipLevel2` | `number` | The second preset tip option shown to the customer, interpreted as a percentage or a fixed amount according to tipDisplayFormat. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tipLevel3` | `number` | The third preset tip option shown to the customer, interpreted as a percentage or a fixed amount according to tipDisplayFormat. |
| &nbsp;&nbsp;&nbsp;&nbsp;`defaultCustomAmount` | `number` | The value pre-filled on the screen for the custom tip amount. |
| &nbsp;&nbsp;&nbsp;&nbsp;`displayCalculatedAmount` | `string` | Specifies whether the calculated tip amount is shown on screen. Possible values: `ENABLED`, `DISABLED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tipDisplayFormat` | `string` | The format in which the preset tip levels are displayed. Possible values: `PERCENTAGE`, `AMOUNT`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`freeAmountEnabled` | `boolean` | True when the stored tips configuration is OTHER_AMOUNT (the customer can enter a custom tip amount); otherwise false. Derived directly from tipConfig, so it always accompanies a normalized tipConfig of ENABLED. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "tipConfig": "ENABLED",
    "tipLevel1": 10,
    "tipLevel2": 20,
    "tipLevel3": 30,
    "defaultCustomAmount": 25,
    "displayCalculatedAmount": "ENABLED",
    "tipDisplayFormat": "PERCENTAGE",
    "freeAmountEnabled": true
  },
  "message": "terminal config queried successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized access. Please provide valid credentials to access this endpoint."
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correctly set and valid for your account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
- Authenticate with **one** of: an `API-KEY` + `API-SECRET` pair (shown above), a bearer JWT (`Authorization`), an API token (`X-Surfboard-Api-Token`), or a nonce (`X-Surfboard-Nonce`).
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.
- The `storeId` is part of the URL path and must be a valid identifier.
- The `terminalId` is part of the URL path and must be a valid identifier.

---
