# Create Return

## Overview
Creates a return request for terminals using the API. This enhanced version allows for more detailed merchant information and multiple return order lines.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/logistics/returns
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `API-KEY` | `YOUR_API_KEY` | Yes |
| `API-SECRET` | `YOUR_API_SECRET` | Yes |

### Request Body Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `merchantInfo` | `object` | Yes | Detailed merchant information for the return request. |
| &nbsp;&nbsp;&nbsp;&nbsp;`name` | `string` | Yes | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`email` | `string` | Yes | Email address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`phoneNumber` | `object` | Yes | Contact number of the merchant in code and number format. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code` | `string` | Yes | International dialing code identifying the country or region. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`number` | `string` | Yes | Phone number. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine1` | `string` | Yes | First line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine2` | `string` | No | Second line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`addressLine3` | `string` | No | Third line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`countryCode` | `string` | Yes | Two-letter ISO country code in uppercase. |
| &nbsp;&nbsp;&nbsp;&nbsp;`postalNumber` | `string` | Yes | Postal code of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`city` | `string` | Yes | City of the merchant's address. |
| `returnOrderLines` | `array` | Yes | Array of return order line items. |
| &nbsp;&nbsp;&nbsp;&nbsp;`serial` | `string` | Yes | Serial number of the terminal to be returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | No | Unique identifier of the merchant. Provide both merchantId and terminalId for a registered terminal, or omit both to return an unregistered terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | No | Unique identifier of the terminal. Provide both terminalId and merchantId for a registered terminal, or omit both to return an unregistered terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`reasonForReturn` | `string` | Yes | Reason for the return. Possible values: `WARRANTY`, `NOT_USING_SERVICE`, `NON_WARRANTY_BROKEN`, `TECHNICAL_ISSUES`, `COMPATIBILITY_ISSUES`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`stopBilling` | `boolean` | No | Whether to stop billing for this terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;`comment` | `string` | No | Additional comments regarding the return. |
| `deliveryInstruction` | `string` | No | Delivery instructions for the carrier. |

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
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `object` | Response data |
| &nbsp;&nbsp;&nbsp;&nbsp;`returnId` | `number` | ID of the return request. |
| `message` | `string` | A message that describes the status of the request. |

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
  "message": "Invalid request body."
}
```
**Description:** The request body is malformed or missing required parameters. Check the request body against the documented schema and ensure all mandatory fields are present and of the correct type.

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
- The `partnerId` is part of the URL path and must be a valid identifier.

---
