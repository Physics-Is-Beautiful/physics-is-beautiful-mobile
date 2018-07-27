import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    
  }

  login() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://192.168.0.43:8000/accounts/login', JSON.stringify(this.loginForm))
      .subscribe(data => {
        console.log(data);
      })
  }

}
