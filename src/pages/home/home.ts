import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mainObject') mainObject: any;
  mainObjectElement: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    let backAction =  platform.registerBackButtonAction(() => {
      this.mainObjectElement.contentWindow.postMessage('goBack', '*');
      console.log("second");
      backAction();
    }, 2);
  }

  ngAfterViewInit() {
    this.mainObjectElement = this.mainObject.nativeElement;
  }
}
