# Update Promotion

## Overview
The Update Promotion API allows users to modify existing marketing promotions by updating attributes.

## Prerequisites
- API Key and Secret are required for authentication.
- Merchant ID is required to identify the merchant updating the promotion.
- Valid Merchant and Store IDs are needed for the URL path.
- A valid `promotionId` is required in the URL path to specify the promotion to be updated.

## Request

### HTTP Method and URL
```
PUT /merchants/:mId/stores/:sId/promotions/:promotionId
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| merchantId | string | No | The unique identifier for the merchant updating the promotion. |
| title | string | No | The title of the promotional campaign. |
| name | string | No | The name of the promotional campaign. |
| description | string | No | A brief description of the promotion. |
| assetUrl | string | No | URL of the promotion image. |
| assetOpacity | string | No | Opacity level of the promotional asset, ranging from 0 (fully transparent) to 1 (fully opaque). |
| backgroundColor | string | No | Background color for the promotion, in hex format. |
| contentTextColor | string | No | Text color for the promotional content, in hex format. |
| endProductUrl | string | No | URL of the product linked to the promotion. |
| endProduct | string | No | Product ID associated with the promotion. |
| buttonLabel | string | No | The label for the action button in the promotion. |
| priority | string | No | The priority of the promotion, where lower numbers indicate higher priority. |
| campaignType | string | No | The type of promotion, such as 'RECEIPT_BIG' or 'RECEIPT_SMALL'. |
| startDate | string | No | The start date of the promotion in 'MM-DD-YYYY' format. |
| endDate | string | No | The end date of the promotion in 'MM-DD-YYYY' format. |

### Request Example
```json
{
  "merchantId": "12345",
  "title": "Summer Sale",
  "name": "Summer 2024",
  "description": "Huge discounts on selected items!",
  "assetUrl": "https://example.com/summer_sale.jpg",
  "assetOpacity": "0.8",
  "backgroundColor": "#FFFFFF",
  "contentTextColor": "#000000",
  "endProductUrl": "https://example.com/product/123",
  "endProduct": "123",
  "buttonLabel": "Shop Now",
  "priority": "1",
  "campaignType": "RECEIPT_BIG",
  "startDate": "06-01-2024",
  "endDate": "08-31-2024"
}
```

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
	"message": "Promotion Updated Successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid input data."
}
```
**Description:** The request body contains invalid data. Ensure all fields are of the correct type and format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers is invalid. Verify your credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant not authorized to update this promotion."
}
```
**Description:** The merchant associated with the request is not authorized to update the specified promotion.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Promotion not found."
}
```
**Description:** The promotion with the provided ID does not exist. Verify the `promotionId` in the URL.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Try again later. If the problem persists, contact support.

## Notes
- The endpoint is marked as `comingSoon`: `true` which implies that the endpoint might not be available for use.
- All parameters are optional. Only include the parameters you want to update.
- The date format for `startDate` and `endDate` is MM-DD-YYYY.
---
