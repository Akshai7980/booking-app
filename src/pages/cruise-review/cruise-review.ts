import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,ModalController } from "ionic-angular";
import { LoginProvider } from '../../providers/login/login';
import { CruiseProvider } from '../../providers/cruise/cruise';
import { CruiseVoucherPage } from '../cruise-voucher/cruise-voucher';
import { CruiseAddTravellerPage } from '../cruise-add-traveller/cruise-add-traveller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the CruiseReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-review',
  templateUrl: 'cruise-review.html',
})
export class CruiseReviewPage {
  contactDeatil = {email: "",mobile_no: "",country_code: "",landline:"",address:"",message:"", confirm:false};
  payment = {name:"",cardtypelist:"",Card:"",DateMM:"",DateYY:"",CVV:"", };
  user: any = {}; loading;
  AdultCount;ChildCount;
  adultsAll = [];
  children = [];
  criteria;
  cruiseCabin;
  cruiseDetails;
  currencys;cruiseAllMarkup;cruiseAllFix;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public inAppBrowser:InAppBrowser,
    public loadingCtrl:LoadingController, public modalCtrl: ModalController,
    public loginProvider: LoginProvider, public cruiseProvider : CruiseProvider
  ) {
    // this.presentLoading();
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.contactDeatil.email = this.user.emailid;
    this.contactDeatil.mobile_no = this.user.mobile;
    this.contactDeatil.country_code = this.user.country_code;
    this.AdultCount =  this.navParams.get("AdultCount");
    this.ChildCount =  this.navParams.get("ChildCount");
    this.cruiseCabin = this.navParams.get("cruiseCabin");
    this.cruiseDetails = this.navParams.get("cruiseDetails");
    this.currencys = this.navParams.get("currencys");
    this.cruiseAllMarkup = this.navParams.get("cruiseAllMarkup");
    this.cruiseAllFix = this.navParams.get("cruiseAllFix");
    console.log("sightSeeing------",this.cruiseCabin)
      for (let j = 0; j < this.AdultCount.adults; j++) {
        this.adultsAll.push({ title: "Mr", firstName: "", lastName: "", dob: "" });
      }
      for (let j = 0; j < this.ChildCount.childs; j++) {
        this.children.push({title: "Master", firstName: "",lastName: "",dob: ""});
      }
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseReviewPage');
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
  adultDetail(j) {
    this.criteria = {
      category: "adult",
      personNumber: j
    };
    this.navCtrl.push(CruiseAddTravellerPage, {
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
    this.navCtrl.push(CruiseAddTravellerPage, {
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
            this.adultsAll = data;
            console.log("this.adultsAll",this.adultsAll);
          } else {
            this.children = data;
          }
        }
      )
        resolve();
    });
  };

  isAllFilled() {
    
      for (let j = 0; j < this.adultsAll.length; j++) {
        if (!this.adultsAll[j].firstName) {
          console.log("true",j);
          return false;
        }
      }
      for (let j = 0; j < this.children.length; j++) {
        if (!this.children[j].firstName) {
          console.log("true", j);
          return false;
        }
      }
    
    return true;
  }
   isButtonDisable(){
    if(this.contactDeatil.email.trim()&&this.contactDeatil.mobile_no.trim()&&this.contactDeatil.confirm&&this.contactDeatil.address&&this.isAllFilled()){
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
  
  // proceed(){
  //   let surl="https://travelnext.us/rocsonline/home/payment_success";
  //   let furl="https://travelnext.us/rocsonline/home/payment_failed";
  //   let url = "https://travelnext.us/rocsonline/home/payment_load?Name=" + this.payment.name +"&cardtypelist=" + this.payment.cardtypelist + "&Card=" + this.payment.Card + "&DateMM=" + this.payment.DateMM+ "&DateYY=" + this.payment.DateYY + "&CVV=" + this.payment.CVV + "&Amount=" + (this.cruiseCabin.price_per_person*(this.AdultCount.adults+this.ChildCount.childs))/this.currencys.value + "&Items=" + "Sight-seeing Booking";
    
  //   let option: InAppBrowserOptions = {
  //     location: "yes",
  //     clearcache: "yes",
  //     zoom: "yes",
  //     toolbar: "no",
  //     fullscreen:'yes',
  //     closebuttoncaption: 'back'
  //   };

  //   const browser:any = this.inAppBrowser.create(url,'_blank',option);
  //   browser.on('loadstart').subscribe(data =>{
  //     console.log("paymentdata",data)
  //     // browser.executeScript({
  //     //   file:"payumoney/payumoneyPaymentGateway.js"
  //     // });

  //     if (data.url == surl){
  //       this.presentToast("Payment done Successfully");
  //       browser.close();
  //       this.goToReviewPage();
  //     }
  //     if (data.url == furl){
  //       this.presentToast("Payment failed");
  //       browser.close();
  //     }

  //   })
  // }
  

  proceed(){
    this.navCtrl.push(CruiseVoucherPage,{
      cruiseCabin:this.cruiseCabin,
      cruiseDetails:this.cruiseDetails,
      adultsAll:this.adultsAll,
      children: this.children,
      contactDeatil:this.contactDeatil,
      AdultCount:this.AdultCount,
      ChildCount:this.ChildCount,
      currencys: this.currencys,
      cruiseAllMarkup: this.cruiseAllMarkup,
      cruiseAllFix:this.cruiseAllFix,
    })
  }

}
