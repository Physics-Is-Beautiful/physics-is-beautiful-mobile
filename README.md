# About
This is the mobile app for [Physics is Beautiful](https://www.physicsisbeautiful.com/). Most of the app's features are in the [main repository](https://github.com/nscozzaro/physics-is-beautiful), so please go there if you would like to contribute.

# Installation
Install ionic.

    npm install -g ionic cordova

Clone this repo and enter it.

    git clone http://github.com/neilc314/physics-is-beautiful-mobile.git

Install dependencies.

    npm install

# Testing
First, start the physics-is-beautiful server, and make sure it listens on all IP addresses.

    python ./manage.py runserver 0.0.0.0:8000

## Web-based testing

You can test a web-based version of the app by running the following. However, some plugins may not function properly in this mode.

    ionic serve -c

If you use this, you can install Ionic DevApp to test the app on devices in your local network. This is NOT the recommended way to test the app; it is just a lightweight way of demonstrating some of the functionality

## Native Testing

To test a real, native app you will need to do some additional work. 

### Android Setup
If you already have Android Studio or the command-line tools installed, you can skip this step. 

Otherwise, it is recommended that you install the command-line tools from source through this [page](https://developer.android.com/studio/#command-tools). You can use the included `sdkmanager` script to install any necessary scripts (such as platform-tools). See the Android Developer link for more information, and for ease of access, add the scripts to your PATH.

You will also need to install Gradle. 

Add Android as a platform.

    ionic cordova platform add android

Then, connect your device and run the following. Note that USB debugging must be enabled on your Android device. To enable this, go to Settings > About phone and repeatedly press the "Build Number" button. Then go to Settings > Developer options > Debugging and enable USB debugging.

    ionic cordova run android

If a physical device is not detected, cordova will attempt to run in an emulator.

If you get an error saying that Ionic can't connect to a server, modify the rootUrl in `src/providers/global-settings/global-settings.ts`. You'll want to use an intranet IP such as `192.168.0.33:8000`.

To get your computer's IP, run `ip addr show | grep "inet "` and look for the non-internal IP (i.e. not `127.0.0.1`).

For example, if you see that the IP is `172.20.102.131/22`, you'll want to set `rootUrl = 172.20.102.131:8000`.

### iOS Setup
