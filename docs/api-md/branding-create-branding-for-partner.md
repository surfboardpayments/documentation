# Create Branding for Partner

## Overview
Create a branding configuration for customizable pages at partner level.

## Prerequisites
- Partner ID is required to identify the partner for whom the branding is being configured.
- Authentication is required using API Key and API Secret.
- The partner must exist in the system.

## Request

### HTTP Method and URL
```
PATCH /partners/:partnerId/branding
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | `application/json` | Yes |
| API-KEY | `YOUR_API_KEY` | Yes |
| API-SECRET | `YOUR_API_SECRET` | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| backgroundColor | string | No | Background color for the page. |
| brandColor | string | No | Primary brand color for your page. |
| footerColor | string | No | Footer's background color on the page. |
| accentColor | string | No | This a secondary color that compliments your brand color. |
| rectShape | string | No | Decides the shape of the page buttons. The available shapes are 'rounded','pill' and 'edgy'. |
| fontType | string | No | Font family for the customizable page. The available font types are 'sans-serif','serif' and 'mono'. |
| logoUrl | string | No | Logo that will be displayed on the page. |
| iconUrl | string | No | Icon that will be displayed on the page. |
| primaryCoverImage | string | No | Primary cover image that will be displayed on the page. |
| secondaryCoverImage | string | No | Secondary cover image that will be displayed on the page. |

### Request Example
```json
{
    "backgroundColor":"#667085",
    "brandColor":"#697085",
    "accentColor":"#787085",
    "rectShape":"rounded",
    "fontType":"sans-serif",
    "logoUrl":"https://res.cloudinary.com/image/surfboard-icon.svg",
    "iconUrl":"https://res.cloudinary.com/image/surfboard-icon.svg",
    "footerColor":"#CD5C5B",
    "primaryCoverImage":"https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6",
    "secondaryCoverImage":"https://images.app.goo.gl/PxBcTVm4Q1xJFhCn6"
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
  "message": "Invalid request format."
}
```
**Description:** The request body is not a valid JSON or is missing required fields.  Review the request body and ensure it conforms to the expected schema.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The provided API Key or Secret is incorrect or missing. Ensure that the API Key and Secret are correctly configured in the request headers.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner not found."
}
```
**Description:** The specified partner ID does not exist in the system. Verify that the `partnerId` in the URL path is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:**  An internal server error occurred during processing. Check the server logs for more details and retry the request later. If the issue persists, contact support.

## Notes
- The `partnerId` path parameter is crucial for identifying the partner.  Ensure its accuracy.
- If a branding property is not provided in the request, the existing branding configuration for that property will remain unchanged.
- All color values should be in hex format (e.g., "#RRGGBB").

---
