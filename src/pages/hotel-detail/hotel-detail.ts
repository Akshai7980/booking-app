import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides, ToastController,AlertController } from 'ionic-angular';
import { SomethingWentWrongPage } from '../something-went-wrong/something-went-wrong';
import { HotelsProvider } from '../../providers/hotels/hotels';
import { LoginPage } from '../login/login';
import { HotelReviewPage } from '../hotel-review/hotel-review';
import { LoginProvider } from "../../providers/login/login";
import { NoResultPage } from '../no-result/no-result';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HotelPreviewPage } from '../hotel-preview/hotel-preview';

@IonicPage()
@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html',
})
export class HotelDetailPage {
@ViewChild(Slides) slides: Slides;
loading;rooms; checkInDate = new Date(); checkoutDate = new Date();hotelContentDetail=[]; buildingInfo = []; facilities = [];roomFacilities = [];meals = [];
sports = [];payments = []; hotelDescription="";isAmenitiesReadMore: boolean = true;
currentIndex=0; isMoreReview:boolean=false; searchResults;
sessionId; hotelDetail; hotelCity;tokenId;
roomOptionResult;HotelFix;
isBtnDisable:boolean=true;
isHiddenl =[];isHidden = [];
roomOptionMaps = [];perBookingRates = [];selectedOption = []; getNightStayDays;hotelAllMarkup;adminBalance;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public loadingCtrl:LoadingController, public hotelProvider:HotelsProvider,private photoViewer: PhotoViewer,
    public toastCtrl: ToastController,public loginProvider: LoginProvider) {
    this.presentLoading();
    this.sessionId = this.navParams.get("sessionId");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.hotelCity = this.navParams.get("hotelCity");
    this.rooms = this.navParams.get("rooms");
    this.checkInDate = this.navParams.get("checkInDate");
    this.checkoutDate = this.navParams.get("checkoutDate");
    this.tokenId = this.navParams.get("tokenId");
    this.searchResults = this.navParams.get("searchResults")
    this.getNightStayDays = this.navParams.get("getNightStayDays");
    this.hotelAllMarkup  = this.navParams.get("hotelAllMarkup");
    this.HotelFix = this.navParams.get("HotelFix");
  }

  // ionViewWillEnter() {
  //   this.getRoomOptions()
  // }

  ionViewDidLoad() {
    this.getHotelDetail();
    this. getBalabce();
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


  preview1(data,title) {
    this.navCtrl.push(HotelPreviewPage,{
      data:data,
      title:title
    })
  }
  preview(data,title){
    console.log("data-pic",data)
    for (let i = 0; i < data.length; i++) {
      var pic = data.url;
    }
    this.photoViewer.show(data,title);
  }
  goBack(){
    this.navCtrl.pop();
  }
  getBalabce(){
    this.hotelProvider.getAdminBalance().then((data) => {
    this.adminBalance = data;
    console.log(data);
   // this.loading.dismiss();
    })
    .catch((err) => {
      console.error(err);
    });
  }
  getHotelDetail() {
    this.hotelProvider.getSpecificHotelContent(this.sessionId,this.hotelDetail.hotelId,this.hotelDetail.productId,this.hotelDetail.tokenId).then(data => {
       this.hotelContentDetail.push(data);
       console.log("hotelContentDetail",this.hotelContentDetail)
       this.getRoomOptions();
      })
      .catch(err => {
        console.error(err);
        this.presentToast(err)
      });
  }
  
  getRoomOptions() {
    let jsonObj = {sessionId: this.sessionId, productId: this.hotelDetail.productId,tokenId: this.hotelDetail.tokenId, hotelId: this.hotelDetail.hotelId };
      this.hotelProvider.getRoomOptios(jsonObj).then((data) => {
        this.loading.dismiss();
        this.sessionId = data.sessionId;
        this.roomOptionResult = data.roomRates.perBookingRates;
        console.log("selectedroom",this.roomOptionResult);
      })
      .catch((err) => {
        console.log("error in get room  option",err)
        this.goToSomethingWentWrongPage();
      });
  }

  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
  getReviewDetail(rate){
    if(parseFloat(rate)>4){
      return "Excellent"
    }else if(parseFloat(rate)>3){
      return "Very Good"
    } else if(parseFloat(rate)>2){
        return "Average"
    } else if(parseFloat(rate)>1){
      return "Worst"
  } else return "Terible"
  }
  
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

  gotoCancellation(abc) {
    const alert = this.alertCtrl.create({
      title: 'Cancellation Policy',
      subTitle: abc,
      buttons: ['OK']
    });
    alert.present();
  }

  goToSomethingWentWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }
 
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  btnClick(results) {
    this.navCtrl.push(HotelReviewPage, {
      sessionId: this.sessionId,
      hotelDetail: this.hotelDetail,
      hotelContentDetail: this.hotelContentDetail,
      hotelCity: this.hotelCity,
      rooms: this.rooms,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate,
      selectedOption: results,
      getNightStayDays:this.getNightStayDays,
      adminBalance: this.adminBalance,
      hotelAllMarkup :this.hotelAllMarkup,
      HotelFix: this.HotelFix 
    });
  }

  // btnClick(results) {
  //   this.selectedOption= results;
  //   if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //     this.goToReviewPage(results);
  //   } else {
  //     console.log("proceed");
  //     new Promise((resolve) => {
  //       this.navCtrl.push(LoginPage, { resolve: resolve });
  //     }).then((data) => {
  //       console.log("then proceed", data);
  //       if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //         this.goToReviewPage(results);
  //       }
  //     });
  //   }
  // }


  // goToReviewPage(results) {
  //   this.navCtrl.push(HotelReviewPage, {
  //     sessionId: this.sessionId,
  //     hotelDetail: this.hotelDetail,
  //     hotelContentDetail: this.hotelContentDetail,
  //     hotelCity: this.hotelCity,
  //     rooms: this.rooms,
  //     checkInDate: this.checkInDate,
  //     checkoutDate: this.checkoutDate,
  //     selectedOption: results,
  //     getNightStayDays:this.getNightStayDays,
  //     adminBalance: this.adminBalance,
  //     hotelAllMarkup :this.hotelAllMarkup,
  //     HotelFix: this.HotelFix 
  //   });
  // }
}
