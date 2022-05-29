import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from "ionic-angular";
import { HotelsProvider } from "../../providers/hotels/hotels";
import { SomethingWentWrongPage } from '../something-went-wrong/something-went-wrong';
import { FlightFlightResultsPage } from '../flight-flight-results/flight-flight-results';
/**
 * Generated class for the FlightHotelReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-hotel-review',
  templateUrl: 'flight-hotel-review.html',
})
export class FlightHotelReviewPage {
  bookingTerms;nightStay = 0;roomDetails = [];totalPrice = 0; 
  totalAdultCount=0; totalChildCount=0; totalInfantCount=0;
  guestDetails = []; 
  loading; fromCity; toCity; flightInfo; departDate; returnDate;
  personDetail; flightClass;  flightFareRules; currencys;
  isFareRules: boolean = false; map = {};
  cityPair1: string = ""; cityPair2: string = "";
  bookingId = "";
  sessionId;hotelCity;rooms;hotelDetail;hotelContentDetail;checkInDate;
  checkoutDate;selectedOption;
  criteria; adults; children;
  Arr = Array; paymentRequestData: any;
  contactDeatil = {email: "",mobile_no: "",country_code: "", };
  user: any = {};getNightStayDays;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl:ToastController,
    public hotelProvider:HotelsProvider,
    public modalCtrl:ModalController
    ) {
    this.presentLoading();
    this.sessionId = this.navParams.get("sessionId");
    this.hotelCity = this.navParams.get("hotelCity");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.checkInDate = this.navParams.get("departDate");
    this.checkoutDate = this.navParams.get("returnDate");
    this.hotelContentDetail = this.navParams.get("hotelContentDetail");
    this.selectedOption = this.navParams.get("selectedOption");
    this.rooms = this.navParams.get("rooms");
    this.totalPrice = this.navParams.get("totalPrice");
    this.bookingId = "HE" + this.sessionId;
    this.getNightStayDays = this.navParams.get("getNightStayDays");

    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.flightClass = this.navParams.get("flightClass");
    this.currencys = this.navParams.get("currencys");
   
   
  }
  ionViewDidLoad() {
    this.getBookingTerms();
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
        this.loading.dismiss();
        this.goToSomethingWentWrongPage();
      });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

  

  goToSomethingWentWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

 
  

  isButtonDisable(){
    if(this.contactDeatil.email.trim()&&this.contactDeatil.mobile_no.trim()&&this.contactDeatil.mobile_no.trim()&&this.contactDeatil.country_code.trim()&&this.isAllFilled()){
      return false;
    }else{
      return true;
    }
  }
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
    }
    return true;
  }
  
  proceed() {
        this.navCtrl.push(FlightFlightResultsPage,{
          sessionId: this.sessionId,
          hotelDetail:this.hotelDetail,
          hotelContentDetail:this.hotelContentDetail,
          hotelCity:this.hotelCity,
          rooms:this.rooms,
          selectedOption:this.selectedOption,
          roomDetails: this.roomDetails,
          getNightStayDays: this.getNightStayDays,

          fromCity: this.fromCity,
          toCity: this.toCity,
          departDate: this.departDate,
          returnDate: this.returnDate,
          personDetail: this.personDetail,
          flightClass: this.flightClass,
          currencys: this.currencys, 
        });
  }
  
}
