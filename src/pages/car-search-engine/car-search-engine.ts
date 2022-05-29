import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController,Slides } from "ionic-angular";
import { SearchCountryCodeComponent } from "../../components/search-country-code/search-country-code";
import { CarCitySearchPage } from "../car-city-search/car-city-search";
import { DatePicker } from "@ionic-native/date-picker";
import { CarResultsPage } from "../car-results/car-results";
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { addres } from '../../providers/constants/constants';

/**
 * Generated class for the CarSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-car-search-engine",
  templateUrl: "car-search-engine.html"
})
export class CarSearchEnginePage {
  @ViewChild('imageSlide') imageSlide: Slides;
  addres;
  pickUpLocation = {
    id: "4861",
    cityCode: "55052",
    location_name: "Bangalore Airport",
    latitude: "13.19800000",
    longitude: "77.70800000",
    address: "Meet And Greet Service, Bangalore, 560 043",
    city: "Bangalore",
    country_code: "IN",
    isairport: "1",
    airport_code: "BLR",
    isRailway_station: "0"
  };
  dropOffLocation = {
    id: "4861",
    cityCode: "55052",
    location_name: "Bangalore Airport",
    latitude: "13.19800000",
    longitude: "77.70800000",
    address: "Meet And Greet Service, Bangalore, 560 043",
    city: "Bangalore",
    country_code: "IN",
    isairport: "1",
    airport_code: "BLR",
    isRailway_station: "0"
  };
  residentCountry= "IN";
  driver_age=25;
  location='PickUp';
  pickUpDate: Date = new Date();
 // tempPickUpdate: Date = new Date();
  dropOffDate: Date = new Date();
  sameLocation: boolean = true;
  diffLocation: boolean = true;
  arrivaltime=[{ houres :'10', mintues: '00'}];
  departuretime=[{ houres :'10', mintues: '30'}];
  currency;SightseeingDeals;
  constructor( public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public alertCtrl:AlertController, public toastCtrl:ToastController, public datePicker:DatePicker) {
      this.addres=addres;
      this.pickUpDate.setHours(10,0,0,0);
      this.dropOffDate.setDate(this.dropOffDate.getDate()+2);
      this.dropOffDate.setHours(10,0,0,0);
     // this.tempPickUpdate=new Date(this.dropOffDate);
      this.currency = this.navParams.get("currency");
      this.SightseeingDeals = this.navParams.get("SightseeingDeals");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CarSearchEnginePage");
  }

  goBack() {
    this.navCtrl.pop();
  }

  checkBoxChanged() {
    console.log(this.sameLocation);
    if (this.sameLocation) {
      this.dropOffLocation = this.pickUpLocation;
    }
    else{
      if(this.diffLocation)
      this.dropOffLocation = {
        id: "4790",
        cityCode: "24016",
        location_name: "Bangalore Downtown",
        latitude: "12.97200000",
        longitude: "77.59400000",
        address: "A-45 Ravi Building Jalhali Village Near:hmt Colony Bangalore , Bangalore, 560 008",
        city: "Bangalore",
        country_code: "IN",
        isairport: "1",
        airport_code: null,
        isRailway_station: "0"
      };
     this.presentToast ('Please select other drop off location.')

    } (this.diffLocation)
  }

 

  // getCarLocations(location){
  //   this.location=location;
  //   this.navCtrl.push(CarCitySearchPage, { callback: this.getData });
  // }

  getCarPickUpLocations(){
    this.location='PickUp';
    this.navCtrl.push(CarCitySearchPage, { callback: this.getData });
  }
  
  getCarDropOffLocations(){
    if(!this.sameLocation){
      this.location='DropOff';
      this.navCtrl.push(CarCitySearchPage, { callback: this.getData });
    }
    
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        if(this.location=='PickUp'){
          this.pickUpLocation=data;
          this.dropOffLocation=data;
        }else{
          if(this.pickUpLocation.country_code==data.country_code){
           
            this.dropOffLocation=data
          } else{
            this.presentToast('Please select other drop off location.')
            this.dropOffLocation=data
           
          }
        }
      }
      console.log(data);
     resolve();
    });
  };

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

  selectPickUpDate() {
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
        this.pickUpDate = date.from.dateObj;
        this.dropOffDate = date.to.dateObj;
      }
      else {
        myCalendar.onDidDismiss

       }
      console.log(type);
    });
  }
  time=[
    {houres:'00',mintues:'00'},
    {houres:'00',mintues:'30'},
    {houres:'01',mintues:'00'},
    {houres:'01',mintues:'30'},
    {houres:'02',mintues:'00'},
    {houres:'02',mintues:'30'},
    {houres:'03',mintues:'00'},
    {houres:'03',mintues:'30'},
    {houres:'04',mintues:'00'},
    {houres:'04',mintues:'30'},
    {houres:'05',mintues:'00'},
    {houres:'05',mintues:'30'},
    {houres:'06',mintues:'00'},
    {houres:'06',mintues:'30'},
    {houres:'07',mintues:'00'},
    {houres:'07',mintues:'30'},
    {houres:'08',mintues:'00'},
    {houres:'08',mintues:'30'},
    {houres:'09',mintues:'00'},
    {houres:'09',mintues:'30'},
    {houres:'10',mintues:'00'},
    {houres:'10',mintues:'30'},
    {houres:'11',mintues:'00'},
    {houres:'11',mintues:'30'},
    {houres:'12',mintues:'00'},
    {houres:'12',mintues:'30'},
    {houres:'13',mintues:'00'},
    {houres:'13',mintues:'30'},
    {houres:'14',mintues:'00'},
    {houres:'14',mintues:'30'},
    {houres:'15',mintues:'00'},
    {houres:'15',mintues:'30'},
    {houres:'16',mintues:'00'},
    {houres:'16',mintues:'30'},
    {houres:'17',mintues:'00'},
    {houres:'17',mintues:'30'},
    {houres:'18',mintues:'00'},
    {houres:'18',mintues:'30'},
    {houres:'19',mintues:'00'},
    {houres:'19',mintues:'30'},
    {houres:'20',mintues:'00'},
    {houres:'20',mintues:'30'},
    {houres:'21',mintues:'00'},
    {houres:'21',mintues:'30'},
    {houres:'22',mintues:'00'},
    {houres:'22',mintues:'30'},
    {houres:'23',mintues:'00'},
    {houres:'23',mintues:'30'},
  ]

  timeSelection() {
    let timeData = [];
    for(let i=0;i<this.time.length;++i){
      timeData.push({
        type: 'radio',
        label : this.time[i].houres +':'+ this.time[i].mintues,
        value : this.time[i],
        checked : i === 20
      });
    }
    let alert = this.alertCtrl.create({
        title : 'Please Select Time',
        inputs : timeData,
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", [data]);
        this.arrivaltime = [data];
      }
    });
    
   alert.present();
  
  }
  timeSelectionDepa() {
    let timeData = [];
    for(let i=0;i<this.time.length;++i){
      timeData.push({
        type: 'radio',
        label : this.time[i].houres +':'+ this.time[i].mintues,
        value : this.time[i],
        checked : i === 21
      });
    }
    let alert = this.alertCtrl.create({
        title : 'Please Select Time',
        inputs : timeData,
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", [data]);
        this.departuretime = [data];
      }
    });
    
   alert.present();
  
  }

  getCountry() {
    let nationalityModal = this.modalCtrl.create(
      SearchCountryCodeComponent,
      { isCountryAlpha: true },
      { cssClass: "searchCountryNameModel" }
    );
    nationalityModal.present();
    nationalityModal.onDidDismiss(data => {
      if (data) {
        this.residentCountry=data.countryAlpha.trim();
      }
      console.log(data);
    });
  } 

  selectDriverAge() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Select Driver Age");
    for (let i = 25; i < 71; i++) {
      alert.addInput({
        type: "radio",
        label: i.toString(),
        value: i.toString(),
        checked: this.driver_age == i
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.driver_age = data;
      }
    });

    alert.present();
  }
    searchCars(){
      this.navCtrl.push(CarResultsPage,{
        sameLocation:this.sameLocation,
        pickUpLocation:this.pickUpLocation,
        dropOffLocation:this.dropOffLocation,
        pickUpDate:this.pickUpDate,
        dropOffDate:this.dropOffDate,
        residentCountry:this.residentCountry,
        driver_age:this.driver_age,
        currency: this.currency,
        arrivaltime:this.arrivaltime,
        departuretime: this.departuretime,
      })
    }
  
}
