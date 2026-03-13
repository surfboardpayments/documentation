# Register Device

## Overview
Registers a new terminal to a store. For SDK-based workflows, this API call is unnecessary as SDK methods covers terminal registration. After the terminal is registered to a store under the merchant, it cannot be repurposed to be used by another merchant. However, you can use the Change Store API to transfer the terminal to another store under the same merchant.

## Prerequisites
- You must have a valid merchant ID and store ID.
- You need the terminal's registration identifier.
- Authentication is required using API Key and API Secret.

## Request

### HTTP Method and URL
```
POST /merchants/:merchantId/stores/:storeId/devices
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
| registrationIdentifier | String | Yes | Usually, the registrationIdentifier is a 6-digit code found upon starting the terminal. For the SurfPad and Printer, you need to use the serial number from the back of the device. |
| terminalName | String | No | Assign a name for your terminal. An optional param to identify a terminal for the user. |

### Request Example
```json
{
  "registrationIdentifier":"250901",
  "terminalName":"Kiosk One"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | String | Status of the terminal registration. |
| data | object | Response data. |
| data.terminalId | String | Terminal ID of the registered terminal. |
| data.registrationStatus | string | Represents the current status of the terminal.  |
| message | string | A message that describes the status of the terminal registration. |

#### Possible values for `data.registrationStatus`:
*   `REGISTERED`: The terminal has been successfully registered.
*   `ALREADY_REGISTERED`: The terminal is already registered.

### Success Response Example
```json
{
  "status": "SUCCESS",
  "data": {
    "terminalId": "813ca2cb12ce400405",
    "registrationStatus": "REGISTERED"
  },
  "message": "Terminal registered successfully"
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
**Description:** This error occurs when the request body is malformed or missing required parameters. Ensure that the `registrationIdentifier` is present and valid.

#### 401 - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** This error occurs when the provided API Key or Secret is invalid. Double-check your credentials.

#### 403 - Forbidden
```json
{
  "status": "ERROR",
  "message": "Merchant is not authorized to perform this action."
}
```

**Description:**  The merchant ID might not have permissions to access this resource, or the request is coming from an unauthorized IP address

#### 409 - Conflict
```json
{
  "status": "ERROR",
  "message": "Terminal already registered."
}
```

**Description:** The terminal ID has already been registered to another merchant or store.

#### 500 - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred."
}
```
**Description:**  An internal server error occurred. Please try again later. If the problem persists, contact support.

## Notes
- The `registrationIdentifier` is crucial for identifying the terminal. Make sure to use the correct identifier (6-digit code or serial number depending on the terminal model).
- Ensure your API Key and Secret are valid and associated with the correct Merchant ID.
-  After successful registration, you can use the returned `terminalId` for subsequent API calls related to this terminal.

---
