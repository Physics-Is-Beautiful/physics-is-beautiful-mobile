import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { HomePage } from "../pages/home/home";
import { MyApp } from "./app.component";

import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { GooglePlus } from "@ionic-native/google-plus";
import { HTTP } from "@ionic-native/http";
import { NativeAudio } from "@ionic-native/native-audio";
import { NativeStorage } from "@ionic-native/native-storage";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Toast } from "@ionic-native/toast";
import { DiscussionPage } from "../pages/discussion/discussion";
import { LoginPage } from "../pages/login/login";
import { GlobalSettingsProvider } from "../providers/global-settings/global-settings";

@NgModule({
  bootstrap: [IonicApp],

  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DiscussionPage,
  ],

  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DiscussionPage,
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],

  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    GooglePlus,
    NativeStorage,
    Toast,
    NativeAudio,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalSettingsProvider,
  ],
})
export class AppModule {}
