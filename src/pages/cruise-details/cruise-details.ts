import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Slides,ToastController } from 'ionic-angular';
import { CruiseProvider } from '../../providers/cruise/cruise';
import { NoResultPage } from '../no-result/no-result';
import { CruiseReviewPage } from '../cruise-review/cruise-review';
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from '../login/login';
/**
 * Generated class for the CruiseDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-details',
  templateUrl: 'cruise-details.html',
})
export class CruiseDetailsPage {
  @ViewChild(Slides) slides: Slides;
  currentIndex=0; 
  loading;cruiseData;
  cruiseDetails = [];
  isHiddenl =[];isHidden = [];
  AdultCount;ChildCount;
  user: any = {};
  currencys;cruiseAllMarkup;cruiseAllFix;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl :LoadingController,public loginProvider: LoginProvider
    ,public toastCtrl:ToastController, public cruiseProvider : CruiseProvider) {
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.presentLoading();
    this.cruiseData = this.navParams.get("cruiseData");
    this.AdultCount =  this.navParams.get("AdultCount");
    this.ChildCount =  this.navParams.get("ChildCount");
    this.currencys = this.navParams.get("currencys");
    this.cruiseAllMarkup = this.navParams.get("cruiseAllMarkup");
    this.cruiseAllFix = this.navParams.get("cruiseAllFix");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseDetailsPage');
    this.cruiseDetail();

  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }

  cruiseDetail() {
    this.cruiseProvider.getCruiseDetails(this.cruiseData.unique_id).then((data) => {
        this.loading.dismiss();
        console.log("cruiseresults-----------",data)
        this.cruiseDetails.push(data);
      })
      .catch((err) => {
        this.loading.dismiss();
        this.goToNoResultPage();
        console.error(err);
      });
  }
  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
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
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  
  proceed(results) {
    if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
      this.goToReviewPage(results);
    } else {
      console.log("proceed");
      new Promise((resolve) => {
        this.navCtrl.push(LoginPage, { resolve: resolve });
      }).then((data) => {
        console.log("then proceed", data);
        if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
          this.goToReviewPage(results);
        }
      });
    }
  }


  goToReviewPage(results){
    this.navCtrl.push(CruiseReviewPage,{
      cruiseCabin:results ,
      cruiseDetails:this.cruiseDetails,
      AdultCount:this.AdultCount,
      ChildCount: this.ChildCount,
      currencys: this.currencys,
      cruiseAllMarkup: this.cruiseAllMarkup,
      cruiseAllFix:this.cruiseAllFix,
    })
  }


}
