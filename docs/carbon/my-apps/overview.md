## Introduction

Surfboard Payments enables easy integration of external applications with our hardware payment terminals through the Developer Portal and Partner Portal. This guide outlines the requirements and steps to upload your application, ensuring smooth and reliable payment services via our devices.

## Pre-requisites

Before submitting your software application, ensure it meets these requirements:

-   Registered Surfboard Partner
-   A full setup Merchant with one active store
-   Use unsigned release APKs
-   Avoid Google APIs (Note: Our hardware devices do not support google APIs)
-   Include only armeabi-v7a ABI build type
-   Follow the naming convention: packageId and version string `com.organisation.appname-x.y.z.n.apk` (e.g., `com.surfboard.checkoutx-4.9.1.0.apk`)
-   Optimize memory usage for 2GB devices (Note: The payment application consumes some memory)
-   Design your application to scale properly for our hardware terminal resolutions:
    -   SurfTouch: 720 × 1280 px
    -   SurfPrint: 720 × 1440 px

## Development Configuration

### Unsigned Release APK Setup

Configure your build file to create unsigned releases:

1. Make sure your unsigned release APKs have

The signingConfig set to null.

```kotlin

buildTypes {
        release {
            signingConfig = null
        }
    }
```

1. Build type for android

```kotlin
android {
  ...
  splits {

    // Configures multiple APKs based on ABI.
    abi {

      // Enables building multiple APKs per ABI.
      isEnable = true

      // By default all ABIs are included, so use reset() and include to specify that you only
      // want APKs for x86 and x86_64.

      // Resets the list of ABIs for Gradle to create APKs for to none.
      reset()

      // Specifies a list of ABIs for Gradle to create APKs for.
      include("armeabi-v7a")

      // Specifies that you don't want to also generate a universal APK that includes all ABIs.
      isUniversalApk = false
    }
  }
}
```

## Integration Flow

## Using Developer portal

### Step 1: Submit Your Application Through Developer Portal

1. Log in to the Developer Portal.
2. Navigate to the Console at [**https://developers.surfboardpayments.com/console/my-apps**](https://developers.surfboardpayments.com/console/my-apps)
3. In the "My Apps" section, add your software application by providing:
    - Package Name
    - Software Name
    - Version
    - Application Type (POS app or utility app)
    - Upload your unsigned APK file
4. Submit the application for review and you will get any one of the possible statuses as mentioned below

    | Status                  | Description                                                              |
    | ----------------------- | ------------------------------------------------------------------------ |
    | `APPLICATION_IN_REVIEW` | Application is currently being processed                                 |
    | `APPLICATION_REVIEWED`  | Application has been approved                                            |
    | `APPLICATION_CANCELED`  | Application has been cancelled , to know the details reach out the team. |

<aside>

**Note**: If a software is uploaded as a POS app, it will be given first priority to open on the terminal when clicking on accepting payments. All POS related terminal configs will apply to this app.

</aside>

### Step 2: Upload Software to Payment Terminals

Once the application reaches the `APPLICATION_REVIEWED` status, log in to the **Partner Portal**, navigate to the **Merchants** tab, and select the merchant where you want to push the software, it can be done at various levels and a step by step guide is detailed below.

<aside>

**Important**: Software ID is the package name and version is the software version provided during application submission. The latest version will be pushed to your hardware terminals.

</aside>
