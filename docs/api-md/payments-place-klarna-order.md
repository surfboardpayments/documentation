# Place Klarna Order

## Overview
Places and authorizes a Klarna order against an already-initiated Klarna payment. Use this API to exchange the Klarna SDK authorization token for a created Klarna order.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `paymentId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /payments/:paymentId/klarna/place-order
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `paymentId` | `string` | Yes | Identifier supplied in the URL path. |

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
| `paymentMethod` | `string` | Yes | Payment method that identifies the Klarna flow. Possible values: `KLARNA`. |
| `authorizationToken` | `string` | Yes | Klarna authorization token returned by the Klarna SDK after the customer authorizes. |

### Request Example
```json
{
  "paymentMethod": "KLARNA",
  "authorizationToken": "b4bd3423-24e3-4e5d-bc08-2e1e9d1d6b6c"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Identifier of the Klarna order created from the authorization token. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "orderId": "838ca7fc6d7de9770b"
  },
  "message": "Klarna order placed successfully"
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
- The `paymentId` is part of the URL path and must be a valid identifier.

---
