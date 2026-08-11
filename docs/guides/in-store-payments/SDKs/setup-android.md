## Android SoftPOS SDK Setup and Distribution

This page explains how to install, configure, and update the Surfboard SoftPOS SDK in your Android app. Use it together with the **Android SoftPOS SDK Integration Guide**, which covers the runtime flow and APIs.

### 1. SDK delivery and environments

-   The SDK is distributed via Surfboard-hosted Maven repositories.
-   You configure repository URLs and credentials in a `softpos.properties` file.
-   You control which SDK build you use (test vs production) by:
    -   The Maven coordinates and version in your Gradle configuration.
    -   The values you put in `softpos.properties`.

### 2. Add softpos.properties

Create a `softpos.properties` file in the root folder of your Android project (same level as `settings.gradle.kts`):

```text
your-android-project/
├── app/
├── gradle/
├── build.gradle.kts
├── settings.gradle.kts
├── softpos.properties  ← Create this file here
└── gradle.properties
```

Add the Maven repository credentials provided by Surfboard:

```properties
softpos1.mavenurl = MAVEN_URL1
softpos1.mavenusername = MAVEN_USERNAME1
softpos1.mavenpassword = MAVEN_PASSWORD1

softpos2.mavenurl = MAVEN_URL2
softpos2.mavenusername = MAVEN_USERNAME2
softpos2.mavenpassword = MAVEN_PASSWORD2
```

Update `.gitignore` to avoid committing credentials:

```text
# SoftPOS credentials
softpos.properties
```

### 3. Configure Gradle repositories

In your root `build.gradle.kts` (or equivalent), load `softpos.properties` and configure the repositories:

```kotlin
import java.util.Properties
import java.io.FileInputStream

val localProperties = Properties()
val localPropertiesFile = rootProject.file("softpos.properties")

if (localPropertiesFile.exists()) {
    localProperties.load(FileInputStream(localPropertiesFile))
}

allprojects {
    repositories {
        google()
        mavenCentral()
        mavenLocal()
        gradlePluginPortal()

        maven {
            url = uri(localProperties.getProperty("softpos1.mavenurl"))
            credentials {
                username = localProperties.getProperty("softpos1.mavenusername")
                password = localProperties.getProperty("softpos1.mavenpassword")
            }
        }

        maven {
            url = uri(localProperties.getProperty("softpos2.mavenurl"))
            credentials {
                username = localProperties.getProperty("softpos2.mavenusername")
                password = localProperties.getProperty("softpos2.mavenpassword")
            }
            authentication {
                create<BasicAuthentication>("basic")
            }
        }
    }
}
```

### 4. Version catalog and dependencies

In `gradle/libs.versions.toml`, declare the SDK version and modules:

```toml
[versions]
softposSDK = "1.1.4"

[libraries]
softposSDKDebug = { module = "com.surfboardpayments:gapsdk-debug", version.ref = "softposSDK" }
softposSDKRelease = { module = "com.surfboardpayments:gapsdk", version.ref = "softposSDK" }
```

In `app/build.gradle.kts`, add the dependencies:

```kotlin
dependencies {
    debugImplementation(libs.softposSDKDebug)
    releaseImplementation(libs.softposSDKRelease)
}
```

### 5. App module configuration

Configure your app module to meet SDK requirements:

```kotlin
android {
    compileSdk = 35

    defaultConfig {
        applicationId = "com.your.app.id"
        minSdk = 29
        targetSdk = 35
        multiDexEnabled = true // Required for Surfboard SoftPOS SDK
    }

    buildFeatures {
        buildConfig = true
        viewBinding = true
        // compose = true // Optional if you use Jetpack Compose
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }
}
```

Ensure your `AndroidManifest.xml` includes the required permissions and features as described in the Android SoftPOS SDK Integration guide.

### 6. Dependency caching and updates

When new SDK versions are released, Gradle may keep using cached artifacts. You can tune the resolution strategy in `app/build.gradle.kts`:

```kotlin
configurations.all {
    resolutionStrategy {
        cacheDynamicVersionsFor(5, java.util.concurrent.TimeUnit.MINUTES)
        cacheChangingModulesFor(0, java.util.concurrent.TimeUnit.SECONDS)
        // Optionally force a specific version while debugging:
        // force("com.surfboard.softpos:core:1.1.5")
    }
}
```

To force a refresh during development, run:

```bash
./gradlew clean build --refresh-dependencies
```

If needed, you can introduce a dedicated Gradle task to clear only SoftPOS-related cache entries. Keep that as an internal tool for your team rather than part of the public SDK guide.

### 7. Staging vs production builds

Surfboard may provide separate Maven coordinates or versions for sandbox/test vs production. In that case:

-   Use a different `softposSDK` version or different modules in your version catalog per flavor.
-   Or configure product flavors (`staging`, `production`) and map them to different dependency sets.

Always verify which version and repository you are expected to use for:

-   Sandbox / test integrations.
-   Certified production integrations.
