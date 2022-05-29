import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransferProvider } from '../../providers/transfer/transfer';

/**
 * Generated class for the TransferSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-search',
  templateUrl: 'transfer-search.html',
})
export class TransferSearchPage {
  transferCities = [];
  transferAirportSeach =[];
  transferDestination =[];
  transferAirlinesSeach = [];
  transferCity;
  transferDropOff;
  transferPickUp;
  transferAirport;
  transferAirLines;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public transferProvider:TransferProvider) {
    this.transferAirport = this.navParams.get('transferAirport');
    this.transferPickUp = this.navParams.get('transferPickUp');
    this.transferDropOff = this.navParams.get('transferDropOff');
    this.transferCity = this.navParams.get('transferCity');
    this.transferAirLines = this.navParams.get('transferAirLines');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferSearchPage');
  }
  onChange(ev){
    ev=ev.replace(" ", "%20");
    this.transferProvider.gettransferCitySeach(ev).then(data=>{
      this.transferCities = data;
      console.log("TransferCitySeach", this.transferCities)
    }).catch(err=>{
      console.log(err)
    })
  }
  
  selectedCity(value){
    console.log(value);
    this.transferPickUp(value).then( () => { this.navCtrl.pop() });
  }

  onChangeDropOff(ev){
    console.log(ev)
    ev=ev.replace(" ", "%20");
    this.transferProvider.gettransferSeach(this.transferCity.city, this.transferCity.atype,ev).then(data=>{
      this.transferDestination = data;
      console.log("gettransferSeach", this.transferDestination)
     
    }).catch(err=>{
      console.log(err)
    })
  }

  selectedDropOff(value){
    console.log(value);
    this.transferDropOff(value).then( () => { this.navCtrl.pop() });
  }

  
  onChangeAirport(ev){
    ev=ev.replace(" ", "%20");
    this.transferProvider.getTransferAirportSeach(ev).then(data=>{
      this.transferAirportSeach = data;
      console.log("getTransferAirportSeach", this.transferAirportSeach)
    }).catch(err=>{
      console.log(err)
    })
  }
  selectedAirportSeach(value){
    console.log(value);
    this.transferAirport(value).then( () => { this.navCtrl.pop() });
  }

  onChangeAirlines(ev){
    ev=ev.replace(" ", "%20");
    this.transferProvider.getTransferAirlinesSeach(ev).then(data=>{
      this.transferAirlinesSeach = data;
      console.log("getTransferAirlinesSeach", this.transferAirlinesSeach)
    }).catch(err=>{
      console.log(err)
    })
  }
  selectedAirlinesSeach(value){
    console.log(value);
    this.transferAirLines(value).then( () => { this.navCtrl.pop() });
  }

}
