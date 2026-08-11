# Fetch Merchant Service Providers

## Overview
Retrieve the service providers configured for the authenticated merchant, including their identifiers, contact details, and address. Service providers are third parties that receive a share of the merchant's transaction fees.

## Prerequisites
- An active merchant account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `merchantId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/service-providers
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | No |

### Request Body Parameters

This endpoint does not take a request body.

### Request Example
```text
GET /merchants/:merchantId/service-providers
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | The service providers configured for the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serviceProviders` | `array` | List of service providers. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serviceProviderId` | `string` | Unique identifier of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`personId` | `string` | Identifier of the person associated with the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`corporateId` | `string` | Corporate identifier of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`nationalId` | `string` | National identifier of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Name of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | Address of the service provider. Can be null. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | First line of the service provider address. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | City of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Two-letter ISO country code, in uppercase, of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Postal code of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | Contact number of the service provider. Can be null. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Phone number of the service provider. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | International dialing code of the phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`role` | `string` | Role associated with the phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Email address of the service provider. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "serviceProviders": [
      {
        "serviceProviderId": "sp_81412e3c3b1090060f",
        "personId": "pn_5f2c1a9b3d",
        "corporateId": "5591631360",
        "nationalId": "199001011234",
        "name": "Nordic Accounting AB",
        "address": {
          "addressLine1": "Main Street 123",
          "city": "Stockholm",
          "countryCode": "SE",
          "postalCode": "12345"
        },
        "phoneNumber": {
          "number": "812345678",
          "code": "46",
          "role": "PRIMARY"
        },
        "email": "billing@nordicaccounting.se"
      }
    ]
  },
  "message": "Service providers fetched successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Unable to fetch service providers"
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
- `MERCHANT-ID` is optional; when sent it must match the `:merchantId` in the path.
- The `merchantId` is part of the URL path and must be a valid identifier.

---
