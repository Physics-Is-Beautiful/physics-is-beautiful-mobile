import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";

/**
 * Generated class for the InitialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-initial",
  templateUrl: "initial.html",
})
export class InitialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewDidLoad() {
    console.log("ionViewDidLoad InitialPage");
  }

  public continue(shouldLogin: boolean) {
    if (shouldLogin) {
      this.navCtrl.setRoot(LoginPage, {
        goHome: true,
      });
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

}
