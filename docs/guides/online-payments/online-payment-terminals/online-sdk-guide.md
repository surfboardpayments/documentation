---
title: "Online SDK (Self Hosted Page)"
description: "How to integrate and use the Surfboard Online SDK for self-hosted payment pages."
category: "Online Payments"
path: "/guides/online-payments/online-payment-terminals/online-sdk-guide.md"
---

# Online SDK (Self Hosted Page)

## Introduction

Surfboard's online payment solution comes in three different modes tailored to meet your diverse business needs:

1. **Payment Page**
2. **online SDK (Self Hosted Page)**
3. **Merchant Initiated**

online SDK (Self Hosted Page) is one of these modes where Surfboard renders fields on your web-shop page, providing you with the flexibility to customise the layout any way you want.

{% callout type="note" label="Note" %}
To know more about our online payment terminals available refer to the [online guide](/guides/online-payments/online-payment-terminals/home).
{% /callout %}

The following guide applies only to the online SDK (Self Hosted Page) flow.

## Initialising the SDK

To initialise the SDK, you will need following three params:

1. **`publicKey`**: This is provided as part of the terminal registration process and is used for all calls for that terminal
   {% callout type="note" label="Tip" %}
   You can also retrieve the terminal's public key later using the [Fetch Terminal by ID API](/api/terminals?lang=cURL#Fetch-Terminal-by-ID). The public key is returned as `terminalPublicKey` in the API response.
   {% /callout %}
2. **`orderId`**: This is received as a response to the [**createOrderRequest**](api/orders)
3. **`nonce`**: This is received as a response to the createOrderRequest and is important as it serves as the access control for the APIs needed to complete the payment.

Once you have the three params, you can initialise the SDK with the following code. This returns a promise which you can await if you have an async method

```jsx
SurfboardOnlineSDK.errorCallback((code, message) => {
    console.log("Entered the callback here");
    console.error(code, message);
});

SurfboardOnlineSDK.paymentStatusCallback = function (data) {
    // Your payment status handling function here
    // structure of data
    //{
    // paymentStatus: 'PAYMENT_INITIATED'|'PAYMENT_CANCELLED' | 'PAYMENT_COMPLETED' | 'PAYMENT_FAILED' | 'PAYMENT_PROCESSING' | 'PAYMENT_PROCESSED',
    // failureReason? : string
    // }
};

SurfboardOnlineSDK.initialiseOnlineSDK({
    publicKey: "", //Your public key
    orderId: "", //Include the orderId
    nonce: "", //Include the nonce
});

SurfboardOnlineSDK.remountOnlineSDK({
    publicKey: "", // Your public key
    orderId: "", // New orderId
    nonce: "", // New nonce
});
```

The **`errorCallback`** function that you provide will notify you of the various error cases as it occurs. Any error that occurs as part of the initialisation is usually a terminal error. Refer to the error table below to identify the error type.

The **`paymentStatusCallback`** is used to list the changes in paymentStatus and can be listened to handle UI changes accordingly

The **`SurfboardOnlineSDK.remountOnlineSDK`** method re-initializes the SDK for a different order (for example, if the customer changes their cart or you want to start a new payment). This method takes the same parameters as `initialiseOnlineSDK` and allows you to dynamically update the SDK context without a full page reload.

### Error codes

When the SDK is initialised, it could either complete successfully or run into one of the following errors:

| **Error Code** | **Error Message**                                      | **Explanation**                                                                                                                                      | **Error Category** |
| -------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
|                | Surfboard SDK cannot function in the given environment | The Online SDK cannot function in this environment. This can occur if the code is executed in Node and also in certain headless browser environments | FATAL              |
|                | Surfboard SDK initialisation failed                    | The required params are not present                                                                                                                  | FATAL              |
|                | Public key validation failed                           | The provided publicKey is not valid                                                                                                                  | FATAL              |
|                | Invalid Order ID                                       | The provided orderId is not valid                                                                                                                    | FATAL              |
|                | Invalid Nonce                                          | The provided nonce is not valid                                                                                                                      | FATAL              |
| 401            | Invalid or Expired Link. Cannot proceed                | The backend has declined to proceed with the order. This could be because of several reasons.                                                        | FATAL              |

### Data Objects

If none of the errors are encountered, you would have the following interfaces exposed on the **`SurfboardOnlineSDK`** window object:

1. Orders
2. Merchant
3. Branding
4. Store
5. Payment methods
6. Customer info

```jsx
order: {
        order: {
                orderId: string;
            terminalId: string;
            billingAddress: IAddress;
            orderStatus: string;
            orderDate: string;
            memberId: string;
            totalOrderPriceValue: string;
            totalOrderPriceCurrency: string;
            memberEmail: string;
            memberPhone: {
                    countryCode: string;
                    number: string;
            };
            referenceId: string;
            orderLines: [{
                    externalItemId: string;
                    gtin: string;
                    brand: string;
                    itemPrice: {
                        value: string;
                        currency: string;
                        campaign: string;
                        regular: string;
                        tax: [{
                                    type: 'VAT';
                                    percentage: number;
                                    amount: number;
                        }];
                    };
                    itemId: string;
                    quantity: number;
                    unit: string;
                    name: string;
                    description?: string;
                    imageUrl?: string;
            }];
            tax: ITax[];
        },
        addCustomerInformation: (customerDetails) => Promise<boolean>,
        initiatePayments: paymentMethod => Promise<PaymentAttempt | Error>
}

interface IAddress {
    addressId?: string;
    careOf?: string;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    city: string;
    countryCode: string;
    postalCode: string;
}

interface ITax {
    type: 'VAT';
    percentage: number;
    amount: number;
}

```

```jsx
merchant: {
    name: string;
    organizationNumber: string;
}
```

```jsx
branding: {
    backgroundColor: string; // '#ffffff'
    brandColor: string;
    accentColor: string;
    rectShape: "EDGY" | "ROUNDED" | "PILL";
    fontType: "serif" | "sans-serif" | "monospace";
    logoUrl: string;
    iconUrl: string;
}
```

```jsx
store: {
        name: string;
    phoneNumber: {
            countryCode: string;
            number: string;
    };
    email: string;
    address: {
            addressId?: string;
            careOf?: string;
            addressLine1?: string;
            addressLine2?: string;
            addressLine3?: string;
            city?: string;
            countryCode?: string;
            postalCode?: string;
        };
    privacyPolicyUrl: string;
    termAndConditionUrl: string;
}

```

```jsx
paymentMethods: {
        supportedPaymentMethods: Array<IPaymentMethods>;
    lockToPaymentMethods: Array<IPaymentMethods> | null;
}

```

```jsx
customer: {
        name?: string;
    email?: string;
    phone?: ICustomerPhone;
    orderBillingAddress?: {
            addressId?: string;
            careOf?: string;
            addressLine1?: string;
            addressLine2?: string;
            addressLine3?: string;
            city?: string;
            countryCode?: string;
            postalCode?: string;
        };
    customerId?: string;
    savedCards?: ISavedCard[];
    savedAddresses?: {
            addressId?: string;
            careOf?: string;
            addressLine1?: string;
            addressLine2?: string;
            addressLine3?: string;
            city?: string;
            countryCode?: string;
            postalCode?: string;
        }[];
}

interface ICustomerPhone {
    countryCode: string;
    number: string;
}

```

You can use the data provided here to display the required information on the web checkout.

{% callout type="important" label="Important" %}
It is mandatory for you to display the contact information, privacy policy and the terms and conditions on the payment page.
{% /callout %}

## **Payment Flow**

Almost all payment methods require you to provide customer information if it is not already present as part of creating the order.

### Updating Customer Information

When handling online payments via the SDK, it is vital to include specific customer information for the payment. This customer information can be provided via the SDK or through the address field while creating the order. The following are the mandatory customer information for each payment method,

| **Payment Method** | **Mandatory Fields**                                         |
| ------------------ | ------------------------------------------------------------ |
| Card Payments      | Email, Phone, Address                                        |
| Klarna             | Email, Phone, Address, Shipping Address (for physical goods) |
| Apple pay          | Email, Name, Phone, PostalAddress                            |

To update the customer information you can use the following code:

```jsx
SurfboardOnlineSDK.order.addCustomerInformation(customerDetails)

// Structure of customer details
{
        name?: string;
    email?: string;
    phone?: {
            countryCode: string;
            number: string;
    };
    billingAddress?:  {
            addressId?: string;
            careOf?: string;
            addressLine1?: string;
            addressLine2?: string;
            addressLine3?: string;
            city?: string;
            countryCode?: string;
            postalCode?: string;
        };
}

```

{% callout type="important" label="Important" %}
Please note that the customer's address is mandatory for card payments due to requirements from the payment schemes and acquirers we follow. We recommend that, whenever you have the address, you include it in the API request when creating the order. This way, the address will be pre-filled and displayed to the customer, eliminating the need for them to enter it manually.
{% /callout %}

In case the customer details update fails for any reason, the following error code is returned

| **Error Code** | **Message**                        | **Description**               | **Error Category** |
| -------------- | ---------------------------------- | ----------------------------- | ------------------ |
| ON_008         | Customer Information update failed | The backend returned an error | Non Fatal          |

## Initiating the Payment

Payments can be initiated for the following methods:

1. Swish payments
2. Card payments
3. Apple pay
4. Klarna

### Swish Payments

Swish payment involves customers making the payment in their swish app. For mobile devices, the customer will be automatically redirected to the Swish app, complete the transaction, and then redirected to your application. For web payments, the customer will need to scan the displayed QR code using the Swish app and complete the payment.

To initiate a Swish payment, you can use the following code:

```jsx
// Initiate the payment
const paymentAttempt = await SurfboardOnlineSDK.order.initiatePayments("NSWISH");
```

This will generate a payment attempt object that provides the following utility methods:

```jsx
getPaymentStatus(); // Returns the last known payment status {paymentStatus: PAYMENT_STATUS}
getSwishAppRedirectUrl; // Provides the URL to redirect the customer to the Swish app
getSwishQRData; // Returns the QR code data to display for the customer to scan
```

**`getSwishAppRedirectUrl(callback?: string)`** returns the URL to redirect the customer to the Swish app on mobile devices. When calling this method, make sure to provide a callback URL where the Swish app should redirect the customer after the payment is complete.

**`getSwishQRData`** returns the QR code data to display on the web for the customer to scan and complete the payment.

The **`paymentStatusCallback`** will return the change in payment status's as it happens.

### Card Payments

To process card payments with the SDK, you need to provide a mount point for the SDK to load the fields. The SDK provides various options for how these fields are displayed, and you control this through configuration passed during mounting.

Here's how you can create a mount point:

1. In your web page, add a **`div`** element that will hold the card input fields:

    ```html
    <div id="card-details"></div>
    ```

2. Call the mount function by passing in the relevant containers

    ```jsx
    SurfboardOnlineSDK.mount({
        mountCardWidget: "card-details",
        mountApplePayWidget: "apple-pay-button",
    });
    ```

3. The SDK will use this container to load and display the card fields when you initialise it.

### Apple Pay

To process Apple pay with the SDK you need to provide a mount point in your HTML and call the **`SurfboardOnlineSDK.mount()`** function as follows

```html
<div id="apple-pay"></div>
```

```jsx
SurfboardOnlineSDK.mount({
    mountApplePayWidget: "apple-pay",
});
```

This renders the Apple Pay button which handles the payment .

### Apple Pay Additional Setup

For Apple Pay to work, you must set up the domain association file correctly.

**Apple Pay Domain Association File Setup**

1. Download/Copy the domain association file
2. Host it on each domain/subdomain you want to use Apple Pay on
3. Use the exact filename: `apple-developer-merchantid-domain-association`
4. Place it in the `/.well-known/` directory

**File requirements**

-   Content-Type must be `text/plain`
-   Must be publicly accessible
-   No password protection
-   No proxy or redirects

The file needs to be accessible at this exact location for Apple Pay verification to work properly.

Besides this, you need to host the following content, click **[here](https://firebasestorage.googleapis.com/v0/b/firebase-test-2e49.appspot.com/o/online-docs%2Fhost.txt?alt=media&token=a83e08cf-e178-4052-8829-dc9c7df414e5)**

You do not need to have a separate initiatePayments call as payment initiation is handled automatically when people press the Apple Pay button.

You can wait for the response in **`paymentStatusCallback`** function to check the payment status.

### Klarna

To initiate a KLARNA, make sure you update the required customer information as following example

```jsx
SurfboardOnlineSDK.order.addCustomerInformation({
    phone: { countryCode: "+46", number: "701740615" },
    name: "customer name",
    email: "customer@email.se",
    billingAddress: {
        city: "Stockholm",
        postalCode: "60320",
        countryCode: "SE",
        addressLine1: "16th Süxtreet",
    },
});
```

You can then initiate the KLARNA payment simply using

```jsx
SurfboardOnlineSDK.order.initiatePayments("KLARNA");
```

The payment status can be tracked using **`paymentStatusCallback`** function.

### Error Codes

During this process you might face the following errorCodes

| **Error Code** | **Message**                                                     | **Description**                                                                                                                                                                                                                                                                                                       | **Error Category** |
| -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| ON_009         | Phone number is a required parameter to perform a swish payment | The customer phone number is not set for this Payments                                                                                                                                                                                                                                                                | Non Fatal          |
| ON_010         | This payment method is not supported for this payment           | The provided payment method is not available for the particular order                                                                                                                                                                                                                                                 | Non Fatal          |
| ON_011         | This payment is already completed                               | The payment is completed and cannot be proceeded further. The payment might be successful, cancelled or failed                                                                                                                                                                                                        | Non Fatal          |
| ON_012         | An error occured while initiating payments. Please try again    | This usually means there is an error from the backend due to various reasons. You can build in a limited number of retry attempts on your side                                                                                                                                                                        | Non Fatal          |
| ON_013         | 'Unknown Error. Please try again’                               | This usually means the SDK is unable to initiate the payment. Retries would generally not solve it. Reloading the page might help.                                                                                                                                                                                    | Non Fatal          |
| ON_014         | Maximum Checks Exceeded. Please refresh Page                    | The payment page is set to check the status every 1.5secs via polling. The SDK polls for a total of 300 counts. If this limit is exceeded before the payment being completed, the following error occurs. In most cases, this means the payment is either cancelled or completed. It is suggested to refresh the page | Non Fatal          |
| ON_015         | Payment Status cannot be fetched currently. Please Try Again    | As part of continuous polling, if more than 10 status checks fail continually, then this error is returned. This is usually a problem with the backend system being down or non-responsive and cannot be solved on the customer end.                                                                                  | Non Fatal          |
| ON_016         | Invalid Card Details                                            | Card details are invalid. Customer needs to update the information                                                                                                                                                                                                                                                    | Non Fatal          |
| ON_017         | Email is a required parameter to perform this payment           | Customer needs to update the email                                                                                                                                                                                                                                                                                    | Non Fatal          |
| ON_018         | Billing Address is a required Parameter to perform this payment | Customer needs to update the billing address                                                                                                                                                                                                                                                                          | Non Fatal          |

### Sample code

An example webpage with the Surfboard online SDK loaded

```json
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!--
            TODO: Review and tighten Content Security Policy
            Current policy is very permissive and should be adjusted for production use
        -->
        <meta
            http-equiv="Content-Security-Policy"
            content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src * threeds.beta.surfboard.se; style-src * 'unsafe-inline';"
        />
        <!-- TODO: Replace with specific Surfboard SDK URL -->
        <script src="{{YOUR_SURFBOARD_SDK_URL}}"></script>
        <title>Web Testing - Surfboard SDK</title>
        <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.0/dist/tailwind.min.css"
            rel="stylesheet"
        />
    </head>
     <body class="bg-gray-900 text-blue-300 min-h-screen flex items-center p-4">
        <!-- Main content wrapper -->
        <div class="w-full max-w-lg mx-auto space-y-6">
            <!-- Header section -->
            <div class="text-center">
                <h1 class="text-3xl font-bold">Payment Selection</h1>
                <p class="text-gray-400">Choose your preferred payment method</p>
            </div>

            <!-- Payment selection section -->
            <div id="payment-selection" class="space-y-4">
                <!-- Error message container (hidden by default) -->
                <div id="error-message" class="hidden bg-red-500 text-white p-4 rounded-lg">
                    <div class="flex justify-between items-center">
                        <span id="error-message-span">Error Occurred</span>
                        <button id="close-error-message" class="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Payment method buttons -->
                <div id="card-details" class="w-full"></div>
                <div class="space-y-4">
                    <div id="pay-with-card" class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span>Pay with Card</span>
                    </div>
                    <div id="apple-pay" class="w-full h-10"></div>
                    <div id="google-pay" class="w-full h-10"></div>
                    <div id="pay-with-klarna" class="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                        <span>Pay with Klarna</span>
                    </div>
                </div>
            </div>

            <!-- Success message container (hidden by default) -->
            <div id="success-message" class="hidden bg-green-500 text-white p-4 rounded-lg">
                <span id="success-message-span">Success!</span>
            </div>

            <!-- Payment error message container (hidden by default) -->
            <div id="payment-error-message" class="hidden bg-red-500 text-white p-4 rounded-lg">
                <span id="payment-error-message-span">Payment Failed</span>
            </div>

            <!-- Logs UI section -->
            <div class="bg-gray-800 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-xl font-bold">Logs</h2>
                    <div class="space-x-2">
                        <button id="copyLogs" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
                            Copy Logs
                        </button>
                        <button id="clearLogs" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
                            Clear Logs
                        </button>
                    </div>
                </div>
                <div class="bg-gray-700 rounded-lg p-2 h-60 overflow-auto">
                    <div id="logs" class="w-full"></div>
                </div>
            </div>

            <!-- Customer details update section -->
            <div class="bg-gray-800 border-2 border-gray-300 rounded-lg p-2">
                <button id="customer-dropdown-button" class="w-full text-left bg-gray-700 hover:bg-gray-600 p-2 rounded-lg flex justify-between items-center">
                    <span>Update Customer Details</span>
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div id="customer-dropdown" class="hidden mt-2 space-y-4">
                    <!-- Customer details form -->
                    <div id="customer-details-form" class="space-y-4">
                        <!-- Form fields for email, phone, and address -->
                        <div>
                            <label for="customer-email" class="block text-sm font-medium text-gray-300">Email</label>
                            <input type="email" id="customer-email" name="customer-email" placeholder="your@email.com" class="mt-1 w-full bg-gray-700 border-gray-600 rounded-lg p-2">
                        </div>
                        <div>
                            <label for="customer-phone" class="block text-sm font-medium text-gray-300">Phone Number</label>
                            <div class="flex mt-1 space-x-2">
                                <input type="text" id="customer-phone-country-code" name="customer-phone-country-code" placeholder="+1" maxlength="3" class="w-1/4 bg-gray-700 border-gray-600 rounded-lg p-2">
                                <input type="tel" id="customer-phone-number" name="customer-phone-number" placeholder="Phone Number" class="w-3/4 bg-gray-700 border-gray-600 rounded-lg p-2">
                            </div>
                        </div>
                        <div>
                            <label for="customer-address-country-code" class="block text-sm font-medium text-gray-300">Address</label>
                            <div class="flex mt-1 space-x-2">
                                <input type="text" id="customer-address-country-code" name="customer-address-country-code" placeholder="Country Code" maxlength="3" class="w-1/4 bg-gray-700 border-gray-600 rounded-lg p-2">
                                <input type="text" id="customer-address-line-1" name="customer-address-line-1" placeholder="Address Line 1" class="w-3/4 bg-gray-700 border-gray-600 rounded-lg p-2">
                            </div>
                            <div class="flex mt-2 space-x-2">
                                <input type="text" id="customer-address-city" name="customer-address-city" placeholder="City" class="w-1/2 bg-gray-700 border-gray-600 rounded-lg p-2">
                                <input type="text" id="customer-address-postal-code" name="customer-address-postal-code" placeholder="Postal Code" class="w-1/2 bg-gray-700 border-gray-600 rounded-lg p-2">
                            </div>
                        </div>
                        <button id="update-customer-details" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 px-4">
                            Update Customer Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <script>
        /**
         * Fetches the Surfboard SDK with retry mechanism
         * @param {number} maxRetries - Maximum number of retries
         * @param {number} retryDelay - Delay between retries in milliseconds
         * @returns {Promise} - Resolves with SurfboardOnlineSDK or rejects after max retries
         */
        function fetchSurfboardSDK(maxRetries = 10, retryDelay = 500) {
            return new Promise((resolve, reject) => {
                let retryCount = 0;
                function checkAvailability() {
                    if (typeof SurfboardOnlineSDK !== 'undefined') {
                        resolve(SurfboardOnlineSDK);
                    } else {
                        retryCount++;
                        if (retryCount <= maxRetries) {
                            setTimeout(checkAvailability, retryDelay);
                        } else {
                            reject(
                                new Error(
                                    'SurfboardOnlineSDK is not available after maximum retries.',
                                ),
                            );
                        }
                    }
                }

                checkAvailability();
            });
        }

        // Extract order ID and nonce from URL parameters
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const orderId = urlParams.get('o');
        const nonce = urlParams.get('n') || urlParams.get('pi');
        console.log({ orderId, nonce });

        // Fetch Surfboard SDK
        fetchSurfboardSDK();

        // Set up error callback for Surfboard SDK
        SurfboardOnlineSDK.errorCallback((code, message) => {
            console.log(code, message);
            // Display error message to the user
            const errorMessage = document.getElementById('error-message');
            errorMessage.classList.remove('hidden');
            errorMessage.querySelector(
                '#error-message-span',
            ).textContent = `Error Occurred [${code}]: ${message}`;
            setTimeout(() => {
                errorMessage.querySelector('#close-error-message').click();
            }, 5000);
        });

        // Add click event listener to close error message
        document
            .getElementById('close-error-message')
            .addEventListener('click', () => {
                document
                    .getElementById('error-message')
                    .classList.add('hidden');
                errorMessage.querySelector('#error-message-span').textContent =
                    '';
            });

        // Set up custom console.log to display logs in UI
        const logs = document.getElementById('logs');
        const originalLog = console.log;
        console.log = (...args) => {
            const el = document.createElement('div');
            el.classList.add('text-sm', 'text-gray-500');
            args = [`${new Date().toLocaleString()}`, ...args];
            el.textContent = args.join(' ');
            logs.appendChild(el);
            originalLog(...args);
        };

        // Add click event listener for payment buttons
        document
            .getElementById('pay-with-card')
            .addEventListener('click', (event) => {
                event.preventDefault();
                SurfboardOnlineSDK.order.initiatePayments('CARD');
            });

        document
            .getElementById('pay-with-klarna')
            .addEventListener('click', (event) => {
                event.preventDefault();
                SurfboardOnlineSDK.order.initiatePayments('KLARNA');
            });

        // Add click event listener for copying logs
        document.getElementById('copyLogs').addEventListener('click', () => {
            const logsText = Array.from(logs.children)
                .map((child) => child.textContent)
                .join('\n');
            navigator.clipboard
                .writeText(logsText)
                .then(() => {
                    alert('Logs copied to clipboard!');
                })
                .catch((err) => {
                    console.error('Failed to copy logs: ', err);
                });
        });

        // Add click event listener for clearing logs
        document.getElementById('clearLogs').addEventListener('click', () => {
            logs.innerHTML = '';
            console.log('Logs cleared');
        });

        /**
         * Logs payment data and displays appropriate messages
         * @param {Object} data - Payment status data
         */
        const logPayments = async (data) => {
            console.log(JSON.stringify(data));
            if (data.paymentStatus === 'PAYMENT_COMPLETED') {
                displaySuccessMessage();
            } else if (data.paymentStatus === 'PAYMENT_FAILED') {
                displayPaymentErrorMessage(data.errorMessage);
            }
        };

        // Set up payment status callback
        SurfboardOnlineSDK.paymentStatusCallback(logPayments);

        // Initialize Surfboard Online SDK
        SurfboardOnlineSDK.initialiseOnlineSDK({
            // TODO: Replace with your terminal's public key
            publicKey: '{{PUBLIC_KEY}}',
            orderId: orderId,
            nonce: nonce,
        }).then(() => {
            // Uncomment the following line to change locale if needed
            // SurfboardOnlineSDK.changeLocale('sv');
            SurfboardOnlineSDK.mount({
                mountCardWidget: 'card-details',
                mountApplePayWidget: 'apple-pay',
                mountGooglePayWidget: 'google-pay',
                mountKlarnaWidget: 'klarna',
            });
        });

        /**
         * Displays success message and hides payment selection
         */
        const displaySuccessMessage = () => {
            document
                .getElementById('success-message')
                .classList.remove('hidden');
            document.getElementById('success-message-span').textContent =
                'Success!';
            document
                .getElementById('payment-selection')
                .classList.add('hidden');
        };

        /**
         * Displays payment error message and hides payment selection
         * @param {string} errorMessage - Error message to display
         */
        const displayPaymentErrorMessage = (errorMessage) => {
            document
                .getElementById('payment-error-message')
                .classList.remove('hidden');
            document.getElementById('payment-error-message-span').textContent =
                errorMessage || 'Payment Failed';
            document
                .getElementById('payment-selection')
                .classList.add('hidden');
        };

        // Set up customer details dropdown functionality
        document.addEventListener('DOMContentLoaded', function () {
            const dropdownButton = document.getElementById(
                'customer-dropdown-button',
            );
            const dropdownMenu = document.getElementById('customer-dropdown');

            dropdownButton.addEventListener('click', function () {
                dropdownMenu.classList.toggle('hidden');
            });

            // Close the dropdown when clicking outside
            document.addEventListener('click', function (event) {
                if (
                    !dropdownButton.contains(event.target) &&
                    !dropdownMenu.contains(event.target)
                ) {
                    dropdownMenu.classList.add('hidden');
                }
            });
        });

        // Add click event listener for updating customer details
        document
            .getElementById('update-customer-details')
            .addEventListener('click', async (event) => {
                event.preventDefault();
                // Gather customer details from form
                const customerEmail = document.getElementById('customer-email');
                const customerPhoneCountryCode = document.getElementById(
                    'customer-phone-country-code',
                );
                const customerPhoneNumber = document.getElementById(
                    'customer-phone-number',
                );
                const customerAddressCountryCode = document.getElementById(
                    'customer-address-country-code',
                );
                const customerAddressLine1 = document.getElementById(
                    'customer-address-line-1',
                );
                const customerAddressCity = document.getElementById(
                    'customer-address-city',
                );
                const customerAddressPostalCode = document.getElementById(
                    'customer-address-postal-code',
                );

                // Prepare address info object
                const addressInfo = {
                    email: customerEmail.value,
                    phone: {
                        countryCode: customerPhoneCountryCode.value,
                        number: customerPhoneNumber.value,
                    },
                    billingAddress: {
                        city: customerAddressCity.value,
                        postalCode: customerAddressPostalCode.value,
                        countryCode: customerAddressCountryCode.value,
                        addressLine1: customerAddressLine1.value,
                    },
                };
                console.log(`addressInfo: ${JSON.stringify(addressInfo)}`);

                // Update customer information using Surfboard SDK
                await SurfboardOnlineSDK.order.addCustomerInformation(
                    addressInfo,
                );
            });
    </script>
</html>

```

{% callout type="important" label="Important" %}
You can also refer to our [React sample app for Online SDK integration](https://github.com/surfboardpayments/react-next-online-sdk) for a complete working example.
{% /callout %}

{% docfooter relatedLinks="[{ title: 'Orders', url: '/docs/orders' },{ title: 'Surfboard APIs and Environments', url: '/guides/online-payments/integrations/apis-and-environments' },{ title: 'Webhooks', url: '/guides/online-payments/integrations/webhooks' }]" /%}
