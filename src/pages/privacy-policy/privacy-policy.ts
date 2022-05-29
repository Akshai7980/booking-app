import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SightSeeingProvider } from '../../providers/sight-seeing/sight-seeing';
import { AboutUsPage } from '../about-us/about-us';
import { HelpSuportPage } from '../help-suport/help-suport';

/**
 * Generated class for the PrivacyPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {
  pPolicy= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public sightSeeingProvider :SightSeeingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPolicyPage');
    this.privacyPolicy();
  }
  
  privacyPolicy(){
    this.sightSeeingProvider.privacyPolicy().then(data=>{
      console.log(data);
      this.pPolicy.push(data);
      console.log("aboutUs", this.pPolicy)
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
}
