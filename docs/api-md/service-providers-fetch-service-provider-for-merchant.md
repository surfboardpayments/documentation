# Fetch Service Provider for Merchant

## Overview
This API allows merchants to retrieve all service providers associated with their merchant account.

## Prerequisites
- A valid merchant account is required.
- API Key and API Secret are needed for authentication.
- The merchant ID must be available.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/service-providers
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
*None*

### Request Body Parameters
*None*

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
| data | object | Response data containing service provider information. |
| &nbsp;&nbsp;&nbsp;&nbsp;serviceProviders | array | Array of service provider details. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceProviderId | string | Unique identifier of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;personId | string | Person identifier if applicable, null otherwise. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;corporateId | string | Corporate identification number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nationalId | string | National identification number if applicable, null otherwise. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceType | string | Type of service provided, null if not specified. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | Name of the service provider, null if not specified. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | object | Address information of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addressLine1 | string | First line of the address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;city | string | City of the address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;countryCode | string | Two-letter ISO country code. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;postalCode | string | Postal code of the address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;phoneNumber | object | Phone number information. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number | string | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code | string | Country code for the phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;role | string | Role associated with the phone number, null if not specified. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email | string | Email address of the service provider. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "serviceProviders": [
      {
        "serviceProviderId": "8385f437bc6d200b50",
        "personId": null,
        "corporateId": "5000008202",
        "nationalId": null,
        "serviceType": null,
        "name": null,
        "address": {
          "addressLine1": "Pacocha - Hand",
          "city": "Denesik Brook",
          "countryCode": "SE",
          "postalCode": "61050"
        },
        "phoneNumber": {
          "number": "701208734",
          "code": "46",
          "role": null
        },
        "email": "harish@surfboard.se"
      }
    ]
  },
  "message": "Service providers fetched successfully for merchant."
}
```

## Error Responses

### Possible Errors
*No error information provided in the JSON. Assumed general errors apply, and proper error structure will need to be implemented*

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request format."
}
```
**Description:** The request was malformed or missing required parameters. Verify that the request format and mandatory fields are correctly provided.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or API Secret provided is incorrect or missing. Double-check your API credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant does not have permission to access this resource."
}
```
**Description:** The merchant does not have the necessary permissions to access this endpoint or specific service provider data. Verify merchant permissions.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Merchant not found."
}
```
**Description:** The specified merchant ID does not exist. Ensure that the merchant ID is valid.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred on the server."
}
```
**Description:** An unexpected error occurred on the server-side. Report this issue to the support team.

## Notes
- The `personId`, `nationalId`, `serviceType`, `name`, and `phoneNumber.role` fields can be `null`.
- Ensure proper error handling is implemented for a robust application.
---
