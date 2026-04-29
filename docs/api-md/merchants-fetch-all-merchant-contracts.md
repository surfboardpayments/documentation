# Fetch All Merchant Contracts

## Overview
Retrieves the list all contracts under the specific merchant.

## Prerequisites
- A valid `merchantId` is required to identify the merchant.
- Authentication is required via `API-KEY`, and `API-SECRET` headers.

## Request

### HTTP Method and URL
```
GET /merchants/:merchantId/contracts
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
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
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR' |
| data | object | Response data |
| data.contractId | String | The contract ID used to identify a contract. |
| data.type | String | Denotes type of the merchant contract. |
| data.type.MERCHANT_AGREEMENT | String | A contract that establishes relationship and services agreed between two parties. Possible value: `MERCHANT_AGREEMENT` |
| data.status | String | Denotes the status of the merchant contract. It can be either 'ACTIVE' or 'INACTIVE' |
| data.contractLink | String | Link for the merchant contract. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"data": [
		{
			"contractId": "81d9b757ea31c0013d",
			"type": "MERCHANT_AGREEMENT",
			"status": "ACTIVE",
			"contractLink": "https://storage.googleapis.com/test"
		}
	],
	"message": "Fetched merchant agreement contracts successfully"
}
```

## Error Responses

### Possible Errors
N/A - No error responses were provided in the source JSON

## Notes
- Replace `YOUR_API_KEY`, `YOUR_API_SECRET`, and `YOUR_MERCHANT_ID` with your actual API key, API secret, and Merchant ID.

---
