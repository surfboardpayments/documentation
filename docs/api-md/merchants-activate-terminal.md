# Activate Terminal

## Overview
This API is available for partners who manage their own storage and terminal delivery solution and requires a PCI compliant storage setup. The API can be used to activate terminals that are tagged to you as a partner. This API will return an error if the entered serial number is not available to you.

## Prerequisites
- PCI compliant storage setup.
- Partner must manage their own storage and terminal delivery solution.
- The terminal's serial number must be available to the partner.
- Authentication is required using `API-KEY` and `API-SECRET` headers.

## Request

### HTTP Method and URL
```
POST /partners/:partnerId/merchants/:merchantId/ship-hardware
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Request Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| serialNo | String | Yes | Serial No of the terminal. For the SurfPad, you need to use the serial number from the back of the device. With SurfTouch, go to Settings -> Scroll down to 'About phone' -> Serial Number |

### Request Example
```json
{
  "serialNo":"1234567898"
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | String | Status of the terminal activation. |
| message | String | A message that describes the status of the activate terminal request. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Manufactured hardware shipped successfully"
}
```

## Error Responses

### Possible Errors

#### [400] - Invalid Request
```json
{
  "status": "ERROR",
  "message": "Invalid serial number format."
}
```
**Description:** The provided serial number does not conform to the expected format.  Ensure the serial number is a valid string and matches the device's serial number.

#### [403] - Unauthorized
```json
{
  "status": "ERROR",
  "message": "Invalid API Key or Secret."
}
```
**Description:** The API Key or API Secret provided in the headers are invalid.  Ensure that the `API-KEY` and `API-SECRET` headers are correctly set and that you have the appropriate permissions.

#### [404] - Terminal Not Found
```json
{
  "status": "ERROR",
  "message": "Terminal with serial number XXXXXX not found for this partner."
}
```
**Description:** The specified serial number does not exist or is not associated with the partner. Verify the serial number is correct and that the terminal is assigned to your partner account.

#### [500] - Internal Server Error
```json
{
  "status": "ERROR",
  "message": "An unexpected error occurred. Please try again later."
}
```
**Description:** An unexpected error occurred on the server. Try the request again later. If the problem persists, contact support.

## Notes
Ensure your storage setup is PCI compliant before using this API. Double-check the serial number before submitting the request, as incorrect serial numbers will result in errors.
---
