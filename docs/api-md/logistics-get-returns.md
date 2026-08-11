# Get Returns

## Overview
Retrieves return requests for a specific merchant using the API. Supports filtering by status and provides detailed return information.

## Prerequisites
- An active partner account is required.
- Authentication is required — send an API Key and API Secret pair (as shown), or another supported scheme (see Notes).
- The resource identified by `partnerId` in the URL path must exist.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/logistics/returns
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `partnerId` | `string` | Yes | Identifier supplied in the URL path. |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `filter` | `string` | No | Filter returns by status. Possible values: `APPROVED`, `CREATED`. |

### Pagination

To `filter` returns by status send in `filter` as query param

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
GET /partners/:partnerId/logistics/returns?filter=APPROVED
```

## Response

### Response Parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| `data` | `array` | Array of return request objects. |
| &nbsp;&nbsp;&nbsp;&nbsp;`returnId` | `number` | Unique identifier for the return request. |
| &nbsp;&nbsp;&nbsp;&nbsp;`partnerId` | `string` | Unique identifier of the partner. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantName` | `string` | Name of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantEmail` | `string` | Email address of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantPhone` | `string` | Phone number of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantAddressLine1` | `string` | First line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantAddressLine2` | `string` | Second line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantAddressLine3` | `string` | Third line of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantCity` | `string` | City of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantPostalNumber` | `string` | Postal code of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`merchantCountryCode` | `string` | Country code of the merchant's address. |
| &nbsp;&nbsp;&nbsp;&nbsp;`deliveryInstruction` | `string` | Delivery instructions for the return. |
| &nbsp;&nbsp;&nbsp;&nbsp;`status` | `string` | Current status of the return request. Possible values: `APPROVED`, `CREATED`. |
| &nbsp;&nbsp;&nbsp;&nbsp;`returnOrderLines` | `array` | Array of return order line items. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`returnOrderlineId` | `number` | Unique identifier for the return order line. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`returnId` | `number` | ID of the parent return request. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`serial` | `string` | Serial number of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`terminalId` | `string` | Unique identifier of the terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`merchantId` | `string` | Unique identifier of the merchant. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`deviceModel` | `string` | Model of the device being returned. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`reasonForReturn` | `string` | Reason for the return. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`stopBilling` | `boolean` | Whether billing has been stopped for this terminal. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`comment` | `string` | Additional comments regarding the return. |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`isUnregistered` | `boolean` | Whether this line was created for an unregistered terminal, one with no associated terminal or merchant. |
| `message` | `string` | A message that describes the status of the request. |
| `totalCount` | `number` | Total count of return requests matching the criteria. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "returnId": 80,
      "partnerId": "8113d3f8403b380409",
      "merchantName": "Demo Store",
      "merchantEmail": "demo@example.com",
      "merchantPhone": "+46123456789",
      "merchantAddressLine1": "Demo Street 123",
      "merchantAddressLine2": "Building A",
      "merchantAddressLine3": "",
      "merchantCity": "Stockholm",
      "merchantPostalNumber": "12345",
      "merchantCountryCode": "SE",
      "deliveryInstruction": "Please call before delivery",
      "status": "CREATED",
      "returnOrderLines": [
        {
          "returnOrderlineId": 78,
          "returnId": 80,
          "serial": "TERM001234567",
          "terminalId": "816a0ff6bc0fb00404",
          "merchantId": "m_iWGri3XAyTmkbKYsYtV47",
          "deviceModel": "Surfpad",
          "reasonForReturn": "NOT_USING_SERVICE",
          "stopBilling": true,
          "comment": "Device not working properly",
          "isUnregistered": false
        }
      ]
    }
  ],
  "message": "Return requests gotten successfully"
}
```

## Error Responses

### Possible Errors

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid request parameters."
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
- The `partnerId` is part of the URL path and must be a valid identifier.
- This endpoint is paginated; see the Query Parameters for the supported paging parameters.

---
