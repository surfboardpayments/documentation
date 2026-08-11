# Create Branding for Partner

## Overview
Create a branding configuration for customizable pages at partner level

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PATCH /partners/:partnerId/branding
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `backgroundColor` | `string` | No | Background color for the page. |
| `brandColor` | `string` | No | Primary brand color for your page. |
| `footerColor` | `string` | No | Footer's background color on the page. |
| `accentColor` | `string` | No | This is a secondary color that complements your brand color. |
| `rectShape` | `string` | No | Decides the shape of the page buttons. The available shapes are 'ROUNDED', 'PILL' and 'EDGY'. Possible values: `ROUNDED`, `PILL`, `EDGY`. |
| `fontType` | `string` | No | Font family for the customizable page. The available font types are 'sans-serif','serif' and 'mono'. Possible values: `serif`, `sans-serif`, `mono`. |
| `logoUrl` | `string` | No | Logo that will be displayed on the page. |
| `iconUrl` | `string` | No | Icon that will be displayed on the page. |
| `primaryCoverImage` | `string` | No | Primary cover image that will be displayed on the page. |
| `secondaryCoverImage` | `string` | No | Secondary cover image that will be displayed on the page. |

### Request Example
```json
{
  "backgroundColor": "#667085",
  "brandColor": "#697085",
  "accentColor": "#787085",
  "rectShape": "ROUNDED",
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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message that describes the status of the request. |

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
  "message": "Invalid request body."
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

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Resource not found."
}
```
**Description:** The requested resource does not exist. Verify the identifiers in the request path and try again.

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
- The `partnerId` is part of the URL path and must be a valid identifier.

---
