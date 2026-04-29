```markdown
# Fetch Service Provider for Partner

## Overview
This API allows partners to retrieve all service providers associated with their partner account.

## Prerequisites
- Partner account with active service providers.
- Valid API key, API secret, and merchant ID are required for authentication.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/service-providers
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
| data.serviceProviders | array | Array of service provider details. |
| data.serviceProviders[].serviceProviderId | string | Unique identifier of the service provider. |
| data.serviceProviders[].personId | string | Person identifier if applicable, null otherwise. |
| data.serviceProviders[].corporateId | string | Corporate identification number. |
| data.serviceProviders[].nationalId | string | National identification number if applicable, null otherwise. |
| data.serviceProviders[].serviceType | string | Type of service provided, null if not specified. |
| data.serviceProviders[].name | string | Name of the service provider, null if not specified. |
| data.serviceProviders[].address | object | Address information of the service provider. |
| data.serviceProviders[].address.addressLine1 | string | First line of the address. |
| data.serviceProviders[].address.city | string | City of the address. |
| data.serviceProviders[].address.countryCode | string | Two-letter ISO country code. |
| data.serviceProviders[].address.postalCode | string | Postal code of the address. |
| data.serviceProviders[].phoneNumber | object | Phone number information. |
| data.serviceProviders[].phoneNumber.number | string | Phone number. |
| data.serviceProviders[].phoneNumber.code | string | Country code for the phone number. |
| data.serviceProviders[].phoneNumber.role | string | Role associated with the phone number, null if not specified. |
| data.serviceProviders[].email | string | Email address of the service provider. |
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
  "message": "Service providers fetched successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid partner ID."
}
```
**Description:** The partner ID provided in the URL is invalid. Ensure the partner ID is correctly formatted and exists in the system.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API key."
}
```
**Description:** The API key provided in the header is incorrect or missing. Verify that the correct API key is being used.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "data": null,
  "message": "The partner does not have permission to access the requested service providers."
}
```
**Description:** The partner associated with the API key does not have the necessary permissions to fetch service providers. Contact support to request appropriate permissions.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred on the server."
}
```
**Description:** A server-side error occurred while processing the request. Try the request again later. If the issue persists, contact support with the request details.

## Notes
- The `personId`, `nationalId`, `serviceType`, and `name` fields within `serviceProviders` can be null if not applicable to the service provider.
- The `role` field within `phoneNumber` can be null if not applicable to the phone number.

---
```