# Get Returns

## Overview
Retrieves return requests for a specific merchant using the API. Supports filtering by status and provides detailed return information.  This endpoint supports pagination.

## Prerequisites
- A valid partner ID is required.
- Authentication via API Key and Secret is required.
- A valid Merchant ID is required.
- `Content-Type` header should be set to `application/json`.

## Request

### HTTP Method and URL
```
GET /partners/:partnerId/logistics/returns
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| filter | string | No | Filter returns by status. Possible values: `APPROVED`, `CREATED`. |

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
| data | array | Array of return request objects. |
| data[].returnId | number | Unique identifier for the return request. |
| data[].partnerId | string | Unique identifier of the partner. |
| data[].merchantName | string | Name of the merchant. |
| data[].merchantEmail | string | Email address of the merchant. |
| data[].merchantPhone | string | Phone number of the merchant. |
| data[].merchantAddressLine1 | string | First line of the merchant's address. |
| data[].merchantAddressLine2 | string | Second line of the merchant's address. |
| data[].merchantAddressLine3 | string | Third line of the merchant's address. |
| data[].merchantCity | string | City of the merchant's address. |
| data[].merchantPostalNumber | string | Postal code of the merchant's address. |
| data[].merchantCountryCode | string | Country code of the merchant's address. |
| data[].deliveryInstruction | string | Delivery instructions for the return. |
| data[].status | string | Current status of the return request. Possible values: `APPROVED`, `CREATED`. |
| data[].returnOrderLines | array | Array of return order line items. |
| data[].returnOrderLines[].returnOrderlineId | number | Unique identifier for the return order line. |
| data[].returnOrderLines[].returnId | number | ID of the parent return request. |
| data[].returnOrderLines[].serial | string | Serial number of the terminal. |
| data[].returnOrderLines[].terminalId | string | Unique identifier of the terminal. |
| data[].returnOrderLines[].merchantId | string | Unique identifier of the merchant. |
| data[].returnOrderLines[].deviceModel | string | Model of the device being returned. |
| data[].returnOrderLines[].reasonForReturn | string | Reason for the return. |
| data[].returnOrderLines[].stopBilling | boolean | Whether billing has been stopped for this terminal. |
| data[].returnOrderLines[].comment | string | Additional comments regarding the return. |
| message | string | A message that describes the status of the request. |
| totalCount | number | Total count of return requests matching the criteria. |

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
          "createdAt": "2025-10-29T04:51:28.566Z",
          "lastChanged": "2025-10-29T04:51:28.566Z",
          "stopBilling": true,
          "comment": "Device not working properly"
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
**Description:** The request contains invalid parameters.  Check the request parameters for correctness, ensuring that the types and values conform to the API specification.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or Secret provided are invalid or missing. Ensure that the correct credentials are included in the request headers.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant ID is not authorized for this partner."
}
```
**Description:** The Merchant ID provided is not authorized for the specified partner. Verify the Merchant ID is associated with the partner account.

#### 404 - Not Found
```json
{
  "status": "ERROR",
  "message": "Partner not found."
}
```
**Description:** The specified Partner ID does not exist. Verify the Partner ID is valid.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:** An unexpected error occurred on the server.  Contact support with the details of the request that triggered the error.

## Notes
- The `filter` parameter is optional. If not provided, all returns for the merchant will be returned.
- The API supports pagination; however, details on how to implement pagination were not provided in the original JSON. Implement standard offset and limit based pagination if available.
---
