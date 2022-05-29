import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController,LoadingController,ModalController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { FlightsProvider } from "../../providers/flights/flights";
import { FlightAddTravellerPage } from "../flight-add-traveller/flight-add-traveller";
import { FlightBookingVoucherPage } from '../flight-booking-voucher/flight-booking-voucher';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';
import { SearchCountryCodeComponent } from '../../components/search-country-code/search-country-code';

/**
 * Generated class for the FlightTravellerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-traveller-detail",
  templateUrl: "flight-traveller-detail.html"
})

export class FlightTravellerDetailPage {
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
  
  destInfo;
  isPostCode: boolean = false;
  isAreaCode: boolean = false;
  isNationality: boolean = false;
  balance: boolean = false;
  postalCode = "";
  areaCode = "";
  personCategory;
  personNumber;
  loading;ORDER_ID;
  destinationDetails = [];
  adminBalance;
  FlightAllMarkup; FlightAllFix;TXN_AMOUNT; AllAMOUNT;fixMarkUpAmount;currencys;
  card = {number:null,expMonth:null,expYear:null,cvc: null};
  session_id;
  // user: any;
  user = {emailid:"",country_code:"",mobile:"",confirm:false};
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public loginProvider: LoginProvider,public loadingCtrl: LoadingController,
    public flightProvider: FlightsProvider,public toastCtrl: ToastController,public inAppBrowser:InAppBrowser,private stripe: Stripe,
    public modalCtrl: ModalController, public payment: PaymentProvider) {
   // this.presentLoading();
   // this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    console.log("personalDetails", this.personDetail)
    this.flightClass = this.navParams.get("flightClass");
    this.destinationDetails = this.navParams.get("destinationDetails");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix")
    this.adminBalance = this.navParams.get("adminBalance");
    this.session_id = this.navParams.get("session_id");
    this.currencys = this.navParams.get("currencys");
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
   // this.revalidatingFares();
   
  }
  getIssueCountry() {
    let issueCountryModal = this.modalCtrl.create(
      SearchCountryCodeComponent,
      { isCountryName: false },
      { cssClass: "searchCountryNameModel" }
    );
    issueCountryModal.present();
    issueCountryModal.onDidDismiss(data => {
      console.log(data)
      if (data) {
        this.user.country_code = data.countryName;
      }
      console.log(data);
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
  }

  // getBalabce(){
  //   this.flightProvider.getAdminBalance().then((data) => {
  //   this.adminBalance = data;
  //  // this.loading.dismiss();
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  // }
 

  revalidatingFares() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
  console.log("mysendobj", JSON.stringify(obj));
  this.flightProvider.getRevalidatingFares(obj).then(data => {
        console.log("sghsfgligisgsg",data);
        if (data.AirSearchResponse.AirSearchResult.IsValid!= "false") {
          this.flightInfo = data.AirSearchResponse.AirSearchResult.FareItineraries;
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

    if(this.user.emailid && this.user.country_code && this.user.mobile && this.user.confirm && AreaCode && PostCode && Adult && Child && Infant
      // this.card.cvc && this.card.expMonth && this.card.expYear && this.card.number
      ){
      return false;
    } else{
      return true;
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  addAdultTravellerDetail(adult, i) {
    let passport: boolean = false;  
    if (this.fromCity.Country == this.toCity.Country){
      passport = false;
    }
    else{
     passport = true;
    }
    this.personCategory = "aduld";
    this.personNumber = i;
    this.navCtrl.push(FlightAddTravellerPage, {
      departDate:this.departDate,
      isAdult: true,
      isChild: false,
      isInfant: false,
      detail: adult,
      isNationality:this.isNationality,
      isPassportMandatory: passport,
      callBack: this.getData
    });
  }

  addChildTravellerDetail(child, i) {
    let passport: boolean = false;  
    if (this.fromCity.Country == this.toCity.Country){
      passport = false;
    }
    else{
     passport = true;
    }
    this.personCategory = "child";
    this.personNumber = i;
    this.navCtrl.push(FlightAddTravellerPage, {
      departDate:this.departDate,
      isAdult: false,
      isChild: true,
      isInfant: false,
      detail: child,
      isPassportMandatory: passport,
      callBack: this.getData
    });
  }

  addInfantTravellerDetail(infant, i) {
    let passport: boolean = false;  
    if (this.fromCity.Country == this.toCity.Country){
      passport = false;
    }
    else{
     passport = true;
    }
    this.personCategory = "infant";
    this.personNumber = i;
    this.navCtrl.push(FlightAddTravellerPage, {
      departDate:this.departDate,
      isAdult: false,
      isChild: false,
      isInfant: true,
      detail: infant,
      isPassportMandatory: passport,
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


  makePaymentDumy(){
    if (this.FlightAllFix.b2c == 0){
      this.TXN_AMOUNT =  Math.round(this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount)+this.FlightAllMarkup.b2c;
      this.fixMarkUpAmount = this.FlightAllMarkup.b2c;
    }
    else{
      this.TXN_AMOUNT =  Math.round(this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount)*this.FlightAllMarkup.b2c/100+(Math.round(this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount));
      this.fixMarkUpAmount =  Math.round(this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount)*this.FlightAllMarkup.b2c/100;
    }
    this.stripe.setPublishableKey('pk_test_51JYCQtASvCqftHZOOmaBCbO3XIlsJbvH8QhAgbdibLVeIf1fZmYTU2kuZcwOESG7rs3CFjTYJEN2U34sVCcMaY0z00XqSa7bsy');
  
    let cards = {
      number: this.card.number,
      expMonth: this.card.expMonth,
      expYear: this.card.expYear,
      cvc: this.card.cvc
     };
  
  this.stripe.createCardToken(cards).then(token => {
      this.makePayments(token.id)
  })
   .catch(error =>{
    this.presentToast(error);
      console.error(error)
    });
}


 
makePayments(token){
  let jsonObj = {
    "amount" : Math.round(this.TXN_AMOUNT),
    "currency" : this.flightInfo.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.CurrencyCode,
    "token" : token,
    "email" : this.user.emailid,
    "module" : "flight"
    }
    console.log(jsonObj)
   this.payment.SendPayment(jsonObj).then((token) => {
     if(token.status=="succeeded"){
     // this.goToReviewPage()
     }else{
      this.presentToast(token.status);
     }
    console.log(token)
   })
}

makePayment() {
    this.navCtrl.push(FlightBookingVoucherPage, {
      flightInfo: this.flightInfo,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      fromCity:this.fromCity,
      toCity:this.toCity,
      destinationDetails: this.destinationDetails,
      user: this.user,
      destInfo: this.destInfo,  
      adults: this.adults,
      children: this.children,
      infants: this.infants,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      TXN_AMOUNT : this.fixMarkUpAmount,
      currencys: this.currencys,
      session_id:this.session_id
    });   
  } 

}
