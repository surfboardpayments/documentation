# Fetch Merchant Orders

## Overview
Retrieves all orders placed for a specific merchant. Use this API to get the status and details of all orders for a particular merchant.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/logistics/orders
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

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/logistics/orders
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Array of order objects for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`orderId` | `string` | Unique identifier for the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`trackingUrl` | `string` | The tracking URL of the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`trackingCode` | `string` | The carrier's tracking code for the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current status of the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deliveryPartner` | `string` | The partner or carrier responsible for delivering the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;`packages` | `array` | Array of package details in the order. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`productId` | `string` | The SurfboardProductId of the product. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serialNumber` | `string` | Serial number of the device. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "orderId": "8190422d77e1400428",
      "trackingUrl": "",
      "trackingCode": "",
      "status": "ORDER_CANCELLED",
      "deliveryPartner": "DHL",
      "packages": [
        {
          "productId": "817361bb0a23400701",
          "serialNumber": ""
        }
      ]
    },
    {
      "orderId": "819118d10a3d900f28",
      "trackingUrl": "",
      "trackingCode": "",
      "status": "ORDER_CANCELLED",
      "deliveryPartner": "DHL",
      "packages": [
        {
          "productId": "817361bb0a23400701",
          "serialNumber": ""
        }
      ]
    }
  ],
  "message": "Orders fetched successfully"
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

---
