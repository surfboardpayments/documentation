# Create Merchant Account

## Overview
Create a new account for a merchant with specified email and role permissions.

## Prerequisites
- A valid Merchant ID is required.
- API Key and API Secret are needed for authentication.
- The user must have administrative privileges to create merchant accounts.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/accounts
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| email | string | Yes | Email address for the new merchant account |
| role | string | No | Role assigned to the account (e.g., ADMIN, SUPER_ADMIN, USER). Defaults to a standard user role if not provided. |

### Request Example
```json
{
  "email": "admin@merchant.com",
  "role": "ADMIN"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| message | string | A message that describes the status of the request |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Initiate Signup sucessfull"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid email format."
}
```
**Description:** The email provided is not in a valid format. Ensure the email address is correctly formatted.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API key or secret."
}
```
**Description:** The API key or secret provided are incorrect or missing. Verify the API credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Insufficient privileges to create merchant accounts."
}
```
**Description:** The user does not have the necessary permissions to perform this action. Ensure the user has administrative privileges.

#### 409 - Conflict
```json
{
  "status": "ERROR",
  "message": "Account with this email already exists."
}
```
**Description:** An account with the provided email address already exists. Use a different email or reset the existing account.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred on the server. Contact support and provide details about the request.

## Notes
- The `role` parameter is optional. If not provided, the default user role will be assigned.
- Ensure that the `MERCHANT-ID` in the header matches the merchant you are creating the account for.
- Rate limiting may apply to this endpoint. Contact support for more details.

---
