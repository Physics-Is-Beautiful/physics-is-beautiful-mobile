import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalSettingsProvider {

  rootUrl: string;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalSettingsProvider Provider');


    // set the root url to whatever you like. Include http/https and leave out a closing slash.
    this.rootUrl = 'http://192.168.0.43:8000';
    // this.rootUrl = 'https://www.physicsisbeautiful.com';
  }

  siteUrl() : string {
    return this.rootUrl;
  }

}
