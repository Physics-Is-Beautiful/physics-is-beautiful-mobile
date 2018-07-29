import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    
  }

  login() {
    this.http.post('http://192.168.0.43:8000/accounts/login', JSON.stringify(this.loginForm), {})
    .then(data => {
  
      console.log(data);
  
    })
    .catch(error => {
  
      console.log(error);
  
    });
  }

}
