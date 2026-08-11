# Set Store Tips Config

## Overview
Sets the store-level tips configuration applied to every terminal registered to the store. Use this API to apply the same tips configuration across every terminal associated with a store.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.
- The resource identified by `storeId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/stores/:storeId/tips
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |
| `storeId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `tipConfig` | `string` | No | Specifies how tips are managed during the payment. Possible values: `ENABLED`, `DISABLED`, `OTHER_AMOUNT`. |
| `tipLevel1` | `number` | No | The first preset tip option shown to the customer, interpreted as a percentage or a fixed amount according to tipDisplayFormat. |
| `tipLevel2` | `number` | No | The second preset tip option shown to the customer, interpreted as a percentage or a fixed amount according to tipDisplayFormat. |
| `tipLevel3` | `number` | No | The third preset tip option shown to the customer, interpreted as a percentage or a fixed amount according to tipDisplayFormat. |
| `defaultCustomAmount` | `number` | No | The value pre-filled on the screen for the custom tip amount. |
| `displayCalculatedAmount` | `string` | No | Specifies whether the calculated tip amount is shown on screen. Possible values: `ENABLED`, `DISABLED`. |
| `tipDisplayFormat` | `string` | No | The format in which the preset tip levels are displayed. Possible values: `PERCENTAGE`, `AMOUNT`. |
| `maxCustomTipAmount` | `number` | No | The maximum tip amount a customer can enter for a custom tip. |
| `freeAmountEnabled` | `boolean` | No | Only meaningful when tipConfig is ENABLED: setting it to true switches the configuration to OTHER_AMOUNT, letting the customer enter a custom tip amount on the tips screen. It has no effect when tipConfig is DISABLED and is not stored as an independent field (equivalent to sending tipConfig: OTHER_AMOUNT). |

### Request Example
```json
{
  "tipConfig": "ENABLED",
  "tipLevel1": 10,
  "tipLevel2": 20,
  "tipLevel3": 30,
  "defaultCustomAmount": 25,
  "displayCalculatedAmount": "ENABLED",
  "tipDisplayFormat": "PERCENTAGE",
  "maxCustomTipAmount": 100,
  "freeAmountEnabled": true
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "STORE config updated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

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

---
