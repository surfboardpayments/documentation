# Ship Terminals in Bulk

## Overview
Creates bulk shipment orders for terminals and other accessories to partners. Use this API to initiate orders to ship multiple terminals and accessories in bulk.

## Prerequisites
- Partner account with Surfboard.
- Valid `partnerId` is required in the URL path.
- Authentication via API key and secret is required.
- Products must be pre-approved and exist in the Surfboard product catalog.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/logistics/orders
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `shippingAddress` | object | Yes | Shipping address for the bulk order. |
| `shippingAddress.name` | string | Yes | Full name of the receiver for the shipment. |
| `shippingAddress.addressLine1` | string | Yes | The first line of the receiver's address. |
| `shippingAddress.addressLine2` | string | No | The second line of the receiver's address. |
| `shippingAddress.addressLine3` | string | No | The third line of the receiver's address. |
| `shippingAddress.city` | string | Yes | City of the receiver. |
| `shippingAddress.countryCode` | string | Yes | Two-letter ISO country code of the receiver, in uppercase. |
| `shippingAddress.postalCode` | string | Yes | Postal code of the receiver. |
| `shippingAddress.phoneNumber` | object | No | Contact number of the receiver in code and number format. |
| `shippingAddress.phoneNumber.code` | string | Yes | International dialing code identifying the country or region. |
| `shippingAddress.phoneNumber.number` | string | Yes | Phone number. |
| `shippingAddress.email` | string | No | Email address of the receiver. |
| `shippingAddress.deliveryInstruction` | string | No | Delivery instructions for the carrier. |
| `lineItems` | array | Yes | An array of products to be shipped in bulk. |
| `lineItems[].productId` | string | Yes | The SurfboardProductId of the product or group of products. |
| `lineItems[].quantity` | number | Yes | Number of products or group of products to be shipped. |
| `lineItems[].billingPlanId` | string | No | Optional billing plan for the product or group of products chosen. |
| `lineItems[].replacementFor` | string | No | If this line item is placed as part of a replacement for an existing device, then the terminalId of the original device needs to be specified. |

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
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | object | Response data. |
| `data.orderId` | string | Order ID for the bulk order. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "orderId": "83992e47b219100f28"
  },
  "message": "Return request created successfully"
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
**Description:** The request body is malformed or missing required fields.  Double-check the request body against the schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The provided API Key or Secret are incorrect or missing. Verify that the correct credentials are being passed in the request headers.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Partner does not have permissions to create orders."
}
```
**Description:** The partner account does not have the necessary permissions to create bulk shipment orders. Contact Surfboard support to request the required permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner ID not found."
}
```
**Description:** The `partnerId` specified in the URL path does not exist.  Ensure that the provided `partnerId` is valid.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred during the processing of the request.  Contact Surfboard support with the request details to investigate the issue.

## Notes
- The `productId` values must correspond to existing products in the Surfboard catalog.
- Ensure the `countryCode` is a valid two-letter ISO code in uppercase.
- Providing `deliveryInstruction` can help the carrier with specific delivery requirements.

---
