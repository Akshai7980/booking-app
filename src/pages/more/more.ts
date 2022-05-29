import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { APP_DOWNLOAD_LINK } from '../../providers/constants/constants';
import { AboutUsPage } from '../about-us/about-us';
import { HelpSuportPage } from '../help-suport/help-suport';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  appName;
  versionNumber;
  @ViewChild('previewimage') waterMarkImage: ElementRef;
  originalImage = null;
  blobImage = null;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private appRate: AppRate,
     private iab :InAppBrowser,
     private socialSharing: SocialSharing,
     private appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    // this.addImageWatermark()
    console.log('ionViewDidLoad MorePage');
    this.appVersion.getAppName().then(data => {
    this.appName = data;
    });
    this.appVersion.getVersionNumber().then(data => {
      this.versionNumber = data;
    });
  }

  // addImageWatermark() {
  //   watermark([this.blobImage, 'assets/imgs/academy.png']).image(watermark.image.lowerRight(0.6))
  //     .then(img => {
  //       this.waterMarkImage.nativeElement.src = img.src;
  //     });
  // }

  rateApp(){
    this.appRate.preferences.storeAppURL = {
      ios: 'com.booking.travels',
      android: 'market://details?id=com.booking.travels',
    };
    this.appRate.promptForRating(true);
    //this.appRate.navigateToAppStore();
  }

  shareApp(){
    let message="Check out the amazing 24X7booking mobile app at : "+APP_DOWNLOAD_LINK+" now and start saving!"
    console.log(message,APP_DOWNLOAD_LINK)
    this.socialSharing.share(message);
  }

  // privacyPolicy() {
  //   let url = PRIVACY_POLICY;
  //   let target = "_blank";
  //   const browser = this.iab.create(url, target);
  //   browser.show();
  // }

  visaLink(){
    let url = 'https://groupy.live/walztravels/';
    let target = "_blank";
    const browser = this.iab.create(url, target);
    browser.show();
  }

  privacyPolicy() {
    this.navCtrl.push(PrivacyPolicyPage)
  }

  goToAboutUs(){
    this.navCtrl.push(AboutUsPage)
  }

  goToHelpSupport(){
    this.navCtrl.push(HelpSuportPage)
  }

}
