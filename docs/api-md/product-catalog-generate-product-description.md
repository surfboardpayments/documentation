# Generate Product Description

## Overview
Generate AI-powered product descriptions based on product name, word length, and language preferences. Use this API to create compelling, professional product descriptions that enhance your product listings and improve customer engagement.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).

## Request

### HTTP Method and URL
```
POST /catalog/ai/description
```

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
| `productName` | `string` | Yes | Name of the product for which to generate the description. |
| `maxWordLength` | `number` | No | Maximum number of words for the generated description. |
| `langCode` | `string` | No | Language code for the description generation (e.g., 'en' for English). |

### Request Example
```json
{
  "productName": "Addidas Running Shoes",
  "maxWordLength": 150,
  "langCode": "en"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing the generated description. |
| &nbsp;&nbsp;&nbsp;&nbsp;`description` | `string` | AI-generated product description. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "description": "Unleash your peak performance with Adidas running shoes, meticulously engineered for speed, comfort, and endurance. Experience the revolutionary boost midsole technology that returns energy with every stride, propelling you forward effortlessly. The lightweight, breathable upper ensures optimal ventilation, keeping your feet cool and dry even during intense workouts. Designed with a precision fit, these shoes offer exceptional support and stability, reducing the risk of injury and enhancing your natural gait. Whether you're a seasoned marathoner or a casual jogger, Adidas running shoes provide the perfect blend of innovation and style. Conquer your goals and shatter your personal bests with the ultimate running companion. Step into a world of unparalleled performance and elevate your running experience with Adidas."
  },
  "message": "Description generated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to process request"
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

---
