import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController} from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { HotelsProvider } from "../../providers/hotels/hotels";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { HotelAddGuestPage } from "../hotel-add-guest/hotel-add-guest";
import { HotelBookingVoucherPage } from '../hotel-booking-voucher/hotel-booking-voucher';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NoResultPage } from '../no-result/no-result';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: "page-hotel-review",
  templateUrl: "hotel-review.html"
})
export class HotelReviewPage {
  loading;sessionId;hotelDetail;hotelContentDetail; hotelCity;rooms;criteria;
  checkInDate = new Date();checkoutDate = new Date();
  selectedOption; roomDetails = [];guestDetails = [];
  totalAdultCount = 0; totalChildCount = 0;
  contactDeatil = {email: "",mobile_no: "",country_code: "", confirm:false};
  user: any = {};getNightStayDays;ORDER_ID;adminBalance;
  balance = false;hotelAllMarkup;HotelFix; TXN_AMOUNT;
  fixMarkUpAmount;
  card = {number:null,expMonth:null,expYear:null,cvc: null};
  constructor( public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController,
    public loginProvider: LoginProvider,public hotelProvider:HotelsProvider, public toastCtrl:ToastController,
    public modalCtrl:ModalController, public inAppBrowser:InAppBrowser,public stripe:Stripe, public payment: PaymentProvider) {
    this.presentLoading();
    // this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    // this.contactDeatil.email = this.user.emailid;
    // this.contactDeatil.mobile_no = this.user.mobile;
    // this.contactDeatil.country_code = this.user.country_code;
    // console.log(this.user)
    this.hotelCity = this.navParams.get("hotelCity");
    this.rooms = this.navParams.get("rooms");
    this.checkInDate = this.navParams.get("checkInDate");
    this.checkoutDate = this.navParams.get("checkoutDate");
    this.sessionId = this.navParams.get("sessionId");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.hotelContentDetail = this.navParams.get("hotelContentDetail");
    this.selectedOption = this.navParams.get("selectedOption");
    this.getNightStayDays = this.navParams.get("getNightStayDays");
    this.hotelAllMarkup  = this.navParams.get("hotelAllMarkup")
    this.adminBalance = this.navParams.get("adminBalance");
    this.HotelFix = this.navParams.get("HotelFix");
    for (let i = 0; i < this.rooms.length; i++) {
      this.totalAdultCount = this.totalAdultCount + this.rooms[i].adult;
      this.totalChildCount = this.totalChildCount + this.rooms[i].child;
      let adults = [];
      let children = [];
      let roomNoo = [];
      for (let j = 0; j < this.rooms[i].adult; j++) {
        adults.push({ title: "Mr", firstName: "", lastName: "", age: "" });
      }
      for (let j = 0; j < this.rooms[i].child; j++) {
        children.push({title: "Master", firstName: "",lastName: "",age: this.rooms[i].child_age[j]});
      }
      for (let j = 0; j < this.rooms[i].room_no; j++) {
        roomNoo = this.rooms[i].room_no;
      }
      let obj = { adults: adults, children: children, room_no:roomNoo };
      this.guestDetails.push(obj);
    }

    
  }

  ionViewDidLoad() {
    this.getBookingTerms();
    // this.getBalabce();
  }
  // getBalabce(){
  //   this.hotelProvider.getAdminBalance().then((data) => {
  //   this.adminBalance = data;
  //   console.log(data);
  //  // this.loading.dismiss();
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  // }

  getBookingTerms() {
    let jsonObj = {
      sessionId: this.sessionId,productId:
       this.hotelDetail.productId,
        tokenId:this.hotelDetail.tokenId,
        rateBasisId: this.selectedOption.rateBasisId 
      };
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
  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

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

  goToSomethingWentWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

 
  goBack(){
    this.navCtrl.pop();
  }

  adultDetail(i, j) {
    this.criteria = {
      category: "adult",
      roomNumber: i,
      personNumber: j
    };
    this.navCtrl.push(HotelAddGuestPage, {
      isAdult: true,
      isChild: false,
      detail: this.guestDetails[i].adults[j],
      callBack: this.getData
    });
  }

  childDetail(i, j) {
    this.criteria = {
      category: "child",
      roomNumber: i,
      personNumber: j
    };
    this.navCtrl.push(HotelAddGuestPage, {
      isAdult: false,
      isChild: true,
      detail: this.guestDetails[i].children[j],
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
    }
    return true;
  }
 
 
  isButtonDisable(){
    if(this.contactDeatil.email.trim()&&this.contactDeatil.mobile_no.trim()&&this.contactDeatil.confirm&&this.isAllFilled()
   // && this.card.cvc && this.card.expMonth && this.card.expYear && this.card.number
    ){
      return false;
    }else{
      return true;
    }
  }
 
 
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  proceedDemo(){
    if (this.HotelFix.b2c == 0){
          this.TXN_AMOUNT= this.selectedOption.netPrice+this.hotelAllMarkup.b2c;
          this.fixMarkUpAmount = this.hotelAllMarkup.b2c;
        }
        else{
          this.TXN_AMOUNT = (this.selectedOption.netPrice*this.hotelAllMarkup.b2c)/100+(this.selectedOption.netPrice);
          this.fixMarkUpAmount = (this.selectedOption.netPrice*this.hotelAllMarkup.b2c)/100;
        }
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
    "amount" : Math.round(this.TXN_AMOUNT),
    "currency" : this.selectedOption.currency,
    "token" : token,
    "email" : this.contactDeatil.email,
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

proceed() {
    let r = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(16161235679);
    this.ORDER_ID = 'BK'+r
    this.navCtrl.push(HotelBookingVoucherPage,{
      sessionId:this.sessionId,
      hotelDetail: this.hotelDetail,
      hotelContentDetail: this.hotelContentDetail,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate,
      rooms: this.rooms,
      roomDetails: this.roomDetails,
      totalAdultCount: this.totalAdultCount,
      totalChildCount: this.totalChildCount,
      guestDetails: this.guestDetails,
      selectedOption: this.selectedOption,
      getNightStayDays: this.getNightStayDays,
      contactDeatil: this.contactDeatil,
      ORDER_ID: this.ORDER_ID,
      hotelAllMarkup:this.hotelAllMarkup,
      HotelFix: this.HotelFix,
      fixMarkUpAmount: this.fixMarkUpAmount,
    });
  }
  
}
