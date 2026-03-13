# Create Token

## Overview
Creates a token for a given externalUserID. The token must be passed via the authorization header as a bearer token in subsequent requests.

## Prerequisites
- You need a valid `partnerId`.
- Contact integrations@surfboard.se or via our Slack channel to get `providerId` and `providerCertificate` details.
- You need a valid `API-KEY`, `API-SECRET` and `MERCHANT-ID`.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/token
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
| providerId | string | Yes | Provider ID of the auth provider |
| providerCertificate | string | Yes | Certificate of the auth provider |
| externalUserId | string | Yes | ExternalUserId ID to be assigned to the user who requires auth token |
| email | string | No | Email address of the user |

### Request Example
```json
{
  "providerId": "BB72CE2C-B160-4BFE-ACB9-3FC270260C33",
  "providerCertificate": "2c95c565604048d7998a034ccbd2fbb5",
  "externalUserId": "A8895CBBCC503F"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data |
| data.token | string | Auth Token that is valid for a given interval specified in validUntil |
| data.validUntil | string | This provides the duration of the token in seconds. Once the expiry duration is reached, a new token needs to be fetched. It must be noted that Surfboard will change the duration of the token based on the running environment and its internal controls for fraud. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "token": "4E306D4EDC9C48919671014D1125B61A4B12170F806F45D087ADD190A21869234F1D7D1D8A1547A0A38556739091BF09",
    "validUntil": "3600"
  },
  "message": "Auth token fetched successfully"
}
```

## Error Responses

### Possible Errors

Currently, no error responses are provided in the source JSON.
*(Example Error Response Structure, adapt based on actual error scenarios)*

#### 400 - Bad Request
```json
{
  "status": "ERROR",
  "message": "Invalid providerId"
}
```
**Description:** The `providerId` provided is not valid. Ensure the ID is correct and matches the value provided by Surfboard.

## Notes
- The generated token is restricted to perform calls limited to orders, payments and transactions.
- Surfboard will change the duration of the token based on the running environment and its internal controls for fraud.
---