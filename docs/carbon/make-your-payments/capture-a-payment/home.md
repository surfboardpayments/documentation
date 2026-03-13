# Capture a Payment

This API is used to finalize a payment that was previously authorized. In a pre-authorization flow, it completes the transaction by capturing the approved amount, and when the delayCapture flag is enabled, it allows the payment to be captured at a later time instead of immediately at authorization.
Here capture a payment is adjusted in two methods as follows

## 1. Create an Order

{% pills tabs=[
  {
    label: "Order with delayCapture true ",
    markdocSrc: "carbon/make-your-payments/capture-a-payment/delay-capture.md"
  },
  {
    label: "Order with both authMode and delay capture",
    markdocSrc: "carbon/make-your-payments/capture-a-payment/authmode-delaycapture.md"
  }
] /%}
