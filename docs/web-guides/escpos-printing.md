# ESC/POS Printing

Send custom ESC/POS receipts to any Surfboard terminal using the UTF-8 contract: opt in with one field, get validated payloads and consistent output across current and legacy hardware.

Source: https://www.surfboardpayments.com/developers/guides/escpos-printing
Category: in-store
Tags: In-Store, API, Receipts, Printing, ESC/POS, UTF-8

---
## Overview

Surfboard is standardising ESC/POS printing across every payment terminal. You opt in by adding a single field to the print request you already send. In return, your payload is validated before it reaches hardware -- so you get a clear API error instead of a garbled receipt -- and the output is adapted automatically to every terminal model, current and legacy.

The opt-in is deliberately small. The work is in the rules the contract enforces, which this guide covers: UTF-8 text, a fixed set of supported commands, and line widths that depend on the text size you select.

> **Note:** This guide covers the ESC/POS contract specifically. For the other ways to deliver a receipt -- email, hosted link, or Surfboard's own templates -- see the [Receipts](/developers/guides/receipts) guide.

## Prerequisites

- A Surfboard developer account with valid API credentials (`API-KEY` and `API-SECRET`)
- A registered terminal with printing capability (SurfTouch with dock, or SurfPrint)
- The terminal's `terminalId`

## Opting in

Add `codePages` to your existing ESC/POS request:

```
PUT /receipts/{terminalId}/escpos
```

**Request body:**

```json
{
  "escposCommands": "<base64 ESC/POS>",
  "codePages": "UTF-8"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `escposCommands` | string | Yes | Your ESC/POS byte stream, Base64-encoded. |
| `codePages` | string | No | `UTF-8` is the only accepted value. Omitting it keeps the legacy flow. |

Note that this endpoint takes a `terminalId` in the path, not a transaction or order ID.

Three things follow from opting in:

- **Validation is atomic.** An invalid stream is rejected whole with `PR_0006`, quoting the byte offset and the offending command. Nothing partial ever prints.
- **Request bodies cap at 75 KB**, which is roughly 55 KB of decoded ESC/POS.
- **The legacy flow is deprecated** and will be removed once migration completes. Omitting `codePages` keeps you on it for now.

## Character encoding

All text must be UTF-8. Do not send Latin-1 or CP1252 bytes, and do not send any codepage or charset selection command -- the platform manages character encoding per device, which is precisely what makes one payload work across mixed hardware.

The quickest way to confirm your encoding is to check a single character. `ä` must be two bytes:

```
ä  =  C3 A4     ✅ UTF-8
ä  =  E4        ❌ Latin-1, will be rejected
```

For reference, the Nordic characters most likely to appear on a receipt:

| Lowercase | UTF-8 bytes | Uppercase | UTF-8 bytes |
|---|---|---|---|
| `ä` | `C3 A4` | `Ä` | `C3 84` |
| `å` | `C3 A5` | `Å` | `C3 85` |
| `ö` | `C3 B6` | `Ö` | `C3 96` |

If you are migrating from a charset-based integration, translate national characters to their real UTF-8 form rather than relying on the old substitutions -- `{` meaning `ä`, `}` meaning `å`, and so on. Those substitutions depended on a charset command that is no longer accepted.

## Line widths

Line width depends on the terminal's paper and on the text size active at that point in the stream. Count characters, not bytes: `Örsundsbro väg 1` is 16 characters even though it is 18 bytes.

| Context | Payment terminals (58mm) | Printer terminals (80mm) |
|---|---|---|
| Normal text (Font A) | **32** | **48** |
| Fine print (Font B) | **42** | -- |
| Big text (2×) | **16** | **24** |
| Biggest text (3×) | **10** | **16** |

Lines longer than the budget wrap mid-word, which is almost never what you want on a receipt. Because the fonts are monospace, align columns by padding with spaces rather than tabs.

Images are capped at **384 dots wide on every device**, regardless of paper width.

## Supported commands

| Purpose | Command | Bytes (hex) | Notes |
|---|---|---|---|
| Initialise | `ESC @` | `1B 40` | Required as the first bytes of every job |
| Line feed | `LF` | `0A` | Ends and prints a line |
| Feed n lines | `ESC d n` | `1B 64 n` | Use `1B 64 04` at the end so the receipt clears the tear bar |
| Paper cut | `GS V 0` | `1D 56 00` | Cuts on 80mm printer terminals; safely ignored on handheld terminals, which have no cutter. `1D 56 42 n` (feed-then-cut) also accepted |
| Bold on/off | `ESC ! 08` / `ESC ! 00` | `1B 21 08` / `1B 21 00` | `ESC E 1` / `ESC E 0` (`1B 45 n`) also accepted. One bold level only |
| Fine print (Font B) | `ESC ! 01` / `ESC ! 00` | `1B 21 01` / `1B 21 00` | `ESC M n` (`1B 4D n`) also accepted |
| Bold + Font B | `ESC ! 09` | `1B 21 09` | `ESC !` bits: `0x01` Font B, `0x08` bold |
| Text size | `GS ! n` | `1D 21 00` / `1D 21 11` / `1D 21 22` | Normal / Big (2×) / Biggest (3×) |
| Underline on/off | `ESC - 1` / `ESC - 0` | `1B 2D n` | Renders on current terminals; legacy prints the text without the underline. Send *after* any `ESC !` on the same line |
| Alignment | `ESC a n` | `1B 61 00/01/02` | Left / centre / right. Text only -- images always print left-aligned |
| Line spacing | `ESC 3 24` / `ESC 2` | `1B 33 18` / `1B 32` | For wrapping image stripes only |
| QR code | `GS ( k` | see below | The only QR method |
| Image / logo | `ESC *` mode 33 | see below | The only image format |

Two rules are worth stating separately, because they are the ones existing integrations most often break:

- **Size is set only via `GS !`**, never via the size bits of `ESC !`. Nothing above `GS ! 22` is accepted.
- **Anything not in the table above is rejected.** That includes `GS v 0` (raster images), `ESC t` / `ESC u` / `ESC R` (charset selection), `GS B` (reverse print), and any unknown command. These can corrupt or damage terminals, so the API blocks them before they reach hardware.

## QR codes

Send the data as a string and let the terminal render it. Five commands, in order:

```
1D 28 6B 04 00 31 41 32 00              # model 2
1D 28 6B 03 00 31 43 06                 # module size: 6 dots (1-16)
1D 28 6B 03 00 31 45 31                 # error correction: 30=L 31=M 32=Q 33=H
1D 28 6B pL pH 31 50 30 <data bytes>    # store data; pL + pH*256 = len(data) + 3
1D 28 6B 03 00 31 51 30                 # print
```

The only part that varies is the fourth line's length prefix. For 20 bytes of data, `pL + pH*256` is 23, so `pL = 17` (hex) and `pH = 00`.

## Images and logos

Monochrome only, maximum 384 dots wide. Encode the image as 24-dot-tall horizontal stripes in column format:

```
1B 33 18                                # line spacing = 24 dots, so stripes butt together
for each 24-row stripe:
  1B 2A 21 nL nH <data>                 # nL + nH*256 = width in dots; data = width × 3 bytes
  0A                                    # LF after each stripe
1B 32                                   # restore default line spacing
```

In column format each of the `width` columns contributes 3 bytes, making 24 vertical dots, with the most significant bit at the top. Pixel `(x, y)` within a stripe lives in byte `x*3 + y/8` at bit `7 - y%8`.

Images always print left-aligned, so `ESC a` will not centre them. To centre one, prepend blank columns: `pad = (384 - width) / 2`.

## A complete receipt

This builds a 259-byte receipt with real Swedish characters, correct column alignment, and a fine-print tax line. Every line is inside its budget for the size active on it.

```python
ESC, GS = 0x1B, 0x1D
out = bytearray()
raw = out.extend
txt = lambda s: out.extend(s.encode("utf-8"))

raw(bytes([ESC, 0x40]))              # init
raw(bytes([ESC, 0x61, 0x01]))        # centre
raw(bytes([GS, 0x21, 0x11]))         # big (2x)
raw(bytes([ESC, 0x21, 0x08]))        # bold
txt("Kaffebaren\n")                  # 10 chars, budget 16 at 2x
raw(bytes([GS, 0x21, 0x00]))         # size back to normal
raw(bytes([ESC, 0x21, 0x00]))        # style off
txt("Örsundsbro väg 1\n")            # 16 chars, budget 32
raw(bytes([ESC, 0x61, 0x00]))        # left
txt("-" * 32 + "\n")
txt(f"{'Bryggkaffe':<26}{'29,00':>6}\n")
txt(f"{'Kanelbulle':<26}{'35,00':>6}\n")
txt("-" * 32 + "\n")
raw(bytes([ESC, 0x21, 0x08]))        # bold
txt(f"{'Totalt':<22}{'64,00 SEK':>10}\n")
raw(bytes([ESC, 0x21, 0x00]))
raw(bytes([ESC, 0x21, 0x01]))        # fine print (Font B, 42 cols)
txt("Moms 12% ingår med 6,86 SEK\n")
raw(bytes([ESC, 0x21, 0x00]))
raw(bytes([ESC, 0x64, 0x04]))        # feed out past the tear bar

import base64
print(base64.b64encode(bytes(out)).decode())
```

Which prints as (the first line is double-width, so its ten characters occupy twenty of the thirty-two columns):

```
      Kaffebaren
        Örsundsbro väg 1
--------------------------------
Bryggkaffe                 29,00
Kanelbulle                 35,00
--------------------------------
Totalt                 64,00 SEK
Moms 12% ingår med 6,86 SEK
```

And sends as:

```json
{
  "escposCommands": "G0AbYQEdIREbIQhLYWZmZWJhcmVuCh0hABshAMOWcnN1bmRzYnJvIHbDpGcgMQobYQAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpCcnlnZ2thZmZlICAgICAgICAgICAgICAgICAyOSwwMApLYW5lbGJ1bGxlICAgICAgICAgICAgICAgICAzNSwwMAotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQobIQhUb3RhbHQgICAgICAgICAgICAgICAgIDY0LDAwIFNFSwobIQAbIQFNb21zIDEyJSBpbmfDpXIgbWVkIDYsODYgU0VLChshABtkBA==",
  "codePages": "UTF-8"
}
```

**Response:**

```json
{
  "status": "SUCCESS",
  "message": "ESC/POS receipt sent to terminal"
}
```

## Validating before you send

`PR_0006` tells you exactly what is wrong, but catching it in your own test suite is faster than catching it against a terminal. This preflight checks the three things that actually break integrations -- an out-of-contract command, non-UTF-8 text, and an over-long line:

```python
ESC, GS, LF = 0x1B, 0x1D, 0x0A
WIDTH = {0x00: 32, 0x11: 16, 0x22: 10}   # GS ! n -> chars per line, 58mm Font A
SKIP  = {0x40: 2, 0x64: 3, 0x61: 3, 0x21: 3, 0x45: 3, 0x4D: 3, 0x2D: 3, 0x33: 3, 0x32: 2}

def preflight(data):
    errs, i, size, font_b, line, start = [], 0, 0x00, False, bytearray(), 0
    if data[:2] != bytes([ESC, 0x40]):
        errs.append("stream must begin with ESC @ (1B 40)")
    while i < len(data):
        b = data[i]
        if b == LF:
            if line:
                try:
                    s = line.decode("utf-8")
                    budget = 42 if (font_b and size == 0x00) else WIDTH[size]
                    if len(s) > budget:
                        errs.append(f"byte {start}: {len(s)} chars exceeds {budget}: {s!r}")
                except UnicodeDecodeError:
                    errs.append(f"byte {start}: line is not valid UTF-8")
            line, i = bytearray(), i + 1
            continue
        if b == ESC and data[i+1] in SKIP:
            n = data[i+1]
            if n == 0x21:
                if data[i+2] & ~0x09:
                    errs.append(f"byte {i}: ESC ! sets size bits; use GS ! for size")
                font_b = bool(data[i+2] & 0x01)
            i += SKIP[n]
            continue
        if b == GS and data[i+1] == 0x21:
            if data[i+2] not in WIDTH:
                errs.append(f"byte {i}: GS ! {data[i+2]:02X} must be 00, 11 or 22")
            else:
                size = data[i+2]
            i += 3
            continue
        if b in (ESC, GS):
            errs.append(f"byte {i}: unsupported command {b:02X} {data[i+1]:02X}")
            i += 2
            continue
        if not line:
            start = i
        line.append(b)
        i += 1
    return errs
```

Handle `ESC *` images, `GS ( k` QR blocks, and `GS V` cuts before this runs, or extend it to skip over them -- their payloads contain arbitrary bytes that would otherwise be read as text.

## Errors

| Code | Meaning | Action |
|---|---|---|
| `PR_0006` | Out-of-contract command. The message names the command, its byte offset, and what to use instead: `unsupported ESC/POS command 1D 76 at byte offset 214` | Replace the command. `1D 76` is raster imaging -- use `ESC *` mode 33 |
| `codePages must be 'UTF-8' when provided` | Wrong opt-in value | Send exactly `"UTF-8"` |

> **Note:** Because validation is atomic, a `PR_0006` means nothing printed at all. There is no half-receipt to clear from the printer.

## Migration checklist

- [ ] Add `"codePages": "UTF-8"` to your print requests
- [ ] Encode all text as UTF-8 -- test that `ä` is two bytes (`C3 A4`), not one (`E4`)
- [ ] Remove charset commands (`ESC t`, `ESC u`, `ESC R`) and translate national characters to real UTF-8
- [ ] Replace `GS v 0` raster images with `ESC *` mode 33 stripes
- [ ] Keep `GS V 0` and `GS V 66 n` cuts; remove any other cut variant (`ESC i`, `ESC m`)
- [ ] Set size only with `GS ! 00`, `11`, or `22`, and respect the width for each
- [ ] Format normal-text lines to 32 characters
- [ ] End every job with `ESC d 4` so the receipt clears the tear bar

> **Tip:** Generic ESC/POS libraries are a common source of rejections, because their defaults often emit raster images and charset commands. Check what your library actually produces before assuming it is in contract -- the preflight above will tell you.

## API Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Print custom ESC/POS receipt | PUT | `/receipts/{terminalId}/escpos` |

For the full endpoint reference, see the [Receipts API](https://developers.surfboardpayments.com/api/receipts) documentation. For the other receipt delivery methods, see the [Receipts](/developers/guides/receipts) guide.
