# Update Merchant Configuration

## Overview
Update the merchant's operational configuration, such as terminal display options, settlement behavior, and the default receipt template. Only the fields you send are updated.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/configuration
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `showTodaySalesAggregate` | `boolean` | No | Show today's aggregated sales total on the merchant's terminals. |
| `showProductCatalogue` | `boolean` | No | Show the product catalog on the terminal. |
| `showExitButton` | `boolean` | No | Show the exit button on the terminal payment app. |
| `showTransactions` | `boolean` | No | Show the transaction history on the terminal. |
| `settlementFrequency` | `string` | No | How often the merchant is settled. Possible values: `DAILY`, `WEEKLY`, `MONTHLY`. |
| `grossSettlement` | `boolean` | No | Settle gross amounts, with fees invoiced separately, instead of net settlement. |
| `enableProductCreation` | `boolean` | No | Allow the merchant to create products from the terminal. |
| `terminalReceiptTemplateId` | `string` | No | Identifier of the receipt template to use on the merchant terminals. |

### Request Example
```json
{
  "showTodaySalesAggregate": true,
  "showProductCatalogue": false,
  "settlementFrequency": "DAILY",
  "grossSettlement": false
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request 'SUCCESS' \| 'ERROR'. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Configurations added successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to add configurations"
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

---
