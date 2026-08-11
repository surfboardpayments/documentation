# Generate Branding with AI for Partner

## Overview
Generate ready-to-use branding suggestions for a partner from a website. Supply the URL of a site and Surfboard analyzes it to propose one or more complete branding options — colors, button shape, font, logo and icon — that you can apply to a partner, merchant, store, or terminal.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/ai/branding
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
| `url` | `string` | No | Website address to derive branding suggestions from, for example the partner's marketing site. When omitted, an empty URL is used and generic suggestions are returned. |

### Request Example
```json
{
  "url": "https://www.surfboard.se"
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The generated branding suggestions. |
| &nbsp;&nbsp;&nbsp;&nbsp;`brandingOptions` | `array` | The suggested branding configurations. Each entry is a complete set of branding values you can apply. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`backgroundColor` | `string` | Suggested background color for the page, as a hex color code. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`brandColor` | `string` | Suggested primary brand color, as a hex color code. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`accentColor` | `string` | Suggested secondary color that complements the brand color, as a hex color code. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`rectShape` | `string` | Suggested shape for the page buttons. Possible values: `ROUNDED`, `PILL`, `EDGY`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fontType` | `string` | Suggested font family for the page. Possible values: `serif`, `sans-serif`, `mono`. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`logoUrl` | `string` | URL of the suggested logo to display on the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`iconUrl` | `string` | URL of the suggested icon to display on the page. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`footerColor` | `string` | Suggested footer background color, as a hex color code. |
| &nbsp;&nbsp;&nbsp;&nbsp;`metadata` | `object` | Details about the generation run. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`inputTokens` | `number` | Number of input tokens consumed to generate the suggestions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`outputTokens` | `number` | Number of output tokens produced while generating the suggestions. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`outputType` | `string` | The kind of output that was generated. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "brandingOptions": [
      {
        "backgroundColor": "#F5F5F5",
        "brandColor": "#0E44E1",
        "accentColor": "#F08080",
        "rectShape": "ROUNDED",
        "fontType": "sans-serif",
        "logoUrl": "https://res.cloudinary.com/image/surfboard-logo.svg",
        "iconUrl": "https://res.cloudinary.com/image/surfboard-icon.svg",
        "footerColor": "#CD5C5B"
      }
    ],
    "metadata": {
      "inputTokens": 1024,
      "outputTokens": 256,
      "outputType": "json"
    }
  },
  "message": "Branding generated successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to generate branding"
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
