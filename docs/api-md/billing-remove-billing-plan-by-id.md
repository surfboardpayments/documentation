# Remove Billing Plan by ID

## Overview
Removes one or more billing plans by their IDs for a specific partner.

## Prerequisites
- A valid partner ID is required.
- The specified billing plan ID must exist and be associated with the given partner.
- Authentication is required using API Key and API Secret in the headers.
- Partner should exist in the system.

## Request

### HTTP Method and URL
```
DELETE /partners/:partnerId/billing-plans/:id
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | No, but recommended |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body required for DELETE
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | `string` | A message describing the outcome of the removal operation. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Billing plans removed from the partner successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid billing plan ID format."
}
```
**Description:** The provided billing plan ID is not in the correct format (e.g., not a valid UUID). Verify that the billing plan ID is correctly formatted and try again.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided in the headers are incorrect. Verify the credentials and try again.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Insufficient permissions to delete billing plans."
}
```
**Description:** The API key does not have the required permissions to delete billing plans. Ensure that the key has the necessary roles assigned.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Billing plan not found for the specified partner."
}
```
**Description:** A billing plan with the provided ID does not exist for the specified partner. Double-check that the partner ID and billing plan ID are correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server. This could be due to a database issue or a problem with the API itself. Contact support if this error persists.

## Notes
- The endpoint removes billing plans permanently. This action cannot be undone.
- The `Content-Type` header is not strictly required for DELETE requests, but it is recommended to include it for clarity.
- Ensure that the API key and secret are securely stored and not exposed in client-side code.
- The partnerId parameter must be a valid UUID.
---
