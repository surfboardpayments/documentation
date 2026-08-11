# Fetch Application Signing Links

## Overview
Retrieve the signing links generated for a merchant application, so the merchant signatories and ultimate beneficial owners (UBOs) can each sign the application. Each entry includes the signer and the link to complete their signature.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.
- The resource identified by `applicationId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/applications/:applicationId/signing-links
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |
| `applicationId` | `string` | Yes | Identifier supplied in the URL path. |

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
GET /partners/:partnerId/applications/:applicationId/signing-links
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | The signing links for the application. Null when no signing sessions exist. |
| &nbsp;&nbsp;&nbsp;&nbsp;`type` | `string` | The kind of signing session, for example the signer category. |
| &nbsp;&nbsp;&nbsp;&nbsp;`linkId` | `string` | Unique identifier of the signing link. |
| &nbsp;&nbsp;&nbsp;&nbsp;`url` | `string` | The URL the signer opens to complete their signature. |
| &nbsp;&nbsp;&nbsp;&nbsp;`data` | `array` | The people associated with this signing link. Null when none are attached. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the person who needs to sign. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`emailId` | `string` | Email address of the person who needs to sign. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "type": "SIGNATORY",
      "linkId": "lnk_81409507c1a5f00110",
      "url": "https://surfkyb.com/sign/lnk_81409507c1a5f00110",
      "data": [
        {
          "name": "Jane Doe",
          "emailId": "jane.doe@surfboard.se"
        }
      ]
    }
  ],
  "message": "Decoupled session fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Failed to fetch decoupled session"
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
- The `applicationId` is part of the URL path and must be a valid identifier.

---
