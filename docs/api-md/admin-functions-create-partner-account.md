# Create Partner Account

## Overview
Create a new account for a partner with specified email and role permissions.

## Prerequisites
- Valid partner ID is required to create the account.
- Authentication is required via `API-KEY` and `API-SECRET` headers.
- The `API-KEY` and `API-SECRET` must be associated with an account that has sufficient privileges to create new partner accounts.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/accounts
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Query Parameters
N/A

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | Yes | Email address for the new partner account. |
| `role` | string | No | Role assigned to the account (e.g., ADMIN, SUPER_ADMIN, USER). If not provided, a default role might be assigned. |

### Request Example
```json
{
  "email": "admin@partner.com",
  "role": "ADMIN"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `message` | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Initiate Signup sucessfull"
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name
```json
{
  "status": "ERROR",
  "message": "TBD"
}
```
**Description:** Error responses are TBD.

## Notes
- The `:partnerId` in the URL should be replaced with the actual ID of the partner for whom the account is being created.
- Ensure that the email address provided is valid and accessible by the new partner account user.
- If the `role` is not specified, a default role will be assigned to the new partner account. Check the system configuration for the default role value.

---
