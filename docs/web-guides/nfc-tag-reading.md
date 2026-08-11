## Overview

The NFC Reading API enables payment terminals to read NFC (RFID) tags attached to physical products. Instead of manually scanning barcodes or keying in item codes, store staff can place tagged items near the terminal and let the reader capture product identifiers automatically. This is useful for retail scenarios involving apparel, electronics, or high-value goods with embedded NFC tags.

## How It Works

1. **Create a session** -- Start a reading session on a terminal, choosing single-tag or multi-tag mode.
2. **Read tags** -- The terminal scans NFC tags as products are presented.
3. **Retrieve results** -- Fetch scanned tags or poll the session status.
4. **Complete the session** -- Close the session when all items have been scanned.

You can also tie NFC reading into the order creation flow by including `readTags` in your order request (covered below).

## Creating a Read Session

Start an NFC reading session on a terminal by specifying the scanning mode.

```
POST /terminals/{terminalId}/sessions
```

**Request:**

```json
{
  "mode": "single"
}
```

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `mode`    | string | Yes      | Number of tags the session can read. Possible values: `single` (one tag only) or `multiple` (continuous reading until completed). |

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "sessionId": "ses_a1b2c3d4e5"
  },
  "message": "Session created successfully"
}
```

| Parameter        | Type   | Description |
|------------------|--------|-------------|
| `status`         | string | `SUCCESS` or `ERROR`. |
| `data.sessionId` | string | Unique identifier for the NFC reading session. Use this ID in all subsequent session calls. |
| `message`        | string | Human-readable description of the result. |

Use `single` mode when scanning one product at a time (e.g., verifying a single item). Use `multiple` mode for basket-scanning workflows where several tagged items need to be captured in one session.

## Fetching Session Status

Check the current state of an NFC reading session to determine whether it is still active, has timed out, or has been completed.

```
GET /terminals/{terminalId}/sessions/{sessionId}/status
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": {
    "sessionStatus": "PENDING",
    "nfcTags": ["dGFnLWRhdGEtYmFzZTY0"]
  },
  "message": "Session status retrieved successfully"
}
```

| Parameter            | Type   | Description |
|----------------------|--------|-------------|
| `status`             | string | `SUCCESS` or `ERROR`. |
| `data.sessionStatus` | string | Current session state. Possible values: `PENDING`, `COMPLETED`, `CANCELLED`, `TIMED_OUT`, `NOT_FOUND`. |
| `data.nfcTags`       | array  | List of NFC tag values read so far (Base64-encoded RFID data). |
| `message`            | string | Human-readable description of the result. |

You can poll this endpoint to build real-time UI updates showing scan progress. The possible `sessionStatus` values are: `PENDING` (terminal still listening), `COMPLETED` (explicitly closed), `CANCELLED` (cancelled early), `TIMED_OUT` (expired), and `NOT_FOUND` (invalid session ID).

## Listing Sessions for a Terminal

Retrieve all NFC reading sessions that have been created on a specific terminal. This is useful for auditing or reviewing past scanning activity.

```
GET /terminals/{terminalId}/sessions
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "sessionId": "ses_a1b2c3d4e5",
      "action": "start",
      "mode": "multiple"
    },
    {
      "sessionId": "ses_f6g7h8i9j0",
      "action": "end",
      "mode": "single"
    }
  ],
  "message": "Sessions retrieved successfully"
}
```

| Parameter        | Type   | Description |
|------------------|--------|-------------|
| `data.sessionId` | string | Unique identifier for the reading session. |
| `data.action`    | string | Stage of the session lifecycle. Possible values: `start`, `end`. |
| `data.mode`      | string | Tag reading mode used. Possible values: `single`, `multiple`. |

## Retrieving Scanned Tags

Fetch all NFC tags that were read during a specific session. Each tag entry includes the session it belongs to and a unique tag identifier.

```
GET /terminals/{terminalId}/sessions/{sessionId}/tags
```

**Response:**

```json
{
  "status": "SUCCESS",
  "data": [
    {
      "sessionId": "ses_a1b2c3d4e5",
      "tagId": "tag_nike_shoe_001"
    },
    {
      "sessionId": "ses_a1b2c3d4e5",
      "tagId": "tag_nike_shoe_002"
    }
  ],
  "message": "Tags retrieved successfully"
}
```

| Parameter        | Type   | Description |
|------------------|--------|-------------|
| `data.sessionId` | string | Session the tag was read under. |
| `data.tagId`     | string | Unique identifier of the scanned NFC tag. |

Use these tag IDs to look up product information in your inventory system and build the order accordingly.

## Completing a Session

When all items have been scanned, explicitly complete the session to stop the terminal from listening for additional tags.

```
POST /terminals/{terminalId}/sessions/{sessionId}/complete
```

**Request:**

```json
{
  "result": "COMPLETED"
}
```

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `result`  | string | No       | Final state of the session. Defaults to `COMPLETED` if omitted. |

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "Session completed successfully"
}
```

Always complete sessions when scanning is finished. Uncompleted sessions eventually time out, but explicit completion frees the terminal for new sessions immediately.

## Combining NFC Reading with Orders

You can integrate NFC tag reading directly into the order creation flow by adding `readTags` to the `controlFunctions` object in your order request. This tells the terminal to perform an NFC read as part of processing the order.

```
POST /orders
```

Include the `readTags` control function alongside your standard order payload:

```json
{
  "terminal$id": "83abab731f6fb00704",
  "orderLines": [
    {
      "id": "0000CHI01",
      "name": "Nike Shoes",
      "quantity": 1,
      "amount": {
        "regular": 500,
        "total": 500,
        "currency": "752"
      }
    }
  ],
  "totalOrderAmount": {
    "regular": 500,
    "total": 500,
    "currency": "752"
  },
  "controlFunctions": {
    "readTags": "SINGLE",
    "initiatePaymentsOptions": {
      "paymentMethod": "CASH"
    }
  }
}
```

The `readTags` field accepts `SINGLE` or `MULTIPLE`, matching the session mode behaviour. The terminal reads tags before or during payment processing, associating scanned items with the order. The response returns the `orderId`, `paymentId`, and an `interAppJWT` for inter-app communication.

## Typical Integration Flow

1. Call `POST /terminals/{terminalId}/sessions` with `mode: "multiple"` to start scanning.
2. Present tagged products to the terminal.
3. Poll `GET .../sessions/{sessionId}/status` until `sessionStatus` is no longer `PENDING`.
4. Call `GET .../sessions/{sessionId}/tags` to get all scanned tag IDs.
5. Map tag IDs to products in your inventory system.
6. Call `POST .../sessions/{sessionId}/complete` to close the session.
7. Create the order using the mapped product data.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create reading session | POST | `/terminals/{terminalId}/sessions` |
| Fetch session status | GET | `/terminals/{terminalId}/sessions/{sessionId}/status` |
| List sessions for terminal | GET | `/terminals/{terminalId}/sessions` |
| Retrieve scanned tags | GET | `/terminals/{terminalId}/sessions/{sessionId}/tags` |
| Complete session | POST | `/terminals/{terminalId}/sessions/{sessionId}/complete` |