import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SightSeeingProvider } from '../../providers/sight-seeing/sight-seeing';
/**
 * Generated class for the SightSeeingCitySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sight-seeing-city-search',
  templateUrl: 'sight-seeing-city-search.html',
})
export class SightSeeingCitySearchPage {
  destinations = [];
  callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sightseeingprovider:SightSeeingProvider) {
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityCitySearchPage');
  }

  onChange(ev){
    console.log(ev)
    ev=ev.replace(" ", "%20");
    this.sightseeingprovider.getSightSeeingsCuntry(ev).then(data=>{
      this.destinations = data;
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }

  selectedCity(destination_name){
    console.log(destination_name);
    this.callback(destination_name).then( () => { this.navCtrl.pop() });
  }

}

