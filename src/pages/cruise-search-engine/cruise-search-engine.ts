import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController,AlertController,LoadingController,ToastController,Slides } from "ionic-angular";
import { AddSightSeeingTravelsComponent } from '../../components/add-sight-seeing-travels/add-sight-seeing-travels';
import { CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import { CruiseProvider } from '../../providers/cruise/cruise';
import { CruiseResultsPage } from '../cruise-results/cruise-results';
import { CruiseCountryComponent } from '../../components/cruise-country/cruise-country';
import { PortComponent } from "../../components/port/port";

/**
 * Generated class for the CruiseSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-search-engine',
  templateUrl: 'cruise-search-engine.html',
})
export class CruiseSearchEnginePage {
  @ViewChild('imageSlide') imageSlide: Slides;
  Countryes=[];dest=[];
  residentCountry= {area: "Asia", languagecode: "en",name: "Bangladesh"};
  destination =  "Asia";
  
  ports =  {port_name: "Singapore"};
  departureDate=new Date();
  returnDate=new Date();
  minCheckOutDate=new Date();
  currencys;
  loading;
  sightSeeingTravels = {adults: 1, childs: 0, child_ages: [0]};
  AdultCount={adults:1};
  ChildCount={childs:0};
  SightseeingDeals;
  cruiseAllMarkup;cruiseMarkup;cruiseAllFix;
  constructor( public navCtrl: NavController, public navParams: NavParams, public cruiseProvider: CruiseProvider,
    public modalCtrl: ModalController, public alertCtrl :AlertController,public toastCtrl: ToastController,
    public loadingCtrl:LoadingController) {
    this.currencys = this.navParams.get("currencys");
    this.SightseeingDeals = this.navParams.get("SightseeingDeals");
    this.departureDate.setHours(0,0,0,0);
    this.returnDate.setDate(this.returnDate.getDate()+1);
    this.returnDate.setHours(0,0,0,0);
    this.minCheckOutDate=new Date(this.returnDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseSearchEnginePage');
    this.getmarkp()
  }
  
  getCountry() {
    let nationalityModal = this.modalCtrl.create(
      CruiseCountryComponent,
      { residentCountry: this.residentCountry },
      { cssClass: "searchCountryNameModel" }
    );
    nationalityModal.present();
    nationalityModal.onDidDismiss(data => {
      if (data) {
        this.destination=data.name
      }
      console.log(data);
    });
  } 

  getCountryCitya() {
    let nationalityModal = this.modalCtrl.create(
      PortComponent,
      { residentCountry: this.residentCountry ,destination:this.destination },
      
      { cssClass: "searchCountryNameModel" }
    );
    nationalityModal.present();
    nationalityModal.onDidDismiss(data => {
      if (data) {
        this.destination=data.name
      }
      console.log(data);
    });
  } 

  getCountrya() {
    this.presentLoading();
    if(this.Countryes.length>0){
      this.continentAlert(this.Countryes);
    }else{
      this.cruiseProvider.getCruiseCuntry().then(data => {
        console.log(data);
        // this.Countryes=[];
        this.continentAlert(data);
      })
      .catch(err => {
        console.log(err);
      });
    }

  }

  continentAlert(data) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Where Would you like  to go?");
    for (let i = 0; i < data.length; i++) {
      alert.addInput({
        type: "radio",
        label: data[i].area,
        value: data[i],
        checked: this.destination == data[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.destination = data;
       // this.country = null;
      }
    });

    alert.present();
  }

  getCountryCity(){
    this.presentLoading();
      this.cruiseProvider.getPorts(this.destination).then(data => {
        console.log(data);
        if(data == null){
          this.presentToast("No ports available");
        }
        // this.dest=[];
        this.destinationAlert(data);
      })
      .catch(err => {
        console.log(err);
      });
    
  }

  destinationAlert(data) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Select Port Name");
    for (let i = 1; i < data.length; i++) {
      alert.addInput({
        type: "radio",
        label: data[i].port_name,
        value: data[i],
        checked:this.ports == data[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        if(data==undefined)
        this.presentToast("You have not selected any ports")
        else{
          this.ports = data;
        }
          
      }
    });

    alert.present();
  }

  
  selectCheckInDate() {
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
        this.departureDate = date.from.dateObj;
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
    let date1=this.departureDate.getTime();
    let date2=this.returnDate.getTime();
    return Math.round((date2-date1)/one_day);
  }
  goBack() {
    this.navCtrl.pop();
  }
   
  Adults=[1,2,3,4,5];

  getAdults() {
    let timeData = [];
    for(let i=0;i<this.Adults.length;++i){
      timeData.push({
        type: 'radio',
        label : this.Adults[i],
        value : this.Adults[i],
        checked : i === 0
      });
    }
    let alert = this.alertCtrl.create({
        title : 'Adults Count',
        inputs : timeData,
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        
        this.AdultCount.adults = data;
        console.log("Radio data:", this.AdultCount.adults);
      }
    });
    
   alert.present();
  
  }
  Childs = [1,2,3,4];
  getChlild() {
    let timeData = [];
    for(let i=0;i<this.Childs.length;++i){
      timeData.push({
        type: 'radio',
        label : this.Childs[i],
        value : this.Childs[i],
        checked : i === 0
      });
    }
    let alert = this.alertCtrl.create({
        title : 'Child Count',
        inputs : timeData,
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        
        this.ChildCount.childs = data;
        console.log("Radio data:", this.ChildCount.childs);
      }
    });
    
   alert.present();
  
  }
  getAdult(){
    let travellersModal = this.modalCtrl.create(
      AddSightSeeingTravelsComponent,
      {
        sightSeeingTravels:this.sightSeeingTravels
      },
      { cssClass: "addHotelRooms" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.sightSeeingTravels = data.sightSeeingTravels;
      }
    });
  }
  

  getmarkp(){
    this.cruiseProvider.getMarkup().then((data) => {
    this.cruiseMarkup = data;
    var objmarkup = {
      b2c: this.cruiseMarkup.b2c_markup[0] == null ? 0 : parseInt(this.cruiseMarkup.b2c_markup[0].markup)
    };
    this.cruiseAllMarkup = objmarkup
    console.log(this.cruiseAllMarkup);
    var objFix = {
     b2c: this.cruiseMarkup.b2c_markup[0] == null ? 0 : parseInt(this.cruiseMarkup.b2c_markup[0].fix)
    };
    this.cruiseAllFix = objFix
    console.log(this.cruiseAllFix);
    console.log(this.cruiseMarkup);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({});

    this.loading.present();
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
  searchSightSeeing(){
    this.navCtrl.push(CruiseResultsPage,{
      destination:this.destination,
      ports:this.ports,
      departureDate:this.departureDate,
      returnDate:this.returnDate,
      AdultCount:this.AdultCount,
      ChildCount:this.ChildCount,
      currencys:this.currencys,
      cruiseAllMarkup: this.cruiseAllMarkup,
      cruiseAllFix:this.cruiseAllFix,
    });
  }
}


