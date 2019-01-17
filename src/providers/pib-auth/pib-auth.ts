import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { GlobalSettingsProvider } from "../global-settings/global-settings";

/*
  Generated class for the PibAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PibAuthProvider {

  constructor(public http: HttpClient, private settings: GlobalSettingsProvider, private events: Events) {
    console.log("Hello PibAuthProvider Provider");
  }

  public processLoginData(data: any) {
    if (typeof(data) === "string") {
      data = JSON.parse(data);
    }
    if (data.is_anonymous) {
      this.events.publish("component:updateNav:login");
    } else {
      this.events.publish("component:updateNav:logout");
    }
  }

  public isLoggedIn(data: any) {
    // alert(data);
    if (typeof(data) === "string") {
      data = JSON.parse(data);
    }
    // alert("logged in: " + !data.is_anonymous);
    return !(data.is_anonymous);
  }
}
