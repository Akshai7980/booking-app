import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JsonSearchProvider } from '../../providers/json-search/json-search';

/**
 * Generated class for the AirportSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-airport-search',
  templateUrl: 'airport-search.html',
})
export class AirportSearchPage {
  airportSearchResults=[];
  callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonSearchProvider:JsonSearchProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirportSearchPage');
    this.airportSearchResults=this.jsonSearchProvider.getSearchAirportResult('');
    this.callback = this.navParams.get('callback');

  }
 
  onChange(ev){
    console.log(ev)
   this.airportSearchResults=this.jsonSearchProvider.getSearchAirportResult(ev);
    console.log(this.airportSearchResults)
  }

  airportSelect(airport){
    console.log(airport);
    this.callback(airport).then( () => { this.navCtrl.pop() });
  }

  goBack(){
    this.navCtrl.pop();
  }
}
