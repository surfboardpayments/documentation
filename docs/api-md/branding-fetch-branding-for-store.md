# Fetch Branding for Store

## Overview
Fetch existing branding configuration at store level.

## Prerequisites
- A valid `merchantId` and `storeId` are required to identify the store for which branding is being fetched.
- Authentication is required using API Key and API Secret.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/stores/:storeId/branding
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | `application/json` | No |
| API-KEY | `YOUR_API_KEY` | Yes |
| API-SECRET | `YOUR_API_SECRET` | Yes |
| MERCHANT-ID | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

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
| data | object | Response data |
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
  "message": "Invalid request parameters."
}
```
**Description:** This error occurs if the request parameters (e.g., `merchantId`, `storeId`) are invalid or missing. Ensure all required parameters are provided in the correct format.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret"
}
```
**Description:** This error occurs when the API Key or API Secret provided in the headers are invalid or missing. Verify the correctness of API Key and Secret.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Branding not found for the specified store."
}
```
**Description:** This error occurs when no branding configuration exists for the given `merchantId` and `storeId`. Ensure that the store ID is valid and branding has been configured for that store.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** This error indicates a problem on the server side. If this occurs, try the request again later. If the problem persists, contact support.

## Notes
- The `logoUrl`, `iconUrl`, `primaryCoverImage`, and `secondaryCoverImage` parameters should be valid URLs pointing to the respective images.
- The `rectShape` parameter can take values `rounded`, `pill`, or `edgy`.
- The `fontType` parameter can take values `sans-serif`, `serif`, or `mono`.
---
