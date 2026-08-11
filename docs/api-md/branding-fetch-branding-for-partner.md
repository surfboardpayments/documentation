# Fetch Branding for Partner

## Overview
Fetch existing branding configuration at partner level.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/branding
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

This endpoint does not take a request body.

### Request Example
```text
GET /partners/:partnerId/branding
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`backgroundColor` | `string` | Background color for the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`brandColor` | `string` | Primary brand color for your page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`footerColor` | `string` | Footer's background color on the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`accentColor` | `string` | This is a secondary color that complements your brand color. |
| &nbsp;&nbsp;&nbsp;&nbsp;`rectShape` | `string` | Decides the shape of the page buttons. The available shapes are 'ROUNDED', 'PILL' and 'EDGY'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`fontType` | `string` | Font family for the customizable page. The available font types are 'sans-serif','serif' and 'mono'. |
| &nbsp;&nbsp;&nbsp;&nbsp;`logoUrl` | `string` | Logo that will be displayed on the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`iconUrl` | `string` | Icon that will be displayed on the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`primaryCoverImage` | `string` | Primary cover image that will be displayed on the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;`secondaryCoverImage` | `string` | Secondary cover image that will be displayed on the page. |
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
  "message": "Invalid request parameters."
}
```
**Description:** The request parameters are malformed. Check the URL path and query parameters against the documented schema and ensure all mandatory fields are present and of the correct type.

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
