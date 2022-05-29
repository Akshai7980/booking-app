import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,ModalController,ToastController } from "ionic-angular";
import { AddFlightTravellersComponent } from "../../components/add-flight-travellers/add-flight-travellers";
import { DatePicker } from '@ionic-native/date-picker';
import { LoginProvider } from "../../providers/login/login";
import { HolidayBookingVoucherPage } from '../holiday-booking-voucher/holiday-booking-voucher';
import { HolidayAddTravellerPage } from '../holiday-add-traveller/holiday-add-traveller';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';

/**
 * Generated class for the HolidayTravellerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-holiday-traveller-detail",
  templateUrl: "holiday-traveller-detail.html"
})
export class HolidayTravellerDetailPage {
  personDetail = {adults: 1,children: 0,infants: 0};
  adults = [];children = [];infants = [];   minDate: any;
  maxDate: any;currency;
  contactDeatil = {country_code: "",email: "",mobile_no: "",travel_date:new Date(),past_passenger:"",pre_booking_ref:"",pre_ex_med_cond:""};
  personCategory;personNumber;holiday;jsonObj; holidayDetail;selectedPrice; user;
  card = {number:null,expMonth:null,expYear:null,cvc: null};
  constructor(public navCtrl: NavController,public navParams: NavParams, public modalCtrl: ModalController,
    public toastCtrl: ToastController,public loginProvider:LoginProvider,public datePicker:DatePicker,public stripe:Stripe, public payment: PaymentProvider) {
    this.holiday = this.navParams.get("holiday");
    this.jsonObj = this.navParams.get("jsonObj");
    this.holidayDetail = this.navParams.get("holidayDetail");
    this.selectedPrice = this.navParams.get("selectedPrice");
    this.currency = this.navParams.get("currency");
    console.log("selectedPrice",this.selectedPrice)
  //  this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
  //   this.contactDeatil.email = this.user.emailid;
  //   this.contactDeatil.country_code = this.user.country_code;
  //   this.contactDeatil.mobile_no = this.user.mobile;
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
    console.log("ionViewDidLoad HolidayTravellerDetailPage");
  }
  getTravelDate() {
    this.datePicker.show({
        date: new Date(),
        mode: "date",
        maxDate: this.maxDate,
        minDate: this.minDate,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.contactDeatil.travel_date = date
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  selectTravellers() {
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
        if (data.adults > this.personDetail.adults) {
          let diff = data.adults - this.personDetail.adults;
          for (let i = 0; i < diff; i++) {
            let adult = {};
            this.adults.push(adult);
          }
          this.personDetail.adults = data.adults;
        } else if (data.adults < this.personDetail.adults) {
          let diff = this.personDetail.adults - data.adults;
          for (let i = 0; i < diff; i++) {
            this.adults.pop();
          }
          this.personDetail.adults = data.adults;
        } else {
          this.personDetail.adults = data.adults;
        }

        if (data.children > this.personDetail.children) {
          let diff = data.children - this.personDetail.children;
          for (let i = 0; i < diff; i++) {
            let child = {};
            this.children.push(child);
          }
          this.personDetail.children = data.children;
        } else if (data.children < this.personDetail.children) {
          let diff = this.personDetail.children - data.children;
          for (let i = 0; i < diff; i++) {
            this.children.pop();
          }
          this.personDetail.children = data.children;
        } else {
          this.personDetail.children = data.children;
        }

        if (data.infants > this.personDetail.infants) {
          let diff = data.infants - this.personDetail.infants;
          for (let i = 0; i < diff; i++) {
            let infant = {};
            this.infants.push(infant);
          }
          this.personDetail.infants = data.infants;
        } else if (data.infants < this.personDetail.infants) {
          let diff = this.personDetail.infants - data.infants;
          for (let i = 0; i < diff; i++) {
            this.infants.pop();
          }
          this.personDetail.infants = data.infants;
        } else {
          this.personDetail.infants = data.infants;
        }
      }
      console.log(data);
    });
  }

  addAdultTravellerDetail(adult, i) {
    this.personCategory = "aduld";
    this.personNumber = i;
    this.navCtrl.push(HolidayAddTravellerPage, {
      isAdult: true,
      isChild: false,
      isInfant: false,
      detail: adult,
      callBack: this.getData
    });
  }

  addChildTravellerDetail(child, i) {
    this.personCategory = "child";
    this.personNumber = i;
    this.navCtrl.push(HolidayAddTravellerPage, {
      isAdult: false,
      isChild: true,
      isInfant: false,
      detail: child,
      callBack: this.getData
    });
  }

  addInfantTravellerDetail(infant, i) {
    this.personCategory = "infant";
    this.personNumber = i;
    this.navCtrl.push(HolidayAddTravellerPage, {
      isAdult: false,
      isChild: false,
      isInfant: true,
      detail: infant,
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



  isButtonDisable() {
    let Adult = true;
    for (let i = 0; i < this.adults.length; i++) {
      if (!this.adults[i].firstName) {
        Adult = false;
      }
    }
    let Child = true;
    for (let i = 0; i < this.children.length; i++) {
      if (!this.children[i].firstName) {
        Child = false;
      }
    }
    let Infant = true;
    for (let i = 0; i < this.infants.length; i++) {
      if (!this.infants[i].firstName) {
        Infant = false;
      }
    }
    if (
     
      this.contactDeatil.country_code.trim() &&
      this.contactDeatil.email.trim() &&
      this.contactDeatil.mobile_no.trim() &&
      Adult &&
      Child &&
      Infant 
      //&& this.card.cvc && this.card.expMonth && this.card.expYear && this.card.number
    ) {
      return false;
    } else {
      return true;
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

  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  proceeddumy(){
    this.stripe.setPublishableKey('pk_test_51JYCQtASvCqftHZOOmaBCbO3XIlsJbvH8QhAgbdibLVeIf1fZmYTU2kuZcwOESG7rs3CFjTYJEN2U34sVCcMaY0z00XqSa7bsy');
  
    let cards = {
      number: this.card.number,
      expMonth: this.card.expMonth,
      expYear: this.card.expYear,
      cvc: this.card.cvc
     };
  
  this.stripe.createCardToken(cards).then(token => {
      this.makePayment(token.id)
  })
   .catch(error =>{
    this.presentToast(error);
      console.error(error)
    });
}


 
makePayment(token){
  let jsonObj = {
    "amount" : Math.round(this.holiday.total_price*this.personDetail.adults/this.currency.value),
    "currency" : this.currency.currency,
    "token" : token,
    "email" : this.contactDeatil.email,
    "module" : "flight"
    }
    console.log(jsonObj)
   this.payment.SendPayment(jsonObj).then((token) => {
     if(token.status=="succeeded"){
    //  this.goToReviewPage()
     }else{
      this.presentToast(token.status);
     }
    console.log(token)
   })
}

proceed() {
    this.navCtrl.push(HolidayBookingVoucherPage, {
      currency:this.currency,
      holiday: this.holiday,
      jsonObj: this.jsonObj,
      holidayDetail: this.holidayDetail,
      contactDeatil:this.contactDeatil,
      adults: this.adults,
      children:this.children,
      infants:this.infants,
      personDetail: this.personDetail
      // selectedPrice: {
      //   startDate: new Date().getFullYear() + "-" + 10 + "-" + 1,
      //   endDate: new Date().getFullYear() + "-" + 0 + "-" + 21,
      //   price: this.holiday.price,
      // },
    });
  }



  goBack(){
    this.navCtrl.pop();
  }
}
