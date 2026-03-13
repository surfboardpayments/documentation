# Cancel an Order

## Overview
Cancels a specific order. Use this API to cancel any created order using its Order ID. However, you cannot cancel orders that are already completed.

## Prerequisites
- A valid Order ID is required.
- Orders can only be cancelled if they are not already completed.
- Authentication is required using API Key, API Secret, and Merchant ID.

## Request

### HTTP Method and URL
```
DELETE /orders/:orderId
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

This API does not use a request body.  The `orderId` is passed as part of the URL path.

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Order cancelled successfully"
}
```

## Error Responses

### Possible Errors
While specific error codes weren't provided in the initial JSON, here are some potential errors and how to handle them:

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid Order ID format."
}
```
**Description:** The provided Order ID does not match the expected format.  Ensure the Order ID is a valid string.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Order not found."
}
```
**Description:** The Order ID does not correspond to an existing order. Verify the Order ID.

#### 409 - Conflict
```json
{
  "status": "ERROR",
  "message": "Order cannot be cancelled. Order is already completed."
}
```
**Description:** The order is in a state (e.g., completed) where it cannot be cancelled.  Check the order status before attempting to cancel.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or Secret is invalid or missing. Check your credentials and make sure the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are present.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Retry the request later. If the problem persists, contact support.

## Notes
- Ensure the order ID is correctly formatted.
- You cannot cancel an order that is already completed. Check the order status before attempting to cancel it.
- This endpoint permanently cancels the order.
---
