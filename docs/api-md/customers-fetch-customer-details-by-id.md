# Fetch Customer Details by ID

## Overview
Retrieves customer information using the customer ID. Use this API to get detailed customer profile including personal information, addresses, contact details, and associated payment cards for customer management and transaction processing.

## Prerequisites
- API Key and Secret: You must have a valid API key and secret to access this endpoint.
- Merchant ID: You must have a valid Merchant ID.
- Authentication: Authenticate using your API key, API secret, and Merchant ID in the headers.
- Customer ID: You must have the ID of the customer you want to retrieve.

## Request

### HTTP Method and URL
```
GET /customers/:customerId
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// No request body needed for GET request.
// Ensure the customerId is provided in the URL path.
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data containing comprehensive customer information. |
| data.firstName | string | Customer's first name. |
| data.middleName | string | Customer's middle name. |
| data.lastName | string | Customer's surname or last name. |
| data.birthDate | string | Customer's date of birth. |
| data.gender | string | Customer's gender. |
| data.countryCode | string | Two-letter ISO country code representing the customer's country. |
| data.address | array | Array of customer addresses. |
| data.address.careOf | string | Care of information for the address. |
| data.address.addressLine1 | string | First line of the customer's address. |
| data.address.addressLine2 | string | Second line of the customer's address. |
| data.address.addressLine3 | string | Third line of the customer's address. |
| data.address.city | string | City of the customer's address. |
| data.address.countryCode | string | Two-letter ISO country code for the address. |
| data.address.postalCode | string | Postal code of the customer's address. |
| data.address.role | string | Purpose of the address (e.g., 'shipping', 'billing'). |
| data.emails | array | Array of customer email addresses. |
| data.emails.email | string | Customer's email address. |
| data.emails.role | string | Role or purpose of the email address. |
| data.phoneNumbers | array | Array of customer phone numbers. |
| data.phoneNumbers.phoneNumber | object | Customer's phone number details. |
| data.phoneNumbers.phoneNumber.code | string | International dialing code for the phone number. |
| data.phoneNumbers.phoneNumber.number | string | Phone number without the country code. |
| data.phoneNumbers.role | string | Role or purpose of the phone number. |
| data.cardIds | array | Array of payment card identifiers associated with the customer. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "countryCode": "SE",
    "address": [
      {
        "careOf": "second address at 3:40",
        "addressLine1": "second address at 3:40",
        "addressLine2": "3rd west street",
        "addressLine3": "B-Block",
        "city": "Ølstykke Stenløse",
        "countryCode": "SE",
        "postalCode": "99 999",
        "role": "shipping"
      }
    ],
    "emails": [],
    "phoneNumbers": [
      {
        "phoneNumber": {
          "code": "91",
          "number": "9876543210"
        },
        "role": "own"
      }
    ],
    "cardIds": [
      "824c514bfe001805f0",
      "827a63468b993801f0",
      "827a63460b99380df0"
    ]
  },
  "message": "Fetched customer details successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid customer ID format"
}
```
**Description:** The customer ID provided in the URL is not in the correct format. Ensure the customer ID is a valid integer or UUID.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Unauthorized: Missing or invalid API key"
}
```
**Description:** The API key is missing or invalid. Ensure the `API-KEY` header is present and contains a valid API key. Check your API credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Forbidden: Insufficient permissions"
}
```
**Description:** The API key does not have the necessary permissions to access this endpoint. Contact your administrator to request the required permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Customer not found"
}
```
**Description:** The customer with the provided ID does not exist. Verify the customer ID is correct.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "Internal server error"
}
```
**Description:** An unexpected error occurred on the server. Try again later. If the problem persists, contact support with the request details.

## Notes
- The `customerId` in the URL path is case-sensitive.
- Ensure that the `Content-Type` header is set to `application/json`.
- Empty arrays will be returned for `emails`, `phoneNumbers`, and `cardIds` if no data is available.
---
