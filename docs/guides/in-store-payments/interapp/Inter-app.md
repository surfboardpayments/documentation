# CheckoutX: Inter-app

## Introduction

Surfboard offers a payment acceptance app across our Android Payment Terminals and also as a SoftPOS solution called CheckoutX. You can provide a seamless integrated solution to your end customers if you have an Android app through native app switch.

Note: Our terminals operate in a full online mode and hence do not support passing in data or parameters through any offline means.

There are two primary functions that are involved as part of the inter-app experience

-   Terminal Registration (One time in a new device/terminal)
-   Payment Flow

Both flows involve setting up a bi-directional app switch.

1. App switch from your app to CheckoutX to initiate/process a task
2. App switch from CheckoutX to your app on the completion of the task

> CheckoutX also allows you to scan tags during sales which requires an additional setup that you can opt to do if needed.

## Setting up your app for app switch

This section will focus on getting your app ready so that CheckoutX will be able to switch to your app on the completion of a task. This setup can be used by other apps to open your app. The implementation methods vary for iOS and Android, and they are as follows:

{% tabs tabs=[
  {
    label: "Android", 
    markdocSrc: "guides/in-store-payments/integrations/prebuilt-apps/tabs-interapp/android.md"
  },
  {
    label: "iOS",
    markdocSrc: "guides/in-store-payments/integrations/prebuilt-apps/tabs-interapp/ios.md"
  }
] /%}

## Configure terminal before payment

To make sure the CheckoutX app is ready to process payments, use the following route before initiating a payment. This will open and configure CheckoutX and then return back to the client's POS app. Using this setup ensures that the first transaction after a device reboot is much faster.

The route returns a boolean value `isConfigured`, which will be `true` if the CheckoutX app is ready to process payments.

**Configuration Route:**

```text
checkoutx://com.surfboard.checkoutx/configure?redirectUrl=REDIRECT_URL
```

- Replace `REDIRECT_URL` with your app's URL to handle the callback after configuration.
- Use this step before starting the payment flow for optimal performance.

## Payment Flow using app switch

You can initiate a payment using the payment APIs and perform an app switch to CheckoutX to handle the payments. The app switch can be a simple URL opening using the following syntax

```jsx
checkoutx://com.surfboard.checkoutx/transaction? // This is the root URL for transactions
redirectUrl=REDIRECT_URL& // This is where you will specify the URL of your app
data = REQUIRED_DATA // This is a provision for future functionality

```

-   Currently, the **`REQUIRED_DATA`** includes terminal_Id as it is requisite for terminal tester app. Include the terminal Id in the **`REQUIRE_DATA`** as the base64-encoded version of the following JSON object.

```jsx
{
"terminalId": "TERMINAL_ID" // This is the ID you receive after terminal registration
}

```

**Note:** The **`data`** parameter is designed to be extensible, allowing you to modify its contents for future functionalities.

### **For iOS**

To make the app switch work smoothly on iOS, we recommend you to add `JWT_TOKEN` in the `data` parameter which will be received in the [initiate payment API](/api/payments#Initiate-a-Payment). This enhances the seamlessness of payment acceptance during the app switch in iOS. The `JWT_TOKEN` in the `REQUIRE_DATA` must be included as the base64-encoded version of the following JSON object.

```json
{"interAppJWToken": "JWT_TOKEN"};
```

### Framing Redirect URL

The redirect URL structure is identical for both iOS and Android. It is passed as a base64 encoded string built based on the following syntax:

```jsx
<YOUR_SCHEME>://<YOUR_HOST>/<ROUTES>?<QUERY_PARAMS>

```

If your scheme is `posapp` and your host is `hello`, the basic redirect URL is **`posapp://hello`**. You can also pass in additional query parameters as part of this URL. For example, if you wanted to pass in a route and orderReference as a query parameter, your URL can be 
`posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7`

This URL needs to be base64 encoded. Thus it becomes **`cG9zYXBwOi8vaGVsbG8vb3JkZXI_b3JkZXJSZWY9NmJhN2I3ZGItNTE5Zi00ZWQ5LTlmNmItYTgzNDE0MDQ2NmY3`**

Implementation examples

{% requestresponse method="POST" requests=[{language: "Kotlin", code: "// Replace this with your actual URL\nval url = \"posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7\";\nreturn Base64.getUrlEncoder().encodeToString(url.toByteArray())"}, {language: "dart", code: "// Replace this with your actual URL\nString url = \"posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7\";\nreturn base64UrlEncode(utf8.encode(url));\n\n"}, {language: "JSON", code: "// Replace this with your actual URL\nconst url = \"posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7\";\nreturn new Buffer(\"your text\").toString(\"base64\").replaceAll('/', '_');\n\n"}, {language: "Swift", code: "let url = \"posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7\"\nreturn Data(url.utf8).base64EncodedString()"}] languages=["Kotlin", "dart", "JSON", "Swift"] /%}

### Performing App Switch

Once the REDIRECT_URL is framed, the app switch URL can be framed as

```dart
checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=cG9zYXBwOi8vaGVsbG8vb3JkZXI_b3JkZXJSZWY9NmJhN2I3ZGItNTE5Zi00ZWQ5LTlmNmItYTgzNDE0MDQ2NmY3&showReceipt=false

```

You can now perform the app switch with the URL as shown below:

{% requestresponse method="POST" requests=[{language: "Kotlin", code: "val url = \"checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=cG9zYXBwOi8vaGVsbG8vb3JkZXI_b3JkZXJSZWY9NmJhN2I3ZGItNTE5Zi00ZWQ5LTlmNmItYTgzNDE0MDQ2NmY3&showReceipt=false\";\nval intent = Intent(Intent.ACTION_VIEW);\nintent.data = Uri.parse(deepLinkUrl);\nstartActivity(intent);"}, {language: "dart", code: "// You will need to install the URL Launcher package\n// flutter pub add url_launcher\n\nString deepLinkUrl = \"checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=cG9zYXBwOi8vaGVsbG8vb3JkZXI_b3JkZXJSZWY9NmJhN2I3ZGItNTE5Zi00ZWQ5LTlmNmItYTgzNDE0MDQ2NmY3&showReceipt=false\";\nUri uri = Uri.parse(deepLinkUrl);\n\nif (await canLaunchUrl(uri)) {\n    await launchUrl(uri);\n} else {\n    // Handle error on your end\n}"}, {language: "JSON", code: "const url = \"checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=cG9zYXBwOi8vaGVsbG8vb3JkZXI_b3JkZXJSZWY9NmJhN2I3ZGItNTE5Zi00ZWQ5LTlmNmItYTgzNDE0MDQ2NmY3&showReceipt=false\";\nconst supported = await Linking.canOpenURL(url);\n\nif (supported) {\n    // Opening the link with some app, if the URL scheme is \"http\" the web link should be opened\n    // by some browser in the mobile\n    await Linking.openURL(url);\n}\n\n"}, {language: "Swift", code: "let deepLinkUrl = \"checkoutx://com.surfboard.checkoutx/transaction?redirectUrl=cG9zYXBwOi8vaGVsbG8vb3JkZXI_b3JkZXJSZWY9NmJhN2I3ZGItNTE5Zi00ZWQ5LTlmNmItYTgzNDE0MDQ2NmY3&showReceipt=false\"\nif let url = URL(string: deepLinkUrl) {\n    UIApplication.shared.open(url, options: [:]) { success in\n        if success {\n            // handle success\n        } else {\n            // handle failure case\n        }\n    }\n}\n"}] languages=["Kotlin", "dart", "JSON", "Swift"] /%}

**Return URL**

Once CheckoutX completes the transaction, it will call the redirectUrl provided as is along with a **`data`** element attached in case its applicable. The data element will be base64 encoded.

The return URL that will be called is

```jsx
posapp://hello/order?orderRef=6ba7b7db-519f-4ed9-9f6b-a834140466f7&data=<base64_encoded_data>

```

## Terminal Registration using app switch

All the above steps are valid for app switch. The only change happens in the root URL of the CheckoutX app. The following example is from flutter, but can be modified to fit other languages

```jsx
checkoutx://com.surfboard.checkoutx/register? // This is the root URL for registration
redirectUrl=REDIRECT_URL& // This is where you will specify the URL of your app
data=REGISTRATION_CODE // This is the registration code encoded in base64

```

-   REDIRECT_URL is framed as mentioned above
-   REGISTRATION_CODE is the base64-encoded version of the json object given below in which **`GENERATED_CODE`** is the code you receive as the part of making the [**interappRegisterTerminal**](/api/terminals#Get-Interapp-Code) call.

```jsx
{
"registrationCode": "GENERATED_CODE" // The code received from the API
}

```

### Reading the terminalId

Once the registration is done, CheckoutX will call your app with the redirect URL that is provided. This link will contain a `data` element that includes the `terminalId` created as part of the registration request. The `terminalId` can also be fetched via API.

The steps to handle the `data` element are the same for both Android and iOS in terms of decoding the Base64-encoded `data` and parsing it into JSON. However, the implementation differs between platforms.

{% callout type="warning" label="Warning" %}
Do not use `uri.getQueryParameter("data")` in Kotlin/Android as it automatically URL-decodes the value, which can corrupt the Base64 encoding. Use `uri.encodedQuery` to retrieve the raw, unmodified query parameter value instead.
{% /callout %}

{% requestresponse method="POST" requests=[{language: "Kotlin", code: "private fun handleDeepLink(intent: Intent) {\n    if (intent.action == Intent.ACTION_VIEW) {\n        if (intent.data != null) {\n            val uri: Uri = intent.data as Uri\n            val encodedData = uri.encodedQuery\n                ?.split(\"&\")\n                ?.firstOrNull { it.startsWith(\"data=\") }\n                ?.removePrefix(\"data=\")\n            if (!encodedData.isNullOrBlank()) {\n                val data = String(Base64.getUrlDecoder().decode(encodedData))\n                val jsonObject: JsonObject = serializer.fromJson(data, JsonObject::class.java)\n                if (jsonObject[\"terminalId\"] != null) {\n                    val terminalId = jsonObject[\"terminalId\"].asString\n                } else {\n                    //handle error case\n                    val errorMessage = jsonObject[\"message\"].asString\n                }\n            }\n        }\n    }\n}\n\n"}, {language: "dart", code: "handleDeepLink(String? link) {\n    if (link != null) {\n        Uri uri = Uri.parse(link);\n        Map<String, String> params = uri.queryParameters;\n        if (params[\"data\"] != null) {\n            String data = utf8.decode(base64.decode(params[\"data\"]!));\n            final dataJson = json.decode(data);\n            if (dataJson[\"terminalId\"] != null) {\n                final terminalId = dataJson[\"terminalId\"]!;\n            } else {\n                //handle error case\n                final errorMessage = dataJson[\"message\"]!;\n            }\n        }\n    }\n}"}, {language: "Swift", code: "private func handleDeepLink(_ url: URL) {\n        guard\n            url.host == \"YOUR_HOST\",\n            let base64String = URLComponents(url: url, resolvingAgainstBaseURL: false)?\n                .queryItems?\n                .first(where: { $0.name == \"data\" })?\n                .value,\n            let decodedJSON = decodeBase64ToJSON(base64String)\n        else {\n            // handle failure case\n            return\n        }\n        \n    }\n    \n    private func decodeBase64ToJSON(_ base64String: String) -> [String: Any]? {\n        guard let jsonData = Data(base64Encoded: base64String) else {\n            return nil\n        }\n        return (try? JSONSerialization.jsonObject(with: jsonData, options: [])) as? [String: Any]"}] languages=["Kotlin", "dart", "Swift"] /%}

## Scanning tags using app switch

Before proceeding further, setup your app for app-switch as mentioned in the beginning of the guide.

The app switch for scanning tags can be a simple URL opening using the following syntax

```json
checkoutx://com.surfboard.checkoutx/scanProducts? // This is the root URL for transactions
redirectUrl=REDIRECT_URL& // This is where you will specify the URL of your app
data = REQUIRED_DATA // This is a provision for scanning tag functionality

```

Include the following JSON object as the base64-encoded version in the **`REQUIRED_DATA`**

```json
{
"readMode": "SINGLE" | "MULTIPLE_EDITABLE" | "MULTIPLE_NONEDITABLE"
}

```

This JSON object lets the users select the appropriate read mode based on their needs. For example, if they are scanning a single product they would select single. If they are scanning multiple products, they can select either MULTIPLE_EDITABLE or MULTIPLE_NONEDITABLE. **MULTIPLE_EDITABLE** allows the user to edit or modify the scanned data and **MULTIPLE_NONEDITABLE** allows scanning multiple products without the ability to edit or modify the scanned data.

The rest of the setup for both framing redirect URL and performing app switch remains the same as in the payment flow section provided above.

## Example Repositories

We have example repositories for Android and Flutter available on Github at

-   [**Android Example App**](https://github.com/surfboardpayments/surfboard-interapp-kotlin-simple)
