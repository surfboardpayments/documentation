# Update Terminal Name

## Overview
Update terminal name of a registered terminal using this call.

## Prerequisites
- A registered terminal.
- Authentication via API Key and Secret.
- A valid Merchant ID.

## Request

### HTTP Method and URL
```
PUT /terminals/:terminalId
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
| terminalName | String | Yes | Assign a name for your terminal. An optional param to identify a terminal for the user. |

### Request Example
```json
{
  "terminalName": "New Terminal"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the request. |
| message | string | A message that describes the status of the update request. |

### Success Response Example
```json
{
  "status": "SUCCESS",
  "message": "Terminal name updated successfully"
}
```

## Error Responses

### Possible Errors
N/A (No error responses provided in the JSON data, please specify possible errors to populate this section)

## Notes
- Ensure the `:terminalId` in the URL path is replaced with the actual ID of the terminal you wish to update.
- The `terminalName` is optional in functionality but mandatory in the API call when updating the name, so it is recommended to provide a meaningful name for better terminal identification.

---
