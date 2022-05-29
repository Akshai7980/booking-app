import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SightSeeingProvider } from '../../providers/sight-seeing/sight-seeing';
import { AboutUsPage } from '../about-us/about-us';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

/**
 * Generated class for the HelpSuportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-suport',
  templateUrl: 'help-suport.html',
})
export class HelpSuportPage {
  suppore = [];
  constructor(public navCtrl: NavController, public navParams: NavParams ,public sightSeeingProvider:SightSeeingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpSuportPage');
    this. privacyPolicy();
  }
  privacyPolicy(){
    this.sightSeeingProvider.support().then(data=>{
      console.log(data);
      this.suppore.push(data);
      console.log("aboutUs", this.suppore)
    }).catch(err=>{
      console.log(err)
    })
  } 
  gotoAboutPage(){
    this.navCtrl.push(AboutUsPage);
  }
  gotoPrivacyPage(){
    this.navCtrl.push(PrivacyPolicyPage);
  }
  gotoContactPage(){
    this.navCtrl.push(HelpSuportPage);
  }

  goBack(){
    this.navCtrl.pop();
  }
}
