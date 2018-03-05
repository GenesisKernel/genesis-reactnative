# apla-reactnative

## Setup

- IOS:
  `cd/genesis-reactnative`, `yarn install`. Install Ruby gem following this instructions - `https://rubygems.org/pages/download#formats`. Install Cocoapods using gem `sudo gem install cocoapods`. Run `pod install` in `genesis-reactnative/ios`. Then copy the `AppCenter-Config.plist` file from our private repo `apla-reactnative-private/ios/AppCenter-Config.plist` to `genesis-reactnative/ios/Apla`.
  Now you are able to run `yarn start -> yarn watch -> react-native run-ios`.

- Android:
  `cd/genesis-reactnative`, `yarn install`. Create a `variables.gradle` in `/android` folder and copy values from our private repo `/apla-reactnative-private/android/variables.gradle`. Also copy `release.keystore` and `google-services.json` from private repo `apla-reactnative-private/android` to `/android/app` folder.
  Now you are able to run `yarn start -> yarn watch -> react-native run-android`.

## Run & Build

- ANDROID:
  Create a `variables.gradle` in `/android` folder and copy values from `/android/variables.gradle.template`.

  Register in `https://firebase.google.com/` and follow the instructions.
  Register in `https://appcenter.ms/` to get the `MYAPP_CODEPUSH_KEY`.
  Go to `https://facebook.github.io/react-native/docs/signed-apk-android.html` and follow the instructions to get `MYAPP_RELEASE_STORE_PASSWORD` and `MYAPP_RELEASE_KEY_PASSWORD`.

- IOS:
  Go to `ios/Apla.xcodeproj/`, find a variable `CODEPUSH_KEY = "PUT-YOUR-RELEASE-KEY-HERE";`, or `CODEPUSH_KEY = "PUT-YOUR-DEBUG-KEY-HERE";` and change its value to your codepush key.

Run the app for developing `yarn start && yarn watch`

Now you can run `react-native run-ios` or `react-native run-android`

## Linking

The app can be opening from link.

`apla://code/<public_key;ecosystem>`

iOS: `xcrun simctl openurl booted "apla://code/3e33978c025c35b104ad6465017eab5ca9c4b5486f50b63b22dc0119dc9f65a8;8872"`

Android: `adb shell am start -W -a android.intent.action.VIEW -d "apla://apla/code/3e33978c025c35b104ad6465017eab5ca9c4b5486f50b63b22dc0119dc9f65a8;8872"`


## Code Push

`appcenter apps set-current <Project Name>`
`appcenter codepush release-react -d <Staging|Production>`
`appcenter codepush release-react -d <Staging|Production>`
