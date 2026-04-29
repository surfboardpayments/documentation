# Fetch Branding for Terminal

## Overview
Fetch existing branding configuration at terminal level.

## Prerequisites
- You need a valid `merchantId`, `storeId`, and `terminalId`.
- Authentication is required using `API-KEY` and `API-SECRET` headers.
- You must have an active Surfboard account with branding configured for the specified terminal.
- The merchant ID specified in the URL must match the `MERCHANT-ID` passed in the headers.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/terminals/:terminalId/branding
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*This endpoint does not use query parameters.*

### Request Body Parameters
*This endpoint does not use a request body.*

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
| data | object | Response data containing branding configurations. |
| data.backgroundColour | string | Background color for the page. |
| data.brandColor | string | Primary brand color for your page. |
| data.footerColor | string | Footer's background color on the page. |
| data.accentColor | string | This a secondary color that compliments your brand color. |
| data.rectShape | string | Decides the shape of the page buttons. The available shapes are 'rounded','pill' and 'edgy'. |
| data.fontType | string | Font family for the customizable page. The available font types are 'sans-serif','serif' and 'mono'. |
| data.logoUrl | string | Logo that will be displayed on the page. |
| data.iconUrl | string | Icon that will be displayed on the page. |
| data.primaryCoverImage | string | Primary cover image that will be displayed on the page. |
| data.secondaryCoverImage | string | Secondary cover image that will be displayed on the page. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
		"backgroundColor": "#F08080",
		"brandColor": "#0E44E1",
		"rectShape": "ROUNDED",
		"fontType": "serif",
		"accentColor": "#F08080",
		"logoUrl": "https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6",
		"iconUrl": "https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6",
		"footerColor": "#CD5C5B",
		"primaryCoverImage": "https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6",
		"secondaryCoverImage": "https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6"
	},
	"message": "Fetched Branding successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid merchantId, storeId, or terminalId"
}
```
**Description:** The `merchantId`, `storeId`, or `terminalId` provided in the URL are invalid or do not exist. Ensure that the IDs are correct and properly formatted.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret"
}
```
**Description:** The `API-KEY` or `API-SECRET` provided in the headers are incorrect or missing. Double-check the API credentials and ensure they are correctly set in the request headers.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant ID in header does not match the merchant ID in the path."
}
```
**Description:** The `MERCHANT-ID` provided in the headers does not match the `merchantId` parameter present in the URL path. Ensure that both are the same.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Branding configuration not found for this terminal"
}
```
**Description:** No branding configuration exists for the specified terminal. Ensure that branding settings have been configured for the terminal.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected server error occurred. Contact the Surfboard support team for assistance.

## Notes
- The `rectShape` parameter can only accept the values 'rounded', 'pill', or 'edgy'.
- The `fontType` parameter can only accept the values 'sans-serif', 'serif', or 'mono'.
- If a branding parameter is not set for the terminal, it will not be present in the response. The response example displays all configurable parameters.
- URL values for images (logoUrl, iconUrl, primaryCoverImage, secondaryCoverImage) should be publicly accessible URLs.

---
