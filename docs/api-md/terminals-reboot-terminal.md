# Reboot Terminal

## Overview
Issue a remote terminal restart command. This endpoint is marked as `comingSoon`.

## Prerequisites
- A registered terminal
- Valid API Key and API Secret
- Terminal must be connected to the network for the reboot command to take effect.

## Request

### HTTP Method and URL
```
POST /terminals/:terminalId/reboot
```

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |
| API-KEY | YOUR_API_KEY | Yes |
| API-SECRET | YOUR_API_SECRET | Yes |

### Query Parameters
N/A

### Request Body Parameters
N/A

### Request Example
```json
{
}
```

## Response

### Response Parameters
| Parameter | Type | Description |
|---|---|---|
| status | string | Status of the remote reboot command indicated as either 'SUCCESS' or 'ERROR'. This status does not necessarily mean that the terminal has rebooted. The status depends on whether there are other commands in progress in the terminal and if the terminal is connected to the network. |
| message | string | A message that describes the status of the reboot request. For a successful request this will be 'Reboot command published successfully'. |

### Success Response Example
```json
{
	"status": "SUCCESS",
	"message": "Reboot command published successfully"
}
```

## Error Responses

N/A (No specific error responses provided in the JSON)

## Notes
- This endpoint is marked as `comingSoon`.
- The `status` in the response only indicates whether the command was successfully published, not whether the terminal actually rebooted.
- The terminal must be connected to the network for the reboot command to take effect. The success of the command also depends on whether there are other commands in progress in the terminal.

---
