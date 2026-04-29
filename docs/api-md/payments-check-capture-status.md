# Check Capture Status

## Overview
Retrieves the status of the capture payment request. Capture payments for delayed capture is an asynchronous request that is processed in batches. Once the initial capturePayments request is made, please make this call after approximately 30 minutes to get the response.

## Prerequisites
- An existing payment ID from a previous "Initiate Payment" request is required.
- Delayed capture must have been used during the payment initiation.
- Authentication is required using `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers.

## Request

### HTTP Method and URL
```
GET /payments/:paymentId/capture
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | No |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |
| MERCHANT-ID | YOUR_MERCHANT_ID | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
// Example request, actual request doesn't have a body
{}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data. |
| data.captureStatus | string | Denotes the status of the capture request for payment. Possible values: PENDING, SUCCESS, ERROR. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": {
	  "captureStatus":"SUCCESS"
	},
	"message": "Capture status fetched successfully."
}
```

## Error Responses

### Possible Errors

#### TBD - Error Name (No error information provided in JSON)
```json
{}
```
**Description:** No specific error codes or error responses were provided in the JSON documentation. Assuming standard HTTP errors will be returned in case of failure, e.g., 400 for bad request, 401 for unauthorized, 404 for not found, 500 for server error.  Consult general HTTP status codes for potential errors.

## Notes
- This endpoint is used to check the status of a capture payment that was initiated with delayed capture.
- It is recommended to wait approximately 30 minutes after the initial capturePayments request before calling this endpoint.
- The response indicates the status of the capture request: PENDING, SUCCESS, or ERROR.

---
