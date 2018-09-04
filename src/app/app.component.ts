import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Events, Nav, Platform } from "ionic-angular";

import { HttpClient } from "@angular/common/http";
import { NativeAudio } from "@ionic-native/native-audio";
import { ClassroomPage } from "../pages/classroom/classroom";
import { DiscussionPage } from "../pages/discussion/discussion";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  public rootPage: any = HomePage;

  public pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private nativeAudio: NativeAudio, private http: HttpClient,
              public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage },
      { title: "Classroom", component: ClassroomPage },
      { title: "Discussion", component: DiscussionPage },
      { title: "Login / Sign Up", component: LoginPage },
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();

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
      this.pages[3].title = "Login / Sign Up";
    } else {
      this.pages[3].title = "Logout";
    }
  }
}
