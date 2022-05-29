import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SightSeeingProvider } from '../../providers/sight-seeing/sight-seeing';
import { HelpSuportPage } from '../help-suport/help-suport';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  aboutUs= [];
  constructor(public navCtrl: NavController, public sightSeeingProvider:SightSeeingProvider) {
  }

  goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
   this.getAboutUs();
    
  }
  
  getAboutUs(){
    this.sightSeeingProvider.getAboutUs().then(data=>{
      console.log(data);
      this.aboutUs.push(data);
      console.log("aboutUs", this.aboutUs)
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
