import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { FlightsProvider } from "../../providers/flights/flights";
import { FlightAddTravellerPage } from "../flight-add-traveller/flight-add-traveller";
import { FlightDomesticVoucherPage } from '../flight-domestic-voucher/flight-domestic-voucher';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the FlightDomesticTravellerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-domestic-traveller-details',
  templateUrl: 'flight-domestic-traveller-details.html',
})
export class FlightDomesticTravellerDetailsPage {
  fromCity;
  toCity;
 
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
  loading;
  destinationDetails = [];flightInfoOneAll;flightInfoTwoAll;flightInfoTraveller;
  totalFareOne;totalFareTwo;flightInfoTwo;flightInfoOne;totalBaseFare;totalTaxFare;ORDER_ID;adminBalance;balance: boolean = false;
  FlightAllMarkup;FlightAllFix;TXN_AMOUNT;
  fixMarkUpAmount;token;session_id;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public loginProvider: LoginProvider, public inAppBrowser:InAppBrowser, 
    public flightProvider: FlightsProvider,public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    // this.presentLoading();
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.totalFareOne = this.navParams.get("totalFareOne");
    this.totalFareTwo = this.navParams.get("totalFareTwo");
    this.totalBaseFare= this.navParams.get("totalBaseFare");
    this.totalTaxFare= this.navParams.get("totalTaxFare");
    this.flightInfoOneAll = this.navParams.get("flightInfoOneAll"),
    this.flightInfoTwoAll = this.navParams.get("flightInfoTwoAll"),
    this.flightInfoTwo = this.navParams.get("flightInfoTwo"),
    this.flightInfoOne = this.navParams.get("flightInfoOne"),
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.destinationDetails = this.navParams.get("destinationDetails");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.adminBalance = this.navParams.get("adminBalance");
    this.FlightAllFix =this.navParams.get("FlightAllFix");
    this.session_id = this.navParams.get("session_id");
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
    console.log('ionViewDidLoad FlightDomesticTravellerDetailsPage');
    // this.revalidatingFares();
    
  }

 
  

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait..."
    });
    this.loading.present();
  }

  revalidatingFares() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfoOneAll.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getRevalidatingFares(obj).then(data => {
      this.loading.dismiss();
        if (data.AirRevalidateResponse.AirRevalidateResult.IsValid != "false") {
          this.flightInfoTraveller = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries;
          let requiredFields: any[] = this.flightInfoTraveller.RequiredFieldsToBook;
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
          console.log("this.flightInfo", this.flightInfoTraveller);
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
      isAdult: true,
      isChild: false,
      isInfant: false,
      detail: adult,
      departDate:this.returnDate,
      isNationality:this.isNationality,
      isPassportMandatory:passport,
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
      isAdult: false,
      isChild: true,
      isInfant: false,
      detail: child,
      departDate:this.returnDate,
      isPassportMandatory:passport,
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
      isAdult: false,
      isChild: false,
      isInfant: true,
      detail: infant,
      departDate:this.returnDate,
      isPassportMandatory:passport,
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
  


 

  startTransaction() {
    this.navCtrl.push(FlightDomesticVoucherPage, {
      flightInfoOneAll: this.flightInfoOneAll,
      flightInfoTwoAll: this.flightInfoTwoAll,
      flightInfoTwo: this.flightInfoTwo,
      flightInfoOne: this.flightInfoOne,
      totalFareTwo:this.totalFareTwo,
      totalFareOne:this.totalFareOne,
      totalBaseFare:this.totalBaseFare,
      totalTaxFare:this.totalTaxFare,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      destinationDetails: this.destinationDetails,
      destInfo: this.destInfo,  
      adults: this.adults,
      children: this.children,
      infants: this.infants,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      fixMarkUpAmount:this.fixMarkUpAmount
    });   
  } 


}
