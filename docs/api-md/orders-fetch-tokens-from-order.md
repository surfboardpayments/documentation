# Fetch Tokens from Order

## Overview
Fetch all tokenized card information collected for online orders.

## Prerequisites
- A valid order ID.
- Authentication is required using API Key, API Secret and Merchant ID.
- Ensure the order exists and has tokenized card information associated with it.

## Request

### HTTP Method and URL
```
GET /orders/:orderId/tokens
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
//No request body is needed for this GET request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| data | array | Response data containing an array of tokenized card details. |
| data.cardBrand | string | Denotes the brand of the card. Eg., VISA, MASTERCARD, AMEX. |
| data.cardholderName | string | Name of the card holder. |
| data.tokenId | string | Tokenized card information. |
| data.createdAt | string | Date of tokenization in ISO string format. |
| data.expiryMonth | number | Expiration month of the card. |
| data.expiryYear | number | Expiration year of the card. |
| data.truncatedPan | string | The last four digits of the PAN (Primary Account Number) from the card. |
| data.cardArt | string | Denotes the visual images of the card. Eg., VISA, MASTERCARD, AMEX. This is a base64 encoded image. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"cardBrand": "VISA",
			"cardholderName": "Tom",
			"tokenId": "822d544dc48c200308",
			"createdAt": "2024-04-25T11:22:24.845Z",
			"expiryMonth": 7,
			"expiryYear": 2026,
			"truncatedPan": "8907",
			"cardArt":"iVBORw0KGgoAAAANSUhEUgAAAUQAAA......"
		},
		{
			"cardBrand": "VISA",
			"cardholderName": "Sam",
			"tokenId": "822d544dc48c200308",
			"createdAt": "2024-04-25T11:22:24.845Z",
			"expiryMonth": 5,
			"expiryYear": 2025,
			"truncatedPan": "0987",
			"cardArt":"YAAAAAXNSR0IArs4c6QAAAARnQU1BA......"
		}
	],
	"message": "Fetched the card information."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid order ID format."
}
```
**Description:** The order ID provided in the URL path is not in a valid format. Ensure the order ID matches the expected format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key."
}
```
**Description:** The API key provided in the header is invalid. Please verify your API key and ensure it is correct. Also, check the API secret and merchant ID.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Order not found."
}
```
**Description:** The order with the provided ID does not exist. Verify the order ID and ensure it is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Please try again later. If the problem persists, contact support.

## Notes
- The `cardArt` field contains a base64 encoded image of the card. This can be decoded to display the card image.
- Ensure proper error handling is implemented to gracefully handle any potential errors.
- The `createdAt` field is in ISO 8601 format.
---
