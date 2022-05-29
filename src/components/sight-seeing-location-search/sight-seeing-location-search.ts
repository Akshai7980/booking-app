import { Component } from '@angular/core';
import { SightSeeingProvider } from '../../providers/sight-seeing/sight-seeing';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the SightSeeingLocationSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sight-seeing-location-search',
  templateUrl: 'sight-seeing-location-search.html'
})
export class SightSeeingLocationSearchComponent {

  searchTerm: string="";
  cities=[];
  constructor(public sightSeeingProvider:SightSeeingProvider,public viewCtrl:ViewController) {
    console.log('Hello SightSeeingLocationSearchComponent Component');
  }

  clearTerm() {
    this.searchTerm = "";
  }

  onChange(val) {
    console.log(val);
   // this.searchResult(val);
  }

  // searchResult(term) {
  //   this.cities = this.sightSeeingProvider.getLocationByTerm(term);
  //   console.log("this.countries", this.cities);
  // }

  selectCity(city){
    this.viewCtrl.dismiss({city: city})
  }

}
