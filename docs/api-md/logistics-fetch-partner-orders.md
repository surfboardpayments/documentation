# Fetch Partner Orders

## Overview
Retrieves all orders placed by a partner for terminals and accessories. Use this API to get the status and details of all orders under a partner.

## Prerequisites
- A valid `partnerId` is required.
- Partner must be onboarded and have access to the Logistics API.
- Authentication is required using `API-KEY` and `API-SECRET` headers.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/logistics/orders
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

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
    "API-SECRET": "YOUR_API_SECRET"
  }
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of order objects. |
| data[].orderId | string | Unique identifier for the order. |
| data[].trackingUrl | string | The tracking URL of the shipment. |
| data[].deliveryPartner | string | The partner or carrier responsible for delivering the shipment. |
| data[].status | string | Current status of the order. |
| data[].packages | array | Array of package details in the order. |
| data[].packages[].productId | string | The SurfboardProductId of the product. |
| data[].packages[].serialNumber | string | Serial number of the device. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "orderId": "8190422d77e1400428",
      "trackingUrl": "",
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
  "data": [],
  "message": "Invalid partner ID"
}
```
**Description:** The `partnerId` provided in the URL is invalid or malformed. Ensure the ID is in the correct format and exists in the system.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": [],
  "message": "Invalid API key or secret"
}
```
**Description:** The `API-KEY` or `API-SECRET` provided in the headers is incorrect or missing. Verify that the keys are valid and correctly included in the request headers.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": [],
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server while processing the request. Contact support for assistance.

## Notes
- The `trackingUrl` may be empty if the order has not yet been shipped or if tracking information is not available.
- The `serialNumber` may be empty if the device does not have a serial number.
- Possible values for `status` include: `ORDER_PLACED`, `SHIPPED`, `DELIVERED`, `ORDER_CANCELLED`. Consult the documentation for a complete list of possible statuses.

---
