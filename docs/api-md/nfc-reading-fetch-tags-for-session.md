# Fetch Tags for Session

## Overview
This API retrieves all the tags read during the specified session.

## Prerequisites
- A valid `terminalId` is required in the URL path.
- A valid `sessionId` is required in the URL path.
- Authentication is required via `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
GET /terminals/:terminalId/sessions/:sessionId/tags
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
//No request body needed for GET request
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | array | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;`sessionId` | string | A unique identifier for the RFID reading session. |
| &nbsp;&nbsp;&nbsp;&nbsp;`tagId` | string | The unique identifier of the tag read. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"sessionId": "826e7bcc086e901149",
			"tagId": "MDQ2QzUwMzJDMzNCODA="
		}
	],
	"message": "Fetched all tags under session."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid session ID provided."
}
```
**Description:** The `sessionId` provided in the URL path is invalid or does not exist. Ensure the session ID is correct and corresponds to an active session.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Invalid API Key or Secret."
}
```
**Description:** The `API-KEY` or `API-SECRET` provided in the headers is incorrect. Ensure you are using valid and active API credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden: Insufficient permissions for this merchant."
}
```
**Description:** The `MERCHANT-ID` provided does not have the necessary permissions to access this resource. Verify that the `MERCHANT-ID` is correct and has the required roles.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Session not found for terminal."
}
```
**Description:** The combination of `terminalId` and `sessionId` does not correspond to an existing session. Verify that both IDs are correct and associated with each other.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred on the server. This may be a temporary issue. Try again later. If the issue persists, contact support.

## Notes
- The `tagId` values are base64 encoded.
- Ensure your API credentials (`API-KEY`, `API-SECRET`, `MERCHANT-ID`) are securely stored and handled.
- The order of the tags in the response `data` array is not guaranteed to be the order in which they were read.

---
