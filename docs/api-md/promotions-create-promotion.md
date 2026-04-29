# Create Promotion

## Overview
The Create Promotion API enables users to create new marketing promotions by defining attributes such as title, content, schedule, and priority.

## Prerequisites
- API Key and Secret are required for authentication.
- A valid Merchant ID is required.
- The Store ID for which the promotion is being created must be valid.
- Authentication requires including the `API-KEY`, `API-SECRET`, and `MERCHANT-ID` headers in the request.

## Request

### HTTP Method and URL
```
POST /merchants/:mId/stores/:sId/promotions
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
| Parameter | Type | Required | Description |
|---|---|---|---|
| merchantId | string | No | The unique identifier for the merchant creating the promotion. |
| title | string | No | The title of the promotion. |
| name | string | Yes | The name of the promotion. |
| description | string | No | A brief description of the promotion. |
| assetUrl | string | No | URL of the promotion image. |
| assetOpacity | string | No | Opacity level of the promotional asset, ranging from 0 (fully transparent) to 1 (fully opaque). |
| backgroundColor | string | No | Background color for the promotion, in hex format. |
| contentTextColor | string | No | Text color for the promotional content, in hex format. |
| endProductUrl | string | No | URL of the product linked to the promotion. |
| endProduct | string | No | Product ID associated with the promotion. |
| buttonLabel | string | No | The label for the action button in the promotion. |
| priority | string | Yes | The priority of the promotion, where lower numbers indicate higher priority. |
| type | string | Yes | The type of promotion. |
| startDate | string | Yes | The start date of the promotion in 'MM-DD-YYYY' format. |
| endDate | string | Yes | The end date of the promotion in 'MM-DD-YYYY' format. |

Possible values for `type`:

*   `RECEIPT_BIG`: Promotion displayed in a large spot on the receipt.
*   `RECEIPT_SMALL`: Promotion displayed in a small spot on the receipt.
*   `IDLE_BIG_SPOT`: Promotion displayed on the idle screen in a large spot.
*   `OTHER_SCREEN`: Promotion displayed on other screens.

### Request Example
```json
{
  "title": "First Promotion",
  "name": "Slash sale",
  "description": "Slash sale on all fruits",
  "assetUrl": "https://www.surfpayapp.com/hubfs/connect/surfpay_checkout-companion.png",
  "type": "RECEIPT_BIG",
  "assetOpacity": "0",
  "backgroundColor": "#a1a1aa",
  "contentTextColor": "#78716c",
  "endProductUrl": "https://www.timestamp-converter.com/",
  "endProduct": "12345",
  "buttonLabel": "Click",
  "priority": 1,
  "idleBigSpot": true,
  "receiptBig": true,
  "receiptSmall": true,
  "endDate": "05-05-2027",
  "startDate": "05-05-2025"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request, indicated as either 'SUCCESS' or 'ERROR'. |
| data | object | Response data |
| data.promotionId | string | Unique identifier of the promotion. |
| message | string | A message that describes the status of the request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "promotionId": "ca_QvDucDKihDqNVYpia1_G0"
  },
  "message": "Promotion Created Successfully"
}
```

## Error Responses

### Possible Errors

#### (No Errors Defined)

## Notes
This endpoint is marked as `comingSoon: true`. It might not be available for use yet.
It's critical to adhere to the specified date format ('MM-DD-YYYY') for `startDate` and `endDate`.
---
