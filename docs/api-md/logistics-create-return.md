# Create Return

## Overview
Creates a return request for terminals using the API. This enhanced version allows for more detailed merchant information and multiple return order lines.

## Prerequisites
- A valid partner account with Surfboard.
- Authentication is required using API Key and API Secret.
- The merchant must be registered in your system.
- The terminal must exist in your system.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/logistics/returns
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
| merchantInfo | object | Yes | Detailed merchant information for the return request. |
| &nbsp;&nbsp;&nbsp;&nbsp;name | string | Yes | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;email | string | Yes | Email address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;phoneNumber | object | Yes | Contact number of the merchant in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code | string | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number | string | Yes | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;addressLine1 | string | Yes | First line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;addressLine2 | string | No | Second line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;addressLine3 | string | No | Third line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;countryCode | string | Yes | Two-letter ISO country code in uppercase. |
| &nbsp;&nbsp;&nbsp;&nbsp;postalNumber | string | Yes | Postal code of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;city | string | Yes | City of the merchant's address. |
| returnOrderLines | array | Yes | Array of return order line items. |
| &nbsp;&nbsp;&nbsp;&nbsp;serial | string | Yes | Serial number of the terminal to be returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;merchantId | string | Yes | Unique identifier of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;terminalId | string | Yes | Unique identifier of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;reasonForReturn | string | Yes | Reason for the return.  Possible values: WARRANTY, NOT_USING_SERVICE, NON_WARRANTY_BROKEN, TECHNICAL_ISSUES, COMPATIBILITY_ISSUES. |
| &nbsp;&nbsp;&nbsp;&nbsp;stopBilling | boolean | No | Whether to stop billing for this terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;comment | string | No | Additional comments regarding the return. |
| deliveryInstruction | string | No | Delivery instructions for the carrier. |

### Request Example
```json
{
  "merchantInfo": {
    "name": "Demo Store",
    "email": "demo@example.com",
    "phoneNumber": {
      "code": "46",
      "number": "123456789"
    },
    "addressLine1": "Demo Street 123",
    "addressLine2": "Building A",
    "addressLine3": null,
    "city": "Stockholm",
    "countryCode": "SE",
    "postalNumber": "12345"
  },
  "returnOrderLines": [
    {
      "serial": "TERM001234567",
      "terminalId": "816a0ff6bc0fb00404",
      "reasonForReturn": "NOT_USING_SERVICE",
      "stopBilling": true,
      "comment": "Device not working properly"
    }
  ],
  "deliveryInstruction": "Please call before delivery"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| &nbsp;&nbsp;&nbsp;&nbsp;returnId | number | ID of the return request. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "returnId": 80
  },
  "message": "Return request created successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid request body"
}
```
**Description:** The request body is malformed or missing required fields. Ensure all required parameters are present and of the correct type.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Invalid API key or secret"
}
```
**Description:** The API key or secret provided in the headers is invalid or missing.  Verify your API credentials.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "data": null,
  "message": "Merchant or Terminal not found"
}
```
**Description:** The specified merchant or terminal ID could not be found. Ensure the merchant and terminal exist in your system.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "data": null,
  "message": "An unexpected error occurred"
}
```
**Description:** An unexpected error occurred on the server.  Contact support for assistance.

## Notes
- The `partnerId` in the URL path needs to be replaced with the actual Partner ID.
- Ensure the `MERCHANT-ID` header matches the `merchantId` in the `returnOrderLines`.
- The `reasonForReturn` field must be one of the allowed values.
- The `addressLine2` and `addressLine3` and `deliveryInstruction`, `stopBilling` and `comment` fields are optional, and can be omitted from the request.

---
