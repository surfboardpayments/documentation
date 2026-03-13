# Create Branding for Terminal

## Overview
Create a branding configuration for customizable pages at the terminal level. This allows customization of customer-facing pages with specific styles and assets.

## Prerequisites
- A valid `merchantId`, `storeId`, and `terminalId` are required.
- Authentication is required using API Key and Secret.
- The target terminal must exist within the specified store and merchant.
- The API key and secret must have the necessary permissions to modify terminal branding.

## Request

### HTTP Method and URL
```
PATCH /merchants/:merchantId/stores/:storeId/terminals/:terminalId/branding
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
| backgroundColor | string | No | Background color for the page. |
| brandColor | string | No | Primary brand color for your page. |
| footerColor | string | No | Footer's background color on the page. |
| accentColor | string | No | A secondary color that complements your brand color. |
| rectShape | string | No | Decides the shape of the page buttons. The available shapes are 'rounded', 'pill', and 'edgy'. |
| fontType | string | No | Font family for the customizable page. The available font types are 'sans-serif', 'serif', and 'mono'. |
| logoUrl | string | No | Logo that will be displayed on the page. |
| iconUrl | string | No | Icon that will be displayed on the page. |
| primaryCoverImage | string | No | Primary cover image that will be displayed on the page. |
| secondaryCoverImage | string | No | Secondary cover image that will be displayed on the page. |

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

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid input parameters."
}
```
**Description:** The request body contains invalid or malformed data. Verify that all parameters conform to the expected types and formats.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or Secret provided in the request headers is invalid.  Ensure you are using the correct credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Insufficient permissions to modify terminal branding."
}
```
**Description:** The API Key or Secret used does not have the necessary permissions to perform this action. Contact your administrator to update permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal not found."
}
```
**Description:** The specified `terminalId` does not exist within the given `storeId` and `merchantId`. Verify that the IDs are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:**  An unexpected error occurred on the server.  Try the request again later. If the problem persists, contact support.

## Notes
- All color values should be valid hexadecimal color codes (e.g., `#FFFFFF`).
- Image URLs should be publicly accessible.
- Providing an empty string for optional parameters will reset the corresponding branding element to its default value.
- If any image fails to load from the provided URL, a default image may be displayed instead.

---
