# apla-reactnative

## Setup

`yarn install`

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
