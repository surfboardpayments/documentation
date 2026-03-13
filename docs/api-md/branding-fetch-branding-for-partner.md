# Fetch Branding for Partner

## Overview
Fetch existing branding configuration at partner level.

## Prerequisites
- Partner ID is required to be passed in the URL path.
- Authentication is required via API Key and API Secret.
- A Partner must be created and exist within the Surfboard system.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/branding
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
{
    "Content-Type": "application/json",
    "API-KEY": "YOUR_API_KEY",
    "API-SECRET": "YOUR_API_SECRET"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data |
| data.backgroundColour | string | Background color for the page. |
| data.brandColor | string | Primary brand color for your page. |
| data.footerColor | string | Footer's background color on the page. |
| data.accentColor | string | This a secondary color that compliments your brand color. |
| data.rectShape | string | Decides the shape of the page buttons. The available shapes are 'roounded','pill' and 'edgy'. |
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
N/A. No error examples were provided in the source JSON. Assuming standard HTTP errors apply such as:

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
}
```
**Description:** The request was malformed or contained invalid parameters. Ensure that the partner ID is valid and all required headers are present.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** Authentication failed due to missing or incorrect API Key and/or API Secret. Check that the API Key and Secret are valid and properly configured.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner not found."
}
```
**Description:** The specified Partner ID does not exist. Verify that the Partner ID is correct and that the Partner exists within the system.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. Contact support for assistance.

## Notes
- The `partnerId` in the URL path is case-sensitive.
- Default branding configurations might apply if specific fields are not set for a partner.

---
