import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GlobalSettingsProvider } from '../../providers/global-settings/global-settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  siteUrl : string;
  @ViewChild('mainObject') mainObject: any;
  mainObjectElement: any;

  constructor(public navCtrl: NavController, public platform: Platform, public globalSettingsProvider: GlobalSettingsProvider) {
    let backAction =  platform.registerBackButtonAction(() => {
      this.mainObjectElement.contentWindow.postMessage('goBack', '*');
      console.log("second");
      backAction();
    }, 2);

    this.siteUrl = globalSettingsProvider.siteUrl();
  }

  ngAfterViewInit() {
    this.mainObjectElement = this.mainObject.nativeElement;
  }
}
