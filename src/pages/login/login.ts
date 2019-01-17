import { Component, NgZone, Renderer2, ViewChild } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { NativeStorage } from "@ionic-native/native-storage";
import { Events, IonicPage, NavController, NavParams, Platform, ToastController } from "ionic-angular";
import { GlobalSettingsProvider } from "../../providers/global-settings/global-settings";
import { HomePage } from "../home/home";

import { HttpClient } from "@angular/common/http";
import { GooglePlus } from "@ionic-native/google-plus";
import { PibAuthProvider } from "../../providers/pib-auth/pib-auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // TODO use ?next= on login and logout pages (google and facebook included) to specify

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {

  public node: string;
  @ViewChild("mainObject") public mainObject: any;
  public mainObjectElement: any;

  // Page URL is generated by appending the node to the global site URL.
  public pageUrl: SafeUrl;

  private triedSocialLogin: boolean = false;
  private loggedInInitially: boolean | undefined;
  private messageListener: () => void;
  private shouldReturnToPage: boolean = false;
  private shouldNotLogout: boolean = false;
  private polling: boolean = false;
  private browser: any;

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private sanitizer: DomSanitizer, private renderer: Renderer2, private nativeStorage: NativeStorage,
              private toastCtrl: ToastController, private iab: InAppBrowser, public events: Events,
              private settings: GlobalSettingsProvider, private pibAuth: PibAuthProvider, private zone: NgZone) {

    if (this.navParams.get("goBack")) {
      this.shouldReturnToPage = true;
    }
    if (this.navParams.get("goHome")) {
      this.shouldNotLogout = true;
    }

    this.platform.ready().then(() => {

      this.updateUrl("/accounts/blank");

      this.messageListener = this.renderer.listen(window, "message", (evt) => {
        this.receiveMessage(evt);
      });
    });

  }

  public receiveMessage(evt) {
    console.log("login receive");
    console.log("receiving message: " + JSON.stringify(evt.data.data));
    console.log("loggedInInitially " + this.loggedInInitially);
    if (evt.data === "googleLogin") {
      this.doGoogleLogin();
    } else if (evt.data === "facebookLogin") {
      this.doFacebookLogin();
    } else if (evt.data.message === "loginInfo") {
      console.log("hello1");
      const loginData = JSON.parse(evt.data.data);

      if (typeof this.loggedInInitially === "undefined") {
        console.log("hello2");

        this.loggedInInitially = false;
        let node = "/accounts/login/?pib_mobile=true";
        console.log("loginData" + loginData);
        if (this.pibAuth.isLoggedIn(loginData)) {
          node = "/accounts/logout/?pib_mobile=true&next=/accounts/blank";
          this.loggedInInitially = true;

          console.log("loggedin");

          if (this.shouldNotLogout) {
            this.navCtrl.setRoot(HomePage) ;
            this.presentToast("Successfully logged in as " + loginData.display_name + "!");
          } // TODO modularize
        }

        // alert("update " + node)

        console.log("update " + node);

        this.updateUrl(node);
      } else {
        console.log("hello3");

        const loggedInNow = this.pibAuth.isLoggedIn(loginData);
        if (this.loggedInInitially && !loggedInNow) {
          // successfully logged out
          this.events.publish("component:updateNav:login");
          this.shouldReturnToPage ? this.navCtrl.pop() : this.navCtrl.setRoot(HomePage);
          this.presentToast("Successfully logged out.");
        } else if (!this.loggedInInitially && loggedInNow) {
          // successfully logged in

          // clear interval and close browser
          if (this.browser !== undefined) {
            this.stopPolling();
            this.browser.close();
          }

          this.events.publish("component:updateNav:logout");
          this.shouldReturnToPage ? this.navCtrl.pop() : this.navCtrl.setRoot(HomePage);
          this.presentToast("Successfully logged in as " + loginData.display_name + "!");
        } else if (this.triedSocialLogin) {
          this.updateUrl("/accounts/login/?pib_mobile=true");
          this.triedSocialLogin = false;
        }
      }
    }
  }

  public startPolling() {
    this.polling = true;
    this.poll();
  }

  public poll() {
    if (this.polling) {
      this.updateUrl("/accounts/blank");
      window.setTimeout(() => {
        this.poll();
      }, 1000);
    }
  }

  public stopPolling() {
    this.polling = false;
  }

  public doGoogleLogin() {
    console.log("googleLogin");
    this.browser = this.iab.create(this.settings.siteUrl() +
      "/accounts/google/login/?process=&next=/accounts/mobile-next", "_self", this.settings.inAppBrowserOptions());

    this.startPolling();
    this.triedSocialLogin = true;

    this.browser.on("exit").subscribe(() => {
      this.stopPolling();
      this.loggedInInitially = undefined;
      this.updateUrl("/accounts/blank");
    });
  }

  public doFacebookLogin() {
    console.log("facebookLogin");
    this.browser = this.iab.create(this.settings.siteUrl() +
      "/accounts/facebook/login/?process=&next=/accounts/mobile-next", "_self", this.settings.inAppBrowserOptions());

    this.startPolling();
    this.triedSocialLogin = true;

    this.browser.on("exit").subscribe(() => {
      this.stopPolling();
      this.loggedInInitially = undefined;
      this.updateUrl("/accounts/blank");
    });
  }

  public ionViewWillLeave() {
    this.messageListener();
    console.log("login message listener removed");
  }

  private updateUrl(url: string) {
    this.pageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.settings.siteUrl() + url);
    this.zone.run(() => {});
  }

  private presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      duration: 3000,
      message: msg,
    });
    toast.present();
  }

}
