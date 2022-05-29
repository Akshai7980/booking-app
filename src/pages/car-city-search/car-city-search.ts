import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';

/**
 * Generated class for the CarCitySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-city-search',
  templateUrl: 'car-city-search.html',
})
export class CarCitySearchPage {
carCities=[];
callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public carProvider:CarProvider) {
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarCitySearchPage');
  }

  onChange(ev){
    ev=ev.replace(" ", "%20");
    this.carProvider.getCarCitySeach(ev).then(data=>{
      this.carCities = data;
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }

  goBack(){
    this.navCtrl.pop();
  }

  selectedCity(city){
    this.callback(city).then(() => { this.navCtrl.pop() });
  }

}


  

  