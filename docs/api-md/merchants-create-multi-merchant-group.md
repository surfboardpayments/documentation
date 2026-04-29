# Create Multi-merchant Group

## Overview
Creates a multi-merchant group. Partners can use this API to create a multi-merchant group that enables multiple merchants to use the same terminal. Individual merchants are tagged to this group, enabling access to all the terminals registered in this group.

## Prerequisites
- Partner account with Surfboard
- Valid `partnerId`
- API Key and API Secret for authentication
- The `partnerId` is used in the URL path.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/multi-merchant
```

### Headers
| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| country | string | Yes | Two-letter ISO country code, in uppercase e.g 'SE', 'DK', 'NO'. |
| zipCode | string | Yes | ZIP code of the store address. |
| name | string | No | Name of the Multi-merchant group. |
| email | string | No | Email address of the Multi-merchant group. |

### Request Example
```json
{
  "country": "SE",
  "zipCode": "123456"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request 'SUCCESS' | 'ERROR'. |
| data | object | Response data |
| data.applicationId | string | This is the applicationId that you will use to track the status of the create multi-merchant group request. |
| data.merchantId | string | Multi-merchant ID. |
| data.storeId | string | Multi-merchant store ID. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "applicationId": "81376ad8ebedf80310",
    "merchantId": "81660b596c7fd0000e",
    "storeId": "81660b59434440030f"
  },
  "message": "Multi Merchant created successfully"
}
```

## Error Responses

### Possible Errors

#### TBD - To be defined
```json
{
  "status": "ERROR",
  "message": "An error occurred"
}
```
**Description:**  Specific error codes and messages are to be defined. This is a placeholder.

## Notes
- The `partnerId` in the URL path is case-sensitive.
- Ensure that the `API-KEY` and `API-SECRET` are correctly configured for your partner account.
---
