# Ship Terminals in Bulk

## Overview
Creates bulk shipment orders for terminals and other accessories to partners. Use this API to initiate orders to ship multiple terminals and accessories in bulk.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/logistics/orders
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `shippingAddress` | `object` | No | Shipping address for the bulk order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Yes | Full name of the receiver for the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | The first line of the receiver's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | The second line of the receiver's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | The third line of the receiver's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City of the receiver. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Two-letter ISO country code of the receiver, in uppercase. |
| &nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Yes | Postal code of the receiver. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | No | Contact number of the receiver in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | No | Email address of the receiver. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deliveryInstruction` | `string` | No | Delivery instructions for the carrier. |
| `lineItems` | `array` | Yes | An array of products to be shipped in bulk. |
| &nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | Yes | The SurfboardProductId of the product or group of products. |
| &nbsp;&nbsp;&nbsp;&nbsp;`quantity` | `number` | Yes | Number of products or group of products to be shipped. |
| &nbsp;&nbsp;&nbsp;&nbsp;`billingPlanId` | `string` | No | Optional billing plan for the product or group of products chosen. |
| &nbsp;&nbsp;&nbsp;&nbsp;`replacementFor` | `string` | No | If this line item is placed as part of a replacement for an existing device, then the terminalId of the original device needs to be specified. |

### Request Example
```json
{
  "shippingAddress": {
    "name": "Jane Smith",
    "addressLine1": "456 Business Ave",
    "addressLine2": "Floor 2",
    "city": "Stockholm",
    "countryCode": "SE",
    "postalCode": "12345"
  },
  "lineItems": [
    {
      "productId": "81bddf38fa28380101",
      "quantity": 5,
      "billingPlanId": "BP_001",
      "replacementFor": "82674cfdf77f500001"
    }
  ]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Order ID for the bulk order. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "orderId": "83992e47b219100f28"
  },
  "message": "Bulk logistic order created successfully"
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
- The `partnerId` is part of the URL path and must be a valid identifier.

---
