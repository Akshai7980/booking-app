import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, LoadingController,Slides } from "ionic-angular";
import { SightSeeingProvider } from "../../providers/sight-seeing/sight-seeing";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { NoResultPage } from '../no-result/no-result';
import { HotelAddGuestPage } from '../hotel-add-guest/hotel-add-guest';
import { LoginProvider } from '../../providers/login/login';
import { SightSeeingVoucherPage } from '../sight-seeing-voucher/sight-seeing-voucher';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';
/**
 * Generated class for the SightSeeingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sight-seeing-detail",
  templateUrl: "sight-seeing-detail.html"
})
export class SightSeeingDetailPage {
  @ViewChild(Slides) slides: Slides;
  destination;
  startDate = new Date();
  endDate = new Date();
  sightSeeing;
  sessionId;
  tourDetail;
  loading;
  currentIndex=0; 
  isHiddenl =[];isHidden = [];
  guestDetails = [];paxes;criteria;
  contactDeatil = {email: "",mobile_no: "",country_code: "", confirm:false};
  card = {number:null,expMonth:null,expYear:null,cvc: null};
  user: any = {}; 
  adultsAll = [];
  children = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sightSeeingProvider: SightSeeingProvider,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public loginProvider: LoginProvider,
    public inAppBrowser:InAppBrowser,public stripe:Stripe, public payment: PaymentProvider) {
    this.presentLoading();
   // this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    // this.contactDeatil.email = this.user.emailid;
    // this.contactDeatil.mobile_no = this.user.mobile;
    // this.contactDeatil.country_code = this.user.country_code;
    this.destination = this.navParams.get("destination");
    this.startDate = this.navParams.get("startDate");
    this.endDate = this.navParams.get("endDate");
    this.paxes = this.navParams.get("paxes");
    this.sightSeeing = this.navParams.get("sightSeeing");
    this.sessionId = this.navParams.get("sessionId");
  
    for (let i = 0; i < this.paxes.length; i++) {
     
      for (let j = 0; j < this.paxes[i].adults; j++) {
        this.adultsAll.push({ title: "Mr", firstName: "", lastName: "", age: "" });
      }
      for (let j = 0; j < this.paxes[i].childs; j++) {
        this.children.push({title: "Master", firstName: "",lastName: "",age: this.paxes[i].child_ages[j]});
      }
     
    }
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SightSeeingDetailPage");
   this.getTourDetail();
  }

  getTourDetail() {
    let obj = {
      sessionId: this.sessionId.sessionId,
      tokenId: this.sessionId.tokenId,
      activityCode: this.sightSeeing.code,
    };
    this.sightSeeingProvider.getSightSeeingDetails(obj).then(data => {
     this.loading.dismiss();
     console.log("tsdata",data);
      this.tourDetail = data;
      console.log("data",this.tourDetail);
    })
    .catch(err => {
      this.loading.dismiss();
      this.goToNoResultPage();
      console.log(err);
    });
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }
  goBack() {
    this.navCtrl.pop();
  }
  adultDetail(j) {
    this.criteria = {
      category: "adult",
      personNumber: j
    };
    this.navCtrl.push(HotelAddGuestPage, {
      isAdult: true,
      isChild: false,
      detail: this.adultsAll[j],
      callBack: this.getData
    });
  }

  childDetail(j) {
    this.criteria = {
      category: "child",
      personNumber: j
    };
    this.navCtrl.push(HotelAddGuestPage, {
      isAdult: false,
      isChild: true,
      detail: this.children[j],
      callBack: this.getData
    });
  }


  getData = data => {
    return new Promise<void>((resolve, reject) => {
      console.log("personNumber",data);
      if (data => {
          if (this.criteria.category == "adult") {
            this.adultsAll[this.criteria.personNumber] = data;
          } else {
            this.children[this.criteria.personNumber] = data;
          }
        }
      )
        resolve();
    });
  };



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

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }
  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  getButtonStatus(){
    let Adult = true;
    for(let i=0;i<this.adultsAll.length;i++){
      if(!this.adultsAll[i].firstName){
        Adult=false;
      }
    }
    let Child = true;
    for(let i=0;i<this.children.length;i++){
      if(!this.children[i].firstName){
        Child=false;
      }
    }
    
   
    if(Adult && Child && this.contactDeatil.email && this.contactDeatil.country_code && 
      this.contactDeatil.mobile_no && this.contactDeatil.confirm 
      && this.card.cvc && this.card.expMonth && this.card.expYear && this.card.number
      ){
      return false;
    } else{
      return true;
    }
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }


  proceed(){
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
    "amount" : Math.round(this.tourDetail.activity.options[0].rates[0].rateDetails[0].totalAmount.amount),
    "currency" : this.tourDetail.activity.currency,
    "token" : token,
    "email" : this.contactDeatil.email,
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
  
goToReviewPage() {
    this.navCtrl.push(SightSeeingVoucherPage,{
      contactDeatil:this.contactDeatil,
      adultsAll: this.adultsAll,
      children: this.children,
      sessionId:this.sessionId,
      sightSeeing:this.sightSeeing,
      tourDetail:this.tourDetail 

    })
  }
}
