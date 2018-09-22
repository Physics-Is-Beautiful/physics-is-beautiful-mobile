import { Injectable } from "@angular/core";

/*
  Generated class for the GlobalSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalSettingsProvider {

  public rootUrl: string;

  constructor() {
    console.log("Hello GlobalSettingsProvider Provider");

    // set the root url to whatever you like. Include http/https and leave out a closing slash.
    // this.rootUrl = "http://localhost:8000";
    this.rootUrl = "https://www.physicsisbeautiful.com";
  }

  public siteUrl(): string {
    return this.rootUrl;
  }

  public inAppBrowserOptions(): string {
    return "location=no,clearcache=yes";
  }

}
