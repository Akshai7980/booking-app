import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CruiseProvider } from '../../providers/cruise/cruise';
/**
 * Generated class for the CruiseSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-search',
  templateUrl: 'cruise-search.html',
})
export class CruiseSearchPage {
  carCities = [];callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cruiseProvider: CruiseProvider) {
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseSearchPage');
  }

  // onChange(ev){
  //   ev=ev.replace(" ", "%20");
  //   this.cruiseProvider.getCruiseSeach(ev).then(data=>{
  //     this.carCities = data;
  //     console.log(data)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }

  goBack(){
    this.navCtrl.pop();
  }

  selectedCity(city){
    this.callback(city).then( () => { this.navCtrl.pop() });
  }


}
