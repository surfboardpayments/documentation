# Update Customer Details

## Overview
Replaces the customer, billing and shipping contact details on an existing order. Use this API to set or correct who the order is for and where it is billed and shipped, identified by the Order ID in the URL.

## Prerequisites
- An active merchant account is required.
- Authentication is required using API Key, API Secret, and Merchant ID.
- The resource identified by `orderId` in the URL path must exist.

## Request

### HTTP Method and URL
```
PUT /orders/:orderId/customer
```

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |
| `MERCHANT-ID` | `YOUR_MERCHANT_ID` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer` | `object` | No | Customer details for the order |
| &nbsp;&nbsp;&nbsp;&nbsp;`customerId` | `string` | No | Unique identifier for the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;`person` | `object` | No | Personal information of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | No | Person identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name` | `object` | No | Full name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`firstName` | `string` | No | First name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`middleName` | `string` | No | Middle name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lastName` | `string` | No | Last name of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | No | Email address of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | No | Phone number of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`birthDate` | `string` | No | Date of birth in YYYY-MM-DD format |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`personalNumber` | `string` | No | Personal identification number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`coordinationNumber` | `string` | No | Coordination number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryResidence` | `string` | No | Country of residence of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`gdNumber` | `string` | No | Government-issued identification number of the customer |
| &nbsp;&nbsp;&nbsp;&nbsp;`company` | `object` | No | Company information for corporate purchases |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id` | `string` | No | Company identifier. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`vatId` | `string` | No | VAT ID of the company |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`poDetails` | `string` | No | Purchase order details for the company |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`companyName` | `string` | No | Company display name. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`registrationNumber` | `string` | No | Company registration number. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`gln` | `string` | No | GLN of the buyer's e-invoice department, used to route e-invoices. |
| `billing` | `object` | No | Billing contact and address |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `object` | No | Full name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`firstName` | `string` | No | First name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`middleName` | `string` | No | Middle name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lastName` | `string` | No | Last name of the billing contact |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | No | Billing email |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | No | Phone number for billing |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | No | Billing address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | No | Care of / attention |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | Primary address line |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Address line 2 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Address line 3 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Yes | Postal/ZIP code |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Country code (ISO 3166-1 alpha-2) |
| `shipping` | `object` | No | Shipping contact and address |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `object` | No | Full name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`firstName` | `string` | No | First name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`middleName` | `string` | No | Middle name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lastName` | `string` | No | Last name of the shipping contact |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | No | Recipient email |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | No | Phone number for shipping |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code (Eg., 46 for Sweden without '+') |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | National subscriber number (digits only) |
| &nbsp;&nbsp;&nbsp;&nbsp;`address` | `object` | No | Shipping address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`careOf` | `string` | No | Care of / attention |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | Primary address line |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Address line 2 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Address line 3 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`postalCode` | `string` | Yes | Postal/ZIP code |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Country code (ISO 3166-1 alpha-2) |

### Request Example
```json
{
  "customer": {
    "customerId": "825a37d0aa1048120e",
    "person": {
      "name": {
        "firstName": "Tom",
        "middleName": "A",
        "lastName": "Andersson"
      },
      "email": "tom.andersson@example.com",
      "phoneNumber": {
        "code": "46",
        "number": "701234567"
      },
      "birthDate": "1990-05-14",
      "personalNumber": "199005141234",
      "coordinationNumber": "199005741234",
      "countryResidence": "SE",
      "gdNumber": "GD123456"
    },
    "company": {
      "vatId": "SE556677889901",
      "poDetails": "PO-2024-0098"
    }
  },
  "billing": {
    "name": {
      "firstName": "Tom",
      "middleName": "A",
      "lastName": "Andersson"
    },
    "email": "tom.andersson@example.com",
    "phoneNumber": {
      "code": "46",
      "number": "701234567"
    },
    "address": {
      "careOf": "c/o Reception",
      "addressLine1": "Storgatan 1",
      "addressLine2": "Floor 2",
      "addressLine3": "Door 4",
      "city": "Stockholm",
      "postalCode": "11122",
      "countryCode": "SE"
    }
  },
  "shipping": {
    "name": {
      "firstName": "Sam",
      "middleName": "A",
      "lastName": "Berg"
    },
    "email": "sam.berg@example.com",
    "phoneNumber": {
      "code": "46",
      "number": "709876543"
    },
    "address": {
      "careOf": "c/o Reception",
      "addressLine1": "Kungsgatan 9",
      "addressLine2": "Floor 2",
      "addressLine3": "Door 4",
      "city": "Stockholm",
      "postalCode": "11122",
      "countryCode": "SE"
    }
  }
}
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Updated customer, billing and shipping details returned by the service. |
| `message` | `string` | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {},
  "message": "Customer details updated successfully."
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid order id"
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Authentication failed"
}
```
**Description:** Authentication failed. Ensure the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers are correctly set and valid for your account.

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
- The `orderId` is part of the URL path and must be a valid identifier.

---
