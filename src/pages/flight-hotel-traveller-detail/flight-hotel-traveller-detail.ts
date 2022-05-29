import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { FlightsProvider } from "../../providers/flights/flights";
import { FlightHotelBookingVoucherPage } from '../flight-hotel-booking-voucher/flight-hotel-booking-voucher';
import { FlightHotelAddGuestPage } from '../flight-hotel-add-guest/flight-hotel-add-guest';
import { HotelsProvider } from '../../providers/hotels/hotels';
import { TransferProvider } from '../../providers/transfer/transfer';

/**
 * Generated class for the FlightHotelTravellerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-hotel-traveller-detail',
  templateUrl: 'flight-hotel-traveller-detail.html',
})
export class FlightHotelTravellerDetailPage {
  
 
  isHidden = [];
  transfers;returning;transferWay;
  fromCity; toCity; flightInfo; departDate; returnDate; personDetail;flightClass;currencys;destInfo;
  isPostCode: boolean = false;isAreaCode: boolean = false;isNationality: boolean = false;
  postalCode = "";areaCode = ""; personCategory;
  personNumber;loading;rooms;
  sessionId;hotelDetail;hotelContentDetail;hotelCity;getNightStayDays;
  selectedOption;nightStay;roomDetails=[];totalPrice; 
  destinationDetails = [];guestDetails = [];
  cityPair1: string = ""; cityPair2: string = "";
  user = {emailid:"",country_code:"",mobile:"",confirm:false};
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;criteria;
  totalAdultCount;totalChildCount; totalInfantCount;
  payment = {name:"",cardtypelist:"",Card:"",DateMM:"",DateYY:"",CVV:"", };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider, public loadingCtrl:LoadingController,
    public flightProvider: FlightsProvider,public trasferProvider:TransferProvider,
    public toastCtrl: ToastController, public hotelProvider:HotelsProvider
  ) {
    this.presentLoading();

    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.sessionId = this.navParams.get("sessionId");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.hotelContentDetail = this.navParams.get("hotelContentDetail");
    this.hotelCity = this.navParams.get("hotelCity");
    this.rooms = this.navParams.get("rooms");
    this.selectedOption = this.navParams.get("selectedOption");
    this.getNightStayDays = this.navParams.get("getNightStayDays");
   // this.totalPrice = this.navParams.get("totalPrice");

    
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.currencys = this.navParams.get("currencys");
    this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
    this.HotelFix = this.navParams.get("HotelFix");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.totalAdultCount = this.navParams.get("totalAdultCount");
    this.totalChildCount = this.navParams.get("totalChildCount");
    this.totalInfantCount = this.navParams.get("totalInfantCount");
    this.transfers = this.navParams.get("transfers");
    this.returning = this.navParams.get("returning");
    console.log(this.returning)
    this.cityPair1 = this.fromCity.AirportCode + this.toCity.AirportCode;
    this.cityPair2 = this.toCity.AirportCode + this.fromCity.AirportCode;    
    this.destinationDetails = this.navParams.get("destinationDetails");
    this.transferWay=this.navParams.get('transferWay');
    this.totalPrice = this.transfers.length == 0?null:parseFloat(this.transfers[0].pricing.price) +parseFloat(this.returning[0].pricing.price);
    for (let i = 0; i < this.rooms.length; i++) {
      let adults = [];
      let children = [];
      let infants = [];
      for (let j = 0; j < this.rooms[i].adult; j++) {
        adults.push({ title: "Mr", firstName: "", lastName: "", dob: "" });
      }
      for (let j = 0; j < this.rooms[i].child; j++) {
        children.push({title: "Master", firstName: "",lastName: "",dob: ""});
      }
      for (let j = 0; j < this.rooms[i].infant; j++) {
        infants.push({title: "Master", firstName: "",lastName: "",dob: ""});
      }
      let obj = { adults: adults, children: children, infants:infants };
      this.guestDetails.push(obj);
    }
  
  }

  ionViewDidLoad() {
   this.getBookingTerms();
  }


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }
 

  getBookingTerms() {
    let jsonObj = {sessionId: this.sessionId,productId: this.hotelDetail.productId,
      tokenId: this.hotelDetail.tokenId, rateBasisId: this.selectedOption.rateBasisId };
    //console.log(jsonObj);
    this.hotelProvider.getBookingTerms(jsonObj).then(data => {
        console.log("bookingterms data",data);
        this.loading.dismiss();
        this.roomDetails = data.roomRates.perBookingRates;

      })
      .catch(err => {
        console.log(err);
      });
  }
  adultDetail(i, j) {
    let passport: boolean = false;  
    if (this.fromCity.Country == this.toCity.Country){
      passport = false;
    }
    else{
     passport = true;
    }
    this.criteria = {
      category: "adult",
      roomNumber: i,
      personNumber: j
    };
    this.navCtrl.push(FlightHotelAddGuestPage, {
      isAdult: true,
      isChild: false,
      isInfant:false,
      detail: this.guestDetails[i].adults[j],
      isPassportMandatory: passport,
      departDate:this.departDate,
      callBack: this.getData
    });
  }

  childDetail(i, j) {
    let passport: boolean = false;  
    if (this.fromCity.Country == this.toCity.Country){
      passport = false;
    }
    else{
     passport = true;
    }
    this.criteria = {
      category: "child",
      roomNumber: i,
      personNumber: j
    };
    this.navCtrl.push(FlightHotelAddGuestPage, {
      isAdult: false,
      isChild: true,
      isInfant:false,
      departDate:this.departDate,
      detail: this.guestDetails[i].children[j],
      isPassportMandatory: passport,
      callBack: this.getData
    });
  }
  
  infantDetail(i, j) {
    let passport: boolean = false;  
    if (this.fromCity.Country == this.toCity.Country){
      passport = false;
    }
    else{
     passport = true;
    }
    this.criteria = {
      category: "infant",
      roomNumber: i,
      personNumber: j
    };
    this.navCtrl.push(FlightHotelAddGuestPage, {
      isAdult: false,
      isChild: false,
      isInfant:true,
      detail: this.guestDetails[i].infants[j],
      isPassportMandatory: passport,
      departDate:this.departDate,
      callBack: this.getData
    });
  }
  getData = data => {
    return new Promise<void>((resolve, reject) => {
      console.log(data);
      if (
        data => {
          if (this.criteria.category == "adult") {
            this.guestDetails[this.criteria.roomNumber].adults[
              this.criteria.personNumber
            ] = data;
          } else {
            this.guestDetails[this.criteria.roomNumber].children[
              this.criteria.personNumber
            ] = data;
          }
        }
      )
        resolve();
    });
  };

  isAllFilled() {
    for (let i = 0; i < this.guestDetails.length; i++) {
      for (let j = 0; j < this.guestDetails[i].adults.length; j++) {
        if (!this.guestDetails[i].adults[j].firstName) {
          console.log("true", i, j);
          return false;
        }
      }
      for (let j = 0; j < this.guestDetails[i].children.length; j++) {
        if (!this.guestDetails[i].children[j].firstName) {
          console.log("true", i, j);
          return false;
        }
      }
      for (let j = 0; j < this.guestDetails[i].infants.length; j++) {
        if (!this.guestDetails[i].infants[j].firstName) {
          console.log("true", i, j);
          return false;
        }
      }
    }
    return true;
  }
 
 
  getButtonStatus(){
    if(this.user.emailid.trim()&&this.user.country_code.trim()&&this.user.mobile.trim()&&this.user.confirm&&this.isAllFilled() && this.payment.name && this.payment.cardtypelist && this.payment.DateMM && this.payment.DateYY && this.payment.CVV){
      return false;
    }else{
      return true;
    }
  }
 

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }


  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  makePayment() {
    this.navCtrl.push(FlightHotelBookingVoucherPage, {
      flightInfo: this.flightInfo,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      destinationDetails: this.destinationDetails,
      destInfo: this.destInfo,  
      guestDetails:this.guestDetails,
      currencys: this.currencys,
      selectedOption:this.selectedOption,
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      user:this.user
    });   
  } 

}
