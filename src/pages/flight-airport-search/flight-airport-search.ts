import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JsonSearchProvider } from '../../providers/json-search/json-search';


/**
 * Generated class for the FlightAirportSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-airport-search',
  templateUrl: 'flight-airport-search.html',
})
export class FlightAirportSearchPage {
  airportSearchResults=[];
  callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonSearchProvider:JsonSearchProvider) {
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightAirportSearchPage');
    this.airportSearchResults=this.jsonSearchProvider.getSearchAirportResult('');
    this.callback = this.navParams.get('callback');

  }
 
  onChange(ev){
    console.log(ev)
   this.airportSearchResults=this.jsonSearchProvider.getSearchAirportHotelResult(ev);
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


