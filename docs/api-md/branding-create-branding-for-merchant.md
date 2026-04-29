# Create Branding for Merchant

## Overview
Create a branding configuration for customizable pages at the merchant level.

## Prerequisites
- Merchant ID is required to identify the merchant.
- API Key and API Secret are required for authentication.
- The merchant must exist in the system.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/branding
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
(None)

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| backgroundColor | string | No | Background color for the page. |
| brandColor | string | No | Primary brand color for your page. |
| footerColor | string | No | Footer's background color on the page. |
| accentColor | string | No | This is a secondary color that compliments your brand color. |
| rectShape | string | No | Decides the shape of the page buttons. The available shapes are 'rounded', 'pill', and 'edgy'. |
| fontType | string | No | Font family for the customizable page. The available font types are 'sans-serif', 'serif', and 'mono'. |
| logoUrl | string | No | Logo that will be displayed on the page. |
| iconUrl | string | No | Icon that will be displayed on the page. |
| primaryCoverImage | string | No | Primary cover image that will be displayed on the page. |
| secondaryCoverImage | string | No | Secondary cover image that will be displayed on the page. Coming Soon. |

### Request Example
```json
{
  "backgroundColor": "#667085",
  "brandColor": "#697085",
  "accentColor": "#787085",
  "rectShape": "rounded",
  "fontType": "sans-serif",
  "logoUrl": "https://res.cloudinary.com/image/surfboard-icon.svg",
  "iconUrl": "https://res.cloudinary.com/image/surfboard-icon.svg",
  "footerColor": "#CD5C5B",
  "primaryCoverImage": "https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6",
  "secondaryCoverImage": "https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6"
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
	"message": "Branding configuration set successfully."
}
```

## Error Responses

### Possible Errors
(None specified in the JSON)

## Notes
- The `secondaryCoverImage` parameter is marked as "coming soon".
- Ensure that the URLs provided for logo, icon, and cover images are valid and accessible.

---
