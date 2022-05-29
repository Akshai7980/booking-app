import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelsProvider } from '../../providers/hotels/hotels';
import { HotelDetailPage } from '../hotel-detail/hotel-detail';


/**
 * Generated class for the HotelResultsSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-results-search',
  templateUrl: 'hotel-results-search.html',
})
export class HotelResultsSearchPage {
  timer = null;
  searchTerm="";
  sessionId="";
  nextToken=0;
  hotelSearchResults=[];
  rooms;
  checkInDate=new Date();
  checkoutDate=new Date();
  hotelCity = { city: "Bangalore", countryname: "India", giataId: null,
    hotelName: null, id: "5645", latitude: "13.066699981689",
    longitude: "77.716697692871",type: "City"
  };
  hotelCities = [];
  callback;
  subLocalityList=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public hotelProvider:HotelsProvider) {
      this.sessionId=this.navParams.get('sessionId');
      this.rooms=this.navParams.get('rooms');
      this.checkInDate=this.navParams.get('checkInDate');
      this.checkoutDate=this.navParams.get('checkoutDate');

    this.callback = this.navParams.get('callback');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelResultsSearchPage');
  }


onChange(ev){
    console.log(ev)
    ev=ev.replace(" ", "%20");
    this.hotelProvider.getHotelCitySeach(ev).then(data=>{
      this.hotelCities = data;
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }
  selectedCity(searchTerm){
    console.log(searchTerm);
    this.getHotelSearchByName(searchTerm)
    console.log("citygetHotelSearchByName", this.getHotelSearchByName(searchTerm));
  }
  // onChange(searchTerm){
  //   console.log("",searchTerm)
  //  this.getHotelSearchByName(searchTerm)
  // }
  getHotelSearchByName(searchTerm):any{
    // searchTerm=searchTerm.replace(" ", "%20");
    let obj = {};
    obj = {
      maxResult: 20,
      sessionId: this.sessionId,
      filters: {
        hotelName: searchTerm.id
      },
    };
    obj = JSON.parse(JSON.stringify(obj));
    console.log("obj:", obj);
    this.hotelProvider.getHotelCitySeach(obj).then(data=>{
       console.log("return",data);   
      //  this.sessionId=data.status.sessionId;
      //  if(data.itineraries.length>0){
      //    this.hotelSearchResults=data.itineraries
      //  }else{
      //    this.hotelSearchResults=[]
      //  }
     }).catch(err=>{
       console.log(err);
     })
   }

  

  
  

  
   goBack(){
     this.navCtrl.pop();
   }

   hotelSelected(hotel){
    this.navCtrl.push(HotelDetailPage,{
      sessionId: this.sessionId,
      hotelDetail: hotel,
      hotelCity: this.hotelCity,
      rooms: this.rooms,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate
    })
  }

}
