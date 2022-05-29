import { Component } from "@angular/core";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { ViewController, NavParams } from "ionic-angular";

/**
 * Generated class for the SearchCountryCodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "search-country-code",
  templateUrl: "search-country-code.html"
})
export class SearchCountryCodeComponent {
  searchTerm: string = "";
  countries = [];
  isCountryName:boolean=false;
  isCountryAlpha:boolean=false;
  constructor(private jsonSearchProvider: JsonSearchProvider, private viewCtrl:ViewController, private navParams:NavParams) {
    console.log("Hello SearchCountryCodeComponent Component");
    this.isCountryName=this.navParams.get('isCountryName');
    this.isCountryAlpha=this.navParams.get('isCountryAlpha');
    this.searchResult("");
  }

  searchResult(term) {
    this.countries = this.jsonSearchProvider.getSearchCountryCodeResult(term);
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
    if(country){
        if(this.isCountryName){
          this.viewCtrl.dismiss({countryName: country.name}) 
        }else{
          if(this.isCountryAlpha){
            this.viewCtrl.dismiss({countryAlpha:country.alphaOne})
          }else{
            this.viewCtrl.dismiss({countryCode:country.unNum})
          } 
        }
    }
  }
}
