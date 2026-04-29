# Create Shipment

## Overview
Creates a shipment order for terminals and other accessories. Use this API to initiate an order to ship terminals and other accessories to merchants.

## Prerequisites
- Partner account with Surfboard
- Partner must be onboarded and have a valid `partnerId`
- Merchant must be onboarded and have a valid `merchantId`
- Authentication via `API-KEY` and `API-SECRET` headers.
- Product IDs must be valid and available in the partner's catalog.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants/:merchantId/shipment
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| shippingAddress | object | No | Input the shipping address for the products. If no address is specified, the merchant's address will be used as the default shipping address. |
| &nbsp;&nbsp;&nbsp;&nbsp;name | string | Yes | Full name of the receiver for the shipment. |
| &nbsp;&nbsp;&nbsp;&nbsp;addressLine1 | string | Yes | The first line of the receiver's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;addressLine2 | string | No | The second line of the receiver's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;addressLine3 | string | No | The third line of the receiver's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;city | string | Yes | City of the receiver. |
| &nbsp;&nbsp;&nbsp;&nbsp;countryCode | string | Yes | Two-letter ISO country code of the receiver, in uppercase. |
| &nbsp;&nbsp;&nbsp;&nbsp;postalCode | string | Yes | Postal code of the receiver. |
| &nbsp;&nbsp;&nbsp;&nbsp;phoneNumber | object | No | Contact number of the receiver in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code | number | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number | string | Yes | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;email | string | Yes | Email address of the receiver. |
| &nbsp;&nbsp;&nbsp;&nbsp;deliveryInstruction | string | No | Delivery instructions for the carrier. |
| lineItems | array | Yes | An array of products to be shipped. |
| &nbsp;&nbsp;&nbsp;&nbsp;productId | number | Yes | The SurfboardProductId of the product or group of products. This is unique to the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;quantity | string | Yes | Number of products or group of products to be shipped. |
| &nbsp;&nbsp;&nbsp;&nbsp;billingPlanId | string | No | Optional billing plan for the product or group of products chosen. If omitted, default plan will be chosen. |
| &nbsp;&nbsp;&nbsp;&nbsp;replacementFor | string | No | If this line item is placed as part of a replacement for an existing device, then the terminalId of the original device needs to be specified. We will supply the merchant with a waybill to return the old device. They can reuse the box which the new terminal comes in. |

### Request Example
```json
{
	"shippingAddress": {
		"name": "John Doe",
		"addressLine1": "Main Street 123",
		"addressLine2": "Building C",
		"addressLine3": "Building C",
		"city": "Stockholm",
		"countryCode": "SE",
		"postalCode": "123 45",
		"phoneNumber": {
			"code": 46,
			"number": "771890089"
		},
		"email": "developer@test.se",
		"deliveryInstruction": "XXX"
	},
	"lineItems": [
		{
			"productId": "12345",
			"quantity": 1
		}
	]
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'.. |
| data | object | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;orderId | string | Order ID for the order. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"orderId": "81376ad8ebedf80310"
	},
	"message": "Order for shipping terminal successfully created"
}
```

## Error Responses

### Possible Errors
There are no error examples provided in the source JSON. Error responses will vary depending on the error.
Example error responses:

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters"
}
```
**Description:** Request parameters are invalid. Check the request body and headers.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized"
}
```
**Description:** Authentication failed. Ensure the `API-KEY` and `API-SECRET` headers are correct.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found"
}
```
**Description:** The specified merchant was not found. Verify the `merchantId` is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server. Try again later or contact support.

## Notes
- If `shippingAddress` is not provided, the merchant's default shipping address will be used.
- Ensure that the `countryCode` in the `shippingAddress` is a valid two-letter ISO country code in uppercase.
- The `productId` must be a valid Surfboard product ID associated with the partner.
- `quantity` needs to be a number, but is formatted as a string in the original JSON data.

---
