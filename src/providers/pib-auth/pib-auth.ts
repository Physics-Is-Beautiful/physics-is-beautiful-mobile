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
    if ("is_anonymous" in data) {
      this.events.publish("component:updateNav:login");
    } else {
      this.events.publish("component:updateNav:logout");
    }
  }

  // public async getSessionIDCookie() {
  //   const tempFrame = document.createElement("iframe");
  //   tempFrame.src = this.settings.siteUrl() + "/accounts/login";
  //   tempFrame.style.display = "none";
  //   document.body.appendChild(tempFrame);
  //   tempFrame.onload = () => {
  //     tempFrame.contentWindow.postMessage("sessionIDCookie", "*");
  //   };

  //   window.addEventListener("message", (event) => {
  //     console.log(event.data);
  //     if (event.data.message && event.data.message === "sessionIDCookie") {
  //       console.log(event.data.data);
  //     }
  //   });
  // }

  // public tryLogin(sessionIDCookie?: any): Promise<object> {
  //   const requestOptions = {
  //     params: new HttpParams(),
  //   };
  //   return new Promise<object>((resolve, reject) => {
  //     if (sessionIDCookie) {
  //       requestOptions.params.set("Cookie", sessionIDCookie);
  //     }
  //     this.http.get(this.settings.siteUrl() + "/api/v1/profiles/me", requestOptions).toPromise().then(((data) => {
  //       resolve(data);
  //     }));
  //   });
  // }

  // public try() {
  //   this.http.get(this.settings.siteUrl() + "/accounts/login/").toPromise().then((data) => {
  //     console.log(data);
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

}
