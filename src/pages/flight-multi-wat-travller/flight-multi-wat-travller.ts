import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { FlightsProvider } from "../../providers/flights/flights";
import { FlightAddTravellerPage } from "../flight-add-traveller/flight-add-traveller";
import { FlightMultiWayVoucherPage } from '../flight-multi-way-voucher/flight-multi-way-voucher';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the FlightMultiWatTravllerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-multi-wat-travller',
  templateUrl: 'flight-multi-wat-travller.html',
})
export class FlightMultiWatTravllerPage {
  fromCity;
  toCity;
  flightInfo;
  departDate;
  returnDate;
  personDetail;
  flightClass;
  adults = [];
  children = [];
  infants = [];
  user;
  destInfo;
  isPostCode: boolean = false;
  isAreaCode: boolean = false;
  isNationality: boolean = false;
  postalCode = "";
  areaCode = "";
  personCategory;
  personNumber;
  loading;ORDER_ID;
  destinationDetails = [];AllflightInfo;adminBalance;FlightAllMarkup;FlightAllFix;currencys;
  payment = {name:"",cardtypelist:"",Card:"",DateMM:"",DateYY:"",CVV:"", };
  session_id;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public loginProvider: LoginProvider, public inAppBrowser: InAppBrowser,
    public flightProvider: FlightsProvider,public toastCtrl: ToastController
  ) {
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.destinationDetails = this.navParams.get("destinationDetails");
    this.AllflightInfo = this.navParams.get("AllflightInfo");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.adminBalance = this.navParams.get("adminBalance"),
    this.FlightAllFix = this.navParams.get("FlightAllFix")
    this.currencys= this.navParams.get("currencys");
    this.session_id  = this.navParams.get("session_id");
    for (let i = 0; i < this.personDetail.adults; i++) {
      let adult = {};
      this.adults.push(adult);
    }
    for (let i = 0; i < this.personDetail.children; i++) {
      let child = {};
      this.children.push(child);
    }
    for (let i = 0; i < this.personDetail.infants; i++) {
      let infant = {};
      this.infants.push(infant);
    }
  }

  ionViewDidLoad() {
   this.revalidatingFares();  
  }
 
 
  revalidatingFares() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }

    this.flightProvider.getRevalidatingFares(obj).then(data => {
        console.log("sghsfgligisgsg",data);
        if (data.AirRevalidateResponse.AirRevalidateResult.IsValid != "false") {
          this.flightInfo = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries;
          let requiredFields: any[] = this.flightInfo.RequiredFieldsToBook;
          if (requiredFields && requiredFields.length > 0) {
            if (requiredFields.indexOf("AreaCode")) {
              this.isAreaCode = true;
            }
            if (requiredFields.indexOf("PostCode")) {
              this.isPostCode = true;
            }
            if (requiredFields.indexOf("Nationality")) {
              this.isNationality = true;
            }
          }
          console.log("this.flightInfo", this.flightInfo);
        } else {
          this.presentToast("Flight Not Available");
          this.navCtrl.pop();
        }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log(data);
              this.revalidatingFares();
            })
            .catch(err => {});
        } else {
        }
      });
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

  getButtonStatus(){
    let AreaCode=true;
    if(this.isAreaCode){
      if(this.areaCode){
        AreaCode =true
      }else{
        AreaCode=false;
      }
    }else{
      AreaCode=true;
    }
    let PostCode=true;
    if(this.isPostCode){
      if(this.postalCode){
        PostCode =true
      }else{
        PostCode=false;
      }
    }else{
      PostCode=true;
    }
    let Adult = true;
    for(let i=0;i<this.adults.length;i++){
      if(!this.adults[i].firstName){
        Adult=false;
      }
    }
    let Child = true;
    for(let i=0;i<this.children.length;i++){
      if(!this.children[i].firstName){
        Child=false;
      }
    }
    let Infant = true;
    for(let i=0;i<this.infants.length;i++){
      if(!this.infants[i].firstName){
        Infant=false;
      }
    }
    if(this.user.emailid && this.user.country_code && this.user.mobile && this.user.confirm && AreaCode && PostCode && Adult && Child && Infant){
      return false;
    } else{
      return true;
    }
  }

 

  goBack(){
    this.navCtrl.pop();
  }

  addAdultTravellerDetail(adult, i) {
    // let fromAirportCodes = "";
    // let toAirportCodes = "";
    // for (let i = 0; i < this.destinationDetails.length; i++) {
    //   fromAirportCodes = fromAirportCodes + this.destinationDetails[i].from.Country;
    //   toAirportCodes = toAirportCodes + this.destinationDetails[i].to.Country;
     
    //   if (i < this.destinationDetails.length - 1) {
    //     fromAirportCodes = fromAirportCodes + "%3Cbr%3E";
    //     toAirportCodes = toAirportCodes + "%3Cbr%3E";
    //   }
    // }
    // let passport: boolean = false;  
    // if (fromAirportCodes == toAirportCodes){
    //   passport = false;
    // }
    // else{
    //  passport = true;
    // }
    this.personCategory = "aduld";
    this.personNumber = i;
    this.navCtrl.push(FlightAddTravellerPage, {
      isAdult: true,
      isChild: false,
      isInfant: false,
      detail: adult,
      isNationality:this.isNationality,
      isPassportMandatory:  this.flightInfo.FareItinerary.IsPassportMandatory == "true" ? false : true,
      departDate:this.departDate,
       
      callBack: this.getData
    });
  }

  addChildTravellerDetail(child, i) {
    // let fromAirportCodes = "";
    // let toAirportCodes = "";
    // for (let i = 0; i < this.destinationDetails.length; i++) {
    //   fromAirportCodes = fromAirportCodes + this.destinationDetails[i].from.Country;
    //   toAirportCodes = toAirportCodes + this.destinationDetails[i].to.Country;
     
    //   if (i < this.destinationDetails.length - 1) {
    //     fromAirportCodes = fromAirportCodes + "%3Cbr%3E";
    //     toAirportCodes = toAirportCodes + "%3Cbr%3E";
    //   }
    // }
    // let passport: boolean = false;  
    // if (fromAirportCodes == toAirportCodes){
    //   passport = false;
    // }
    // else{
    //  passport = true;
    // }
    this.personCategory = "child";
    this.personNumber = i;
    this.navCtrl.push(FlightAddTravellerPage, {
      isAdult: false,
      isChild: true,
      isInfant: false,
      detail: child,
      departDate:this.departDate,
      isPassportMandatory:  this.flightInfo.FareItinerary.IsPassportMandatory == "false" ? false : true,
      callBack: this.getData
    });
  }

  addInfantTravellerDetail(infant, i) {
    // let fromAirportCodes = "";
    // let toAirportCodes = "";
    // for (let i = 0; i < this.destinationDetails.length; i++) {
    //   fromAirportCodes = fromAirportCodes + this.destinationDetails[i].from.Country;
    //   toAirportCodes = toAirportCodes + this.destinationDetails[i].to.Country;
     
    //   if (i < this.destinationDetails.length - 1) {
    //     fromAirportCodes = fromAirportCodes + "%3Cbr%3E";
    //     toAirportCodes = toAirportCodes + "%3Cbr%3E";
    //   }
    // }
    // let passport: boolean = false;  
    // if (fromAirportCodes == toAirportCodes){
    //   passport = false;
    // }
    // else{
    //  passport = true;
    // }
    this.personCategory = "infant";
    this.personNumber = i;
    this.navCtrl.push(FlightAddTravellerPage, {
      isAdult: false,
      isChild: false,
      isInfant: true,
      detail: infant,
      departDate:this.departDate,
      isPassportMandatory:  this.flightInfo.FareItinerary.IsPassportMandatory == "false" ? false : true,
      callBack: this.getData
    });
  }
  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if (this.personCategory == "aduld") {
        this.adults[this.personNumber] == data;
      } else if (this.personCategory == "child") {
        this.children[this.personNumber] == data;
      } else if (this.personCategory == "infant") {
        this.infants[this.personNumber] == data;
      }
      console.log(data);
      resolve();
    });
  };
  roundOff(amount){
    var num = parseFloat(amount);
    var round = num+this.FlightAllMarkup.b2c
    var n = round.toFixed(2);
    return n
  }

  roundOffPer(amount){
    var num = parseFloat(amount);
    var round = (num*this.FlightAllMarkup.b2c/100)+num;
    var n = round.toFixed(2);
    return n
  }
 
  fixMarkUpAmount;
  TXN_AMOUNT;
  // makePayment(){
  //   if (this.FlightAllFix.b2c == 0){
  //     this.TXN_AMOUNT= this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount+this.FlightAllMarkup.b2c;
  //     this.fixMarkUpAmount = this.FlightAllMarkup.b2c;
  //   }
  //   else{
  //     this.TXN_AMOUNT = this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount*this.FlightAllMarkup.b2c/100+this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount;
  //     this.fixMarkUpAmount = this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount*this.FlightAllMarkup.b2c/100;
  //   }
  //   let r = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(16161235679);
  //   this.ORDER_ID = 'TZ'+r
  //   let TXN_AMOUNT= this.TXN_AMOUNT
  //   let surl="https://travelnext.us/rocsonline/home/payment_success";
  //   let furl="https://travelnext.us/rocsonline/home/payment_failed";
  //   let url = "https://travelnext.us/rocsonline/home/payment_load?Name=" + this.payment.name +"&cardtypelist=" + this.payment.cardtypelist + "&Card=" + this.payment.Card + "&DateMM=" + this.payment.DateMM+ "&DateYY=" + this.payment.DateYY + "&CVV=" + this.payment.CVV + "&Amount=" + TXN_AMOUNT + "&Items=" + "Flight Booking";

  //   let option: InAppBrowserOptions = {
  //     location: "yes",
  //     clearcache: "yes",
  //     zoom: "yes",
  //     toolbar: "no",
  //     fullscreen:'yes',
  //     closebuttoncaption: 'back'
  //   };

  //   const browser:any = this.inAppBrowser.create(url,'_blank',option);
  //   browser.on('loadstart').subscribe(event =>{
  //     console.log("paymentdata",event)
  //     // browser.executeScript({
  //     //   file:"payumoney/payumoneyPaymentGateway.js"
  //     // });

  //     if (event.url == surl){
  //       this.presentToast("Payment done Successfully");
  //       browser.close();
  //       this.goToReviewPage();
  //     }
  //     if (event.url == furl){
  //       this.presentToast("Payment failed");
  //       browser.close();
  //     }

  //   })
  // }

  makePayment(){
    this.navCtrl.push(FlightMultiWayVoucherPage, {
      destinationDetails:this.destinationDetails,
      AllflightInfo:this.AllflightInfo,
      flightInfo:this.flightInfo,
      personDetail:this.personDetail,
      flightClass:this.flightClass,
      destInfo: this.destInfo,  
      adults: this.adults,
      children: this.children,
      infants: this.infants,
      FlightAllMarkup:this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      TXN_AMOUNT: this.fixMarkUpAmount,
      currencys: this.currencys
    });   
  } 

}

