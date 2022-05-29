import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController,Slides } from "ionic-angular";
import { AddFlightTravellersComponent } from "../../components/add-flight-travellers/add-flight-travellers";
import { DatePicker } from "@ionic-native/date-picker";
import { TransferProvider } from "../../providers/transfer/transfer";
import { TransferResultsPage } from "../transfer-results/transfer-results";
import { TransferSearchPage } from '../transfer-search/transfer-search';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { addres } from '../../providers/constants/constants';



/**
 * Generated class for the TransferSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-transfer-search-engine",
  templateUrl: "transfer-search-engine.html"
})
export class TransferSearchEnginePage {
  addres;
  @ViewChild('imageSlide') imageSlide: Slides;
  transferCity={atype: "AP", city: "Bangalore",from_code: "BLR",pickup_lat_long: "13.1986351013184,77.7065963745117",value: "Bangalore (Bengaluru Intl. Airport) (BLR), Bangalore, India" };
  transferDest= {drop_code: "393641",drop_type: "GIATA", dropoff_lat_long: "12.972332,77.60870899999999",value: "Bangalore Residency, Bangalore, India"};
  flightWay = 1; pickUpType = 1;
  personDetail = { adults: 1, children: 0, infants: 0 };
  arrivalDate: Date = new Date(); departureDate: Date = new Date();
  arrivaltime=[{ houres :'10', mintues: '00'}];
  departuretime=[{ houres :'10', mintues: '30'}];
  pickUPLocation: any;dropOffLocation: any;loading;currencys;
  personDetails = {title: "", firstName: "", lastName: "", email: "", country_code: "", mobile_no: "",airline_code:"",location:"",
  flight_number:"",airline_name:"",flying2:"",flight_number2:"",airline_name2:"" };
  SightseeingDeals;
  constructor( public navCtrl: NavController,public navParams: NavParams,public modalCtrl: ModalController,
    public alertCtrl: AlertController,public datePicker: DatePicker,
    public transferProvider: TransferProvider,public toastCtrl: ToastController) {
    this.addres=addres;
    this.departureDate.setDate(this.departureDate.getDate()+3);
    this.currencys = this.navParams.get("currencys");
    console.log("currencys", this.currencys);
    this.SightseeingDeals = this.navParams.get("SightseeingDeals");
   
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TransferSearchEnginePage");
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

  selectedButton(selected) {
   this.flightWay = selected;
   console.log(this.flightWay);
  }

  goBack() {
    this.navCtrl.pop();
  }

  getPassengerDetails() {
    let travellersModal = this.modalCtrl.create(
      AddFlightTravellersComponent,
      {
        adults: this.personDetail.adults,
        children: this.personDetail.children,
        infants: this.personDetail.infants
      },
      { cssClass: "flightAddTraveller" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      if (data) {
        this.personDetail.adults = data.adults;
        this.personDetail.children = data.children;
        this.personDetail.infants = data.infants;
      }
      console.log(data);
    });
  }
 
  
  selectArrivalDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const options: CalendarModalOptions = {
      title: 'Select Dates',
      defaultScrollTo:  new Date(year, month + 1, day),
      closeLabel: '',
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options,
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      console.log(date);
      if(date){
        this.arrivalDate = date.dateObj;
      }
      else {
        myCalendar.onDidDismiss
       }
      console.log(type);
    });
  }

  selectDepartureDate() {
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
        this.arrivalDate = date.from.dateObj;
        this.departureDate = date.to.dateObj;
      }
      else {
        myCalendar.onDidDismiss

       }
      console.log(type);
    });
  }


  getPickUp(){
    this.navCtrl.push(TransferSearchPage, { 
      transferPickUp: this.getData 
    });
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.transferCity=data
       // console.log("sfhjsfhsj", this.transferCity)
      }
     resolve();
    });
  };

  getDropOff(){
    this.navCtrl.push(TransferSearchPage, {
      transferCity: this.transferCity,
      transferDropOff: this.getDatad 
    });
  }

  getDatad = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.transferDest=data
        console.log("transferDest", this.transferDest)
      }
     resolve();
    });
  };
 
  selectedAirportSeach(){
    this.navCtrl.push(TransferSearchPage, {
      transferAirport: this.getDatad 
    });
  }
 
  selectedAirlinesSeach(){
    this.navCtrl.push(TransferSearchPage, {
      transferAirLines: this.transferAirLines 
    });
  }

  transferAirLines = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.personDetails.flying2=data.AirLineName
        console.log("AirLineCode", this.personDetails.flying2)
      }
      resolve();
    });
  };
 
  searchTransfers() {
    if ((this.pickUpType==1 ||this.pickUpType==0) &&
      this.transferCity.from_code && this.transferDest.drop_code) {
      this.navCtrl.push(TransferResultsPage, {
        transferWay: this.flightWay,
        transferType: this.pickUpType,
        pickUPLocation: this.transferCity,
        dropOffLocation: this.transferDest,
        arrivalDate: this.arrivalDate,
        departureDate: this.departureDate,
        personDetail:this.personDetail,
        currencys: this.currencys,
        arrivaltime:this.arrivaltime,
        departuretime: this.departuretime,
      });
    }
     else {
      this.presentToast("Select all the fields.");
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



}
