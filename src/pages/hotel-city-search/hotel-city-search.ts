import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelsProvider } from '../../providers/hotels/hotels';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the HotelCitySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-city-search',
  templateUrl: 'hotel-city-search.html',
})
export class HotelCitySearchPage {
  hotelCities = [];
  callback;
  location={
    latitude:null,
    longitude:null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public hotelProvider:HotelsProvider, private geolocation: Geolocation) {
    this.callback = this.hotelProvider.getHotelCitySeach('');
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelCitySearchPage');
    // this.getlocation();
  }

  onChange(ev){
   // console.log(ev)
    ev=ev.replace(" ", "%20");
    this.hotelProvider.getHotelCitySeach(ev).then(data=>{
      this.hotelCities = data;
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }

  selectedCity(city){
    console.log(city);
    this.callback(city).then( () => { this.navCtrl.pop() });
  }

  getlocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
        console.log('location', resp.coords.latitude + '---' +resp.coords.longitude)
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;
      console.log(this.location)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  selectedlocation(location){
    this.callback(location).then( () => { this.navCtrl.pop() });
  }

  goBack(){
    this.navCtrl.pop();
  }
}
