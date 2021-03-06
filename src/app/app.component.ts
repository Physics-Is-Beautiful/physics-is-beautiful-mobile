import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Events, Nav, Platform } from "ionic-angular";

import { HttpClient } from "@angular/common/http";
import { HeaderColor } from "@ionic-native/header-color";
import { NativeAudio } from "@ionic-native/native-audio";
import { NativeStorage } from "@ionic-native/native-storage";
import { ClassroomPage } from "../pages/classroom/classroom";
import { DiscussionPage } from "../pages/discussion/discussion";
import { HomePage } from "../pages/home/home";
import { InitialPage } from "../pages/initial/initial";
import { LoginPage } from "../pages/login/login";
import { ResourcesPage } from "../pages/resources/resources";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  public rootPage: any = HomePage;

  public pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private nativeAudio: NativeAudio, private http: HttpClient,
              public events: Events, private nativeStorage: NativeStorage, private headerColor: HeaderColor) {

    this.initializeApp();

    if (!this.platform.is("core")) {
      this.nativeStorage.keys().then((data) => {
        if (data.indexOf("firstTime") === -1) {
          this.platform.ready().then(() => {
            this.nativeStorage.setItem("firstTime", true);
            this.nav.setRoot(InitialPage);
          });
        }
      });
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage, icon: "home" },
      { title: "Classroom", component: ClassroomPage, icon: "school" },
      { title: "Discussion", component: DiscussionPage, icon: "chatboxes" },
      { title: "Resources", component: ResourcesPage, icon: "filing" },
      { title: "Login / Sign Up", component: LoginPage, icon: "contact" },

    ];

    this.events.subscribe("component:updateNav:logout", () => {
      this.updateNav(false);
    });

    this.events.subscribe("component:updateNav:login", () => {
      this.updateNav(true);
    });
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString("#0092DC");
      this.splashScreen.hide();
      this.headerColor.tint("#0dabf5");

      console.log("is iOS? : " + this.platform.is("ios"));
      this.nativeAudio.preloadSimple("audioComplete", "assets/audio/complete.mp3");
      this.nativeAudio.preloadSimple("audioContinue", "assets/audio/continue.mp3");
      this.nativeAudio.preloadSimple("audioCorrect", "assets/audio/correct.mp3");
      this.nativeAudio.preloadSimple("audioDoubleRainbow", "assets/audio/doublerainbow.mp3");
      this.nativeAudio.preloadSimple("audioExamCorrect", "assets/audio/exam_correct.mp3");
      this.nativeAudio.preloadSimple("audioExamStart", "assets/audio/exam_start.mp3");
      this.nativeAudio.preloadSimple("audioIncorrect", "assets/audio/incorrect.mp3");

    });
  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public updateNav(loginStatus: boolean) {
    if (loginStatus) {
      this.pages[4].title = "Login / Sign Up";
    } else {
      this.pages[4].title = "Logout";
    }
  }
}
