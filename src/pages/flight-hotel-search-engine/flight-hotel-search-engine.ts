import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ModalController, ToastController,Slides } from "ionic-angular";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { FlightsProvider } from "../../providers/flights/flights";
import { AddFlightHotelTravelsComponent } from '../../components/add-flight-hotel-travels/add-flight-hotel-travels';
import { FlightAirportSearchPage } from '../flight-airport-search/flight-airport-search';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { HotelsProvider } from '../../providers/hotels/hotels';
import { FlightFlightResultsPage } from '../flight-flight-results/flight-flight-results';
/**
 * Generated class for the FlightHotelSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-hotel-search-engine',
  templateUrl: 'flight-hotel-search-engine.html',
})
export class FlightHotelSearchEnginePage {
  @ViewChild('imageSlide') imageSlide: Slides;
  fromCity = {
    id: "871",
    AirportCode: "BOM",
    AirportName: "Chhatrapati Shivaji International Airport",
    City: "Mumbai",
    Country: "India"
  };
  toCity = {
    id: "801",
    AirportCode: "BLR",
    AirportName: "Bengaluru International Airport",
    City: "Bangalore",
    Country: "India"
  };  flightWay = 1;  flightClass = "Economy";dest;
  departDate: Date = new Date();
  returnDate: Date = new Date();
  minCheckOutDate: Date = new Date();
  currency; currencys =[];
  totalAdultCount=0; totalChildCount=0; totalInfantCount=0;
  rooms=[{room_no:1, adult:1, child:0, child_age: [2], infant:0,infant_age:[],roomSize:1 }];
 
  SightseeingDeals;
  HotelMarkup; hotelAllMarkup;HotelFix;
  FlightAllMarkup;flightMarkup;FlightAllFix;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public jsonSearchProvider:JsonSearchProvider,
    public flightProvider:FlightsProvider,
    public hotelProvider:HotelsProvider
   
  ) {
    this.currency = this.navParams.get("currency");
    this.SightseeingDeals = this.navParams.get("SightseeingDeals");
    this.getAdultCount();
    this.departDate.setHours(0,0,0,0);
    this.returnDate.setDate(this.returnDate.getDate()+1);
    this.returnDate.setHours(0,0,0,0);
    this.minCheckOutDate=new Date(this.returnDate);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightHotelSearchEnginePage');
   this.getcurrency();
   this.getmarkp();
   this.getFlightmarkp();
    console.log('ionViewDidLoad HotelSearchEnginePage');
  }

  getmarkp(){
    this.hotelProvider.getMarkup().then((data) => {
    this.HotelMarkup = data;
    var objamt = {
      dest: this.HotelMarkup.hot_dest[0] == null ? 0 : parseInt(this.HotelMarkup.hot_dest[0].markup),
      fare: this.HotelMarkup.hot_fare[0] == null ? 0 : parseInt(this.HotelMarkup.hot_fare[0].markup),
      date: this.HotelMarkup.hot_date[0] == null ? 0 : parseInt(this.HotelMarkup.hot_date[0].markup),
      star: this.HotelMarkup.hot_star[0] == null ? 0 : parseInt(this.HotelMarkup.hot_star[0].markup),
      b2c: this.HotelMarkup.b2c_markup[0] == null ? 0 : parseInt(this.HotelMarkup.b2c_markup[0].markup)
    };
    this.hotelAllMarkup = objamt
    var objFix = {
      dest: this.HotelMarkup.hot_dest[0] == null ? 0 : parseInt(this.HotelMarkup.hot_dest[0].fix),
      fare: this.HotelMarkup.hot_fare[0] == null ? 0 : parseInt(this.HotelMarkup.hot_fare[0].fix),
      date: this.HotelMarkup.hot_date[0] == null ? 0 : parseInt(this.HotelMarkup.hot_date[0].fix),
      star: this.HotelMarkup.hot_star[0] == null ? 0 : parseInt(this.HotelMarkup.hot_star[0].fix),
      b2c: this.HotelMarkup.b2c_markup[0] == null ? 0 : parseInt(this.HotelMarkup.b2c_markup[0].fix)
    };
    this.HotelFix = objFix
    console.log(this.HotelFix);
    console.log(this.hotelAllMarkup);

    })
    .catch((err) => {
      console.error(err);
    });
  }

  getFlightmarkp(){
    this.flightProvider.getMarkup().then((data) => {
    this.flightMarkup = data;
    var objmarkup = {
      dest: this.flightMarkup.fli_dest[0] == null ? 0 : parseInt(this.flightMarkup.fli_dest[0].markup),
      fare: this.flightMarkup.fli_fare[0] == null ? 0 : parseInt(this.flightMarkup.fli_fare[0].markup),
      date: this.flightMarkup.fli_date[0] == null ? 0 : parseInt(this.flightMarkup.fli_date[0].markup),
      star: this.flightMarkup.fli_air[0] == null ? 0 : parseInt(this.flightMarkup.fli_air[0].markup),
      b2c: this.flightMarkup.b2c_markup[0] == null ? 0 : parseInt(this.flightMarkup.b2c_markup[0].markup)
    };
    this.FlightAllMarkup = objmarkup
    console.log(this.FlightAllMarkup);
    var objFix = {
      dest: this.flightMarkup.fli_dest[0] == null ? 0 : parseInt(this.flightMarkup.fli_dest[0].fix),
      fare: this.flightMarkup.fli_fare[0] == null ? 0 : parseInt(this.flightMarkup.fli_fare[0].fix),
      date: this.flightMarkup.fli_date[0] == null ? 0 : parseInt(this.flightMarkup.fli_date[0].fix),
      star: this.flightMarkup.fli_air[0] == null ? 0 : parseInt(this.flightMarkup.fli_air[0].fix),
      b2c: this.flightMarkup.b2c_markup[0] == null ? 0 : parseInt(this.flightMarkup.b2c_markup[0].fix)
    };
    this.FlightAllFix = objFix
    console.log(this.FlightAllFix);
    console.log(this.flightMarkup);
    })
    .catch((err) => {
      console.error(err);
    });
  }  
  getcurrency(){
    this.flightProvider.getcurrency(this.currency).then(data=>{
      console.log(data);
      this.currencys = data; 
    }).catch(err=>{
      console.log(err)
    })
  } 
  openCalendar() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Dates',
      defaultScrollTo:  new Date(year, month + 1, day),
      closeLabel: '',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      console.log(date);
      if(date){
        this.departDate = date.from.dateObj;
        this.returnDate = date.to.dateObj;
      }
      else {
        myCalendar.onDidDismiss

       }
      console.log(type);
    });
  }

  getNightStayDays(){
    let one_day=1000*60*60*24;
    let date1=this.departDate.getTime();
    let date2=this.returnDate.getTime();
    return Math.round((date2-date1)/one_day);
  }
  
  goBack() {
    this.navCtrl.pop();
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  classSelection() {
    const actionSheet  = this.actionSheetCtrl.create({
    title: 'CABIN CLASS',
    buttons: [
      {text: 'Economy',role: 'Economy',
        handler: () => {this.flightClass = "Economy"}
      },{text: 'Business',role: 'Business',
        handler: () => {this.flightClass = "Business"}
      },{text: 'First Class', role: 'First',
        handler: () => {this.flightClass = "First"}
      },
      {text: 'Premium Economy', role: 'Premium',
        handler: () => {this.flightClass = "Premium"}
      }]
  });
  actionSheet.present();
} 

 
  travellerSelection(){
    let travellersModal = this.modalCtrl.create(
      AddFlightHotelTravelsComponent,
      {
        rooms:this.rooms,
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
        this.totalInfantCount=0;
        this.getAdultCount();
        
      }
      
    });
  }
  
  getAdultCount(){
    for (let i = 0; i < this.rooms.length; i++) {
      this.totalAdultCount=this.totalAdultCount+this.rooms[i].adult;
      this.totalChildCount=this.totalChildCount+this.rooms[i].child;
      this.totalInfantCount=this.totalInfantCount+this.rooms[i].infant;
    }
  }
  
  swap(event) {
    event.stopPropagation();
    let temp = JSON.parse(JSON.stringify(this.fromCity));
    this.fromCity = JSON.parse(JSON.stringify(this.toCity));
    this.toCity = temp;
  }

  getFromAirport() {
    this.dest = "from";
    this.navCtrl.push(FlightAirportSearchPage, { callback: this.getData });
  }

  getToAirport() {
    this.dest = "to";
    this.navCtrl.push(FlightAirportSearchPage, { callback: this.getData });
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
        if (this.dest == "from") {
          this.fromCity = data;
        } else {
          this.toCity = data;
        }
      console.log(data);
     resolve();
    });
  };
 
 
  hotelSelected(){
    this.navCtrl.push(FlightFlightResultsPage,{
      hotelCity: this.toCity,
      hotelCountry: this.toCity.Country,
      rooms: this.rooms,
      getNightStayDays: this.getNightStayDays(),
      fromCity: this.fromCity,
      toCity: this.toCity,
      departDate: this.departDate,
      returnDate: this.returnDate,
      flightClass: this.flightClass,
      currencys: this.currencys,
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
    })
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
 

 
}
