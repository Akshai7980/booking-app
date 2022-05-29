import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Slides } from 'ionic-angular';
import { AddHotelRoomsComponent } from '../../components/add-hotel-rooms/add-hotel-rooms';
import { DatePicker } from '@ionic-native/date-picker';
import { HotelCitySearchPage } from '../hotel-city-search/hotel-city-search';
import { HotelResultsPage } from '../hotel-results/hotel-results';
import { Geolocation } from '@ionic-native/geolocation';
import { CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import { HotelsProvider } from '../../providers/hotels/hotels';


/**
 * Generated class for the HotelSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-search-engine',
  templateUrl: 'hotel-search-engine.html',
})
export class HotelSearchEnginePage {
  @ViewChild('imageSlide') imageSlide: Slides;
  rooms = [{room_no:1, adult: 2, child: 0, child_age: [2], roomSize:1}];
  totalAdultCount=0;
  totalChildCount=0;
  hotelCity={city: "Bangalore",content: "in",country: "India",flag: "1",id: "68365",latitude: null,longitude: null};
  checkInDate=new Date();
  checkoutDate=new Date();
  minCheckOutDate=new Date();
  currency;hotelOffers;
  
  HotelMarkupDest; HotelMarkupFare; HotelMarkupDate; HotelMarkupStar;  HotelMarkupB2c;HotelMarkup; hotelAllMarkup;HotelFix;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,
    public datePicker:DatePicker,private geolocation: Geolocation, public hotelProvider: HotelsProvider) {
    this.currency = this.navParams.get("currency");  
    this.hotelOffers = this.navParams.get("hotelOffers");
    this.getAdultCount();
    this.checkInDate.setHours(0,0,0,0);
    this.checkoutDate.setDate(this.checkoutDate.getDate()+1);
    this.checkoutDate.setHours(0,0,0,0);
    this.minCheckOutDate=new Date(this.checkoutDate);
  }


 
  ionViewDidLoad() {
   // this.getlocation();
    console.log('ionViewDidLoad HotelSearchEnginePage');
    this.getmarkp();

  }
  getPassportExpiryDate() {
    this.datePicker.show({
      date: new Date(),
      mode: "date",
      // maxDate: this.maxDate,
      // minDate: this.minDate,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
      .then(
        date => {
          console.log("Got date: ", date);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  getmarkp(){
    this.hotelProvider.getMarkup().then((data) => {
    this.HotelMarkup = data;
    var objamt = {
      // dest: this.HotelMarkup.hot_dest[0] == null ? 0 : parseInt(this.HotelMarkup.hot_dest[0].markup),
      // fare: this.HotelMarkup.hot_fare[0] == null ? 0 : parseInt(this.HotelMarkup.hot_fare[0].markup),
      // date: this.HotelMarkup.hot_date[0] == null ? 0 : parseInt(this.HotelMarkup.hot_date[0].markup),
      // star: this.HotelMarkup.hot_star[0] == null ? 0 : parseInt(this.HotelMarkup.hot_star[0].markup),
      b2c: this.HotelMarkup.b2c_markup[0] == null ? 0 : parseInt(this.HotelMarkup.b2c_markup[0].markup)
    };
    this.hotelAllMarkup = objamt
    var objFix = {
      // dest: this.HotelMarkup.hot_dest[0] == null ? 0 : parseInt(this.HotelMarkup.hot_dest[0].fix),
      // fare: this.HotelMarkup.hot_fare[0] == null ? 0 : parseInt(this.HotelMarkup.hot_fare[0].fix),
      // date: this.HotelMarkup.hot_date[0] == null ? 0 : parseInt(this.HotelMarkup.hot_date[0].fix),
      // star: this.HotelMarkup.hot_star[0] == null ? 0 : parseInt(this.HotelMarkup.hot_star[0].fix),
      b2c: this.HotelMarkup.b2c_markup[0] == null ? 0 : parseInt(this.HotelMarkup.b2c_markup[0].fix)
    };
    this.HotelFix = objFix
    

    })
    .catch((err) => {
      console.error(err);
    });
  }

  openCalendar() {
    
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Dates',
      closeLabel: '',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      console.log(date);
      if(date){
        this.checkInDate = date.from.dateObj;
        this.checkoutDate = date.to.dateObj;
      }
      else {
        myCalendar.onDidDismiss
       }
      console.log(type);
    });
  }

  addRoomDetails(){
    let travellersModal = this.modalCtrl.create(
      AddHotelRoomsComponent,
      {
        rooms:this.rooms
      },
      { cssClass: "addHotelRooms" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.rooms = data.rooms;
        this.totalAdultCount=0;
        this.totalChildCount=0;
        this.getAdultCount();
      }
    });
  }

  getAdultCount(){
    for (let i = 0; i < this.rooms.length; i++) {
      this.totalAdultCount=this.totalAdultCount+this.rooms[i].adult;
      this.totalChildCount=this.totalChildCount+this.rooms[i].child;
    }
  }

  getNightStayDays(){
    let one_day=1000*60*60*24;
    let date1=this.checkInDate.getTime();
    let date2=this.checkoutDate.getTime();
    return Math.round((date2-date1)/one_day);
  }


  selectCheckInDate() { 
    this.datePicker.show({
        date: this.checkInDate,
        mode: "date",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        //minDate: new Date(),
        minDate: new Date().setHours(new Date().getHours()+0.1),
        maxDate: new Date().setFullYear(new Date().getFullYear() + 1)
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.checkInDate = new Date(date);
          this.checkInDate.setHours(0,0,0,0);
          this.checkoutDate = new Date(date);
          this.checkoutDate.setDate(this.checkoutDate.getDate()+1);
          this.checkoutDate.setHours(0,0,0,0);
          console.log(this.checkoutDate,this.checkInDate)
          this.minCheckOutDate=new Date(this.checkoutDate);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  selectCheckOutDate() {
    this.datePicker
      .show({
        date: this.checkInDate,
        mode: "date",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        minDate: this.minCheckOutDate.setHours(new Date().getHours()+0.1),
        //minDate: this.minCheckOutDate,
        maxDate: new Date().setFullYear(new Date().getFullYear() + 1)
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.checkoutDate = new Date(date);
          this.checkoutDate.setHours(0,0,0,0);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  getHotelCity(){
    this.navCtrl.push(HotelCitySearchPage, { callback: this.getData });
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.hotelCity=data
      }
      console.log(data);
      resolve();
    });
  };

  goBack(){
    this.navCtrl.pop();
  }

  getlocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
        console.log('location', resp.coords.latitude + '---' +resp.coords.longitude)
      this.hotelCity.latitude = resp.coords.latitude;
      this.hotelCity.longitude = resp.coords.longitude;
      console.log(this.hotelCity)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  searchHotel(){
    this.navCtrl.push(HotelResultsPage,{
      hotelCity:this.hotelCity,
      rooms:this.rooms,
      checkInDate:this.checkInDate,
      checkoutDate:this.checkoutDate,
      currency:this.currency,
      getNightStayDays: this.getNightStayDays(),
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix
    })
  }


  
  
}
