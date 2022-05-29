import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FlightFareRulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-fare-rule',
  templateUrl: 'flight-fare-rule.html',
})
export class FlightFareRulePage {
  fareRule;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fareRule=this.navParams.get('fareRule')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightFareRulePage');
  }

  goBack(){
    this.navCtrl.pop();
}
}
