import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";
import { CruiseProvider } from '../../providers/cruise/cruise';
/**
 * Generated class for the CruiseCountryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cruise-country',
  templateUrl: 'cruise-country.html'
})
export class CruiseCountryComponent {

  searchTerm: string = "";
  countries =[];
  residentCountry;
  constructor(private cruiseP: CruiseProvider, private viewCtrl:ViewController, private navParams:NavParams) {
    console.log("Hello SearchCountryCodeComponent Component");
    this.residentCountry=this.navParams.get('residentCountry');
  }

  searchResult(term) {
    this.countries = this.cruiseP.getCountry(term);
    console.log("this.countries", this.countries);
  }

  onChange(val) {
    console.log(val);
    this.searchResult(val);
  }

  clearTerm() {
    this.searchTerm = "";
  }

  selectCountry(country){
    this.viewCtrl.dismiss({name: country.area}) 
    // if(country){
    //     if(this.residentCountry){
    //       this.viewCtrl.dismiss({name: country.area}) 
    //     }else{
         
    //     }
    // }
  }
}
