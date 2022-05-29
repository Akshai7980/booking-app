import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { TransferVoucherPage } from '../transfer-voucher/transfer-voucher';
import { TransferSearchPage } from '../transfer-search/transfer-search';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';

/**
 * Generated class for the TransferReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-review',
  templateUrl: 'transfer-review.html',
})
export class TransferReviewPage {
  transferWay;
  transferType;
  pickUPLocation;
  dropOffLocation;
  arrivalDate;
  departureDate;
  personDetail;
  transfer;s
  returning;
  totalPrice;
  user;arrivaltime;departuretime;currencys;
  personDetails = {title: "", firstName: "", lastName: "", email: "", country_code: "", mobile_no: "",airline_code:"",location:"",
  flight_number:"",airline_name:"",flying:"",flying2:"",flight_number2:"",airline_name2:"",zipcode:"", address:""};
  card = {number:null,expMonth:null,expYear:null,cvc: null};
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
    public loginProvider: LoginProvider,public stripe:Stripe, public payment: PaymentProvider) {
    //this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    //this.personDetails.title = this.user.title;
    // this.personDetails.firstName = this.user.fname;
    // this.personDetails.lastName = this.user.lname;
    // this.personDetails.email = this.user.emailid;
    // this.personDetails.country_code = this.user.country_code;
    // this.personDetails.mobile_no = this.user.mobile;

    this.transferWay=this.navParams.get('transferWay');
    this.transferType=this.navParams.get('transferType');
    this.pickUPLocation=this.navParams.get('pickUPLocation');
    this.dropOffLocation=this.navParams.get('dropOffLocation');
    this.arrivalDate=this.navParams.get('arrivalDate');
    this.departureDate=this.navParams.get('departureDate');
    this.personDetail=this.navParams.get('personDetail');
    this.transfer=this.navParams.get('transfer');
    this.returning=this.navParams.get('returning');
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime")
    this.currencys = this.navParams.get("currencys");
    this.totalPrice=this.transferWay==1?parseFloat(this.transfer.pricing.price):parseFloat(this.transfer.pricing.price) +parseFloat(this.returning.pricing.price);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferReviewPage');
  }
  
  selectedAirportSeach(){
    this.navCtrl.push(TransferSearchPage, {
      transferAirport: this.transferAirport 
    });
  }
  transferAirport = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.personDetails.flying=data.code
        console.log("AirLineCode", this.personDetails.flying)
      }
      resolve();
    });
  };

  selectedAirlinesSeach(){
    this.navCtrl.push(TransferSearchPage, {
      transferAirLines: this.transferAirLines 
    });
  }

  transferAirLines = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.personDetails.airline_name=data.AirLineName
        console.log("AirLineCode", this.personDetails.airline_name)
      }
      resolve();
    });
  };

  returnAirportSeach(){
    this.navCtrl.push(TransferSearchPage, {
      transferAirport: this.returnTransferAirport 
    });
  }
  returnTransferAirport = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.personDetails.flying2=data.code
        console.log("AirLineCode", this.personDetails.flying2)
      }
      resolve();
    });
  };

  returnAirlinesSeach(){
    this.navCtrl.push(TransferSearchPage, {
      transferAirLines: this.returnTransferAirLines 
    });
  }

  returnTransferAirLines = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.personDetails.airline_name2=data.AirLineName
        console.log("AirLineCode", this.personDetails.airline_name2)
      }
      resolve();
    });
  };
  isButtonDisable() {
    if (this.personDetails.title && this.personDetails.firstName.trim() &&
      this.personDetails.lastName.trim() &&this.personDetails.email.trim() &&
      this.personDetails.country_code.trim() && this.personDetails.mobile_no.trim() &&
      this.card.cvc && this.card.expMonth && this.card.expYear && this.card.number
     ) {
      return false;
    } else {
      return true;
    }
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
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

  makepayment(){
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
    "amount" : Math.round(this.totalPrice/this.currencys.value),
    "currency" : this.currencys.currency,
    "token" : token,
    "email" : this.personDetails.email,
    "module" : "flight"
    }
    console.log(jsonObj)
   this.payment.SendPayment(jsonObj).then((token) => {
     if(token.status=="succeeded"){
      this.goToReviewPage()
     }else{
      this.presentToast(token.status);
     }
    console.log(token)
   })
}

  goToReviewPage(){
    this.navCtrl.push(TransferVoucherPage,{
      transferWay: this.transferWay,
      transferType: this.transferType,
      pickUPLocation: this.pickUPLocation,
      dropOffLocation: this.dropOffLocation,
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      personDetail: this.personDetail,
      returning: this.returning,
      transfer: this.transfer,
      personDetails:this.personDetails,
      arrivaltime:this.arrivaltime,
      departuretime: this.departuretime,
      currencys: this.currencys
    })
  }

  

}
