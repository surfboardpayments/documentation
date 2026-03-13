# Get Shipment Status

## Overview
Retrieves the status of the shipment order. Use this API to get the shipment status of ordered terminals and other accessories.

## Prerequisites
- Partner account with Surfboard
- Valid `partnerId` and `merchantId`
- Valid `orderId` to query
- Authentication required using `API-KEY` and `API-SECRET`

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/merchants/:merchantId/shipment/:orderId
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
N/A

### Request Example
```json
{
  "headers": {
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET",
    "MERCHANT-ID": "YOUR_MERCHANT_ID"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;orderStatus | string | Describes the status of the shipment order for terminals and accessories. The possible values are:  `ORDER_PLACED`, `ORDER_SHIPPED`, `ORDER_COMPLETED`, `ORDER_PENDING_FOR_STOCK`. |
| &nbsp;&nbsp;&nbsp;&nbsp;trackingUrl | string | The tracking url of the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;deliveryPartner | string | The partner or carrier responsible for delivering the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;packageDetails | array | Specifies information about the products included in the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;productId | string | The SurfboardProductId of the product or group of products. This is unique to the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serialNumber | string | Serial number of the device. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "orderStatus": "ORDER_PENDING_FOR_STOCK",
    "trackingUrl": "",
    "deliveryPartner": "DHL",
    "packageDetails": [
      {
        "productId": "817361bb0a23400701",
        "serialNumber": ""
      }
    ]
  },
  "message": "Order status fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs when the request parameters are invalid or missing. Verify all required parameters are present and valid.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API key or secret."
}
```
**Description:** This error indicates that the provided API key or secret is invalid. Double-check your credentials and ensure they are correctly configured.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Shipment order not found."
}
```
**Description:** This error occurs when the requested shipment order is not found. Verify that the `orderId` is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred."
}
```
**Description:** This error indicates that an internal server error occurred during the request processing. Contact Surfboard support for assistance.

## Notes
-  Ensure that the `MERCHANT-ID` header is included in the request.
-  `productId` is specific to the partner.
-  The `trackingUrl` will be empty if the order has not been shipped yet.

---
