import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CruiseItineraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-itinerary',
  templateUrl: 'cruise-itinerary.html',
})
export class CruiseItineraryPage {
  results
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.results = this.navParams.get("results");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseItineraryPage');
  }

}
