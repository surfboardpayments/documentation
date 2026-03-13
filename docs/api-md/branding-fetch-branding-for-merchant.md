# Fetch Branding for Merchant

## Overview
Fetch existing branding configuration at merchant level.

## Prerequisites
- A valid `merchantId` is required.
- Authentication is required using API Key and Secret.
- You must have a Surfboard account with appropriate permissions.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/branding
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
*No query parameters are needed for this endpoint.*

### Request Body Parameters
*No request body parameters are needed for this endpoint.*

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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data containing the branding configuration. |
| `data.backgroundColour` | `string` | Background color for the page. |
| `data.brandColor` | `string` | Primary brand color for your page. |
| `data.footerColor` | `string` | Footer's background color on the page. |
| `data.accentColor` | `string` | This a secondary color that compliments your brand color. |
| `data.rectShape` | `string` | Decides the shape of the page buttons. The available shapes are 'rounded','pill' and 'edgy'. |
| `data.fontType` | `string` | Font family for the customizable page. The available font types are 'sans-serif','serif' and 'mono'. |
| `data.logoUrl` | `string` | Logo that will be displayed on the page. |
| `data.iconUrl` | `string` | Icon that will be displayed on the page. |
| `data.primaryCoverImage` | `string` | Primary cover image that will be displayed on the page. |
| `data.secondaryCoverImage` | `string` | Secondary cover image that will be displayed on the page. |
| `message` | `string` | A message that describes the status of the request. |

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
  "message": "Invalid merchantId provided."
}
```
**Description:** This error occurs when the `merchantId` in the URL is invalid or malformed.  Ensure the `merchantId` is a valid UUID.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** This error occurs when the `API-KEY` or `API-SECRET` in the headers are incorrect or missing. Double-check your credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Branding configuration not found for this merchant."
}
```
**Description:** This error occurs when no branding configuration has been created for the specified `merchantId`.  You may need to create a branding configuration first.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a problem on the server side.  Try the request again later. If the problem persists, contact support.

## Notes
- The `logoUrl`, `iconUrl`, `primaryCoverImage`, and `secondaryCoverImage` fields should contain valid URLs.
- The `rectShape` field can be one of the following values: `ROUNDED`, `PILL`, or `EDGY`.
- The `fontType` field can be one of the following values: `sans-serif`, `serif`, or `mono`.

---
