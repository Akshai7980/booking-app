import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ModalController,LoadingController, ToastController } from "ionic-angular";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { CruiseProvider } from "../../providers/cruise/cruise";
import { AddFlightHotelTravelsComponent } from '../../components/add-flight-hotel-travels/add-flight-hotel-travels';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { CruiseSearchPage } from '../cruise-search/cruise-search';
/**
 * Generated class for the BundleSaveSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bundle-save-search-engine',
  templateUrl: 'bundle-save-search-engine.html',
})
export class BundleSaveSearchEnginePage {

  flightWay = 1;
  departDate: Date = new Date();
  returnDate: Date = new Date();
  minCheckOutDate: Date = new Date();
  personDetail = { adults: 1, children: 0, infants: 0};
  flightClass = "Economy";
  destinationDetail = [{
      from: { id: "871", AirportCode: "BOM", AirportName: "Chhatrapati Shivaji International Airport", City: "Mumbai", Country: "India" },
      to: { id: "801", AirportCode: "BLR", AirportName: "Bengaluru International Airport", City: "Bangalore", Country: "India" }, date: new Date()
    }];
  fromCity = { id: "871", AirportCode: "BOM", AirportName: "Chhatrapati Shivaji International Airport", City: "Mumbai", Country: "India" };
  toCity={ id: "801", AirportCode: "BLR", AirportName: "Bengaluru International Airport", City: "Bangalore", Country: "India" };
  currencys: any;currency;
  dest;
  rowNumber = 0;
  hotelCity={ id:"1", city:"Bangalore", country:"India" }
  totalAdultCount=0; totalChildCount=0; totalInfantCount=0;
  rooms=[{ adult:1, child:0, child_age:[0], infant:0,infant_age:[],roomSize:1 }];
  holidaySearchType = 1;
  tourThemes=[];
  tourTheme =  {
    "id": "7",
    "category": "Family Holidays"
};
  tourTypes =[];
  tourType = {"type":"Private Tours"};
  packege = {
    name: "Best of India",
    country: "India"
  };
  loading;
  continents=[];
  continent = {
    id: "1",
    continent: " Africa",
    image: "1.jpg"
  };
  country = null;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public jsonSearchProvider:JsonSearchProvider,
    public cruiseProvider:CruiseProvider,
   
  ) {
    this.currency = this.navParams.get("currency");
    this.getAdultCount();
    this.departDate.setHours(0,0,0,0);
    this.returnDate.setDate(this.returnDate.getDate()+1);
    this.returnDate.setHours(0,0,0,0);
    this.minCheckOutDate=new Date(this.returnDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BundleSaveSearchEnginePage');
  }
  
  

  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Dates',
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
 
  getCountry() {
    this.navCtrl.push(CruiseSearchPage, { callback: this.getData });
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if (data) {
        this.packege = data;
      }
      console.log(data);
     resolve();
    });
  };

  goBack() {
    this.navCtrl.pop();
  }

  // getContinent() {
  //   this.presentLoading();
  //   if(this.continents.length>0){
  //     this.continentAlert(this.continents);
  //   }else{
  //     this.cruiseProvider.getHolidayContinentSeach()
  //     .then(data => {
  //       console.log(data);
  //       this.continents=[];
  //       this.continentAlert(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }

  // }

  continentAlert(transferRegion) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Continent");
    for (let i = 0; i < transferRegion.length; i++) {
      alert.addInput({
        type: "radio",
        label: transferRegion[i].continent,
        value: transferRegion[i],
        checked: this.continent == transferRegion[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.continent = data;
        this.country = null;
      }
    });

    alert.present();
  }

  // getCountryq(){
  //   this.presentLoading();
  //   let jsonObj={
  //     id:this.continent.id
  //   }
  //   this.cruiseProvider.getHolidayCountrySeach(jsonObj).then(data=>{
  //     if(data){
  //       this.countryAlert(data);
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }

  countryAlert(transferRegion) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Country");
    for (let i = 0; i < transferRegion.length; i++) {
      alert.addInput({
        type: "radio",
        label: transferRegion[i].destination,
        value: transferRegion[i],
        checked: this.country == transferRegion[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.country = data;
      }
    });

    alert.present();
  }

  // typeSelection(){
  //   this.presentLoading();
  //   if(this.tourTypes.length>0){
  //     this.typesAlert(this.tourTypes);
  //   }else{
  //     this.cruiseProvider.getHolidayTypeSeach()
  //     .then(data => {
  //       console.log(data);
  //       this.tourTypes=[];
  //       this.typesAlert(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  // }

  typesAlert(transferRegion) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Continent");
    for (let i = 0; i < transferRegion.length; i++) {
      alert.addInput({
        type: "radio",
        label: transferRegion[i].type,
        value: transferRegion[i],
        checked: this.tourType == transferRegion[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.tourType = data;
      }
    });

    alert.present();
  }

  // themeSelection(){
  //   this.presentLoading();
  //   if(this.tourThemes.length>0){
  //     this.themesAlert(this.tourThemes);
  //   }else{
  //     this.cruiseProvider.getHolidayThemeSeach()
  //     .then(data => {
  //       console.log(data);
  //       this.tourThemes=[];
  //       this.themesAlert(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  // }

  themesAlert(transferRegion) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Continent");
    for (let i = 0; i < transferRegion.length; i++) {
      alert.addInput({
        type: "radio",
        label: transferRegion[i].category,
        value: transferRegion[i],
        checked: this.tourTheme == transferRegion[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.tourTheme = data;
      }
    });

    alert.present();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({});

    this.loading.present();
  }

  // searchHolidays(){
  //   let jsonObj:any={};
  //   if(this.holidaySearchType==1){
  //     jsonObj={
  //       place_search:this.packege.name+','+this.packege.country,
  //       searchby:1
  //     }
  //   }else{
  //     jsonObj={
  //       type:this.tourType.type,
  //       theme:this.tourTheme.category,
  //       country:this.country.destination,
  //       searchby:2
  //     }
  //   }
  //   // this.navCtrl.push({
  //   //   jsonObj:jsonObj
  //   // })
  // }
 
}

