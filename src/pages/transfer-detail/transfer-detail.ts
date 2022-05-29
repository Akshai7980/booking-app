import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TransferReviewPage } from '../transfer-review/transfer-review';
import { LoginPage } from '../login/login';
import { LoginProvider } from "../../providers/login/login";
/**
 * Generated class for the TransferDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfer-detail',
  templateUrl: 'transfer-detail.html',
})
export class TransferDetailPage {
  transferWay;
  transferType;
  pickUPLocation;
  dropOffLocation;
  arrivalDate;
  departureDate;
  personDetail;
  transfer;
  returning;
  totalPrice;arrivaltime;departuretime;currencys;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController,public loginProvider: LoginProvider) {
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
    this.departuretime = this.navParams.get("departuretime");
    this.currencys  = this.navParams.get("currencys");
    this.totalPrice=this.transferWay==1?parseFloat(this.transfer.pricing.price):parseFloat(this.transfer.pricing.price) +parseFloat(this.returning.pricing.price);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferDetailPage');
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  
  // getTravellingTime(travellingTime){
  //   return ("0" + parseInt(travellingTime)/60).slice(-2) +"h "+("0" + parseInt(travellingTime)%60).slice(-2)+"m";
  // }

  proceed(){
    this.navCtrl.push(TransferReviewPage,{
      transferWay: this.transferWay,
      transferType: this.transferType,
      pickUPLocation: this.pickUPLocation,
      dropOffLocation: this.dropOffLocation,
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      personDetail: this.personDetail,
      returning: this.returning,
      transfer: this.transfer, 
      arrivaltime:this.arrivaltime,
      departuretime: this.departuretime,
      currencys:this.currencys
    })
  }
  // proceed() {
  //   if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //     this.goToReviewPage();
  //   } else {
  //     console.log("proceed");
  //     new Promise((resolve, reject) => {
  //       this.navCtrl.push(LoginPage, { resolve: resolve });
  //     }).then((data) => {
  //       console.log("then proceed", data);
  //       if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //         this.goToReviewPage();
  //       }
  //     });
  //   }
  // }

  // goToReviewPage(){
  //   this.navCtrl.push(TransferReviewPage,{
  //     transferWay: this.transferWay,
  //     transferType: this.transferType,
  //     pickUPLocation: this.pickUPLocation,
  //     dropOffLocation: this.dropOffLocation,
  //     arrivalDate: this.arrivalDate,
  //     departureDate: this.departureDate,
  //     personDetail: this.personDetail,
  //     returning: this.returning,
  //     transfer: this.transfer, 
  //     arrivaltime:this.arrivaltime,
  //     departuretime: this.departuretime,
  //     currencys:this.currencys
  //   })
  // }
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

  goBack(){
    this.navCtrl.pop();
  }

}
