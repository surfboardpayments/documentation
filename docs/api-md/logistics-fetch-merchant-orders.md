# Fetch Merchant Orders

## Overview
Retrieves all orders placed for a specific merchant. Use this API to get the status and details of all orders for a particular merchant.

## Prerequisites
- Partner must be authenticated.
- A valid `merchantId` is required to identify the specific merchant.
- Partner must have access to the Logistics API.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/logistics/orders
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

### Request Example
```json
// No request body required for GET requests
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | array | Array of order objects for the merchant. |
| data.orderId | string | Unique identifier for the order. |
| data.trackingUrl | string | The tracking URL of the shipment. |
| data.status | string | Current status of the order. |
| data.deliveryPartner | string | The partner or carrier responsible for delivering the shipment. |
| data.packages | array | Array of package details in the order. |
| data.packages.productId | string | The SurfboardProductId of the product. |
| data.packages.serialNumber | string | Serial number of the device. |
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
*No error responses are explicitly defined in the provided data.  However, common errors associated with API usage are included below*

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:**  The request was malformed or missing required parameters. Verify the `merchantId` is correctly formatted and that all required headers are present.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized."
}
```
**Description:**  The provided API Key or Secret is invalid or missing. Ensure you are using the correct API credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden."
}
```
**Description:** The merchant does not have access or permissions to use this endpoint. Ensure that the API Key has access to the required resources.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:** The provided `merchantId` does not exist or is invalid. Verify that the `merchantId` is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error."
}
```
**Description:** An unexpected error occurred on the server.  Try the request again later.  If the error persists, contact support.

## Notes
- The `trackingUrl` field may be empty if tracking information is not available.
- The `serialNumber` field may be empty if the device does not have a serial number or it is not available.
- Make sure to handle potential errors and implement appropriate error handling in your application.

---
